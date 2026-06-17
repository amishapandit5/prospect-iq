# Prospect IQ — Built for Crustdata

> Find your next 50 customers before they find you.

Prospect IQ is a sales intelligence tool that uses Crustdata's Jobs API to identify companies that are 30–60 days away from needing a data enrichment solution — and tells you exactly how to sell to each one.

---

## The Insight Behind This

Job listings are a company's strategy, accidentally made public.

When a company simultaneously hires **Data Engineers** and **Sales Operations** roles, it almost always means one thing: they are scaling their revenue infrastructure faster than their current data stack can support. That pattern is a buying signal — and it shows up in job listings weeks before the company even starts evaluating vendors.

Prospect IQ detects that signal at scale, enriches each company with Crustdata's Company Enrichment API, and uses Claude AI to generate tailored workflow recommendations — so Crustdata's sales team knows exactly who to call and exactly what to build for them before the call even starts.

---

## What It Does

**1. Signal Detection**
Uses Crustdata's Jobs API to find companies hiring Data Engineers and Sales Ops roles simultaneously — the pattern that predicts a data enrichment purchase within 60 days.

**2. Company Profiling**
Enriches each company with Crustdata's Company Enrichment API — headcount, growth rate, funding stage, industry — to build a complete prospect profile.

**3. ICP Scoring**
Scores each company from 0–100 based on how closely they match Crustdata's Ideal Customer Profile. Factors include headcount growth rate, funding stage, and hiring velocity.

**4. Workflow Generation**
Claude AI analyses each company's profile and generates 3 specific workflow recommendations showing exactly how Crustdata's APIs would fit into their business right now.

**5. Outreach Targeting**
Identifies the exact job title to reach out to at each company — the person most likely to own the decision.

DEMO VIDEO: https://drive.google.com/file/d/1qy8E5BEOurEH5pjWWxLMUAiqddNNW8tP/view?usp=sharing
---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | React | Fast, component-based UI |
| Backend | Python + FastAPI | Clean async API server |
| Data | Crustdata Jobs API | Hiring signal detection (not available right now) |
| Enrichment | Crustdata Company Enrichment API | Full company profiles (not available right now) |
| Intelligence | Claude AI (Anthropic) | Workflow recommendation generation |

---

## How It Works — The Full Flow

```
User enters company names
        ↓
Frontend sends POST request to backend
        ↓
Backend calls Crustdata Jobs API
→ Detects hiring signal pattern
        ↓
Backend calls Crustdata Company Enrichment API
→ Builds full company profile
        ↓
Backend sends enriched data to Claude AI
→ Generates ICP score + workflow recommendations
        ↓
Frontend displays ranked prospect cards
→ Each with score, signals, workflows, and who to contact
```

---
## Running Locally

**Prerequisites:** Python 3.10+, Node.js 16+

**1. Clone the repository**
```bash
git clone https://github.com/YOURUSERNAME/prospect-iq.git
cd prospect-iq
```

**2. Set up the backend**
```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file:
```
CRUSTDATA_API_KEY=your_crustdata_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here
```

Start the server:
```bash
uvicorn main:app --reload
```

Backend runs at `http://127.0.0.1:8000`

**3. Set up the frontend**
```bash
cd ../frontend
npm install
npm start
```

Frontend runs at `http://localhost:3000`

---

## API Endpoints

### POST /analyze

Accepts a list of company names and returns a full prospect intelligence report.

**Request**
```json
{
  "company_names": ["Salesforce", "HubSpot", "Apollo"]
}
```

**Response**
```json
{
  "prospects": [
    {
      "name": "Salesforce",
      "headcount": 500,
      "headcount_growth_6m": 12.4,
      "funding_stage": "Series C",
      "industry": "SaaS",
      "icp_score": 87,
      "buyer_readiness": "High",
      "recent_jobs": [
        { "title": "Data Engineer", "posted_days_ago": 15 },
        { "title": "Sales Operations Manager", "posted_days_ago": 22 }
      ],
      "why_prospect": "Simultaneously hiring Data Engineers and Sales Ops signals active investment in revenue infrastructure that typically precedes a data enrichment API purchase within 60 days.",
      "workflows": [
        "Use Crustdata Jobs API to monitor when target accounts post new sales roles — a signal they are scaling revenue teams and need better data infrastructure",
        "Enrich every inbound lead automatically with Crustdata People API before it enters the CRM",
        "Set up Crustdata Watcher API to alert the sales team the moment a target account receives new funding"
      ],
      "reach_out_to": "VP of Sales Operations"
    }
  ]
}
```

---

## Connecting Real Crustdata APIs

The tool currently runs on realistic mock data. Swapping in real Crustdata API calls requires changing two functions in `backend/main.py`:

1. Replace `get_mock_crustdata()` with a real call to the **Jobs API**
2. Add a call to the **Company Enrichment API** inside the same function

Once a Crustdata API key is added to `.env`, the tool is fully production-ready.

---

## What This Could Become

This is a weekend build. With real API access and iteration, Prospect IQ could become:

- A daily automated prospect list delivered to Crustdata's sales Slack channel
- A CRM integration that auto-enriches and scores inbound leads on entry
- A browser extension that scores any company page the sales team visits
- A webhook-powered alert system that fires when a monitored company posts a new buying signal

a. It was built independently as a demonstration of what is possible with the Crustdata API.*
