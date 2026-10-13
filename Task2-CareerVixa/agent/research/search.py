import os
from typing import List, Dict, Any

def perform_research(topic: str) -> List[Dict[str, Any]]:
    """
    Performs live web research on the given topic using the Tavily API.
    Returns a list of search results including URLs and content.
    """
    tavily_api_key = os.environ.get("TAVILY_API_KEY")
    if not tavily_api_key:
        raise ValueError("TAVILY_API_KEY environment variable is not set")
        
    try:
        from tavily import TavilyClient
        tavily = TavilyClient(api_key=tavily_api_key)
    except ImportError:
        raise ImportError("tavily-python package is not installed. Run: pip install tavily-python")

    # We want authoritative career sources.
    # We perform an advanced search to get raw content for better context extraction.
    response = tavily.search(
        query=f"latest best practices {topic} career advice professionals",
        search_depth="advanced",
        max_results=5,
        include_raw_content=True
    )
    
    results = response.get("results", [])
    
    # Filter out empty results
    valid_results = [r for r in results if r.get("url") and r.get("content")]
    
    return valid_results

if __name__ == "__main__":
    # Test
    try:
        results = perform_research("How to negotiate a salary in 2024")
        for r in results:
            print(f"Source: {r['url']}\nContent snippet: {r['content'][:100]}...\n")
    except Exception as e:
        print(f"Error during test: {e}")
