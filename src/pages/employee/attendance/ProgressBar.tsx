import React from "react";

type Props = {
  progress: number; // 0 to 1
  color?: string; // Tailwind color class
};

const ProgressBar: React.FC<Props> = ({ progress, color = "bg-green-500" }) => (
  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
    <div
      className={`h-full ${color} transition-all`}
      style={{ width: `${Math.round(progress * 100)}%` }}
    />
  </div>
);

export default ProgressBar;
