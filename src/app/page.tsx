import WeatherWidget from "./WeatherWidget";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-100">
      <WeatherWidget />
    </div>
  );
}
