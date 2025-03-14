import { useState } from "react";
import "./FormComponent.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
function FormComponent({ handleSubmit, loading }) {
  const softwares = [
		{ name: "Outlook", checked: false },
		{ name: "Word", checked: false },
		{ name: "PowerPoint", checked: false },
		{ name: "SharePoint", checked: false },
		{ name: "OneDrive", checked: false },
		{ name: "Excel", checked: false },
		{ name: "OneNote", checked: false },
		{ name: "Teams", checked: false },
	];
  const [leftPosition, setLeftPosition] = useState(
    Math.max(((window.innerWidth - 1024 -272) / 4) , 0)
  );
  useEffect(() => {
    const handleResize = () => {
      setLeftPosition(Math.max((window.innerWidth - 1024) / 4, 0));
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Small business specific fields
  const [businessType, setBusinessType] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [timeConsumingTasks, setTimeConsumingTasks] = useState("");
  const [currentSoftware, setCurrentSoftware] = useState(softwares);
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

  	//set software state checkboxes --Vivian
	const handleOnChangeCheckBox = (e) => {
		setCurrentSoftware((pre) => {
			let filteredPre = pre.filter((sw) => sw.name !== e.target.name);
			filteredPre.push({
				name: e.target.name,
				checked: e.target.checked,
			});
			return filteredPre;
		});
	};

  return (
    <>
      <div className = "page">
      <Link to="/" className="page_link" style={{ position: "absolute", left: `${leftPosition}px` }}><img className="page_link_logo" src="/src/assets/LogoSmall.png" alt="Logo"/></Link>        
        <div className ="page_front">
          {" "}
          <h1>Small Business AI Advisor</h1>
          <p>Get tailored AI recommendations for your small business</p>
          <div className = "main">
            <h2 className = "main_title">Tell us about your business</h2>

            <div className = "main_title_section">
              <div className = "main_title_section_Business">
                <label className = "main_title_section_Business_title" >Business Type</label>
                <select className = "main_title_section_Business_select"
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
              <div className = "main_title_section_time">
                <label className = "main_title_section_employee_title">Number of Employees</label>
                <select className = "main_title_section_employee_select"
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
              <div className = "main_title_section_time">
                <label className = "main_title_section_revenue_title" >Annual Revenue</label>
                <select className = "main_title_section_revenue_select"
                  value={annualRevenue}
                  onChange={(e) => setAnnualRevenue(e.target.value)}
                >
                  <option value="">Select range</option>
                  {revenueRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select >
              </div>

              <div className = "main_title_section_time">
                <label className = "main_title_section_solutions_title" >Budget for AI Solutions</label>
                <select className = "main_title_section_solutions_select"
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

            <div className = "main_title_section_time">
              <label className = "main_title_section_time_title">Most Time-Consuming Tasks</label>
              <textarea className = "main_title_section_time_select"
                value={timeConsumingTasks}
                onChange={(e) => setTimeConsumingTasks(e.target.value)}
                placeholder="Describe your 3 most time-consuming business tasks (e.g., invoicing, inventory management, customer support)"
              />
            </div>

            <div className = "main_title_section_software">
              <label className = "main_title_section_software_title">Current Software/Tools: </label>
              {currentSoftware
                ?.sort((a, b) => a.name.localeCompare(b.name))
                .map((sw, i) => (
                  <label key={i}>
                    <input
                    className="main_title_section_software_title"
                      type="checkbox"
                      name={sw.name}
                      checked={sw.checked}
                      onChange={handleOnChangeCheckBox}
                    />
                    {sw.name}
                  </label>
                ))}
              
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
      </div>
    </>
  );
}

export default FormComponent;
