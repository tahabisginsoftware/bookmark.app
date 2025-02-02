import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.min(Math.round((current / total) * 100), 100);

  return (
    <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
      <div
        className="h-full bg-emerald-500 transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export default ProgressBar;