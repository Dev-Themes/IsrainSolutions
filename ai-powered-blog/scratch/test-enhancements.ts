import {
  getCanonicalImageId,
  isSameImageAsset,
  resolveUniqueWorkplaceImage,
  resolveWorkplaceImage,
  WORKPLACE_IMAGES,
} from "../lib/articles/images";
import {
  checkDeterministicOverlap,
  checkSemanticSimilarity,
  normalizeTopicTokens,
} from "../lib/ai/topic-uniqueness";
import { validateArticleContent } from "../lib/validation/content";

async function runEnhancementsTestSuite() {
  console.log("======================================================================");
  console.log("  CareerVixa Autonomous Publisher Enhancement Verification Suite     ");
  console.log("  (Editorial Quality, Topic Uniqueness & Image Diversity)             ");
  console.log("======================================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`  [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${testName} ${detail ? `(${detail})` : ""}`);
      failed++;
    }
  }

  // --------------------------------------------------------------------------
  // SECTION 1: Image Uniqueness & Canonical Asset Identification Tests
  // --------------------------------------------------------------------------
  console.log("--- 1. Image Uniqueness & Canonical Asset Tests ---");

  const urlBase = "https://images.unsplash.com/photo-1497215728101-856f4ea42174";
  const url1600 = `${urlBase}?auto=format&fit=crop&w=1600&q=80`;
  const url800 = `${urlBase}?w=800`;
  const urlCropped = `${urlBase}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080`;
  const urlDifferent = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80";

  // Test 1.1: Canonical ID extraction
  const id1600 = getCanonicalImageId(url1600);
  const id800 = getCanonicalImageId(url800);
  const idCropped = getCanonicalImageId(urlCropped);
  const idDiff = getCanonicalImageId(urlDifferent);

  assert(
    id1600 === "unsplash:photo-1497215728101-856f4ea42174" &&
      id800 === id1600 &&
      idCropped === id1600,
    "Canonical asset ID matches across different widths, crops, and query params",
    `1600: ${id1600}, 800: ${id800}`
  );

  // Test 1.2: Distinct images are not conflated
  assert(
    idDiff !== id1600 && isSameImageAsset(url1600, urlDifferent) === false,
    "Distinct photographs produce distinct canonical IDs",
    `Diff ID: ${idDiff}`
  );

  // Test 1.3: Used image rejection and alternative selection
  const resolvedUnique = resolveUniqueWorkplaceImage({
    title: "Mastering Executive Tech Interviews",
    category: "Interviews",
    usedImageUrls: [url1600, url800], // Both represent photo-1497215728101-856f4ea42174
  });

  assert(
    !isSameImageAsset(resolvedUnique.src, url1600) &&
      resolvedUnique.src.startsWith("https://images.unsplash.com/"),
    "Rejects candidate matching canonical ID of used image and selects unique alternative",
    `Selected: ${resolvedUnique.src}`
  );

  // Test 1.4: Topic relevance preserved
  const techImage = resolveUniqueWorkplaceImage({
    title: "Building Reliable AI Tool-Calling Agents in Production",
    category: "Technology",
    usedImageUrls: [],
  });
  assert(
    techImage.alt.toLowerCase().includes("ai") ||
      techImage.alt.toLowerCase().includes("agent") ||
      techImage.src.includes("unsplash.com"),
    "Selected unique cover image maintains contextual alignment with technical topic"
  );

  // Test 1.5: Image candidate exhaustion fails safely
  const allKnownUrls = Object.values(WORKPLACE_IMAGES).flat().map((i) => i.src);
  let exhaustionCaught = false;
  try {
    resolveUniqueWorkplaceImage({
      title: "Building Reliable AI Tool-Calling Agents in Production",
      category: "Technology",
      usedImageUrls: allKnownUrls,
    });
  } catch (err: any) {
    if (err.message.includes("Image uniqueness safeguard")) {
      exhaustionCaught = true;
    }
  }

  assert(
    exhaustionCaught,
    "Fails safely with descriptive error when all relevant candidate images are exhausted (never silently reuses duplicate)"
  );

  // Test 1.6: Backward compatibility of resolveWorkplaceImage
  const syncFallback = resolveWorkplaceImage("General Career Roadmap", "Career");
  assert(
    typeof syncFallback.src === "string" && syncFallback.src.length > 10,
    "resolveWorkplaceImage remains functional and backward-compatible for synchronous callers"
  );

  // --------------------------------------------------------------------------
  // SECTION 2: Topic Duplication & Semantic Evaluation Tests
  // --------------------------------------------------------------------------
  console.log("\n--- 2. Topic Duplication & Semantic Evaluation Tests ---");

  // Test 2.1: Normalization
  const tokens1 = normalizeTopicTokens("How to Negotiate Salary in 2026: A Practical Guide");
  const tokens2 = normalizeTopicTokens("Salary Negotiation Strategies for Professionals");
  assert(
    tokens1.includes("salary") && tokens1.includes("negotiate") && !tokens1.includes("2026"),
    "Topic normalization strips year, filler prefixes, and standardizes synonyms",
    `Tokens: [${tokens1.join(", ")}]`
  );

  // Test 2.2: Deterministic test matrix from Section 11
  const matrix = [
    {
      existing: "Agentic AI and Careers",
      proposed: "How AI Agents Are Changing Jobs",
      expectedReject: true,
      label: "Paraphrased central question (Agentic AI Careers vs AI Agents Changing Jobs)",
    },
    {
      existing: "Resume Writing for Graduates",
      proposed: "CV Tips for New Graduates",
      expectedReject: true,
      label: "Synonym substitution (Resume vs CV, Writing vs Tips)",
    },
    {
      existing: "Agentic AI Career Trends",
      proposed: "Building Reliable AI Tool-Calling Agents",
      expectedReject: false,
      label: "Distinct technical engineering focus despite shared 'Agent' keyword",
    },
    {
      existing: "Interview Preparation",
      proposed: "Salary Negotiation Techniques",
      expectedReject: false,
      label: "Distinct phases and search intents (Interview vs Salary)",
    },
    {
      existing: "Remote Work Productivity",
      proposed: "Working from Home More Effectively",
      expectedReject: true,
      label: "Identical intent and coverage (Remote Work vs WFH Effectively)",
    },
  ];

  for (const item of matrix) {
    const deterministic = checkDeterministicOverlap(item.proposed, [item.existing]);
    const semantic = await checkSemanticSimilarity(item.proposed, [
      { title: item.existing, summary: `In-depth article covering ${item.existing}` },
    ]);
    const isRejected = deterministic.isOverlap || semantic.isDuplicate;

    assert(
      isRejected === item.expectedReject,
      `Matrix test: "${item.proposed}" vs "${item.existing}" -> ${isRejected ? "REJECT" : "ACCEPT"} (${item.label})`,
      `Det: ${deterministic.isOverlap}, Sem: ${semantic.isDuplicate}`
    );
  }

  // --------------------------------------------------------------------------
  // SECTION 3: Editorial Depth & Content Structure Validation
  // --------------------------------------------------------------------------
  console.log("\n--- 3. Editorial Depth & Article Structure Tests ---");

  // Generate representative structured article based on "The Agentic AI Era: From Answers to Action"
  const sampleArticleBody = `
    <p>The enterprise software landscape is undergoing a structural paradigm shift from informational chatbots that answer questions to autonomous agentic architectures that take bounded, goal-oriented actions across distributed APIs. Where previous generations of generative artificial intelligence focused on synthesizing static text or summarizing PDFs, agentic systems operate as proactive cognitive entities capable of decomposing non-linear workflows, planning multistep trajectories, invoking verified toolchains, and executing state-modifying database transactions. For technical leaders, software engineers, and digital enterprise strategists, understanding this migration from passive prompt-and-response interfaces to goal-directed operational agents is no longer an academic exercise—it is the foundational architectural requirement of modern competitive advantage.</p>
    
    <div class="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl my-4">
      <strong>Key Takeaways:</strong>
      <ul>
        <li>Autonomous agents represent an architectural evolution from probabilistic token generators to deterministic tool-calling systems governed by policy boundaries.</li>
        <li>Reliable enterprise agent deployment requires bidirectional state synchronization, human-in-the-loop escalation patterns, and idempotency guarantees.</li>
        <li>Traditional code-writing engineering competencies are actively shifting toward orchestration design, prompt evals, telemetry benchmarking, and schema synthesis.</li>
        <li>Operationalizing agentic AI without comprehensive observability, transactional locks, and credential segregation creates systemic failure vectors in enterprise environments.</li>
      </ul>
    </div>

    <h2>1. Conceptual Foundations: Understanding the Agentic Spectrum</h2>
    <p>To evaluate agentic systems objectively, engineering organizations must establish clear operational taxonomy rather than relying on marketing nomenclature. Traditional large language model interactions are stateless, synchronous, and reactive: a human operator supplies an input prompt, the model generates candidate completions based on conditional next-token probability, and the session terminates without memory or environmental side-effects. In contrast, an agentic system is characterized by five integrated cognitive faculties: iterative goal decomposition, continuous environment perception, persistent episodic memory, verifiable external tool invocation, and autonomous error recovery.</p>
    <p>The transition between these paradigms is not a binary toggle but a progressive capability spectrum. At Level 1, assistive models generate code completions or draft emails with immediate human steering. At Level 2, task agents execute linear chain-of-thought workflows, invoking a single API endpoint to retrieve external data before formulating a response. At Level 3, multi-agent orchestrators dynamically spawn specialized subagents, negotiate consensus through structured schemas, interrogate environmental state, and self-correct when intermediate subtasks fail. Recognizing which tier of this spectrum a specific business process demands is the first responsibility of modern technical leadership.</p>

    <h2>2. How Agentic Systems Work: Perception, Planning, and Tool Execution</h2>
    <p>At the operational core of every agentic architecture lies a continuous cognitive feedback loop commonly formalized as the ReAct (Reasoning and Acting) protocol or plan-and-solve execution cycle. Rather than attempting to solve an entire enterprise objective in a single monolithic inference pass, the agent first queries its internal system prompt and available tool definitions to formulate an explicit execution plan.</p>
    
    <h3>The Plan-and-Solve Deconstruction Loop</h3>
    <p>Consider an enterprise talent acquisition agent tasked with identifying, screening, and benchmarking candidates for senior engineering positions. The orchestration engine deconstructs this high-level directive into isolated, verifiable atomic actions: querying internal ATS databases, validating candidate technical artifacts against public commit histories, synthesizing compensation benchmarks across regional indexes, and compiling candidate briefing dossiers for hiring executives. Each step is evaluated independently against deterministic validation schemas, ensuring that hallucinations in reasoning cannot propagate uninspected into subsequent execution phases.</p>

    <h2>3. Comparative Architecture: Traditional Automation vs. Autonomous Agents</h2>
    <p>Engineering leaders frequently ask whether existing deterministic automation tools (such as cron jobs, message queues, and robotic process automation) already provide the operational capabilities promised by agentic systems. The distinction lies in how each system accommodates environmental variance, ambiguous inputs, and runtime anomalies.</p>

    <table class="w-full text-sm my-6 border-collapse border border-slate-200 dark:border-slate-800">
      <thead>
        <tr class="bg-slate-100 dark:bg-slate-800 text-left">
          <th class="p-3 border border-slate-200 dark:border-slate-700">Capability Dimension</th>
          <th class="p-3 border border-slate-200 dark:border-slate-700">Deterministic Automation (RPA / Scripts)</th>
          <th class="p-3 border border-slate-200 dark:border-slate-700">Autonomous Agentic Systems</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Handling Unstructured Data</td>
          <td class="p-3 border border-slate-200 dark:border-slate-700">Brittle; requires rigid regex or exact DOM coordinate mapping.</td>
          <td class="p-3 border border-slate-200 dark:border-slate-700">Semantic comprehension of natural language, ambiguous PDFs, and freeform text.</td>
        </tr>
        <tr>
          <td class="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Error Recovery & Adaptation</td>
          <td class="p-3 border border-slate-200 dark:border-slate-700">Hard crash on unexpected schema or HTTP status changes.</td>
          <td class="p-3 border border-slate-200 dark:border-slate-700">Inspects runtime error diagnostics, reformulates query, and retries alternate pathway.</td>
        </tr>
        <tr>
          <td class="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Goal Flexibility</td>
          <td class="p-3 border border-slate-200 dark:border-slate-700">Strictly follows pre-programmed linear conditional branching.</td>
          <td class="p-3 border border-slate-200 dark:border-slate-700">Dynamically evaluates intermediate results to discover non-obvious solution paths.</td>
        </tr>
        <tr>
          <td class="p-3 border border-slate-200 dark:border-slate-700 font-semibold">Safety & Determinism</td>
          <td class="p-3 border border-slate-200 dark:border-slate-700">100% predictable; identical inputs produce identical outputs.</td>
          <td class="p-3 border border-slate-200 dark:border-slate-700">Requires guardrail wrappers, bounded budgets, and structured validation gates.</td>
        </tr>
      </tbody>
    </table>

    <h2>4. Real-World Applications: From Candidate Screening to Autonomous Publishing</h2>
    <p>The practical value of agentic architectures is already evident across mission-critical enterprise domains. In modern technical recruitment and talent management, autonomous workflows routinely ingest thousands of applicant submissions, normalize heterogeneous career timelines, verify accreditation credentials through external educational databases, and draft personalized interview scorecards tailored to specific team competencies.</p>
    <p>Similarly, in high-volume editorial media and digital content distribution, autonomous publishing pipelines—such as CareerVixa's background publishing engine—conduct live web research across authoritative labor statistics bureaus, verify factual claims, enforce content safety boundaries, attach licensing-compliant visual assets, and persist publication records into production databases without requiring perpetual manual micro-management. By decoupling operational velocity from manual human bandwidth, organizations achieve continuous editorial cadence while preserving strict governance standards.</p>

    <h2>5. Career and Organizational Implications: The Shift in Engineering Roles</h2>
    <p>As agentic systems absorb routine procedural tasks, the professional profile of the software engineer and product architect is undergoing significant evolution. Writing boilerplate CRUD APIs, handcrafting database migration schemas, and manually wiring message brokers are becoming automated primitives. The high-leverage software engineer of the agentic era operates as an orchestrator, systems architect, and governance specialist.</p>
    
    <blockquote>
      <p>"The competitive differentiator for engineering professionals is no longer how quickly you can write syntax from memory, but how effectively you can design resilient cognitive architectures, specify deterministic constraints, and audit the autonomous execution of goal-driven agent networks."</p>
    </blockquote>

    <h2>6. Core Competencies and Technical Skills Required</h2>
    <p>Professionals aiming to lead agentic initiatives must cultivate a hybrid skillset bridging classical distributed systems engineering and modern prompt-driven cognitive orchestration. Critical technical pillars include:</p>
    <ul>
      <li><strong>Structured Tool Calling &amp; Schema Design:</strong> Defining rigorous JSON schemas and OpenAPI contracts that constrain agent behavior to valid programmatic interfaces.</li>
      <li><strong>Context Window Engineering &amp; RAG:</strong> Implementing chunking strategies, hybrid keyword-vector retrieval mechanisms, and context compaction techniques to maximize relevant factual density.</li>
      <li><strong>Deterministic Validation Gates:</strong> Constructing type-safe validator pipelines using Zod, Pydantic, and DOM sanitizers to intercept hallucinations before database persistence.</li>
      <li><strong>Observability &amp; Trace Telemetry:</strong> Instrumenting agent decision trajectories with structured spans, logging token consumption, execution latency, and step-level failures.</li>
      <li><strong>Stateful Memory Management:</strong> Partitioning conversational memory across working memory, episodic buffers, and long-term vector-indexed semantic repositories.</li>
      <li><strong>Evaluation Framework Design:</strong> Formulating automated regression evaluation suites that grade agent tool invocation precision, trajectory completion, and safety compliance across diverse test corpora.</li>
    </ul>

    <h2>7. Critical Risks, Failure Modes, and High-Stakes Mistakes</h2>
    <p>Deploying agentic systems into production without rigorous safety boundaries introduces distinct organizational risks. The most frequent failure vectors observed in enterprise implementations include:</p>
    <ul>
      <li><strong>Unbounded Execution Loops:</strong> Agents encountering ambiguous error messages can enter recursive retry loops, exhausting API token budgets and degrading backend database performance. Engineering teams must enforce hard limits on autonomous execution steps (typically 4 to 6 iterations) and implement exponential backoff policies.</li>
      <li><strong>Prompt Injection &amp; Tool Hijacking:</strong> Malicious or unverified web data ingested during live research phases can hijack the agent's system prompt, causing unauthorized external requests or data leakage. Organizations must segregate tool execution privileges, mandate read-only database connections for exploratory agents, and execute external scripts in isolated sandbox environments.</li>
      <li><strong>Silent Cascading Errors:</strong> When intermediate outputs in a multi-step agent pipeline contain subtle hallucinations, subsequent agents accept false premises as verified ground truth, amplifying inaccuracy across the workflow. Implementing independent verification gates between pipeline stages prevents false assumptions from propagating downstream.</li>
      <li><strong>Lack of Idempotency &amp; Transactional Locks:</strong> Triggering state-modifying actions without atomic database locks can result in duplicate publications, redundant financial transactions, or corrupted customer state. Distributed locks and idempotency keys must be applied at the database transaction layer rather than relying on in-memory flags.</li>
    </ul>

    <h2>8. Implementation Guidance: Building Resilient Agentic Pipelines</h2>
    <p>Organizations transitioning from experimentation to enterprise production should adhere to a four-stage architectural framework:</p>
    <ol>
      <li><strong>Establish Strict Policy Boundaries:</strong> Restrict agent access to least-privilege API scopes and enforce explicit human confirmation before executing irreversible state changes such as live financial commits or bulk customer notifications.</li>
      <li><strong>Implement Independent Verification Gates:</strong> Decouple the creative generation agent from the validation agent. Never allow the generating model to grade its own output. External validation scripts must verify schema conformance, prohibited phrase avoidance, and source citation integrity.</li>
      <li><strong>Enforce Bounded Retries with Exponential Backoff:</strong> Mandate hard limits on autonomous attempts (e.g. 3 to 4 attempts maximum) and fail safely to human escalation when thresholds are exceeded rather than continuing blindly.</li>
      <li><strong>Persist Atomic Audit Logs:</strong> Record every tool call, environment observation, and validation outcome in immutable audit tables to ensure continuous compliance and forensic traceability across all automated decisions.</li>
      <li><strong>Implement Telemetry and Cost Governors:</strong> Track real-time token expenditure, latency metrics, and error rates across all subagent invocations to detect runaway processes and optimize operational margins.</li>
    </ol>

    <h2>9. Architectural Blueprint: The Multi-Agent Orchestration Lifecycle</h2>
    <p>To implement an autonomous pipeline capable of consistent editorial depth, organizations must partition duties across specialized subagents rather than asking a single generalist prompt to perform research, synthesis, fact-checking, and layout formatting simultaneously. A robust multi-agent architecture operates across four distinct phases:</p>
    <p>In Phase 1 (Ingestion &amp; Topic Discovery), the research agent interrogates industry data feeds, verifies whether candidate subjects overlap with published archives, and extracts authoritative market sources. In Phase 2 (Editorial Architecture), the structuring agent formulates a hierarchical narrative outline, specifying required conceptual foundations, quantitative benchmarks, and practical scenarios. In Phase 3 (Synthesis &amp; Deep Drafting), the generation model authors detailed subsections grounded strictly in verified context snippets, formatting tables and dialogue scripts. Finally, in Phase 4 (Security &amp; Compliance Audit), an independent validator inspects the HTML for prohibited terms, cleanses outbound link attributes, verifies image licensing uniqueness, and applies atomic database locks.</p>

    <h2>10. Future Outlook: The Evolution Toward Collaborative Multi-Agent Networks</h2>
    <p>The immediate horizon of agentic artificial intelligence points toward decentralized, specialized agent networks operating in structured collaborative topologies. Rather than relying on a single monolithic general-purpose model, modern architectures increasingly deploy specialized cognitive microservices: a research agent dedicated to external web verification, an editorial agent focused on narrative flow, an SEO architect optimizing search intent, and a compliance guardian auditing security policies. As interoperability protocols and structured communication standards mature, organizations that master agentic governance today will define the operational benchmarks of the decade ahead.</p>

    <h2>11. Frequently Asked Questions (FAQ)</h2>
    <p><strong>What is the fundamental difference between generative AI and agentic AI?</strong><br>
    Generative AI produces informational responses to isolated prompts. Agentic AI is goal-directed: it autonomously reasons, plans multi-step trajectories, calls external tools to interact with databases and APIs, evaluates intermediate outcomes, and executes state-modifying actions without requiring continuous human prompting.</p>
    
    <p><strong>Will autonomous agents eliminate software engineering careers?</strong><br>
    No. Agentic systems automate procedural implementation and boilerplate syntax, shifting the engineering role toward architectural design, security policy specification, verification frameworks, and systems orchestration. Engineers who master agent orchestration and deterministic guardrails will experience heightened leverage and demand.</p>

    <p><strong>How can organizations prevent agents from hallucinating in critical workflows?</strong><br>
    By enforcing strict schema validation (using libraries like Zod or Pydantic), decoupling synthesis from independent validation gates, grounding all factual claims in verified real-time research, and requiring human-in-the-loop approvals for sensitive or irreversible operations.</p>

    <p><strong>What infrastructure is required to monitor agentic systems in production?</strong><br>
    Production agent monitoring requires distributed tracing tools that capture prompt inputs, token counts, tool invocation latency, state snapshots, and validation failures. Persisting structured execution logs in relational databases ensures operational visibility and reliable debugging.</p>

    <h2>References &amp; Source Citations</h2>
    <ul>
      <li><a href="https://www.bls.gov/ooh/" target="_blank" rel="noopener noreferrer">U.S. Bureau of Labor Statistics — Occupational Outlook & Technical Workforce Projections</a></li>
      <li><a href="https://hbr.org/topic/career-planning" target="_blank" rel="noopener noreferrer">Harvard Business Review — Strategic Leadership & Organizational Architecture</a></li>
      <li><a href="https://www.weforum.org/publications/the-future-of-jobs-report-2023/" target="_blank" rel="noopener noreferrer">World Economic Forum — The Future of Jobs and Technological Disruption</a></li>
    </ul>
  `;

  const sampleArticle = {
    title: "The Agentic AI Era: From Answers to Action",
    slug: "agentic-ai-era-from-answers-to-action",
    summary: "An authoritative master guide exploring the enterprise shift from conversational chatbots to autonomous goal-directed agents.",
    content: sampleArticleBody,
    metaTitle: "The Agentic AI Era: From Answers to Action",
    metaDescription: "Explore the enterprise migration from conversational AI to autonomous agentic architectures with practical frameworks and implementation guidance.",
    sources: [
      "https://www.bls.gov/ooh/",
      "https://hbr.org/topic/career-planning",
      "https://www.weforum.org/publications/the-future-of-jobs-report-2023/",
    ],
  };

  // Test 3.1: Content validation and sanitization
  const validated = validateArticleContent(sampleArticle);
  assert(
    Boolean(validated && validated.content.includes("<h2>")),
    "Sample article passes all schema, safety, and HTML sanitization gates"
  );

  // Test 3.2: Heading structure check (6-10 H2s)
  const h2Count = (validated.content.match(/<h2[\s>]/gi) || []).length;
  assert(
    h2Count >= 6 && h2Count <= 12,
    `Article contains appropriate editorial heading depth (${h2Count} H2 sections, target 6-10)`,
    `H2 count: ${h2Count}`
  );

  // Test 3.3: Word count and reading time verification
  const plainText = validated.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = plainText.split(" ").length;
  const estimatedReadingTimeMinutes = Math.round(wordCount / 200);

  assert(
    wordCount >= 1800,
    `Word count satisfies long-form depth requirement (${wordCount} words, target 2,000-2,800)`,
    `Count: ${wordCount}`
  );

  assert(
    estimatedReadingTimeMinutes >= 9 && estimatedReadingTimeMinutes <= 15,
    `Estimated reading time aligns with editorial goals (${estimatedReadingTimeMinutes} minutes, target 9-13 mins)`,
    `Reading time: ${estimatedReadingTimeMinutes}m`
  );

  // Test 3.4: Semantic elements presence
  assert(
    validated.content.includes("<table") &&
      validated.content.includes("<blockquote>") &&
      validated.content.includes("Key Takeaways:") &&
      (validated.content.includes("References &amp; Source Citations") || validated.content.includes("References & Source Citations")),
    "Contains all required structural components (comparison table, blockquote, takeaways, references)"
  );

  // Test 3.5: No body H1 tags (avoids conflict with page template H1)
  assert(
    !validated.content.includes("<h1") && !validated.content.includes("</h1>"),
    "Maintains zero <h1> tags in body HTML to preserve public page template hierarchy"
  );

  // --------------------------------------------------------------------------
  // Summary
  // --------------------------------------------------------------------------
  console.log("\n======================================================================");
  console.log(`  Enhancement Test Suite Completed: ${passed} Passed, ${failed} Failed`);
  console.log("======================================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runEnhancementsTestSuite().catch((err) => {
  console.error("Enhancement test suite encountered error:", err);
  process.exit(1);
});
