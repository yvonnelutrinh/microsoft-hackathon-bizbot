import React, { useState } from "react";
import "./GeminiTest.scss";

export default function GeminiTest({ model }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  // Small business specific fields
  const [businessType, setBusinessType] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [timeConsumingTasks, setTimeConsumingTasks] = useState("");
  const [currentSoftware, setCurrentSoftware] = useState("");
  const [budgetForAI, setBudgetForAI] = useState("");

  const businessTypes = [
    "Retail",
    "Restaurant",
    "Professional Services",
    "Healthcare",
    "Construction",
    "Manufacturing",
    "E-commerce",
    "Salon/Spa",
    "Other",
  ];

  const employeeRanges = ["1-5", "6-10", "11-25", "26-50", "51-100", "100+"];

  const revenueRanges = [
    "Under $100k",
    "$100k-$500k",
    "$500k-$1M",
    "$1M-$5M",
    "$5M+",
  ];

  const budgetRanges = [
    "Under $1k",
    "$1k-$5k",
    "$5k-$10k",
    "$10k-$25k",
    "$25k+",
  ];

  const analyzeWithGemini = async () => {
    setLoading(true);
    setError("");
    setResult("");

    // Compile the business data
    const businessData = `
      Business Type: ${businessType}
      Employee Count: ${employeeCount}
      Annual Revenue: ${annualRevenue}
      Budget for AI Solutions: ${budgetForAI}
      
      Most Time-Consuming Tasks:
      ${timeConsumingTasks}
      
      Current Software/Tools:
      ${currentSoftware}
    `;

    try {
      const prompt = `You are an AI consultant specializing in Microsoft-powered business solutions. Analyze the provided small business data and deliver a structured AI integration plan to enhance productivity, reduce costs, and improve decision-making. Focus on solutions that integrate with Microsoft's ecosystem, ensuring responsible and ethical AI adoption.

Business Data:
${businessData}

Structure your response as follows:

Business Overview & Key Challenges – Summarize the business type, industry, and its primary challenges.
Top 3 AI Opportunities – Identify three practical AI-driven solutions to improve efficiency, reduce costs, or enhance decision-making.
Recommended Microsoft Tools & Services – Specify exact Microsoft products (e.g., Power Automate, Dynamics 365, Azure OpenAI) that best fit the business needs. Avoid generic responses.
Implementation Roadmap (Step-by-Step) – Provide a simplified action plan for integrating these solutions.
Expected ROI & Measurable Impact – Explain how AI will save time/money and provide key performance indicators (KPIs) to track success.
Responsible AI & Continuous Improvement – Recommend Microsoft’s responsible AI tools and frameworks (e.g., Microsoft Responsible AI Standard, Azure AI Content Safety). Suggest ways to monitor AI’s impact over time and collect user feedback.
Your response must be wrapped in a valid <div> element with minimal styling for easy integration into a website. Bold key takeaways using style="font-weight: bold". Ensure the output is concise, actionable, and professional, suitable for website display and PDF export.`;

      const response = await model.generateContent(prompt);

      const data = response.response.text();
      setResult(data);
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      businessType &&
      employeeCount &&
      annualRevenue &&
      timeConsumingTasks &&
      budgetForAI
    );
  };

  return (
    <div>
      <h1>Small Business AI Advisor</h1>
      <p>Get tailored AI recommendations for your small business</p>

      <div>
        <h2>Tell us about your business</h2>

        <div>
          <div>
            <label>Business Type</label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
            >
              <option value="">Select business type</option>
              {businessTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Number of Employees</label>
            <select
              value={employeeCount}
              onChange={(e) => setEmployeeCount(e.target.value)}
            >
              <option value="">Select range</option>
              {employeeRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <div>
            <label>Annual Revenue</label>
            <select
              value={annualRevenue}
              onChange={(e) => setAnnualRevenue(e.target.value)}
            >
              <option value="">Select range</option>
              {revenueRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Budget for AI Solutions</label>
            <select
              value={budgetForAI}
              onChange={(e) => setBudgetForAI(e.target.value)}
            >
              <option value="">Select budget range</option>
              {budgetRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label>Most Time-Consuming Tasks</label>
          <textarea
            value={timeConsumingTasks}
            onChange={(e) => setTimeConsumingTasks(e.target.value)}
            placeholder="Describe your 3 most time-consuming business tasks (e.g., invoicing, inventory management, customer support)"
          />
        </div>

        <div>
          <label>Current Software/Tools</label>
          <textarea
            value={currentSoftware}
            onChange={(e) => setCurrentSoftware(e.target.value)}
            placeholder="List software you currently use (e.g., Excel, QuickBooks, Outlook)"
          />
        </div>
      </div>

      <button onClick={analyzeWithGemini} disabled={loading || !isFormValid()}>
        {loading ? "Generating Recommendations..." : "Get AI Recommendations"}
      </button>

      {error && <div>{error}</div>}

      {result && (
        <div>
          <h2>Your AI Recommendations</h2>
          <div dangerouslySetInnerHTML={{ __html: result }}></div>
          <div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(result);
                alert("Report copied to clipboard!");
              }}
            >
              Copy Report
            </button>
            <button onClick={() => window.print()}>Print Report</button>
          </div>
        </div>
      )}
    </div>
  );
}
