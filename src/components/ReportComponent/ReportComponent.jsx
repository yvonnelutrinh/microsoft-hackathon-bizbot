import "./ReportComponent.scss";
import MicrosoftEthicalAI from "../MicrosoftEthicalAi/MicrosoftEthicalAi";
import { useRef, useEffect } from "react";

export default function ReportComponent({ result, onRegenerate }) {
  console.log(result);
  const createMarkup = () => ({ __html: result });
  const ethicalAIRef = useRef(null);

  const handlePrint = () => {
    // Get the HTML content of the MicrosoftEthicalAI component
    const ethicalAIContent = ethicalAIRef.current ? ethicalAIRef.current.innerHTML : "";

    // Create a printable version that retains styles
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
          ${ethicalAIContent}
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.close();

    // Wait for resources to load then print
    printWindow.onload = function () {
      printWindow.focus();
      printWindow.print();
    };
  };

  return (
    <div className="report-container">
      <div className="report">
        <div className="report-header">
          <h1>your custom report</h1>
        </div>
        <div className="report-content">
          <div dangerouslySetInnerHTML={createMarkup()} />
          <div ref={ethicalAIRef}>
            <MicrosoftEthicalAI />
          </div>
          <div className="report-footer">
            <button className="secondary" onClick={onRegenerate}>
              Re-generate
            </button>
            <button className="primary" onClick={handlePrint}>
              Print Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}