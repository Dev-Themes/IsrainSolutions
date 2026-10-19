const fs = require('fs');

const articles = [
  {
    slug: 'ace-the-behavioral-interview',
    title: 'How to Ace the Behavioral Interview in 2024',
    category: 'Interviews'
  },
  {
    slug: 'remote-work-leadership',
    title: 'Leading a Remote Team Without Micromanaging',
    category: 'Leadership'
  },
  {
    slug: 'workplace-growth-tips',
    title: '7 Ways to Accelerate Your Workplace Growth',
    category: 'Workplace Growth'
  },
  {
    slug: 'tech-job-search',
    title: 'Navigating the Tech Job Search in a Down Market',
    category: 'Job Search'
  },
  {
    slug: 'negotiating-equity',
    title: 'The Beginner Guide to Negotiating Equity',
    category: 'Salary & Negotiation'
  }
];

articles.forEach(a => {
  const content = `---
title: "${a.title}"
dek: "A short, engaging description for ${a.title} that fits the 20-30 word constraint."
description: "A longer description for SEO purposes that is between 140 and 160 characters long. It should describe ${a.title} perfectly."
category: "${a.category}"
tags:
  - Career
  - Advice
  - Tips
author: "Alex Writer"
publishedAt: "2024-03-01T08:00:00Z"
updatedAt: "2024-03-01T08:00:00Z"
heroImage:
  src: "/images/${a.slug}.jpg"
  alt: "${a.title}"
  credit: "Photo by Unsplash"
faq:
  - question: "Question 1"
    answer: "Answer 1"
  - question: "Question 2"
    answer: "Answer 2"
  - question: "Question 3"
    answer: "Answer 3"
takeaways:
  - "Takeaway 1"
  - "Takeaway 2"
  - "Takeaway 3"
  - "Takeaway 4"
---

This is the content for ${a.title}.

## Section 1

Some content here.

## Section 2

More content here.

### Subsection

Even more content.
`;
  fs.writeFileSync(`content/articles/${a.slug}.mdx`, content);
});
