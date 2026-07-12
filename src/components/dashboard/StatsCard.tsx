import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: number;
  subtitle?: string;
  icon: ReactNode;
  color: string;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  color,
}: StatsCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>

          <h2 className={`text-4xl font-bold mt-2 ${color}`}>
            {value}
          </h2>

          {subtitle && (
            <p className="text-xs text-gray-500 mt-2">
              {subtitle}
            </p>
          )}
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          {icon}
        </div>
      </div>
    </div>
  );
}