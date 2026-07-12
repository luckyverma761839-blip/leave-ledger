"use client";

interface WelcomeCardProps {
  name: string;
}

export default function WelcomeCard({ name }: WelcomeCardProps) {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mb-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 shadow-xl">
      <h2 className="text-4xl font-bold">
        👋 {greeting}, {name}
      </h2>

      <p className="mt-3 text-blue-100 text-lg">
        Welcome back! Here's your leave summary for today.
      </p>

      <div className="mt-6 inline-flex rounded-xl bg-white/20 px-4 py-2">
        📅 {today}
      </div>
    </div>
  );
}