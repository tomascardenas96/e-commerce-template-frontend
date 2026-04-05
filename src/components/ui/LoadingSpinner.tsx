import "./LoadingSpinner.css";

export default function LoadingSpinner({ label }: { label: string }) {
  return (
    <div className="loading-spinner-container">
      <div>
        <span className="loader"></span>
      </div>
      <p className="text-white text-lg ml-4">{label}</p>
    </div>
  );
}
