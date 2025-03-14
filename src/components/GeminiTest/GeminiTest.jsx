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
        const prompt = `You are a small business AI consultant. Analyze this small business data and provide practical recommendations for AI integration to save time and money:
              
              ${businessData}
              
              Structure your response with these sections:
              1. Overview of Business Needs
              2. Top 3 AI Opportunities
              3. Recommended Microsoft Tools (be specific with product names do not be generic)
              4. Expected Benefits & ROI
              5. Simple Implementation Steps
              6. Microsoft Resources for Ethical AI Use
              
              Focus on affordable, practical solutions for small businesses. Be specific about which Microsoft tools and services would be most helpful for this business type. Include links to Microsoft's ethical AI resources. Return your response in a valid div element that can be directly injected into html do not prompt the response with "html". I want a clean input with just your answers. Feel free to add style font-weight: bold int the element style attribute where you have asterisks. Keep in mind that this is going to be displayed on a website and eventually printed to a PDF.`
      
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
          <div dangerouslySetInnerHTML={{__html: result}}></div>
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
