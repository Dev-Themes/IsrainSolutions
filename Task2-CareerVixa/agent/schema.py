from pydantic import BaseModel, Field
from typing import List

class ArticleSchema(BaseModel):
    title: str = Field(..., description="SEO optimized title")
    slug: str = Field(..., description="URL friendly slug")
    summary: str = Field(..., description="Short excerpt for the article")
    content: str = Field(..., description="HTML formatted article body")
    metaTitle: str = Field(..., description="Short meta title for SEO, strictly under 60 characters")
    metaDescription: str = Field(..., description="Short meta description for SEO, strictly under 150 characters")
    sources: List[str] = Field(..., description="List of source URLs used for research")
