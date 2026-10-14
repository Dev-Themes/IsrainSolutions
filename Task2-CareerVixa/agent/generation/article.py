import os
import sys
from openai import OpenAI
from typing import List, Dict, Any

# Ensure we can import from agent root
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from schema import ArticleSchema

def generate_article_content(topic: str, research_data: List[Dict[str, Any]]) -> ArticleSchema:
    """
    Generates an authoritative, exhaustive in-depth career guide (1,800-2,500+ words)
    based on live research data, formatted with executive styling and semantic HTML.
    """
    
    # Prepare the context from research
    context_str = ""
    for i, data in enumerate(research_data):
        context_str += f"\n[Verified Research Source {i+1}]\nURL: {data.get('url')}\n"
        context_str += f"Content: {data.get('content')[:1200]}...\n"
        
    prompt = f"""
    You are an elite executive career strategist and lead editor for CareerVixa (careervixa.com), a premier international publication covering Career, Jobs & Professional Growth.
    
    Write an authoritative, exhaustive, and deeply practical master guide on the topic: "{topic}".
    
    MANDATORY LENGTH & DEPTH STANDARD:
    - This must be an in-depth, definitive publication (minimum 1,800 to 2,500+ words of rich, comprehensive guidance).
    - NEVER produce superficial summaries, repetitive padding, or brief overviews. Every section must deliver concrete methodologies, data-backed perspectives, step-by-step roadmaps, and ready-to-use professional scripts.
    
    FACTUAL INTEGRITY:
    - Ground all factual assertions, industry statistics, and compensation benchmarks in the provided research data.
    - Cite actual current market trends and real-world hiring realities.
    
    Research Context:
    {context_str}
    
    REQUIRED ARTICLE STRUCTURE (Format using clean semantic HTML for content body):
    1. <h1> Comprehensive Article Headline </h1>
    2. Executive Overview & Strategic Context (250+ words): Set the stakes for modern professionals. Explain why this topic is critical in today's economy and who this master guide is specifically designed for.
    3. Industry Landscape & Market Outlook (350+ words): Analyze current hiring dynamics, industry demand, and include an HTML <table> detailing entry-level, mid-level, and senior compensation benchmarks or market growth metrics.
    4. Step-by-Step Transition & Execution Roadmap (700+ words): Break down the journey into structured, chronological phases:
       - <h3>Phase 1: Foundation & Market Positioning</h3> (Detailed tactical steps, audits, and asset preparation)
       - <h3>Phase 2: High-Impact Execution & Proof of Work</h3> (Portfolio building, technical demonstrations, case studies)
       - <h3>Phase 3: Strategic Outreach & Opportunity Capture</h3> (Targeted networking, interview mastery, offer maximization)
       Use rich paragraphs, detailed bullet points (<ul>), and numbered execution steps (<ol>).
    5. The Skills Competency Matrix (300+ words): Breakdown of Hard Technical Competencies vs. Executive Soft Skills with actionable self-assessment benchmarks.
    6. Copy-Paste Scripts & Email Templates (300+ words): Provide exact, word-for-word conversational scripts (e.g., reaching out to hiring managers on LinkedIn, salary negotiation counter-offers, or navigating difficult behavioral interview questions) wrapped in <blockquote> or clear callout tags.
    7. Common Pitfalls & High-Stakes Mistakes to Avoid (250+ words): Detail 4-5 subtle blunders that derail candidates and how to bypass them.
    8. Frequently Asked Questions (FAQ) (350+ words): Address 4-5 real-world, long-tail reader questions with direct, authoritative answers.
    9. Final Action Plan: Conclude with the single most high-leverage immediate action the reader must take today.
    10. <h2>References & Source Citations</h2>: An unordered list (<ul>) of the sources provided in the research context, formatted as clickable links: <a href="URL" target="_blank" rel="noopener noreferrer">Source Title/Domain</a>.
    
    METADATA & SCHEMA REQUIREMENTS:
    - title: Authoritative, compelling headline strictly under 65 characters.
    - slug: Clean lowercase kebab-case slug (e.g. how-to-clear-technical-interview).
    - summary: High-impact 2-sentence executive summary between 140 and 175 characters.
    - metaTitle: SEO title tag strictly 60 characters or fewer.
    - metaDescription: High-CTR meta description strictly between 120 and 150 characters.
    - sources: List containing the exact URLs provided in the research context that were cited.
    """
    
    # Try Gemini API key first if available, with automatic fallback to OpenAI
    gemini_key = os.environ.get("GEMINI_API_KEY")
    openai_key = os.environ.get("OPENAI_API_KEY")
    
    if gemini_key:
        for gemini_model in ["gemini-3.1-flash-lite", "gemini-3.5-flash", "gemini-3.8-flash"]:
            try:
                client = OpenAI(
                    api_key=gemini_key,
                    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
                )
                completion = client.beta.chat.completions.parse(
                    model=gemini_model,
                    messages=[{"role": "user", "content": prompt}],
                    response_format=ArticleSchema
                )
                return completion.choices[0].message.parsed
            except Exception as e:
                print(f"Gemini {gemini_model} attempt encountered: {e}. Trying next option...", file=sys.stderr)
            
    if openai_key:
        client = OpenAI(api_key=openai_key)
        completion = client.beta.chat.completions.parse(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            response_format=ArticleSchema
        )
        return completion.choices[0].message.parsed
        
    raise ValueError("Neither GEMINI_API_KEY nor OPENAI_API_KEY is available or functioning.")

if __name__ == "__main__":
    mock_research = [{"url": "https://example.com/negotiation", "content": "Always ask for 10% more based on market compensation benchmarks."}]
    article = generate_article_content("Salary Negotiation", mock_research)
    print(article.title)
    print(article.slug)
    print("Sources:", article.sources)
