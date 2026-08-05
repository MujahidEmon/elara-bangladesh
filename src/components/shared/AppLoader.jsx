"use client";

import { HashLoader } from "react-spinners";

const AppLoader = ({ label = "Loading", className = "" }) => {
  return (
    <div className={`flex min-h-40 flex-col items-center justify-center gap-6 ${className}`}>
      <HashLoader color="#FCAB35" speedMultiplier={0.9} />
      {label && <p className="text-sm font-medium text-slate-500">{label}</p>}
    </div>
  );
};

export default AppLoader;
