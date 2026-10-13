import os
import sys
import json
import argparse
from pydantic import BaseModel, Field
from typing import List, Optional
from dotenv import load_dotenv

load_dotenv()

# Import sub-modules
from research.topic import select_topic
from research.search import perform_research
from generation.article import generate_article_content
from validation.sources import verify_sources_and_claims

from schema import ArticleSchema

def generate_article(topic: str = None) -> str:
    """
    Core function to research and generate an article.
    Outputs a JSON string of the ArticleSchema.
    """
    if not topic:
        # If no topic is provided, select one automatically (mocking existing topics list for now)
        topic = select_topic([])
    
    # 1. Research
    research_data = perform_research(topic)
    if not research_data:
        raise ValueError(f"Could not find any reliable research data for topic: {topic}")
        
    # 2. Generate
    article = generate_article_content(topic, research_data)
    
    # 3. Validate
    validation_result = verify_sources_and_claims(article, research_data)
    if not validation_result.is_valid:
        raise ValueError(f"Validation failed: {validation_result.reason}. Unsupported claims: {validation_result.unsupported_claims}")
        
    # Return as JSON
    return article.model_dump_json()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="CareerVixa AI Article Generator")
    parser.add_argument("--topic", type=str, help="Specific topic to generate an article for", default=None)
    args = parser.parse_args()
    
    try:
        result_json = generate_article(args.topic)
        print(result_json)
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
