import "./Loading.scss";

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Generating AI adoption report...</p>
    </div>
  );
}