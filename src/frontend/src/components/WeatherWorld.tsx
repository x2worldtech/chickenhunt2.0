import type React from "react";
import { useEffect, useRef, useState } from "react";
import {
  WEATHER_CITIES,
  getParticleType,
  getSkyGradient,
  getWeatherCondition,
  useWeatherData,
} from "../hooks/useWeatherData";

const CITY_DURATION = 12_000; // 12 seconds per city
const FLIP_DURATION = 600; // ms for one flip animation

// WMO code → SVG weather icon
function WeatherIcon({
  code,
  size = 32,
}: {
  code: number;
  size?: number;
}): React.ReactElement {
  if (code === 0) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        role="img"
        aria-label="sunny"
      >
        <circle cx="24" cy="24" r="9" fill="#FFD700" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line
            key={a}
            x1="24"
            y1="24"
            x2={24 + 16 * Math.cos((a * Math.PI) / 180)}
            y2={24 + 16 * Math.sin((a * Math.PI) / 180)}
            stroke="#FFD700"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        ))}
      </svg>
    );
  }
  if (code <= 3) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        role="img"
        aria-label="partly cloudy"
      >
        <circle cx="18" cy="20" r="7" fill="#FFD700" opacity="0.9" />
        <ellipse cx="28" cy="30" rx="12" ry="8" fill="#CBD5E1" />
        <ellipse cx="20" cy="32" rx="9" ry="6" fill="#E2E8F0" />
        <ellipse cx="32" cy="33" rx="7" ry="5" fill="#E2E8F0" />
      </svg>
    );
  }
  if (code <= 48) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        role="img"
        aria-label="foggy"
      >
        {[14, 20, 26, 32].map((y) => (
          <line
            key={y}
            x1="8"
            y1={y}
            x2="40"
            y2={y}
            stroke="#94A3B8"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
          />
        ))}
      </svg>
    );
  }
  if (code <= 67) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        role="img"
        aria-label="rainy"
      >
        <ellipse cx="24" cy="18" rx="14" ry="10" fill="#64748B" />
        <ellipse cx="16" cy="20" rx="10" ry="7" fill="#94A3B8" />
        <ellipse cx="32" cy="20" rx="10" ry="7" fill="#94A3B8" />
        {[16, 22, 28, 34].map((x, i) => (
          <line
            key={x}
            x1={x}
            y1={30 + i * 1}
            x2={x - 3}
            y2={42 + i * 1}
            stroke="#60A5FA"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
      </svg>
    );
  }
  if (code <= 86) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        role="img"
        aria-label="snowy"
      >
        <ellipse cx="24" cy="18" rx="14" ry="10" fill="#64748B" />
        <ellipse cx="16" cy="20" rx="10" ry="7" fill="#94A3B8" />
        {[14, 22, 30, 38].map((x, i) => (
          <text key={x} x={x} y={38 + (i % 2) * 4} fontSize="10" fill="white">
            *
          </text>
        ))}
      </svg>
    );
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="thunderstorm"
    >
      <ellipse cx="24" cy="14" rx="14" ry="9" fill="#374151" />
      <ellipse cx="16" cy="16" rx="10" ry="7" fill="#4B5563" />
      <polygon points="26,22 18,34 24,34 22,46 32,30 26,30" fill="#FDE047" />
    </svg>
  );
}

// Split-flap character
function SplitFlapChar({
  char,
  flipping,
}: {
  char: string;
  flipping: boolean;
}): React.ReactElement {
  return (
    <span className={`split-flap-char${flipping ? " flipping" : ""}`}>
      {char}
    </span>
  );
}

