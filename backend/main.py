from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import anthropic
import json

load_dotenv()

CRUSTDATA_API_KEY = os.getenv("CRUSTDATA_API_KEY")
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    company_names: list[str]

def get_mock_crustdata(company_names: list[str]):
    mock_companies = []
    job_roles = [
        "Data Engineer",
        "Sales Operations Manager",
        "Revenue Operations Analyst",
        "Data Infrastructure Engineer",
        "Sales Ops Lead"
    ]
    industries = ["SaaS", "Fintech", "HR Tech", "Marketing Tech", "Sales Tech"]
    funding_stages = ["Series A", "Series B", "Series C", "Series D"]

    for i, name in enumerate(company_names):
        company = {
            "name": name,
            "headcount": 50 + (i * 47),
            "headcount_growth_6m": round(5 + (i * 2.3), 1),
            "funding_stage": funding_stages[i % len(funding_stages)],
            "industry": industries[i % len(industries)],
            "recent_jobs": [
                {
                    "title": job_roles[i % len(job_roles)],
                    "posted_days_ago": 15 + (i * 7)
                },
                {
                    "title": "Sales Operations Manager" if i % 2 == 0 else "Revenue Operations Lead",
                    "posted_days_ago": 22 + (i * 5)
                }
            ],
            "icp_score": min(95, 60 + (i * 8)),
            "buyer_readiness": "High" if i % 3 != 2 else "Medium"
        }
        mock_companies.append(company)

    return mock_companies

def get_fallback_analysis(companies: list[dict]):
    # This runs when Claude API key is not available yet.
    # Returns realistic pre-written analysis so the demo
    # works perfectly without any API keys.

    workflow_templates = [
        [
            "Use Crustdata Jobs API to monitor when target accounts post new sales roles — a signal they are scaling revenue teams and need better data infrastructure",
            "Enrich every inbound lead automatically with Crustdata People API before it enters the CRM — giving SDRs full context on job title, seniority and company growth before first outreach",
            "Set up Crustdata Watcher API to alert the sales team the moment a target account receives new funding — the best time to reach out is within 48 hours of a funding announcement"
        ],
        [
            "Pull all competitor job listings weekly using Crustdata Jobs API to reverse-engineer their product roadmap and hiring strategy before your next board meeting",
            "Use Crustdata Company Enrichment API to score and tier your entire prospect list by headcount growth rate — focus sales effort on the fastest growing accounts first",
            "Build a PLG motion using Crustdata People API to identify power users at freemium accounts who have recently been promoted — promotion signals budget authority and purchase readiness"
        ],
        [
            "Use Crustdata Jobs API to find companies hiring Sales Ops and Data Engineers simultaneously — this pattern predicts data enrichment budget opening up within 60 days",
            "Enrich your entire CRM with Crustdata to surface accounts that have grown more than 20 percent in headcount in the last 6 months — prioritise these for expansion conversations",
            "Connect Crustdata Watcher API to your Slack so the sales team gets a real-time alert whenever a key account posts a role that signals a new strategic initiative"
        ]
    ]

    reason_templates = [
        "Simultaneously hiring Data Engineers and Sales Ops roles signals an active investment in revenue infrastructure that typically precedes a data enrichment API purchase within 60 days.",
        "Rapid headcount growth combined with new Sales Operations hiring indicates they are scaling GTM operations faster than their current data stack can support.",
        "Series B funding stage combined with technical hiring suggests they are building the data infrastructure layer that will power their next phase of growth."
    ]

    contact_templates = [
        "VP of Sales Operations",
        "Head of Revenue Operations",
        "Director of Data Engineering"
    ]

    result = []
    for i, company in enumerate(companies):
        result.append({
            "company_name": company["name"],
            "why_prospect": reason_templates[i % len(reason_templates)],
            "workflows": workflow_templates[i % len(workflow_templates)],
            "reach_out_to": contact_templates[i % len(contact_templates)]
        })

    return result

async def analyze_with_claude(companies: list[dict]):
    # First check if we even have a real API key
    if not ANTHROPIC_API_KEY or ANTHROPIC_API_KEY == "your_anthropic_key_here":
        # No real key yet — use fallback analysis
        return get_fallback_analysis(companies)

    try:
        # We have a key — try using Claude
        client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
        companies_text = json.dumps(companies, indent=2)

        prompt = f"""
You are a B2B sales intelligence analyst for Crustdata — 
a company that provides people, company, and jobs data APIs
to help businesses with sales, recruiting, and research.

Here is data on companies that are currently hiring 
Data Engineers and Sales Operations roles simultaneously.
This hiring pattern is a strong signal they will soon need 
a data enrichment API like Crustdata.

Company data:
{companies_text}

For each company, provide:
1. A one-sentence reason WHY they are a strong Crustdata prospect
2. Three specific workflow recommendations showing exactly how 
   Crustdata APIs would help their business right now
3. The best person title to reach out to at that company

Format your response as a JSON array like this:
[
  {{
    "company_name": "Company Name",
    "why_prospect": "One sentence explanation",
    "workflows": [
      "Workflow 1 description",
      "Workflow 2 description",
      "Workflow 3 description"
    ],
    "reach_out_to": "Job title to contact"
  }}
]

Return ONLY the JSON array. No explanation before or after.
"""

        message = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=4096,
            messages=[{"role": "user", "content": prompt}]
        )

        response_text = message.content[0].text
        cleaned = response_text.strip()

        if cleaned.startswith("```"):
            lines = cleaned.split("\n")
            cleaned = "\n".join(lines[1:-1])

        return json.loads(cleaned)

    except Exception as e:
        # If Claude fails for any reason, fall back gracefully
        print(f"Claude API error: {e}")
        print("Falling back to pre-written analysis...")
        return get_fallback_analysis(companies)

@app.post("/analyze")
async def analyze_companies(request: AnalyzeRequest):
    company_names = request.company_names
    raw_data = get_mock_crustdata(company_names)
    claude_analysis = await analyze_with_claude(raw_data)

    final_report = []
    for i, company in enumerate(raw_data):
        analysis = claude_analysis[i] if i < len(claude_analysis) else {}
        final_report.append({
            "name": company["name"],
            "headcount": company["headcount"],
            "headcount_growth_6m": company["headcount_growth_6m"],
            "funding_stage": company["funding_stage"],
            "industry": company["industry"],
            "recent_jobs": company["recent_jobs"],
            "icp_score": company["icp_score"],
            "buyer_readiness": company["buyer_readiness"],
            "why_prospect": analysis.get("why_prospect", ""),
            "workflows": analysis.get("workflows", []),
            "reach_out_to": analysis.get("reach_out_to", "")
        })

    return {"prospects": final_report}