"use client";

import { useEffect, useState } from "react";

export default function WeatherWidget() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [time, setTime] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetch temperature for Lofoten, Norway (68.2°N, 14.5°E)
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=68.2&longitude=14.5&current=temperature_2m"
    )
      .then((res) => res.json())
      .then((data) => {
        setTemperature(Math.round(data.current.temperature_2m));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // Update time every second
  useEffect(() => {
    function updateTime() {
      const now = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Europe/Oslo",
      });
      setTime(now);
    }
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[400px] aspect-square rounded-[32px] overflow-hidden bg-[#3a4a3a] shadow-2xl">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />

      {/* Gradient fallback/overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-8">
        {/* Top row */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-white text-xl font-medium">Today</p>
            <p className="text-white text-xl font-medium">{time}</p>
          </div>
          <div className="text-white text-7xl font-bold tracking-tight">
            {loading ? "—" : error ? "?" : `${temperature}°`}
          </div>
        </div>

        {/* Bottom left */}
        <div>
          <p className="text-white text-xl font-medium">Lofoten</p>
          <p className="text-white text-xl font-medium">Norway</p>
        </div>
      </div>
    </div>
  );
}
