import os
import sys
from openai import OpenAI
from pydantic import BaseModel

# Ensure we can import from agent root
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from schema import ArticleSchema

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

class SourceValidationResult(BaseModel):
    is_valid: bool
    reason: str
    unsupported_claims: list[str]

def verify_sources_and_claims(article: ArticleSchema, research_data: list[dict]) -> SourceValidationResult:
    """
    Verifies that the article does not invent facts and correctly cites the provided research data.
    """
    
    context_str = ""
    for i, data in enumerate(research_data):
        context_str += f"\nSource URL: {data.get('url')}\nContent: {data.get('content')[:1000]}...\n"
        
    prompt = f"""
    You are a rigorous fact-checker for CareerVixa.
    Your job is to verify an AI-generated article against the original research data.
    
    Research Data:
    {context_str}
    
    Article to Verify:
    Title: {article.title}
    Content: {article.content}
    Sources Claimed: {article.sources}
    
    Validation Rules:
    1. Are the sources listed in the article exactly matching the provided Research Data URLs?
    2. Does the article invent any statistics, salary figures, or strict factual claims that are NOT present in the Research Data?
    
    If the article invents facts or uses fake URLs, it is INVALID.
    Provide a list of any unsupported claims found.
    """
    
    # Use Gemini API key if available, otherwise fallback to OpenAI
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("OPENAI_API_KEY")
    base_url = "https://generativelanguage.googleapis.com/v1beta/openai/" if os.environ.get("GEMINI_API_KEY") else None
    
    local_client = OpenAI(api_key=api_key, base_url=base_url)
    model_name = "gemini-3.5-flash-lite" if os.environ.get("GEMINI_API_KEY") else "gpt-4o"
    
    completion = local_client.beta.chat.completions.parse(
        model=model_name,
        messages=[
            {"role": "user", "content": prompt}
        ],
        response_format=SourceValidationResult
    )
    
    return completion.choices[0].message.parsed

if __name__ == "__main__":
    # Test execution
    pass
