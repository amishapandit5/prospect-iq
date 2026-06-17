import { useState } from "react";

const styles = {
  app: {
    minHeight: "100vh",
    backgroundColor: "#0a0a0f",
    color: "#ffffff",
    fontFamily: "'Inter', -apple-system, sans-serif",
    padding: "0",
    margin: "0",
  },
  nav: {
    borderBottom: "1px solid #1e1e2e",
    padding: "20px 40px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "#0d0d1a",
  },
  logoDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "#6366f1",
  },
  logoText: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#ffffff",
    letterSpacing: "-0.3px",
  },
  logoTag: {
    fontSize: "11px",
    color: "#6366f1",
    backgroundColor: "#1a1a2e",
    padding: "3px 8px",
    borderRadius: "4px",
    marginLeft: "4px",
  },
  main: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "60px 40px",
  },
  headline: {
    fontSize: "42px",
    fontWeight: "700",
    letterSpacing: "-1px",
    lineHeight: "1.15",
    marginBottom: "16px",
    background: "linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: "17px",
    color: "#8b8fa8",
    marginBottom: "48px",
    lineHeight: "1.6",
    maxWidth: "600px",
  },
  inputCard: {
    backgroundColor: "#0d0d1a",
    border: "1px solid #1e1e2e",
    borderRadius: "16px",
    padding: "32px",
    marginBottom: "48px",
  },
  inputLabel: {
    fontSize: "13px",
    color: "#8b8fa8",
    marginBottom: "12px",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  textarea: {
    width: "100%",
    backgroundColor: "#13131f",
    border: "1px solid #2a2a3e",
    borderRadius: "10px",
    color: "#ffffff",
    fontSize: "15px",
    padding: "14px 16px",
    resize: "none",
    outline: "none",
    fontFamily: "inherit",
    lineHeight: "1.6",
    boxSizing: "border-box",
  },
  inputHint: {
    fontSize: "12px",
    color: "#4a4a6a",
    marginTop: "8px",
  },
  button: {
    marginTop: "20px",
    backgroundColor: "#6366f1",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "14px 28px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  buttonDisabled: {
    backgroundColor: "#2a2a4a",
    color: "#6b6b8a",
    cursor: "not-allowed",
  },
  loading: {
    textAlign: "center",
    padding: "60px 0",
    color: "#8b8fa8",
    fontSize: "16px",
  },
  spinner: {
    width: "36px",
    height: "36px",
    border: "3px solid #1e1e2e",
    borderTop: "3px solid #6366f1",
    borderRadius: "50%",
    margin: "0 auto 16px",
  },
  resultsHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
  },
  resultsTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#ffffff",
  },
  resultsBadge: {
    fontSize: "13px",
    color: "#6366f1",
    backgroundColor: "#1a1a2e",
    padding: "4px 12px",
    borderRadius: "20px",
  },
  card: {
    backgroundColor: "#0d0d1a",
    border: "1px solid #1e1e2e",
    borderRadius: "16px",
    padding: "28px",
    marginBottom: "16px",
    transition: "border-color 0.2s ease",
  },
  cardHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "12px",
  },
  cardName: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "4px",
  },
  cardMeta: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "6px",
  },
  badge: {
    fontSize: "12px",
    padding: "4px 10px",
    borderRadius: "6px",
    fontWeight: "500",
  },
  scoreCircle: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    border: "2px solid #6366f1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: "0",
  },
  scoreNumber: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#6366f1",
    lineHeight: "1",
  },
  scoreLabel: {
    fontSize: "8px",
    color: "#4a4a6a",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  divider: {
    borderTop: "1px solid #1a1a2e",
    margin: "16px 0",
  },
  whySection: {
    marginBottom: "16px",
  },
  sectionLabel: {
    fontSize: "11px",
    color: "#6366f1",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  whyText: {
    fontSize: "14px",
    color: "#c5c8e0",
    lineHeight: "1.6",
  },
  workflowsSection: {
    marginBottom: "16px",
  },
  workflowItem: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
    marginBottom: "10px",
  },
  workflowNumber: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "#1a1a2e",
    color: "#6366f1",
    fontSize: "11px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: "0",
    marginTop: "2px",
  },
  workflowText: {
    fontSize: "13px",
    color: "#9b9eb8",
    lineHeight: "1.6",
  },
  reachOut: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#13131f",
    borderRadius: "8px",
    padding: "10px 14px",
    marginTop: "4px",
  },
  reachOutLabel: {
    fontSize: "12px",
    color: "#4a4a6a",
  },
  reachOutValue: {
    fontSize: "13px",
    color: "#a5b4fc",
    fontWeight: "500",
  },
  jobsSection: {
    marginBottom: "16px",
  },
  jobItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "6px",
  },
  jobDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#22c55e",
    flexShrink: "0",
  },
  jobTitle: {
    fontSize: "13px",
    color: "#9b9eb8",
  },
  jobDays: {
    fontSize: "12px",
    color: "#4a4a6a",
    marginLeft: "auto",
  },
};

