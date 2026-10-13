# CareerVixa Autonomous AI Publishing

This directory contains the Python agent responsible for researching and generating career-related articles for CareerVixa.

## Overview

The AI Agent performs the following steps:
1. **Topic Selection**: Chooses a unique niche-specific topic (`research/topic.py`).
2. **Web Research**: Queries the live web using Tavily API to gather facts (`research/search.py`).
3. **Article Generation**: Prompts an LLM (e.g. OpenAI) to format the research into a structured HTML article (`generation/article.py`).
4. **Validation**: Verifies that the article doesn't hallucinate facts not found in the original research (`validation/sources.py`).

## Setup

1. Create a Python virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure Environment Variables in `agent/.env`:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   TAVILY_API_KEY=your_tavily_api_key
   ```

## Daily Automation (Inngest)

The daily publishing trigger is managed by the Next.js backend using **Inngest**.
- The cron job is configured to run at **9:00 AM Asia/Karachi**.
- It uses a daily database lock to prevent duplicate articles from being published.
- In a production environment on Vercel, this Python script should be deployed as a separate microservice (like FastAPI) or wrapped in a Vercel Python Serverless Function so that the Next.js backend can trigger it via HTTP.

## Troubleshooting

- **No articles published**: Check the `AI Execution History` tab in the CMS admin panel.
- **Validation failures**: The agent will retry up to 3 times if an article fails source validation or HTML layout checks.
- **Inngest errors**: Use `npx inngest-cli@latest dev` locally to inspect the cron job logs.
