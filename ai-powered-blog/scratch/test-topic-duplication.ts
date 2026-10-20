import { checkDeterministicOverlap, checkSemanticSimilarity } from "../lib/ai/topic-uniqueness";

async function testCases() {
  console.log("=== Testing Topic Duplication Test Cases (Section 11) ===");
  const tests = [
    { existing: "Agentic AI and Careers", proposed: "How AI Agents Are Changing Jobs", shouldReject: true },
    { existing: "Resume Writing for Graduates", proposed: "CV Tips for New Graduates", shouldReject: true },
    { existing: "Agentic AI Career Trends", proposed: "Building Reliable AI Tool-Calling Agents", shouldReject: false },
    { existing: "Interview Preparation", proposed: "Salary Negotiation Techniques", shouldReject: false },
    { existing: "Remote Work Productivity", proposed: "Working from Home More Effectively", shouldReject: true },
  ];

  let passed = 0;
  let failed = 0;

  for (const t of tests) {
    const deterministic = checkDeterministicOverlap(t.proposed, [t.existing]);
    const semantic = await checkSemanticSimilarity(t.proposed, [
      { title: t.existing, summary: `Comprehensive career article on ${t.existing}` },
    ]);
    const isRejected = deterministic.isOverlap || semantic.isDuplicate;
    const isSuccess = isRejected === t.shouldReject;

    if (isSuccess) {
      console.log(`[PASS] "${t.proposed}" vs "${t.existing}" -> Rejected: ${isRejected}`);
      passed++;
    } else {
      console.error(`[FAIL] "${t.proposed}" vs "${t.existing}" -> Rejected: ${isRejected} (Expected: ${t.shouldReject})`);
      console.error("  Deterministic:", deterministic);
      console.error("  Semantic:", semantic);
      failed++;
    }
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

testCases().catch(console.error);
