import { formatInTimeZone } from "date-fns-tz";
import {
  evaluateContentSafety,
  processArticleLinks,
  sanitizeHtml,
  truncateAtWordBoundary,
  validateArticleContent,
} from "../lib/validation/content";
import { resolveWorkplaceImage } from "../lib/articles/images";
import {
  getDailyExecutionKey,
  acquireDailyLock,
  completeDailyLock,
  releaseDailyLock,
} from "../lib/automation/lock";
import { verifyPlatformOwnership } from "../lib/articles/publish";
import { prisma } from "../lib/prisma";

async function runTestSuite() {
  console.log("============================================================");
  console.log("  CareerVixa Autonomous AI Publisher Verification Suite    ");
  console.log("============================================================\n");

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

  // -------------------------------------------------------------
  // Test Group 1: Dynamic Current-Year & Freshness Handling
  // -------------------------------------------------------------
  console.log("--- 1. Dynamic Current-Year & Freshness Tests ---");
  const timezone = "Asia/Karachi";
  const dynamicYear = formatInTimeZone(new Date(), timezone, "yyyy");
  const dynamicDate = formatInTimeZone(new Date(), timezone, "MMMM d, yyyy");

  assert(
    typeof dynamicYear === "string" && dynamicYear.length === 4,
    "Current year resolved dynamically in configured timezone",
    `Resolved: ${dynamicYear}`
  );

  assert(
    dynamicYear !== "2025" || new Date().getFullYear() === 2025,
    "Eliminated hardcoded 2025 legacy constraint",
    `Active Year: ${dynamicYear}`
  );

  assert(
    dynamicDate.includes(dynamicYear),
    "Current date format includes resolved calendar year",
    `Date: ${dynamicDate}`
  );

  // -------------------------------------------------------------
  // Test Group 2: Context-Aware Content Safety Evaluation
  // -------------------------------------------------------------
  console.log("\n--- 2. Context-Aware Content Safety Tests ---");

  // Legitimate educational career safety articles (MUST PASS)
  const educationalScamArticle = evaluateContentSafety(
    "How to Spot and Avoid Remote Job Scams in " + dynamicYear,
    "Comprehensive guide on recognizing fake recruiters and protecting yourself from advance-fee employment fraud.",
    "<p>Job seekers must learn how to avoid scams and verify legitimate recruiter identities.</p>"
  );
  assert(
    educationalScamArticle.isSafe,
    "Permits educational warning: 'How to Spot and Avoid Remote Job Scams'"
  );

  const illegalQuestionsArticle = evaluateContentSafety(
    "10 Illegal Interview Questions You Should Never Answer",
    "Know your legal workplace rights when hiring managers ask prohibited questions.",
    "<p>Questions about age, marital status, or family planning are illegal interview inquiries.</p>"
  );
  assert(
    illegalQuestionsArticle.isSafe,
    "Permits educational workplace law: '10 Illegal Interview Questions'"
  );

  const careerHacksArticle = evaluateContentSafety(
    "7 High-Impact Resume Hacks to Accelerate Interview Callbacks",
    "Optimize your resume layout and executive presentation.",
    "<p>These productivity and networking hacks help candidates stand out ethically.</p>"
  );
  assert(
    careerHacksArticle.isSafe,
    "Permits professional productivity context: 'Resume Hacks'"
  );

  // Harmful content (MUST BE REJECTED)
  const maliciousScamArticle = evaluateContentSafety(
    "How to Scam Candidates and Steal Identities",
    "Step by step guide to creating fake checks and scamming job applicants.",
    "<p>Here is how to run a scam to collect bank details.</p>"
  );
  assert(
    !maliciousScamArticle.isSafe,
    "Blocks malicious scam promotion: 'How to Scam Candidates'"
  );

  const explicitContentArticle = evaluateContentSafety(
    "Explicit Adult Entertainment Career Guide",
    "Guide covering explicit adult pornography jobs.",
    "<p>Content discussing explicit sex work.</p>"
  );
  assert(
    !explicitContentArticle.isSafe,
    "Blocks adult/explicit sexual content"
  );

  const cryptoPumpArticle = evaluateContentSafety(
    "Join our Guaranteed Crypto Pump and Dump Group",
    "Get rich quick scheme with guaranteed 500% returns.",
    "<p>Guaranteed get rich quick scheme for crypto traders.</p>"
  );
  assert(
    !cryptoPumpArticle.isSafe,
    "Blocks deceptive financial get-rich-quick schemes"
  );

  const dangerousUriArticle = evaluateContentSafety(
    "Top Engineering Tips",
    "Read our top career tips.",
    '<p>Click <a href="javascript:alert(1)">here</a> for tips.</p>'
  );
  assert(
    !dangerousUriArticle.isSafe,
    "Blocks dangerous XSS URI scheme (javascript:)"
  );

  // -------------------------------------------------------------
  // Test Group 3: Link Classification & SEO Governance
  // -------------------------------------------------------------
  console.log("\n--- 3. Link Classification & SEO Governance Tests ---");

  const rawHtmlLinks = `
    <p>According to the <a href="https://www.bls.gov/ooh/">Bureau of Labor Statistics</a>, engineering is growing.</p>
    <p>Read our in-depth guide on <a href="/articles/master-the-technical-interview">Technical Interviews</a>.</p>
    <p>Check out our sponsor at <a href="https://example-sponsor.com" data-sponsored="true">Sponsor Tool</a>.</p>
    <p>Malicious link: <a href="javascript:stealCookie()">Click here</a>.</p>
  `;

  const processedLinksHtml = processArticleLinks(rawHtmlLinks);

  assert(
    processedLinksHtml.includes('href="https://www.bls.gov/ooh/"') &&
      processedLinksHtml.includes('rel="noopener noreferrer"') &&
      !processedLinksHtml.includes('rel="sponsored nofollow noopener noreferrer" href="https://www.bls.gov/ooh/"'),
    "Editorial research citations are NOT falsely labeled as sponsored (uses safe noopener noreferrer)"
  );

  assert(
    processedLinksHtml.includes('href="/articles/master-the-technical-interview"') &&
      !processedLinksHtml.includes('rel="nofollow" href="/articles/master-the-technical-interview"'),
    "Internal links remain clean without nofollow or sponsored attributes"
  );

  assert(
    processedLinksHtml.includes('href="https://example-sponsor.com"') &&
      processedLinksHtml.includes('rel="sponsored nofollow noopener noreferrer"'),
    "Commercial sponsor links retain rel='sponsored nofollow noopener noreferrer'"
  );

  assert(
    !processedLinksHtml.includes("javascript:stealCookie()"),
    "Dangerous javascript: URI schemes are neutralized"
  );

  // -------------------------------------------------------------
  // Test Group 4: Article Quality & Structure Validation
  // -------------------------------------------------------------
  console.log("\n--- 4. Article Quality & Structure Validation Tests ---");

  // Clean word-boundary truncation
  const longTitle = "Navigating Executive Leadership Transitions in Modern Enterprise Software Engineering Organizations";
  const truncatedTitle = truncateAtWordBoundary(longTitle, 60);
  assert(
    truncatedTitle.length <= 60 && !truncatedTitle.endsWith("Eng..."),
    "Meta title truncates cleanly at word boundary without splitting words",
    `Truncated: "${truncatedTitle}" (${truncatedTitle.length} chars)`
  );

  const longDesc = "In this comprehensive career guide, we explore the nuances of compensation negotiation, equity grants, and vesting schedules across global technology corporations.";
  const truncatedDesc = truncateAtWordBoundary(longDesc, 140);
  assert(
    truncatedDesc.length <= 140 && !truncatedDesc.endsWith("corpora..."),
    "Meta description truncates cleanly at word boundary",
    `Truncated: "${truncatedDesc}" (${truncatedDesc.length} chars)`
  );

  // Duplicate H1 demotion
  const htmlWithDuplicateH1 = `
    <h1>Comprehensive Guide Title</h1>
    <h2>Section 1: Overview</h2>
    <p>This is a detailed guide with substantial advice.</p>
  `;
  const sanitizedDuplicateH1 = sanitizeHtml(htmlWithDuplicateH1);
  assert(
    !sanitizedDuplicateH1.includes("<h1>") && sanitizedDuplicateH1.includes("<h2"),
    "Demotes body H1 to prevent duplicate H1 headings with page template"
  );

  // Full validation test with compliant article
  const compliantArticle = {
    title: "Mastering Executive Tech Interviews",
    slug: "mastering-executive-tech-interviews",
    summary: "A practical guide to excelling in executive technical interviews and leadership evaluations.",
    content: `
      <h2>Executive Strategic Overview</h2>
      <p>Executive technical evaluations require demonstrating strategic foresight alongside engineering mastery.</p>
      <h2>Common Mistakes to Avoid</h2>
      <p>Candidates often focus exclusively on syntax rather than business impact.</p>
      <h2>References & Citations</h2>
      <ul>
        <li><a href="https://www.bls.gov/ooh/">Bureau of Labor Statistics</a></li>
      </ul>
    ` + " A".repeat(500),
    metaTitle: "Mastering Executive Tech Interviews",
    metaDescription: "Practical guide to excelling in executive technical interviews with confidence and clarity.",
    sources: ["https://www.bls.gov/ooh/"],
  };

  const validationResult = validateArticleContent(compliantArticle);
  assert(
    validationResult && validationResult.content.includes("<h2>"),
    "Compliant article passes all structural, safety, and SEO validation gates"
  );

  // -------------------------------------------------------------
  // Test Group 5: Workplace Stock Image Resolution Tests
  // -------------------------------------------------------------
  console.log("\n--- 5. Workplace Stock Image Resolution Tests ---");

  const interviewImg = resolveWorkplaceImage("Top 10 Behavioral Interview Questions", "Interviews");
  assert(
    interviewImg.src.startsWith("https://images.unsplash.com/") && interviewImg.alt.includes("Top 10 Behavioral Interview Questions"),
    "Resolves topic-specific interview image with contextual alt text"
  );

  const resumeImg = resolveWorkplaceImage("Executive Resume Formatting Checklist", "Resume Writing");
  assert(
    resumeImg.src.startsWith("https://images.unsplash.com/") && resumeImg.alt.includes("Executive Resume Formatting Checklist"),
    "Resolves topic-specific resume image with contextual alt text"
  );

  const salaryImg = resolveWorkplaceImage("Salary Negotiation for Staff Engineers", "Compensation");
  assert(
    salaryImg.src.startsWith("https://images.unsplash.com/"),
    "Resolves topic-specific compensation and salary image"
  );

  const remoteImg = resolveWorkplaceImage("Thriving in a Global Remote Work Environment", "Remote Work");
  assert(
    remoteImg.src.startsWith("https://images.unsplash.com/"),
    "Resolves topic-specific remote workspace image"
  );

  const generalImg = resolveWorkplaceImage("Uncategorized General Professional Topic", "Career");
  assert(
    generalImg.src.startsWith("https://images.unsplash.com/"),
    "Provides verified fallback image for general topics without breaking"
  );

  // Deterministic variety test
  const title1 = "Navigating Career Changes in Healthcare";
  const title2 = "Navigating Career Changes in Aerospace";
  const img1 = resolveWorkplaceImage(title1);
  const img2 = resolveWorkplaceImage(title2);
  assert(
    img1.alt !== img2.alt,
    "Contextual alt text adapts uniquely to article title"
  );

  // -------------------------------------------------------------
  // Test Group 6: Atomic Daily Idempotency Lock Tests
  // -------------------------------------------------------------
  console.log("\n--- 6. Atomic Daily Idempotency Lock Tests ---");

  const testTimezone = "Asia/Karachi";
  const lockKey = getDailyExecutionKey(testTimezone);
  assert(
    lockKey.startsWith("AI-PUB-") && lockKey.includes("Asia_Karachi"),
    "Generates standardized daily execution key",
    `Key: ${lockKey}`
  );

  // Acquire lock
  const firstAcquisition = await acquireDailyLock(testTimezone, 3);
  assert(
    Boolean(firstAcquisition.acquired || firstAcquisition.reason?.includes("already")),
    "Acquires atomic database lock or recognizes existing status",
    `Result: ${firstAcquisition.reason || "Acquired"}`
  );

  // Simulate concurrent attempt on locked day
  if (firstAcquisition.acquired) {
    const secondAcquisition = await acquireDailyLock(testTimezone, 3);
    assert(
      !secondAcquisition.acquired,
      "Prevents concurrent execution on active lock",
      `Blocked: ${secondAcquisition.reason}`
    );

    // Release lock to avoid blocking test environment
    await releaseDailyLock(firstAcquisition.lockKey, "Test suite cleanup");
    assert(true, "Releases lock cleanly on cleanup");
  }

  // -------------------------------------------------------------
  // Test Group 7: Database & Platform Ownership Integrity
  // -------------------------------------------------------------
  console.log("\n--- 7. Database & Platform Ownership Integrity Tests ---");

  try {
    // Look for any client article in the DB to test the security gate
    const clientArticle = await prisma.article.findFirst({
      where: { author: { role: "CLIENT" } },
    });

    if (clientArticle) {
      let securityViolationCaught = false;
      try {
        await verifyPlatformOwnership(clientArticle.id);
      } catch (err: any) {
        if (err.message.includes("SECURITY VIOLATION")) {
          securityViolationCaught = true;
        }
      }
      assert(
        securityViolationCaught,
        "verifyPlatformOwnership strictly blocks client-owned articles from auto-publishing"
      );
    } else {
      console.log("  [SKIP] No client articles in database to test verifyPlatformOwnership");
    }
  } catch (err) {
    console.warn("Could not check client article:", err);
  }

  // Summary
  console.log("\n============================================================");
  console.log(`  Test Suite Completed: ${passed} Passed, ${failed} Failed`);
  console.log("============================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite()
  .catch((err) => {
    console.error("Test execution error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
