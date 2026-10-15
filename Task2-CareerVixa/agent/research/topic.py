import os
from datetime import datetime
from openai import OpenAI
from pydantic import BaseModel
from typing import List

NICHE = "Career Development, Jobs, Resume Writing, Interviews, Professional Skills, Remote Work, and Freelancing"

class TopicSchema(BaseModel):
    topic: str
    rationale: str

def select_topic(existing_topics: List[str]) -> str:
    """
    Selects a highly engaging, niche-specific topic that hasn't been covered recently,
    adapted dynamically to the current calendar year.
    """
    current_year = datetime.now().year
    existing_topics_str = "\n".join([f"- {t}" for t in existing_topics]) if existing_topics else "None"

    prompt = f"""
    You are an expert career strategist and blog editor for CareerVixa.
    Your niche is strictly: {NICHE}.
    Current Calendar Year: {current_year}.

    Propose ONE highly engaging, original, and actionable article topic relevant to professionals.
    It MUST NOT be too similar to any of these recently published topics:
    {existing_topics_str}

    Focus on practical advice, contemporary industry trends in {current_year}, or actionable steps for professionals.
    """

    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("OPENAI_API_KEY")
    base_url = "https://generativelanguage.googleapis.com/v1beta/openai/" if os.environ.get("GEMINI_API_KEY") else None

    local_client = OpenAI(api_key=api_key, base_url=base_url)
    model_name = "gemini-3.5-flash-lite" if os.environ.get("GEMINI_API_KEY") else "gpt-4o"

    completion = local_client.beta.chat.completions.parse(
        model=model_name,
        messages=[
            {"role": "user", "content": prompt}
        ],
        response_format=TopicSchema
    )

    return completion.choices[0].message.parsed.topic

if __name__ == "__main__":
    print(select_topic(["How to Write a Resume", "Top 10 Interview Questions"]))