function getScoreColor(score) {
  if (score >= 80) return "#22c55e";
  if (score >= 65) return "#6366f1";
  return "#f59e0b";
}

function getFundingColor(stage) {
  const colors = {
    "Series A": { bg: "#1a2a1a", text: "#4ade80" },
    "Series B": { bg: "#1a1a2e", text: "#818cf8" },
    "Series C": { bg: "#2a1a1a", text: "#f87171" },
    "Series D": { bg: "#2a2a0a", text: "#facc15" },
  };
  return colors[stage] || { bg: "#1e1e2e", text: "#8b8fa8" };
}

function getReadinessColor(readiness) {
  if (readiness === "High") return { bg: "#0f2a1a", text: "#22c55e" };
  return { bg: "#2a1f0a", text: "#f59e0b" };
}

export default function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [prospects, setProspects] = useState([]);
  const [error, setError] = useState("");

  async function handleAnalyse() {
    const names = input
      .split("\n")
      .map(n => n.trim())
      .filter(n => n.length > 0);

    if (names.length === 0) {
      setError("Please enter at least one company name.");
      return;
    }

    setLoading(true);
    setError("");
    setProspects([]);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company_names: names }),
      });
      const data = await response.json();
      setProspects(data.prospects);
    } catch (err) {
      setError("Could not connect to backend. Make sure uvicorn is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.app}>

      <nav style={styles.nav}>
        <div style={styles.logoDot} />
        <span style={styles.logoText}>Prospect IQ</span>
        <span style={styles.logoTag}>by Crustdata</span>
      </nav>

      <main style={styles.main}>

        <h1 style={styles.headline}>
          Find your next 50<br />customers before<br />they find you.
        </h1>

        <p style={styles.subtitle}>
          Paste company names below. Prospect IQ analyses their
          hiring signals using Crustdata Jobs API to identify
          who is 30-60 days away from needing a data enrichment
          solution and exactly how to sell to them.
        </p>

        <div style={styles.inputCard}>
          <div style={styles.inputLabel}>Company names</div>

          <textarea
            style={styles.textarea}
            rows={5}
            placeholder={"Salesforce\nHubSpot\nApollo\nOutreach\nGong"}
            value={input}
            onChange={e => setInput(e.target.value)}
          />

          <div style={styles.inputHint}>
            One company per line. Try 3-5 to start.
          </div>

          {error && (
            <div style={{ color: "#f87171", fontSize: "13px", marginTop: "10px" }}>
              {error}
            </div>
          )}

          <button
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {})
            }}
            onClick={handleAnalyse}
            disabled={loading}
          >
            {loading ? "Analysing..." : "Find Prospects"}
          </button>
        </div>

        {loading && (
          <div style={styles.loading}>
            <div style={{
              ...styles.spinner,
              animation: "spin 0.8s linear infinite"
            }} />
            <div>Scanning hiring signals with Crustdata...</div>
            <div style={{ fontSize: "13px", marginTop: "8px", color: "#4a4a6a" }}>
              Calling Jobs API then Enriching profiles then Generating workflows
            </div>
          </div>
        )}

        {prospects.length > 0 && (
          <div>
            <div style={styles.resultsHeader}>
              <div style={styles.resultsTitle}>Prospects identified</div>
              <div style={styles.resultsBadge}>
                {prospects.length} companies found
              </div>
            </div>

            {prospects.map((prospect, index) => {
              const fundingColors = getFundingColor(prospect.funding_stage);
              const readinessColors = getReadinessColor(prospect.buyer_readiness);
              const scoreColor = getScoreColor(prospect.icp_score);

              return (
                <div key={index} style={styles.card}>

                  <div style={styles.cardHeader}>
                    <div>
                      <div style={styles.cardName}>{prospect.name}</div>
                      <div style={styles.cardMeta}>
                        <span style={{ ...styles.badge, backgroundColor: "#1e1e2e", color: "#8b8fa8" }}>
                          {prospect.industry}
                        </span>
                        <span style={{ ...styles.badge, backgroundColor: fundingColors.bg, color: fundingColors.text }}>
                          {prospect.funding_stage}
                        </span>
                        <span style={{ ...styles.badge, backgroundColor: "#1e1e2e", color: "#8b8fa8" }}>
                          {prospect.headcount} employees
                        </span>
                        <span style={{ ...styles.badge, backgroundColor: "#0f2a1a", color: "#22c55e" }}>
                          +{prospect.headcount_growth_6m}% 6m growth
                        </span>
                        <span style={{ ...styles.badge, backgroundColor: readinessColors.bg, color: readinessColors.text }}>
                          {prospect.buyer_readiness} readiness
                        </span>
                      </div>
                    </div>

                    <div style={{ ...styles.scoreCircle, borderColor: scoreColor }}>
                      <span style={{ ...styles.scoreNumber, color: scoreColor }}>
                        {prospect.icp_score}
                      </span>
                      <span style={styles.scoreLabel}>ICP</span>
                    </div>
                  </div>

                  <div style={styles.jobsSection}>
                    <div style={styles.sectionLabel}>Hiring signals detected</div>
                    {prospect.recent_jobs.map((job, ji) => (
                      <div key={ji} style={styles.jobItem}>
                        <div style={styles.jobDot} />
                        <span style={styles.jobTitle}>{job.title}</span>
                        <span style={styles.jobDays}>{job.posted_days_ago}d ago</span>
                      </div>
                    ))}
                  </div>

                  <div style={styles.divider} />

                  <div style={styles.whySection}>
                    <div style={styles.sectionLabel}>Why they will buy</div>
                    <div style={styles.whyText}>{prospect.why_prospect}</div>
                  </div>

                  <div style={styles.divider} />

                  <div style={styles.workflowsSection}>
                    <div style={styles.sectionLabel}>Recommended Crustdata workflows</div>
                    {prospect.workflows.map((workflow, wi) => (
                      <div key={wi} style={styles.workflowItem}>
                        <div style={styles.workflowNumber}>{wi + 1}</div>
                        <div style={styles.workflowText}>{workflow}</div>
                      </div>
                    ))}
                  </div>

                  <div style={styles.divider} />

                  <div style={styles.reachOut}>
                    <span style={styles.reachOutLabel}>Reach out to</span>
                    <span style={styles.reachOutValue}>{prospect.reach_out_to}</span>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: #0a0a0f; }
        textarea:focus { border-color: #6366f1 !important; }
        textarea::placeholder { color: #3a3a5a; }
        button:hover:not(:disabled) {
          background-color: #4f46e5;
          transform: translateY(-1px);
        }
      `}</style>

    </div>
  );
}