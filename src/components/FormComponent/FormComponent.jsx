import { useState } from "react";
import "./FormComponent.scss";

function FormComponent({ handleSubmit, loading }) {

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
      {" "}
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
      <button
        onClick={() =>
          handleSubmit({
            businessType,
            employeeCount,
            annualRevenue,
            budgetForAI,
            timeConsumingTasks,
            currentSoftware,
          })
        }
        disabled={loading || !isFormValid()}
      >
        {loading ? "Generating Recommendations..." : "Get AI Recommendations"}
      </button>
    </div>
  );
}

export default FormComponent;
