import os
import sys
from datetime import datetime
import zoneinfo
from openai import OpenAI
from typing import List, Dict, Any, Optional

# Ensure we can import from agent root
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from schema import ArticleSchema

def generate_article_content(topic: str, research_data: List[Dict[str, Any]], timezone: str = "Asia/Karachi") -> ArticleSchema:
    """
    Generates an authoritative, exhaustive in-depth career guide (1,200-2,500+ words)
    based on live research data, formatted with executive styling and semantic HTML.
    Adapts dynamically to the current calendar year and flexible search intent.
    """
    try:
        tz = zoneinfo.ZoneInfo(timezone)
    except Exception:
        tz = zoneinfo.ZoneInfo("Asia/Karachi")

    now = datetime.now(tz)
    current_year = str(now.year)
    current_date = now.strftime("%B %d, %Y")

    # Prepare the context from research
    context_str = ""
    for i, data in enumerate(research_data):
        context_str += f"\n[Verified Research Source {i+1}]\n"
        if data.get("title"):
            context_str += f"Title: {data.get('title')}\n"
        context_str += f"URL: {data.get('url')}\n"
        context_str += f"Content: {data.get('content')[:2000]}...\n"

    prompt = f"""
    You are an elite executive career strategist and lead editor for CareerVixa (careervixa.com), a premier international publication covering Career, Jobs & Professional Growth.

    Write an authoritative, exhaustive, and deeply practical master guide on the topic: "{topic}".

    TEMPORAL & FRESHNESS CONTEXT:
    - Today's Reference Date: {current_date}
    - Current Calendar Year: {current_year}
    - Freshness Rule: Discuss the current year ({current_year}) ONLY when relevant to modern hiring dynamics, compensation shifts, active recruitment trends, or emerging skills. Never invent current-year statistics. Distinguish evergreen career fundamentals from time-sensitive data. Do NOT blindly append "{current_year}" to the headline unless it is an explicit annual outlook or trend report.

    MANDATORY LENGTH & DEPTH STANDARD:
    - Target length: Approximately 2,000 to 2,800 words (aiming for 9 to 13 minutes of substantial reading time).
    - Professional Tone: Natural, authoritative, internationally understandable English. Deliver concrete methodologies, verified data-backed insights, and real-world clarity.
    - Avoid superficial summaries, repetitive padding, or generic filler. Avoid generic AI openings like "In today's fast-paced world...".

    FACTUAL INTEGRITY:
    - Ground all factual assertions, industry statistics, and compensation benchmarks in the provided research data.
    - Never invent citations, salary figures, or source URLs.

    REQUIRED ARTICLE STRUCTURE (Format using clean semantic HTML for content body):
    - IMPORTANT: Do NOT include an <h1> tag in the content HTML body (the site template renders the main title in <h1> automatically).
    - Begin directly with an engaging, focused 1-2 paragraph lead introduction (120 to 200 words) answering the core reader question, establishing why it matters now, and what readers will learn.
    - Include a concise Key Takeaways section (3-5 bullet points):
      <div class="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl my-4">
        <strong>Key Takeaways:</strong>
        <ul>...</ul>
      </div>
    - Main Sections: Organize around 6 to 10 meaningful <h2> headings tailored to the specific topic (conceptual foundations, how the system works, practical examples, frameworks, semantic comparison tables with <table class="w-full text-sm">, career implications, required skills, high-stakes mistakes to avoid, and future developments).
    - Include <h3> subsections where necessary to organize complex sub-topics.
    - Provide dialogue scripts or negotiation counter-offers in <blockquote> where applicable.
    - Frequently Asked Questions (FAQ) with 3-5 genuine, high-value reader questions.
    - Actionable Next Steps Conclusion summarizing key strategic insights and immediate practical actions.
    - End with <h2>References & Source Citations</h2> containing an unordered list (<ul>) of clickable source links: <a href="URL" target="_blank" rel="noopener noreferrer">Source Title/Domain</a> based strictly on the verified research context.

    Research Context:
    {context_str}

    METADATA & SCHEMA REQUIREMENTS:
    - title: Authoritative, compelling headline strictly under 65 characters.
    - slug: Clean lowercase kebab-case slug (e.g. how-to-clear-technical-interview).
    - summary: High-impact 2-sentence executive summary between 140 and 175 characters.
    - metaTitle: SEO title tag strictly 50 to 60 characters.
    - metaDescription: High-CTR meta description strictly 120 to 155 characters.
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
