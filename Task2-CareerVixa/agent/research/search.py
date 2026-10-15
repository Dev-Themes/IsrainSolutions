import os
from typing import List, Dict, Any

def perform_research(topic: str) -> List[Dict[str, Any]]:
    """
    Performs live web research on the given topic using the Tavily API.
    Returns a list of 5-8 search results including URLs, titles, and rich content.
    """
    tavily_api_key = os.environ.get("TAVILY_API_KEY")
    if not tavily_api_key:
        raise ValueError("TAVILY_API_KEY environment variable is not set")

    try:
        from tavily import TavilyClient
        tavily = TavilyClient(api_key=tavily_api_key)
    except ImportError:
        raise ImportError("tavily-python package is not installed. Run: pip install tavily-python")

    # Authoritative search targeting recent evidence and industry trends
    response = tavily.search(
        query=f"latest authoritative {topic} career advice research trends industry data",
        search_depth="advanced",
        max_results=6,
        include_raw_content=True
    )

    results = response.get("results", [])

    # Filter out empty results and structure
    valid_results = []
    for r in results:
        content = r.get("raw_content") or r.get("content")
        if r.get("url") and content:
            valid_results.append({
                "url": r["url"],
                "title": r.get("title"),
                "content": str(content)[:2000]
            })

    return valid_results

if __name__ == "__main__":
    try:
        results = perform_research("How to negotiate a salary in modern tech")
        print(f"Retrieved {len(results)} authoritative sources.")
    except Exception as e:
        print(f"Error during test: {e}")