// Split-flap animated text
function SplitFlapText({
  text,
  className = "",
  triggerKey,
}: {
  text: string;
  className?: string;
  triggerKey: number;
}): React.ReactElement {
  const [displayText, setDisplayText] = useState(text);
  const [flippingChars, setFlippingChars] = useState<boolean[]>([]);
  const prevKeyRef = useRef(triggerKey);

  useEffect(() => {
    if (prevKeyRef.current === triggerKey) return;
    prevKeyRef.current = triggerKey;

    setFlippingChars(Array(text.length).fill(true));

    const t = setTimeout(() => {
      setDisplayText(text);
      setFlippingChars([]);
    }, FLIP_DURATION);
    return () => clearTimeout(t);
  }, [triggerKey, text]);

  const chars = displayText.padEnd(text.length, " ").split("");

  return (
    <span className={`split-flap-word ${className}`}>
      {chars.map((char, i) => (
        <SplitFlapChar
          key={`${i}-${triggerKey}`}
          char={char}
          flipping={flippingChars[i] ?? false}
        />
      ))}
    </span>
  );
}

interface WeatherParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  sway: number;
  swayPhase: number;
  opacity: number;
  type: "rain" | "snow" | "sun" | "cloud";
}

function makeParticle(
  id: number,
  pType: ReturnType<typeof getParticleType>,
): WeatherParticle {
  const t: "rain" | "snow" | "sun" | "cloud" =
    pType === "rain" || pType === "storm"
      ? "rain"
      : pType === "snow"
        ? "snow"
        : pType === "cloudy"
          ? "cloud"
          : "sun";
  return {
    id,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: t === "cloud" ? 40 + Math.random() * 60 : 4 + Math.random() * 8,
    speed: t === "rain" ? 1.5 + Math.random() : 0.3 + Math.random() * 0.3,
    sway: t === "snow" || t === "cloud" ? 0.3 + Math.random() * 0.4 : 0.05,
    swayPhase: Math.random() * Math.PI * 2,
    opacity:
      t === "cloud" ? 0.12 + Math.random() * 0.1 : 0.5 + Math.random() * 0.4,
    type: t,
  };
}

