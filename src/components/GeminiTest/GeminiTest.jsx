import React, { useState } from "react";
import "./GeminiTest.scss";
import FormComponent from "../FormComponent/FormComponent";
import ReportComponent from "../ReportComponent/ReportComponent";
export default function GeminiTest({ model }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  const analyzeWithGemini = async ({
    businessType,
    employeeCount,
    annualRevenue,
    budgetForAI,
    timeConsumingTasks,
    currentSoftware,
  }) => {
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
              
              Focus on affordable, practical solutions for small businesses. Be specific about which Microsoft tools and services would be most helpful for this business type. Include links to Microsoft's ethical AI resources. Return your response in a valid div element that can be directly injected into html do not prompt the response with "html". I want a clean input with just your answers. Feel free to add style font-weight: bold int the element style attribute where you have asterisks. Keep in mind that this is going to be displayed on a website and eventually printed to a PDF. Do not post any links you are not sure of. Thanks.
              
              Add this to your response format in html too:
              Microsoft is deeply committed to developing and deploying AI responsibly, guided by a set of ethical principles. Here are some key aspects of their approach:
              Responsible AI Principles
              Microsoft's AI development is anchored in six core principles:
              Fairness: Ensuring AI systems treat all users equitably.
              Reliability and Safety: Building AI that operates safely and reliably in all scenarios.
              Privacy and Security: Protecting user data and ensuring secure AI systems.
              Inclusiveness: Designing AI to empower and include people of all abilities.
              Transparency: Making AI systems understandable and their decisions explainable.
              Accountability: Ensuring humans remain in control and accountable for AI systems.
              Governance and Oversight Microsoft has established internal frameworks like the Responsible AI Standard and committees such as Aether (AI and Ethics in Engineering and Research) to guide ethical AI practices. These frameworks ensure that AI systems are designed, tested, and deployed responsibly.
              AI for Good Initiatives Microsoft actively uses AI to address societal challenges, such as environmental sustainability, accessibility, and cultural preservation, through programs like AI for Good Labs. You can explore more about their policies and initiatives on their official page. Let me know if you'd like to dive deeper into any specific aspect!
              `;

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

  return (
    <div>
      {error ? (
        "There was an error getting a response please try again"
      ) : result ? (
        <ReportComponent result={result} />
      ) : (
        <FormComponent handleSubmit={analyzeWithGemini} loading={loading} />
      )}
    </div>
  );
}
