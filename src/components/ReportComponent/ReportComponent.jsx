import React from "react";
import "./ReportComponent.scss";

function ReportComponent({ result }) {
  console.log(result); 
  //if result starts with ```html and ends with ```
  return (
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
  );
}

export default ReportComponent;
