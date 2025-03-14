import "./ReportComponent.scss";
import MicrosoftEthicalAI from "../MicrosoftEthicalAi/MicrosoftEthicalAi";
import { useRef, useEffect, useState } from "react";
import {Link} from "react-router-dom";
export default function ReportComponent({ result, onRegenerate }) {
  const [animate, setAnimate] = useState(false);
  const ethicalAIRef = useRef(null);

  useEffect(() => {
    // Trigger animation after the component mounts or updates
    setTimeout(() => {
      setAnimate(true);
    }, 100); // Delay ensures smoother effect
  }, [result]); // Re-run animation when `result` changes

  const createMarkup = () => ({ __html: result });

  const handlePrint = () => {
    const ethicalAIContent = ethicalAIRef.current
      ? ethicalAIRef.current.innerHTML
      : "";

    const printContent = document.createElement("div");
    printContent.innerHTML = `
      <html>
        <head>
          <title>AI Adoption Recommendations</title>
          <h1>AI Adoption Recommendations</h1>
          <style>
            body {
              font-family: 'Inter', sans-serif;
              line-height: 1.6;
              color: #222;
              max-width: 900px;
              margin: 0 auto;
              padding: 20px;
            }
            h1, h2, h3, h4, h5, h6 {
              font-family: 'Poppins', sans-serif;
              font-weight: 600;
              margin: 20px 0;
            }
            h1 {
              font-size: 32px;
              color: #1a3787;
            }
            h2 {
              font-size: 28px;
              margin-bottom: 20px;
              color: #1a3787;
            }
            h3 {
              font-size: 22px;
              color: #1a3787;
              margin-bottom: 15px;
            }
            p {
              margin: 20px 0;
            }
            ul, ol {
              margin: 20px 0;
              padding-left: 12px;
            }
            li {
              margin-bottom: 10px;
              padding: 5px 0;
            }
            strong, b {
              font-weight: 600;
            }
            a {
              color: #1a3787;
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          ${result}
          <div>
      <h2>Microsoft Resources for Ethical AI Use</h2>
      <p>
        Microsoft is committed to responsible AI development, following key
        principles:
      </p>
      <h3>Responsible AI Principles</h3>
      <ul>
        <li>
          <strong>Fairness:</strong> AI treats all users equitably.
        </li>
        <li>
          <strong>Reliability & Safety:</strong> Ensuring secure AI systems.
        </li>
        <li>
          <strong>Privacy & Security:</strong> Protecting user data.
        </li>
        <li>
          <strong>Inclusiveness:</strong> AI designed for accessibility.
        </li>
        <li>
          <strong>Transparency:</strong> Explainable AI decisions.
        </li>
        <li>
          <strong>Accountability:</strong> Human oversight in AI.
        </li>
      </ul>
      <p>
        Microsoft follows Responsible AI Standards and ethical frameworks like
        Aether (AI and Ethics in Engineering and Research). You can explore more
        about their policies and initiatives on their official page:
      </p>
      <ul>
        <li>
          <a href="https://www.microsoft.com/en-us/ai/responsible-ai">
            Responsible AI (https://www.microsoft.com/en-us/ai/responsible-ai)
          </a>
        </li>
        <li>
          <a href="https://www.microsoft.com/en-us/ai/ai-principles">
            AI Principles (https://www.microsoft.com/en-us/ai/ai-principles)
          </a>
        </li>
      </ul>
    </div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.close();
    printWindow.onload = function () {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    };
  };
  
  
  return (
    <div className="report-container">
      <Link to={"/"}><img className="logo" src="/src/assets/LogoSmall.png" alt="Logo" /></Link>
      <div className={`report ${animate ? "fade-in" : ""}`}>
        <div className="report-header">
          <h1>your custom report</h1>
        </div>
        <div className="report-content">
          <div
            className={`ai-content ${animate ? "fade-in" : ""}`}
            dangerouslySetInnerHTML={createMarkup()}
          />
          <div
            ref={ethicalAIRef}
            className={`ethical-ai ${animate ? "fade-in" : ""}`}
          >
            <MicrosoftEthicalAI />
          </div>
          <div className="report-footer">
            <button
              className={`secondary ${animate ? "fade-in" : ""}`}
              onClick={onRegenerate}
            >
              Re-generate
            </button>
            <button
              className={`primary ${animate ? "fade-in" : ""}`}
              onClick={handlePrint}
            >
              Print Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
