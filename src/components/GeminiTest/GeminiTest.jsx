import { useState } from "react";
import "./GeminiTest.scss";
import FormComponent from "../FormComponent/FormComponent";
import ReportComponent from "../ReportComponent/ReportComponent";
import Loading from "../Loading/Loading";

export default function GeminiTest({ model }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [businessParams, setBusinessParams] = useState(null);
  const [showForm, setShowForm] = useState(true);
 
  const buildPrompt = (businessData, isRegenerate = false) => {
    let prompt = `You are a small business AI consultant. Analyze this small business data and provide practical recommendations for AI integration to save time and money:
            
            ${businessData}
    
    Format the response using clear section separators with structured HTML:

    <div class="report-section">
      <h2>Overview of Business Needs</h2>
      <!-- Business overview content here -->
    </div>

    <div class="report-section">
      <h2>Top 3 AI Opportunities</h2>
      <!-- AI opportunities content here -->
    </div>

    <div class="report-section">
      <h2>Recommended Microsoft Tools</h2>
      <!-- Microsoft tools recommendations here -->
    </div>

    <div class="report-section">
      <h2>Expected Benefits & ROI</h2>
      <!-- Benefits and ROI content here -->
    </div>

    <div class="report-section">
      <h2>Simple Implementation Steps</h2>
      <!-- Implementation steps here -->
    </div>

    Use <ul>, <ol>, and <li> for lists. Return a valid HTML structure without markdown or backticks.
    Focus on affordable, practical solutions for small businesses. Be specific about which Microsoft tools and services would be most helpful for this business type.`;

    // Add more tailored instructions for regeneration
    if (isRegenerate) {
      prompt += `
      
      Please provide a more tailored and specific response with more concrete examples relevant to this specific business type and needs. Go deeper into industry-specific use cases and provide more detailed implementation steps.`;
    }

    return prompt;
  };

  const formatBusinessData = (params) => {
    const {
      businessType,
      employeeCount,
      annualRevenue,
      budgetForAI,
      timeConsumingTasks,
      currentSoftware,
    } = params;

    return `
      Business Type: ${businessType}
      Employee Count: ${employeeCount}
      Annual Revenue: ${annualRevenue}
      Budget for AI Solutions: ${budgetForAI}
      
      Most Time-Consuming Tasks:
      ${timeConsumingTasks}
      
      Current Software/Tools:
      ${softwaresInString()}
    `;
  };

  const analyzeWithGemini = async (params, isRegenerate = false) => {
    try {
      setLoading(true);
      setShowForm(false);
      setError("");

      // Store params for potential regeneration
      if (!isRegenerate) {
        setBusinessParams(params);
      }

      const businessData = formatBusinessData(params);
      const prompt = buildPrompt(businessData, isRegenerate);
      
      console.log("Sending prompt to Gemini:", businessData);
      
      const response = await model.generateContent(prompt);
      const data = response.response.text();
      setResult(data);
    } catch (err) {
      console.error(`Error: ${err.message}`);
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (businessParams) {
      analyzeWithGemini(businessParams, true);
    }
  };

  const renderContent = () => {
    if (error) {
      return <div className="error-message">There was an error getting a response. Please try again.</div>;
    }
    
    if (loading) {
      return <Loading />;
    }
    
    if (result) {
      return <ReportComponent result={result} onRegenerate={handleRegenerate} />;
    }
    
    return <FormComponent handleSubmit={analyzeWithGemini} loading={loading} />;
  };

  return (
    <div className="gemini-test-container">
      {renderContent()}
    </div>
  );
}