function ParticleOverlay({
  particleType,
}: {
  particleType: ReturnType<typeof getParticleType>;
}): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<WeatherParticle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const count =
      particleType === "rain" || particleType === "storm"
        ? 60
        : particleType === "snow"
          ? 40
          : particleType === "cloudy"
            ? 8
            : 20;
    particlesRef.current = Array.from({ length: count }, (_, i) =>
      makeParticle(i, particleType),
    );
  }, [particleType]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let frame = 0;

    const draw = () => {
      frame++;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (const p of particlesRef.current) {
        const px = (p.x / 100) * w;
        const py = (p.y / 100) * h;
        const swayX = Math.sin(frame * 0.02 + p.swayPhase) * p.sway * 20;

        if (p.type === "rain") {
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.strokeStyle = particleType === "storm" ? "#93C5FD" : "#60A5FA";
          ctx.lineWidth = p.size * 0.15;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(px + swayX, py);
          ctx.lineTo(px + swayX - p.size * 0.3, py + p.size * 1.8);
          ctx.stroke();
          ctx.restore();
        } else if (p.type === "snow") {
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = "#E0F2FE";
          ctx.beginPath();
          ctx.arc(px + swayX, py, p.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#BAE6FD";
          ctx.lineWidth = p.size * 0.1;
          for (let a = 0; a < 3; a++) {
            const angle = (a / 3) * Math.PI;
            ctx.beginPath();
            ctx.moveTo(
              px + swayX - Math.cos(angle) * p.size * 0.5,
              py - Math.sin(angle) * p.size * 0.5,
            );
            ctx.lineTo(
              px + swayX + Math.cos(angle) * p.size * 0.5,
              py + Math.sin(angle) * p.size * 0.5,
            );
            ctx.stroke();
          }
          ctx.restore();
        } else if (p.type === "sun") {
          ctx.save();
          ctx.globalAlpha =
            p.opacity * (0.5 + 0.5 * Math.sin(frame * 0.03 + p.swayPhase));
          const grad = ctx.createRadialGradient(
            px + swayX,
            py,
            0,
            px + swayX,
            py,
            p.size * 0.8,
          );
          grad.addColorStop(0, "rgba(255,220,80,0.8)");
          grad.addColorStop(1, "rgba(255,160,0,0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(px + swayX, py, p.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (p.type === "cloud") {
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = "rgba(255,255,255,0.15)";
          ctx.beginPath();
          ctx.ellipse(
            px + swayX * 2,
            py,
            p.size,
            p.size * 0.55,
            0,
            0,
            Math.PI * 2,
          );
          ctx.fill();
          ctx.restore();
        }

        // Move particles
        p.y += p.speed * 0.08;
        if (p.type === "cloud") p.x += p.speed * 0.02;
        if (p.y > 105) {
          p.y = -5;
          p.x = Math.random() * 100;
        }
        if (p.x > 115) p.x = -10;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [particleType]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
}

function ForecastRow({
  dayLabel,
  code,
  precipProb,
  tempMin,
  tempMax,
  globalMin,
  globalMax,
}: {
  dayLabel: string;
  code: number;
  precipProb: number;
  tempMin: number;
  tempMax: number;
  globalMin: number;
  globalMax: number;
}): React.ReactElement {
  const range = globalMax - globalMin || 1;
  const leftPct = ((tempMin - globalMin) / range) * 100;
  const widthPct = ((tempMax - tempMin) / range) * 100;

  return (
    <div
      className="flex items-center gap-2 py-1.5 px-3"
      style={{ minHeight: 36 }}
    >
      <span
        className="text-white font-semibold text-sm shrink-0"
        style={{ width: 34, fontVariantNumeric: "tabular-nums" }}
      >
        {dayLabel}
      </span>
      <span className="shrink-0" style={{ width: 28 }}>
        <WeatherIcon code={code} size={24} />
      </span>
      <span
        className="text-blue-300 text-xs font-medium shrink-0 tabular-nums"
        style={{ width: 30 }}
      >
        {precipProb > 0 ? `${precipProb}%` : ""}
      </span>
      <span
        className="text-blue-200 text-sm font-medium tabular-nums shrink-0"
        style={{ width: 28 }}
      >
        {tempMin}°
      </span>
      <div
        className="relative flex-1"
        style={{
          height: 6,
          background: "rgba(255,255,255,0.1)",
          borderRadius: 3,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: `${leftPct}%`,
            width: `${Math.max(widthPct, 4)}%`,
            height: "100%",
            background:
              "linear-gradient(to right, #22d3ee, #34d399, #a3e635, #facc15, #f97316)",
            borderRadius: 3,
          }}
        />
      </div>
      <span
        className="text-orange-200 text-sm font-medium tabular-nums shrink-0"
        style={{ width: 28 }}
      >
        {tempMax}°
      </span>
    </div>
  );
}

interface WeatherWorldProps {
  isGameplay?: boolean;
}

const WeatherWorld: React.FC<WeatherWorldProps> = ({ isGameplay = false }) => {
  const { data: weatherData } = useWeatherData();
  const [cityIndex, setCityIndex] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const [timerProgress, setTimerProgress] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // City cycling every 12s - reset timer when cityIndex changes externally
  useEffect(() => {
    startTimeRef.current = Date.now();
    setTimerProgress(0);

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(elapsed / CITY_DURATION, 1);
      setTimerProgress(pct);

      if (pct >= 1) {
        setCityIndex((prev) => {
          const next = (prev + 1) % WEATHER_CITIES.length;
          setCycleKey((k) => k + 1);
          startTimeRef.current = Date.now();
          return next;
        });
      }
    }, 50);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cityData = weatherData?.cities[cityIndex] ?? null;
  const currentCode = cityData?.current.weatherCode ?? 0;
  const particleType = getParticleType(currentCode);
  const skyGradient = getSkyGradient(currentCode);
  const cityName = WEATHER_CITIES[cityIndex].name;

  const getDayLabel = (dateStr: string, i: number): string => {
    if (i === 0) return "Today";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { weekday: "short" });
  };

  const forecastCount = Math.min(
    cityData?.daily.time.length ?? 0,
    isGameplay ? 8 : 10,
  );

  const globalMin = cityData
    ? Math.min(...cityData.daily.tempMin.slice(0, forecastCount))
    : 0;
  const globalMax = cityData
    ? Math.max(...cityData.daily.tempMax.slice(0, forecastCount))
    : 30;

  const handleCityClick = (i: number) => {
    setCityIndex(i);
    setCycleKey((k) => k + 1);
    startTimeRef.current = Date.now();
  };

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: skyGradient,
        transition: "background 1s ease",
        zIndex: 10,
      }}
    >
      {/* Animated particle overlay */}
      <ParticleOverlay particleType={particleType} />

      {/* Timer progress bar */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: 3, zIndex: 20, background: "rgba(255,255,255,0.1)" }}
      >
        <div
          style={{
            width: `${timerProgress * 100}%`,
            height: "100%",
            background: "rgba(255,255,255,0.7)",
            transition: "width 0.05s linear",
          }}
        />
      </div>

      {/* Main content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-4"
        style={{ zIndex: 15, paddingBottom: 80, gap: 4 }}
      >
        {/* City name */}
        <div
          className="text-center"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
        >
          <SplitFlapText
            text={cityName.toUpperCase()}
            className="split-flap-city"
            triggerKey={cycleKey}
          />
        </div>

        {cityData ? (
          <>
            {/* Current temp + icon */}
            <div className="flex items-end gap-3">
              <SplitFlapText
                text={`${cityData.current.temperature}°C`}
                className="split-flap-temp"
                triggerKey={cycleKey}
              />
              <div style={{ marginBottom: 8 }}>
                <WeatherIcon code={currentCode} size={40} />
              </div>
            </div>

            <div
              className="text-white/80 text-sm"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
            >
              {getWeatherCondition(currentCode)} · Feels like{" "}
              {cityData.current.apparentTemperature}°C
            </div>

            <div
              className="flex gap-4 text-white/70 text-xs"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
            >
              <span>💨 {cityData.current.windSpeed} km/h</span>
              <span>💧 {cityData.current.humidity}%</span>
              {cityData.current.precipitation > 0 && (
                <span>🌧 {cityData.current.precipitation} mm</span>
              )}
            </div>

            {/* Glassmorphic forecast card */}
            <div
              className="w-full max-w-sm rounded-2xl overflow-hidden"
              style={{
                background: "rgba(20,30,50,0.25)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
            >
              {/* City tabs */}
              <div
                className="flex border-b"
                style={{ borderColor: "rgba(255,255,255,0.1)" }}
              >
                {WEATHER_CITIES.map((c, i) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => handleCityClick(i)}
                    className="flex-1 py-1.5 text-xs font-semibold transition-colors"
                    style={{
                      color:
                        i === cityIndex ? "#fff" : "rgba(255,255,255,0.45)",
                      background:
                        i === cityIndex
                          ? "rgba(255,255,255,0.12)"
                          : "transparent",
                      borderBottom:
                        i === cityIndex
                          ? "2px solid rgba(255,255,255,0.6)"
                          : "2px solid transparent",
                    }}
                    data-ocid={`weather.city_tab.${i + 1}`}
                  >
                    {c.name.split(" ")[0]}
                  </button>
                ))}
              </div>

              {/* Forecast rows */}
              <div
                className="divide-y"
                style={{ borderColor: "rgba(255,255,255,0.05)" }}
              >
                {cityData.daily.time
                  .slice(0, forecastCount)
                  .map((dateStr, i) => (
                    <ForecastRow
                      key={dateStr}
                      dayLabel={getDayLabel(dateStr, i)}
                      code={cityData.daily.weatherCode[i]}
                      precipProb={
                        cityData.daily.precipitationProbability[i] ?? 0
                      }
                      tempMin={cityData.daily.tempMin[i]}
                      tempMax={cityData.daily.tempMax[i]}
                      globalMin={globalMin}
                      globalMax={globalMax}
                    />
                  ))}
              </div>
            </div>
          </>
        ) : (
          <div
            className="text-white/60 text-sm animate-pulse"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
          >
            Loading weather data…
          </div>
        )}

        {/* City cycle dots */}
        <div className="flex gap-1.5 mt-1">
          {WEATHER_CITIES.map((c, i) => (
            <div
              key={c.name}
              style={{
                width: i === cityIndex ? 16 : 6,
                height: 6,
                borderRadius: 3,
                background:
                  i === cityIndex
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(255,255,255,0.3)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWorld;
