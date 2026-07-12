"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface LeaveChartProps {
  approved: number;
  pending: number;
  rejected: number;
}

export default function LeaveChart({
  approved,
  pending,
  rejected,
}: LeaveChartProps) {
  const data = [
    { status: "Approved", total: approved },
    { status: "Pending", total: pending },
    { status: "Rejected", total: rejected },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Leave Analytics
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="status" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />

            <Bar
              dataKey="total"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}