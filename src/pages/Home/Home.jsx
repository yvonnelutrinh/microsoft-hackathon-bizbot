import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
function Home() {
  return (
    <main className="home">
      <div className="home__landing">
        <div className="home__logo">
          <img src="/src/assets/LogoHuge.png" alt="" />
        </div>
        <div className="home__landing-inner">
          <h1>
            Boost Efficiency. Cut Costs. Grow Smarter with 
            <span className="brand-name"> Biz-Bot.AI</span>
          </h1>

          <p>
            Discover how AI-powered solutions can streamline your business, save
            you time, and increase profitability—all within the Microsoft
            ecosystem.
          </p>
          <Link className="cta-button cta-button--2" to={"/report"}>
            Get Your Free AI Report
          </Link>
        </div>
      </div>

      <div className="section__1">
        <div className="section__1-inner">
          <h2>The AI Advantage for Small Businesses</h2>
          <ul>
            <li>
              Technology adoption is the #1 factor (28.3%) improving business
              efficiency in Canada.{" "}
              <a
                target="_blank"
                href="https://www150.statcan.gc.ca/n1/pub/11-621-m/11-621-m2024008-eng.htm"
              >
                (Statistics Canada)
              </a>
            </li>
            <li>
              41% of small businesses have used AI to free up their time for
              higher-value work.{" "}
              <a
                target="_blank"
                href="https://www.forbes.com/councils/forbesbusinesscouncil/2024/07/24/ais-transformative-impact-on-small-businesses/"
              >
                (Forbes)
              </a>
            </li>
            <li>
              37% reinvest AI-driven cost savings into new technologies for
              growth.{" "}
              <a
                target="_blank"
                href="https://theluxuryplaybook.com/100-interesting-stats-about-ai-in-small-businesses-2025-updated/#:~:text=AI%20tools%20for%20financial%20management,automating%20accounting%20and%20bookkeeping%20tasks"
              >
                (The Luxury playbook)
              </a>
            </li>
          </ul>
          <i>
            The future of small business success is AI-driven—and we make it
            easy for you.
          </i>
        </div>
      </div>

      <div className="section__2">
        <div className="section__2-inner">
          <h2>How it works</h2>
          <ol>
            <li>
              Tell Us About Your Business – Answer a few quick questions about
              your operations.
            </li>
            <li>
              Get Tailored AI Insights – Our AI analyzes your business and
              recommends specific Microsoft tools to help.
            </li>
            <li>
              See the Impact – Understand the ROI, cost savings, and
              implementation steps to get started right away.
            </li>
          </ol>
          <i>
            {" "}
            Our AI-powered consultant is built to deliver actionable insights—no
            fluff, just results.
          </i>
        </div>
      </div>

      <div className="section__3">
        <div className="section__3-inner">
          <h2>Our AI in Action – Real Benefits for Small Businesses</h2>
          <p></p>
          <ul>
            <li>
              Lower costs – Automate repetitive tasks, reduce errors, and cut
              expenses.
            </li>
            <li>
              Smarter decisions – Get data-driven insights to improve sales,
              marketing, and operations.
            </li>
            <li>
              More time for what matters – Redirect resources toward growth and
              innovation.
            </li>
            <li>
              Competitive advantage – Keep prices stable and invest in the
              future.
            </li>
          </ul>
          <i>
            AI isn’t just for big corporations—it’s the key to your small
            business success.
          </i>
        </div>
      </div>

      <div className="section__4">
        <div className="section__4-inner">
          <h2>Get Started – Free AI Business Report</h2>
          <ul>
            <li>A breakdown of AI opportunities tailored to your business</li>
            <li>Specific Microsoft tools that match your needs</li>
            <li>Estimated cost savings and ROI projections</li>
            <li>Step-by-step implementation guidance</li>
          </ul>
          <i>
            AI adoption doesn’t have to be complicated. Let’s make it work for
            you.
          </i>
          <Link className="cta-button cta-button--2" to={"/report"}>
            Generate Your Free AI Report
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Home;
