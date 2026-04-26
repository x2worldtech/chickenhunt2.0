import type React from "react";
import type { BackgroundWorld } from "../App";

interface BackgroundRendererProps {
  world: BackgroundWorld;
}

const BackgroundRenderer: React.FC<BackgroundRendererProps> = ({ world }) => {
  const renderOriginalWorld = () => (
    <svg
      role="img"
      aria-label="Original world background"
      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Sky gradient */}
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#87CEEB" />
          <stop offset="30%" stopColor="#B0E0E6" />
          <stop offset="70%" stopColor="#FFE4B5" />
          <stop offset="100%" stopColor="#FFDAB9" />
        </linearGradient>
        <linearGradient id="hillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#90EE90" />
          <stop offset="100%" stopColor="#7CFC00" />
        </linearGradient>
        <linearGradient id="meadowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#32CD32" />
          <stop offset="50%" stopColor="#228B22" />
          <stop offset="100%" stopColor="#006400" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="1200" height="480" fill="url(#skyGradient)" />

      {/* Clouds */}
      <g fill="#FFFFFF" stroke="#E6E6FA" strokeWidth="2">
        <g transform="translate(180, 80)">
          <circle cx="0" cy="0" r="32" />
          <circle cx="20" cy="0" r="28" />
          <circle cx="-12" cy="8" r="24" />
          <circle cx="8" cy="-12" r="20" />
        </g>
        <g transform="translate(480, 64)">
          <circle cx="0" cy="0" r="25" />
          <circle cx="16" cy="0" r="22" />
          <circle cx="-10" cy="6" r="19" />
          <circle cx="6" cy="-10" r="16" />
        </g>
        <g transform="translate(840, 96)">
          <circle cx="0" cy="0" r="38" />
          <circle cx="24" cy="0" r="33" />
          <circle cx="-15" cy="10" r="29" />
          <circle cx="10" cy="-15" r="25" />
        </g>
        <g transform="translate(1080, 72)">
          <circle cx="0" cy="0" r="29" />
          <circle cx="18" cy="0" r="25" />
          <circle cx="-11" cy="7" r="21" />
          <circle cx="7" cy="-11" r="18" />
        </g>
      </g>

      {/* Rolling hills */}
      <path
        d="M0,480 Q150,420 300,440 T600,430 T900,445 T1200,435 L1200,480 Z"
        fill="url(#hillGradient)"
        stroke="#228B22"
        strokeWidth="3"
      />

      {/* Meadow */}
      <rect
        x="0"
        y="480"
        width="1200"
        height="320"
        fill="url(#meadowGradient)"
      />

      {/* Trees */}
      <g>
        <g transform="translate(120, 480)">
          <rect
            x="-6"
            y="-60"
            width="12"
            height="60"
            fill="#8B4513"
            stroke="#654321"
            strokeWidth="2"
          />
          <circle
            cx="0"
            cy="-72"
            r="40"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="3"
          />
          <circle cx="-16" cy="-68" r="24" fill="#32CD32" />
          <circle cx="12" cy="-70" r="20" fill="#32CD32" />
        </g>

        <g transform="translate(360, 520)">
          <rect
            x="-5"
            y="-48"
            width="10"
            height="48"
            fill="#8B4513"
            stroke="#654321"
            strokeWidth="2"
          />
          <circle
            cx="0"
            cy="-58"
            r="32"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="3"
          />
          <circle cx="-13" cy="-54" r="19" fill="#32CD32" />
          <circle cx="10" cy="-56" r="16" fill="#32CD32" />
        </g>

        <g transform="translate(600, 500)">
          <rect
            x="-7"
            y="-72"
            width="14"
            height="72"
            fill="#8B4513"
            stroke="#654321"
            strokeWidth="2"
          />
          <circle
            cx="0"
            cy="-86"
            r="48"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="3"
          />
          <circle cx="-19" cy="-82" r="29" fill="#32CD32" />
          <circle cx="14" cy="-84" r="24" fill="#32CD32" />
        </g>
      </g>

      {/* Bushes */}
      <g fill="#228B22" stroke="#006400" strokeWidth="2">
        <g transform="translate(240, 640)">
          <circle cx="0" cy="0" r="20" />
          <circle cx="-15" cy="5" r="15" />
          <circle cx="12" cy="3" r="18" />
        </g>
        <g transform="translate(480, 680)">
          <circle cx="0" cy="0" r="18" />
          <circle cx="-12" cy="4" r="13" />
          <circle cx="10" cy="2" r="15" />
        </g>
        <g transform="translate(720, 656)">
          <circle cx="0" cy="0" r="22" />
          <circle cx="-16" cy="6" r="16" />
          <circle cx="13" cy="4" r="19" />
        </g>
        <g transform="translate(960, 696)">
          <circle cx="0" cy="0" r="17" />
          <circle cx="-11" cy="3" r="12" />
          <circle cx="9" cy="2" r="14" />
        </g>
      </g>

      {/* Wooden fences */}
      <g stroke="#8B4513" strokeWidth="4" fill="#8B4513">
        <g transform="translate(60, 600)">
          <rect x="-3" y="-30" width="6" height="30" />
          <rect x="37" y="-28" width="6" height="28" />
          <rect x="77" y="-32" width="6" height="32" />
          <rect x="117" y="-29" width="6" height="29" />
          <line x1="0" y1="-20" x2="120" y2="-18" strokeWidth="4" />
          <line x1="0" y1="-10" x2="120" y2="-8" strokeWidth="4" />
        </g>

        <g transform="translate(540, 624)">
          <rect x="-3" y="-28" width="6" height="28" />
          <rect x="37" y="-31" width="6" height="31" />
          <rect x="77" y="-27" width="6" height="27" />
          <rect x="117" y="-30" width="6" height="30" />
          <line x1="0" y1="-18" x2="120" y2="-20" strokeWidth="4" />
          <line x1="0" y1="-8" x2="120" y2="-10" strokeWidth="4" />
        </g>
      </g>

      {/* Barn */}
      <g transform="translate(900, 360)">
        <rect
          x="0"
          y="0"
          width="240"
          height="200"
          fill="#8B4513"
          stroke="#654321"
          strokeWidth="3"
        />
        <path
          d="M-24,0 L120,0 L120,-60 L-24,0 Z"
          fill="#A0522D"
          stroke="#654321"
          strokeWidth="3"
        />
        <rect x="72" y="60" width="96" height="140" fill="#2F2F2F" />
        <rect
          x="72"
          y="60"
          width="96"
          height="140"
          fill="none"
          stroke="#654321"
          strokeWidth="4"
        />
        <g stroke="#654321" strokeWidth="2">
          <line x1="0" y1="25" x2="240" y2="25" />
          <line x1="0" y1="50" x2="240" y2="50" />
          <line x1="0" y1="75" x2="240" y2="75" />
          <line x1="0" y1="100" x2="240" y2="100" />
          <line x1="0" y1="125" x2="240" y2="125" />
          <line x1="0" y1="150" x2="240" y2="150" />
          <line x1="0" y1="175" x2="240" y2="175" />
        </g>
      </g>

      {/* Scattered flowers */}
      <g>
        <g transform="translate(200, 580)">
          <line
            x1="0"
            y1="0"
            x2="2"
            y2="-20"
            stroke="#228B22"
            strokeWidth="2"
          />
          <g transform="translate(0, -20)">
            <ellipse
              cx="-8"
              cy="0"
              rx="6"
              ry="3"
              fill="#FF69B4"
              stroke="#FFB6C1"
            />
            <ellipse
              cx="8"
              cy="0"
              rx="6"
              ry="3"
              fill="#FF69B4"
              stroke="#FFB6C1"
            />
            <ellipse
              cx="0"
              cy="-8"
              rx="6"
              ry="3"
              fill="#FF69B4"
              stroke="#FFB6C1"
            />
            <ellipse
              cx="0"
              cy="8"
              rx="6"
              ry="3"
              fill="#FF69B4"
              stroke="#FFB6C1"
            />
            <ellipse
              cx="-6"
              cy="-6"
              rx="6"
              ry="3"
              fill="#FF69B4"
              stroke="#FFB6C1"
              transform="rotate(45)"
            />
            <ellipse
              cx="6"
              cy="6"
              rx="6"
              ry="3"
              fill="#FF69B4"
              stroke="#FFB6C1"
              transform="rotate(45)"
            />
            <circle cx="0" cy="0" r="4" fill="#FFD700" />
          </g>
        </g>

        <g transform="translate(320, 620)">
          <line
            x1="0"
            y1="0"
            x2="-1"
            y2="-18"
            stroke="#228B22"
            strokeWidth="2"
          />
          <g transform="translate(0, -18)">
            <ellipse
              cx="-7"
              cy="0"
              rx="5"
              ry="2.5"
              fill="#9370DB"
              stroke="#DDA0DD"
            />
            <ellipse
              cx="7"
              cy="0"
              rx="5"
              ry="2.5"
              fill="#9370DB"
              stroke="#DDA0DD"
            />
            <ellipse
              cx="0"
              cy="-7"
              rx="5"
              ry="2.5"
              fill="#9370DB"
              stroke="#DDA0DD"
            />
            <ellipse
              cx="0"
              cy="7"
              rx="5"
              ry="2.5"
              fill="#9370DB"
              stroke="#DDA0DD"
            />
            <ellipse
              cx="-5"
              cy="-5"
              rx="5"
              ry="2.5"
              fill="#9370DB"
              stroke="#DDA0DD"
              transform="rotate(45)"
            />
            <ellipse
              cx="5"
              cy="5"
              rx="5"
              ry="2.5"
              fill="#9370DB"
              stroke="#DDA0DD"
              transform="rotate(45)"
            />
            <circle cx="0" cy="0" r="3" fill="#FFF" />
          </g>
        </g>

        <g transform="translate(450, 590)">
          <line
            x1="0"
            y1="0"
            x2="1"
            y2="-22"
            stroke="#228B22"
            strokeWidth="2"
          />
          <g transform="translate(0, -22)">
            <ellipse
              cx="-9"
              cy="0"
              rx="7"
              ry="3.5"
              fill="#FF4500"
              stroke="#FFA500"
            />
            <ellipse
              cx="9"
              cy="0"
              rx="7"
              ry="3.5"
              fill="#FF4500"
              stroke="#FFA500"
            />
            <ellipse
              cx="0"
              cy="-9"
              rx="7"
              ry="3.5"
              fill="#FF4500"
              stroke="#FFA500"
            />
            <ellipse
              cx="0"
              cy="9"
              rx="7"
              ry="3.5"
              fill="#FF4500"
              stroke="#FFA500"
            />
            <ellipse
              cx="-6"
              cy="-6"
              rx="7"
              ry="3.5"
              fill="#FF4500"
              stroke="#FFA500"
              transform="rotate(45)"
            />
            <ellipse
              cx="6"
              cy="6"
              rx="7"
              ry="3.5"
              fill="#FF4500"
              stroke="#FFA500"
              transform="rotate(45)"
            />
            <circle cx="0" cy="0" r="4" fill="#8B4513" />
          </g>
        </g>

        <g transform="translate(780, 610)">
          <line
            x1="0"
            y1="0"
            x2="-2"
            y2="-19"
            stroke="#228B22"
            strokeWidth="2"
          />
          <g transform="translate(0, -19)">
            <ellipse
              cx="-6"
              cy="0"
              rx="5"
              ry="2.5"
              fill="#00CED1"
              stroke="#48D1CC"
            />
            <ellipse
              cx="6"
              cy="0"
              rx="5"
              ry="2.5"
              fill="#00CED1"
              stroke="#48D1CC"
            />
            <ellipse
              cx="0"
              cy="-6"
              rx="5"
              ry="2.5"
              fill="#00CED1"
              stroke="#48D1CC"
            />
            <ellipse
              cx="0"
              cy="6"
              rx="5"
              ry="2.5"
              fill="#00CED1"
              stroke="#48D1CC"
            />
            <ellipse
              cx="-4"
              cy="-4"
              rx="5"
              ry="2.5"
              fill="#00CED1"
              stroke="#48D1CC"
              transform="rotate(45)"
            />
            <ellipse
              cx="4"
              cy="4"
              rx="5"
              ry="2.5"
              fill="#00CED1"
              stroke="#48D1CC"
              transform="rotate(45)"
            />
            <circle cx="0" cy="0" r="3" fill="#FFE135" />
          </g>
        </g>

        <g transform="translate(850, 650)">
          <line
            x1="0"
            y1="0"
            x2="3"
            y2="-21"
            stroke="#228B22"
            strokeWidth="2"
          />
          <g transform="translate(0, -21)">
            <ellipse
              cx="-8"
              cy="0"
              rx="6"
              ry="3"
              fill="#DC143C"
              stroke="#F08080"
            />
            <ellipse
              cx="8"
              cy="0"
              rx="6"
              ry="3"
              fill="#DC143C"
              stroke="#F08080"
            />
            <ellipse
              cx="0"
              cy="-8"
              rx="6"
              ry="3"
              fill="#DC143C"
              stroke="#F08080"
            />
            <ellipse
              cx="0"
              cy="8"
              rx="6"
              ry="3"
              fill="#DC143C"
              stroke="#F08080"
            />
            <ellipse
              cx="-6"
              cy="-6"
              rx="6"
              ry="3"
              fill="#DC143C"
              stroke="#F08080"
              transform="rotate(45)"
            />
            <ellipse
              cx="6"
              cy="6"
              rx="6"
              ry="3"
              fill="#DC143C"
              stroke="#F08080"
              transform="rotate(45)"
            />
            <circle cx="0" cy="0" r="4" fill="#FFFF00" />
          </g>
        </g>
      </g>
    </svg>
  );

  const renderVolcanoWorld = () => (
    <svg
      role="img"
      aria-label="Volcano world background"
      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient
          id="volcanoSkyGradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#8B0000" />
          <stop offset="30%" stopColor="#DC143C" />
          <stop offset="70%" stopColor="#FF4500" />
          <stop offset="100%" stopColor="#FF6347" />
        </linearGradient>
        <linearGradient id="lavaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF4500" />
          <stop offset="50%" stopColor="#FF0000" />
          <stop offset="100%" stopColor="#8B0000" />
        </linearGradient>
        <linearGradient id="rockGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#696969" />
          <stop offset="50%" stopColor="#2F2F2F" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="1200" height="480" fill="url(#volcanoSkyGradient)" />

      {/* Ash clouds */}
      <g fill="#2F2F2F" stroke="#000000" strokeWidth="2" opacity="0.7">
        <g transform="translate(200, 100)">
          <circle cx="0" cy="0" r="35" />
          <circle cx="25" cy="0" r="30" />
          <circle cx="-15" cy="10" r="25" />
          <circle cx="10" cy="-15" r="22" />
        </g>
        <g transform="translate(500, 80)">
          <circle cx="0" cy="0" r="28" />
          <circle cx="20" cy="0" r="25" />
          <circle cx="-12" cy="8" r="20" />
          <circle cx="8" cy="-12" r="18" />
        </g>
        <g transform="translate(900, 120)">
          <circle cx="0" cy="0" r="40" />
          <circle cx="30" cy="0" r="35" />
          <circle cx="-18" cy="12" r="28" />
          <circle cx="12" cy="-18" r="25" />
        </g>
      </g>

      {/* Volcanic mountains */}
      <path
        d="M0,480 L200,300 L400,350 L600,250 L800,320 L1000,280 L1200,400 L1200,480 Z"
        fill="url(#rockGradient)"
        stroke="#000000"
        strokeWidth="3"
      />

      {/* Lava flows */}
      <path
        d="M600,250 Q650,300 700,350 Q750,400 800,450 L1200,450 L1200,480 L0,480 Q300,460 600,250"
        fill="url(#lavaGradient)"
        stroke="#FF0000"
        strokeWidth="2"
      />

      {/* Rocky ground */}
      <rect x="0" y="480" width="1200" height="320" fill="url(#rockGradient)" />

      {/* Volcanic vents */}
      <g>
        <g transform="translate(300, 480)">
          <ellipse cx="0" cy="0" rx="30" ry="15" fill="#8B0000" />
          <ellipse cx="0" cy="-5" rx="25" ry="12" fill="#FF4500" />
          <ellipse cx="0" cy="-10" rx="20" ry="10" fill="#FF6347" />
        </g>
        <g transform="translate(700, 500)">
          <ellipse cx="0" cy="0" rx="25" ry="12" fill="#8B0000" />
          <ellipse cx="0" cy="-4" rx="20" ry="10" fill="#FF4500" />
          <ellipse cx="0" cy="-8" rx="15" ry="8" fill="#FF6347" />
        </g>
        <g transform="translate(1000, 490)">
          <ellipse cx="0" cy="0" rx="35" ry="18" fill="#8B0000" />
          <ellipse cx="0" cy="-6" rx="30" ry="15" fill="#FF4500" />
          <ellipse cx="0" cy="-12" rx="25" ry="12" fill="#FF6347" />
        </g>
      </g>

      {/* Rock formations */}
      <g fill="#2F2F2F" stroke="#000000" strokeWidth="2">
        <g transform="translate(150, 600)">
          <polygon points="0,-40 -20,0 20,0" />
          <polygon points="-15,-25 -25,0 -5,0" />
          <polygon points="10,-30 0,0 20,0" />
        </g>
        <g transform="translate(450, 650)">
          <polygon points="0,-35 -18,0 18,0" />
          <polygon points="-12,-20 -22,0 -2,0" />
          <polygon points="8,-25 -2,0 18,0" />
        </g>
        <g transform="translate(850, 620)">
          <polygon points="0,-45 -25,0 25,0" />
          <polygon points="-18,-30 -28,0 -8,0" />
          <polygon points="12,-35 2,0 22,0" />
        </g>
      </g>

      {/* Lava pools */}
      <g>
        <ellipse
          cx="200"
          cy="700"
          rx="40"
          ry="20"
          fill="#FF4500"
          stroke="#FF0000"
          strokeWidth="2"
        />
        <ellipse
          cx="600"
          cy="720"
          rx="35"
          ry="18"
          fill="#FF4500"
          stroke="#FF0000"
          strokeWidth="2"
        />
        <ellipse
          cx="950"
          cy="680"
          rx="45"
          ry="22"
          fill="#FF4500"
          stroke="#FF0000"
          strokeWidth="2"
        />
      </g>
    </svg>
  );

  const renderSpaceWorld = () => (
    <svg
      role="img"
      aria-label="Space world background"
      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Deep space gradient with rich colors */}
        <radialGradient id="deepSpaceGradient" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#1a0033" />
          <stop offset="30%" stopColor="#2d1b69" />
          <stop offset="60%" stopColor="#0f0f23" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>

        {/* Spectacular nebula gradients with vibrant colors */}
        <radialGradient id="purpleNebula" cx="40%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#ff00ff" opacity="0.9" />
          <stop offset="20%" stopColor="#8a2be2" opacity="0.8" />
          <stop offset="40%" stopColor="#4b0082" opacity="0.7" />
          <stop offset="70%" stopColor="#2e0854" opacity="0.5" />
          <stop offset="100%" stopColor="#000000" opacity="0.1" />
        </radialGradient>

        <radialGradient id="blueNebula" cx="60%" cy="70%" r="50%">
          <stop offset="0%" stopColor="#00bfff" opacity="0.9" />
          <stop offset="25%" stopColor="#1e90ff" opacity="0.8" />
          <stop offset="50%" stopColor="#0066cc" opacity="0.6" />
          <stop offset="75%" stopColor="#003d7a" opacity="0.4" />
          <stop offset="100%" stopColor="#000000" opacity="0.1" />
        </radialGradient>

        <radialGradient id="magentaNebula" cx="20%" cy="60%" r="45%">
          <stop offset="0%" stopColor="#ff1493" opacity="0.8" />
          <stop offset="30%" stopColor="#dc143c" opacity="0.7" />
          <stop offset="60%" stopColor="#8b008b" opacity="0.5" />
          <stop offset="100%" stopColor="#000000" opacity="0.2" />
        </radialGradient>

        <radialGradient id="cyanNebula" cx="80%" cy="20%" r="40%">
          <stop offset="0%" stopColor="#00ffff" opacity="0.8" />
          <stop offset="35%" stopColor="#00ced1" opacity="0.6" />
          <stop offset="70%" stopColor="#008b8b" opacity="0.4" />
          <stop offset="100%" stopColor="#000000" opacity="0.1" />
        </radialGradient>

        {/* Planet gradients with atmospheric effects */}
        <radialGradient id="gasPlanet1" cx="35%" cy="25%" r="70%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="30%" stopColor="#ff8c00" />
          <stop offset="60%" stopColor="#ff4500" />
          <stop offset="100%" stopColor="#8b0000" />
        </radialGradient>

        <radialGradient id="gasPlanet2" cx="30%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#87ceeb" />
          <stop offset="40%" stopColor="#4169e1" />
          <stop offset="70%" stopColor="#191970" />
          <stop offset="100%" stopColor="#000080" />
        </radialGradient>

        <radialGradient id="icePlanet" cx="25%" cy="20%" r="80%">
          <stop offset="0%" stopColor="#f0f8ff" />
          <stop offset="50%" stopColor="#b0e0e6" />
          <stop offset="80%" stopColor="#4682b4" />
          <stop offset="100%" stopColor="#2f4f4f" />
        </radialGradient>

        <radialGradient id="lavaPlanet" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffff00" />
          <stop offset="25%" stopColor="#ff6347" />
          <stop offset="50%" stopColor="#dc143c" />
          <stop offset="100%" stopColor="#8b0000" />
        </radialGradient>

        {/* Star glow effects */}
        <filter id="starGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="brightStarGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Cosmic dust gradient */}
        <linearGradient id="cosmicDust" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9370db" opacity="0.3" />
          <stop offset="50%" stopColor="#4b0082" opacity="0.2" />
          <stop offset="100%" stopColor="#000000" opacity="0.1" />
        </linearGradient>
      </defs>

      {/* Deep space background */}
      <rect width="1200" height="800" fill="url(#deepSpaceGradient)" />

      {/* Spectacular nebulae with swirling gas clouds */}
      <ellipse
        cx="250"
        cy="180"
        rx="220"
        ry="160"
        fill="url(#purpleNebula)"
        transform="rotate(25 250 180)"
      />
      <ellipse
        cx="200"
        cy="220"
        rx="180"
        ry="120"
        fill="url(#magentaNebula)"
        transform="rotate(-15 200 220)"
      />

      <ellipse
        cx="800"
        cy="350"
        rx="200"
        ry="140"
        fill="url(#blueNebula)"
        transform="rotate(45 800 350)"
      />
      <ellipse
        cx="850"
        cy="300"
        rx="160"
        ry="100"
        fill="url(#cyanNebula)"
        transform="rotate(-30 850 300)"
      />

      <ellipse
        cx="450"
        cy="600"
        rx="190"
        ry="130"
        fill="url(#purpleNebula)"
        transform="rotate(60 450 600)"
      />
      <ellipse
        cx="950"
        cy="650"
        rx="170"
        ry="110"
        fill="url(#blueNebula)"
        transform="rotate(-45 950 650)"
      />

      {/* Cosmic dust clouds */}
      <path
        d="M0,400 Q200,350 400,380 Q600,410 800,370 Q1000,340 1200,360 L1200,420 Q1000,400 800,430 Q600,470 400,440 Q200,410 0,460 Z"
        fill="url(#cosmicDust)"
        opacity="0.4"
      />
      <path
        d="M0,200 Q300,180 600,200 Q900,220 1200,190 L1200,240 Q900,270 600,250 Q300,230 0,250 Z"
        fill="url(#cosmicDust)"
        opacity="0.3"
      />

      {/* Countless twinkling stars of varying sizes and brightness */}
      <g fill="#ffffff">
        {/* Bright stars with glow */}
        <circle cx="120" cy="90" r="2.5" filter="url(#brightStarGlow)" />
        <circle cx="340" cy="70" r="2" filter="url(#brightStarGlow)" />
        <circle cx="580" cy="110" r="3" filter="url(#brightStarGlow)" />
        <circle cx="780" cy="80" r="2.5" filter="url(#brightStarGlow)" />
        <circle cx="1050" cy="120" r="2" filter="url(#brightStarGlow)" />

        {/* Medium stars */}
        <circle cx="180" cy="140" r="1.5" filter="url(#starGlow)" />
        <circle cx="280" cy="160" r="1.8" filter="url(#starGlow)" />
        <circle cx="420" cy="130" r="1.6" filter="url(#starGlow)" />
        <circle cx="520" cy="170" r="1.4" filter="url(#starGlow)" />
        <circle cx="680" cy="150" r="1.7" filter="url(#starGlow)" />
        <circle cx="820" cy="140" r="1.5" filter="url(#starGlow)" />
        <circle cx="920" cy="180" r="1.6" filter="url(#starGlow)" />
        <circle cx="1120" cy="160" r="1.4" filter="url(#starGlow)" />

        {/* Small stars scattered throughout */}
        <circle cx="90" cy="200" r="1" />
        <circle cx="150" cy="250" r="0.8" />
        <circle cx="220" cy="280" r="1.2" />
        <circle cx="310" cy="320" r="0.9" />
        <circle cx="380" cy="290" r="1.1" />
        <circle cx="460" cy="340" r="0.7" />
        <circle cx="540" cy="310" r="1" />
        <circle cx="620" cy="280" r="0.8" />
        <circle cx="720" cy="320" r="1.2" />
        <circle cx="810" cy="290" r="0.9" />
        <circle cx="890" cy="340" r="1.1" />
        <circle cx="980" cy="310" r="0.8" />
        <circle cx="1080" cy="280" r="1" />
        <circle cx="1150" cy="320" r="0.7" />

        {/* More stars in different areas */}
        <circle cx="70" cy="380" r="0.9" />
        <circle cx="160" cy="420" r="1.1" />
        <circle cx="240" cy="450" r="0.8" />
        <circle cx="330" cy="480" r="1" />
        <circle cx="430" cy="460" r="0.7" />
        <circle cx="530" cy="490" r="1.2" />
        <circle cx="630" cy="470" r="0.9" />
        <circle cx="730" cy="500" r="1" />
        <circle cx="830" cy="480" r="0.8" />
        <circle cx="930" cy="510" r="1.1" />
        <circle cx="1030" cy="490" r="0.9" />
        <circle cx="1130" cy="520" r="0.7" />

        <circle cx="110" cy="550" r="1" />
        <circle cx="210" cy="580" r="0.8" />
        <circle cx="310" cy="610" r="1.2" />
        <circle cx="410" cy="590" r="0.9" />
        <circle cx="510" cy="620" r="1.1" />
        <circle cx="610" cy="600" r="0.7" />
        <circle cx="710" cy="630" r="1" />
        <circle cx="810" cy="610" r="0.8" />
        <circle cx="910" cy="640" r="1.2" />
        <circle cx="1010" cy="620" r="0.9" />
        <circle cx="1110" cy="650" r="1.1" />

        <circle cx="140" cy="700" r="0.8" />
        <circle cx="260" cy="720" r="1" />
        <circle cx="380" cy="740" r="0.7" />
        <circle cx="500" cy="760" r="1.2" />
        <circle cx="620" cy="740" r="0.9" />
        <circle cx="740" cy="770" r="1.1" />
        <circle cx="860" cy="750" r="0.8" />
        <circle cx="980" cy="780" r="1" />
        <circle cx="1100" cy="760" r="0.7" />
      </g>

      {/* Distant planets with detailed surfaces and atmospheric effects */}
      <g>
        {/* Large gas giant with rings */}
        <g transform="translate(180, 200)">
          <circle
            cx="0"
            cy="0"
            r="55"
            fill="url(#gasPlanet1)"
            stroke="#ff8c00"
            strokeWidth="1"
          />
          {/* Atmospheric bands */}
          <ellipse
            cx="0"
            cy="-15"
            rx="50"
            ry="8"
            fill="#ff6347"
            opacity="0.6"
          />
          <ellipse cx="0" cy="0" rx="48" ry="6" fill="#ffd700" opacity="0.5" />
          <ellipse cx="0" cy="15" rx="45" ry="7" fill="#ff4500" opacity="0.7" />
          {/* Ring system */}
          <ellipse
            cx="0"
            cy="0"
            rx="75"
            ry="12"
            fill="none"
            stroke="#daa520"
            strokeWidth="2"
            opacity="0.8"
          />
          <ellipse
            cx="0"
            cy="0"
            rx="85"
            ry="15"
            fill="none"
            stroke="#cd853f"
            strokeWidth="1.5"
            opacity="0.6"
          />
        </g>

        {/* Blue ice planet */}
        <g transform="translate(1000, 250)">
          <circle
            cx="0"
            cy="0"
            r="45"
            fill="url(#icePlanet)"
            stroke="#4682b4"
            strokeWidth="1"
          />
          {/* Ice caps */}
          <ellipse
            cx="0"
            cy="-25"
            rx="30"
            ry="15"
            fill="#f0f8ff"
            opacity="0.8"
          />
          <ellipse
            cx="0"
            cy="25"
            rx="25"
            ry="12"
            fill="#e6f3ff"
            opacity="0.7"
          />
          {/* Atmospheric glow */}
          <circle
            cx="0"
            cy="0"
            r="48"
            fill="none"
            stroke="#87ceeb"
            strokeWidth="2"
            opacity="0.4"
          />
        </g>

        {/* Volcanic lava planet */}
        <g transform="translate(350, 650)">
          <circle
            cx="0"
            cy="0"
            r="38"
            fill="url(#lavaPlanet)"
            stroke="#dc143c"
            strokeWidth="1"
          />
          {/* Lava flows */}
          <path
            d="M-20,-10 Q0,5 15,20 Q25,30 30,35"
            stroke="#ff6347"
            strokeWidth="3"
            fill="none"
            opacity="0.8"
          />
          <path
            d="M-30,0 Q-10,15 5,25 Q15,35 20,38"
            stroke="#ff4500"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
          />
          {/* Volcanic glow */}
          <circle
            cx="0"
            cy="0"
            r="42"
            fill="none"
            stroke="#ff6347"
            strokeWidth="2"
            opacity="0.3"
          />
        </g>

        {/* Smaller blue-green planet */}
        <g transform="translate(850, 600)">
          <circle
            cx="0"
            cy="0"
            r="32"
            fill="url(#gasPlanet2)"
            stroke="#4169e1"
            strokeWidth="1"
          />
          {/* Storm systems */}
          <ellipse
            cx="-8"
            cy="-5"
            rx="12"
            ry="8"
            fill="#1e90ff"
            opacity="0.6"
            transform="rotate(30)"
          />
          <ellipse
            cx="10"
            cy="8"
            rx="10"
            ry="6"
            fill="#00bfff"
            opacity="0.5"
            transform="rotate(-20)"
          />
        </g>

        {/* Tiny distant planet */}
        <circle
          cx="600"
          cy="120"
          r="18"
          fill="#9370db"
          stroke="#8a2be2"
          strokeWidth="1"
        />

        {/* Another small planet */}
        <circle
          cx="120"
          cy="450"
          r="22"
          fill="#32cd32"
          stroke="#228b22"
          strokeWidth="1"
        />
      </g>

      {/* Asteroid fields with varying sizes and orientations */}
      <g fill="#696969" stroke="#2f2f2f" strokeWidth="1">
        <ellipse
          cx="450"
          cy="380"
          rx="12"
          ry="8"
          transform="rotate(30 450 380)"
        />
        <ellipse
          cx="480"
          cy="420"
          rx="8"
          ry="6"
          transform="rotate(60 480 420)"
        />
        <ellipse
          cx="520"
          cy="350"
          rx="15"
          ry="10"
          transform="rotate(90 520 350)"
        />
        <ellipse
          cx="560"
          cy="400"
          rx="10"
          ry="7"
          transform="rotate(120 560 400)"
        />
        <ellipse
          cx="600"
          cy="370"
          rx="13"
          ry="9"
          transform="rotate(150 600 370)"
        />
        <ellipse
          cx="640"
          cy="410"
          rx="7"
          ry="5"
          transform="rotate(180 640 410)"
        />
        <ellipse
          cx="680"
          cy="340"
          rx="11"
          ry="8"
          transform="rotate(210 680 340)"
        />
        <ellipse
          cx="720"
          cy="390"
          rx="9"
          ry="6"
          transform="rotate(240 720 390)"
        />

        {/* Additional asteroid cluster */}
        <ellipse
          cx="300"
          cy="500"
          rx="10"
          ry="7"
          transform="rotate(45 300 500)"
        />
        <ellipse
          cx="330"
          cy="530"
          rx="8"
          ry="5"
          transform="rotate(75 330 530)"
        />
        <ellipse
          cx="360"
          cy="480"
          rx="12"
          ry="9"
          transform="rotate(105 360 480)"
        />
        <ellipse
          cx="390"
          cy="520"
          rx="6"
          ry="4"
          transform="rotate(135 390 520)"
        />
      </g>

      {/* Advanced space stations and structures */}
      <g>
        {/* Large rotating space station */}
        <g transform="translate(950, 400)">
          <circle
            cx="0"
            cy="0"
            r="25"
            fill="none"
            stroke="#c0c0c0"
            strokeWidth="3"
          />
          <circle
            cx="0"
            cy="0"
            r="15"
            fill="#808080"
            stroke="#696969"
            strokeWidth="2"
          />
          {/* Docking ports */}
          <rect
            x="-3"
            y="-35"
            width="6"
            height="15"
            fill="#c0c0c0"
            stroke="#808080"
            strokeWidth="1"
          />
          <rect
            x="-3"
            y="20"
            width="6"
            height="15"
            fill="#c0c0c0"
            stroke="#808080"
            strokeWidth="1"
          />
          <rect
            x="-35"
            y="-3"
            width="15"
            height="6"
            fill="#c0c0c0"
            stroke="#808080"
            strokeWidth="1"
          />
          <rect
            x="20"
            y="-3"
            width="15"
            height="6"
            fill="#c0c0c0"
            stroke="#808080"
            strokeWidth="1"
          />
          {/* Central hub */}
          <circle
            cx="0"
            cy="0"
            r="8"
            fill="#4169e1"
            stroke="#191970"
            strokeWidth="1"
          />
          {/* Communication arrays */}
          <line
            x1="0"
            y1="-40"
            x2="0"
            y2="-50"
            stroke="#ffd700"
            strokeWidth="2"
          />
          <line
            x1="0"
            y1="40"
            x2="0"
            y2="50"
            stroke="#ffd700"
            strokeWidth="2"
          />
        </g>

        {/* Smaller research station */}
        <g transform="translate(150, 350)">
          <rect
            x="-15"
            y="-8"
            width="30"
            height="16"
            fill="#c0c0c0"
            stroke="#808080"
            strokeWidth="1"
          />
          <circle
            cx="0"
            cy="0"
            r="12"
            fill="#4169e1"
            stroke="#191970"
            strokeWidth="1"
          />
          <rect
            x="-2"
            y="-20"
            width="4"
            height="12"
            fill="#c0c0c0"
            stroke="#808080"
            strokeWidth="1"
          />
          <rect
            x="-2"
            y="8"
            width="4"
            height="12"
            fill="#c0c0c0"
            stroke="#808080"
            strokeWidth="1"
          />
          {/* Solar panels */}
          <rect
            x="-25"
            y="-4"
            width="8"
            height="8"
            fill="#191970"
            stroke="#4169e1"
            strokeWidth="1"
          />
          <rect
            x="17"
            y="-4"
            width="8"
            height="8"
            fill="#191970"
            stroke="#4169e1"
            strokeWidth="1"
          />
        </g>
      </g>

      {/* Dramatic lighting effects and cosmic phenomena */}
      <g>
        {/* Pulsar beams */}
        <line
          x1="580"
          y1="110"
          x2="580"
          y2="50"
          stroke="#00ffff"
          strokeWidth="3"
          opacity="0.8"
          filter="url(#brightStarGlow)"
        />
        <line
          x1="580"
          y1="110"
          x2="580"
          y2="170"
          stroke="#00ffff"
          strokeWidth="3"
          opacity="0.8"
          filter="url(#brightStarGlow)"
        />
        <line
          x1="540"
          y1="110"
          x2="620"
          y2="110"
          stroke="#00ffff"
          strokeWidth="3"
          opacity="0.8"
          filter="url(#brightStarGlow)"
        />

        {/* Cosmic energy streams */}
        <path
          d="M100,100 Q300,200 500,150 Q700,100 900,180"
          stroke="#ff00ff"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
          filter="url(#starGlow)"
        />
        <path
          d="M200,600 Q400,500 600,550 Q800,600 1000,520"
          stroke="#00ff00"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
          filter="url(#starGlow)"
        />

        {/* Wormhole effect */}
        <g transform="translate(750, 150)">
          <circle
            cx="0"
            cy="0"
            r="20"
            fill="none"
            stroke="#ff1493"
            strokeWidth="3"
            opacity="0.8"
          />
          <circle
            cx="0"
            cy="0"
            r="15"
            fill="none"
            stroke="#8a2be2"
            strokeWidth="2"
            opacity="0.6"
          />
          <circle
            cx="0"
            cy="0"
            r="10"
            fill="none"
            stroke="#4b0082"
            strokeWidth="2"
            opacity="0.4"
          />
          <circle cx="0" cy="0" r="5" fill="#000000" />
        </g>
      </g>

      {/* Additional cosmic dust and particle effects */}
      <g fill="#9370db" opacity="0.4">
        <circle cx="250" cy="350" r="0.8" />
        <circle cx="400" cy="280" r="0.6" />
        <circle cx="550" cy="450" r="1" />
        <circle cx="700" cy="250" r="0.7" />
        <circle cx="850" cy="380" r="0.9" />
        <circle cx="1000" cy="480" r="0.5" />
        <circle cx="1150" cy="350" r="0.8" />
        <circle cx="300" cy="150" r="0.6" />
        <circle cx="450" cy="550" r="1" />
        <circle cx="600" cy="200" r="0.7" />
        <circle cx="750" cy="500" r="0.9" />
        <circle cx="900" cy="100" r="0.5" />
        <circle cx="1050" cy="600" r="0.8" />
      </g>

      {/* Shooting stars/meteors */}
      <g stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.7">
        <line x1="200" y1="300" x2="180" y2="320" filter="url(#starGlow)" />
        <line x1="600" y1="400" x2="570" y2="430" filter="url(#starGlow)" />
        <line x1="1000" y1="150" x2="980" y2="170" filter="url(#starGlow)" />
      </g>
    </svg>
  );

  const renderDesertWorld = () => (
    <svg
      role="img"
      aria-label="Desert world background"
      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient
          id="desertSkyGradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#87CEEB" />
          <stop offset="30%" stopColor="#87CEFA" />
          <stop offset="70%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFA500" />
        </linearGradient>
        <linearGradient id="sandGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F4A460" />
          <stop offset="50%" stopColor="#DEB887" />
          <stop offset="100%" stopColor="#D2B48C" />
        </linearGradient>
        <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFF00" />
          <stop offset="70%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFA500" />
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width="1200" height="480" fill="url(#desertSkyGradient)" />

      {/* Sun */}
      <circle
        cx="1000"
        cy="120"
        r="60"
        fill="url(#sunGradient)"
        stroke="#FF8C00"
        strokeWidth="2"
      />
      <g stroke="#FFD700" strokeWidth="3" opacity="0.7">
        <line x1="1000" y1="40" x2="1000" y2="20" />
        <line x1="1000" y1="220" x2="1000" y2="200" />
        <line x1="920" y1="120" x2="900" y2="120" />
        <line x1="1100" y1="120" x2="1080" y2="120" />
        <line x1="942" y1="62" x2="928" y2="48" />
        <line x1="1072" y1="192" x2="1058" y2="178" />
        <line x1="1058" y1="62" x2="1072" y2="48" />
        <line x1="928" y1="192" x2="942" y2="178" />
      </g>

      {/* Sand dunes */}
      <path
        d="M0,480 Q200,400 400,450 Q600,380 800,420 Q1000,360 1200,400 L1200,480 Z"
        fill="url(#sandGradient)"
        stroke="#D2B48C"
        strokeWidth="2"
      />

      {/* Desert floor */}
      <rect x="0" y="480" width="1200" height="320" fill="url(#sandGradient)" />

      {/* Cacti */}
      <g>
        <g transform="translate(200, 480)">
          <rect
            x="-8"
            y="-80"
            width="16"
            height="80"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="2"
            rx="8"
          />
          <rect
            x="-25"
            y="-50"
            width="12"
            height="30"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="2"
            rx="6"
          />
          <rect
            x="13"
            y="-60"
            width="10"
            height="25"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="2"
            rx="5"
          />
          <g fill="#FFFF00">
            <circle cx="0" cy="-75" r="3" />
            <circle cx="-19" cy="-35" r="2" />
            <circle cx="18" cy="-47" r="2" />
          </g>
        </g>

        <g transform="translate(600, 500)">
          <rect
            x="-6"
            y="-60"
            width="12"
            height="60"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="2"
            rx="6"
          />
          <rect
            x="-18"
            y="-40"
            width="10"
            height="25"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="2"
            rx="5"
          />
          <rect
            x="8"
            y="-45"
            width="8"
            height="20"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="2"
            rx="4"
          />
          <g fill="#FFFF00">
            <circle cx="0" cy="-55" r="2.5" />
            <circle cx="-13" cy="-27" r="2" />
            <circle cx="12" cy="-35" r="2" />
          </g>
        </g>

        <g transform="translate(950, 490)">
          <rect
            x="-10"
            y="-90"
            width="20"
            height="90"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="2"
            rx="10"
          />
          <rect
            x="-30"
            y="-60"
            width="15"
            height="35"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="2"
            rx="7"
          />
          <rect
            x="15"
            y="-70"
            width="12"
            height="30"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="2"
            rx="6"
          />
          <rect
            x="-8"
            y="-120"
            width="8"
            height="25"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="2"
            rx="4"
          />
          <g fill="#FFFF00">
            <circle cx="0" cy="-85" r="3" />
            <circle cx="-22" cy="-42" r="2.5" />
            <circle cx="21" cy="-55" r="2" />
            <circle cx="-4" cy="-107" r="2" />
          </g>
        </g>
      </g>

      {/* Rock formations */}
      <g fill="#8B4513" stroke="#654321" strokeWidth="2">
        <g transform="translate(400, 600)">
          <ellipse cx="0" cy="0" rx="40" ry="25" />
          <ellipse cx="-20" cy="-15" rx="25" ry="15" />
          <ellipse cx="25" cy="-10" rx="30" ry="18" />
        </g>
        <g transform="translate(800, 650)">
          <ellipse cx="0" cy="0" rx="35" ry="20" />
          <ellipse cx="-18" cy="-12" rx="20" ry="12" />
          <ellipse cx="22" cy="-8" rx="25" ry="15" />
        </g>
      </g>

      {/* Sand ripples */}
      <g stroke="#D2B48C" strokeWidth="1" fill="none" opacity="0.5">
        <path d="M0,550 Q100,545 200,550 Q300,555 400,550 Q500,545 600,550 Q700,555 800,550 Q900,545 1000,550 Q1100,555 1200,550" />
        <path d="M0,600 Q100,595 200,600 Q300,605 400,600 Q500,595 600,600 Q700,605 800,600 Q900,595 1000,600 Q1100,605 1200,600" />
        <path d="M0,650 Q100,645 200,650 Q300,655 400,650 Q500,645 600,650 Q700,655 800,650 Q900,645 1000,650 Q1100,655 1200,650" />
        <path d="M0,700 Q100,695 200,700 Q300,705 400,700 Q500,695 600,700 Q700,705 800,700 Q900,695 1000,700 Q1100,705 1200,700" />
      </g>

      {/* Oasis */}
      <g transform="translate(100, 650)">
        <ellipse
          cx="0"
          cy="0"
          rx="60"
          ry="30"
          fill="#4169E1"
          stroke="#191970"
          strokeWidth="2"
        />
        <g transform="translate(-20, -40)">
          <rect
            x="-3"
            y="-30"
            width="6"
            height="30"
            fill="#8B4513"
            stroke="#654321"
            strokeWidth="1"
          />
          <g fill="#228B22" stroke="#006400" strokeWidth="1">
            <ellipse cx="-15" cy="-35" rx="12" ry="8" transform="rotate(-30)" />
            <ellipse cx="0" cy="-40" rx="15" ry="10" transform="rotate(0)" />
            <ellipse cx="15" cy="-35" rx="12" ry="8" transform="rotate(30)" />
            <ellipse cx="-10" cy="-25" rx="10" ry="6" transform="rotate(-45)" />
            <ellipse cx="10" cy="-25" rx="10" ry="6" transform="rotate(45)" />
          </g>
        </g>
        <g transform="translate(20, -35)">
          <rect
            x="-2"
            y="-25"
            width="4"
            height="25"
            fill="#8B4513"
            stroke="#654321"
            strokeWidth="1"
          />
          <g fill="#228B22" stroke="#006400" strokeWidth="1">
            <ellipse cx="-12" cy="-30" rx="10" ry="6" transform="rotate(-30)" />
            <ellipse cx="0" cy="-35" rx="12" ry="8" transform="rotate(0)" />
            <ellipse cx="12" cy="-30" rx="10" ry="6" transform="rotate(30)" />
            <ellipse cx="-8" cy="-20" rx="8" ry="5" transform="rotate(-45)" />
            <ellipse cx="8" cy="-20" rx="8" ry="5" transform="rotate(45)" />
          </g>
        </g>
      </g>
    </svg>
  );

  const renderJungleWorld = () => (
    <svg
      role="img"
      aria-label="Jungle world background"
      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient
          id="jungleSkyGradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#87CEEB" />
          <stop offset="30%" stopColor="#98FB98" />
          <stop offset="70%" stopColor="#90EE90" />
          <stop offset="100%" stopColor="#32CD32" />
        </linearGradient>
        <linearGradient
          id="jungleGroundGradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#228B22" />
          <stop offset="50%" stopColor="#006400" />
          <stop offset="100%" stopColor="#2F4F2F" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="1200" height="480" fill="url(#jungleSkyGradient)" />

      {/* Canopy background */}
      <ellipse
        cx="200"
        cy="300"
        rx="150"
        ry="100"
        fill="#228B22"
        opacity="0.8"
      />
      <ellipse
        cx="500"
        cy="250"
        rx="180"
        ry="120"
        fill="#32CD32"
        opacity="0.7"
      />
      <ellipse
        cx="800"
        cy="280"
        rx="160"
        ry="110"
        fill="#228B22"
        opacity="0.8"
      />
      <ellipse
        cx="1000"
        cy="320"
        rx="140"
        ry="90"
        fill="#32CD32"
        opacity="0.7"
      />

      {/* Jungle floor */}
      <rect
        x="0"
        y="480"
        width="1200"
        height="320"
        fill="url(#jungleGroundGradient)"
      />

      {/* Large tropical trees */}
      <g>
        <g transform="translate(150, 480)">
          <rect
            x="-15"
            y="-120"
            width="30"
            height="120"
            fill="#8B4513"
            stroke="#654321"
            strokeWidth="3"
          />
          <circle
            cx="0"
            cy="-140"
            r="80"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="3"
          />
          <circle cx="-40" cy="-120" r="50" fill="#32CD32" />
          <circle cx="40" cy="-130" r="45" fill="#32CD32" />
          <circle cx="0" cy="-180" r="35" fill="#32CD32" />
          <g fill="#FF6347">
            <circle cx="-20" cy="-160" r="4" />
            <circle cx="25" cy="-145" r="4" />
            <circle cx="10" cy="-190" r="4" />
          </g>
        </g>

        <g transform="translate(400, 500)">
          <rect
            x="-12"
            y="-100"
            width="24"
            height="100"
            fill="#8B4513"
            stroke="#654321"
            strokeWidth="3"
          />
          <circle
            cx="0"
            cy="-120"
            r="70"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="3"
          />
          <circle cx="-35" cy="-100" r="45" fill="#32CD32" />
          <circle cx="35" cy="-110" r="40" fill="#32CD32" />
          <circle cx="0" cy="-160" r="30" fill="#32CD32" />
          <g fill="#FF6347">
            <circle cx="-15" cy="-140" r="3" />
            <circle cx="20" cy="-125" r="3" />
            <circle cx="5" cy="-170" r="3" />
          </g>
        </g>

        <g transform="translate(700, 490)">
          <rect
            x="-18"
            y="-130"
            width="36"
            height="130"
            fill="#8B4513"
            stroke="#654321"
            strokeWidth="3"
          />
          <circle
            cx="0"
            cy="-150"
            r="90"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="3"
          />
          <circle cx="-45" cy="-130" r="55" fill="#32CD32" />
          <circle cx="45" cy="-140" r="50" fill="#32CD32" />
          <circle cx="0" cy="-200" r="40" fill="#32CD32" />
          <g fill="#FF6347">
            <circle cx="-25" cy="-170" r="4" />
            <circle cx="30" cy="-155" r="4" />
            <circle cx="15" cy="-210" r="4" />
          </g>
        </g>

        <g transform="translate(1000, 485)">
          <rect
            x="-14"
            y="-110"
            width="28"
            height="110"
            fill="#8B4513"
            stroke="#654321"
            strokeWidth="3"
          />
          <circle
            cx="0"
            cy="-130"
            r="75"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="3"
          />
          <circle cx="-38" cy="-110" r="48" fill="#32CD32" />
          <circle cx="38" cy="-120" r="43" fill="#32CD32" />
          <circle cx="0" cy="-170" r="33" fill="#32CD32" />
          <g fill="#FF6347">
            <circle cx="-18" cy="-150" r="3.5" />
            <circle cx="23" cy="-135" r="3.5" />
            <circle cx="8" cy="-180" r="3.5" />
          </g>
        </g>
      </g>

      {/* Vines */}
      <g stroke="#228B22" strokeWidth="4" fill="none">
        <path d="M250,200 Q260,300 250,400 Q240,500 250,600" />
        <path d="M550,180 Q540,280 550,380 Q560,480 550,580" />
        <path d="M850,220 Q860,320 850,420 Q840,520 850,620" />
        <g fill="#32CD32">
          <ellipse cx="245" cy="250" rx="8" ry="4" transform="rotate(30)" />
          <ellipse cx="255" cy="350" rx="6" ry="3" transform="rotate(-20)" />
          <ellipse cx="245" cy="450" rx="7" ry="4" transform="rotate(45)" />
          <ellipse cx="545" cy="230" rx="7" ry="4" transform="rotate(-30)" />
          <ellipse cx="555" cy="330" rx="8" ry="4" transform="rotate(20)" />
          <ellipse cx="545" cy="430" rx="6" ry="3" transform="rotate(-45)" />
          <ellipse cx="855" cy="270" rx="8" ry="4" transform="rotate(30)" />
          <ellipse cx="845" cy="370" rx="7" ry="4" transform="rotate(-20)" />
          <ellipse cx="855" cy="470" rx="6" ry="3" transform="rotate(45)" />
        </g>
      </g>

      {/* Jungle undergrowth */}
      <g>
        <g transform="translate(100, 600)">
          <ellipse cx="0" cy="0" rx="30" ry="20" fill="#228B22" />
          <ellipse cx="-15" cy="-10" rx="20" ry="15" fill="#32CD32" />
          <ellipse cx="15" cy="-5" rx="25" ry="18" fill="#32CD32" />
        </g>
        <g transform="translate(300, 650)">
          <ellipse cx="0" cy="0" rx="35" ry="25" fill="#228B22" />
          <ellipse cx="-18" cy="-12" rx="22" ry="18" fill="#32CD32" />
          <ellipse cx="18" cy="-8" rx="28" ry="20" fill="#32CD32" />
        </g>
        <g transform="translate(600, 620)">
          <ellipse cx="0" cy="0" rx="40" ry="30" fill="#228B22" />
          <ellipse cx="-20" cy="-15" rx="25" ry="20" fill="#32CD32" />
          <ellipse cx="20" cy="-10" rx="30" ry="22" fill="#32CD32" />
        </g>
        <g transform="translate(900, 680)">
          <ellipse cx="0" cy="0" rx="32" ry="22" fill="#228B22" />
          <ellipse cx="-16" cy="-11" rx="20" ry="16" fill="#32CD32" />
          <ellipse cx="16" cy="-6" rx="24" ry="18" fill="#32CD32" />
        </g>
      </g>

      {/* Exotic flowers */}
      <g>
        <g transform="translate(200, 550)">
          <g fill="#FF1493">
            <ellipse cx="-10" cy="0" rx="8" ry="4" transform="rotate(0)" />
            <ellipse cx="10" cy="0" rx="8" ry="4" transform="rotate(0)" />
            <ellipse cx="0" cy="-10" rx="8" ry="4" transform="rotate(90)" />
            <ellipse cx="0" cy="10" rx="8" ry="4" transform="rotate(90)" />
            <ellipse cx="-7" cy="-7" rx="8" ry="4" transform="rotate(45)" />
            <ellipse cx="7" cy="7" rx="8" ry="4" transform="rotate(45)" />
          </g>
          <circle cx="0" cy="0" r="5" fill="#FFD700" />
        </g>

        <g transform="translate(500, 580)">
          <g fill="#9370DB">
            <ellipse cx="-8" cy="0" rx="6" ry="3" transform="rotate(0)" />
            <ellipse cx="8" cy="0" rx="6" ry="3" transform="rotate(0)" />
            <ellipse cx="0" cy="-8" rx="6" ry="3" transform="rotate(90)" />
            <ellipse cx="0" cy="8" rx="6" ry="3" transform="rotate(90)" />
            <ellipse cx="-6" cy="-6" rx="6" ry="3" transform="rotate(45)" />
            <ellipse cx="6" cy="6" rx="6" ry="3" transform="rotate(45)" />
          </g>
          <circle cx="0" cy="0" r="4" fill="#FFFF00" />
        </g>

        <g transform="translate(800, 560)">
          <g fill="#FF4500">
            <ellipse cx="-12" cy="0" rx="10" ry="5" transform="rotate(0)" />
            <ellipse cx="12" cy="0" rx="10" ry="5" transform="rotate(0)" />
            <ellipse cx="0" cy="-12" rx="10" ry="5" transform="rotate(90)" />
            <ellipse cx="0" cy="12" rx="10" ry="5" transform="rotate(90)" />
            <ellipse cx="-8" cy="-8" rx="10" ry="5" transform="rotate(45)" />
            <ellipse cx="8" cy="8" rx="10" ry="5" transform="rotate(45)" />
          </g>
          <circle cx="0" cy="0" r="6" fill="#32CD32" />
        </g>
      </g>

      {/* Butterflies */}
      <g>
        <g transform="translate(350, 300)">
          <ellipse
            cx="-5"
            cy="-3"
            rx="8"
            ry="5"
            fill="#FF69B4"
            stroke="#FF1493"
            strokeWidth="1"
          />
          <ellipse
            cx="5"
            cy="-3"
            rx="8"
            ry="5"
            fill="#FF69B4"
            stroke="#FF1493"
            strokeWidth="1"
          />
          <ellipse
            cx="-3"
            cy="3"
            rx="6"
            ry="4"
            fill="#FFB6C1"
            stroke="#FF69B4"
            strokeWidth="1"
          />
          <ellipse
            cx="3"
            cy="3"
            rx="6"
            ry="4"
            fill="#FFB6C1"
            stroke="#FF69B4"
            strokeWidth="1"
          />
          <line x1="0" y1="-8" x2="0" y2="8" stroke="#000000" strokeWidth="1" />
        </g>

        <g transform="translate(750, 350)">
          <ellipse
            cx="-4"
            cy="-2"
            rx="6"
            ry="4"
            fill="#00CED1"
            stroke="#008B8B"
            strokeWidth="1"
          />
          <ellipse
            cx="4"
            cy="-2"
            rx="6"
            ry="4"
            fill="#00CED1"
            stroke="#008B8B"
            strokeWidth="1"
          />
          <ellipse
            cx="-3"
            cy="2"
            rx="5"
            ry="3"
            fill="#48D1CC"
            stroke="#00CED1"
            strokeWidth="1"
          />
          <ellipse
            cx="3"
            cy="2"
            rx="5"
            ry="3"
            fill="#48D1CC"
            stroke="#00CED1"
            strokeWidth="1"
          />
          <line x1="0" y1="-6" x2="0" y2="6" stroke="#000000" strokeWidth="1" />
        </g>
      </g>
    </svg>
  );

  const renderSnowyWorld = () => (
    <svg
      role="img"
      aria-label="Snowy world background"
      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="snowySkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B0E0E6" />
          <stop offset="30%" stopColor="#E0F6FF" />
          <stop offset="70%" stopColor="#F0F8FF" />
          <stop offset="100%" stopColor="#FFFAFA" />
        </linearGradient>
        <linearGradient id="snowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFAFA" />
          <stop offset="50%" stopColor="#F0F8FF" />
          <stop offset="100%" stopColor="#E6E6FA" />
        </linearGradient>
        <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#708090" />
          <stop offset="50%" stopColor="#2F4F4F" />
          <stop offset="100%" stopColor="#191970" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="1200" height="480" fill="url(#snowySkyGradient)" />

      {/* Snow clouds */}
      <g fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="2" opacity="0.8">
        <g transform="translate(200, 120)">
          <circle cx="0" cy="0" r="40" />
          <circle cx="30" cy="0" r="35" />
          <circle cx="-18" cy="12" r="28" />
          <circle cx="12" cy="-18" r="25" />
        </g>
        <g transform="translate(600, 100)">
          <circle cx="0" cy="0" r="35" />
          <circle cx="25" cy="0" r="30" />
          <circle cx="-15" cy="10" r="25" />
          <circle cx="10" cy="-15" r="22" />
        </g>
        <g transform="translate(1000, 140)">
          <circle cx="0" cy="0" r="45" />
          <circle cx="35" cy="0" r="40" />
          <circle cx="-20" cy="15" r="32" />
          <circle cx="15" cy="-20" r="28" />
        </g>
      </g>

      {/* Mountain ranges */}
      <path
        d="M0,480 L150,200 L300,250 L450,150 L600,200 L750,100 L900,180 L1050,120 L1200,220 L1200,480 Z"
        fill="url(#mountainGradient)"
        stroke="#2F4F4F"
        strokeWidth="3"
      />

      {/* Snow caps on mountains */}
      <path
        d="M0,480 L150,200 L180,220 L270,270 L300,250 L330,270 L420,170 L450,150 L480,170 L570,220 L600,200 L630,220 L720,120 L750,100 L780,120 L870,200 L900,180 L930,200 L1020,140 L1050,120 L1080,140 L1170,240 L1200,220 L1200,480 Z"
        fill="url(#snowGradient)"
        stroke="#E6E6FA"
        strokeWidth="2"
      />

      {/* Snowy ground */}
      <rect x="0" y="480" width="1200" height="320" fill="url(#snowGradient)" />

      {/* Pine trees */}
      <g>
        <g transform="translate(200, 480)">
          <rect
            x="-4"
            y="-20"
            width="8"
            height="20"
            fill="#8B4513"
            stroke="#654321"
            strokeWidth="1"
          />
          <polygon
            points="0,-80 -25,-20 25,-20"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="2"
          />
          <polygon
            points="0,-70 -20,-30 20,-30"
            fill="#32CD32"
            stroke="#228B22"
            strokeWidth="2"
          />
          <polygon
            points="0,-60 -15,-40 15,-40"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="2"
          />
          <polygon
            points="0,-80 -8,-75 8,-75"
            fill="#FFFAFA"
            stroke="#E6E6FA"
            strokeWidth="1"
          />
          <polygon
            points="0,-70 -6,-65 6,-65"
            fill="#FFFAFA"
            stroke="#E6E6FA"
            strokeWidth="1"
          />
          <polygon
            points="0,-60 -4,-55 4,-55"
            fill="#FFFAFA"
            stroke="#E6E6FA"
            strokeWidth="1"
          />
        </g>

        <g transform="translate(500, 500)">
          <rect
            x="-3"
            y="-15"
            width="6"
            height="15"
            fill="#8B4513"
            stroke="#654321"
            strokeWidth="1"
          />
          <polygon
            points="0,-60 -20,-15 20,-15"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="2"
          />
          <polygon
            points="0,-50 -15,-25 15,-25"
            fill="#32CD32"
            stroke="#228B22"
            strokeWidth="2"
          />
          <polygon
            points="0,-40 -12,-35 12,-35"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="2"
          />
          <polygon
            points="0,-60 -6,-55 6,-55"
            fill="#FFFAFA"
            stroke="#E6E6FA"
            strokeWidth="1"
          />
          <polygon
            points="0,-50 -5,-45 5,-45"
            fill="#FFFAFA"
            stroke="#E6E6FA"
            strokeWidth="1"
          />
          <polygon
            points="0,-40 -3,-35 3,-35"
            fill="#FFFAFA"
            stroke="#E6E6FA"
            strokeWidth="1"
          />
        </g>

        <g transform="translate(800, 490)">
          <rect
            x="-5"
            y="-25"
            width="10"
            height="25"
            fill="#8B4513"
            stroke="#654321"
            strokeWidth="1"
          />
          <polygon
            points="0,-90 -30,-25 30,-25"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="2"
          />
          <polygon
            points="0,-80 -25,-35 25,-35"
            fill="#32CD32"
            stroke="#228B22"
            strokeWidth="2"
          />
          <polygon
            points="0,-70 -20,-45 20,-45"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="2"
          />
          <polygon
            points="0,-90 -10,-85 10,-85"
            fill="#FFFAFA"
            stroke="#E6E6FA"
            strokeWidth="1"
          />
          <polygon
            points="0,-80 -8,-75 8,-75"
            fill="#FFFAFA"
            stroke="#E6E6FA"
            strokeWidth="1"
          />
          <polygon
            points="0,-70 -6,-65 6,-65"
            fill="#FFFAFA"
            stroke="#E6E6FA"
            strokeWidth="1"
          />
        </g>

        <g transform="translate(1100, 485)">
          <rect
            x="-4"
            y="-20"
            width="8"
            height="20"
            fill="#8B4513"
            stroke="#654321"
            strokeWidth="1"
          />
          <polygon
            points="0,-75 -22,-20 22,-20"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="2"
          />
          <polygon
            points="0,-65 -18,-30 18,-30"
            fill="#32CD32"
            stroke="#228B22"
            strokeWidth="2"
          />
          <polygon
            points="0,-55 -14,-40 14,-40"
            fill="#228B22"
            stroke="#006400"
            strokeWidth="2"
          />
          <polygon
            points="0,-75 -7,-70 7,-70"
            fill="#FFFAFA"
            stroke="#E6E6FA"
            strokeWidth="1"
          />
          <polygon
            points="0,-65 -5,-60 5,-60"
            fill="#FFFAFA"
            stroke="#E6E6FA"
            strokeWidth="1"
          />
          <polygon
            points="0,-55 -4,-50 4,-50"
            fill="#FFFAFA"
            stroke="#E6E6FA"
            strokeWidth="1"
          />
        </g>
      </g>

      {/* Snow drifts */}
      <g fill="#FFFAFA" stroke="#E6E6FA" strokeWidth="2">
        <ellipse cx="150" cy="600" rx="50" ry="20" />
        <ellipse cx="400" cy="650" rx="60" ry="25" />
        <ellipse cx="700" cy="620" rx="45" ry="18" />
        <ellipse cx="950" cy="680" rx="55" ry="22" />
      </g>

      {/* Icicles */}
      <g fill="#E0F6FF" stroke="#B0E0E6" strokeWidth="1">
        <polygon points="300,480 295,520 305,520" />
        <polygon points="320,480 317,510 323,510" />
        <polygon points="340,480 336,525 344,525" />
        <polygon points="600,480 595,515 605,515" />
        <polygon points="620,480 617,505 623,505" />
        <polygon points="900,480 895,530 905,530" />
        <polygon points="920,480 917,520 923,520" />
        <polygon points="940,480 936,510 944,510" />
      </g>

      {/* Falling snow */}
      <g fill="#FFFFFF" opacity="0.8">
        <circle cx="100" cy="200" r="2" />
        <circle cx="250" cy="150" r="1.5" />
        <circle cx="400" cy="300" r="2" />
        <circle cx="550" cy="250" r="1" />
        <circle cx="700" cy="180" r="2.5" />
        <circle cx="850" cy="320" r="1.5" />
        <circle cx="1000" cy="220" r="2" />
        <circle cx="1150" cy="280" r="1" />
        <circle cx="180" cy="400" r="1.5" />
        <circle cx="320" cy="450" r="2" />
        <circle cx="480" cy="380" r="1" />
        <circle cx="620" cy="420" r="2.5" />
        <circle cx="780" cy="360" r="1.5" />
        <circle cx="920" cy="440" r="2" />
        <circle cx="1080" cy="390" r="1" />
      </g>

      {/* Frozen lake */}
      <ellipse
        cx="600"
        cy="700"
        rx="120"
        ry="40"
        fill="#E0F6FF"
        stroke="#B0E0E6"
        strokeWidth="3"
      />
      <ellipse
        cx="600"
        cy="700"
        rx="100"
        ry="30"
        fill="#F0F8FF"
        stroke="#E0F6FF"
        strokeWidth="2"
      />
    </svg>
  );

  const renderSkyWorld = () => (
    <svg
      role="img"
      aria-label="Sky world background"
      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Sky gradient — bright blue top, soft white-gold bottom */}
        <linearGradient id="skySkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4FC3F7" />
          <stop offset="25%" stopColor="#81D4FA" />
          <stop offset="60%" stopColor="#E1F5FE" />
          <stop offset="85%" stopColor="#FFF9E6" />
          <stop offset="100%" stopColor="#FFFDE7" />
        </linearGradient>

        {/* Golden sunbeam glow */}
        <radialGradient id="sunGlow" cx="70%" cy="15%" r="40%">
          <stop offset="0%" stopColor="#FFF9C4" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#FFE082" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFE082" stopOpacity="0" />
        </radialGradient>

        {/* Rainbow gradient — 7 colour arcs */}
        <linearGradient id="rainbowRed" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF0000" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FF0000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rainbowOrange" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF7F00" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FF7F00" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rainbowYellow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFF00" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFFF00" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rainbowGreen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00C000" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#00C000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rainbowBlue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0000FF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0000FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rainbowIndigo" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4B0082" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#4B0082" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rainbowViolet" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9400D3" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#9400D3" stopOpacity="0" />
        </linearGradient>

        {/* Soft cloud glow filter */}
        <filter id="cloudGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Sunbeam rays mask */}
        <radialGradient id="sunBeamGrad" cx="70%" cy="15%" r="60%">
          <stop offset="0%" stopColor="#FFF8DC" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#FFE57F" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FFE57F" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width="1200" height="800" fill="url(#skySkyGradient)" />

      {/* Sun glow bloom */}
      <ellipse cx="840" cy="120" rx="380" ry="280" fill="url(#sunGlow)" />
      <ellipse cx="840" cy="120" rx="200" ry="160" fill="url(#sunBeamGrad)" />

      {/* Sunbeam shafts */}
      <g opacity="0.18">
        <polygon points="840,60 780,450 860,450" fill="#FFF59D" />
        <polygon points="840,60 700,480 780,480" fill="#FFF59D" />
        <polygon points="840,60 900,480 960,480" fill="#FFF59D" />
        <polygon points="840,60 640,500 720,500" fill="#FFF59D" />
        <polygon points="840,60 1000,500 1040,500" fill="#FFF59D" />
        <polygon points="840,60 580,520 650,520" fill="#FFF59D" />
        <polygon points="840,60 1060,520 1090,520" fill="#FFF59D" />
      </g>

      {/* Sun disc */}
      <circle
        cx="840"
        cy="90"
        r="55"
        fill="#FFF176"
        stroke="#FFE082"
        strokeWidth="3"
        opacity="0.9"
      />
      <circle cx="840" cy="90" r="42" fill="#FFEE58" opacity="0.95" />
      <circle cx="840" cy="90" r="30" fill="#FFF9C4" opacity="1" />

      {/* === RAINBOW (7 arcs — outermost red, innermost violet) === */}
      {/* Each arc is a thick SVG arc path centred at (600, 520) */}
      {/* Red — outermost, r=380 */}
      <path
        d="M 20,520 A 580,580 0 0,1 1180,520"
        fill="none"
        stroke="#FF3B30"
        strokeWidth="22"
        strokeOpacity="0.75"
      />
      {/* Orange r=358 */}
      <path
        d="M 42,520 A 558,558 0 0,1 1158,520"
        fill="none"
        stroke="#FF9500"
        strokeWidth="22"
        strokeOpacity="0.75"
      />
      {/* Yellow r=336 */}
      <path
        d="M 64,520 A 536,536 0 0,1 1136,520"
        fill="none"
        stroke="#FFCC00"
        strokeWidth="22"
        strokeOpacity="0.80"
      />
      {/* Green r=314 */}
      <path
        d="M 86,520 A 514,514 0 0,1 1114,520"
        fill="none"
        stroke="#34C759"
        strokeWidth="22"
        strokeOpacity="0.75"
      />
      {/* Blue r=292 */}
      <path
        d="M 108,520 A 492,492 0 0,1 1092,520"
        fill="none"
        stroke="#007AFF"
        strokeWidth="22"
        strokeOpacity="0.75"
      />
      {/* Indigo r=270 */}
      <path
        d="M 130,520 A 470,470 0 0,1 1070,520"
        fill="none"
        stroke="#5856D6"
        strokeWidth="22"
        strokeOpacity="0.75"
      />
      {/* Violet r=248 — innermost */}
      <path
        d="M 152,520 A 448,448 0 0,1 1048,520"
        fill="none"
        stroke="#AF52DE"
        strokeWidth="22"
        strokeOpacity="0.75"
      />

      {/* === CLOUDS === */}

      {/* Large fluffy cloud — upper left */}
      <g filter="url(#cloudGlow)">
        <g
          transform="translate(170, 160)"
          fill="#FFFFFF"
          stroke="#F0F4FF"
          strokeWidth="1.5"
        >
          <circle cx="0" cy="0" r="55" />
          <circle cx="55" cy="-10" r="48" />
          <circle cx="110" cy="5" r="52" />
          <circle cx="160" cy="-5" r="44" />
          <circle cx="80" cy="-40" r="38" />
          <circle cx="35" cy="-35" r="32" />
          <circle cx="125" cy="-35" r="34" />
          {/* Soft pastel pink tint layer */}
          <ellipse
            cx="80"
            cy="-15"
            rx="120"
            ry="55"
            fill="#FFE4F0"
            opacity="0.18"
          />
        </g>
      </g>

      {/* Medium dreamy cloud — upper right, pink tint */}
      <g filter="url(#cloudGlow)">
        <g
          transform="translate(870, 190)"
          fill="#FFF0F8"
          stroke="#F5E6FF"
          strokeWidth="1.5"
        >
          <circle cx="0" cy="0" r="42" />
          <circle cx="42" cy="-8" r="36" />
          <circle cx="84" cy="4" r="40" />
          <circle cx="126" cy="-4" r="33" />
          <circle cx="63" cy="-35" r="30" />
          <circle cx="25" cy="-28" r="25" />
          <circle cx="100" cy="-28" r="27" />
          <ellipse
            cx="63"
            cy="-12"
            rx="90"
            ry="42"
            fill="#E8D0FF"
            opacity="0.2"
          />
        </g>
      </g>

      {/* Small cloud — top centre */}
      <g filter="url(#cloudGlow)">
        <g
          transform="translate(490, 80)"
          fill="#FFFFFF"
          stroke="#EEF4FF"
          strokeWidth="1"
        >
          <circle cx="0" cy="0" r="28" />
          <circle cx="30" cy="-6" r="24" />
          <circle cx="58" cy="2" r="26" />
          <circle cx="85" cy="-3" r="20" />
          <circle cx="42" cy="-22" r="18" />
        </g>
      </g>

      {/* Mid cloud — left mid, white */}
      <g filter="url(#cloudGlow)">
        <g
          transform="translate(50, 290)"
          fill="#FFFFFF"
          stroke="#E8F4FF"
          strokeWidth="1.5"
        >
          <circle cx="0" cy="0" r="38" />
          <circle cx="40" cy="-8" r="33" />
          <circle cx="80" cy="3" r="36" />
          <circle cx="115" cy="-3" r="28" />
          <circle cx="55" cy="-28" r="24" />
        </g>
      </g>

      {/* Small soft cloud — right mid */}
      <g filter="url(#cloudGlow)">
        <g
          transform="translate(1040, 310)"
          fill="#FFF8FF"
          stroke="#EEE0FF"
          strokeWidth="1"
        >
          <circle cx="0" cy="0" r="30" />
          <circle cx="32" cy="-5" r="26" />
          <circle cx="62" cy="3" r="28" />
          <circle cx="90" cy="-2" r="21" />
          <circle cx="45" cy="-22" r="19" />
          <ellipse
            cx="45"
            cy="-8"
            rx="65"
            ry="28"
            fill="#DDD0FF"
            opacity="0.18"
          />
        </g>
      </g>

      {/* Large lower-layer cloud — bottom left, partial */}
      <g filter="url(#cloudGlow)">
        <g
          transform="translate(-30, 420)"
          fill="#FFFFFF"
          stroke="#E4EEFF"
          strokeWidth="1.5"
          opacity="0.85"
        >
          <circle cx="0" cy="0" r="50" />
          <circle cx="55" cy="-12" r="44" />
          <circle cx="110" cy="6" r="48" />
          <circle cx="160" cy="-6" r="40" />
          <circle cx="210" cy="4" r="44" />
          <circle cx="78" cy="-42" r="35" />
          <circle cx="138" cy="-38" r="32" />
        </g>
      </g>

      {/* Large lower-layer cloud — bottom right */}
      <g filter="url(#cloudGlow)">
        <g
          transform="translate(860, 440)"
          fill="#FFF4FF"
          stroke="#EEE0F8"
          strokeWidth="1.5"
          opacity="0.85"
        >
          <circle cx="0" cy="0" r="46" />
          <circle cx="50" cy="-10" r="40" />
          <circle cx="98" cy="5" r="44" />
          <circle cx="145" cy="-5" r="37" />
          <circle cx="70" cy="-38" r="32" />
          <circle cx="122" cy="-34" r="29" />
          <ellipse
            cx="73"
            cy="-10"
            rx="105"
            ry="46"
            fill="#E0CCFF"
            opacity="0.15"
          />
        </g>
      </g>

      {/* === BIRDS (simple silhouettes) === */}
      <g fill="none" stroke="#4A90D9" strokeWidth="2.5" strokeLinecap="round">
        {/* Bird 1 */}
        <path d="M 330,230 Q 337,222 344,230" />
        <path d="M 344,230 Q 351,222 358,230" />
        {/* Bird 2 */}
        <path d="M 370,210 Q 378,201 386,210" />
        <path d="M 386,210 Q 394,201 402,210" />
        {/* Bird 3 */}
        <path d="M 350,255 Q 356,247 362,255" />
        <path d="M 362,255 Q 368,247 374,255" />
        {/* Bird 4 */}
        <path d="M 650,145 Q 658,136 666,145" />
        <path d="M 666,145 Q 674,136 682,145" />
        {/* Bird 5 */}
        <path d="M 688,162 Q 694,154 700,162" />
        <path d="M 700,162 Q 706,154 712,162" />
        {/* Bird 6 */}
        <path d="M 720,140 Q 727,131 734,140" />
        <path d="M 734,140 Q 741,131 748,140" />
      </g>

      {/* === GROUND — soft cloud floor === */}
      {/* Fluffy cloud floor replacing a hard ground */}
      <g filter="url(#cloudGlow)">
        <ellipse
          cx="100"
          cy="800"
          rx="160"
          ry="70"
          fill="#FFFFFF"
          opacity="0.7"
        />
        <ellipse
          cx="350"
          cy="790"
          rx="200"
          ry="80"
          fill="#FFF0FA"
          opacity="0.75"
        />
        <ellipse
          cx="600"
          cy="805"
          rx="220"
          ry="75"
          fill="#FFFFFF"
          opacity="0.7"
        />
        <ellipse
          cx="850"
          cy="795"
          rx="190"
          ry="78"
          fill="#FFF4FF"
          opacity="0.75"
        />
        <ellipse
          cx="1100"
          cy="800"
          rx="170"
          ry="72"
          fill="#FFFFFF"
          opacity="0.7"
        />
      </g>
    </svg>
  );

  const renderCyberpunkWorld = () => (
    <svg
      role="img"
      aria-label="Cyberpunk City world background"
      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Dark dystopian sky */}
        <linearGradient id="cyberpunkSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#02020c" />
          <stop offset="25%" stopColor="#0d0520" />
          <stop offset="55%" stopColor="#150a30" />
          <stop offset="80%" stopColor="#0d1428" />
          <stop offset="100%" stopColor="#080510" />
        </linearGradient>

        {/* Neon horizon glow */}
        <radialGradient id="horizonGlowCyan" cx="25%" cy="85%" r="55%">
          <stop offset="0%" stopColor="#00ffff" stopOpacity="0.22" />
          <stop offset="50%" stopColor="#0055ff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#0055ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="horizonGlowPurple" cx="75%" cy="80%" r="60%">
          <stop offset="0%" stopColor="#cc00ff" stopOpacity="0.28" />
          <stop offset="50%" stopColor="#8800cc" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#8800cc" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="horizonGlowOrange" cx="50%" cy="95%" r="40%">
          <stop offset="0%" stopColor="#ff6600" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ff6600" stopOpacity="0" />
        </radialGradient>

        {/* Building gradients */}
        <linearGradient id="buildingDistant" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0c0c22" />
          <stop offset="100%" stopColor="#05050f" />
        </linearGradient>
        <linearGradient id="buildingDark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#111128" />
          <stop offset="100%" stopColor="#080812" />
        </linearGradient>
        <linearGradient id="buildingMid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a36" />
          <stop offset="100%" stopColor="#0c0c1c" />
        </linearGradient>
        <linearGradient id="buildingFg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22223e" />
          <stop offset="100%" stopColor="#10101e" />
        </linearGradient>
        <linearGradient id="buildingFg2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e1e3a" />
          <stop offset="100%" stopColor="#0e0e1c" />
        </linearGradient>

        {/* Neon glow filters */}
        <filter id="neonGlowCyan" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter
          id="neonGlowMagenta"
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
        >
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="neonGlowSoft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter
          id="neonGlowOrange"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Street light pool gradients */}
        <radialGradient id="streetLightCyan" cx="50%" cy="20%" r="70%">
          <stop offset="0%" stopColor="#00ffff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00ffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="streetLightMagenta" cx="50%" cy="20%" r="70%">
          <stop offset="0%" stopColor="#ff00cc" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ff00cc" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="streetLightYellow" cx="50%" cy="20%" r="70%">
          <stop offset="0%" stopColor="#ffcc00" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffcc00" stopOpacity="0" />
        </radialGradient>

        {/* CSS animations for rain */}
        <style>{`
          @keyframes rainFallBg {
            0%   { transform: translateY(-820px); opacity: 0; }
            5%   { opacity: 1; }
            95%  { opacity: 1; }
            100% { transform: translateY(820px); opacity: 0; }
          }
          @keyframes rainFallFg {
            0%   { transform: translateY(-820px); opacity: 0; }
            5%   { opacity: 1; }
            95%  { opacity: 1; }
            100% { transform: translateY(820px); opacity: 0; }
          }
          @keyframes rippleFade {
            0%   { opacity: 0; rx: 2px; ry: 1px; }
            30%  { opacity: 0.6; }
            100% { opacity: 0; rx: 8px; ry: 3px; }
          }
          .cp-rain-bg { animation: rainFallBg linear infinite; }
          .cp-rain-fg { animation: rainFallFg linear infinite; }
          .cp-ripple  { animation: rippleFade ease-out infinite; }
        `}</style>
      </defs>

      {/* === SKY === */}
      <rect width="1200" height="800" fill="url(#cyberpunkSky)" />

      {/* Neon horizon fog glows */}
      <rect width="1200" height="800" fill="url(#horizonGlowCyan)" />
      <rect width="1200" height="800" fill="url(#horizonGlowPurple)" />
      <rect width="1200" height="800" fill="url(#horizonGlowOrange)" />

      {/* Faint stars */}
      <g fill="#ffffff" opacity="0.4">
        <circle cx="80" cy="28" r="0.7" />
        <circle cx="200" cy="48" r="0.9" />
        <circle cx="330" cy="18" r="0.6" />
        <circle cx="460" cy="40" r="0.9" />
        <circle cx="570" cy="12" r="0.7" />
        <circle cx="680" cy="44" r="0.6" />
        <circle cx="760" cy="22" r="0.9" />
        <circle cx="900" cy="35" r="0.7" />
        <circle cx="1020" cy="15" r="0.9" />
        <circle cx="1140" cy="48" r="0.6" />
        <circle cx="140" cy="82" r="0.5" />
        <circle cx="410" cy="92" r="0.7" />
        <circle cx="640" cy="72" r="0.5" />
        <circle cx="850" cy="88" r="0.8" />
        <circle cx="1080" cy="68" r="0.6" />
        <circle cx="270" cy="60" r="0.6" />
        <circle cx="740" cy="105" r="0.5" />
        <circle cx="990" cy="58" r="0.7" />
        <circle cx="1180" cy="30" r="0.6" />
      </g>

      {/* === BACKGROUND LAYER — distant low-contrast buildings (20+) === */}
      <g fill="url(#buildingDistant)" opacity="0.75">
        {/* Very distant skyline strip — lots of variety in height */}
        <rect x="0" y="360" width="45" height="120" />
        <rect x="38" y="330" width="30" height="150" />
        <rect x="60" y="345" width="55" height="135" />
        <rect x="105" y="308" width="38" height="172" />
        {/* Spire on bg building */}
        <rect x="121" y="270" width="6" height="40" />
        <rect x="155" y="320" width="50" height="160" />
        <rect x="195" y="298" width="35" height="182" />
        <rect x="220" y="280" width="60" height="200" />
        {/* Tapered top: stepped profile */}
        <rect x="272" y="268" width="10" height="14" />
        <rect x="270" y="282" width="14" height="10" />
        <rect x="268" y="292" width="18" height="8" />
        <rect x="262" y="300" width="30" height="180" />
        <rect x="285" y="316" width="45" height="164" />
        <rect x="325" y="295" width="55" height="185" />
        {/* Antenna spire */}
        <rect x="349" y="255" width="5" height="42" />
        <rect x="370" y="272" width="40" height="208" />
        <rect x="403" y="258" width="65" height="222" />
        <rect x="460" y="283" width="38" height="197" />
        <rect x="490" y="268" width="52" height="212" />
        {/* Stepped top */}
        <rect x="500" y="250" width="32" height="20" />
        <rect x="504" y="234" width="24" height="18" />
        <rect x="508" y="220" width="16" height="16" />
        <rect x="535" y="280" width="48" height="200" />
        <rect x="575" y="260" width="40" height="220" />
        <rect x="610" y="275" width="58" height="205" />
        <rect x="660" y="248" width="44" height="232" />
        {/* Spire */}
        <rect x="680" y="210" width="4" height="40" />
        <rect x="698" y="265" width="52" height="215" />
        <rect x="742" y="278" width="36" height="202" />
        <rect x="770" y="255" width="60" height="225" />
        <rect x="822" y="268" width="42" height="212" />
        <rect x="856" y="244" width="55" height="236" />
        {/* Communication tower top */}
        <rect x="873" y="212" width="6" height="34" />
        <rect x="876" y="200" width="0" height="0" />
        <rect x="905" y="260" width="50" height="220" />
        <rect x="948" y="245" width="44" height="235" />
        <rect x="985" y="270" width="60" height="210" />
        <rect x="1038" y="252" width="38" height="228" />
        <rect x="1070" y="235" width="54" height="245" />
        {/* Helipad platform top */}
        <rect x="1082" y="222" width="30" height="14" />
        <rect x="1080" y="220" width="34" height="4" />
        <rect x="1118" y="258" width="46" height="222" />
        <rect x="1155" y="270" width="45" height="210" />
      </g>

      {/* === MID LAYER — darker purple/teal buildings with more detail === */}
      <g fill="url(#buildingDark)">
        {/* Varied heights, some stepped or tapered */}
        <rect x="0" y="400" width="70" height="400" />
        {/* Stepped profile */}
        <rect x="12" y="372" width="46" height="30" />
        <rect x="22" y="350" width="26" height="24" />

        <rect x="58" y="380" width="85" height="420" />
        <rect x="70" y="352" width="61" height="30" />
        {/* Antenna */}
        <rect x="97" y="308" width="5" height="46" />

        <rect x="132" y="365" width="100" height="435" />
        <rect x="148" y="335" width="68" height="32" />
        {/* Cooling towers */}
        <rect x="152" y="322" width="16" height="15" rx="3" />
        <rect x="174" y="318" width="16" height="19" rx="3" />

        <rect x="220" y="340" width="115" height="460" />
        <rect x="238" y="310" width="79" height="32" />
        <rect x="250" y="285" width="55" height="26" />
        {/* Spire */}
        <rect x="275" y="245" width="5" height="42" />

        <rect x="325" y="355" width="90" height="445" />
        <rect x="340" y="326" width="60" height="31" />

        <rect x="405" y="340" width="110" height="460" />
        <rect x="420" y="308" width="80" height="34" />
        <rect x="430" y="278" width="60" height="32" />
        {/* Stepped spire */}
        <rect x="444" y="256" width="32" height="24" />
        <rect x="450" y="238" width="20" height="20" />
        <rect x="455" y="222" width="10" height="18" />
        <rect x="459" y="200" width="2" height="24" />

        <rect x="505" y="348" width="95" height="452" />
        <rect x="520" y="318" width="65" height="32" />
        {/* Helipad */}
        <rect x="522" y="305" width="61" height="15" />
        <rect x="518" y="302" width="69" height="5" />

        <rect x="590" y="328" width="130" height="472" />
        <rect x="608" y="295" width="94" height="35" />
        <rect x="620" y="268" width="70" height="29" />
        {/* Comm tower */}
        <rect x="651" y="220" width="8" height="50" />

        <rect x="710" y="342" width="105" height="458" />
        <rect x="726" y="312" width="73" height="32" />

        <rect x="806" y="322" width="120" height="478" />
        <rect x="824" y="290" width="84" height="34" />
        <rect x="836" y="262" width="60" height="30" />
        <rect x="847" y="238" width="38" height="26" />
        {/* Spire */}
        <rect x="864" y="195" width="4" height="45" />

        <rect x="916" y="358" width="88" height="442" />
        <rect x="932" y="328" width="56" height="32" />

        <rect x="995" y="315" width="130" height="485" />
        <rect x="1012" y="282" width="96" height="35" />
        <rect x="1024" y="254" width="72" height="30" />
        <rect x="1036" y="228" width="48" height="28" />
        {/* Antenna spire */}
        <rect x="1058" y="182" width="4" height="48" />

        <rect x="1116" y="340" width="84" height="460" />
        <rect x="1130" y="310" width="56" height="32" />
      </g>

      {/* Mid-layer neon edge accents */}
      <g
        stroke="#00ffff"
        strokeWidth="1"
        fill="none"
        opacity="0.2"
        filter="url(#neonGlowCyan)"
      >
        <line x1="275" y1="245" x2="275" y2="340" />
        <line x1="459" y1="200" x2="459" y2="285" />
        <line x1="864" y1="195" x2="864" y2="290" />
        <line x1="1058" y1="182" x2="1058" y2="282" />
      </g>
      <g
        stroke="#ff00cc"
        strokeWidth="1"
        fill="none"
        opacity="0.2"
        filter="url(#neonGlowMagenta)"
      >
        <line x1="97" y1="308" x2="97" y2="380" />
        <line x1="651" y1="220" x2="651" y2="328" />
      </g>

      {/* === FOREGROUND BUILDINGS — iconic shapes with detail === */}
      {/* FG Building 1: Left stepped tower */}
      <g fill="url(#buildingFg)">
        <rect x="0" y="460" width="140" height="340" />
        <rect x="10" y="425" width="120" height="37" />
        <rect x="22" y="395" width="96" height="32" />
        <rect x="36" y="368" width="68" height="29" />
        {/* Spire */}
        <rect x="67" y="315" width="6" height="55" />
        {/* Window grid layer 1 */}
      </g>

      {/* FG Building 2: Wide corporate tower */}
      <g fill="url(#buildingFg2)">
        <rect x="118" y="420" width="185" height="380" />
        <rect x="128" y="386" width="165" height="36" />
        <rect x="142" y="355" width="137" height="33" />
        {/* Helipad platform */}
        <rect x="138" y="340" width="145" height="17" />
        <rect x="134" y="337" width="153" height="5" />
        {/* Antenna */}
        <rect x="207" y="278" width="5" height="62" />
        <rect x="203" y="272" width="13" height="8" />
      </g>

      {/* FG Building 3: Medium jagged tower */}
      <g fill="url(#buildingFg)">
        <rect x="285" y="440" width="155" height="360" />
        <rect x="298" y="410" width="129" height="32" />
        <rect x="314" y="382" width="97" height="30" />
        <rect x="330" y="358" width="65" height="26" />
        {/* Jagged top */}
        <polygon points="330,358 363,310 396,358" />
        {/* Comm dish */}
        <ellipse
          cx="363"
          cy="308"
          rx="12"
          ry="6"
          fill="none"
          stroke="#336655"
          strokeWidth="2"
        />
        <line
          x1="363"
          y1="308"
          x2="363"
          y2="285"
          stroke="#336655"
          strokeWidth="2"
        />
      </g>

      {/* FG Building 4: Tallest center tower */}
      <g fill="url(#buildingFg2)">
        <rect x="428" y="395" width="210" height="405" />
        <rect x="442" y="358" width="182" height="39" />
        <rect x="460" y="325" width="146" height="35" />
        <rect x="478" y="296" width="110" height="31" />
        <rect x="494" y="270" width="78" height="28" />
        {/* Tapered penthouse */}
        <rect x="510" y="248" width="46" height="24" />
        <rect x="518" y="228" width="30" height="22" />
        {/* Twin antennas */}
        <rect x="522" y="172" width="4" height="58" />
        <rect x="530" y="180" width="3" height="50" />
        {/* Cooling towers on roof */}
        <rect x="442" y="346" width="18" height="14" rx="4" />
        <rect x="466" y="342" width="18" height="18" rx="4" />
        <rect x="556" y="344" width="18" height="18" rx="4" />
        <rect x="580" y="346" width="18" height="14" rx="4" />
      </g>

      {/* FG Building 5: Right-center bold */}
      <g fill="url(#buildingFg)">
        <rect x="625" y="415" width="185" height="385" />
        <rect x="638" y="383" width="159" height="34" />
        <rect x="654" y="354" width="127" height="31" />
        <rect x="670" y="328" width="95" height="28" />
        {/* Stepped top */}
        <rect x="686" y="306" width="63" height="24" />
        <rect x="696" y="288" width="43" height="20" />
        {/* Spire */}
        <rect x="715" y="238" width="5" height="52" />
        <rect x="712" y="234" width="11" height="6" />
      </g>

      {/* FG Building 6: Far right tower */}
      <g fill="url(#buildingFg2)">
        <rect x="798" y="400" width="200" height="400" />
        <rect x="812" y="368" width="172" height="34" />
        <rect x="828" y="338" width="140" height="32" />
        <rect x="844" y="312" width="108" height="28" />
        <rect x="858" y="288" width="80" height="26" />
        {/* Helipad */}
        <rect x="854" y="272" width="88" height="18" />
        <rect x="850" y="268" width="96" height="6" />
        {/* Antenna */}
        <rect x="895" y="215" width="5" height="58" />
      </g>

      {/* FG Building 7: Right edge tower */}
      <g fill="url(#buildingFg)">
        <rect x="985" y="430" width="215" height="370" />
        <rect x="998" y="396" width="189" height="36" />
        <rect x="1014" y="364" width="157" height="34" />
        <rect x="1030" y="336" width="125" height="30" />
        <rect x="1044" y="310" width="97" height="28" />
        <rect x="1056" y="288" width="73" height="24" />
        {/* Twin stepped top */}
        <rect x="1064" y="268" width="57" height="22" />
        <rect x="1070" y="250" width="45" height="20" />
        {/* Spire */}
        <rect x="1090" y="198" width="5" height="54" />
        <rect x="1086" y="194" width="13" height="6" />
        {/* Cooling towers */}
        <rect x="998" y="384" width="20" height="14" rx="3" />
        <rect x="1024" y="380" width="20" height="18" rx="3" />
      </g>

      {/* === WINDOW GRIDS on foreground buildings === */}
      {/* Building 4 center — cyan window grid */}
      <g fill="#00ffff" opacity="0.55" filter="url(#neonGlowCyan)">
        {/* Column 1 */}
        <rect x="450" y="415" width="9" height="6" />
        <rect x="450" y="430" width="9" height="6" />
        <rect x="450" y="445" width="9" height="6" />
        <rect x="450" y="460" width="9" height="6" />
        <rect x="450" y="475" width="9" height="6" />
        <rect x="450" y="490" width="9" height="6" />
        <rect x="450" y="505" width="9" height="6" />
        {/* Column 2 */}
        <rect x="466" y="410" width="9" height="6" />
        <rect x="466" y="425" width="9" height="6" />
        <rect x="466" y="440" width="9" height="6" />
        <rect x="466" y="455" width="9" height="6" />
        <rect x="466" y="470" width="9" height="6" />
        <rect x="466" y="485" width="9" height="6" />
        {/* Column 3 */}
        <rect x="482" y="415" width="9" height="6" />
        <rect x="482" y="430" width="9" height="6" />
        <rect x="482" y="445" width="9" height="6" />
        <rect x="482" y="460" width="9" height="6" />
        <rect x="482" y="475" width="9" height="6" />
        {/* Column 4 — skip a few for realistic look */}
        <rect x="568" y="415" width="9" height="6" />
        <rect x="568" y="430" width="9" height="6" />
        <rect x="568" y="445" width="9" height="6" />
        <rect x="568" y="460" width="9" height="6" />
        <rect x="568" y="475" width="9" height="6" />
        <rect x="568" y="490" width="9" height="6" />
        {/* Column 5 */}
        <rect x="584" y="410" width="9" height="6" />
        <rect x="584" y="425" width="9" height="6" />
        <rect x="584" y="440" width="9" height="6" />
        <rect x="584" y="455" width="9" height="6" />
        <rect x="584" y="470" width="9" height="6" />
        <rect x="584" y="485" width="9" height="6" />
        <rect x="584" y="500" width="9" height="6" />
      </g>

      {/* Building 6 right — magenta window grid */}
      <g fill="#ff00cc" opacity="0.55" filter="url(#neonGlowMagenta)">
        <rect x="824" y="420" width="10" height="6" />
        <rect x="824" y="436" width="10" height="6" />
        <rect x="824" y="452" width="10" height="6" />
        <rect x="824" y="468" width="10" height="6" />
        <rect x="824" y="484" width="10" height="6" />
        <rect x="840" y="425" width="10" height="6" />
        <rect x="840" y="441" width="10" height="6" />
        <rect x="840" y="457" width="10" height="6" />
        <rect x="840" y="473" width="10" height="6" />
        <rect x="856" y="420" width="10" height="6" />
        <rect x="856" y="436" width="10" height="6" />
        <rect x="856" y="452" width="10" height="6" />
        <rect x="872" y="428" width="10" height="6" />
        <rect x="872" y="444" width="10" height="6" />
        <rect x="888" y="420" width="10" height="6" />
        <rect x="888" y="436" width="10" height="6" />
        <rect x="888" y="452" width="10" height="6" />
        <rect x="904" y="425" width="10" height="6" />
        <rect x="904" y="441" width="10" height="6" />
        <rect x="920" y="420" width="10" height="6" />
        <rect x="936" y="432" width="10" height="6" />
        <rect x="952" y="420" width="10" height="6" />
        <rect x="952" y="436" width="10" height="6" />
        <rect x="968" y="428" width="10" height="6" />
      </g>

      {/* Building 1/2 left — mixed windows */}
      <g fill="#00ffff" opacity="0.5" filter="url(#neonGlowCyan)">
        <rect x="18" y="478" width="8" height="5" />
        <rect x="32" y="478" width="8" height="5" />
        <rect x="46" y="478" width="8" height="5" />
        <rect x="60" y="478" width="8" height="5" />
        <rect x="18" y="494" width="8" height="5" />
        <rect x="46" y="494" width="8" height="5" />
        <rect x="32" y="510" width="8" height="5" />
        <rect x="60" y="510" width="8" height="5" />
        <rect x="130" y="440" width="8" height="5" />
        <rect x="148" y="440" width="8" height="5" />
        <rect x="166" y="440" width="8" height="5" />
        <rect x="184" y="440" width="8" height="5" />
        <rect x="202" y="440" width="8" height="5" />
        <rect x="220" y="440" width="8" height="5" />
        <rect x="238" y="440" width="8" height="5" />
        <rect x="130" y="456" width="8" height="5" />
        <rect x="148" y="456" width="8" height="5" />
        <rect x="184" y="456" width="8" height="5" />
        <rect x="220" y="456" width="8" height="5" />
        <rect x="238" y="456" width="8" height="5" />
        <rect x="130" y="472" width="8" height="5" />
        <rect x="166" y="472" width="8" height="5" />
        <rect x="202" y="472" width="8" height="5" />
        <rect x="238" y="472" width="8" height="5" />
      </g>

      {/* Building 5 — yellow accent windows */}
      <g fill="#ffcc00" opacity="0.6">
        <rect x="646" y="436" width="8" height="5" />
        <rect x="660" y="436" width="8" height="5" />
        <rect x="674" y="436" width="8" height="5" />
        <rect x="688" y="436" width="8" height="5" />
        <rect x="702" y="436" width="8" height="5" />
        <rect x="716" y="436" width="8" height="5" />
        <rect x="646" y="452" width="8" height="5" />
        <rect x="674" y="452" width="8" height="5" />
        <rect x="702" y="452" width="8" height="5" />
        <rect x="730" y="452" width="8" height="5" />
        <rect x="646" y="468" width="8" height="5" />
        <rect x="660" y="468" width="8" height="5" />
        <rect x="716" y="468" width="8" height="5" />
        <rect x="730" y="468" width="8" height="5" />
        <rect x="744" y="436" width="8" height="5" />
        <rect x="758" y="436" width="8" height="5" />
        <rect x="772" y="452" width="8" height="5" />
        <rect x="786" y="436" width="8" height="5" />
      </g>

      {/* Building 7 right — cyan+magenta mix */}
      <g fill="#00ffff" opacity="0.5" filter="url(#neonGlowCyan)">
        <rect x="1006" y="450" width="8" height="5" />
        <rect x="1020" y="450" width="8" height="5" />
        <rect x="1034" y="450" width="8" height="5" />
        <rect x="1048" y="450" width="8" height="5" />
        <rect x="1062" y="450" width="8" height="5" />
        <rect x="1006" y="466" width="8" height="5" />
        <rect x="1034" y="466" width="8" height="5" />
        <rect x="1062" y="466" width="8" height="5" />
        <rect x="1076" y="450" width="8" height="5" />
        <rect x="1090" y="450" width="8" height="5" />
        <rect x="1104" y="466" width="8" height="5" />
        <rect x="1118" y="450" width="8" height="5" />
        <rect x="1132" y="450" width="8" height="5" />
        <rect x="1146" y="466" width="8" height="5" />
        <rect x="1160" y="450" width="8" height="5" />
        <rect x="1174" y="450" width="8" height="5" />
      </g>
      <g fill="#ff00cc" opacity="0.5" filter="url(#neonGlowMagenta)">
        <rect x="1013" y="482" width="8" height="5" />
        <rect x="1027" y="482" width="8" height="5" />
        <rect x="1055" y="482" width="8" height="5" />
        <rect x="1083" y="482" width="8" height="5" />
        <rect x="1111" y="482" width="8" height="5" />
        <rect x="1139" y="482" width="8" height="5" />
        <rect x="1167" y="482" width="8" height="5" />
        <rect x="1013" y="498" width="8" height="5" />
        <rect x="1041" y="498" width="8" height="5" />
        <rect x="1069" y="498" width="8" height="5" />
        <rect x="1097" y="498" width="8" height="5" />
        <rect x="1125" y="498" width="8" height="5" />
        <rect x="1153" y="498" width="8" height="5" />
      </g>

      {/* === NEON OUTLINES on foreground building tops === */}
      <g
        filter="url(#neonGlowCyan)"
        stroke="#00ffff"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      >
        <polyline points="0,460 140,460 152,425 303,425 303,440" />
        <polyline points="428,395 638,395 640,383" />
        <polyline points="985,430 1200,430" />
      </g>
      <g
        filter="url(#neonGlowMagenta)"
        stroke="#ff00cc"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      >
        <polyline points="118,420 303,420" />
        <polyline points="625,415 798,415" />
        <polyline points="798,400 985,400" />
      </g>

      {/* === HOLOGRAPHIC GRID OVERLAYS === */}
      <g stroke="#00ffff" strokeWidth="0.5" opacity="0.11">
        <line x1="428" y1="395" x2="638" y2="395" />
        <line x1="428" y1="415" x2="638" y2="415" />
        <line x1="428" y1="435" x2="638" y2="435" />
        <line x1="428" y1="455" x2="638" y2="455" />
        <line x1="428" y1="475" x2="638" y2="475" />
        <line x1="428" y1="495" x2="638" y2="495" />
        <line x1="428" y1="515" x2="638" y2="515" />
        <line x1="428" y1="535" x2="638" y2="535" />
        <line x1="428" y1="555" x2="638" y2="555" />
        <line x1="428" y1="575" x2="638" y2="575" />
        <line x1="428" y1="595" x2="638" y2="595" />
        <line x1="428" y1="395" x2="428" y2="800" />
        <line x1="458" y1="395" x2="458" y2="800" />
        <line x1="488" y1="395" x2="488" y2="800" />
        <line x1="518" y1="395" x2="518" y2="800" />
        <line x1="548" y1="395" x2="548" y2="800" />
        <line x1="578" y1="395" x2="578" y2="800" />
        <line x1="608" y1="395" x2="608" y2="800" />
        <line x1="638" y1="395" x2="638" y2="800" />
      </g>
      <g stroke="#cc00ff" strokeWidth="0.5" opacity="0.09">
        <line x1="798" y1="400" x2="998" y2="400" />
        <line x1="798" y1="425" x2="998" y2="425" />
        <line x1="798" y1="450" x2="998" y2="450" />
        <line x1="798" y1="475" x2="998" y2="475" />
        <line x1="798" y1="500" x2="998" y2="500" />
        <line x1="798" y1="400" x2="798" y2="800" />
        <line x1="838" y1="400" x2="838" y2="800" />
        <line x1="878" y1="400" x2="878" y2="800" />
        <line x1="918" y1="400" x2="918" y2="800" />
        <line x1="958" y1="400" x2="958" y2="800" />
        <line x1="998" y1="400" x2="998" y2="800" />
      </g>

      {/* === LARGE NEON SIGNS / BILLBOARDS === */}
      {/* Sign 1: Magenta billboard — kanji-style bars */}
      <g filter="url(#neonGlowMagenta)">
        <rect
          x="290"
          y="308"
          width="88"
          height="32"
          rx="3"
          fill="#1a000e"
          stroke="#ff00cc"
          strokeWidth="2"
        />
        <rect
          x="295"
          y="313"
          width="78"
          height="22"
          rx="2"
          fill="#ff00cc"
          opacity="0.1"
        />
        {/* Kanji-like glyphs */}
        <rect
          x="300"
          y="317"
          width="14"
          height="3"
          rx="1"
          fill="#ff00cc"
          opacity="0.95"
        />
        <rect
          x="300"
          y="322"
          width="14"
          height="3"
          rx="1"
          fill="#ff00cc"
          opacity="0.95"
        />
        <rect
          x="306"
          y="315"
          width="2"
          height="13"
          rx="1"
          fill="#ff00cc"
          opacity="0.95"
        />
        <rect
          x="320"
          y="317"
          width="14"
          height="3"
          rx="1"
          fill="#ff00cc"
          opacity="0.9"
        />
        <rect
          x="327"
          y="315"
          width="2"
          height="13"
          rx="1"
          fill="#ff00cc"
          opacity="0.9"
        />
        <rect
          x="320"
          y="325"
          width="14"
          height="3"
          rx="1"
          fill="#ff00cc"
          opacity="0.85"
        />
        <rect
          x="340"
          y="317"
          width="10"
          height="3"
          rx="1"
          fill="#ff66dd"
          opacity="0.8"
        />
        <rect
          x="340"
          y="325"
          width="14"
          height="3"
          rx="1"
          fill="#ff66dd"
          opacity="0.75"
        />
        <rect
          x="344"
          y="315"
          width="2"
          height="13"
          rx="1"
          fill="#ff66dd"
          opacity="0.8"
        />
      </g>

      {/* Sign 2: Cyan billboard — latin text bars */}
      <g filter="url(#neonGlowCyan)">
        <rect
          x="492"
          y="298"
          width="110"
          height="34"
          rx="3"
          fill="#00101a"
          stroke="#00ffff"
          strokeWidth="2"
        />
        <rect
          x="497"
          y="303"
          width="100"
          height="24"
          rx="2"
          fill="#00ffff"
          opacity="0.08"
        />
        <rect
          x="502"
          y="308"
          width="60"
          height="4"
          rx="1"
          fill="#00ffff"
          opacity="0.95"
        />
        <rect
          x="502"
          y="317"
          width="44"
          height="4"
          rx="1"
          fill="#00ffff"
          opacity="0.9"
        />
        <rect
          x="502"
          y="325"
          width="52"
          height="3"
          rx="1"
          fill="#66ffff"
          opacity="0.7"
        />
        {/* Decorative bar */}
        <rect
          x="568"
          y="305"
          width="28"
          height="14"
          rx="2"
          fill="#00ffff"
          opacity="0.15"
          stroke="#00ffff"
          strokeWidth="1"
        />
      </g>

      {/* Sign 3: Orange billboard */}
      <g filter="url(#neonGlowOrange)">
        <rect
          x="800"
          y="302"
          width="95"
          height="30"
          rx="3"
          fill="#1a0800"
          stroke="#ff6600"
          strokeWidth="2"
        />
        <rect
          x="805"
          y="307"
          width="85"
          height="20"
          rx="2"
          fill="#ff6600"
          opacity="0.1"
        />
        <rect
          x="810"
          y="311"
          width="50"
          height="4"
          rx="1"
          fill="#ff6600"
          opacity="0.95"
        />
        <rect
          x="810"
          y="319"
          width="34"
          height="3"
          rx="1"
          fill="#ff9944"
          opacity="0.8"
        />
        {/* Kanji block */}
        <rect
          x="866"
          y="309"
          width="8"
          height="3"
          rx="1"
          fill="#ff6600"
          opacity="0.9"
        />
        <rect
          x="866"
          y="314"
          width="8"
          height="3"
          rx="1"
          fill="#ff6600"
          opacity="0.9"
        />
        <rect
          x="869"
          y="307"
          width="2"
          height="14"
          rx="1"
          fill="#ff6600"
          opacity="0.9"
        />
        <rect
          x="876"
          y="309"
          width="8"
          height="3"
          rx="1"
          fill="#ff9944"
          opacity="0.85"
        />
        <rect
          x="876"
          y="316"
          width="8"
          height="3"
          rx="1"
          fill="#ff9944"
          opacity="0.85"
        />
      </g>

      {/* Sign 4: Purple billboard */}
      <g filter="url(#neonGlowSoft)">
        <rect
          x="1006"
          y="300"
          width="96"
          height="28"
          rx="3"
          fill="#0e0018"
          stroke="#cc00ff"
          strokeWidth="2"
        />
        <rect
          x="1011"
          y="305"
          width="86"
          height="18"
          rx="2"
          fill="#cc00ff"
          opacity="0.1"
        />
        <rect
          x="1016"
          y="309"
          width="56"
          height="4"
          rx="1"
          fill="#cc00ff"
          opacity="0.95"
        />
        <rect
          x="1016"
          y="317"
          width="40"
          height="3"
          rx="1"
          fill="#dd66ff"
          opacity="0.75"
        />
        <rect
          x="1072"
          y="307"
          width="8"
          height="3"
          fill="#cc00ff"
          opacity="0.9"
        />
        <rect
          x="1072"
          y="313"
          width="8"
          height="3"
          fill="#cc00ff"
          opacity="0.9"
        />
        <rect
          x="1075"
          y="305"
          width="2"
          height="14"
          fill="#cc00ff"
          opacity="0.9"
        />
        <rect
          x="1082"
          y="307"
          width="8"
          height="3"
          fill="#dd66ff"
          opacity="0.8"
        />
        <rect
          x="1082"
          y="315"
          width="8"
          height="3"
          fill="#dd66ff"
          opacity="0.8"
        />
      </g>

      {/* === FLYING VEHICLES === */}
      <g filter="url(#neonGlowCyan)">
        <ellipse
          cx="175"
          cy="148"
          rx="16"
          ry="5"
          fill="#0a0a22"
          stroke="#00ffff"
          strokeWidth="1.5"
        />
        <ellipse
          cx="175"
          cy="148"
          rx="6"
          ry="2.5"
          fill="#00ffff"
          opacity="0.8"
        />
        <ellipse
          cx="738"
          cy="118"
          rx="20"
          ry="6"
          fill="#0e0018"
          stroke="#cc00ff"
          strokeWidth="1.5"
        />
        <ellipse cx="738" cy="118" rx="7" ry="3" fill="#cc00ff" opacity="0.8" />
        <ellipse
          cx="1010"
          cy="155"
          rx="13"
          ry="4"
          fill="#00101a"
          stroke="#00ffff"
          strokeWidth="1.5"
        />
        <ellipse
          cx="1010"
          cy="155"
          rx="5"
          ry="2"
          fill="#00ffff"
          opacity="0.7"
        />
        <ellipse
          cx="400"
          cy="200"
          rx="11"
          ry="3.5"
          fill="#1a0808"
          stroke="#ff6600"
          strokeWidth="1"
        />
        <ellipse
          cx="400"
          cy="200"
          rx="4"
          ry="1.5"
          fill="#ff6600"
          opacity="0.7"
        />
        {/* Distant lights */}
        <circle cx="320" cy="128" r="1.8" fill="#ff00cc" opacity="0.85" />
        <circle cx="580" cy="92" r="1.5" fill="#00ffff" opacity="0.7" />
        <circle cx="860" cy="138" r="1.8" fill="#ffcc00" opacity="0.65" />
        <circle cx="950" cy="105" r="1.5" fill="#cc00ff" opacity="0.8" />
      </g>

      {/* === ANIMATED RAIN (CSS keyframe, NO .map()) === */}
      {/* Background rain layer — 30 thin fast diagonal lines, low opacity */}
      <g stroke="#99ccee" strokeWidth="0.7" opacity="0.17">
        {/* Each line gets class + animationDuration + animationDelay via inline style */}
        <line
          x1="32"
          y1="0"
          x2="22"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.65s", animationDelay: "0.00s" }}
        />
        <line
          x1="72"
          y1="0"
          x2="62"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.72s", animationDelay: "0.08s" }}
        />
        <line
          x1="112"
          y1="0"
          x2="102"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.60s", animationDelay: "0.22s" }}
        />
        <line
          x1="155"
          y1="0"
          x2="145"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.78s", animationDelay: "0.35s" }}
        />
        <line
          x1="198"
          y1="0"
          x2="188"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.67s", animationDelay: "0.12s" }}
        />
        <line
          x1="242"
          y1="0"
          x2="232"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.70s", animationDelay: "0.48s" }}
        />
        <line
          x1="285"
          y1="0"
          x2="275"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.63s", animationDelay: "0.05s" }}
        />
        <line
          x1="328"
          y1="0"
          x2="318"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.75s", animationDelay: "0.30s" }}
        />
        <line
          x1="372"
          y1="0"
          x2="362"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.68s", animationDelay: "0.18s" }}
        />
        <line
          x1="415"
          y1="0"
          x2="405"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.62s", animationDelay: "0.55s" }}
        />
        <line
          x1="458"
          y1="0"
          x2="448"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.74s", animationDelay: "0.25s" }}
        />
        <line
          x1="502"
          y1="0"
          x2="492"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.66s", animationDelay: "0.42s" }}
        />
        <line
          x1="545"
          y1="0"
          x2="535"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.71s", animationDelay: "0.10s" }}
        />
        <line
          x1="588"
          y1="0"
          x2="578"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.64s", animationDelay: "0.38s" }}
        />
        <line
          x1="632"
          y1="0"
          x2="622"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.77s", animationDelay: "0.20s" }}
        />
        <line
          x1="675"
          y1="0"
          x2="665"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.61s", animationDelay: "0.50s" }}
        />
        <line
          x1="718"
          y1="0"
          x2="708"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.73s", animationDelay: "0.03s" }}
        />
        <line
          x1="762"
          y1="0"
          x2="752"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.69s", animationDelay: "0.28s" }}
        />
        <line
          x1="805"
          y1="0"
          x2="795"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.76s", animationDelay: "0.44s" }}
        />
        <line
          x1="848"
          y1="0"
          x2="838"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.63s", animationDelay: "0.15s" }}
        />
        <line
          x1="892"
          y1="0"
          x2="882"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.70s", animationDelay: "0.58s" }}
        />
        <line
          x1="935"
          y1="0"
          x2="925"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.67s", animationDelay: "0.32s" }}
        />
        <line
          x1="978"
          y1="0"
          x2="968"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.74s", animationDelay: "0.07s" }}
        />
        <line
          x1="1022"
          y1="0"
          x2="1012"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.62s", animationDelay: "0.46s" }}
        />
        <line
          x1="1065"
          y1="0"
          x2="1055"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.79s", animationDelay: "0.22s" }}
        />
        <line
          x1="1108"
          y1="0"
          x2="1098"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.66s", animationDelay: "0.52s" }}
        />
        <line
          x1="1152"
          y1="0"
          x2="1142"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.71s", animationDelay: "0.14s" }}
        />
        <line
          x1="1175"
          y1="0"
          x2="1165"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.65s", animationDelay: "0.40s" }}
        />
        <line
          x1="52"
          y1="0"
          x2="42"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.73s", animationDelay: "0.60s" }}
        />
        <line
          x1="92"
          y1="0"
          x2="82"
          y2="80"
          className="cp-rain-bg"
          style={{ animationDuration: "0.68s", animationDelay: "0.36s" }}
        />
      </g>

      {/* Foreground rain layer — 20 thicker slower lines, higher opacity */}
      <g stroke="#bbddff" strokeWidth="1.4" opacity="0.28">
        <line
          x1="45"
          y1="0"
          x2="30"
          y2="100"
          className="cp-rain-fg"
          style={{ animationDuration: "0.95s", animationDelay: "0.00s" }}
        />
        <line
          x1="105"
          y1="0"
          x2="90"
          y2="100"
          className="cp-rain-fg"
          style={{ animationDuration: "1.10s", animationDelay: "0.14s" }}
        />
        <line
          x1="178"
          y1="0"
          x2="163"
          y2="100"
          className="cp-rain-fg"
          style={{ animationDuration: "0.88s", animationDelay: "0.32s" }}
        />
        <line
          x1="255"
          y1="0"
          x2="240"
          y2="100"
          className="cp-rain-fg"
          style={{ animationDuration: "1.05s", animationDelay: "0.06s" }}
        />
        <line
          x1="338"
          y1="0"
          x2="323"
          y2="100"
          className="cp-rain-fg"
          style={{ animationDuration: "0.92s", animationDelay: "0.50s" }}
        />
        <line
          x1="415"
          y1="0"
          x2="400"
          y2="100"
          className="cp-rain-fg"
          style={{ animationDuration: "1.12s", animationDelay: "0.22s" }}
        />
        <line
          x1="495"
          y1="0"
          x2="480"
          y2="100"
          className="cp-rain-fg"
          style={{ animationDuration: "0.85s", animationDelay: "0.44s" }}
        />
        <line
          x1="575"
          y1="0"
          x2="560"
          y2="100"
          className="cp-rain-fg"
          style={{ animationDuration: "1.00s", animationDelay: "0.10s" }}
        />
        <line
          x1="655"
          y1="0"
          x2="640"
          y2="100"
          className="cp-rain-fg"
          style={{ animationDuration: "0.90s", animationDelay: "0.36s" }}
        />
        <line
          x1="732"
          y1="0"
          x2="717"
          y2="100"
          className="cp-rain-fg"
          style={{ animationDuration: "1.08s", animationDelay: "0.60s" }}
        />
        <line
          x1="812"
          y1="0"
          x2="797"
          y2="100"
          className="cp-rain-fg"
          style={{ animationDuration: "0.87s", animationDelay: "0.18s" }}
        />
        <line
          x1="888"
          y1="0"
          x2="873"
          y2="100"
          className="cp-rain-fg"
          style={{ animationDuration: "1.03s", animationDelay: "0.42s" }}
        />
        <line
          x1="968"
          y1="0"
          x2="953"
          y2="100"
          className="cp-rain-fg"
          style={{ animationDuration: "0.94s", animationDelay: "0.26s" }}
        />
        <line
          x1="1045"
          y1="0"
          x2="1030"
          y2="100"
          className="cp-rain-fg"
          style={{ animationDuration: "1.15s", animationDelay: "0.54s" }}
        />
        <line
          x1="1125"
          y1="0"
          x2="1110"
          y2="100"
          className="cp-rain-fg"
          style={{ animationDuration: "0.89s", animationDelay: "0.08s" }}
        />
        <line
          x1="1185"
          y1="0"
          x2="1170"
          y2="100"
          className="cp-rain-fg"
          style={{ animationDuration: "1.00s", animationDelay: "0.38s" }}
        />
        <line
          x1="68"
          y1="0"
          x2="53"
          y2="100"
          className="cp-rain-fg"
          style={{ animationDuration: "0.96s", animationDelay: "0.70s" }}
        />
        <line
          x1="218"
          y1="0"
          x2="203"
          y2="100"
          className="cp-rain-fg"
          style={{ animationDuration: "1.02s", animationDelay: "0.58s" }}
        />
        <line
          x1="625"
          y1="0"
          x2="610"
          y2="100"
          className="cp-rain-fg"
          style={{ animationDuration: "0.91s", animationDelay: "0.80s" }}
        />
        <line
          x1="908"
          y1="0"
          x2="893"
          y2="100"
          className="cp-rain-fg"
          style={{ animationDuration: "1.07s", animationDelay: "0.16s" }}
        />
      </g>

      {/* === STREET LIGHTS at bottom === */}
      <g filter="url(#neonGlowCyan)">
        <line
          x1="128"
          y1="600"
          x2="128"
          y2="762"
          stroke="#2a3344"
          strokeWidth="4"
        />
        <ellipse
          cx="128"
          cy="590"
          rx="38"
          ry="20"
          fill="url(#streetLightCyan)"
        />
        <circle cx="128" cy="598" r="5" fill="#00ffff" opacity="0.95" />
      </g>
      <g filter="url(#neonGlowMagenta)">
        <line
          x1="432"
          y1="580"
          x2="432"
          y2="762"
          stroke="#2a3344"
          strokeWidth="4"
        />
        <ellipse
          cx="432"
          cy="570"
          rx="38"
          ry="20"
          fill="url(#streetLightMagenta)"
        />
        <circle cx="432" cy="578" r="5" fill="#ff00cc" opacity="0.95" />
      </g>
      <g>
        <line
          x1="680"
          y1="590"
          x2="680"
          y2="762"
          stroke="#2a3344"
          strokeWidth="4"
        />
        <ellipse
          cx="680"
          cy="580"
          rx="38"
          ry="20"
          fill="url(#streetLightYellow)"
        />
        <circle cx="680" cy="588" r="5" fill="#ffcc00" opacity="0.9" />
      </g>
      <g filter="url(#neonGlowCyan)">
        <line
          x1="950"
          y1="595"
          x2="950"
          y2="762"
          stroke="#2a3344"
          strokeWidth="4"
        />
        <ellipse
          cx="950"
          cy="585"
          rx="38"
          ry="20"
          fill="url(#streetLightCyan)"
        />
        <circle cx="950" cy="593" r="5" fill="#00ffff" opacity="0.95" />
      </g>
      <g filter="url(#neonGlowMagenta)">
        <line
          x1="1162"
          y1="575"
          x2="1162"
          y2="762"
          stroke="#2a3344"
          strokeWidth="4"
        />
        <ellipse
          cx="1162"
          cy="565"
          rx="38"
          ry="20"
          fill="url(#streetLightMagenta)"
        />
        <circle cx="1162" cy="573" r="5" fill="#ff00cc" opacity="0.95" />
      </g>

      {/* === GROUND / WET STREET with neon reflections === */}
      <rect x="0" y="762" width="1200" height="38" fill="#07070f" />
      {/* Neon reflection puddles */}
      <g opacity="0.3">
        <rect x="108" y="762" width="42" height="38" fill="#00ffff" />
        <rect x="412" y="762" width="42" height="38" fill="#ff00cc" />
        <rect x="660" y="762" width="42" height="38" fill="#ffcc00" />
        <rect x="930" y="762" width="42" height="38" fill="#00ffff" />
        <rect x="1142" y="762" width="42" height="38" fill="#ff00cc" />
      </g>

      {/* === RAIN RIPPLES on ground — small ellipses fading in/out === */}
      <g fill="none" stroke="#99ccee" strokeWidth="0.8">
        <ellipse
          cx="80"
          cy="770"
          rx="4"
          ry="1.5"
          className="cp-ripple"
          style={{ animationDuration: "1.2s", animationDelay: "0.00s" }}
        />
        <ellipse
          cx="150"
          cy="774"
          rx="3"
          ry="1.2"
          className="cp-ripple"
          style={{ animationDuration: "1.5s", animationDelay: "0.25s" }}
        />
        <ellipse
          cx="230"
          cy="768"
          rx="5"
          ry="2"
          className="cp-ripple"
          style={{ animationDuration: "1.1s", animationDelay: "0.55s" }}
        />
        <ellipse
          cx="310"
          cy="772"
          rx="4"
          ry="1.5"
          className="cp-ripple"
          style={{ animationDuration: "1.4s", animationDelay: "0.10s" }}
        />
        <ellipse
          cx="390"
          cy="770"
          rx="3"
          ry="1.2"
          className="cp-ripple"
          style={{ animationDuration: "1.3s", animationDelay: "0.40s" }}
        />
        <ellipse
          cx="475"
          cy="775"
          rx="5"
          ry="2"
          className="cp-ripple"
          style={{ animationDuration: "1.0s", animationDelay: "0.70s" }}
        />
        <ellipse
          cx="555"
          cy="768"
          rx="4"
          ry="1.5"
          className="cp-ripple"
          style={{ animationDuration: "1.6s", animationDelay: "0.20s" }}
        />
        <ellipse
          cx="640"
          cy="772"
          rx="3"
          ry="1.2"
          className="cp-ripple"
          style={{ animationDuration: "1.2s", animationDelay: "0.80s" }}
        />
        <ellipse
          cx="720"
          cy="770"
          rx="5"
          ry="2"
          className="cp-ripple"
          style={{ animationDuration: "1.4s", animationDelay: "0.35s" }}
        />
        <ellipse
          cx="800"
          cy="774"
          rx="4"
          ry="1.5"
          className="cp-ripple"
          style={{ animationDuration: "1.1s", animationDelay: "0.60s" }}
        />
        <ellipse
          cx="880"
          cy="768"
          rx="3"
          ry="1.2"
          className="cp-ripple"
          style={{ animationDuration: "1.5s", animationDelay: "0.15s" }}
        />
        <ellipse
          cx="960"
          cy="772"
          rx="5"
          ry="2"
          className="cp-ripple"
          style={{ animationDuration: "1.3s", animationDelay: "0.50s" }}
        />
        <ellipse
          cx="1040"
          cy="770"
          rx="4"
          ry="1.5"
          className="cp-ripple"
          style={{ animationDuration: "1.0s", animationDelay: "0.90s" }}
        />
        <ellipse
          cx="1120"
          cy="774"
          rx="3"
          ry="1.2"
          className="cp-ripple"
          style={{ animationDuration: "1.6s", animationDelay: "0.30s" }}
        />
        <ellipse
          cx="1185"
          cy="768"
          rx="5"
          ry="2"
          className="cp-ripple"
          style={{ animationDuration: "1.2s", animationDelay: "0.65s" }}
        />
      </g>
    </svg>
  );

  const renderCaffeineAIWorld = () => (
    <svg
      role="img"
      aria-label="CaffeineAI world background"
      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Matrix rain falling animations only */}
        <style>{`
          @keyframes aiRainFall0 {
            0%   { transform: translateY(-900px); opacity: 0; }
            3%   { opacity: 0.9; }
            92%  { opacity: 0.85; }
            100% { transform: translateY(900px); opacity: 0; }
          }
          @keyframes aiRainFall1 {
            0%   { transform: translateY(-900px); opacity: 0; }
            5%   { opacity: 0.7; }
            90%  { opacity: 0.65; }
            100% { transform: translateY(900px); opacity: 0; }
          }
          @keyframes aiRainFall2 {
            0%   { transform: translateY(-900px); opacity: 0; }
            4%   { opacity: 0.5; }
            88%  { opacity: 0.45; }
            100% { transform: translateY(900px); opacity: 0; }
          }
          .ai-rain-0 { animation: aiRainFall0 linear infinite; }
          .ai-rain-1 { animation: aiRainFall1 linear infinite; }
          .ai-rain-2 { animation: aiRainFall2 linear infinite; }
        `}</style>
      </defs>

      {/* Pure black background */}
      <rect width="1200" height="800" fill="#000000" />

      {/* === MATRIX RAIN COLUMNS — bright leading char, fading trail === */}
      {/* Column brightness layers: 0=bright, 1=medium, 2=dim */}

      {/* Bright layer — fast falling, high opacity */}
      <g
        fill="#CCFF00"
        fontSize="13"
        fontFamily="monospace"
        fontWeight="bold"
        className="ai-rain-0"
      >
        <text
          x="22"
          y="0"
          style={{ animationDuration: "2.1s", animationDelay: "0.0s" }}
        >
          AI
        </text>
        <text
          x="62"
          y="0"
          style={{ animationDuration: "1.8s", animationDelay: "0.3s" }}
        >
          PROMPT
        </text>
        <text
          x="120"
          y="0"
          style={{ animationDuration: "2.4s", animationDelay: "0.7s" }}
        >
          LLM
        </text>
        <text
          x="165"
          y="0"
          style={{ animationDuration: "1.9s", animationDelay: "0.1s" }}
        >
          CAFFEINE
        </text>
        <text
          x="248"
          y="0"
          style={{ animationDuration: "2.2s", animationDelay: "0.5s" }}
        >
          NEURAL
        </text>
        <text
          x="312"
          y="0"
          style={{ animationDuration: "1.7s", animationDelay: "0.9s" }}
        >
          .AI
        </text>
        <text
          x="345"
          y="0"
          style={{ animationDuration: "2.0s", animationDelay: "0.2s" }}
        >
          TOKEN
        </text>
        <text
          x="400"
          y="0"
          style={{ animationDuration: "2.3s", animationDelay: "0.6s" }}
        >
          BUILD
        </text>
        <text
          x="448"
          y="0"
          style={{ animationDuration: "1.8s", animationDelay: "1.1s" }}
        >
          DEPLOY
        </text>
        <text
          x="508"
          y="0"
          style={{ animationDuration: "2.1s", animationDelay: "0.4s" }}
        >
          AGENT
        </text>
        <text
          x="560"
          y="0"
          style={{ animationDuration: "1.9s", animationDelay: "0.8s" }}
        >
          MODEL
        </text>
        <text
          x="616"
          y="0"
          style={{ animationDuration: "2.4s", animationDelay: "0.0s" }}
        >
          INFER
        </text>
        <text
          x="668"
          y="0"
          style={{ animationDuration: "1.7s", animationDelay: "1.3s" }}
        >
          WEB3
        </text>
        <text
          x="710"
          y="0"
          style={{ animationDuration: "2.2s", animationDelay: "0.2s" }}
        >
          CODE
        </text>
        <text
          x="754"
          y="0"
          style={{ animationDuration: "1.8s", animationDelay: "0.7s" }}
        >
          CHAIN
        </text>
        <text
          x="808"
          y="0"
          style={{ animationDuration: "2.0s", animationDelay: "0.4s" }}
        >
          NODE
        </text>
        <text
          x="850"
          y="0"
          style={{ animationDuration: "2.3s", animationDelay: "1.0s" }}
        >
          LEARN
        </text>
        <text
          x="905"
          y="0"
          style={{ animationDuration: "1.7s", animationDelay: "0.5s" }}
        >
          DATA
        </text>
        <text
          x="945"
          y="0"
          style={{ animationDuration: "2.1s", animationDelay: "0.9s" }}
        >
          COMPUTE
        </text>
        <text
          x="1015"
          y="0"
          style={{ animationDuration: "1.9s", animationDelay: "0.3s" }}
        >
          INTERNET
        </text>
        <text
          x="1090"
          y="0"
          style={{ animationDuration: "2.2s", animationDelay: "1.2s" }}
        >
          AI
        </text>
        <text
          x="1120"
          y="0"
          style={{ animationDuration: "1.8s", animationDelay: "0.6s" }}
        >
          PROMPT
        </text>
        <text
          x="1175"
          y="0"
          style={{ animationDuration: "2.0s", animationDelay: "0.1s" }}
        >
          LLM
        </text>
      </g>

      {/* Medium layer — medium speed, staggered offsets */}
      <g
        fill="#AADD00"
        fontSize="12"
        fontFamily="monospace"
        opacity="0.75"
        className="ai-rain-1"
      >
        <text
          x="40"
          y="0"
          style={{ animationDuration: "2.8s", animationDelay: "0.4s" }}
        >
          SELF
        </text>
        <text
          x="82"
          y="0"
          style={{ animationDuration: "3.1s", animationDelay: "1.2s" }}
        >
          WRITING
        </text>
        <text
          x="148"
          y="0"
          style={{ animationDuration: "2.6s", animationDelay: "0.0s" }}
        >
          INTERNET
        </text>
        <text
          x="230"
          y="0"
          style={{ animationDuration: "3.2s", animationDelay: "0.8s" }}
        >
          CAFFEINE
        </text>
        <text
          x="313"
          y="0"
          style={{ animationDuration: "2.7s", animationDelay: "1.5s" }}
        >
          AGENT
        </text>
        <text
          x="368"
          y="0"
          style={{ animationDuration: "3.0s", animationDelay: "0.3s" }}
        >
          TOKEN
        </text>
        <text
          x="420"
          y="0"
          style={{ animationDuration: "2.8s", animationDelay: "1.0s" }}
        >
          MODEL
        </text>
        <text
          x="470"
          y="0"
          style={{ animationDuration: "3.3s", animationDelay: "0.6s" }}
        >
          INFER
        </text>
        <text
          x="524"
          y="0"
          style={{ animationDuration: "2.5s", animationDelay: "1.8s" }}
        >
          NEURAL
        </text>
        <text
          x="585"
          y="0"
          style={{ animationDuration: "3.1s", animationDelay: "0.2s" }}
        >
          LLM
        </text>
        <text
          x="620"
          y="0"
          style={{ animationDuration: "2.7s", animationDelay: "1.4s" }}
        >
          .AI
        </text>
        <text
          x="656"
          y="0"
          style={{ animationDuration: "2.9s", animationDelay: "0.9s" }}
        >
          DEPLOY
        </text>
        <text
          x="715"
          y="0"
          style={{ animationDuration: "3.2s", animationDelay: "0.5s" }}
        >
          BUILD
        </text>
        <text
          x="762"
          y="0"
          style={{ animationDuration: "2.6s", animationDelay: "1.6s" }}
        >
          CODE
        </text>
        <text
          x="800"
          y="0"
          style={{ animationDuration: "3.0s", animationDelay: "0.1s" }}
        >
          DATA
        </text>
        <text
          x="838"
          y="0"
          style={{ animationDuration: "2.8s", animationDelay: "1.3s" }}
        >
          CHAIN
        </text>
        <text
          x="882"
          y="0"
          style={{ animationDuration: "3.3s", animationDelay: "0.7s" }}
        >
          WEB3
        </text>
        <text
          x="924"
          y="0"
          style={{ animationDuration: "2.5s", animationDelay: "1.1s" }}
        >
          NODE
        </text>
        <text
          x="963"
          y="0"
          style={{ animationDuration: "3.1s", animationDelay: "0.4s" }}
        >
          LEARN
        </text>
        <text
          x="1010"
          y="0"
          style={{ animationDuration: "2.7s", animationDelay: "1.7s" }}
        >
          COMPUTE
        </text>
        <text
          x="1080"
          y="0"
          style={{ animationDuration: "2.9s", animationDelay: "0.0s" }}
        >
          AI
        </text>
        <text
          x="1110"
          y="0"
          style={{ animationDuration: "3.2s", animationDelay: "0.8s" }}
        >
          PROMPT
        </text>
        <text
          x="1162"
          y="0"
          style={{ animationDuration: "2.6s", animationDelay: "1.5s" }}
        >
          LLM
        </text>
      </g>

      {/* Dim layer — slowest, adds depth and density */}
      <g
        fill="#88BB00"
        fontSize="11"
        fontFamily="monospace"
        opacity="0.45"
        className="ai-rain-2"
      >
        <text
          x="10"
          y="0"
          style={{ animationDuration: "4.0s", animationDelay: "0.6s" }}
        >
          PROMPT
        </text>
        <text
          x="58"
          y="0"
          style={{ animationDuration: "4.5s", animationDelay: "2.0s" }}
        >
          NEURAL
        </text>
        <text
          x="110"
          y="0"
          style={{ animationDuration: "3.8s", animationDelay: "0.3s" }}
        >
          CAFFEINE
        </text>
        <text
          x="190"
          y="0"
          style={{ animationDuration: "4.2s", animationDelay: "1.5s" }}
        >
          AI
        </text>
        <text
          x="220"
          y="0"
          style={{ animationDuration: "3.9s", animationDelay: "0.9s" }}
        >
          DEPLOY
        </text>
        <text
          x="272"
          y="0"
          style={{ animationDuration: "4.4s", animationDelay: "2.4s" }}
        >
          TOKEN
        </text>
        <text
          x="325"
          y="0"
          style={{ animationDuration: "3.7s", animationDelay: "0.0s" }}
        >
          AGENT
        </text>
        <text
          x="378"
          y="0"
          style={{ animationDuration: "4.1s", animationDelay: "1.8s" }}
        >
          LLM
        </text>
        <text
          x="412"
          y="0"
          style={{ animationDuration: "4.3s", animationDelay: "0.7s" }}
        >
          INFER
        </text>
        <text
          x="464"
          y="0"
          style={{ animationDuration: "3.8s", animationDelay: "2.2s" }}
        >
          WEB3
        </text>
        <text
          x="508"
          y="0"
          style={{ animationDuration: "4.0s", animationDelay: "1.2s" }}
        >
          MODEL
        </text>
        <text
          x="553"
          y="0"
          style={{ animationDuration: "4.5s", animationDelay: "0.4s" }}
        >
          CODE
        </text>
        <text
          x="592"
          y="0"
          style={{ animationDuration: "3.7s", animationDelay: "1.9s" }}
        >
          NODE
        </text>
        <text
          x="631"
          y="0"
          style={{ animationDuration: "4.2s", animationDelay: "0.1s" }}
        >
          CHAIN
        </text>
        <text
          x="680"
          y="0"
          style={{ animationDuration: "3.9s", animationDelay: "2.6s" }}
        >
          DATA
        </text>
        <text
          x="718"
          y="0"
          style={{ animationDuration: "4.4s", animationDelay: "0.8s" }}
        >
          LEARN
        </text>
        <text
          x="764"
          y="0"
          style={{ animationDuration: "4.1s", animationDelay: "1.6s" }}
        >
          BUILD
        </text>
        <text
          x="808"
          y="0"
          style={{ animationDuration: "3.8s", animationDelay: "0.5s" }}
        >
          .AI
        </text>
        <text
          x="842"
          y="0"
          style={{ animationDuration: "4.3s", animationDelay: "2.1s" }}
        >
          COMPUTE
        </text>
        <text
          x="912"
          y="0"
          style={{ animationDuration: "3.7s", animationDelay: "0.2s" }}
        >
          INTERNET
        </text>
        <text
          x="990"
          y="0"
          style={{ animationDuration: "4.0s", animationDelay: "1.4s" }}
        >
          AI
        </text>
        <text
          x="1018"
          y="0"
          style={{ animationDuration: "4.5s", animationDelay: "0.7s" }}
        >
          PROMPT
        </text>
        <text
          x="1075"
          y="0"
          style={{ animationDuration: "3.9s", animationDelay: "2.3s" }}
        >
          NEURAL
        </text>
        <text
          x="1128"
          y="0"
          style={{ animationDuration: "4.2s", animationDelay: "0.0s" }}
        >
          LLM
        </text>
        <text
          x="1165"
          y="0"
          style={{ animationDuration: "4.4s", animationDelay: "1.1s" }}
        >
          CAFFEINE
        </text>
      </g>

      {/* === SUBTLE SCANLINES for retro tech feel === */}

      {/* === CIRCUIT / PARTICLE EFFECTS === */}
      {/* Horizontal circuit lines — static, no animation */}
      <g stroke="#CCFF00" strokeWidth="0.5" opacity="0.18">
        <line x1="0" y1="120" x2="380" y2="120" />
        <line x1="380" y1="120" x2="380" y2="160" />
        <line x1="380" y1="160" x2="280" y2="160" />
        <line x1="820" y1="120" x2="1200" y2="120" />
        <line x1="820" y1="120" x2="820" y2="155" />
        <line x1="820" y1="155" x2="930" y2="155" />
        <line x1="0" y1="660" x2="320" y2="660" />
        <line x1="320" y1="660" x2="320" y2="620" />
        <line x1="320" y1="620" x2="440" y2="620" />
        <line x1="880" y1="660" x2="1200" y2="660" />
        <line x1="880" y1="660" x2="880" y2="625" />
        <line x1="880" y1="625" x2="760" y2="625" />
      </g>
      {/* Circuit nodes — static, no filter */}
      <g fill="#CCFF00" opacity="0.35">
        <circle cx="380" cy="120" r="3" />
        <circle cx="280" cy="160" r="2.5" />
        <circle cx="820" cy="120" r="3" />
        <circle cx="930" cy="155" r="2.5" />
        <circle cx="320" cy="660" r="3" />
        <circle cx="440" cy="620" r="2.5" />
        <circle cx="880" cy="660" r="3" />
        <circle cx="760" cy="625" r="2.5" />
      </g>

      {/* === 'caffeine.ai' LOGO — single plain white text, no glow, no filter === */}
      <text
        x="600"
        y="390"
        textAnchor="middle"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontWeight="900"
        fontSize="82"
        fill="#FFFFFF"
      >
        caffeine.ai
      </text>

      {/* === SUBTITLE — plain, no glow === */}
      <text
        x="600"
        y="440"
        textAnchor="middle"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontWeight="700"
        fontSize="18"
        letterSpacing="6"
        fill="#CCFF00"
        opacity="0.85"
      >
        SELF-WRITING INTERNET
      </text>

      {/* === DECORATIVE BRACKET LINES around logo — static === */}
      <g stroke="#CCFF00" strokeWidth="1.5" opacity="0.4" fill="none">
        {/* Top-left bracket */}
        <path d="M 340,330 L 340,310 L 380,310" />
        {/* Top-right bracket */}
        <path d="M 860,330 L 860,310 L 820,310" />
        {/* Bottom-left bracket */}
        <path d="M 340,455 L 340,475 L 380,475" />
        {/* Bottom-right bracket */}
        <path d="M 860,455 L 860,475 L 820,475" />
      </g>
      {/* Bracket corner dots */}
      <g fill="#CCFF00" opacity="0.6">
        <circle cx="340" cy="310" r="2.5" />
        <circle cx="860" cy="310" r="2.5" />
        <circle cx="340" cy="475" r="2.5" />
        <circle cx="860" cy="475" r="2.5" />
      </g>
    </svg>
  );

  const renderZombietownWorld = () => (
    <svg
      role="img"
      aria-label="ZombieTown world background"
      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Dark eerie sky */}
        <linearGradient id="zombieSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#030506" />
          <stop offset="35%" stopColor="#080d08" />
          <stop offset="70%" stopColor="#0d1509" />
          <stop offset="100%" stopColor="#0a1007" />
        </linearGradient>
        {/* Ground gradient — dark soil */}
        <linearGradient id="zombieGroundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0e1209" />
          <stop offset="50%" stopColor="#080d05" />
          <stop offset="100%" stopColor="#040704" />
        </linearGradient>
        {/* Building fire glow gradients */}
        <radialGradient id="fireGlow1" cx="50%" cy="80%" r="50%">
          <stop offset="0%" stopColor="#8b2a00" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#5a1400" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3a0800" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fireGlow2" cx="50%" cy="80%" r="50%">
          <stop offset="0%" stopColor="#6b1800" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#420f00" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#280600" stopOpacity="0" />
        </radialGradient>
        {/* Fog layer gradients */}
        <linearGradient id="fogGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e3320" stopOpacity="0" />
          <stop offset="20%" stopColor="#1e3320" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#253d27" stopOpacity="0.7" />
          <stop offset="80%" stopColor="#1e3320" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#1e3320" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fogGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#182818" stopOpacity="0" />
          <stop offset="30%" stopColor="#182818" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#1e3020" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#182818" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fogGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#203320" stopOpacity="0.5" />
          <stop offset="40%" stopColor="#253d25" stopOpacity="0.65" />
          <stop offset="70%" stopColor="#1e3020" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#203320" stopOpacity="0.4" />
        </linearGradient>
        {/* Moon glow */}
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c8d88a" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#a8b870" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#7a9050" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="moonFace" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#d4e496" />
          <stop offset="100%" stopColor="#8aaa50" />
        </radialGradient>
        {/* Flickering torch glow */}
        <radialGradient id="torchGlow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b3a00" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#8b3a00" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="torchGlow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7a2800" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#7a2800" stopOpacity="0" />
        </radialGradient>
        {/* Blood splatter gradient */}
        <radialGradient id="bloodGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5a0000" />
          <stop offset="70%" stopColor="#3d0000" />
          <stop offset="100%" stopColor="#1e0000" stopOpacity="0.3" />
        </radialGradient>
        {/* Window fire orange glow */}
        <radialGradient id="winFire1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c04800" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#801800" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#400800" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="winFire2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a03000" stopOpacity="0.75" />
          <stop offset="60%" stopColor="#601000" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#300600" stopOpacity="0" />
        </radialGradient>
        {/* Fog animation */}
        <style>{`
          @keyframes fogDrift1 {
            0% { transform: translateX(-80px); }
            100% { transform: translateX(80px); }
          }
          @keyframes fogDrift2 {
            0% { transform: translateX(60px); }
            100% { transform: translateX(-100px); }
          }
          @keyframes fogDrift3 {
            0% { transform: translateX(-40px); }
            100% { transform: translateX(90px); }
          }
          @keyframes fogDrift4 {
            0% { transform: translateX(100px); }
            100% { transform: translateX(-60px); }
          }
          @keyframes torchFlicker {
            0%,100% { opacity: 0.7; transform: scaleY(1) scaleX(1); }
            20% { opacity: 0.5; transform: scaleY(0.9) scaleX(1.1); }
            40% { opacity: 0.85; transform: scaleY(1.1) scaleX(0.95); }
            60% { opacity: 0.6; transform: scaleY(0.95) scaleX(1.05); }
            80% { opacity: 0.8; transform: scaleY(1.05) scaleX(1); }
          }
          @keyframes torchFlicker2 {
            0%,100% { opacity: 0.65; transform: scaleY(1.05) scaleX(0.95); }
            25% { opacity: 0.85; transform: scaleY(0.92) scaleX(1.08); }
            50% { opacity: 0.55; transform: scaleY(1.08) scaleX(0.93); }
            75% { opacity: 0.75; transform: scaleY(0.97) scaleX(1.02); }
          }
        `}</style>
      </defs>

      {/* === SKY === */}
      <rect width="1200" height="800" fill="url(#zombieSkyGrad)" />

      {/* === MOON & GLOW === */}
      <ellipse
        cx="900"
        cy="100"
        rx="90"
        ry="90"
        fill="url(#moonGlow)"
        opacity="0.5"
      />
      <ellipse
        cx="900"
        cy="100"
        rx="48"
        ry="48"
        fill="url(#moonGlow)"
        opacity="0.4"
      />
      <circle cx="900" cy="100" r="34" fill="url(#moonFace)" />
      {/* Moon craters */}
      <circle cx="892" cy="90" r="5" fill="#7a9a48" opacity="0.6" />
      <circle cx="912" cy="108" r="3.5" fill="#7a9a48" opacity="0.5" />
      <circle cx="884" cy="110" r="4" fill="#7a9a48" opacity="0.5" />

      {/* === BATS (static V-shapes scattered in upper sky) === */}
      {/* Bat 1 */}
      <g transform="translate(180, 85)" fill="#080e06" opacity="0.8">
        <path d="M0,-4 Q-10,-12 -18,-8 Q-12,-4 -6,-2 Z" />
        <path d="M0,-4 Q10,-12 18,-8 Q12,-4 6,-2 Z" />
        <ellipse cx="0" cy="-3" rx="3" ry="4" />
      </g>
      {/* Bat 2 */}
      <g transform="translate(420, 55)" fill="#070d05" opacity="0.75">
        <path d="M0,-5 Q-12,-14 -22,-9 Q-14,-5 -7,-2 Z" />
        <path d="M0,-5 Q12,-14 22,-9 Q14,-5 7,-2 Z" />
        <ellipse cx="0" cy="-3" rx="3.5" ry="4.5" />
      </g>
      {/* Bat 3 */}
      <g transform="translate(650, 110)" fill="#080e06" opacity="0.7">
        <path d="M0,-3.5 Q-8,-10 -15,-7 Q-10,-3 -5,-1.5 Z" />
        <path d="M0,-3.5 Q8,-10 15,-7 Q10,-3 5,-1.5 Z" />
        <ellipse cx="0" cy="-2.5" rx="2.5" ry="3.5" />
      </g>
      {/* Bat 4 */}
      <g transform="translate(800, 68)" fill="#070c05" opacity="0.78">
        <path d="M0,-5 Q-11,-13 -20,-9 Q-13,-4 -6,-2 Z" />
        <path d="M0,-5 Q11,-13 20,-9 Q13,-4 6,-2 Z" />
        <ellipse cx="0" cy="-3" rx="3" ry="4" />
      </g>
      {/* Bat 5 */}
      <g transform="translate(1080, 92)" fill="#080d06" opacity="0.72">
        <path d="M0,-4 Q-9,-11 -17,-8 Q-11,-3.5 -5.5,-1.5 Z" />
        <path d="M0,-4 Q9,-11 17,-8 Q11,-3.5 5.5,-1.5 Z" />
        <ellipse cx="0" cy="-2.5" rx="2.5" ry="3.5" />
      </g>

      {/* === RUINED BUILDINGS — FAR BACKGROUND (darkest layer) === */}

      {/* --- RUIN A: Collapsed factory/warehouse (far left background) --- */}
      <g opacity="0.88">
        {/* Main wall — far, very dark */}
        <polygon
          points="30,480 30,290 130,290 130,320 145,310 160,320 160,480"
          fill="#0a0a0a"
        />
        {/* Collapsed right section — lower jagged edge */}
        <polygon
          points="130,290 130,350 160,330 175,360 190,340 195,380 210,480 130,480"
          fill="#0c0c0c"
        />
        {/* Broken top edge — jagged */}
        <polygon
          points="30,290 45,275 55,282 65,265 75,278 90,260 100,270 115,255 130,290"
          fill="#0a0a0a"
        />
        {/* Exposed interior floor lines */}
        <line
          x1="32"
          y1="360"
          x2="128"
          y2="360"
          stroke="#161210"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <line
          x1="32"
          y1="400"
          x2="128"
          y2="400"
          stroke="#161210"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <line
          x1="32"
          y1="440"
          x2="128"
          y2="440"
          stroke="#161210"
          strokeWidth="1"
          opacity="0.5"
        />
        {/* Windows — dark hollow */}
        <rect x="40" y="300" width="22" height="16" fill="#050505" />
        <rect x="75" y="300" width="22" height="16" fill="#050505" />
        <rect x="40" y="370" width="22" height="18" fill="#050505" />
        <rect x="75" y="370" width="22" height="18" fill="#050505" />
        {/* Window fire glow — one lit window */}
        <rect
          x="75"
          y="300"
          width="22"
          height="16"
          fill="url(#winFire2)"
          opacity="0.65"
        />
        {/* Wall cracks */}
        <polyline
          points="55,310 58,330 53,345 57,365"
          fill="none"
          stroke="#1a1414"
          strokeWidth="1.2"
          opacity="0.8"
        />
        <polyline
          points="100,340 103,355 99,370"
          fill="none"
          stroke="#1a1414"
          strokeWidth="1"
          opacity="0.7"
        />
        {/* Rubble pile base */}
        <polygon
          points="30,475 55,455 80,465 110,450 150,465 190,455 210,475 210,480 30,480"
          fill="#111111"
          opacity="0.9"
        />
        <ellipse cx="90" cy="475" rx="30" ry="8" fill="#0e0e0e" opacity="0.8" />
        <ellipse
          cx="160"
          cy="472"
          rx="20"
          ry="6"
          fill="#0d0d0d"
          opacity="0.7"
        />
      </g>

      {/* --- RUIN B: Tall partially-collapsed skyscraper (center-left background) --- */}
      <g opacity="0.9">
        {/* Main tower body */}
        <polygon
          points="390,480 390,160 430,160 430,200 450,185 455,200 460,480"
          fill="#0d0d0d"
        />
        {/* Collapsed upper section — missing chunk right side */}
        <polygon
          points="430,160 430,220 460,205 465,230 480,215 480,480 460,480"
          fill="#111111"
        />
        {/* Jagged broken top */}
        <polygon
          points="390,160 400,140 408,150 415,130 422,145 430,135 430,160"
          fill="#0d0d0d"
        />
        {/* Church-style broken spire remnant */}
        <polygon points="405,135 410,100 416,135" fill="#0e0e0e" />
        <line
          x1="410"
          y1="100"
          x2="406"
          y2="112"
          stroke="#141010"
          strokeWidth="1"
          opacity="0.6"
        />
        {/* Exposed floor lines */}
        <line
          x1="392"
          y1="220"
          x2="458"
          y2="220"
          stroke="#1c1818"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <line
          x1="392"
          y1="270"
          x2="458"
          y2="270"
          stroke="#1c1818"
          strokeWidth="1.5"
          opacity="0.55"
        />
        <line
          x1="392"
          y1="320"
          x2="458"
          y2="320"
          stroke="#1c1818"
          strokeWidth="1.2"
          opacity="0.5"
        />
        <line
          x1="392"
          y1="370"
          x2="458"
          y2="370"
          stroke="#1c1818"
          strokeWidth="1.2"
          opacity="0.45"
        />
        <line
          x1="392"
          y1="420"
          x2="458"
          y2="420"
          stroke="#1c1818"
          strokeWidth="1"
          opacity="0.4"
        />
        {/* Windows — some glowing */}
        <rect x="397" y="170" width="14" height="18" fill="#050505" />
        <rect x="420" y="170" width="14" height="18" fill="#050505" />
        <rect x="397" y="230" width="14" height="18" fill="#050505" />
        <rect x="420" y="230" width="14" height="18" fill="#050505" />
        <rect x="397" y="285" width="14" height="18" fill="#050505" />
        <rect x="420" y="285" width="14" height="18" fill="#050505" />
        <rect x="397" y="340" width="14" height="18" fill="#050505" />
        <rect x="420" y="340" width="14" height="18" fill="#050505" />
        {/* Fire-lit windows */}
        <rect
          x="397"
          y="230"
          width="14"
          height="18"
          fill="url(#winFire1)"
          opacity="0.8"
        />
        <rect
          x="420"
          y="285"
          width="14"
          height="18"
          fill="url(#winFire1)"
          opacity="0.7"
        />
        {/* Fire glow emanating from windows */}
        <ellipse
          cx="404"
          cy="239"
          rx="20"
          ry="14"
          fill="url(#fireGlow1)"
          opacity="0.5"
        />
        <ellipse
          cx="427"
          cy="294"
          rx="18"
          ry="12"
          fill="url(#fireGlow2)"
          opacity="0.45"
        />
        {/* Wall cracks */}
        <polyline
          points="410,195 408,215 412,235 409,250"
          fill="none"
          stroke="#201818"
          strokeWidth="1.3"
          opacity="0.8"
        />
        <polyline
          points="435,280 432,300 436,315"
          fill="none"
          stroke="#201818"
          strokeWidth="1.1"
          opacity="0.7"
        />
        <line
          x1="400"
          y1="370"
          x2="395"
          y2="420"
          stroke="#1a1414"
          strokeWidth="1"
          opacity="0.6"
        />
        {/* Rubble base */}
        <polygon
          points="385,475 405,458 430,468 455,455 475,462 480,475 480,480 385,480"
          fill="#111111"
          opacity="0.9"
        />
        <polygon
          points="395,472 415,463 435,470 455,461 470,470 470,475 395,475"
          fill="#0e0e0e"
          opacity="0.7"
        />
      </g>

      {/* --- RUIN C: Church ruin with broken spire (far right background) --- */}
      <g opacity="0.87">
        {/* Main nave body */}
        <polygon points="1000,480 1000,300 1100,300 1100,480" fill="#0b0b0b" />
        {/* Bell tower left */}
        <polygon points="1000,300 1000,200 1030,200 1030,300" fill="#0e0e0e" />
        {/* Broken spire — collapsed at angle */}
        <polygon points="1010,200 1015,155 1025,200" fill="#0c0c0c" />
        <polygon
          points="1018,165 1040,175 1030,182 1035,190 1015,185"
          fill="#0a0a0a"
        />
        {/* Right section — collapsed wall */}
        <polygon
          points="1100,300 1100,350 1130,330 1145,355 1160,335 1170,370 1175,480 1100,480"
          fill="#0d0d0d"
        />
        {/* Broken top of nave */}
        <polygon
          points="1000,300 1010,285 1020,294 1035,278 1048,288 1062,272 1075,283 1088,268 1100,300"
          fill="#0b0b0b"
        />
        {/* Arched windows */}
        <path
          d="M1015,320 L1015,355 Q1025,365 1035,355 L1035,320 Z"
          fill="#050505"
        />
        <path
          d="M1055,320 L1055,355 Q1065,365 1075,355 L1075,320 Z"
          fill="#050505"
        />
        {/* Church window fire glow */}
        <path
          d="M1015,320 L1015,355 Q1025,365 1035,355 L1035,320 Z"
          fill="url(#winFire1)"
          opacity="0.7"
        />
        {/* Bell tower window */}
        <rect x="1008" y="220" width="16" height="20" rx="2" fill="#050505" />
        <rect x="1008" y="255" width="16" height="15" rx="2" fill="#050505" />
        {/* Exposed floor lines */}
        <line
          x1="1002"
          y1="370"
          x2="1098"
          y2="370"
          stroke="#1a1818"
          strokeWidth="1.2"
          opacity="0.5"
        />
        <line
          x1="1002"
          y1="420"
          x2="1098"
          y2="420"
          stroke="#1a1818"
          strokeWidth="1"
          opacity="0.4"
        />
        {/* Cracks */}
        <polyline
          points="1045,310 1043,335 1047,350 1044,380"
          fill="none"
          stroke="#1c1414"
          strokeWidth="1.2"
          opacity="0.75"
        />
        <polyline
          points="1070,350 1073,370 1069,390"
          fill="none"
          stroke="#1c1414"
          strokeWidth="1"
          opacity="0.65"
        />
        {/* Rubble base */}
        <polygon
          points="995,475 1015,460 1040,468 1065,455 1090,463 1115,452 1140,462 1175,472 1175,480 995,480"
          fill="#111111"
          opacity="0.88"
        />
        <ellipse
          cx="1050"
          cy="475"
          rx="35"
          ry="8"
          fill="#0d0d0d"
          opacity="0.7"
        />
      </g>

      {/* --- RUIN D: Low collapsed warehouse (right midground) --- */}
      <g opacity="0.85">
        {/* Main structure */}
        <polygon
          points="700,480 700,340 760,340 760,320 800,320 800,340 850,340 850,480"
          fill="#0c0c0c"
        />
        {/* Collapsed roof section */}
        <polygon
          points="750,340 755,305 775,295 790,308 810,298 820,318 840,310 850,340"
          fill="#0e0e0e"
        />
        {/* Broken jagged top */}
        <polygon
          points="760,340 760,325 770,315 778,325 785,310 792,323 800,315 800,340"
          fill="#0d0d0d"
        />
        {/* Loading dock opening — dark hollow */}
        <rect x="740" y="400" width="40" height="70" fill="#050505" />
        <rect x="790" y="405" width="35" height="65" fill="#050505" />
        {/* Windows */}
        <rect x="710" y="355" width="18" height="14" fill="#050505" />
        <rect x="820" y="355" width="18" height="14" fill="#050505" />
        <rect
          x="820"
          y="355"
          width="18"
          height="14"
          fill="url(#winFire2)"
          opacity="0.6"
        />
        {/* Exposed floor */}
        <line
          x1="702"
          y1="390"
          x2="848"
          y2="390"
          stroke="#181614"
          strokeWidth="1.2"
          opacity="0.5"
        />
        <line
          x1="702"
          y1="440"
          x2="848"
          y2="440"
          stroke="#181614"
          strokeWidth="1"
          opacity="0.4"
        />
        {/* Wall crack */}
        <polyline
          points="775,340 778,360 774,385 777,410"
          fill="none"
          stroke="#1e1a14"
          strokeWidth="1.3"
          opacity="0.7"
        />
        {/* Rubble */}
        <polygon
          points="700,475 720,463 745,472 770,460 800,468 830,458 850,468 850,480 700,480"
          fill="#111111"
          opacity="0.85"
        />
      </g>

      {/* === BACKGROUND DEAD TREES (far, small, enhanced with extra branches) === */}
      <g>
        {/* tree bg-1 */}
        <line
          x1="80"
          y1="480"
          x2="80"
          y2="310"
          stroke="#131b10"
          strokeWidth="8"
        />
        <line
          x1="80"
          y1="370"
          x2="40"
          y2="320"
          stroke="#131b10"
          strokeWidth="4"
        />
        <line
          x1="80"
          y1="350"
          x2="118"
          y2="300"
          stroke="#131b10"
          strokeWidth="4"
        />
        <line
          x1="80"
          y1="330"
          x2="55"
          y2="290"
          stroke="#131b10"
          strokeWidth="3"
        />
        <line
          x1="55"
          y1="290"
          x2="42"
          y2="275"
          stroke="#131b10"
          strokeWidth="2"
        />
        <line
          x1="40"
          y1="320"
          x2="25"
          y2="305"
          stroke="#131b10"
          strokeWidth="2"
        />
        {/* tree bg-2 */}
        <line
          x1="220"
          y1="480"
          x2="218"
          y2="295"
          stroke="#0f1a0c"
          strokeWidth="7"
        />
        <line
          x1="218"
          y1="360"
          x2="185"
          y2="308"
          stroke="#0f1a0c"
          strokeWidth="3.5"
        />
        <line
          x1="218"
          y1="340"
          x2="252"
          y2="295"
          stroke="#0f1a0c"
          strokeWidth="3.5"
        />
        <line
          x1="185"
          y1="308"
          x2="172"
          y2="295"
          stroke="#0f1a0c"
          strokeWidth="2"
        />
        <line
          x1="252"
          y1="295"
          x2="264"
          y2="280"
          stroke="#0f1a0c"
          strokeWidth="2"
        />
        {/* tree bg-3 */}
        <line
          x1="490"
          y1="480"
          x2="492"
          y2="300"
          stroke="#111a0d"
          strokeWidth="7"
        />
        <line
          x1="492"
          y1="360"
          x2="455"
          y2="312"
          stroke="#111a0d"
          strokeWidth="3.5"
        />
        <line
          x1="492"
          y1="340"
          x2="528"
          y2="298"
          stroke="#111a0d"
          strokeWidth="3.5"
        />
        <line
          x1="492"
          y1="320"
          x2="510"
          y2="278"
          stroke="#111a0d"
          strokeWidth="2.5"
        />
        <line
          x1="455"
          y1="312"
          x2="440"
          y2="298"
          stroke="#111a0d"
          strokeWidth="2"
        />
        <line
          x1="510"
          y1="278"
          x2="522"
          y2="262"
          stroke="#111a0d"
          strokeWidth="1.8"
        />
        {/* tree bg-4 */}
        <line
          x1="730"
          y1="480"
          x2="728"
          y2="305"
          stroke="#101808"
          strokeWidth="7"
        />
        <line
          x1="728"
          y1="370"
          x2="695"
          y2="315"
          stroke="#101808"
          strokeWidth="3.5"
        />
        <line
          x1="728"
          y1="345"
          x2="762"
          y2="300"
          stroke="#101808"
          strokeWidth="3.5"
        />
        <line
          x1="695"
          y1="315"
          x2="682"
          y2="300"
          stroke="#101808"
          strokeWidth="2"
        />
        <line
          x1="762"
          y1="300"
          x2="775"
          y2="285"
          stroke="#101808"
          strokeWidth="2"
        />
        {/* tree bg-5 */}
        <line
          x1="1050"
          y1="480"
          x2="1048"
          y2="295"
          stroke="#131b0e"
          strokeWidth="7"
        />
        <line
          x1="1048"
          y1="355"
          x2="1015"
          y2="308"
          stroke="#131b0e"
          strokeWidth="3.5"
        />
        <line
          x1="1048"
          y1="335"
          x2="1082"
          y2="292"
          stroke="#131b0e"
          strokeWidth="3.5"
        />
        <line
          x1="1048"
          y1="318"
          x2="1030"
          y2="278"
          stroke="#131b0e"
          strokeWidth="2.5"
        />
        <line
          x1="1015"
          y1="308"
          x2="1002"
          y2="293"
          stroke="#131b0e"
          strokeWidth="2"
        />
        <line
          x1="1082"
          y1="292"
          x2="1094"
          y2="278"
          stroke="#131b0e"
          strokeWidth="2"
        />
      </g>

      {/* === GROUND === */}
      <rect
        x="0"
        y="480"
        width="1200"
        height="320"
        fill="url(#zombieGroundGrad)"
      />
      {/* Ground horizon edge — slightly lighter */}
      <path
        d="M0,480 Q200,472 400,478 Q600,484 800,475 Q1000,468 1200,476 L1200,480 L0,480 Z"
        fill="#151f10"
      />

      {/* === BLOOD SPLATTERS & PUDDLES === */}
      <ellipse
        cx="150"
        cy="620"
        rx="55"
        ry="22"
        fill="#3d0000"
        opacity="0.85"
      />
      <ellipse cx="155" cy="618" rx="35" ry="13" fill="#5a0000" opacity="0.7" />
      <ellipse
        cx="100"
        cy="608"
        rx="8"
        ry="4"
        fill="#4a0000"
        opacity="0.8"
        transform="rotate(-15 100 608)"
      />
      <ellipse
        cx="200"
        cy="630"
        rx="6"
        ry="3"
        fill="#4a0000"
        opacity="0.7"
        transform="rotate(10 200 630)"
      />
      <circle cx="185" cy="605" r="4" fill="#420000" opacity="0.75" />
      <circle cx="120" cy="635" r="5" fill="#380000" opacity="0.65" />
      <ellipse cx="600" cy="680" rx="70" ry="26" fill="#3a0000" opacity="0.8" />
      <ellipse cx="605" cy="678" rx="45" ry="16" fill="#560000" opacity="0.7" />
      <circle cx="540" cy="668" r="5" fill="#440000" opacity="0.8" />
      <circle cx="660" cy="692" r="4" fill="#440000" opacity="0.7" />
      <ellipse
        cx="625"
        cy="660"
        rx="7"
        ry="3.5"
        fill="#4e0000"
        opacity="0.75"
        transform="rotate(20 625 660)"
      />
      <ellipse
        cx="980"
        cy="640"
        rx="60"
        ry="24"
        fill="#3d0000"
        opacity="0.82"
      />
      <ellipse cx="984" cy="638" rx="38" ry="15" fill="#580000" opacity="0.7" />
      <circle cx="920" cy="628" r="5" fill="#420000" opacity="0.75" />
      <ellipse
        cx="1040"
        cy="652"
        rx="6"
        ry="3"
        fill="#4a0000"
        opacity="0.68"
        transform="rotate(-8 1040 652)"
      />
      <circle cx="340" cy="590" r="4" fill="#450000" opacity="0.7" />
      <circle cx="355" cy="596" r="3" fill="#3e0000" opacity="0.65" />
      <circle cx="820" cy="560" r="3.5" fill="#420000" opacity="0.7" />
      <ellipse
        cx="760"
        cy="570"
        rx="5"
        ry="2.5"
        fill="#400000"
        opacity="0.65"
        transform="rotate(12 760 570)"
      />

      {/* === TORCH POSTS === */}
      <g transform="translate(280, 480)">
        <rect
          x="-5"
          y="-140"
          width="10"
          height="140"
          fill="#1a1208"
          stroke="#0f0c06"
          strokeWidth="1"
        />
        <rect x="-9" y="-148" width="18" height="20" fill="#251a0a" rx="2" />
        <g
          style={{
            animation: "torchFlicker 1.8s ease-in-out infinite",
            transformOrigin: "280px 336px",
          }}
        >
          <ellipse
            cx="0"
            cy="-158"
            rx="14"
            ry="18"
            fill="#8b3a00"
            opacity="0.9"
          />
          <ellipse
            cx="0"
            cy="-164"
            rx="9"
            ry="13"
            fill="#c45a00"
            opacity="0.85"
          />
          <ellipse
            cx="0"
            cy="-169"
            rx="5"
            ry="8"
            fill="#e87800"
            opacity="0.8"
          />
          <ellipse
            cx="0"
            cy="-172"
            rx="3"
            ry="5"
            fill="#ffa030"
            opacity="0.9"
          />
        </g>
        <ellipse
          cx="0"
          cy="10"
          rx="60"
          ry="20"
          fill="url(#torchGlow1)"
          opacity="0.5"
          style={{ animation: "torchFlicker 1.8s ease-in-out infinite" }}
        />
      </g>
      <g transform="translate(920, 480)">
        <rect
          x="-5"
          y="-140"
          width="10"
          height="140"
          fill="#1a1208"
          stroke="#0f0c06"
          strokeWidth="1"
        />
        <rect x="-9" y="-148" width="18" height="20" fill="#251a0a" rx="2" />
        <g
          style={{
            animation: "torchFlicker2 2.1s ease-in-out infinite",
            transformOrigin: "920px 336px",
          }}
        >
          <ellipse
            cx="0"
            cy="-158"
            rx="14"
            ry="18"
            fill="#8b3a00"
            opacity="0.9"
          />
          <ellipse
            cx="0"
            cy="-164"
            rx="9"
            ry="13"
            fill="#c45a00"
            opacity="0.85"
          />
          <ellipse
            cx="0"
            cy="-169"
            rx="5"
            ry="8"
            fill="#e87800"
            opacity="0.8"
          />
          <ellipse
            cx="0"
            cy="-172"
            rx="3"
            ry="5"
            fill="#ffa030"
            opacity="0.9"
          />
        </g>
        <ellipse
          cx="0"
          cy="10"
          rx="60"
          ry="20"
          fill="url(#torchGlow2)"
          opacity="0.45"
          style={{ animation: "torchFlicker2 2.1s ease-in-out infinite" }}
        />
      </g>

      {/* === FOREGROUND DEAD TREES (large, near, enhanced branches) === */}
      <g>
        {/* Tree FG-1 (left) */}
        <line
          x1="50"
          y1="800"
          x2="52"
          y2="440"
          stroke="#0e1609"
          strokeWidth="18"
        />
        <line
          x1="52"
          y1="570"
          x2="5"
          y2="490"
          stroke="#0e1609"
          strokeWidth="9"
        />
        <line
          x1="52"
          y1="540"
          x2="110"
          y2="465"
          stroke="#0e1609"
          strokeWidth="8"
        />
        <line
          x1="52"
          y1="515"
          x2="20"
          y2="452"
          stroke="#0e1609"
          strokeWidth="6"
        />
        <line
          x1="52"
          y1="490"
          x2="90"
          y2="438"
          stroke="#0e1609"
          strokeWidth="6"
        />
        <line
          x1="52"
          y1="470"
          x2="30"
          y2="425"
          stroke="#0e1609"
          strokeWidth="5"
        />
        <line
          x1="5"
          y1="490"
          x2="-8"
          y2="472"
          stroke="#0e1609"
          strokeWidth="4"
        />
        <line
          x1="110"
          y1="465"
          x2="130"
          y2="448"
          stroke="#0e1609"
          strokeWidth="4"
        />
        <line
          x1="20"
          y1="452"
          x2="8"
          y2="438"
          stroke="#0e1609"
          strokeWidth="3"
        />
        {/* Tree FG-2 (right) */}
        <line
          x1="1155"
          y1="800"
          x2="1152"
          y2="435"
          stroke="#0d1508"
          strokeWidth="20"
        />
        <line
          x1="1152"
          y1="560"
          x2="1200"
          y2="488"
          stroke="#0d1508"
          strokeWidth="10"
        />
        <line
          x1="1152"
          y1="530"
          x2="1095"
          y2="460"
          stroke="#0d1508"
          strokeWidth="9"
        />
        <line
          x1="1152"
          y1="505"
          x2="1185"
          y2="448"
          stroke="#0d1508"
          strokeWidth="7"
        />
        <line
          x1="1152"
          y1="480"
          x2="1110"
          y2="432"
          stroke="#0d1508"
          strokeWidth="6"
        />
        <line
          x1="1152"
          y1="460"
          x2="1175"
          y2="418"
          stroke="#0d1508"
          strokeWidth="5"
        />
        <line
          x1="1095"
          y1="460"
          x2="1078"
          y2="444"
          stroke="#0d1508"
          strokeWidth="4"
        />
        <line
          x1="1185"
          y1="448"
          x2="1198"
          y2="432"
          stroke="#0d1508"
          strokeWidth="3.5"
        />
        {/* Tree FG-3 (mid-left) */}
        <line
          x1="350"
          y1="800"
          x2="352"
          y2="445"
          stroke="#0f1708"
          strokeWidth="14"
        />
        <line
          x1="352"
          y1="555"
          x2="305"
          y2="488"
          stroke="#0f1708"
          strokeWidth="7"
        />
        <line
          x1="352"
          y1="530"
          x2="400"
          y2="470"
          stroke="#0f1708"
          strokeWidth="7"
        />
        <line
          x1="352"
          y1="505"
          x2="322"
          y2="455"
          stroke="#0f1708"
          strokeWidth="5"
        />
        <line
          x1="305"
          y1="488"
          x2="288"
          y2="472"
          stroke="#0f1708"
          strokeWidth="3.5"
        />
        <line
          x1="400"
          y1="470"
          x2="415"
          y2="455"
          stroke="#0f1708"
          strokeWidth="3.5"
        />
        <line
          x1="322"
          y1="455"
          x2="308"
          y2="440"
          stroke="#0f1708"
          strokeWidth="3"
        />
        {/* Tree FG-4 (mid-right) */}
        <line
          x1="860"
          y1="800"
          x2="858"
          y2="450"
          stroke="#0e1608"
          strokeWidth="14"
        />
        <line
          x1="858"
          y1="555"
          x2="815"
          y2="490"
          stroke="#0e1608"
          strokeWidth="7"
        />
        <line
          x1="858"
          y1="530"
          x2="905"
          y2="468"
          stroke="#0e1608"
          strokeWidth="7"
        />
        <line
          x1="858"
          y1="505"
          x2="880"
          y2="454"
          stroke="#0e1608"
          strokeWidth="5"
        />
        <line
          x1="815"
          y1="490"
          x2="798"
          y2="475"
          stroke="#0e1608"
          strokeWidth="3.5"
        />
        <line
          x1="905"
          y1="468"
          x2="920"
          y2="452"
          stroke="#0e1608"
          strokeWidth="3.5"
        />
        <line
          x1="880"
          y1="454"
          x2="896"
          y2="438"
          stroke="#0e1608"
          strokeWidth="3"
        />
      </g>

      {/* === FOG LAYERS (animated, multiple passes) === */}
      <rect
        x="-100"
        y="370"
        width="1400"
        height="110"
        fill="url(#fogGrad1)"
        opacity="0.85"
        style={{ animation: "fogDrift1 18s ease-in-out infinite alternate" }}
      />
      <rect
        x="-100"
        y="430"
        width="1400"
        height="100"
        fill="url(#fogGrad2)"
        opacity="0.9"
        style={{ animation: "fogDrift2 22s ease-in-out infinite alternate" }}
      />
      <rect
        x="-100"
        y="460"
        width="1400"
        height="80"
        fill="url(#fogGrad3)"
        opacity="0.75"
        style={{ animation: "fogDrift3 15s ease-in-out infinite alternate" }}
      />
      <rect
        x="-100"
        y="490"
        width="1400"
        height="60"
        fill="url(#fogGrad2)"
        opacity="0.65"
        style={{ animation: "fogDrift4 25s ease-in-out infinite alternate" }}
      />
      <rect
        x="0"
        y="540"
        width="1200"
        height="80"
        fill="#182818"
        opacity="0.35"
        style={{ animation: "fogDrift1 30s ease-in-out infinite alternate" }}
      />

      {/* === PREMIUM DETAILED ZOMBIE FIGURES === */}

      {/* ------ ZOMBIE 1: Classic outstretched arms, walking — x=160 ------ */}
      <g transform="translate(160, 480)" opacity="0.93">
        {/* Ground shadow */}
        <ellipse cx="0" cy="2" rx="18" ry="5" fill="#050808" opacity="0.6" />
        {/* Left leg — slightly forward */}
        <path d="M-8,-10 L-12,0 L-8,2 L-4,-8 Z" fill="#1a2a10" />
        {/* Right leg — back, slight drag */}
        <path d="M2,-10 L8,0 L12,2 L6,-9 Z" fill="#1a2a10" />
        {/* Torn trouser ragged edge left */}
        <path
          d="M-12,0 L-10,-2 L-8,1 L-6,-1 L-4,2 L-3,0 L-2,2"
          fill="none"
          stroke="#111808"
          strokeWidth="1"
        />
        {/* Torso — ragged shirt with blood stains */}
        <rect x="-10" y="-58" width="20" height="48" rx="2" fill="#2a3a1a" />
        {/* Blood stain on shirt */}
        <ellipse cx="-2" cy="-40" rx="6" ry="8" fill="#5a0808" opacity="0.7" />
        <ellipse cx="4" cy="-32" rx="4" ry="5" fill="#4a0000" opacity="0.6" />
        {/* Torn shirt ragged bottom edge */}
        <path
          d="M-10,-10 L-7,-12 L-4,-9 L0,-13 L4,-10 L7,-12 L10,-10"
          fill="none"
          stroke="#1a2a10"
          strokeWidth="1.2"
        />
        {/* Neck */}
        <rect x="-4" y="-66" width="8" height="10" rx="1" fill="#3a4a2a" />
        {/* Head — skull shaped */}
        <ellipse cx="0" cy="-78" rx="12" ry="14" fill="#3a4a2a" />
        {/* Sunken eye sockets */}
        <ellipse cx="-4" cy="-80" rx="3.5" ry="3" fill="#0a0a08" />
        <ellipse cx="4" cy="-80" rx="3.5" ry="3" fill="#0a0a08" />
        {/* Glowing red-orange eye embers */}
        <circle cx="-4" cy="-80" r="1.5" fill="#8b1800" opacity="0.8" />
        <circle cx="4" cy="-80" r="1.5" fill="#8b1800" opacity="0.8" />
        {/* Exposed teeth — jaw torn */}
        <path
          d="M-5,-68 L-3,-65 L-1,-67 L1,-65 L3,-67 L5,-65 L6,-68"
          fill="none"
          stroke="#ccccaa"
          strokeWidth="1.2"
        />
        <rect
          x="-5"
          y="-68"
          width="10"
          height="4"
          rx="1"
          fill="#1a1a0a"
          opacity="0.6"
        />
        {/* Tear/wound on cheek */}
        <path
          d="M6,-76 L9,-72"
          fill="none"
          stroke="#5a0808"
          strokeWidth="1.5"
        />
        {/* Left arm — reaching far forward low */}
        <path d="M-10,-50 L-38,-46 L-40,-40 L-10,-44 Z" fill="#2a3a1a" />
        {/* Torn sleeve end */}
        <path
          d="M-38,-46 L-36,-49 L-34,-45 L-32,-48 L-30,-45 L-28,-47 L-26,-44"
          fill="none"
          stroke="#1a2a10"
          strokeWidth="1"
        />
        {/* Right arm — reaching forward higher */}
        <path d="M10,-52 L40,-44 L42,-38 L10,-46 Z" fill="#2a3a1a" />
        <path
          d="M40,-44 L38,-47 L36,-43 L34,-46 L32,-43 L30,-45 L28,-42"
          fill="none"
          stroke="#1a2a10"
          strokeWidth="1"
        />
        {/* Wound scar on right arm */}
        <line
          x1="20"
          y1="-49"
          x2="25"
          y2="-45"
          stroke="#5a0808"
          strokeWidth="1.2"
          opacity="0.8"
        />
      </g>

      {/* ------ ZOMBIE 2: Hunching forward, one arm raised — x=440 ------ */}
      <g transform="translate(440, 480) rotate(-8, 0, 0)" opacity="0.91">
        {/* Ground shadow */}
        <ellipse cx="0" cy="2" rx="16" ry="4.5" fill="#050808" opacity="0.55" />
        {/* Legs */}
        <path d="M-7,-8 L-11,2 L-7,4 L-3,-7 Z" fill="#1e2e14" />
        <path d="M3,-8 L9,2 L13,4 L7,-8 Z" fill="#1e2e14" />
        {/* Torso hunched forward */}
        <path d="M-10,-60 Q0,-72 10,-60 L8,-14 L-8,-14 Z" fill="#283818" />
        {/* Dark wound patch */}
        <ellipse cx="3" cy="-38" rx="5" ry="6" fill="#4a0808" opacity="0.65" />
        {/* Neck */}
        <rect x="-4" y="-68" width="8" height="10" rx="1" fill="#344424" />
        {/* Head tilted */}
        <ellipse cx="2" cy="-80" rx="11" ry="13" fill="#344424" />
        {/* Eye sockets */}
        <ellipse cx="-2" cy="-82" rx="3" ry="2.8" fill="#090908" />
        <ellipse cx="6" cy="-82" rx="3" ry="2.8" fill="#090908" />
        <circle cx="-2" cy="-82" r="1.3" fill="#7a1200" opacity="0.85" />
        <circle cx="6" cy="-82" r="1.3" fill="#7a1200" opacity="0.85" />
        {/* Teeth / exposed jaw */}
        <path
          d="M-4,-70 L-2,-67 L0,-69 L2,-67 L4,-70"
          fill="none"
          stroke="#bbbba0"
          strokeWidth="1.1"
        />
        {/* One arm raised high — left */}
        <path d="M-10,-55 L-30,-30 L-26,-24 L-6,-50 Z" fill="#283818" />
        <path
          d="M-30,-30 L-28,-33 L-26,-29 L-24,-32 L-22,-28 L-20,-31"
          fill="none"
          stroke="#182410"
          strokeWidth="1"
        />
        {/* Other arm drooping low — right */}
        <path d="M10,-48 L30,-20 L34,-14 L12,-44 Z" fill="#283818" />
        {/* Blood drip on drooping arm */}
        <ellipse cx="22" cy="-32" rx="3" ry="4" fill="#5a0000" opacity="0.6" />
        <path
          d="M22,-28 L21,-20"
          fill="none"
          stroke="#5a0000"
          strokeWidth="1"
        />
      </g>

      {/* ------ ZOMBIE 3: Both arms extended, taller stance — x=610 ------ */}
      <g transform="translate(610, 480)" opacity="0.89">
        {/* Ground shadow */}
        <ellipse cx="0" cy="2" rx="17" ry="5" fill="#050808" opacity="0.58" />
        {/* Legs — wider stance */}
        <path d="M-9,-12 L-15,2 L-10,4 L-4,-10 Z" fill="#1c2c12" />
        <path d="M4,-12 L10,2 L15,4 L8,-11 Z" fill="#1c2c12" />
        {/* Torn trousers */}
        <path
          d="M-15,2 L-13,0 L-11,3 L-9,0 L-7,3 L-5,1"
          fill="none"
          stroke="#121c08"
          strokeWidth="1"
        />
        <path
          d="M10,2 L12,0 L14,3 L16,0"
          fill="none"
          stroke="#121c08"
          strokeWidth="1"
        />
        {/* Torso — tall, ragged */}
        <rect x="-11" y="-65" width="22" height="53" rx="2" fill="#253515" />
        {/* Wound gash — diagonal across chest */}
        <path
          d="M-8,-50 L5,-40"
          fill="none"
          stroke="#600000"
          strokeWidth="2.5"
        />
        <path
          d="M-8,-50 L5,-40"
          fill="none"
          stroke="#3a0000"
          strokeWidth="1.2"
          opacity="0.6"
        />
        {/* Blood stains */}
        <ellipse cx="-3" cy="-48" rx="5" ry="7" fill="#5a0808" opacity="0.6" />
        <ellipse
          cx="6"
          cy="-38"
          rx="3.5"
          ry="4.5"
          fill="#4a0000"
          opacity="0.55"
        />
        {/* Torn shirt hem */}
        <path
          d="M-11,-12 L-8,-15 L-5,-11 L-2,-14 L1,-11 L4,-14 L7,-11 L11,-13"
          fill="none"
          stroke="#1a2a10"
          strokeWidth="1.2"
        />
        {/* Neck */}
        <rect x="-4" y="-73" width="8" height="10" rx="1" fill="#334322" />
        {/* Head — elongated skull */}
        <ellipse cx="0" cy="-86" rx="12" ry="15" fill="#334322" />
        {/* Sunken eye sockets — hollow dark */}
        <ellipse cx="-4.5" cy="-88" rx="3.8" ry="3.5" fill="#080808" />
        <ellipse cx="4.5" cy="-88" rx="3.8" ry="3.5" fill="#080808" />
        {/* Ember eyes */}
        <circle cx="-4.5" cy="-88" r="1.6" fill="#901800" opacity="0.9" />
        <circle cx="4.5" cy="-88" r="1.6" fill="#901800" opacity="0.9" />
        {/* Exposed teeth — wide open */}
        <path
          d="M-6,-75 L-4,-72 L-2,-74 L0,-72 L2,-74 L4,-72 L6,-75"
          fill="none"
          stroke="#ccccaa"
          strokeWidth="1.3"
        />
        <path
          d="M-6,-75 Q0,-77 6,-75"
          fill="none"
          stroke="#bba880"
          strokeWidth="1"
          opacity="0.5"
        />
        {/* Wound/scar on jaw */}
        <line
          x1="-8"
          y1="-76"
          x2="-10"
          y2="-70"
          stroke="#5a0808"
          strokeWidth="1.3"
        />
        {/* Left arm — extended far forward slightly angled down */}
        <path d="M-11,-55 L-46,-50 L-48,-44 L-9,-50 Z" fill="#253515" />
        <path
          d="M-46,-50 L-44,-53 L-42,-49 L-40,-52 L-38,-48 L-36,-51"
          fill="none"
          stroke="#18240e"
          strokeWidth="1"
        />
        {/* Right arm — extended far forward slightly up */}
        <path d="M11,-58 L46,-52 L48,-46 L9,-52 Z" fill="#253515" />
        <path
          d="M46,-52 L44,-55 L42,-51 L40,-54 L38,-50 L36,-53"
          fill="none"
          stroke="#18240e"
          strokeWidth="1"
        />
        {/* Torn sleeves */}
        <path
          d="M-11,-55 L-9,-58 L-7,-54 L-5,-57 L-3,-54"
          fill="none"
          stroke="#1a2a10"
          strokeWidth="1"
        />
        <path
          d="M11,-58 L13,-61 L15,-57 L17,-60"
          fill="none"
          stroke="#1a2a10"
          strokeWidth="1"
        />
      </g>

      {/* ------ ZOMBIE 4: Distant, slightly hunched, one arm missing at wrist — x=780, scale 0.72 ------ */}
      <g transform="translate(780, 480) scale(0.72)" opacity="0.86">
        {/* Ground shadow */}
        <ellipse cx="0" cy="2" rx="15" ry="4" fill="#050808" opacity="0.5" />
        {/* Legs */}
        <path d="M-7,-10 L-10,0 L-6,2 L-3,-8 Z" fill="#1e2c10" />
        <path d="M3,-10 L7,0 L11,2 L6,-9 Z" fill="#1e2c10" />
        {/* Torso — slightly hunched */}
        <path d="M-9,-55 Q0,-65 9,-55 L7,-12 L-7,-12 Z" fill="#26361a" />
        {/* Blood stain */}
        <ellipse cx="-1" cy="-38" rx="5" ry="6" fill="#5a0808" opacity="0.6" />
        {/* Neck */}
        <rect x="-3.5" y="-63" width="7" height="9" rx="1" fill="#324222" />
        {/* Head */}
        <ellipse cx="0" cy="-74" rx="10" ry="12" fill="#324222" />
        {/* Sockets */}
        <ellipse cx="-3.5" cy="-76" rx="3" ry="2.5" fill="#080808" />
        <ellipse cx="3.5" cy="-76" rx="3" ry="2.5" fill="#080808" />
        <circle cx="-3.5" cy="-76" r="1.2" fill="#7a1000" opacity="0.8" />
        <circle cx="3.5" cy="-76" r="1.2" fill="#7a1000" opacity="0.8" />
        {/* Teeth */}
        <path
          d="M-4,-64 L-2,-61 L0,-63 L2,-61 L4,-64"
          fill="none"
          stroke="#bbbba0"
          strokeWidth="1"
        />
        {/* Left arm — reaching forward */}
        <path d="M-9,-48 L-32,-42 L-34,-36 L-7,-44 Z" fill="#26361a" />
        {/* Right arm — cut off at wrist — stump end */}
        <path d="M9,-46 L28,-36 L27,-28 L8,-40 Z" fill="#26361a" />
        {/* Stump end — ragged wound */}
        <ellipse
          cx="27.5"
          cy="-32"
          rx="4"
          ry="5"
          fill="#5a0808"
          opacity="0.8"
        />
        <path
          d="M24,-30 L26,-26 M28,-28 L29,-24 M31,-30 L32,-26"
          fill="none"
          stroke="#3a0000"
          strokeWidth="1"
        />
      </g>

      {/* ------ ZOMBIE 5: Crawling/fallen, dragging body — x=1000 ------ */}
      <g transform="translate(1000, 478)" opacity="0.83">
        {/* Ground shadow */}
        <ellipse cx="-20" cy="4" rx="45" ry="7" fill="#050808" opacity="0.5" />
        {/* Dragging legs — behind */}
        <path d="M15,-3 L38,8 L40,14 L16,4 Z" fill="#1e2c10" />
        <path d="M18,5 L38,14 L36,20 L16,12 Z" fill="#1c2a0e" />
        {/* Horizontal body */}
        <path d="M-35,-18 Q0,-28 15,-8 L15,5 Q0,-8 -35,-4 Z" fill="#283818" />
        {/* Wound on back/side */}
        <ellipse cx="-8" cy="-14" rx="6" ry="4" fill="#5a0808" opacity="0.65" />
        {/* Blood trail */}
        <path
          d="M-35,-10 L-55,-8 L-58,-2"
          fill="none"
          stroke="#5a0000"
          strokeWidth="2.5"
          opacity="0.6"
        />
        <ellipse cx="-50" cy="-4" rx="5" ry="3" fill="#4a0000" opacity="0.5" />
        {/* Head — angled */}
        <ellipse
          cx="-45"
          cy="-20"
          rx="11"
          ry="12"
          fill="#334222"
          transform="rotate(30, -45, -20)"
        />
        {/* Eye sockets */}
        <ellipse
          cx="-50"
          cy="-22"
          rx="2.8"
          ry="2.5"
          fill="#080808"
          transform="rotate(30, -50, -22)"
        />
        <ellipse
          cx="-42"
          cy="-18"
          rx="2.8"
          ry="2.5"
          fill="#080808"
          transform="rotate(30, -42, -18)"
        />
        <circle
          cx="-50"
          cy="-22"
          r="1.1"
          fill="#801000"
          opacity="0.8"
          transform="rotate(30, -50, -22)"
        />
        <circle
          cx="-42"
          cy="-18"
          r="1.1"
          fill="#801000"
          opacity="0.8"
          transform="rotate(30, -42, -18)"
        />
        {/* Teeth */}
        <path
          d="M-47,-10 L-45,-8 L-43,-10 L-41,-8"
          fill="none"
          stroke="#bba890"
          strokeWidth="1"
          transform="rotate(30, -44, -9)"
        />
        {/* Arms clawing forward */}
        <path d="M-35,-14 L-58,-18 L-60,-12 L-33,-8 Z" fill="#283818" />
        <path
          d="M-58,-18 L-56,-21 L-54,-17 L-52,-20 L-50,-16 L-48,-18"
          fill="none"
          stroke="#182410"
          strokeWidth="1"
        />
        <path d="M-35,-8 L-52,-4 L-53,2 L-33,-2 Z" fill="#283818" />
        <path
          d="M-52,-4 L-50,-7 L-48,-3 L-46,-6 L-44,-2"
          fill="none"
          stroke="#182410"
          strokeWidth="1"
        />
      </g>

      {/* ------ ZOMBIE 6: Background small, arms both reaching, scale 0.65 — x=300 ------ */}
      <g transform="translate(300, 480) scale(0.65)" opacity="0.79">
        {/* Ground shadow */}
        <ellipse cx="0" cy="2" rx="14" ry="4" fill="#050808" opacity="0.45" />
        {/* Legs */}
        <path d="M-7,-9 L-10,0 L-6,2 L-3,-7 Z" fill="#1a2a10" />
        <path d="M3,-9 L7,0 L11,2 L5,-8 Z" fill="#1a2a10" />
        {/* Torso */}
        <rect x="-9" y="-58" width="18" height="49" rx="2" fill="#243414" />
        {/* Wound / blood */}
        <ellipse cx="2" cy="-40" rx="4" ry="5" fill="#520808" opacity="0.6" />
        {/* Neck */}
        <rect x="-3.5" y="-66" width="7" height="9" rx="1" fill="#30401e" />
        {/* Head */}
        <ellipse cx="0" cy="-77" rx="10" ry="12" fill="#30401e" />
        {/* Eye sockets */}
        <ellipse cx="-3.5" cy="-79" rx="3" ry="2.5" fill="#080808" />
        <ellipse cx="3.5" cy="-79" rx="3" ry="2.5" fill="#080808" />
        <circle cx="-3.5" cy="-79" r="1.2" fill="#7a1200" opacity="0.8" />
        <circle cx="3.5" cy="-79" r="1.2" fill="#7a1200" opacity="0.8" />
        {/* Teeth */}
        <path
          d="M-4,-67 L-2,-64 L0,-66 L2,-64 L4,-67"
          fill="none"
          stroke="#c0c0a0"
          strokeWidth="1"
        />
        {/* Both arms reaching */}
        <path d="M-9,-50 L-34,-44 L-36,-38 L-7,-45 Z" fill="#243414" />
        <path
          d="M-34,-44 L-32,-47 L-30,-43 L-28,-46 L-26,-42"
          fill="none"
          stroke="#162010"
          strokeWidth="0.9"
        />
        <path d="M9,-48 L34,-42 L36,-36 L7,-43 Z" fill="#243414" />
        <path
          d="M34,-42 L32,-45 L30,-41 L28,-44 L26,-40"
          fill="none"
          stroke="#162010"
          strokeWidth="0.9"
        />
      </g>
    </svg>
  );

  const renderHalloweenWorld = () => (
    <svg
      role="img"
      aria-label="Halloween world background"
      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* ── NIGHT SKY ── */}
        <linearGradient id="hwSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#050510" />
          <stop offset="40%" stopColor="#0a0a1a" />
          <stop offset="100%" stopColor="#1a0a2e" />
        </linearGradient>
        {/* Ground gradient */}
        <linearGradient id="hwGroundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0a0510" />
          <stop offset="50%" stopColor="#060308" />
          <stop offset="100%" stopColor="#030205" />
        </linearGradient>
        {/* Castle stone gradients — three shades for variety */}
        <linearGradient id="hwCastleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e1a2e" />
          <stop offset="50%" stopColor="#14112a" />
          <stop offset="100%" stopColor="#0c0a1e" />
        </linearGradient>
        <linearGradient id="hwCastleGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#16213e" />
          <stop offset="50%" stopColor="#0f1832" />
          <stop offset="100%" stopColor="#0a1028" />
        </linearGradient>
        <linearGradient id="hwCastleGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="60%" stopColor="#0f3460" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0a0a1a" />
        </linearGradient>
        {/* Rocky cliff under castle */}
        <linearGradient id="hwCliffGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0e0c1c" />
          <stop offset="100%" stopColor="#060410" />
        </linearGradient>
        {/* Moon gradients */}
        <radialGradient id="hwMoonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffff0" stopOpacity="0.5" />
          <stop offset="40%" stopColor="#f5e8c0" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#d4c080" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hwMoonFace" cx="35%" cy="30%" r="72%">
          <stop offset="0%" stopColor="#fffef5" />
          <stop offset="60%" stopColor="#f5e6c8" />
          <stop offset="100%" stopColor="#dcc88a" />
        </radialGradient>
        {/* Pumpkin body gradients */}
        <radialGradient id="hwPump1" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#ff9422" />
          <stop offset="55%" stopColor="#d05000" />
          <stop offset="100%" stopColor="#7a2800" />
        </radialGradient>
        <radialGradient id="hwPump2" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#ff7a00" />
          <stop offset="55%" stopColor="#c04200" />
          <stop offset="100%" stopColor="#6a2000" />
        </radialGradient>
        <radialGradient id="hwPump3" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#ffa030" />
          <stop offset="55%" stopColor="#d86000" />
          <stop offset="100%" stopColor="#7a3000" />
        </radialGradient>
        {/* Static pumpkin glow halos — no animation */}
        <radialGradient id="hwPumpGlow1" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#ffcc44" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#ff8800" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#cc3300" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hwPumpGlow2" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#ffdd55" stopOpacity="0.5" />
          <stop offset="55%" stopColor="#ff9900" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#dd3300" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hwPumpGlowBig" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#ffe066" stopOpacity="0.6" />
          <stop offset="40%" stopColor="#ffaa00" stopOpacity="0.35" />
          <stop offset="75%" stopColor="#ff6600" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#dd2200" stopOpacity="0" />
        </radialGradient>
        {/* Castle window warm amber glow */}
        <radialGradient id="hwWinGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffb944" stopOpacity="1" />
          <stop offset="55%" stopColor="#cc6a00" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#882200" stopOpacity="0" />
        </radialGradient>
        {/* Static fog gradient */}
        <linearGradient id="hwFogGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c8c0e0" stopOpacity="0" />
          <stop offset="20%" stopColor="#c8c0e0" stopOpacity="0.18" />
          <stop offset="50%" stopColor="#b8b0d0" stopOpacity="0.28" />
          <stop offset="80%" stopColor="#c8c0e0" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#c8c0e0" stopOpacity="0" />
        </linearGradient>
        {/* Glow filters */}
        <filter id="hwGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="hwGlowLg" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="hwGlowMd" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="hwMoonHalo" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <filter id="hwSoftBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* ── SKY ── */}
      <rect width="1200" height="800" fill="url(#hwSkyGrad)" />

      {/* ── STATIC STARS ── */}
      {/* Larger accent stars */}
      <g filter="url(#hwGlow)">
        <circle cx="80" cy="55" r="1.6" fill="#fff9e8" />
        <circle cx="190" cy="30" r="1.2" fill="#fff8f0" />
        <circle cx="310" cy="70" r="1.8" fill="#fffde0" />
        <circle cx="445" cy="42" r="1.3" fill="#fff9e8" />
        <circle cx="560" cy="25" r="2.0" fill="#fffde0" />
        <circle cx="670" cy="60" r="1.5" fill="#fff8f0" />
        <circle cx="790" cy="38" r="1.7" fill="#fffce0" />
        <circle cx="920" cy="55" r="1.4" fill="#fff9e8" />
        <circle cx="1060" cy="28" r="1.9" fill="#fffde0" />
        <circle cx="1140" cy="65" r="1.3" fill="#fff8f0" />
        <circle cx="130" cy="95" r="1.1" fill="#fff0d8" />
        <circle cx="370" cy="48" r="1.2" fill="#fffde0" />
        <circle cx="500" cy="95" r="1.0" fill="#fff9e8" />
        <circle cx="720" cy="88" r="1.2" fill="#fff0d8" />
        <circle cx="860" cy="32" r="1.0" fill="#fffde0" />
        <circle cx="990" cy="75" r="1.1" fill="#fff8f0" />
      </g>
      {/* Dim stars — no filter, no animation */}
      <g fill="#e8d8b8" opacity="0.45">
        <circle cx="225" cy="80" r="0.7" />
        <circle cx="610" cy="45" r="0.7" />
        <circle cx="1100" cy="50" r="0.7" />
        <circle cx="55" cy="130" r="0.8" />
        <circle cx="280" cy="118" r="0.9" />
        <circle cx="420" cy="130" r="0.7" />
        <circle cx="640" cy="105" r="0.8" />
        <circle cx="820" cy="120" r="1.0" />
        <circle cx="1000" cy="115" r="0.7" />
        <circle cx="1160" cy="98" r="0.9" />
        <circle cx="150" cy="145" r="0.7" />
        <circle cx="330" cy="155" r="0.8" />
        <circle cx="480" cy="140" r="0.7" />
        <circle cx="700" cy="160" r="0.9" />
        <circle cx="940" cy="135" r="0.8" />
        <circle cx="1080" cy="148" r="0.7" />
        <circle cx="35" cy="80" r="0.6" />
        <circle cx="748" cy="72" r="0.7" />
        <circle cx="1185" cy="115" r="0.6" />
        <circle cx="260" cy="60" r="0.7" />
        <circle cx="590" cy="80" r="0.6" />
        <circle cx="1020" cy="55" r="0.7" />
      </g>

      {/* ── MOON (upper right, large and detailed) ── */}
      {/* Outer halo */}
      <circle
        cx="940"
        cy="130"
        r="110"
        fill="url(#hwMoonGlow)"
        filter="url(#hwMoonHalo)"
      />
      <circle
        cx="940"
        cy="130"
        r="82"
        fill="url(#hwMoonGlow)"
        filter="url(#hwMoonHalo)"
        opacity="0.55"
      />
      {/* Moon disc */}
      <circle cx="940" cy="130" r="66" fill="url(#hwMoonFace)" />
      {/* Moon edge ring */}
      <circle
        cx="940"
        cy="130"
        r="66"
        fill="none"
        stroke="#fffef0"
        strokeWidth="1.5"
        opacity="0.25"
      />
      {/* Moon craters */}
      <circle cx="912" cy="112" r="11" fill="#d8c888" opacity="0.45" />
      <circle cx="912" cy="112" r="7.5" fill="#e8d89a" opacity="0.3" />
      <circle cx="962" cy="148" r="9" fill="#d4c47e" opacity="0.4" />
      <circle cx="962" cy="148" r="6" fill="#e4d490" opacity="0.28" />
      <circle cx="925" cy="158" r="7" fill="#d0bf7a" opacity="0.38" />
      <circle cx="958" cy="108" r="5.5" fill="#dcd08e" opacity="0.35" />
      <circle cx="902" cy="142" r="4.5" fill="#d8c886" opacity="0.4" />
      <circle cx="978" cy="128" r="4" fill="#dcd28c" opacity="0.35" />
      <circle cx="920" cy="132" r="3" fill="#d8cc84" opacity="0.3" />
      <circle cx="948" cy="120" r="2.5" fill="#dfd48e" opacity="0.28" />

      {/* ── STATIC WISPY CLOUDS NEAR MOON ── */}
      <g opacity="0.22">
        <ellipse cx="895" cy="112" rx="75" ry="18" fill="#e8e4f0" />
        <ellipse cx="990" cy="138" rx="60" ry="14" fill="#dcd8ec" />
        <ellipse cx="930" cy="102" rx="48" ry="11" fill="#f0eef8" />
        <ellipse cx="870" cy="145" rx="40" ry="10" fill="#e0dcea" />
      </g>

      {/* ── STATIC BATS (3, no animation) ── */}
      {/* Bat 1 — near moon */}
      <g transform="translate(870, 88)">
        <path d="M0,0 Q-20,-15 -32,-7 Q-22,-2 0,0 Z" fill="#1a0030" />
        <path d="M0,0 Q20,-15 32,-7 Q22,-2 0,0 Z" fill="#1a0030" />
        <ellipse cx="0" cy="0" rx="6" ry="4.5" fill="#130022" />
        <path d="M-3,-5 L-5,-10 L-1,-5.5 Z" fill="#130022" />
        <path d="M3,-5 L5,-10 L1,-5.5 Z" fill="#130022" />
        <circle cx="-2.5" cy="-1" r="1.2" fill="#380055" />
        <circle cx="2.5" cy="-1" r="1.2" fill="#380055" />
      </g>
      {/* Bat 2 */}
      <g transform="translate(720, 155)">
        <path d="M0,0 Q-14,-11 -22,-5 Q-15,-1 0,0 Z" fill="#16002a" />
        <path d="M0,0 Q14,-11 22,-5 Q15,-1 0,0 Z" fill="#16002a" />
        <ellipse cx="0" cy="0" rx="5" ry="3.5" fill="#12001f" />
        <path d="M-2.5,-4 L-4,-8 L-1,-4.5 Z" fill="#12001f" />
        <path d="M2.5,-4 L4,-8 L1,-4.5 Z" fill="#12001f" />
      </g>
      {/* Bat 3 */}
      <g transform="translate(1060, 92)">
        <path d="M0,0 Q-16,-12 -24,-6 Q-17,-2 0,0 Z" fill="#18002c" />
        <path d="M0,0 Q16,-12 24,-6 Q17,-2 0,0 Z" fill="#18002c" />
        <ellipse cx="0" cy="0" rx="5.5" ry="4" fill="#130022" />
        <path d="M-2.5,-4 L-4.5,-9 L-1,-5 Z" fill="#130022" />
        <path d="M2.5,-4 L4.5,-9 L1,-5 Z" fill="#130022" />
      </g>

      {/* ═══════════════════════════════════════════
          GOTHIC HAUNTED CASTLE (background, upper)
      ═══════════════════════════════════════════ */}

      {/* Outer atmosphere / ambient castle glow */}
      <ellipse
        cx="420"
        cy="430"
        rx="290"
        ry="200"
        fill="#1a0035"
        opacity="0.20"
        filter="url(#hwSoftBlur)"
      />

      {/* Rocky cliff / dark hill under castle */}
      <path
        d="M80,560 Q120,510 180,505 Q220,500 260,510 Q310,518 360,508 Q420,498 480,505 Q540,512 590,504 Q640,496 680,500 Q720,504 760,510 L800,560 Z"
        fill="url(#hwCliffGrad)"
      />
      {/* Jagged rock shapes */}
      <polygon
        points="100,560 115,530 130,548 145,520 160,542 175,515 192,536 210,518 225,540 240,525 260,545 275,518 295,538 320,560"
        fill="#0c0a1c"
      />
      <polygon
        points="600,560 618,532 638,548 655,522 672,540 692,518 710,535 730,520 750,540 770,525 790,548 800,560"
        fill="#0b091a"
      />

      {/* ── Castle main body ── */}
      <rect
        x="180"
        y="360"
        width="400"
        height="220"
        fill="url(#hwCastleGrad)"
      />
      {/* Stone block texture — horizontal mortar lines */}
      <g stroke="#252038" strokeWidth="0.8" opacity="0.6">
        {[375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555].map(
          (y) => (
            <line key={`hcl-${y}`} x1="180" y1={y} x2="580" y2={y} />
          ),
        )}
      </g>
      {/* Vertical stone joints (offset alternating rows) */}
      <g stroke="#252038" strokeWidth="0.6" opacity="0.4">
        {[210, 240, 270, 300, 330, 360, 390, 420, 450, 480, 510, 550].map(
          (x) => (
            <line key={`vcl-${x}`} x1={x} y1="360" x2={x} y2="580" />
          ),
        )}
      </g>
      {/* Color variation patches to simulate stone variation */}
      <rect
        x="215"
        y="375"
        width="35"
        height="28"
        fill="#16213e"
        opacity="0.35"
      />
      <rect
        x="305"
        y="408"
        width="42"
        height="28"
        fill="#0f3460"
        opacity="0.25"
      />
      <rect
        x="482"
        y="438"
        width="38"
        height="28"
        fill="#16213e"
        opacity="0.3"
      />
      <rect
        x="248"
        y="470"
        width="30"
        height="28"
        fill="#0f3460"
        opacity="0.2"
      />
      <rect
        x="530"
        y="395"
        width="34"
        height="28"
        fill="#1a1a2e"
        opacity="0.4"
      />

      {/* ── Left main tower (tall) ── */}
      <rect
        x="155"
        y="230"
        width="80"
        height="165"
        fill="url(#hwCastleGrad2)"
      />
      {/* Stone texture left tower */}
      <g stroke="#252038" strokeWidth="0.7" opacity="0.5">
        {[248, 264, 280, 296, 312, 328, 344, 360].map((y) => (
          <line key={`ltl-${y}`} x1="155" y1={y} x2="235" y2={y} />
        ))}
      </g>
      {/* Left tower pointed roof */}
      <polygon
        points="148,230 195,148 242,230"
        fill="#0f0c1c"
        stroke="#1e1830"
        strokeWidth="1.5"
      />
      {/* Left tower battlements */}
      <g fill="#0c0918">
        <rect x="150" y="226" width="14" height="18" />
        <rect x="170" y="226" width="14" height="18" />
        <rect x="191" y="226" width="14" height="18" />
        <rect x="212" y="226" width="14" height="18" />
        <rect x="233" y="226" width="14" height="18" />
      </g>
      {/* Left tower cracks */}
      <path
        d="M185,258 Q189,278 185,300 Q188,318 183,338"
        stroke="#2e2848"
        strokeWidth="1.2"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M210,290 Q214,308 211,322"
        stroke="#2e2848"
        strokeWidth="0.9"
        fill="none"
        opacity="0.6"
      />

      {/* ── Right main tower ── */}
      <rect
        x="525"
        y="258"
        width="72"
        height="142"
        fill="url(#hwCastleGrad2)"
      />
      <g stroke="#252038" strokeWidth="0.7" opacity="0.5">
        {[272, 288, 304, 320, 336, 352, 368, 385].map((y) => (
          <line key={`rtl-${y}`} x1="525" y1={y} x2="597" y2={y} />
        ))}
      </g>
      <polygon
        points="519,258 561,180 603,258"
        fill="#0f0c1c"
        stroke="#1e1830"
        strokeWidth="1.5"
      />
      <g fill="#0c0918">
        <rect x="516" y="254" width="12" height="16" />
        <rect x="533" y="254" width="12" height="16" />
        <rect x="551" y="254" width="12" height="16" />
        <rect x="569" y="254" width="12" height="16" />
        <rect x="587" y="254" width="12" height="16" />
      </g>
      <path
        d="M548,285 Q552,305 549,325"
        stroke="#2e2848"
        strokeWidth="1.1"
        fill="none"
        opacity="0.65"
      />

      {/* ── Centre tallest tower / spire ── */}
      <rect
        x="330"
        y="195"
        width="100"
        height="210"
        fill="url(#hwCastleGrad)"
      />
      <g stroke="#252038" strokeWidth="0.7" opacity="0.5">
        {[210, 225, 240, 255, 270, 285, 300, 315, 330, 345, 360].map((y) => (
          <line key={`ctl-${y}`} x1="330" y1={y} x2="430" y2={y} />
        ))}
      </g>
      <polygon
        points="323,195 380,102 437,195"
        fill="#0c091a"
        stroke="#1c1830"
        strokeWidth="1.5"
      />
      {/* Centre tower battlements */}
      <g fill="#0b0818">
        <rect x="320" y="191" width="16" height="20" />
        <rect x="341" y="191" width="16" height="20" />
        <rect x="363" y="191" width="16" height="20" />
        <rect x="385" y="191" width="16" height="20" />
        <rect x="407" y="191" width="16" height="20" />
        <rect x="428" y="191" width="16" height="20" />
      </g>
      {/* Centre tower cracks */}
      <path
        d="M358,222 Q362,252 357,282 Q360,310 355,338"
        stroke="#2e2848"
        strokeWidth="1.5"
        fill="none"
        opacity="0.65"
      />
      <path
        d="M400,265 Q404,285 401,308"
        stroke="#2e2848"
        strokeWidth="1"
        fill="none"
        opacity="0.55"
      />

      {/* ── Small left corner turret ── */}
      <rect x="108" y="318" width="54" height="80" fill="url(#hwCastleGrad3)" />
      <polygon
        points="104,318 135,265 162,318"
        fill="#0f0c1c"
        stroke="#1e1830"
        strokeWidth="1.5"
      />
      <g fill="#0c0918">
        <rect x="104" y="315" width="11" height="14" />
        <rect x="119" y="315" width="11" height="14" />
        <rect x="135" y="315" width="11" height="14" />
        <rect x="151" y="315" width="11" height="14" />
      </g>
      {/* Gargoyle silhouette on left small turret */}
      <g fill="#0a0816" opacity="0.9">
        <ellipse cx="112" cy="314" rx="6" ry="5" />
        <path d="M106,314 Q102,308 106,304 Q112,302 116,308 Z" />
        <path d="M118,308 Q124,304 122,310 L118,312 Z" />
        <path d="M108,317 Q104,322 108,324 L114,320 Z" />
      </g>

      {/* ── Small right corner turret ── */}
      <rect x="600" y="330" width="52" height="70" fill="url(#hwCastleGrad3)" />
      <polygon
        points="597,330 626,278 652,330"
        fill="#0f0c1c"
        stroke="#1e1830"
        strokeWidth="1.5"
      />
      <g fill="#0c0918">
        <rect x="595" y="327" width="11" height="13" />
        <rect x="610" y="327" width="11" height="13" />
        <rect x="626" y="327" width="11" height="13" />
        <rect x="642" y="327" width="11" height="13" />
      </g>
      {/* Gargoyle on right */}
      <g fill="#0a0816" opacity="0.9">
        <ellipse cx="648" cy="326" rx="6" ry="5" />
        <path d="M642,326 Q638,320 642,316 Q648,314 652,320 Z" />
        <path d="M654,318 Q660,314 658,322 L654,324 Z" />
      </g>

      {/* ── Castle main battlements (roof line) ── */}
      <g fill="#0c0918">
        <rect x="176" y="355" width="18" height="22" />
        <rect x="200" y="355" width="18" height="22" />
        <rect x="224" y="355" width="18" height="22" />
        <rect x="248" y="355" width="18" height="22" />
        <rect x="290" y="355" width="18" height="22" />
        <rect x="314" y="355" width="18" height="22" />
        <rect x="430" y="355" width="18" height="22" />
        <rect x="454" y="355" width="18" height="22" />
        <rect x="478" y="355" width="18" height="22" />
        <rect x="502" y="355" width="18" height="22" />
        <rect x="540" y="355" width="18" height="22" />
        <rect x="564" y="355" width="18" height="22" />
      </g>

      {/* ── Central gate / portcullis ── */}
      <path
        d="M316,580 Q316,516 380,510 Q444,516 444,580 L444,580 L316,580 Z"
        fill="#04020c"
        stroke="#1a1530"
        strokeWidth="2"
      />
      {/* Gate iron bars */}
      <g stroke="#10101a" strokeWidth="2" opacity="0.75">
        <line x1="333" y1="516" x2="333" y2="580" />
        <line x1="349" y1="513" x2="349" y2="580" />
        <line x1="365" y1="511" x2="365" y2="580" />
        <line x1="380" y1="510" x2="380" y2="580" />
        <line x1="396" y1="511" x2="396" y2="580" />
        <line x1="412" y1="513" x2="412" y2="580" />
        <line x1="428" y1="516" x2="428" y2="580" />
        <line x1="317" y1="532" x2="443" y2="532" />
        <line x1="317" y1="550" x2="443" y2="550" />
        <line x1="317" y1="566" x2="443" y2="566" />
      </g>
      {/* Gate arch stone surround */}
      <path
        d="M310,580 Q310,510 380,505 Q450,510 450,580"
        fill="none"
        stroke="#2a2440"
        strokeWidth="4"
      />
      <path
        d="M306,580 Q306,506 380,500 Q454,506 454,580"
        fill="none"
        stroke="#222038"
        strokeWidth="2"
      />

      {/* ── Gothic arched windows with amber glow ── */}
      {/* Left wing window 1 */}
      <path
        d="M228,408 Q228,388 242,385 Q256,388 256,408 L256,432 L228,432 Z"
        fill="#04020c"
      />
      <path
        d="M230,410 Q230,392 242,389 Q254,392 254,410 L254,430 L230,430 Z"
        fill="url(#hwWinGlow)"
        opacity="0.8"
        filter="url(#hwGlowMd)"
      />
      {/* Stone surround left win 1 */}
      <path
        d="M226,432 L226,408 Q226,382 242,378 Q258,382 258,408 L258,432"
        fill="none"
        stroke="#302a48"
        strokeWidth="2.5"
      />
      {/* Left wing window 2 */}
      <path
        d="M268,418 Q268,400 280,397 Q292,400 292,418 L292,440 L268,440 Z"
        fill="#04020c"
      />
      <path
        d="M270,420 Q270,402 280,399 Q290,402 290,420 L290,438 L270,438 Z"
        fill="url(#hwWinGlow)"
        opacity="0.7"
        filter="url(#hwGlowMd)"
      />
      <path
        d="M266,440 L266,418 Q266,394 280,390 Q294,394 294,418 L294,440"
        fill="none"
        stroke="#302a48"
        strokeWidth="2"
      />
      {/* Right wing window 1 */}
      <path
        d="M466,402 Q466,382 480,378 Q494,382 494,402 L494,428 L466,428 Z"
        fill="#04020c"
      />
      <path
        d="M468,404 Q468,385 480,381 Q492,385 492,404 L492,426 L468,426 Z"
        fill="url(#hwWinGlow)"
        opacity="0.8"
        filter="url(#hwGlowMd)"
      />
      <path
        d="M464,428 L464,402 Q464,376 480,372 Q496,376 496,402 L496,428"
        fill="none"
        stroke="#302a48"
        strokeWidth="2.5"
      />
      {/* Right wing window 2 */}
      <path
        d="M502,412 Q502,395 514,392 Q526,395 526,412 L526,436 L502,436 Z"
        fill="#04020c"
      />
      <path
        d="M504,414 Q504,397 514,394 Q524,397 524,414 L524,434 L504,434 Z"
        fill="url(#hwWinGlow)"
        opacity="0.7"
        filter="url(#hwGlowMd)"
      />
      <path
        d="M500,436 L500,412 Q500,388 514,384 Q528,388 528,412 L528,436"
        fill="none"
        stroke="#302a48"
        strokeWidth="2"
      />
      {/* Centre tall windows */}
      <path
        d="M350,338 Q350,315 366,311 Q382,315 382,338 L382,368 L350,368 Z"
        fill="#04020c"
      />
      <path
        d="M352,340 Q352,318 366,314 Q380,318 380,340 L380,366 L352,366 Z"
        fill="url(#hwWinGlow)"
        opacity="0.9"
        filter="url(#hwGlowMd)"
      />
      <path
        d="M348,368 L348,338 Q348,308 366,304 Q384,308 384,338 L384,368"
        fill="none"
        stroke="#302a48"
        strokeWidth="3"
      />
      <path
        d="M390,342 Q390,320 404,316 Q418,320 418,342 L418,370 L390,370 Z"
        fill="#04020c"
      />
      <path
        d="M392,344 Q392,322 404,318 Q416,322 416,344 L416,368 L392,368 Z"
        fill="url(#hwWinGlow)"
        opacity="0.85"
        filter="url(#hwGlowMd)"
      />
      <path
        d="M388,370 L388,342 Q388,312 404,308 Q420,312 420,342 L420,370"
        fill="none"
        stroke="#302a48"
        strokeWidth="3"
      />
      {/* Upper centre spire window */}
      <path
        d="M368,248 Q368,236 380,232 Q392,236 392,248 L392,268 L368,268 Z"
        fill="#04020c"
      />
      <path
        d="M370,250 Q370,238 380,234 Q390,238 390,250 L390,266 L370,266 Z"
        fill="url(#hwWinGlow)"
        opacity="0.9"
        filter="url(#hwGlowMd)"
      />
      {/* Small left tower window */}
      <path
        d="M175,280 Q175,266 187,262 Q199,266 199,280 L199,300 L175,300 Z"
        fill="#04020c"
      />
      <path
        d="M177,282 Q177,268 187,264 Q197,268 197,282 L197,298 L177,298 Z"
        fill="url(#hwWinGlow)"
        opacity="0.75"
        filter="url(#hwGlow)"
      />
      {/* Small right tower window */}
      <path
        d="M543,300 Q543,288 555,284 Q567,288 567,300 L567,318 L543,318 Z"
        fill="#04020c"
      />
      <path
        d="M545,302 Q545,290 555,286 Q565,290 565,302 L565,316 L545,316 Z"
        fill="url(#hwWinGlow)"
        opacity="0.75"
        filter="url(#hwGlow)"
      />

      {/* ── Ivy vines on castle walls ── */}
      <g stroke="#0c1808" strokeWidth="1.8" fill="none" opacity="0.65">
        <path d="M180,360 Q185,340 182,318 Q178,296 182,272 Q186,250 182,228" />
        <path d="M180,340 Q192,326 190,310 Q194,294 190,278" />
        <path d="M580,370 Q575,350 578,328 Q574,308 577,286" />
        <path d="M580,350 Q570,336 573,320 Q569,304 572,288" />
      </g>
      {/* Ivy leaves */}
      <g fill="#0c1808" opacity="0.55">
        {(
          [
            [182, 330],
            [186, 305],
            [180, 278],
            [191, 345],
            [183, 290],
          ] as [number, number][]
        ).map(([x, y]) => (
          <ellipse
            key={`ivy-l-${x}-${y}`}
            cx={x}
            cy={y}
            rx="5"
            ry="3"
            transform={`rotate(${((x * 17 + y * 7) % 80) - 40} ${x} ${y})`}
          />
        ))}
        {(
          [
            [575, 342],
            [578, 316],
            [576, 290],
            [572, 360],
            [580, 304],
          ] as [number, number][]
        ).map(([x, y]) => (
          <ellipse
            key={`ivy-r-${x}-${y}`}
            cx={x}
            cy={y}
            rx="4"
            ry="2.5"
            transform={`rotate(${((x * 13 + y * 11) % 90) - 45} ${x} ${y})`}
          />
        ))}
      </g>

      {/* ═══════════════════════════════════════════
          DARK ROLLING HILLS + MIDGROUND
      ═══════════════════════════════════════════ */}
      <path
        d="M0,555 Q120,520 250,532 Q380,545 500,522 Q620,500 760,514 Q900,528 1040,510 Q1110,500 1200,516 L1200,800 L0,800 Z"
        fill="#080514"
      />
      <path
        d="M0,598 Q80,568 200,580 Q340,592 460,570 Q590,548 720,562 Q850,576 980,558 Q1080,544 1200,555 L1200,800 L0,800 Z"
        fill="#060410"
      />

      {/* ── Castle flanking bare dead trees ── */}
      <g stroke="#100e1e" fill="none">
        {/* Left flanking tree */}
        <path
          d="M105,570 Q108,538 106,505 Q103,472 106,440 Q109,410 105,380 Q101,350 104,318"
          strokeWidth="2.8"
        />
        <path d="M106,440 Q88,424 78,408" strokeWidth="1.8" />
        <path d="M106,455 Q84,442 72,430" strokeWidth="1.8" />
        <path d="M106,470 Q88,460 78,450" strokeWidth="1.5" />
        <path d="M104,410 Q120,394 128,378" strokeWidth="1.8" />
        <path d="M104,425 Q122,412 130,398" strokeWidth="1.5" />
        <path d="M104,380 Q96,360 92,344" strokeWidth="1.5" />
        <path d="M104,380 Q114,358 120,342" strokeWidth="1.5" />
        <path d="M78,408 Q66,398 60,386" strokeWidth="1.2" />
        <path d="M128,378 Q136,364 140,352" strokeWidth="1.2" />
        {/* Right flanking tree */}
        <path
          d="M658,578 Q654,544 656,510 Q660,476 656,442 Q652,408 655,374 Q658,342 654,312"
          strokeWidth="2.5"
        />
        <path d="M655,450 Q672,434 684,420" strokeWidth="1.6" />
        <path d="M655,466 Q674,454 686,442" strokeWidth="1.6" />
        <path d="M655,480 Q670,470 680,460" strokeWidth="1.4" />
        <path d="M654,420 Q638,404 630,390" strokeWidth="1.6" />
        <path d="M654,435 Q640,422 633,408" strokeWidth="1.4" />
        <path d="M654,374 Q648,354 644,338" strokeWidth="1.4" />
        <path d="M654,374 Q662,352 668,336" strokeWidth="1.4" />
      </g>

      {/* ── Midground twisted dead trees ── */}
      <g stroke="#18142a" fill="none" opacity="0.8">
        <path
          d="M72,590 Q74,558 72,526 Q70,494 73,462 Q76,432 72,404"
          strokeWidth="2.2"
        />
        <path d="M72,462 Q55,448 46,434" strokeWidth="1.5" />
        <path d="M72,478 Q53,466 44,454" strokeWidth="1.5" />
        <path d="M73,444 Q88,430 95,418" strokeWidth="1.5" />
        <path d="M73,458 Q90,446 97,432" strokeWidth="1.4" />
        <path d="M72,404 Q66,386 62,370" strokeWidth="1.4" />
        <path d="M72,404 Q78,384 82,368" strokeWidth="1.4" />
        <path
          d="M1100,585 Q1098,554 1100,522 Q1102,490 1099,460"
          strokeWidth="2.2"
        />
        <path d="M1099,500 Q1082,486 1074,472" strokeWidth="1.5" />
        <path d="M1099,518 Q1080,506 1072,494" strokeWidth="1.5" />
        <path d="M1100,480 Q1116,466 1124,452" strokeWidth="1.5" />
        <path d="M1099,460 Q1093,442 1090,426" strokeWidth="1.4" />
        <path d="M1099,460 Q1106,440 1110,424" strokeWidth="1.4" />
        <path d="M780,598 Q776,566 778,534 Q780,504 776,475" strokeWidth="2" />
        <path d="M777,510 Q762,496 755,482" strokeWidth="1.4" />
        <path d="M777,526 Q760,514 752,502" strokeWidth="1.4" />
        <path d="M776,490 Q791,476 798,462" strokeWidth="1.4" />
        <path d="M776,475 Q770,456 766,440" strokeWidth="1.3" />
        <path d="M776,475 Q782,455 786,440" strokeWidth="1.3" />
      </g>

      {/* ── Foreground ground / grass ── */}
      <path
        d="M0,638 Q60,614 160,626 Q266,638 390,620 Q508,604 650,614 Q792,624 920,606 Q1042,590 1200,600 L1200,800 L0,800 Z"
        fill="#04020c"
      />

      {/* ── STATIC FOG WISPS ── */}
      <rect
        x="0"
        y="528"
        width="1200"
        height="45"
        fill="url(#hwFogGrad)"
        opacity="0.6"
      />
      <rect
        x="0"
        y="548"
        width="1200"
        height="38"
        fill="url(#hwFogGrad)"
        opacity="0.5"
      />
      <rect
        x="0"
        y="590"
        width="1200"
        height="35"
        fill="url(#hwFogGrad)"
        opacity="0.45"
      />
      <rect
        x="0"
        y="638"
        width="1200"
        height="30"
        fill="url(#hwFogGrad)"
        opacity="0.35"
      />
      <rect
        x="0"
        y="660"
        width="1200"
        height="25"
        fill="url(#hwFogGrad)"
        opacity="0.28"
      />

      {/* ═══════════════════════════════════════════
          GRAVEYARD (foreground)
      ═══════════════════════════════════════════ */}

      {/* Iron fence spanning width — spear-top pickets */}
      <g fill="#0d0b1c" stroke="#181630" strokeWidth="1">
        {/* Left section */}
        {[58, 73, 88, 103, 118, 133, 148].map((x) => (
          <g key={`lf-${x}`}>
            <rect x={x - 2} y="632" width="4" height="58" />
            <polygon points={`${x - 4},632 ${x},618 ${x + 4},632`} />
            <rect x={x - 3} y="628" width="6" height="5" />
          </g>
        ))}
        <rect x="56" y="645" width="96" height="5" rx="1" />
        <rect x="56" y="660" width="96" height="4" rx="1" />
        {/* Right section */}
        {[1040, 1055, 1070, 1085, 1100, 1115, 1130].map((x) => (
          <g key={`rf-${x}`}>
            <rect x={x - 2} y="628" width="4" height="60" />
            <polygon points={`${x - 4},628 ${x},614 ${x + 4},628`} />
            <rect x={x - 3} y="624" width="6" height="5" />
          </g>
        ))}
        <rect x="1038" y="641" width="96" height="5" rx="1" />
        <rect x="1038" y="656" width="96" height="4" rx="1" />
        {/* Wide gate in middle */}
        <rect x="550" y="620" width="5" height="68" />
        <polygon points="546,620 552,605 558,620" />
        <rect x="645" y="620" width="5" height="68" />
        <polygon points="641,620 647,605 653,620" />
        <rect x="548" y="635" width="104" height="4" rx="1" />
        <rect x="548" y="650" width="104" height="4" rx="1" />
      </g>

      {/* ── TOMBSTONES (8 varied) ── */}
      {/* Tombstone 1 — rounded arch */}
      <g transform="translate(195, 668)">
        <path
          d="M-19,0 Q-19,-48 0,-56 Q19,-48 19,0 L19,26 L-19,26 Z"
          fill="#171325"
          stroke="#22203a"
          strokeWidth="1.5"
        />
        <path
          d="M-13,0 Q-13,-40 0,-47 Q13,-40 13,0 L13,4 L-13,4 Z"
          fill="#0f0c1c"
          opacity="0.4"
        />
        {/* Carved decorative border lines */}
        <path
          d="M-15,-42 Q0,-52 15,-42"
          fill="none"
          stroke="#201e38"
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M-14,-35 Q0,-44 14,-35"
          fill="none"
          stroke="#1e1c36"
          strokeWidth="0.8"
          opacity="0.5"
        />
        {/* Crack */}
        <path
          d="M-3,-30 Q1,-18 -2,-5"
          stroke="#2a2848"
          strokeWidth="1.1"
          fill="none"
        />
        {/* Moss */}
        <circle cx="9" cy="-16" r="3.5" fill="#0c1a08" opacity="0.55" />
        <circle cx="-10" cy="-28" r="3" fill="#0c1a08" opacity="0.5" />
        <ellipse
          cx="-5"
          cy="-8"
          rx="4"
          ry="2.5"
          fill="#0c1a08"
          opacity="0.45"
          transform="rotate(15 -5 -8)"
        />
        <text
          x="0"
          y="-14"
          textAnchor="middle"
          fontSize="7"
          fill="#2c2848"
          fontFamily="serif"
        >
          R.I.P
        </text>
      </g>
      {/* Tombstone 2 — rectangle rounded */}
      <g transform="translate(318, 672)">
        <rect
          x="-15"
          y="-56"
          width="30"
          height="74"
          rx="9"
          fill="#151122"
          stroke="#1e1c32"
          strokeWidth="1.5"
        />
        <rect
          x="-11"
          y="-49"
          width="22"
          height="5"
          rx="2"
          fill="#0f0d1c"
          opacity="0.5"
        />
        <rect
          x="-11"
          y="-40"
          width="22"
          height="3"
          rx="1"
          fill="#0f0d1c"
          opacity="0.4"
        />
        <path
          d="M3,-38 Q6,-22 4,-8"
          stroke="#262248"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M-7,-30 Q-5,-18 -6,-8"
          stroke="#262248"
          strokeWidth="0.8"
          fill="none"
        />
        {/* Moss */}
        <circle cx="-8" cy="-22" r="3" fill="#0a1806" opacity="0.5" />
        <circle cx="7" cy="-36" r="2.5" fill="#0a1806" opacity="0.45" />
        <text
          x="0"
          y="-22"
          textAnchor="middle"
          fontSize="8"
          fill="#2a2448"
          fontFamily="serif"
        >
          †
        </text>
        <text
          x="0"
          y="-12"
          textAnchor="middle"
          fontSize="5.5"
          fill="#262244"
          fontFamily="serif"
        >
          REST
        </text>
      </g>
      {/* Tombstone 3 — cross */}
      <g transform="translate(455, 664)">
        <rect
          x="-7"
          y="-66"
          width="14"
          height="84"
          fill="#171325"
          stroke="#22203a"
          strokeWidth="1.5"
        />
        <rect
          x="-22"
          y="-53"
          width="44"
          height="14"
          fill="#171325"
          stroke="#22203a"
          strokeWidth="1.5"
        />
        <rect
          x="-5"
          y="-44"
          width="10"
          height="62"
          fill="#100e1e"
          opacity="0.3"
        />
        <path
          d="M1,-58 Q3,-44 1,-30"
          stroke="#2a2848"
          strokeWidth="0.9"
          fill="none"
        />
        {/* Skull & crossbones carved */}
        <circle
          cx="0"
          cy="-44"
          r="4.5"
          fill="none"
          stroke="#201e3a"
          strokeWidth="1"
        />
        <line
          x1="-4"
          y1="-38"
          x2="4"
          y2="-30"
          stroke="#201e3a"
          strokeWidth="0.8"
        />
        <line
          x1="4"
          y1="-38"
          x2="-4"
          y2="-30"
          stroke="#201e3a"
          strokeWidth="0.8"
        />
      </g>
      {/* Tombstone 4 — wide slab */}
      <g transform="translate(572, 675)">
        <rect
          x="-24"
          y="-42"
          width="48"
          height="58"
          rx="3"
          fill="#151122"
          stroke="#1e1c32"
          strokeWidth="1.5"
        />
        <rect
          x="-20"
          y="-38"
          width="40"
          height="4"
          fill="#1e1c32"
          opacity="0.5"
        />
        <rect
          x="-20"
          y="-30"
          width="40"
          height="2"
          fill="#1e1c32"
          opacity="0.35"
        />
        <path
          d="M-6,-28 Q-3,-14 -5,-4"
          stroke="#262248"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M8,-25 Q10,-12 9,-2"
          stroke="#262248"
          strokeWidth="0.8"
          fill="none"
        />
        {/* Skull carved */}
        <circle
          cx="-12"
          cy="-16"
          r="4"
          fill="none"
          stroke="#201e38"
          strokeWidth="0.9"
        />
        <ellipse
          cx="-12"
          cy="-13"
          rx="3"
          ry="2"
          fill="none"
          stroke="#201e38"
          strokeWidth="0.7"
        />
        {/* Moss patches */}
        <ellipse
          cx="12"
          cy="-14"
          rx="6"
          ry="3.5"
          fill="#0a1806"
          opacity="0.5"
          transform="rotate(20 12 -14)"
        />
        <ellipse
          cx="-18"
          cy="-6"
          rx="4"
          ry="2.5"
          fill="#0a1806"
          opacity="0.45"
          transform="rotate(-15 -18 -6)"
        />
        <text
          x="0"
          y="-18"
          textAnchor="middle"
          fontSize="6"
          fill="#2c2848"
          fontFamily="serif"
        >
          RIP
        </text>
        <text
          x="0"
          y="-9"
          textAnchor="middle"
          fontSize="5"
          fill="#262244"
          fontFamily="serif"
        >
          1765
        </text>
      </g>
      {/* Tombstone 5 — tall pointed */}
      <g transform="translate(716, 660)">
        <path
          d="M-13,-65 L0,-84 L13,-65 L13,20 L-13,20 Z"
          fill="#171325"
          stroke="#22203a"
          strokeWidth="1.5"
        />
        <path
          d="M-9,-58 L0,-74 L9,-58 L9,16 L-9,16 Z"
          fill="#100e1e"
          opacity="0.28"
        />
        <path
          d="M-2,-52 Q1,-34 -1,-12"
          stroke="#262448"
          strokeWidth="1.1"
          fill="none"
        />
        <circle cx="7" cy="-30" r="3" fill="#0a1806" opacity="0.5" />
        <circle cx="-7" cy="-46" r="2.5" fill="#0a1806" opacity="0.45" />
        <text
          x="0"
          y="-28"
          textAnchor="middle"
          fontSize="6"
          fill="#2c2848"
          fontFamily="serif"
        >
          R.I.P
        </text>
      </g>
      {/* Tombstone 6 — leaning, mossy */}
      <g transform="translate(838, 670) rotate(-5)">
        <rect
          x="-15"
          y="-50"
          width="30"
          height="66"
          rx="6"
          fill="#151122"
          stroke="#1e1c32"
          strokeWidth="1.5"
        />
        <path d="M-15,-50 Q0,-58 15,-50 Z" fill="#171325" />
        <path
          d="M-3,-37 Q2,-22 -1,-8"
          stroke="#262448"
          strokeWidth="1"
          fill="none"
        />
        {/* Heavy moss */}
        <ellipse
          cx="-7"
          cy="-24"
          rx="7"
          ry="4"
          fill="#0a1806"
          opacity="0.55"
          transform="rotate(-12 -7 -24)"
        />
        <ellipse
          cx="5"
          cy="-38"
          rx="5"
          ry="3"
          fill="#0a1806"
          opacity="0.48"
          transform="rotate(20 5 -38)"
        />
        <ellipse
          cx="8"
          cy="-10"
          rx="6"
          ry="3.5"
          fill="#0a1806"
          opacity="0.45"
          transform="rotate(-8 8 -10)"
        />
        <text
          x="0"
          y="-18"
          textAnchor="middle"
          fontSize="6"
          fill="#2c2848"
          fontFamily="serif"
        >
          †
        </text>
      </g>
      {/* Tombstone 7 — cracked broken top */}
      <g transform="translate(950, 665)">
        <rect
          x="-16"
          y="-52"
          width="32"
          height="68"
          rx="4"
          fill="#151122"
          stroke="#1e1c32"
          strokeWidth="1.5"
        />
        {/* Broken top piece */}
        <path
          d="M-16,-52 Q-6,-64 4,-52 L-16,-52 Z"
          fill="#171325"
          stroke="#22203a"
          strokeWidth="1.5"
        />
        {/* Large crack diagonal */}
        <path
          d="M-4,-46 Q3,-30 -2,-16 Q4,-4 0,10"
          stroke="#2e2850"
          strokeWidth="1.6"
          fill="none"
        />
        <path
          d="M-4,-46 Q-10,-34 -6,-22"
          stroke="#2e2850"
          strokeWidth="0.9"
          fill="none"
        />
        {/* Moss */}
        <ellipse
          cx="9"
          cy="-16"
          rx="8"
          ry="4.5"
          fill="#0a1806"
          opacity="0.5"
          transform="rotate(10 9 -16)"
        />
        <ellipse cx="-10" cy="-5" rx="5" ry="3" fill="#0a1806" opacity="0.42" />
        <text
          x="0"
          y="-24"
          textAnchor="middle"
          fontSize="5.5"
          fill="#2a2448"
          fontFamily="serif"
        >
          LOST
        </text>
      </g>
      {/* Tombstone 8 — obelisk with skull & crossbones */}
      <g transform="translate(1060, 658) rotate(2)">
        <polygon
          points="-11,-80 11,-80 15,20 -15,20"
          fill="#171325"
          stroke="#22203a"
          strokeWidth="1.5"
        />
        <polygon
          points="-7,-76 7,-76 -7,-62 7,-62"
          fill="#100e1e"
          opacity="0.22"
        />
        <path
          d="M2,-62 Q5,-44 3,-22"
          stroke="#262448"
          strokeWidth="1"
          fill="none"
        />
        {/* Skull & crossbones carving */}
        <circle
          cx="0"
          cy="-52"
          r="6"
          fill="none"
          stroke="#201e3a"
          strokeWidth="1.1"
        />
        <circle cx="-2" cy="-56" r="1.5" fill="#201e3a" opacity="0.7" />
        <circle cx="2" cy="-56" r="1.5" fill="#201e3a" opacity="0.7" />
        <path d="M-6,-44" fill="none" />
        <line
          x1="-7"
          y1="-44"
          x2="7"
          y2="-36"
          stroke="#201e3a"
          strokeWidth="1"
        />
        <line
          x1="7"
          y1="-44"
          x2="-7"
          y2="-36"
          stroke="#201e3a"
          strokeWidth="1"
        />
        <text
          x="0"
          y="-20"
          textAnchor="middle"
          fontSize="5.5"
          fill="#2a2448"
          fontFamily="serif"
        >
          1802
        </text>
      </g>

      {/* ── Large dead trees in graveyard ── */}
      <g stroke="#120f22" fill="none">
        {/* Tree 1 — far left */}
        <path
          d="M38,800 Q40,762 38,720 Q36,680 39,640 Q42,600 38,558 Q34,516 38,478"
          strokeWidth="14"
        />
        <path d="M39,620 Q14,598 2,574" strokeWidth="7" />
        <path d="M39,648 Q10,628 -2,608" strokeWidth="6" />
        <path d="M39,675 Q16,660 5,645" strokeWidth="5" />
        <path d="M38,590 Q62,568 74,548" strokeWidth="7" />
        <path d="M38,614 Q64,596 76,578" strokeWidth="6" />
        <path d="M38,548 Q30,522 26,500" strokeWidth="5" />
        <path d="M38,548 Q48,520 54,498" strokeWidth="5" />
        <path d="M14,574 Q2,560 -5,546" strokeWidth="4" />
        <path d="M14,574 Q8,558 6,542" strokeWidth="3.5" />
        <path d="M2,574 Q-6,562 -8,550" strokeWidth="3" />
        <path d="M74,548 Q82,534 86,520" strokeWidth="4" />
        <path d="M74,548 Q80,530 82,514" strokeWidth="3.5" />
        <path d="M54,498 Q60,480 64,464" strokeWidth="3.5" />
        <path d="M54,498 Q48,476 46,460" strokeWidth="3" />
        {/* Tree 2 — right side */}
        <path
          d="M1175,800 Q1172,760 1174,718 Q1176,678 1172,638 Q1168,598 1172,558 Q1176,518 1172,480"
          strokeWidth="15"
        />
        <path d="M1172,640 Q1196,618 1205,596" strokeWidth="7" />
        <path d="M1172,668 Q1200,648 1208,626" strokeWidth="7" />
        <path d="M1172,695 Q1194,678 1202,660" strokeWidth="5.5" />
        <path d="M1172,610 Q1148,588 1138,568" strokeWidth="7" />
        <path d="M1172,635 Q1146,616 1136,596" strokeWidth="6" />
        <path d="M1172,558 Q1164,532 1160,508" strokeWidth="5" />
        <path d="M1172,558 Q1182,530 1186,508" strokeWidth="5" />
        <path d="M1205,596 Q1212,580 1214,565" strokeWidth="4" />
        <path d="M1205,596 Q1216,580 1218,565" strokeWidth="3.5" />
        <path d="M1138,568 Q1130,552 1128,538" strokeWidth="4" />
        <path d="M1138,568 Q1132,550 1130,535" strokeWidth="3.5" />
        <path d="M1186,508 Q1192,490 1194,474" strokeWidth="3.5" />
        <path d="M1160,508 Q1152,490 1149,474" strokeWidth="3.5" />
        {/* Tree 3 — centre left */}
        <path
          d="M310,800 Q312,762 310,722 Q308,684 311,648 Q314,612 310,578"
          strokeWidth="11"
        />
        <path d="M310,652 Q288,632 278,614" strokeWidth="5.5" />
        <path d="M310,676 Q286,658 276,640" strokeWidth="5" />
        <path d="M311,628 Q330,608 340,590" strokeWidth="5.5" />
        <path d="M311,648 Q332,630 342,614" strokeWidth="5" />
        <path d="M310,578 Q302,558 298,540" strokeWidth="4.5" />
        <path d="M310,578 Q320,556 324,540" strokeWidth="4.5" />
        <path d="M278,614 Q266,600 262,585" strokeWidth="3.5" />
        <path d="M340,590 Q348,576 350,562" strokeWidth="3.5" />
        <path d="M324,540 Q330,522 332,507" strokeWidth="3.5" />
        <path d="M298,540 Q290,522 288,507" strokeWidth="3" />
      </g>

      {/* ── Open grave pits and dirt mounds ── */}
      <ellipse
        cx="264"
        cy="710"
        rx="40"
        ry="10"
        fill="#07050e"
        stroke="#100d1c"
        strokeWidth="1.5"
      />
      <path
        d="M224,707 Q264,696 304,707 Q304,704 264,701 Q224,704 224,707 Z"
        fill="#0d0a18"
      />
      <ellipse cx="312" cy="710" rx="18" ry="7" fill="#100e1c" />
      <ellipse cx="214" cy="709" rx="14" ry="5.5" fill="#100e1c" />
      <ellipse
        cx="875"
        cy="714"
        rx="38"
        ry="10"
        fill="#070510"
        stroke="#0e0c1a"
        strokeWidth="1.5"
      />
      <path
        d="M837,711 Q875,700 913,711 Q913,708 875,705 Q837,708 837,711 Z"
        fill="#0d0a18"
      />
      <ellipse cx="920" cy="714" rx="16" ry="6" fill="#0e0c1c" />
      <ellipse cx="826" cy="712" rx="13" ry="5" fill="#0e0c1c" />

      {/* ── Skeletal hands emerging from ground ── */}
      {/* Hand 1 */}
      <g
        transform="translate(248, 696)"
        fill="#cec898"
        stroke="#a09870"
        strokeWidth="0.8"
      >
        <path
          d="M0,0 Q1,-18 0,-30 Q-1,-40 1,-50"
          strokeWidth="3"
          stroke="#c8c090"
          fill="none"
        />
        <path
          d="M0,-28 Q-5,-36 -6,-46"
          strokeWidth="2.2"
          stroke="#c8c090"
          fill="none"
        />
        <path
          d="M0,-28 Q3,-37 4,-48"
          strokeWidth="2.2"
          stroke="#c8c090"
          fill="none"
        />
        <path
          d="M0,-26 Q6,-32 8,-42"
          strokeWidth="2"
          stroke="#c8c090"
          fill="none"
        />
        <path
          d="M0,-26 Q-7,-30 -9,-40"
          strokeWidth="2"
          stroke="#c8c090"
          fill="none"
        />
        <circle cx="1" cy="-30" r="2.5" fill="#cec898" />
        <circle cx="-5" cy="-38" r="2" fill="#cec898" />
        <circle cx="3" cy="-38" r="2" fill="#cec898" />
        <circle cx="7" cy="-34" r="1.8" fill="#cec898" />
      </g>
      {/* Hand 2 */}
      <g
        transform="translate(860, 702)"
        fill="#c8c290"
        stroke="#9c9068"
        strokeWidth="0.8"
      >
        <path
          d="M0,0 Q-1,-16 0,-26 Q1,-36 -1,-45"
          strokeWidth="3"
          stroke="#c0ba88"
          fill="none"
        />
        <path
          d="M0,-25 Q-4,-33 -5,-42"
          strokeWidth="2.2"
          stroke="#c0ba88"
          fill="none"
        />
        <path
          d="M0,-25 Q4,-34 5,-44"
          strokeWidth="2.2"
          stroke="#c0ba88"
          fill="none"
        />
        <path
          d="M0,-24 Q7,-30 9,-39"
          strokeWidth="2"
          stroke="#c0ba88"
          fill="none"
        />
        <circle cx="0" cy="-26" r="2.5" fill="#c8c290" />
        <circle cx="-4" cy="-34" r="2" fill="#c8c290" />
        <circle cx="4" cy="-35" r="2" fill="#c8c290" />
        <circle cx="8" cy="-31" r="1.8" fill="#c8c290" />
      </g>

      {/* ── Dark shrubs and bushes ── */}
      <g fill="#090815" stroke="#131020" strokeWidth="1">
        <g transform="translate(155, 692)">
          <circle cx="0" cy="0" r="16" />
          <circle cx="-12" cy="4" r="12" />
          <circle cx="11" cy="3" r="13" />
          <circle cx="-4" cy="-10" r="10" />
        </g>
        <g transform="translate(1010, 690)">
          <circle cx="0" cy="0" r="14" />
          <circle cx="-10" cy="3" r="11" />
          <circle cx="9" cy="2" r="12" />
        </g>
        <g transform="translate(745, 697)">
          <circle cx="0" cy="0" r="12" />
          <circle cx="-9" cy="3" r="9" />
          <circle cx="8" cy="2" r="10" />
        </g>
        <g transform="translate(400, 700)">
          <circle cx="0" cy="0" r="11" />
          <circle cx="-8" cy="3" r="8" />
          <circle cx="7" cy="2" r="9" />
        </g>
      </g>
      {/* Small rocks */}
      <g fill="#0c0a1a" stroke="#151328" strokeWidth="0.8">
        <ellipse cx="145" cy="722" rx="12" ry="5" />
        <ellipse cx="162" cy="726" rx="8" ry="3.5" />
        <ellipse cx="644" cy="720" rx="10" ry="4" />
        <ellipse cx="1082" cy="724" rx="11" ry="4.5" />
        <ellipse cx="1098" cy="728" rx="7" ry="3" />
        <ellipse cx="784" cy="717" rx="9" ry="3.5" />
      </g>

      {/* ═══════════════════════════════════════════
          PUMPKINS — static warm glow
      ═══════════════════════════════════════════ */}

      {/* Pumpkin 1 — large, foreground left */}
      <g transform="translate(192, 692)">
        {/* Static glow halo */}
        <ellipse
          cx="0"
          cy="8"
          rx="52"
          ry="32"
          fill="url(#hwPumpGlowBig)"
          filter="url(#hwGlowLg)"
        />
        {/* Curly stem */}
        <path
          d="M-2,-46 Q8,-54 6,-36"
          stroke="#2a4810"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <rect
          x="-4"
          y="-46"
          width="8"
          height="16"
          rx="3.5"
          fill="#2a4810"
          stroke="#1c3008"
          strokeWidth="1"
        />
        {/* Body with ridge segments */}
        <ellipse
          cx="0"
          cy="0"
          rx="36"
          ry="31"
          fill="url(#hwPump1)"
          stroke="#5a2800"
          strokeWidth="1.5"
        />
        <path
          d="M-12,-27 Q-15,0 -12,27"
          stroke="#6a2e00"
          strokeWidth="2.2"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M12,-27 Q15,0 12,27"
          stroke="#6a2e00"
          strokeWidth="2.2"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M-24,-16 Q-28,0 -24,16"
          stroke="#6a2e00"
          strokeWidth="1.8"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M24,-16 Q28,0 24,16"
          stroke="#6a2e00"
          strokeWidth="1.8"
          fill="none"
          opacity="0.5"
        />
        {/* Inner amber light */}
        <ellipse cx="0" cy="3" rx="28" ry="23" fill="url(#hwPumpGlow1)" />
        {/* Menacing eyes */}
        <path d="M-19,-9 L-8,-9 L-13,4 Z" fill="#04000a" />
        <path d="M8,-9 L19,-9 L13,4 Z" fill="#04000a" />
        <path
          d="M-19,-9 L-8,-9 L-13,4 Z"
          fill="#ffcc44"
          opacity="0.45"
          filter="url(#hwGlowMd)"
        />
        <path
          d="M8,-9 L19,-9 L13,4 Z"
          fill="#ffcc44"
          opacity="0.45"
          filter="url(#hwGlowMd)"
        />
        {/* Jagged mouth */}
        <path
          d="M-19,10 L-14,6 L-8,13 L-3,6 L3,13 L8,6 L14,13 L19,10"
          stroke="#04000a"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M-14,6 L-8,13 L-8,6 Z M-3,6 L3,13 L3,6 Z M8,6 L14,13 L14,6 Z"
          fill="#ffaa22"
          opacity="0.4"
        />
        {/* Nose */}
        <path d="M-4,0 L0,-5 L4,0 L0,4 Z" fill="#04000a" />
      </g>

      {/* Pumpkin 2 — medium, surprised face */}
      <g transform="translate(418, 600)">
        <ellipse
          cx="0"
          cy="6"
          rx="35"
          ry="20"
          fill="url(#hwPumpGlow2)"
          filter="url(#hwGlowLg)"
        />
        <path
          d="M1,-36 Q10,-44 8,-28"
          stroke="#2a4810"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <rect
          x="-3"
          y="-37"
          width="6"
          height="12"
          rx="2.5"
          fill="#2a4810"
          stroke="#1c3008"
          strokeWidth="0.8"
        />
        <ellipse
          cx="0"
          cy="0"
          rx="27"
          ry="23"
          fill="url(#hwPump2)"
          stroke="#4a2200"
          strokeWidth="1.2"
        />
        <path
          d="M-10,-21 Q-12,0 -10,21"
          stroke="#5a2a00"
          strokeWidth="1.6"
          fill="none"
          opacity="0.55"
        />
        <path
          d="M10,-21 Q12,0 10,21"
          stroke="#5a2a00"
          strokeWidth="1.6"
          fill="none"
          opacity="0.55"
        />
        <path
          d="M-20,-10 Q-22,0 -20,10"
          stroke="#5a2a00"
          strokeWidth="1.2"
          fill="none"
          opacity="0.45"
        />
        <path
          d="M20,-10 Q22,0 20,10"
          stroke="#5a2a00"
          strokeWidth="1.2"
          fill="none"
          opacity="0.45"
        />
        <ellipse cx="0" cy="3" rx="21" ry="17" fill="url(#hwPumpGlow2)" />
        {/* Surprised eyes — circles */}
        <ellipse cx="-9" cy="-5" rx="5.5" ry="7" fill="#04000a" />
        <ellipse cx="9" cy="-5" rx="5.5" ry="7" fill="#04000a" />
        <ellipse
          cx="-9"
          cy="-5"
          rx="3.5"
          ry="5"
          fill="#ffcc44"
          opacity="0.42"
          filter="url(#hwGlow)"
        />
        <ellipse
          cx="9"
          cy="-5"
          rx="3.5"
          ry="5"
          fill="#ffcc44"
          opacity="0.42"
          filter="url(#hwGlow)"
        />
        {/* Surprised O-mouth */}
        <ellipse cx="0" cy="11" rx="7" ry="6.5" fill="#04000a" />
        <ellipse
          cx="0"
          cy="11"
          rx="5"
          ry="4.5"
          fill="#ffaa22"
          opacity="0.38"
          filter="url(#hwGlow)"
        />
      </g>

      {/* Pumpkin 3 — small classic near centre */}
      <g transform="translate(537, 714)">
        <ellipse
          cx="0"
          cy="5"
          rx="24"
          ry="14"
          fill="url(#hwPumpGlow1)"
          filter="url(#hwGlowLg)"
        />
        <rect
          x="-2.5"
          y="-28"
          width="5"
          height="10"
          rx="2"
          fill="#2a4810"
          stroke="#1c3008"
          strokeWidth="0.8"
        />
        <ellipse
          cx="0"
          cy="0"
          rx="19"
          ry="16"
          fill="url(#hwPump3)"
          stroke="#4a2200"
          strokeWidth="1"
        />
        <path
          d="M-7,-14 Q-8,0 -7,14"
          stroke="#5a2a00"
          strokeWidth="1.2"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M7,-14 Q8,0 7,14"
          stroke="#5a2a00"
          strokeWidth="1.2"
          fill="none"
          opacity="0.5"
        />
        <ellipse cx="0" cy="2" rx="14" ry="11" fill="url(#hwPumpGlow1)" />
        <path d="M-10,-5 L-4,-5 L-7,3 Z" fill="#04000a" />
        <path d="M4,-5 L10,-5 L7,3 Z" fill="#04000a" />
        <path
          d="M-10,-5 L-4,-5 L-7,3 Z"
          fill="#ffcc44"
          opacity="0.44"
          filter="url(#hwGlow)"
        />
        <path
          d="M4,-5 L10,-5 L7,3 Z"
          fill="#ffcc44"
          opacity="0.44"
          filter="url(#hwGlow)"
        />
        <path
          d="M-8,8 Q0,14 8,8"
          stroke="#04000a"
          strokeWidth="1.5"
          fill="none"
        />
        <path d="M-6,8 Q0,12 6,8" fill="#ffaa22" opacity="0.35" />
      </g>

      {/* Pumpkin 4 — taller, crescent eyes */}
      <g transform="translate(775, 648)">
        <ellipse
          cx="0"
          cy="7"
          rx="38"
          ry="24"
          fill="url(#hwPumpGlowBig)"
          filter="url(#hwGlowLg)"
        />
        <path
          d="M2,-40 Q13,-48 11,-32"
          stroke="#2a4810"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <rect
          x="-3.5"
          y="-40"
          width="7"
          height="14"
          rx="3"
          fill="#2a4810"
          stroke="#1c3008"
          strokeWidth="1"
        />
        <ellipse
          cx="0"
          cy="0"
          rx="29"
          ry="30"
          fill="url(#hwPump1)"
          stroke="#5a2800"
          strokeWidth="1.2"
        />
        <path
          d="M-11,-26 Q-13,0 -11,26"
          stroke="#6a2e00"
          strokeWidth="1.8"
          fill="none"
          opacity="0.55"
        />
        <path
          d="M11,-26 Q13,0 11,26"
          stroke="#6a2e00"
          strokeWidth="1.8"
          fill="none"
          opacity="0.55"
        />
        <path
          d="M-21,-15 Q-23,0 -21,15"
          stroke="#6a2e00"
          strokeWidth="1.4"
          fill="none"
          opacity="0.45"
        />
        <path
          d="M21,-15 Q23,0 21,15"
          stroke="#6a2e00"
          strokeWidth="1.4"
          fill="none"
          opacity="0.45"
        />
        <ellipse cx="0" cy="4" rx="23" ry="22" fill="url(#hwPumpGlow2)" />
        {/* Crescent eyes */}
        <path d="M-15,-8 Q-10,-17 -5,-8 Q-10,-3 -15,-8 Z" fill="#04000a" />
        <path d="M5,-8 Q10,-17 15,-8 Q10,-3 5,-8 Z" fill="#04000a" />
        <path
          d="M-15,-8 Q-10,-17 -5,-8 Q-10,-3 -15,-8 Z"
          fill="#ffcc44"
          opacity="0.45"
          filter="url(#hwGlowMd)"
        />
        <path
          d="M5,-8 Q10,-17 15,-8 Q10,-3 5,-8 Z"
          fill="#ffcc44"
          opacity="0.45"
          filter="url(#hwGlowMd)"
        />
        {/* Wide grin */}
        <path
          d="M-16,10 L-11,6 L-6,13 L0,7 L6,13 L11,6 L16,10 Q13,19 0,21 Q-13,19 -16,10 Z"
          fill="#04000a"
        />
        <path
          d="M-11,6 L-6,13 L-6,6 Z M0,7 L6,13 L6,7 Z"
          fill="#ffaa22"
          opacity="0.42"
        />
      </g>

      {/* Pumpkin 5 — large right foreground */}
      <g transform="translate(1148, 688)">
        <ellipse
          cx="0"
          cy="8"
          rx="48"
          ry="28"
          fill="url(#hwPumpGlowBig)"
          filter="url(#hwGlowLg)"
        />
        <path
          d="M2,-42 Q14,-50 12,-32"
          stroke="#2a4810"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <rect
          x="-4"
          y="-43"
          width="8"
          height="15"
          rx="3.5"
          fill="#2a4810"
          stroke="#1c3008"
          strokeWidth="1"
        />
        <ellipse
          cx="0"
          cy="0"
          rx="32"
          ry="28"
          fill="url(#hwPump1)"
          stroke="#5a2800"
          strokeWidth="1.5"
        />
        <path
          d="M-11,-24 Q-13,0 -11,24"
          stroke="#6a2e00"
          strokeWidth="2"
          fill="none"
          opacity="0.55"
        />
        <path
          d="M11,-24 Q13,0 11,24"
          stroke="#6a2e00"
          strokeWidth="2"
          fill="none"
          opacity="0.55"
        />
        <path
          d="M-22,-13 Q-24,0 -22,13"
          stroke="#6a2e00"
          strokeWidth="1.6"
          fill="none"
          opacity="0.45"
        />
        <path
          d="M22,-13 Q24,0 22,13"
          stroke="#6a2e00"
          strokeWidth="1.6"
          fill="none"
          opacity="0.45"
        />
        <ellipse cx="0" cy="4" rx="26" ry="21" fill="url(#hwPumpGlow1)" />
        {/* Wicked slanted eyes */}
        <path d="M-17,-7 L-9,-11 L-7,-4 L-15,0 Z" fill="#04000a" />
        <path d="M9,-11 L17,-7 L15,0 L7,-4 Z" fill="#04000a" />
        <path
          d="M-17,-7 L-9,-11 L-7,-4 L-15,0 Z"
          fill="#ffdd44"
          opacity="0.52"
          filter="url(#hwGlowMd)"
        />
        <path
          d="M9,-11 L17,-7 L15,0 L7,-4 Z"
          fill="#ffdd44"
          opacity="0.52"
          filter="url(#hwGlowMd)"
        />
        {/* Wide jagged grin */}
        <path
          d="M-17,10 L-13,7 L-8,14 L-4,7 L0,14 L4,7 L8,14 L13,7 L17,10 Q15,21 0,23 Q-15,21 -17,10 Z"
          fill="#04000a"
        />
        <path
          d="M-13,7 L-8,14 L-8,7 Z M-4,7 L0,14 L0,7 Z M4,7 L8,14 L8,7 Z"
          fill="#ffaa22"
          opacity="0.48"
        />
      </g>
    </svg>
  );

  const renderTokyoWorld = () => (
    <svg
      role="img"
      aria-label="Tokyo world background"
      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* ── SKY GRADIENT — warm orange at horizon → deep crimson at top ── */}
        <linearGradient id="tkSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B0000" />
          <stop offset="28%" stopColor="#A61010" />
          <stop offset="55%" stopColor="#C0311A" />
          <stop offset="78%" stopColor="#D94B1A" />
          <stop offset="90%" stopColor="#E8651A" />
          <stop offset="100%" stopColor="#F07030" />
        </linearGradient>
        {/* ── WATER ── */}
        <linearGradient id="tkWaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2A0A0A" />
          <stop offset="40%" stopColor="#1A0606" />
          <stop offset="100%" stopColor="#0D0303" />
        </linearGradient>
        {/* ── WATER STRIPE MASK for reflection ── */}
        <pattern
          id="tkWaterStripes"
          x="0"
          y="0"
          width="1"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <rect x="0" y="0" width="1200" height="4" fill="white" />
          <rect x="0" y="4" width="1200" height="4" fill="transparent" />
        </pattern>
        <mask id="tkReflMask">
          <rect
            x="0"
            y="490"
            width="1200"
            height="310"
            fill="url(#tkWaterStripes)"
          />
        </mask>
        {/* ── SOFT BLUR for reflection ── */}
        <filter id="tkReflBlur" x="-2%" y="-2%" width="104%" height="110%">
          <feGaussianBlur stdDeviation="1.5 2.5" />
        </filter>
      </defs>

      {/* ══════════════════════════════════════════
          LAYER 1 — SKY
      ══════════════════════════════════════════ */}
      <rect width="1200" height="800" fill="url(#tkSkyGrad)" />

      {/* ══════════════════════════════════════════
          LAYER 2 — SUN (large solid crimson circle, no halo)
      ══════════════════════════════════════════ */}
      {/* Clean solid sun — the ONLY color element besides the sky */}
      <circle cx="480" cy="360" r="95" fill="#C41E3A" />

      {/* ══════════════════════════════════════════
          LAYER 3 — MOUNT FUJI silhouette (solid black)
      ══════════════════════════════════════════ */}
      {/* Fuji main body — pure black silhouette */}
      <path
        d="M0,490 L140,250 L180,230 L220,255 L245,235 L270,255 L295,235 L315,255 L330,240 L350,260 L560,490 Z"
        fill="#000000"
      />
      {/* Fuji snow cap — white peak only */}
      <path
        d="M220,255 L245,235 L270,255 L295,235 L315,255 L305,262 L270,268 L235,264 Z"
        fill="#F0EDE8"
      />

      {/* ══════════════════════════════════════════
          LAYER 4 — CITY SKYLINE (all solid black silhouettes)
      ══════════════════════════════════════════ */}

      {/* ── Far background buildings — varied heights ── */}
      <g fill="#000000">
        {/* Left cluster */}
        <rect x="0" y="370" width="38" height="120" />
        <rect x="32" y="345" width="28" height="145" />
        <rect x="55" y="358" width="45" height="132" />
        <rect x="95" y="325" width="32" height="165" />
        <rect x="122" y="340" width="42" height="150" />
        <rect x="158" y="328" width="35" height="162" />
        <rect x="186" y="348" width="28" height="142" />
        <rect x="208" y="338" width="40" height="152" />
        <rect x="241" y="352" width="26" height="138" />
        {/* Mid-left buildings */}
        <rect x="265" y="318" width="36" height="172" />
        <rect x="295" y="335" width="50" height="155" />
        <rect x="338" y="360" width="30" height="130" />
        <rect x="362" y="342" width="44" height="148" />
        <rect x="398" y="355" width="35" height="135" />
        <rect x="425" y="365" width="28" height="125" />
        {/* Mid buildings (not behind sun — sun is at x=480 y=360 r=95) */}
        <rect x="455" y="375" width="30" height="115" />
        <rect x="620" y="348" width="38" height="142" />
        <rect x="652" y="330" width="32" height="160" />
        <rect x="678" y="355" width="46" height="135" />
        <rect x="718" y="340" width="30" height="150" />
        <rect x="742" y="360" width="42" height="130" />
        {/* Right cluster */}
        <rect x="778" y="325" width="35" height="165" />
        <rect x="806" y="345" width="28" height="145" />
        <rect x="828" y="362" width="48" height="128" />
        <rect x="870" y="335" width="32" height="155" />
        <rect x="895" y="352" width="38" height="138" />
        <rect x="928" y="368" width="25" height="122" />
        <rect x="1108" y="352" width="35" height="138" />
        <rect x="1137" y="330" width="28" height="160" />
        <rect x="1158" y="348" width="45" height="142" />
        <rect x="1196" y="362" width="20" height="128" />
      </g>

      {/* ── TOKYO SKYTREE — tapered black tower silhouette ── */}
      <g fill="#000000">
        {/* Wide base */}
        <path d="M952,490 L960,300 L968,290 L976,300 L984,490 Z" />
        {/* Narrowing mid section */}
        <path d="M960,300 L964,160 L968,155 L972,160 L976,300 Z" />
        {/* Observation deck platform */}
        <rect x="956" y="296" width="24" height="10" />
        <rect x="959" y="256" width="18" height="8" />
        {/* Slim upper spire */}
        <path d="M965,155 L968,60 L971,155 Z" />
      </g>

      {/* ── TOKYO TOWER — black A-frame lattice silhouette ── */}
      <g fill="#000000">
        {/* Outer A-frame legs */}
        <path d="M808,490 L835,210 L860,210 L887,490 Z" />
        {/* Inner body narrowing */}
        <path d="M832,285 L843,140 L857,140 L868,285 Z" />
        {/* Upper section */}
        <path d="M841,160 L849,65 L857,160 Z" />
        {/* Spire */}
        <path d="M847,65 L850,18 L853,65 Z" />
        {/* Observation bands — slightly lighter for definition */}
        <rect x="834" y="282" width="27" height="8" fill="#0a0a0a" />
        <rect x="839" y="200" width="17" height="7" fill="#0a0a0a" />
      </g>

      {/* ── PAGODA — black 5-tier silhouette (far right) ── */}
      <g fill="#000000">
        {/* Base platform */}
        <rect x="1055" y="482" width="115" height="10" />
        {/* Tier 5 — widest */}
        <rect x="1063" y="452" width="99" height="32" />
        <path d="M1048,452 Q1113,432 1178,452 L1178,456 Q1113,436 1048,456 Z" />
        {/* Tier 4 */}
        <rect x="1075" y="422" width="75" height="32" />
        <path d="M1062,422 Q1113,402 1163,422 L1163,426 Q1113,406 1062,426 Z" />
        {/* Tier 3 */}
        <rect x="1085" y="392" width="55" height="32" />
        <path d="M1073,392 Q1113,372 1152,392 L1152,396 Q1113,376 1073,396 Z" />
        {/* Tier 2 */}
        <rect x="1095" y="362" width="35" height="32" />
        <path d="M1084,362 Q1113,342 1141,362 L1141,366 Q1113,346 1084,366 Z" />
        {/* Tier 1 — smallest */}
        <rect x="1105" y="332" width="15" height="32" />
        <path d="M1094,332 Q1113,312 1131,332 L1131,336 Q1113,316 1094,336 Z" />
        {/* Spire */}
        <path d="M1111,314 L1113,275 L1115,314 Z" />
        <circle cx="1113" cy="274" r="3.5" />
      </g>

      {/* ── TORII GATE — classic black silhouette ── */}
      <g fill="#000000">
        {/* Top curved kasagi beam */}
        <path d="M262,318 Q385,295 500,318 L503,304 Q385,279 260,304 Z" />
        {/* Lower nuki beam */}
        <rect x="294" y="352" width="175" height="18" />
        {/* Left column */}
        <rect x="282" y="316" width="24" height="178" />
        {/* Right column */}
        <rect x="458" y="316" width="24" height="178" />
        {/* Column caps on top beam */}
        <rect x="276" y="312" width="22" height="10" />
        <rect x="462" y="312" width="22" height="10" />
      </g>

      {/* ══════════════════════════════════════════
          LAYER 5 — GROUND / BANK (black)
      ══════════════════════════════════════════ */}
      <path
        d="M0,490 Q200,483 400,488 Q600,494 800,484 Q1000,476 1200,486 L1200,510 L0,510 Z"
        fill="#000000"
      />

      {/* ══════════════════════════════════════════
          LAYER 6 — WATER (dark with horizontal stripe texture)
      ══════════════════════════════════════════ */}
      <rect x="0" y="490" width="1200" height="310" fill="url(#tkWaterGrad)" />

      {/* Horizontal ripple lines */}
      <g stroke="#3A1010" strokeWidth="0.8" opacity="0.5">
        <line x1="0" y1="500" x2="1200" y2="500" />
        <line x1="0" y1="510" x2="1200" y2="510" />
        <line x1="0" y1="522" x2="1200" y2="522" />
        <line x1="0" y1="535" x2="1200" y2="535" />
        <line x1="0" y1="550" x2="1200" y2="550" />
        <line x1="0" y1="567" x2="1200" y2="567" />
        <line x1="0" y1="586" x2="1200" y2="586" />
        <line x1="0" y1="608" x2="1200" y2="608" />
        <line x1="0" y1="634" x2="1200" y2="634" />
        <line x1="0" y1="664" x2="1200" y2="664" />
        <line x1="0" y1="700" x2="1200" y2="700" />
        <line x1="0" y1="745" x2="1200" y2="745" />
      </g>
      {/* Shorter broken ripple segments for texture */}
      <g stroke="#4A1818" strokeWidth="0.5" opacity="0.35">
        <line x1="40" y1="505" x2="260" y2="505" />
        <line x1="310" y1="516" x2="560" y2="516" />
        <line x1="600" y1="505" x2="800" y2="505" />
        <line x1="860" y1="516" x2="1120" y2="516" />
        <line x1="90" y1="528" x2="340" y2="528" />
        <line x1="400" y1="542" x2="680" y2="542" />
        <line x1="740" y1="528" x2="980" y2="528" />
        <line x1="180" y1="558" x2="470" y2="558" />
        <line x1="530" y1="572" x2="830" y2="572" />
        <line x1="880" y1="558" x2="1080" y2="558" />
      </g>

      {/* ══════════════════════════════════════════
          LAYER 7 — REFLECTION (mirrored city silhouette, wavy mask)
      ══════════════════════════════════════════ */}
      <g opacity="0.42" mask="url(#tkReflMask)" filter="url(#tkReflBlur)">
        {/* Reflected buildings — flipped vertically from y=490 */}
        <g fill="#000000" transform="scale(1,-1) translate(0,-980)">
          <rect x="0" y="370" width="38" height="120" />
          <rect x="32" y="345" width="28" height="145" />
          <rect x="55" y="358" width="45" height="132" />
          <rect x="95" y="325" width="32" height="165" />
          <rect x="122" y="340" width="42" height="150" />
          <rect x="158" y="328" width="35" height="162" />
          <rect x="186" y="348" width="28" height="142" />
          <rect x="208" y="338" width="40" height="152" />
          <rect x="241" y="352" width="26" height="138" />
          <rect x="265" y="318" width="36" height="172" />
          <rect x="295" y="335" width="50" height="155" />
          <rect x="338" y="360" width="30" height="130" />
          <rect x="362" y="342" width="44" height="148" />
          <rect x="398" y="355" width="35" height="135" />
          <rect x="425" y="365" width="28" height="125" />
          <rect x="455" y="375" width="30" height="115" />
          <rect x="620" y="348" width="38" height="142" />
          <rect x="652" y="330" width="32" height="160" />
          <rect x="678" y="355" width="46" height="135" />
          <rect x="718" y="340" width="30" height="150" />
          <rect x="742" y="360" width="42" height="130" />
          <rect x="778" y="325" width="35" height="165" />
          <rect x="806" y="345" width="28" height="145" />
          <rect x="828" y="362" width="48" height="128" />
          <rect x="870" y="335" width="32" height="155" />
          <rect x="895" y="352" width="38" height="138" />
          <rect x="928" y="368" width="25" height="122" />
          <rect x="1108" y="352" width="35" height="138" />
          <rect x="1137" y="330" width="28" height="160" />
          <rect x="1158" y="348" width="45" height="142" />
          <rect x="1196" y="362" width="20" height="128" />
          {/* Skytree reflection */}
          <path d="M952,490 L960,300 L968,290 L976,300 L984,490 Z" />
          <path d="M960,300 L964,160 L968,155 L972,160 L976,300 Z" />
          <path d="M965,155 L968,60 L971,155 Z" />
          {/* Tokyo Tower reflection */}
          <path d="M808,490 L835,210 L860,210 L887,490 Z" />
          <path d="M832,285 L843,140 L857,140 L868,285 Z" />
          <path d="M841,160 L849,65 L857,160 Z" />
          <path d="M847,65 L850,18 L853,65 Z" />
          {/* Torii reflection */}
          <path d="M262,318 Q385,295 500,318 L503,304 Q385,279 260,304 Z" />
          <rect x="294" y="352" width="175" height="18" />
          <rect x="282" y="316" width="24" height="178" />
          <rect x="458" y="316" width="24" height="178" />
          {/* Pagoda reflection */}
          <rect x="1063" y="452" width="99" height="32" />
          <path d="M1048,452 Q1113,432 1178,452 L1178,456 Q1113,436 1048,456 Z" />
          <rect x="1075" y="422" width="75" height="32" />
          <rect x="1085" y="392" width="55" height="32" />
          <rect x="1095" y="362" width="35" height="32" />
          <rect x="1105" y="332" width="15" height="32" />
          <path d="M1111,314 L1113,275 L1115,314 Z" />
          {/* Ground bank */}
          <path d="M0,490 Q200,483 400,488 Q600,494 800,484 Q1000,476 1200,486 L1200,510 L0,510 Z" />
          {/* Fuji reflection */}
          <path d="M0,490 L140,250 L180,230 L220,255 L245,235 L270,255 L295,235 L315,255 L330,240 L350,260 L560,490 Z" />
        </g>
      </g>

      {/* ══════════════════════════════════════════
          LAYER 8 — REEDS / GRASS at water's edge
      ══════════════════════════════════════════ */}
      <g stroke="#000000" strokeWidth="1.5" fill="none" strokeLinecap="round">
        {/* Left bank reeds */}
        <line x1="18" y1="510" x2="22" y2="488" />
        <line x1="26" y1="510" x2="30" y2="484" />
        <line x1="34" y1="510" x2="32" y2="490" />
        <line x1="42" y1="510" x2="46" y2="486" />
        <line x1="50" y1="510" x2="48" y2="492" />
        <line x1="60" y1="510" x2="64" y2="485" />
        <line x1="72" y1="510" x2="70" y2="491" />
        <line x1="84" y1="510" x2="88" y2="487" />
        <line x1="98" y1="510" x2="96" y2="493" />
        {/* Reed heads — small oval tips */}
        <ellipse cx="22" cy="487" rx="3" ry="5" fill="#000000" stroke="none" />
        <ellipse
          cx="30"
          cy="483"
          rx="2.5"
          ry="4.5"
          fill="#000000"
          stroke="none"
        />
        <ellipse
          cx="32"
          cy="489"
          rx="2.5"
          ry="4"
          fill="#000000"
          stroke="none"
        />
        <ellipse cx="46" cy="485" rx="3" ry="5" fill="#000000" stroke="none" />
        <ellipse
          cx="48"
          cy="491"
          rx="2.5"
          ry="4"
          fill="#000000"
          stroke="none"
        />
        <ellipse
          cx="64"
          cy="484"
          rx="3"
          ry="5.5"
          fill="#000000"
          stroke="none"
        />
        <ellipse
          cx="70"
          cy="490"
          rx="2.5"
          ry="4.5"
          fill="#000000"
          stroke="none"
        />
        <ellipse cx="88" cy="486" rx="3" ry="5" fill="#000000" stroke="none" />
        <ellipse
          cx="96"
          cy="492"
          rx="2.5"
          ry="4"
          fill="#000000"
          stroke="none"
        />
        {/* Right bank reeds */}
        <line x1="1102" y1="510" x2="1106" y2="488" />
        <line x1="1112" y1="510" x2="1110" y2="485" />
        <line x1="1122" y1="510" x2="1126" y2="490" />
        <line x1="1134" y1="510" x2="1132" y2="487" />
        <line x1="1145" y1="510" x2="1149" y2="483" />
        <line x1="1155" y1="510" x2="1153" y2="491" />
        <line x1="1165" y1="510" x2="1169" y2="486" />
        <line x1="1176" y1="510" x2="1174" y2="493" />
        <ellipse
          cx="1106"
          cy="487"
          rx="2.5"
          ry="4.5"
          fill="#000000"
          stroke="none"
        />
        <ellipse
          cx="1110"
          cy="484"
          rx="3"
          ry="5"
          fill="#000000"
          stroke="none"
        />
        <ellipse
          cx="1126"
          cy="489"
          rx="2.5"
          ry="4"
          fill="#000000"
          stroke="none"
        />
        <ellipse
          cx="1132"
          cy="486"
          rx="3"
          ry="5"
          fill="#000000"
          stroke="none"
        />
        <ellipse
          cx="1149"
          cy="482"
          rx="2.5"
          ry="4.5"
          fill="#000000"
          stroke="none"
        />
        <ellipse
          cx="1153"
          cy="490"
          rx="3"
          ry="5"
          fill="#000000"
          stroke="none"
        />
        <ellipse
          cx="1169"
          cy="485"
          rx="2.5"
          ry="4"
          fill="#000000"
          stroke="none"
        />
        <ellipse
          cx="1174"
          cy="492"
          rx="3"
          ry="5"
          fill="#000000"
          stroke="none"
        />
      </g>

      {/* ══════════════════════════════════════════
          LAYER 9 — MINIMALIST BIRDS
          Simple "M" / "V" shaped curved strokes — no body, no fill
      ══════════════════════════════════════════ */}
      <g
        stroke="#000000"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Bird 1 — upper left */}
        <path d="M155,95 Q163,88 171,95" strokeWidth="2.2" />
        <path d="M171,95 Q179,88 187,95" strokeWidth="2.2" />
        {/* Bird 2 — upper center-left */}
        <path d="M310,72 Q317,66 324,72" strokeWidth="2" />
        <path d="M324,72 Q331,66 338,72" strokeWidth="2" />
        {/* Bird 3 — upper center */}
        <path d="M530,58 Q536,52 542,58" strokeWidth="1.8" />
        <path d="M542,58 Q548,52 554,58" strokeWidth="1.8" />
        {/* Bird 4 — small, high sky */}
        <path d="M440,40 Q445,35 450,40" strokeWidth="1.5" />
        <path d="M450,40 Q455,35 460,40" strokeWidth="1.5" />
        {/* Bird 5 — right of center */}
        <path d="M700,80 Q708,74 716,80" strokeWidth="2" />
        <path d="M716,80 Q724,74 732,80" strokeWidth="2" />
        {/* Bird 6 — upper right cluster */}
        <path d="M890,55 Q896,49 902,55" strokeWidth="1.8" />
        <path d="M902,55 Q908,49 914,55" strokeWidth="1.8" />
        {/* Bird 7 — tiny, very high */}
        <path d="M650,28 Q654,24 658,28" strokeWidth="1.4" />
        <path d="M658,28 Q662,24 666,28" strokeWidth="1.4" />
        {/* Bird 8 — mid-sky right */}
        <path d="M1020,68 Q1027,62 1034,68" strokeWidth="1.8" />
        <path d="M1034,68 Q1041,62 1048,68" strokeWidth="1.8" />
        {/* Bird 9 — left mid-height */}
        <path d="M215,130 Q222,124 229,130" strokeWidth="1.8" />
        <path d="M229,130 Q236,124 243,130" strokeWidth="1.8" />
        {/* Bird 10 — small accent right */}
        <path d="M820,42 Q825,37 830,42" strokeWidth="1.5" />
        <path d="M830,42 Q835,37 840,42" strokeWidth="1.5" />
      </g>
    </svg>
  );

  const renderWindowsWorld = () => (
    <svg
      role="img"
      aria-label="Windows XP world background"
      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Sky gradient — iconic Bliss blue */}
        <linearGradient id="wxpSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a6fb5" />
          <stop offset="45%" stopColor="#3a8fd4" />
          <stop offset="80%" stopColor="#6ab8e8" />
          <stop offset="100%" stopColor="#87ceeb" />
        </linearGradient>
        {/* Hill gradient — rich lush green */}
        <linearGradient id="wxpHillMain" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5dc43a" />
          <stop offset="30%" stopColor="#3da832" />
          <stop offset="70%" stopColor="#2e8c20" />
          <stop offset="100%" stopColor="#1d6614" />
        </linearGradient>
        <linearGradient id="wxpHillFar" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4ab82e" />
          <stop offset="100%" stopColor="#2a7a18" />
        </linearGradient>
        <linearGradient id="wxpHillLight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#78d854" />
          <stop offset="100%" stopColor="#4aac30" />
        </linearGradient>
        {/* Taskbar gradient — classic XP deep blue */}
        <linearGradient id="wxpTaskbar" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3a6abf" />
          <stop offset="8%" stopColor="#2c5db5" />
          <stop offset="50%" stopColor="#1f4e9c" />
          <stop offset="92%" stopColor="#193f88" />
          <stop offset="100%" stopColor="#152f6e" />
        </linearGradient>
        {/* Taskbar top highlight */}
        <linearGradient id="wxpTaskbarHL" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6699dd" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3366bb" stopOpacity="0" />
        </linearGradient>
        {/* Start button green gradient */}
        <linearGradient id="wxpStartBtn" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#66cc44" />
          <stop offset="40%" stopColor="#44aa22" />
          <stop offset="60%" stopColor="#338811" />
          <stop offset="100%" stopColor="#226600" />
        </linearGradient>
        {/* Start button highlight */}
        <linearGradient id="wxpStartHL" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#aaeebb" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#44aa22" stopOpacity="0" />
        </linearGradient>
        {/* System tray inset */}
        <linearGradient id="wxpTray" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#12357a" />
          <stop offset="50%" stopColor="#1a4590" />
          <stop offset="100%" stopColor="#1e4ea0" />
        </linearGradient>
        {/* Cloud gradients */}
        <radialGradient id="wxpCloud1" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#f0f6ff" />
          <stop offset="100%" stopColor="#d8eeff" stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id="wxpCloud2" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#edf4ff" />
          <stop offset="100%" stopColor="#cce4ff" stopOpacity="0.25" />
        </radialGradient>
        {/* Icon folder gradient */}
        <linearGradient id="wxpFolder" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffd44f" />
          <stop offset="40%" stopColor="#f0b800" />
          <stop offset="100%" stopColor="#d49000" />
        </linearGradient>
        {/* Monitor screen */}
        <linearGradient id="wxpScreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6699cc" />
          <stop offset="100%" stopColor="#335588" />
        </linearGradient>
        {/* Icon label text shadow filter */}
        <filter id="wxpTextShadow" x="-20%" y="-30%" width="140%" height="160%">
          <feDropShadow
            dx="1"
            dy="1"
            stdDeviation="1.5"
            floodColor="#000000"
            floodOpacity="0.85"
          />
        </filter>
        {/* IE logo gradient */}
        <radialGradient id="wxpIE" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#66bbff" />
          <stop offset="100%" stopColor="#0055cc" />
        </radialGradient>
        {/* Recycle bin gradient */}
        <linearGradient id="wxpBin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#b8d8ee" />
          <stop offset="100%" stopColor="#7aaac8" />
        </linearGradient>
        {/* Network gradient */}
        <linearGradient id="wxpNet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ccddff" />
          <stop offset="100%" stopColor="#8899dd" />
        </linearGradient>
        {/* Hill depth shadow */}
        <radialGradient id="wxpHillShadow" cx="50%" cy="80%" r="60%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        {/* Hill highlight — sun-lit top */}
        <radialGradient id="wxpHillTopLight" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="#b8ff88" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#b8ff88" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ═══════════════════════════════════════
          SKY
      ═══════════════════════════════════════ */}
      <rect width="1200" height="760" fill="url(#wxpSky)" />

      {/* ═══════════════════════════════════════
          CLOUDS — soft multi-circle puffs
      ═══════════════════════════════════════ */}

      {/* Cloud A — large center-left */}
      <g opacity="0.97">
        <ellipse cx="240" cy="110" rx="90" ry="55" fill="url(#wxpCloud1)" />
        <ellipse cx="180" cy="128" rx="62" ry="42" fill="url(#wxpCloud1)" />
        <ellipse cx="295" cy="130" rx="70" ry="40" fill="url(#wxpCloud1)" />
        <ellipse cx="340" cy="120" rx="52" ry="35" fill="url(#wxpCloud1)" />
        <ellipse cx="145" cy="138" rx="40" ry="28" fill="url(#wxpCloud2)" />
        <ellipse cx="370" cy="132" rx="38" ry="25" fill="url(#wxpCloud2)" />
      </g>

      {/* Cloud B — medium upper right */}
      <g opacity="0.93">
        <ellipse cx="850" cy="85" rx="80" ry="48" fill="url(#wxpCloud1)" />
        <ellipse cx="795" cy="102" rx="55" ry="36" fill="url(#wxpCloud1)" />
        <ellipse cx="900" cy="104" rx="62" ry="35" fill="url(#wxpCloud1)" />
        <ellipse cx="940" cy="97" rx="45" ry="30" fill="url(#wxpCloud2)" />
        <ellipse cx="768" cy="112" rx="36" ry="24" fill="url(#wxpCloud2)" />
      </g>

      {/* Cloud C — small far right */}
      <g opacity="0.88">
        <ellipse cx="1100" cy="140" rx="65" ry="38" fill="url(#wxpCloud1)" />
        <ellipse cx="1055" cy="156" rx="42" ry="28" fill="url(#wxpCloud1)" />
        <ellipse cx="1145" cy="154" rx="48" ry="30" fill="url(#wxpCloud2)" />
        <ellipse cx="1175" cy="148" rx="30" ry="20" fill="url(#wxpCloud2)" />
      </g>

      {/* Cloud D — wispy left far */}
      <g opacity="0.82">
        <ellipse cx="490" cy="65" rx="55" ry="30" fill="url(#wxpCloud2)" />
        <ellipse cx="450" cy="78" rx="38" ry="22" fill="url(#wxpCloud2)" />
        <ellipse cx="535" cy="76" rx="42" ry="25" fill="url(#wxpCloud2)" />
        <ellipse cx="568" cy="71" rx="30" ry="18" fill="url(#wxpCloud2)" />
      </g>

      {/* ═══════════════════════════════════════
          HILLS — iconic Bliss rolling landscape
      ═══════════════════════════════════════ */}

      {/* Far background hill — lighter, more distant */}
      <path
        d="M0,600 Q180,490 380,520 Q560,548 760,510 Q940,475 1100,505 Q1160,515 1200,510 L1200,760 L0,760 Z"
        fill="url(#wxpHillFar)"
        opacity="0.6"
      />

      {/* Main Bliss hill — the iconic giant green swell */}
      <path
        d="M-20,760 Q60,650 200,595 Q380,530 550,510 Q680,498 780,510 Q900,526 1000,570 Q1100,610 1220,700 L1220,760 Z"
        fill="url(#wxpHillMain)"
      />

      {/* Left lower foreground hill */}
      <path
        d="M-20,760 Q80,680 200,660 Q340,638 440,660 Q500,672 560,690 L560,760 Z"
        fill="url(#wxpHillLight)"
        opacity="0.85"
      />

      {/* Right lower foreground hill */}
      <path
        d="M700,760 Q820,700 950,680 Q1060,666 1150,690 Q1185,700 1220,720 L1220,760 Z"
        fill="url(#wxpHillLight)"
        opacity="0.8"
      />

      {/* Hill shadow overlay for depth */}
      <ellipse cx="600" cy="640" rx="600" ry="180" fill="url(#wxpHillShadow)" />

      {/* Hill top highlight — sunlit ridge */}
      <path
        d="M150,600 Q380,515 600,508 Q820,503 1000,558 Q1060,576 1100,600 Q900,540 680,530 Q480,522 300,565 Z"
        fill="url(#wxpHillTopLight)"
      />

      {/* ═══════════════════════════════════════
          DESKTOP ICONS — left column
      ═══════════════════════════════════════ */}

      {/* ── Icon 1: My Computer ── */}
      <g transform="translate(40, 48)">
        {/* Monitor body */}
        <rect
          x="2"
          y="4"
          width="42"
          height="30"
          rx="2"
          fill="#e8e4dc"
          stroke="#a0a0a0"
          strokeWidth="1.2"
        />
        {/* Screen */}
        <rect
          x="6"
          y="7"
          width="34"
          height="22"
          rx="1"
          fill="url(#wxpScreen)"
        />
        {/* Screen glare */}
        <rect
          x="7"
          y="8"
          width="12"
          height="4"
          rx="1"
          fill="#ffffff"
          opacity="0.3"
        />
        {/* Neck */}
        <rect x="17" y="33" width="12" height="5" rx="1" fill="#c8c4bc" />
        {/* Base */}
        <rect
          x="12"
          y="37"
          width="22"
          height="5"
          rx="2"
          fill="#b8b4ac"
          stroke="#909090"
          strokeWidth="0.8"
        />
        {/* Power LED */}
        <circle cx="38" cy="29" r="2" fill="#44cc44" />
        {/* Label */}
        <text
          x="23"
          y="58"
          textAnchor="middle"
          fontFamily="Tahoma, sans-serif"
          fontSize="9"
          fill="#ffffff"
          filter="url(#wxpTextShadow)"
          fontWeight="bold"
        >
          My Computer
        </text>
      </g>

      {/* ── Icon 2: My Documents ── */}
      <g transform="translate(40, 130)">
        {/* Folder back */}
        <path
          d="M2,8 Q2,4 6,4 L16,4 Q18,4 20,6 L22,8 L44,8 Q46,8 46,10 L46,38 Q46,40 44,40 L4,40 Q2,40 2,38 Z"
          fill="url(#wxpFolder)"
          stroke="#c88800"
          strokeWidth="1"
        />
        {/* Folder front face */}
        <rect
          x="2"
          y="12"
          width="44"
          height="28"
          rx="1.5"
          fill="#fcc340"
          stroke="#c88800"
          strokeWidth="1"
        />
        {/* Folder tab highlight */}
        <path
          d="M2,12 L46,12"
          stroke="#ffe480"
          strokeWidth="1.5"
          opacity="0.7"
        />
        {/* Folder shine */}
        <ellipse cx="24" cy="22" rx="16" ry="6" fill="#ffffff" opacity="0.2" />
        {/* Label */}
        <text
          x="23"
          y="56"
          textAnchor="middle"
          fontFamily="Tahoma, sans-serif"
          fontSize="9"
          fill="#ffffff"
          filter="url(#wxpTextShadow)"
          fontWeight="bold"
        >
          My Documents
        </text>
      </g>

      {/* ── Icon 3: Internet Explorer ── */}
      <g transform="translate(40, 218)">
        {/* Circle "e" background disc */}
        <circle
          cx="23"
          cy="23"
          r="22"
          fill="url(#wxpIE)"
          stroke="#003399"
          strokeWidth="1"
        />
        {/* Circle glow */}
        <circle
          cx="23"
          cy="23"
          r="22"
          fill="none"
          stroke="#88ccff"
          strokeWidth="1"
          opacity="0.5"
        />
        {/* IE "e" letterform — stylized */}
        <path
          d="M14,22 Q14,12 23,12 Q32,12 32,20 L18,20 Q18,28 25,28 Q29,28 31,26"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1="18"
          y1="20"
          x2="32"
          y2="20"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Gold ring/orbit */}
        <path
          d="M5,32 Q12,42 30,36 Q44,30 42,18"
          fill="none"
          stroke="#ffcc00"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.9"
        />
        {/* Shine */}
        <ellipse
          cx="16"
          cy="15"
          rx="6"
          ry="4"
          fill="#ffffff"
          opacity="0.3"
          transform="rotate(-30 16 15)"
        />
        {/* Label */}
        <text
          x="23"
          y="58"
          textAnchor="middle"
          fontFamily="Tahoma, sans-serif"
          fontSize="9"
          fill="#ffffff"
          filter="url(#wxpTextShadow)"
          fontWeight="bold"
        >
          Internet Explorer
        </text>
      </g>

      {/* ── Icon 4: Recycle Bin (empty) ── */}
      <g transform="translate(40, 308)">
        {/* Bin body */}
        <path
          d="M10,14 L14,42 Q14,44 16,44 L30,44 Q32,44 32,42 L36,14 Z"
          fill="url(#wxpBin)"
          stroke="#6699bb"
          strokeWidth="1"
        />
        {/* Bin lid */}
        <rect
          x="7"
          y="10"
          width="32"
          height="5"
          rx="2"
          fill="#c8ddf0"
          stroke="#6699bb"
          strokeWidth="1"
        />
        {/* Bin handle */}
        <path
          d="M18,10 Q18,6 23,6 Q28,6 28,10"
          fill="none"
          stroke="#7aabcc"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Bin ribs for depth */}
        <line
          x1="18"
          y1="18"
          x2="16"
          y2="40"
          stroke="#aaccdd"
          strokeWidth="1"
          opacity="0.7"
        />
        <line
          x1="23"
          y1="17"
          x2="23"
          y2="41"
          stroke="#aaccdd"
          strokeWidth="1"
          opacity="0.7"
        />
        <line
          x1="28"
          y1="18"
          x2="30"
          y2="40"
          stroke="#aaccdd"
          strokeWidth="1"
          opacity="0.7"
        />
        {/* Shine on lid */}
        <ellipse
          cx="23"
          cy="12"
          rx="10"
          ry="2.5"
          fill="#ffffff"
          opacity="0.4"
        />
        {/* Label */}
        <text
          x="23"
          y="60"
          textAnchor="middle"
          fontFamily="Tahoma, sans-serif"
          fontSize="9"
          fill="#ffffff"
          filter="url(#wxpTextShadow)"
          fontWeight="bold"
        >
          Recycle Bin
        </text>
      </g>

      {/* ── Icon 5: My Network Places ── */}
      <g transform="translate(40, 400)">
        {/* Monitor left */}
        <rect
          x="0"
          y="10"
          width="22"
          height="16"
          rx="1.5"
          fill="url(#wxpNet)"
          stroke="#6677cc"
          strokeWidth="1"
        />
        <rect x="2" y="12" width="18" height="10" rx="1" fill="#335599" />
        <rect x="8" y="26" width="6" height="3" fill="#8899cc" />
        <rect x="5" y="28" width="12" height="3" rx="1" fill="#7788bb" />
        {/* Monitor right (overlapping) */}
        <rect
          x="24"
          y="8"
          width="22"
          height="16"
          rx="1.5"
          fill="url(#wxpNet)"
          stroke="#6677cc"
          strokeWidth="1"
        />
        <rect x="26" y="10" width="18" height="10" rx="1" fill="#335599" />
        <rect x="32" y="24" width="6" height="3" fill="#8899cc" />
        <rect x="29" y="26" width="12" height="3" rx="1" fill="#7788bb" />
        {/* Connection cable between monitors */}
        <path
          d="M22,18 Q28,30 28,18"
          fill="none"
          stroke="#ffcc44"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Globe symbol on right monitor */}
        <circle
          cx="35"
          cy="15"
          r="4"
          fill="none"
          stroke="#aabbff"
          strokeWidth="1"
          opacity="0.8"
        />
        <line
          x1="35"
          y1="11"
          x2="35"
          y2="19"
          stroke="#aabbff"
          strokeWidth="0.8"
          opacity="0.8"
        />
        <line
          x1="31"
          y1="15"
          x2="39"
          y2="15"
          stroke="#aabbff"
          strokeWidth="0.8"
          opacity="0.8"
        />
        {/* Label */}
        <text
          x="23"
          y="55"
          textAnchor="middle"
          fontFamily="Tahoma, sans-serif"
          fontSize="9"
          fill="#ffffff"
          filter="url(#wxpTextShadow)"
          fontWeight="bold"
        >
          My Network
        </text>
        <text
          x="23"
          y="65"
          textAnchor="middle"
          fontFamily="Tahoma, sans-serif"
          fontSize="9"
          fill="#ffffff"
          filter="url(#wxpTextShadow)"
          fontWeight="bold"
        >
          Places
        </text>
      </g>

      {/* ═══════════════════════════════════════
          TASKBAR — bottom bar, full width
      ═══════════════════════════════════════ */}
      <rect x="0" y="760" width="1200" height="40" fill="url(#wxpTaskbar)" />
      {/* Top edge highlight */}
      <rect
        x="0"
        y="760"
        width="1200"
        height="8"
        fill="url(#wxpTaskbarHL)"
        opacity="0.6"
      />
      {/* Subtle 1px top border line */}
      <line
        x1="0"
        y1="760"
        x2="1200"
        y2="760"
        stroke="#5588dd"
        strokeWidth="1"
        opacity="0.8"
      />

      {/* ── Start Button ── */}
      {/* Button green background with rounded right corners */}
      <path
        d="M0,762 L0,798 L110,798 Q118,798 118,790 L118,770 Q118,762 110,762 Z"
        fill="url(#wxpStartBtn)"
      />
      {/* Highlight top half */}
      <path
        d="M0,762 L0,780 L118,780 L118,770 Q118,762 110,762 Z"
        fill="url(#wxpStartHL)"
        opacity="0.45"
      />
      {/* Button border */}
      <path
        d="M0,762 L0,798 L110,798 Q118,798 118,790 L118,770 Q118,762 110,762 Z"
        fill="none"
        stroke="#2a6600"
        strokeWidth="1.5"
        opacity="0.7"
      />
      {/* Inner glow edge */}
      <path
        d="M1,763 L1,797 L108,797 Q116,797 116,789 L116,771 Q116,763 108,763 Z"
        fill="none"
        stroke="#88ee44"
        strokeWidth="1"
        opacity="0.3"
      />

      {/* Windows Flag Logo — 4 colored squares with perspective */}
      {/* Red - top-left */}
      <path
        d="M12,770 L22,768 L22,779 L12,780 Z"
        fill="#ff3333"
        opacity="0.95"
      />
      {/* Green - top-right */}
      <path
        d="M24,768 L34,766 L34,777 L24,778 Z"
        fill="#33cc33"
        opacity="0.95"
      />
      {/* Blue - bottom-left */}
      <path
        d="M12,781 L22,780 L22,791 L12,793 Z"
        fill="#3366ff"
        opacity="0.95"
      />
      {/* Yellow - bottom-right */}
      <path
        d="M24,779 L34,778 L34,789 L24,790 Z"
        fill="#ffcc00"
        opacity="0.95"
      />
      {/* Flag glow effect */}
      <path
        d="M11,766 L35,764 L35,793 L11,795 Z"
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.5"
        opacity="0.25"
      />

      {/* "start" text — lowercase, white, bold Tahoma */}
      <text
        x="42"
        y="785"
        fontFamily="Tahoma, Franklin Gothic Medium, sans-serif"
        fontSize="16"
        fontWeight="bold"
        fill="#ffffff"
        letterSpacing="1"
        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.6)" }}
      >
        start
      </text>
      {/* Text drop shadow simulation */}
      <text
        x="43"
        y="786"
        fontFamily="Tahoma, Franklin Gothic Medium, sans-serif"
        fontSize="16"
        fontWeight="bold"
        fill="#000000"
        letterSpacing="1"
        opacity="0.35"
      >
        start
      </text>
      <text
        x="42"
        y="785"
        fontFamily="Tahoma, Franklin Gothic Medium, sans-serif"
        fontSize="16"
        fontWeight="bold"
        fill="#ffffff"
        letterSpacing="1"
      >
        start
      </text>

      {/* ── Taskbar separator after start button ── */}
      <line
        x1="122"
        y1="763"
        x2="122"
        y2="797"
        stroke="#4477cc"
        strokeWidth="1"
        opacity="0.6"
      />
      <line
        x1="123"
        y1="763"
        x2="123"
        y2="797"
        stroke="#224499"
        strokeWidth="1"
        opacity="0.4"
      />

      {/* ── Empty taskbar area (for open windows) ── */}
      {/* Just the gradient background is enough — empty */}

      {/* ── System Tray — right side ── */}
      {/* Tray inset background */}
      <path
        d="M1010,763 Q1008,763 1008,766 L1008,796 Q1008,797 1010,797 L1200,797 L1200,763 Z"
        fill="url(#wxpTray)"
      />
      <path
        d="M1010,763 Q1008,763 1008,766 L1008,796 Q1008,797 1010,797 L1200,797 L1200,763 Z"
        fill="none"
        stroke="#1a3d8f"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Tray separator on left edge */}
      <line
        x1="1011"
        y1="763"
        x2="1011"
        y2="797"
        stroke="#3366aa"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="1012"
        y1="763"
        x2="1012"
        y2="797"
        stroke="#5588cc"
        strokeWidth="1"
        opacity="0.3"
      />

      {/* Speaker icon */}
      <g transform="translate(1025, 772)">
        {/* Speaker body */}
        <rect
          x="0"
          y="2"
          width="8"
          height="10"
          rx="1"
          fill="#c0d8f8"
          opacity="0.9"
        />
        {/* Speaker cone */}
        <path d="M8,0 L16,6 L16,8 L8,14 Z" fill="#c0d8f8" opacity="0.9" />
        {/* Sound waves */}
        <path
          d="M18,4 Q22,7 18,10"
          fill="none"
          stroke="#c0d8f8"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M20,1 Q26,7 20,13"
          fill="none"
          stroke="#c0d8f8"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      </g>

      {/* Network icon — two overlapping computer outlines */}
      <g transform="translate(1070, 773)">
        <rect
          x="0"
          y="0"
          width="12"
          height="9"
          rx="1"
          fill="none"
          stroke="#c0d8f8"
          strokeWidth="1.2"
          opacity="0.9"
        />
        <line
          x1="5"
          y1="9"
          x2="7"
          y2="12"
          stroke="#c0d8f8"
          strokeWidth="1.2"
          opacity="0.8"
        />
        <rect
          x="3"
          y="12"
          width="6"
          height="2"
          rx="0.5"
          fill="#c0d8f8"
          opacity="0.7"
        />
        <rect
          x="10"
          y="3"
          width="12"
          height="9"
          rx="1"
          fill="none"
          stroke="#c0d8f8"
          strokeWidth="1.2"
          opacity="0.7"
        />
        <line
          x1="15"
          y1="12"
          x2="17"
          y2="15"
          stroke="#c0d8f8"
          strokeWidth="1.2"
          opacity="0.6"
        />
        <rect
          x="13"
          y="15"
          width="6"
          height="2"
          rx="0.5"
          fill="#c0d8f8"
          opacity="0.5"
        />
      </g>

      {/* Separator before clock */}
      <line
        x1="1112"
        y1="768"
        x2="1112"
        y2="792"
        stroke="#3366aa"
        strokeWidth="1"
        opacity="0.5"
      />

      {/* Clock — "3:14 PM" */}
      <text
        x="1156"
        y="782"
        textAnchor="middle"
        fontFamily="Tahoma, sans-serif"
        fontSize="12"
        fill="#ffffff"
        fontWeight="bold"
        opacity="0.95"
      >
        3:14 PM
      </text>
    </svg>
  );

  const renderBitcoinWorld = () => (
    <svg
      role="img"
      aria-label="Bitcoin blockchain world background"
      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Deep black background */}
        <linearGradient id="btcBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#050505" />
          <stop offset="100%" stopColor="#0a0800" />
        </linearGradient>
        {/* Orange radial glow centered on BTC logo */}
        <radialGradient id="btcLogoGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f7931a" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#f7931a" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#f7931a" stopOpacity="0" />
        </radialGradient>
        {/* Bitcoin circle fill gradient */}
        <radialGradient id="btcCircleFill" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#1a1000" />
          <stop offset="60%" stopColor="#0d0d0d" />
          <stop offset="100%" stopColor="#050500" />
        </radialGradient>
        {/* Block dark fill */}
        <linearGradient id="btcBlockFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e1e1e" />
          <stop offset="100%" stopColor="#141414" />
        </linearGradient>
        {/* Orange blur filter for logo glow layer */}
        <filter
          id="btcLogoGlowFilter"
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
        >
          <feGaussianBlur stdDeviation="10" result="blur" />
        </filter>
      </defs>

      {/* === BACKGROUND === */}
      <rect width="1200" height="800" fill="url(#btcBgGrad)" />

      {/* === CIRCUIT GRID — very faint === */}
      <g stroke="#1a1000" strokeWidth="0.5" opacity="0.7">
        {/* Vertical lines every 60px */}
        <line x1="60" y1="0" x2="60" y2="800" />
        <line x1="120" y1="0" x2="120" y2="800" />
        <line x1="180" y1="0" x2="180" y2="800" />
        <line x1="240" y1="0" x2="240" y2="800" />
        <line x1="300" y1="0" x2="300" y2="800" />
        <line x1="360" y1="0" x2="360" y2="800" />
        <line x1="420" y1="0" x2="420" y2="800" />
        <line x1="480" y1="0" x2="480" y2="800" />
        <line x1="540" y1="0" x2="540" y2="800" />
        <line x1="600" y1="0" x2="600" y2="800" />
        <line x1="660" y1="0" x2="660" y2="800" />
        <line x1="720" y1="0" x2="720" y2="800" />
        <line x1="780" y1="0" x2="780" y2="800" />
        <line x1="840" y1="0" x2="840" y2="800" />
        <line x1="900" y1="0" x2="900" y2="800" />
        <line x1="960" y1="0" x2="960" y2="800" />
        <line x1="1020" y1="0" x2="1020" y2="800" />
        <line x1="1080" y1="0" x2="1080" y2="800" />
        <line x1="1140" y1="0" x2="1140" y2="800" />
        {/* Horizontal lines every 60px */}
        <line x1="0" y1="60" x2="1200" y2="60" />
        <line x1="0" y1="120" x2="1200" y2="120" />
        <line x1="0" y1="180" x2="1200" y2="180" />
        <line x1="0" y1="240" x2="1200" y2="240" />
        <line x1="0" y1="300" x2="1200" y2="300" />
        <line x1="0" y1="360" x2="1200" y2="360" />
        <line x1="0" y1="420" x2="1200" y2="420" />
        <line x1="0" y1="480" x2="1200" y2="480" />
        <line x1="0" y1="540" x2="1200" y2="540" />
        <line x1="0" y1="600" x2="1200" y2="600" />
        <line x1="0" y1="660" x2="1200" y2="660" />
        <line x1="0" y1="720" x2="1200" y2="720" />
      </g>

      {/* Grid junction dots */}
      <g fill="#2a1800" opacity="0.8">
        {[
          60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840,
          900, 960, 1020, 1080, 1140,
        ].map((x) =>
          [60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720].map(
            (y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" />,
          ),
        )}
      </g>

      {/* Diagonal circuit traces */}
      <g stroke="#2a1500" strokeWidth="0.8" opacity="0.5" fill="none">
        <path d="M60,120 L120,60" />
        <path d="M180,60 L240,120 L300,60" />
        <path d="M900,60 L960,120 L1020,60" />
        <path d="M1080,120 L1140,60" />
        <path d="M60,660 L120,720" />
        <path d="M180,720 L240,660 L300,720" />
        <path d="M900,720 L960,660 L1020,720" />
        <path d="M1080,660 L1140,720" />
      </g>

      {/* === LARGE ORANGE GLOW BEHIND LOGO === */}
      <ellipse cx="600" cy="350" rx="300" ry="280" fill="url(#btcLogoGlow)" />

      {/* === BLOCKCHAIN NODES — top-left cluster === */}
      <g>
        {/* Block 1 */}
        <rect
          x="30"
          y="50"
          width="85"
          height="52"
          rx="6"
          fill="url(#btcBlockFill)"
          stroke="#f7931a"
          strokeWidth="1.5"
        />
        <line
          x1="43"
          y1="66"
          x2="102"
          y2="66"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="43"
          y1="76"
          x2="102"
          y2="76"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line
          x1="43"
          y1="86"
          x2="88"
          y2="86"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.3"
        />
        {/* Block 2 */}
        <rect
          x="150"
          y="50"
          width="85"
          height="52"
          rx="6"
          fill="url(#btcBlockFill)"
          stroke="#f7931a"
          strokeWidth="1.5"
        />
        <line
          x1="163"
          y1="66"
          x2="222"
          y2="66"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="163"
          y1="76"
          x2="222"
          y2="76"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line
          x1="163"
          y1="86"
          x2="208"
          y2="86"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.3"
        />
        {/* Chain link between 1 and 2 */}
        <line
          x1="115"
          y1="76"
          x2="150"
          y2="76"
          stroke="#888888"
          strokeWidth="1"
          opacity="0.6"
        />
        <polygon points="146,72 150,76 146,80" fill="#888888" opacity="0.6" />
        {/* Block 3 */}
        <rect
          x="80"
          y="145"
          width="85"
          height="52"
          rx="6"
          fill="url(#btcBlockFill)"
          stroke="#f7931a"
          strokeWidth="1.5"
        />
        <line
          x1="93"
          y1="161"
          x2="152"
          y2="161"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="93"
          y1="171"
          x2="152"
          y2="171"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line
          x1="93"
          y1="181"
          x2="138"
          y2="181"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.3"
        />
        {/* Link from block 1 down */}
        <line
          x1="72"
          y1="102"
          x2="120"
          y2="145"
          stroke="#888888"
          strokeWidth="1"
          opacity="0.5"
        />
      </g>

      {/* === BLOCKCHAIN NODES — top-right cluster === */}
      <g>
        <rect
          x="985"
          y="50"
          width="85"
          height="52"
          rx="6"
          fill="url(#btcBlockFill)"
          stroke="#f7931a"
          strokeWidth="1.5"
        />
        <line
          x1="998"
          y1="66"
          x2="1057"
          y2="66"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="998"
          y1="76"
          x2="1057"
          y2="76"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line
          x1="998"
          y1="86"
          x2="1043"
          y2="86"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.3"
        />
        <rect
          x="1100"
          y="50"
          width="85"
          height="52"
          rx="6"
          fill="url(#btcBlockFill)"
          stroke="#f7931a"
          strokeWidth="1.5"
        />
        <line
          x1="1113"
          y1="66"
          x2="1172"
          y2="66"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="1113"
          y1="76"
          x2="1172"
          y2="76"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line
          x1="1113"
          y1="86"
          x2="1158"
          y2="86"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.3"
        />
        <line
          x1="1070"
          y1="76"
          x2="1100"
          y2="76"
          stroke="#888888"
          strokeWidth="1"
          opacity="0.6"
        />
        <polygon
          points="1096,72 1100,76 1096,80"
          fill="#888888"
          opacity="0.6"
        />
        <rect
          x="1040"
          y="145"
          width="85"
          height="52"
          rx="6"
          fill="url(#btcBlockFill)"
          stroke="#f7931a"
          strokeWidth="1.5"
        />
        <line
          x1="1053"
          y1="161"
          x2="1112"
          y2="161"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="1053"
          y1="171"
          x2="1112"
          y2="171"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line
          x1="1053"
          y1="181"
          x2="1098"
          y2="181"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.3"
        />
        <line
          x1="1127"
          y1="102"
          x2="1082"
          y2="145"
          stroke="#888888"
          strokeWidth="1"
          opacity="0.5"
        />
      </g>

      {/* === BLOCKCHAIN NODES — left-center === */}
      <g>
        <rect
          x="25"
          y="350"
          width="85"
          height="52"
          rx="6"
          fill="url(#btcBlockFill)"
          stroke="#f7931a"
          strokeWidth="1.5"
        />
        <line
          x1="38"
          y1="366"
          x2="97"
          y2="366"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="38"
          y1="376"
          x2="97"
          y2="376"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line
          x1="38"
          y1="386"
          x2="83"
          y2="386"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.3"
        />
        <rect
          x="25"
          y="440"
          width="85"
          height="52"
          rx="6"
          fill="url(#btcBlockFill)"
          stroke="#f7931a"
          strokeWidth="1.5"
        />
        <line
          x1="38"
          y1="456"
          x2="97"
          y2="456"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="38"
          y1="466"
          x2="97"
          y2="466"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line
          x1="38"
          y1="476"
          x2="83"
          y2="476"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.3"
        />
        <line
          x1="67"
          y1="402"
          x2="67"
          y2="440"
          stroke="#888888"
          strokeWidth="1"
          opacity="0.6"
        />
        <polygon points="63,436 67,440 71,436" fill="#888888" opacity="0.6" />
      </g>

      {/* === BLOCKCHAIN NODES — right-center === */}
      <g>
        <rect
          x="1090"
          y="350"
          width="85"
          height="52"
          rx="6"
          fill="url(#btcBlockFill)"
          stroke="#f7931a"
          strokeWidth="1.5"
        />
        <line
          x1="1103"
          y1="366"
          x2="1162"
          y2="366"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="1103"
          y1="376"
          x2="1162"
          y2="376"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line
          x1="1103"
          y1="386"
          x2="1148"
          y2="386"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.3"
        />
        <rect
          x="1090"
          y="440"
          width="85"
          height="52"
          rx="6"
          fill="url(#btcBlockFill)"
          stroke="#f7931a"
          strokeWidth="1.5"
        />
        <line
          x1="1103"
          y1="456"
          x2="1162"
          y2="456"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="1103"
          y1="466"
          x2="1162"
          y2="466"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line
          x1="1103"
          y1="476"
          x2="1148"
          y2="476"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.3"
        />
        <line
          x1="1132"
          y1="402"
          x2="1132"
          y2="440"
          stroke="#888888"
          strokeWidth="1"
          opacity="0.6"
        />
        <polygon
          points="1128,436 1132,440 1136,436"
          fill="#888888"
          opacity="0.6"
        />
      </g>

      {/* === BLOCKCHAIN NODES — bottom-left === */}
      <g>
        <rect
          x="30"
          y="650"
          width="85"
          height="52"
          rx="6"
          fill="url(#btcBlockFill)"
          stroke="#f7931a"
          strokeWidth="1.5"
        />
        <line
          x1="43"
          y1="666"
          x2="102"
          y2="666"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="43"
          y1="676"
          x2="102"
          y2="676"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line
          x1="43"
          y1="686"
          x2="88"
          y2="686"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.3"
        />
        <rect
          x="150"
          y="700"
          width="85"
          height="52"
          rx="6"
          fill="url(#btcBlockFill)"
          stroke="#f7931a"
          strokeWidth="1.5"
        />
        <line
          x1="163"
          y1="716"
          x2="222"
          y2="716"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="163"
          y1="726"
          x2="222"
          y2="726"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line
          x1="115"
          y1="676"
          x2="150"
          y2="726"
          stroke="#888888"
          strokeWidth="1"
          opacity="0.5"
        />
      </g>

      {/* === BLOCKCHAIN NODES — bottom-right === */}
      <g>
        <rect
          x="985"
          y="650"
          width="85"
          height="52"
          rx="6"
          fill="url(#btcBlockFill)"
          stroke="#f7931a"
          strokeWidth="1.5"
        />
        <line
          x1="998"
          y1="666"
          x2="1057"
          y2="666"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="998"
          y1="676"
          x2="1057"
          y2="676"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line
          x1="998"
          y1="686"
          x2="1043"
          y2="686"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.3"
        />
        <rect
          x="1100"
          y="700"
          width="85"
          height="52"
          rx="6"
          fill="url(#btcBlockFill)"
          stroke="#f7931a"
          strokeWidth="1.5"
        />
        <line
          x1="1113"
          y1="716"
          x2="1172"
          y2="716"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="1113"
          y1="726"
          x2="1172"
          y2="726"
          stroke="#cccccc"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line
          x1="1070"
          y1="676"
          x2="1113"
          y2="716"
          stroke="#888888"
          strokeWidth="1"
          opacity="0.5"
        />
      </g>

      {/* === BITCOIN LOGO — centered at 600,350 === */}

      {/* Outer subtle glow ring */}
      <circle cx="600" cy="350" r="250" fill="url(#btcLogoGlow)" />
      <circle cx="600" cy="350" r="200" fill="url(#btcLogoGlow)" />

      {/* Dashed outer ring */}
      <circle
        cx="600"
        cy="350"
        r="175"
        fill="none"
        stroke="#f7931a"
        strokeWidth="2"
        strokeDasharray="8 4"
        opacity="0.6"
      />

      {/* Main circle */}
      <circle
        cx="600"
        cy="350"
        r="160"
        fill="url(#btcCircleFill)"
        stroke="#f7931a"
        strokeWidth="6"
      />

      {/* Inner subtle radial glow on circle */}
      <circle
        cx="600"
        cy="350"
        r="155"
        fill="none"
        stroke="#ff9500"
        strokeWidth="1"
        opacity="0.2"
      />
      <circle
        cx="600"
        cy="350"
        r="145"
        fill="none"
        stroke="#f7931a"
        strokeWidth="0.5"
        opacity="0.15"
      />

      {/* Official Bitcoin logo — authentic bitcoin.org ₿ SVG path */}
      {/* Path natural bbox: x≈0..80, y≈0..120 → center offset: (-40, -60) */}
      {/* Orange drop-shadow/glow layer rendered behind white logo */}
      <g
        transform="translate(600, 350) rotate(14) scale(1.7) translate(-40, -60)"
        fill="#f7931a"
        opacity="0.55"
        filter="url(#btcLogoGlowFilter)"
      >
        <path d="M78.3 36.6c1.8-12.2-7.5-18.8-20.2-23.2l4.1-16.6-10.1-2.5-4 16.1c-2.7-.7-5.4-1.3-8.1-1.9l4.1-16.3-10.1-2.5-4.1 16.6c-2.2-.5-4.4-1-6.5-1.5l0 0-13.9-3.5-2.7 10.8s7.5 1.7 7.4 1.8c4.1 1 4.8 3.7 4.7 5.9l-4.7 18.8c.3.1.7.2 1.1.3-.4-.1-.7-.2-1.1-.3l-6.6 26.4c-.5 1.2-1.8 3-4.6 2.3.1.1-7.4-1.9-7.4-1.9l-5.1 11.5 13.2 3.3c2.4.6 4.8 1.2 7.2 1.9l-4.2 16.7 10.1 2.5 4.1-16.6c2.8.7 5.5 1.4 8.2 2.1l-4.1 16.5 10.1 2.5 4.2-16.8c17.3 3.3 30.3 1.9 35.8-13.6 4.4-12.6.2-19.9-9.3-24.6 6.6-1.5 11.6-5.9 12.9-14.7zm-23.1 32.4c-3.1 12.6-24.3 5.8-31.2 4.1l5.6-22.3c6.9 1.7 28.9 5.1 25.6 18.2zm3.1-32.7c-2.9 11.5-20.5 5.7-26.2 4.2l5-20.1c5.7 1.4 24.1 4.1 21.2 15.9z" />
      </g>
      {/* White official Bitcoin logo on top */}
      <g
        transform="translate(600, 350) rotate(14) scale(1.7) translate(-40, -60)"
        fill="#ffffff"
      >
        <path d="M78.3 36.6c1.8-12.2-7.5-18.8-20.2-23.2l4.1-16.6-10.1-2.5-4 16.1c-2.7-.7-5.4-1.3-8.1-1.9l4.1-16.3-10.1-2.5-4.1 16.6c-2.2-.5-4.4-1-6.5-1.5l0 0-13.9-3.5-2.7 10.8s7.5 1.7 7.4 1.8c4.1 1 4.8 3.7 4.7 5.9l-4.7 18.8c.3.1.7.2 1.1.3-.4-.1-.7-.2-1.1-.3l-6.6 26.4c-.5 1.2-1.8 3-4.6 2.3.1.1-7.4-1.9-7.4-1.9l-5.1 11.5 13.2 3.3c2.4.6 4.8 1.2 7.2 1.9l-4.2 16.7 10.1 2.5 4.1-16.6c2.8.7 5.5 1.4 8.2 2.1l-4.1 16.5 10.1 2.5 4.2-16.8c17.3 3.3 30.3 1.9 35.8-13.6 4.4-12.6.2-19.9-9.3-24.6 6.6-1.5 11.6-5.9 12.9-14.7zm-23.1 32.4c-3.1 12.6-24.3 5.8-31.2 4.1l5.6-22.3c6.9 1.7 28.9 5.1 25.6 18.2zm3.1-32.7c-2.9 11.5-20.5 5.7-26.2 4.2l5-20.1c5.7 1.4 24.1 4.1 21.2 15.9z" />
      </g>
    </svg>
  );

  const renderMatrixWorld = () => (
    <svg
      role="img"
      aria-label="Matrix world background"
      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Deep black background gradient */}
        <linearGradient id="matrixBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="50%" stopColor="#010501" />
          <stop offset="100%" stopColor="#000300" />
        </linearGradient>

        {/* Green ambient glow filter */}
        <filter id="matrixGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Subtle wide glow for leading chars */}
        <filter
          id="matrixLeadGlow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Vignette overlay */}
        <radialGradient id="matrixVignette" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="75%" stopColor="#000000" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="1200" height="800" fill="url(#matrixBgGrad)" />

      {/* ── CRT SCANLINES (horizontal, very faint) ── */}
      <g opacity="0.06" stroke="#00ff41" strokeWidth="1">
        <line x1="0" y1="10" x2="1200" y2="10" />
        <line x1="0" y1="20" x2="1200" y2="20" />
        <line x1="0" y1="30" x2="1200" y2="30" />
        <line x1="0" y1="40" x2="1200" y2="40" />
        <line x1="0" y1="50" x2="1200" y2="50" />
        <line x1="0" y1="60" x2="1200" y2="60" />
        <line x1="0" y1="70" x2="1200" y2="70" />
        <line x1="0" y1="80" x2="1200" y2="80" />
        <line x1="0" y1="90" x2="1200" y2="90" />
        <line x1="0" y1="100" x2="1200" y2="100" />
        <line x1="0" y1="110" x2="1200" y2="110" />
        <line x1="0" y1="120" x2="1200" y2="120" />
        <line x1="0" y1="130" x2="1200" y2="130" />
        <line x1="0" y1="140" x2="1200" y2="140" />
        <line x1="0" y1="150" x2="1200" y2="150" />
        <line x1="0" y1="160" x2="1200" y2="160" />
        <line x1="0" y1="170" x2="1200" y2="170" />
        <line x1="0" y1="180" x2="1200" y2="180" />
        <line x1="0" y1="190" x2="1200" y2="190" />
        <line x1="0" y1="200" x2="1200" y2="200" />
        <line x1="0" y1="210" x2="1200" y2="210" />
        <line x1="0" y1="220" x2="1200" y2="220" />
        <line x1="0" y1="230" x2="1200" y2="230" />
        <line x1="0" y1="240" x2="1200" y2="240" />
        <line x1="0" y1="250" x2="1200" y2="250" />
        <line x1="0" y1="260" x2="1200" y2="260" />
        <line x1="0" y1="270" x2="1200" y2="270" />
        <line x1="0" y1="280" x2="1200" y2="280" />
        <line x1="0" y1="290" x2="1200" y2="290" />
        <line x1="0" y1="300" x2="1200" y2="300" />
        <line x1="0" y1="310" x2="1200" y2="310" />
        <line x1="0" y1="320" x2="1200" y2="320" />
        <line x1="0" y1="330" x2="1200" y2="330" />
        <line x1="0" y1="340" x2="1200" y2="340" />
        <line x1="0" y1="350" x2="1200" y2="350" />
        <line x1="0" y1="360" x2="1200" y2="360" />
        <line x1="0" y1="370" x2="1200" y2="370" />
        <line x1="0" y1="380" x2="1200" y2="380" />
        <line x1="0" y1="390" x2="1200" y2="390" />
        <line x1="0" y1="400" x2="1200" y2="400" />
        <line x1="0" y1="410" x2="1200" y2="410" />
        <line x1="0" y1="420" x2="1200" y2="420" />
        <line x1="0" y1="430" x2="1200" y2="430" />
        <line x1="0" y1="440" x2="1200" y2="440" />
        <line x1="0" y1="450" x2="1200" y2="450" />
        <line x1="0" y1="460" x2="1200" y2="460" />
        <line x1="0" y1="470" x2="1200" y2="470" />
        <line x1="0" y1="480" x2="1200" y2="480" />
        <line x1="0" y1="490" x2="1200" y2="490" />
        <line x1="0" y1="500" x2="1200" y2="500" />
        <line x1="0" y1="510" x2="1200" y2="510" />
        <line x1="0" y1="520" x2="1200" y2="520" />
        <line x1="0" y1="530" x2="1200" y2="530" />
        <line x1="0" y1="540" x2="1200" y2="540" />
        <line x1="0" y1="550" x2="1200" y2="550" />
        <line x1="0" y1="560" x2="1200" y2="560" />
        <line x1="0" y1="570" x2="1200" y2="570" />
        <line x1="0" y1="580" x2="1200" y2="580" />
        <line x1="0" y1="590" x2="1200" y2="590" />
        <line x1="0" y1="600" x2="1200" y2="600" />
        <line x1="0" y1="610" x2="1200" y2="610" />
        <line x1="0" y1="620" x2="1200" y2="620" />
        <line x1="0" y1="630" x2="1200" y2="630" />
        <line x1="0" y1="640" x2="1200" y2="640" />
        <line x1="0" y1="650" x2="1200" y2="650" />
        <line x1="0" y1="660" x2="1200" y2="660" />
        <line x1="0" y1="670" x2="1200" y2="670" />
        <line x1="0" y1="680" x2="1200" y2="680" />
        <line x1="0" y1="690" x2="1200" y2="690" />
        <line x1="0" y1="700" x2="1200" y2="700" />
        <line x1="0" y1="710" x2="1200" y2="710" />
        <line x1="0" y1="720" x2="1200" y2="720" />
        <line x1="0" y1="730" x2="1200" y2="730" />
        <line x1="0" y1="740" x2="1200" y2="740" />
        <line x1="0" y1="750" x2="1200" y2="750" />
        <line x1="0" y1="760" x2="1200" y2="760" />
        <line x1="0" y1="770" x2="1200" y2="770" />
        <line x1="0" y1="780" x2="1200" y2="780" />
        <line x1="0" y1="790" x2="1200" y2="790" />
        <line x1="0" y1="800" x2="1200" y2="800" />
      </g>

      {/* ── COLUMN DEFINITIONS ──
          30 columns across 1200px (every ~40px)
          Each column: faint trail chars, medium chars, bright mid, white lead
          All y positions are static "frozen rain" at different stages
      ── */}

      {/* === VERY FAINT DEEP TRAIL CHARS — darkest green === */}
      <g
        fontFamily="'Courier New', Courier, monospace"
        fontSize="13"
        fill="#003311"
        opacity="0.7"
      >
        {/* Col 0 x=18 */}
        <text x="18" y="680">
          ﾊ
        </text>
        <text x="18" y="665">
          7
        </text>
        <text x="18" y="650">
          ﾐ
        </text>
        <text x="18" y="635">
          4
        </text>
        <text x="18" y="620">
          ﾑ
        </text>
        {/* Col 1 x=58 */}
        <text x="58" y="720">
          ﾂ
        </text>
        <text x="58" y="705">
          2
        </text>
        <text x="58" y="690">
          ﾃ
        </text>
        <text x="58" y="675">
          9
        </text>
        <text x="58" y="660">
          ﾄ
        </text>
        <text x="58" y="645">
          1
        </text>
        {/* Col 2 x=98 */}
        <text x="98" y="780">
          ﾅ
        </text>
        <text x="98" y="765">
          6
        </text>
        <text x="98" y="750">
          ﾆ
        </text>
        <text x="98" y="735">
          3
        </text>
        <text x="98" y="720">
          ﾇ
        </text>
        {/* Col 3 x=138 */}
        <text x="138" y="640">
          ﾈ
        </text>
        <text x="138" y="625">
          8
        </text>
        <text x="138" y="610">
          ﾉ
        </text>
        <text x="138" y="595">
          5
        </text>
        {/* Col 4 x=178 */}
        <text x="178" y="760">
          ﾊ
        </text>
        <text x="178" y="745">
          0
        </text>
        <text x="178" y="730">
          ﾋ
        </text>
        <text x="178" y="715">
          7
        </text>
        <text x="178" y="700">
          ﾌ
        </text>
        {/* Col 5 x=218 */}
        <text x="218" y="690">
          ﾍ
        </text>
        <text x="218" y="675">
          4
        </text>
        <text x="218" y="660">
          ﾎ
        </text>
        <text x="218" y="645">
          2
        </text>
        {/* Col 6 x=258 */}
        <text x="258" y="800">
          ﾏ
        </text>
        <text x="258" y="785">
          9
        </text>
        <text x="258" y="770">
          ﾐ
        </text>
        <text x="258" y="755">
          1
        </text>
        <text x="258" y="740">
          ﾑ
        </text>
        {/* Col 7 x=298 */}
        <text x="298" y="600">
          ﾒ
        </text>
        <text x="298" y="585">
          6
        </text>
        <text x="298" y="570">
          ﾓ
        </text>
        <text x="298" y="555">
          3
        </text>
        {/* Col 8 x=338 */}
        <text x="338" y="730">
          ﾔ
        </text>
        <text x="338" y="715">
          5
        </text>
        <text x="338" y="700">
          ﾕ
        </text>
        <text x="338" y="685">
          8
        </text>
        {/* Col 9 x=378 */}
        <text x="378" y="670">
          ﾖ
        </text>
        <text x="378" y="655">
          2
        </text>
        <text x="378" y="640">
          ﾗ
        </text>
        <text x="378" y="625">
          7
        </text>
        {/* Col 10 x=418 */}
        <text x="418" y="790">
          ﾘ
        </text>
        <text x="418" y="775">
          0
        </text>
        <text x="418" y="760">
          ﾙ
        </text>
        <text x="418" y="745">
          4
        </text>
        <text x="418" y="730">
          ﾚ
        </text>
        {/* Col 11 x=458 */}
        <text x="458" y="620">
          ﾛ
        </text>
        <text x="458" y="605">
          9
        </text>
        <text x="458" y="590">
          ﾜ
        </text>
        <text x="458" y="575">
          1
        </text>
        {/* Col 12 x=498 */}
        <text x="498" y="750">
          ﾝ
        </text>
        <text x="498" y="735">
          6
        </text>
        <text x="498" y="720">
          ﾞ
        </text>
        <text x="498" y="705">
          3
        </text>
        {/* Col 13 x=538 */}
        <text x="538" y="700">
          ﾟ
        </text>
        <text x="538" y="685">
          5
        </text>
        <text x="538" y="670">
          ﾠ
        </text>
        <text x="538" y="655">
          8
        </text>
        {/* Col 14 x=578 */}
        <text x="578" y="760">
          ﾡ
        </text>
        <text x="578" y="745">
          2
        </text>
        <text x="578" y="730">
          ﾢ
        </text>
        <text x="578" y="715">
          7
        </text>
        {/* Col 15 x=618 */}
        <text x="618" y="640">
          ﾣ
        </text>
        <text x="618" y="625">
          4
        </text>
        <text x="618" y="610">
          ﾤ
        </text>
        <text x="618" y="595">
          0
        </text>
        {/* Col 16 x=658 */}
        <text x="658" y="800">
          ﾥ
        </text>
        <text x="658" y="785">
          9
        </text>
        <text x="658" y="770">
          ﾦ
        </text>
        <text x="658" y="755">
          1
        </text>
        <text x="658" y="740">
          ﾧ
        </text>
        {/* Col 17 x=698 */}
        <text x="698" y="710">
          ﾨ
        </text>
        <text x="698" y="695">
          6
        </text>
        <text x="698" y="680">
          ﾩ
        </text>
        <text x="698" y="665">
          3
        </text>
        {/* Col 18 x=738 */}
        <text x="738" y="790">
          ﾪ
        </text>
        <text x="738" y="775">
          5
        </text>
        <text x="738" y="760">
          ﾫ
        </text>
        <text x="738" y="745">
          8
        </text>
        {/* Col 19 x=778 */}
        <text x="778" y="680">
          ﾬ
        </text>
        <text x="778" y="665">
          2
        </text>
        <text x="778" y="650">
          ﾭ
        </text>
        <text x="778" y="635">
          7
        </text>
        {/* Col 20 x=818 */}
        <text x="818" y="730">
          ﾮ
        </text>
        <text x="818" y="715">
          0
        </text>
        <text x="818" y="700">
          ﾯ
        </text>
        <text x="818" y="685">
          4
        </text>
        {/* Col 21 x=858 */}
        <text x="858" y="770">
          ﾰ
        </text>
        <text x="858" y="755">
          9
        </text>
        <text x="858" y="740">
          ﾱ
        </text>
        <text x="858" y="725">
          1
        </text>
        {/* Col 22 x=898 */}
        <text x="898" y="650">
          ﾲ
        </text>
        <text x="898" y="635">
          6
        </text>
        <text x="898" y="620">
          ﾳ
        </text>
        <text x="898" y="605">
          3
        </text>
        {/* Col 23 x=938 */}
        <text x="938" y="800">
          ﾴ
        </text>
        <text x="938" y="785">
          5
        </text>
        <text x="938" y="770">
          ﾵ
        </text>
        <text x="938" y="755">
          8
        </text>
        {/* Col 24 x=978 */}
        <text x="978" y="720">
          ﾶ
        </text>
        <text x="978" y="705">
          2
        </text>
        <text x="978" y="690">
          ﾷ
        </text>
        <text x="978" y="675">
          7
        </text>
        {/* Col 25 x=1018 */}
        <text x="1018" y="760">
          ﾸ
        </text>
        <text x="1018" y="745">
          0
        </text>
        <text x="1018" y="730">
          ﾹ
        </text>
        <text x="1018" y="715">
          4
        </text>
        {/* Col 26 x=1058 */}
        <text x="1058" y="690">
          ﾺ
        </text>
        <text x="1058" y="675">
          9
        </text>
        <text x="1058" y="660">
          ﾻ
        </text>
        <text x="1058" y="645">
          1
        </text>
        {/* Col 27 x=1098 */}
        <text x="1098" y="800">
          ﾼ
        </text>
        <text x="1098" y="785">
          6
        </text>
        <text x="1098" y="770">
          ﾽ
        </text>
        <text x="1098" y="755">
          3
        </text>
        {/* Col 28 x=1138 */}
        <text x="1138" y="740">
          ﾾ
        </text>
        <text x="1138" y="725">
          5
        </text>
        <text x="1138" y="710">
          ｦ
        </text>
        <text x="1138" y="695">
          8
        </text>
        {/* Col 29 x=1178 */}
        <text x="1178" y="680">
          ｧ
        </text>
        <text x="1178" y="665">
          2
        </text>
        <text x="1178" y="650">
          ｨ
        </text>
        <text x="1178" y="635">
          7
        </text>
      </g>

      {/* === MEDIUM TRAIL CHARS — mid-dark green === */}
      <g
        fontFamily="'Courier New', Courier, monospace"
        fontSize="14"
        fill="#007722"
        opacity="0.85"
        filter="url(#matrixGlow)"
      >
        {/* Col 0 */}
        <text x="17" y="580">
          ﾂ
        </text>
        <text x="17" y="565">
          3
        </text>
        <text x="17" y="550">
          ﾃ
        </text>
        <text x="17" y="535">
          6
        </text>
        {/* Col 1 */}
        <text x="57" y="560">
          ﾊ
        </text>
        <text x="57" y="545">
          1
        </text>
        <text x="57" y="530">
          ﾋ
        </text>
        <text x="57" y="515">
          4
        </text>
        {/* Col 2 */}
        <text x="97" y="620">
          ﾌ
        </text>
        <text x="97" y="605">
          8
        </text>
        <text x="97" y="590">
          ﾍ
        </text>
        <text x="97" y="575">
          5
        </text>
        {/* Col 3 */}
        <text x="137" y="510">
          ﾎ
        </text>
        <text x="137" y="495">
          2
        </text>
        <text x="137" y="480">
          ﾏ
        </text>
        <text x="137" y="465">
          9
        </text>
        {/* Col 4 */}
        <text x="177" y="605">
          ﾐ
        </text>
        <text x="177" y="590">
          0
        </text>
        <text x="177" y="575">
          ﾑ
        </text>
        <text x="177" y="560">
          7
        </text>
        {/* Col 5 */}
        <text x="217" y="555">
          ﾒ
        </text>
        <text x="217" y="540">
          4
        </text>
        <text x="217" y="525">
          ﾓ
        </text>
        <text x="217" y="510">
          1
        </text>
        {/* Col 6 */}
        <text x="257" y="645">
          ﾔ
        </text>
        <text x="257" y="630">
          6
        </text>
        <text x="257" y="615">
          ﾕ
        </text>
        <text x="257" y="600">
          3
        </text>
        {/* Col 7 */}
        <text x="297" y="490">
          ﾖ
        </text>
        <text x="297" y="475">
          8
        </text>
        <text x="297" y="460">
          ﾗ
        </text>
        <text x="297" y="445">
          5
        </text>
        {/* Col 8 */}
        <text x="337" y="610">
          ﾘ
        </text>
        <text x="337" y="595">
          2
        </text>
        <text x="337" y="580">
          ﾙ
        </text>
        <text x="337" y="565">
          9
        </text>
        {/* Col 9 */}
        <text x="377" y="545">
          ﾚ
        </text>
        <text x="377" y="530">
          7
        </text>
        <text x="377" y="515">
          ﾛ
        </text>
        <text x="377" y="500">
          4
        </text>
        {/* Col 10 */}
        <text x="417" y="635">
          ﾜ
        </text>
        <text x="417" y="620">
          1
        </text>
        <text x="417" y="605">
          ﾝ
        </text>
        <text x="417" y="590">
          6
        </text>
        {/* Col 11 */}
        <text x="457" y="500">
          ｦ
        </text>
        <text x="457" y="485">
          3
        </text>
        <text x="457" y="470">
          ｧ
        </text>
        <text x="457" y="455">
          0
        </text>
        {/* Col 12 */}
        <text x="497" y="625">
          ｨ
        </text>
        <text x="497" y="610">
          8
        </text>
        <text x="497" y="595">
          ｩ
        </text>
        <text x="497" y="580">
          5
        </text>
        {/* Col 13 */}
        <text x="537" y="575">
          ｪ
        </text>
        <text x="537" y="560">
          2
        </text>
        <text x="537" y="545">
          ｫ
        </text>
        <text x="537" y="530">
          9
        </text>
        {/* Col 14 */}
        <text x="577" y="630">
          ｬ
        </text>
        <text x="577" y="615">
          7
        </text>
        <text x="577" y="600">
          ｭ
        </text>
        <text x="577" y="585">
          4
        </text>
        {/* Col 15 */}
        <text x="617" y="520">
          ｮ
        </text>
        <text x="617" y="505">
          1
        </text>
        <text x="617" y="490">
          ｯ
        </text>
        <text x="617" y="475">
          6
        </text>
        {/* Col 16 */}
        <text x="657" y="650">
          ｰ
        </text>
        <text x="657" y="635">
          3
        </text>
        <text x="657" y="620">
          ｱ
        </text>
        <text x="657" y="605">
          8
        </text>
        {/* Col 17 */}
        <text x="697" y="600">
          ｲ
        </text>
        <text x="697" y="585">
          5
        </text>
        <text x="697" y="570">
          ｳ
        </text>
        <text x="697" y="555">
          2
        </text>
        {/* Col 18 */}
        <text x="737" y="665">
          ｴ
        </text>
        <text x="737" y="650">
          0
        </text>
        <text x="737" y="635">
          ｵ
        </text>
        <text x="737" y="620">
          7
        </text>
        {/* Col 19 */}
        <text x="777" y="565">
          ｶ
        </text>
        <text x="777" y="550">
          4
        </text>
        <text x="777" y="535">
          ｷ
        </text>
        <text x="777" y="520">
          1
        </text>
        {/* Col 20 */}
        <text x="817" y="620">
          ｸ
        </text>
        <text x="817" y="605">
          9
        </text>
        <text x="817" y="590">
          ｹ
        </text>
        <text x="817" y="575">
          6
        </text>
        {/* Col 21 */}
        <text x="857" y="650">
          ｺ
        </text>
        <text x="857" y="635">
          3
        </text>
        <text x="857" y="620">
          ｻ
        </text>
        <text x="857" y="605">
          8
        </text>
        {/* Col 22 */}
        <text x="897" y="545">
          ｼ
        </text>
        <text x="897" y="530">
          5
        </text>
        <text x="897" y="515">
          ｽ
        </text>
        <text x="897" y="500">
          2
        </text>
        {/* Col 23 */}
        <text x="937" y="665">
          ｾ
        </text>
        <text x="937" y="650">
          7
        </text>
        <text x="937" y="635">
          ｿ
        </text>
        <text x="937" y="620">
          0
        </text>
        {/* Col 24 */}
        <text x="977" y="610">
          ﾀ
        </text>
        <text x="977" y="595">
          4
        </text>
        <text x="977" y="580">
          ﾁ
        </text>
        <text x="977" y="565">
          9
        </text>
        {/* Col 25 */}
        <text x="1017" y="655">
          ﾂ
        </text>
        <text x="1017" y="640">
          1
        </text>
        <text x="1017" y="625">
          ﾃ
        </text>
        <text x="1017" y="610">
          6
        </text>
        {/* Col 26 */}
        <text x="1057" y="580">
          ﾄ
        </text>
        <text x="1057" y="565">
          3
        </text>
        <text x="1057" y="550">
          ﾅ
        </text>
        <text x="1057" y="535">
          8
        </text>
        {/* Col 27 */}
        <text x="1097" y="670">
          ﾆ
        </text>
        <text x="1097" y="655">
          5
        </text>
        <text x="1097" y="640">
          ﾇ
        </text>
        <text x="1097" y="625">
          2
        </text>
        {/* Col 28 */}
        <text x="1137" y="625">
          ﾈ
        </text>
        <text x="1137" y="610">
          7
        </text>
        <text x="1137" y="595">
          ﾉ
        </text>
        <text x="1137" y="580">
          4
        </text>
        {/* Col 29 */}
        <text x="1177" y="570">
          ﾊ
        </text>
        <text x="1177" y="555">
          0
        </text>
        <text x="1177" y="540">
          ﾋ
        </text>
        <text x="1177" y="525">
          9
        </text>
      </g>

      {/* === MID-BRIGHT CHARS — medium green === */}
      <g
        fontFamily="'Courier New', Courier, monospace"
        fontSize="14"
        fill="#00cc33"
        opacity="0.9"
        filter="url(#matrixGlow)"
      >
        {/* Col 0 */}
        <text x="16" y="450">
          ﾌ
        </text>
        <text x="16" y="436">
          9
        </text>
        <text x="16" y="422">
          ﾍ
        </text>
        <text x="16" y="408">
          2
        </text>
        {/* Col 1 */}
        <text x="56" y="430">
          ﾎ
        </text>
        <text x="56" y="416">
          7
        </text>
        <text x="56" y="402">
          ﾏ
        </text>
        <text x="56" y="388">
          4
        </text>
        {/* Col 2 */}
        <text x="96" y="490">
          ﾐ
        </text>
        <text x="96" y="476">
          1
        </text>
        <text x="96" y="462">
          ﾑ
        </text>
        <text x="96" y="448">
          6
        </text>
        {/* Col 3 */}
        <text x="136" y="385">
          ﾒ
        </text>
        <text x="136" y="371">
          3
        </text>
        <text x="136" y="357">
          ﾓ
        </text>
        <text x="136" y="343">
          0
        </text>
        {/* Col 4 */}
        <text x="176" y="480">
          ﾔ
        </text>
        <text x="176" y="466">
          5
        </text>
        <text x="176" y="452">
          ﾕ
        </text>
        <text x="176" y="438">
          8
        </text>
        {/* Col 5 */}
        <text x="216" y="425">
          ﾖ
        </text>
        <text x="216" y="411">
          2
        </text>
        <text x="216" y="397">
          ﾗ
        </text>
        <text x="216" y="383">
          9
        </text>
        {/* Col 6 */}
        <text x="256" y="510">
          ﾘ
        </text>
        <text x="256" y="496">
          7
        </text>
        <text x="256" y="482">
          ﾙ
        </text>
        <text x="256" y="468">
          4
        </text>
        {/* Col 7 */}
        <text x="296" y="365">
          ﾚ
        </text>
        <text x="296" y="351">
          1
        </text>
        <text x="296" y="337">
          ﾛ
        </text>
        <text x="296" y="323">
          6
        </text>
        {/* Col 8 */}
        <text x="336" y="470">
          ﾜ
        </text>
        <text x="336" y="456">
          3
        </text>
        <text x="336" y="442">
          ﾝ
        </text>
        <text x="336" y="428">
          0
        </text>
        {/* Col 9 */}
        <text x="376" y="415">
          ｦ
        </text>
        <text x="376" y="401">
          8
        </text>
        <text x="376" y="387">
          ｧ
        </text>
        <text x="376" y="373">
          5
        </text>
        {/* Col 10 */}
        <text x="416" y="500">
          ｨ
        </text>
        <text x="416" y="486">
          2
        </text>
        <text x="416" y="472">
          ｩ
        </text>
        <text x="416" y="458">
          9
        </text>
        {/* Col 11 */}
        <text x="456" y="380">
          ｪ
        </text>
        <text x="456" y="366">
          7
        </text>
        <text x="456" y="352">
          ｫ
        </text>
        <text x="456" y="338">
          4
        </text>
        {/* Col 12 */}
        <text x="496" y="495">
          ｬ
        </text>
        <text x="496" y="481">
          1
        </text>
        <text x="496" y="467">
          ｭ
        </text>
        <text x="496" y="453">
          6
        </text>
        {/* Col 13 */}
        <text x="536" y="450">
          ｮ
        </text>
        <text x="536" y="436">
          3
        </text>
        <text x="536" y="422">
          ｯ
        </text>
        <text x="536" y="408">
          8
        </text>
        {/* Col 14 */}
        <text x="576" y="510">
          ｰ
        </text>
        <text x="576" y="496">
          5
        </text>
        <text x="576" y="482">
          ｱ
        </text>
        <text x="576" y="468">
          2
        </text>
        {/* Col 15 */}
        <text x="616" y="395">
          ｲ
        </text>
        <text x="616" y="381">
          0
        </text>
        <text x="616" y="367">
          ｳ
        </text>
        <text x="616" y="353">
          7
        </text>
        {/* Col 16 */}
        <text x="656" y="520">
          ｴ
        </text>
        <text x="656" y="506">
          4
        </text>
        <text x="656" y="492">
          ｵ
        </text>
        <text x="656" y="478">
          1
        </text>
        {/* Col 17 */}
        <text x="696" y="470">
          ｶ
        </text>
        <text x="696" y="456">
          9
        </text>
        <text x="696" y="442">
          ｷ
        </text>
        <text x="696" y="428">
          6
        </text>
        {/* Col 18 */}
        <text x="736" y="535">
          ｸ
        </text>
        <text x="736" y="521">
          3
        </text>
        <text x="736" y="507">
          ｹ
        </text>
        <text x="736" y="493">
          8
        </text>
        {/* Col 19 */}
        <text x="776" y="440">
          ｺ
        </text>
        <text x="776" y="426">
          5
        </text>
        <text x="776" y="412">
          ｻ
        </text>
        <text x="776" y="398">
          2
        </text>
        {/* Col 20 */}
        <text x="816" y="490">
          ｼ
        </text>
        <text x="816" y="476">
          0
        </text>
        <text x="816" y="462">
          ｽ
        </text>
        <text x="816" y="448">
          7
        </text>
        {/* Col 21 */}
        <text x="856" y="520">
          ｾ
        </text>
        <text x="856" y="506">
          4
        </text>
        <text x="856" y="492">
          ｿ
        </text>
        <text x="856" y="478">
          1
        </text>
        {/* Col 22 */}
        <text x="896" y="415">
          ﾀ
        </text>
        <text x="896" y="401">
          6
        </text>
        <text x="896" y="387">
          ﾁ
        </text>
        <text x="896" y="373">
          3
        </text>
        {/* Col 23 */}
        <text x="936" y="535">
          ﾂ
        </text>
        <text x="936" y="521">
          8
        </text>
        <text x="936" y="507">
          ﾃ
        </text>
        <text x="936" y="493">
          5
        </text>
        {/* Col 24 */}
        <text x="976" y="480">
          ﾄ
        </text>
        <text x="976" y="466">
          2
        </text>
        <text x="976" y="452">
          ﾅ
        </text>
        <text x="976" y="438">
          9
        </text>
        {/* Col 25 */}
        <text x="1016" y="525">
          ﾆ
        </text>
        <text x="1016" y="511">
          7
        </text>
        <text x="1016" y="497">
          ﾇ
        </text>
        <text x="1016" y="483">
          4
        </text>
        {/* Col 26 */}
        <text x="1056" y="455">
          ﾈ
        </text>
        <text x="1056" y="441">
          1
        </text>
        <text x="1056" y="427">
          ﾉ
        </text>
        <text x="1056" y="413">
          6
        </text>
        {/* Col 27 */}
        <text x="1096" y="540">
          ﾊ
        </text>
        <text x="1096" y="526">
          3
        </text>
        <text x="1096" y="512">
          ﾋ
        </text>
        <text x="1096" y="498">
          0
        </text>
        {/* Col 28 */}
        <text x="1136" y="500">
          ﾌ
        </text>
        <text x="1136" y="486">
          8
        </text>
        <text x="1136" y="472">
          ﾍ
        </text>
        <text x="1136" y="458">
          5
        </text>
        {/* Col 29 */}
        <text x="1176" y="445">
          ﾎ
        </text>
        <text x="1176" y="431">
          2
        </text>
        <text x="1176" y="417">
          ﾏ
        </text>
        <text x="1176" y="403">
          7
        </text>
      </g>

      {/* === BRIGHT GREEN CHARS — upper-mid columns === */}
      <g
        fontFamily="'Courier New', Courier, monospace"
        fontSize="15"
        fill="#00ff41"
        opacity="0.95"
        filter="url(#matrixGlow)"
      >
        {/* Col 0 */}
        <text x="15" y="340">
          ﾐ
        </text>
        <text x="15" y="325">
          5
        </text>
        <text x="15" y="310">
          ﾑ
        </text>
        {/* Col 1 */}
        <text x="55" y="310">
          ﾒ
        </text>
        <text x="55" y="295">
          0
        </text>
        <text x="55" y="280">
          ﾓ
        </text>
        {/* Col 2 */}
        <text x="95" y="370">
          ﾔ
        </text>
        <text x="95" y="355">
          8
        </text>
        <text x="95" y="340">
          ﾕ
        </text>
        {/* Col 3 */}
        <text x="135" y="270">
          ﾖ
        </text>
        <text x="135" y="255">
          3
        </text>
        <text x="135" y="240">
          ﾗ
        </text>
        {/* Col 4 */}
        <text x="175" y="355">
          ﾘ
        </text>
        <text x="175" y="340">
          6
        </text>
        <text x="175" y="325">
          ﾙ
        </text>
        {/* Col 5 */}
        <text x="215" y="300">
          ﾚ
        </text>
        <text x="215" y="285">
          1
        </text>
        <text x="215" y="270">
          ﾛ
        </text>
        {/* Col 6 */}
        <text x="255" y="390">
          ﾜ
        </text>
        <text x="255" y="375">
          9
        </text>
        <text x="255" y="360">
          ﾝ
        </text>
        {/* Col 7 */}
        <text x="295" y="240">
          ｦ
        </text>
        <text x="295" y="225">
          4
        </text>
        <text x="295" y="210">
          ｧ
        </text>
        {/* Col 8 */}
        <text x="335" y="355">
          ｨ
        </text>
        <text x="335" y="340">
          7
        </text>
        <text x="335" y="325">
          ｩ
        </text>
        {/* Col 9 */}
        <text x="375" y="295">
          ｪ
        </text>
        <text x="375" y="280">
          2
        </text>
        <text x="375" y="265">
          ｫ
        </text>
        {/* Col 10 */}
        <text x="415" y="385">
          ｬ
        </text>
        <text x="415" y="370">
          5
        </text>
        <text x="415" y="355">
          ｭ
        </text>
        {/* Col 11 */}
        <text x="455" y="265">
          ｮ
        </text>
        <text x="455" y="250">
          0
        </text>
        <text x="455" y="235">
          ｯ
        </text>
        {/* Col 12 */}
        <text x="495" y="380">
          ｰ
        </text>
        <text x="495" y="365">
          8
        </text>
        <text x="495" y="350">
          ｱ
        </text>
        {/* Col 13 */}
        <text x="535" y="325">
          ｲ
        </text>
        <text x="535" y="310">
          3
        </text>
        <text x="535" y="295">
          ｳ
        </text>
        {/* Col 14 */}
        <text x="575" y="395">
          ｴ
        </text>
        <text x="575" y="380">
          6
        </text>
        <text x="575" y="365">
          ｵ
        </text>
        {/* Col 15 */}
        <text x="615" y="280">
          ｶ
        </text>
        <text x="615" y="265">
          1
        </text>
        <text x="615" y="250">
          ｷ
        </text>
        {/* Col 16 */}
        <text x="655" y="400">
          ｸ
        </text>
        <text x="655" y="385">
          9
        </text>
        <text x="655" y="370">
          ｹ
        </text>
        {/* Col 17 */}
        <text x="695" y="350">
          ｺ
        </text>
        <text x="695" y="335">
          4
        </text>
        <text x="695" y="320">
          ｻ
        </text>
        {/* Col 18 */}
        <text x="735" y="415">
          ｼ
        </text>
        <text x="735" y="400">
          7
        </text>
        <text x="735" y="385">
          ｽ
        </text>
        {/* Col 19 */}
        <text x="775" y="320">
          ｾ
        </text>
        <text x="775" y="305">
          2
        </text>
        <text x="775" y="290">
          ｿ
        </text>
        {/* Col 20 */}
        <text x="815" y="375">
          ﾀ
        </text>
        <text x="815" y="360">
          5
        </text>
        <text x="815" y="345">
          ﾁ
        </text>
        {/* Col 21 */}
        <text x="855" y="400">
          ﾂ
        </text>
        <text x="855" y="385">
          0
        </text>
        <text x="855" y="370">
          ﾃ
        </text>
        {/* Col 22 */}
        <text x="895" y="295">
          ﾄ
        </text>
        <text x="895" y="280">
          8
        </text>
        <text x="895" y="265">
          ﾅ
        </text>
        {/* Col 23 */}
        <text x="935" y="415">
          ﾆ
        </text>
        <text x="935" y="400">
          3
        </text>
        <text x="935" y="385">
          ﾇ
        </text>
        {/* Col 24 */}
        <text x="975" y="360">
          ﾈ
        </text>
        <text x="975" y="345">
          6
        </text>
        <text x="975" y="330">
          ﾉ
        </text>
        {/* Col 25 */}
        <text x="1015" y="405">
          ﾊ
        </text>
        <text x="1015" y="390">
          1
        </text>
        <text x="1015" y="375">
          ﾋ
        </text>
        {/* Col 26 */}
        <text x="1055" y="335">
          ﾌ
        </text>
        <text x="1055" y="320">
          9
        </text>
        <text x="1055" y="305">
          ﾍ
        </text>
        {/* Col 27 */}
        <text x="1095" y="420">
          ﾎ
        </text>
        <text x="1095" y="405">
          4
        </text>
        <text x="1095" y="390">
          ﾏ
        </text>
        {/* Col 28 */}
        <text x="1135" y="385">
          ﾐ
        </text>
        <text x="1135" y="370">
          7
        </text>
        <text x="1135" y="355">
          ﾑ
        </text>
        {/* Col 29 */}
        <text x="1175" y="330">
          ﾒ
        </text>
        <text x="1175" y="315">
          2
        </text>
        <text x="1175" y="300">
          ﾓ
        </text>
      </g>

      {/* === WHITE/NEAR-WHITE LEADING CHARS — top of each column === */}
      {/* Every ~5th column gets a bright white leader for classic look */}
      <g
        fontFamily="'Courier New', Courier, monospace"
        fontSize="16"
        fill="#e0ffe0"
        filter="url(#matrixLeadGlow)"
      >
        <text x="14" y="295">
          ﾔ
        </text>
        <text x="94" y="325">
          ﾕ
        </text>
        <text x="134" y="225">
          ﾖ
        </text>
        <text x="254" y="345">
          ﾗ
        </text>
        <text x="374" y="250">
          ﾘ
        </text>
        <text x="454" y="220">
          ﾙ
        </text>
        <text x="574" y="350">
          ﾚ
        </text>
        <text x="694" y="305">
          ﾛ
        </text>
        <text x="774" y="275">
          ﾜ
        </text>
        <text x="894" y="250">
          ﾝ
        </text>
        <text x="1014" y="360">
          ｦ
        </text>
        <text x="1094" y="375">
          ｧ
        </text>
        <text x="1174" y="285">
          ｨ
        </text>
      </g>

      {/* === UPPER HALF — fresh top section chars to fill gaps === */}
      <g
        fontFamily="'Courier New', Courier, monospace"
        fontSize="13"
        fill="#00aa28"
        opacity="0.8"
        filter="url(#matrixGlow)"
      >
        {/* Scattered upper chars to fill upper half density */}
        <text x="18" y="200">
          ﾏ
        </text>
        <text x="18" y="186">
          7
        </text>
        <text x="18" y="172">
          ﾐ
        </text>
        <text x="38" y="160">
          4
        </text>
        <text x="38" y="145">
          ﾑ
        </text>
        <text x="38" y="130">
          1
        </text>
        <text x="58" y="220">
          ﾒ
        </text>
        <text x="58" y="206">
          9
        </text>
        <text x="58" y="192">
          ﾓ
        </text>
        <text x="78" y="140">
          6
        </text>
        <text x="78" y="125">
          ﾔ
        </text>
        <text x="78" y="110">
          3
        </text>
        <text x="98" y="240">
          ﾕ
        </text>
        <text x="98" y="226">
          0
        </text>
        <text x="98" y="212">
          ﾖ
        </text>
        <text x="118" y="175">
          8
        </text>
        <text x="118" y="160">
          ﾗ
        </text>
        <text x="118" y="145">
          5
        </text>
        <text x="138" y="185">
          2
        </text>
        <text x="138" y="170">
          ﾘ
        </text>
        <text x="158" y="210">
          ﾙ
        </text>
        <text x="158" y="195">
          7
        </text>
        <text x="158" y="180">
          ﾚ
        </text>
        <text x="178" y="255">
          4
        </text>
        <text x="178" y="240">
          ﾛ
        </text>
        <text x="178" y="225">
          1
        </text>
        <text x="198" y="155">
          ﾜ
        </text>
        <text x="198" y="140">
          9
        </text>
        <text x="198" y="125">
          ﾝ
        </text>
        <text x="218" y="200">
          6
        </text>
        <text x="218" y="185">
          ｦ
        </text>
        <text x="218" y="170">
          3
        </text>
        <text x="238" y="230">
          0
        </text>
        <text x="238" y="215">
          ｧ
        </text>
        <text x="258" y="265">
          ｨ
        </text>
        <text x="258" y="250">
          8
        </text>
        <text x="258" y="235">
          ｩ
        </text>
        <text x="278" y="145">
          5
        </text>
        <text x="278" y="130">
          ｪ
        </text>
        <text x="278" y="115">
          2
        </text>
        <text x="298" y="175">
          ｫ
        </text>
        <text x="298" y="160">
          7
        </text>
        <text x="298" y="145">
          ｬ
        </text>
        <text x="318" y="220">
          4
        </text>
        <text x="318" y="205">
          ｭ
        </text>
        <text x="318" y="190">
          1
        </text>
        <text x="338" y="255">
          ｮ
        </text>
        <text x="338" y="240">
          9
        </text>
        <text x="338" y="225">
          ｯ
        </text>
        <text x="358" y="135">
          6
        </text>
        <text x="358" y="120">
          ｰ
        </text>
        <text x="358" y="105">
          3
        </text>
        <text x="378" y="195">
          0
        </text>
        <text x="378" y="180">
          ｱ
        </text>
        <text x="378" y="165">
          8
        </text>
        <text x="398" y="235">
          ｲ
        </text>
        <text x="398" y="220">
          5
        </text>
        <text x="418" y="270">
          2
        </text>
        <text x="418" y="255">
          ｳ
        </text>
        <text x="418" y="240">
          7
        </text>
        <text x="438" y="160">
          ｴ
        </text>
        <text x="438" y="145">
          4
        </text>
        <text x="438" y="130">
          ｵ
        </text>
        <text x="458" y="180">
          1
        </text>
        <text x="458" y="165">
          ｶ
        </text>
        <text x="458" y="150">
          9
        </text>
        <text x="478" y="210">
          ｷ
        </text>
        <text x="478" y="195">
          6
        </text>
        <text x="498" y="260">
          ｸ
        </text>
        <text x="498" y="245">
          3
        </text>
        <text x="498" y="230">
          ｹ
        </text>
        <text x="518" y="150">
          0
        </text>
        <text x="518" y="135">
          ｺ
        </text>
        <text x="518" y="120">
          8
        </text>
        <text x="538" y="230">
          ｻ
        </text>
        <text x="538" y="215">
          5
        </text>
        <text x="538" y="200">
          ｼ
        </text>
        <text x="558" y="170">
          2
        </text>
        <text x="558" y="155">
          ｽ
        </text>
        <text x="558" y="140">
          7
        </text>
        <text x="578" y="265">
          ｾ
        </text>
        <text x="578" y="250">
          4
        </text>
        <text x="598" y="195">
          1
        </text>
        <text x="598" y="180">
          ｿ
        </text>
        <text x="598" y="165">
          9
        </text>
        <text x="618" y="160">
          ﾀ
        </text>
        <text x="618" y="145">
          6
        </text>
        <text x="618" y="130">
          ﾁ
        </text>
        <text x="638" y="245">
          3
        </text>
        <text x="638" y="230">
          ﾂ
        </text>
        <text x="638" y="215">
          0
        </text>
        <text x="658" y="280">
          ﾃ
        </text>
        <text x="658" y="265">
          8
        </text>
        <text x="678" y="185">
          5
        </text>
        <text x="678" y="170">
          ﾄ
        </text>
        <text x="678" y="155">
          2
        </text>
        <text x="698" y="225">
          ﾅ
        </text>
        <text x="698" y="210">
          7
        </text>
        <text x="698" y="195">
          ﾆ
        </text>
        <text x="718" y="165">
          4
        </text>
        <text x="718" y="150">
          ﾇ
        </text>
        <text x="718" y="135">
          1
        </text>
        <text x="738" y="290">
          ﾈ
        </text>
        <text x="738" y="275">
          9
        </text>
        <text x="758" y="200">
          6
        </text>
        <text x="758" y="185">
          ﾉ
        </text>
        <text x="758" y="170">
          3
        </text>
        <text x="778" y="220">
          0
        </text>
        <text x="778" y="205">
          ﾊ
        </text>
        <text x="778" y="190">
          8
        </text>
        <text x="798" y="155">
          ﾋ
        </text>
        <text x="798" y="140">
          5
        </text>
        <text x="798" y="125">
          ﾌ
        </text>
        <text x="818" y="270">
          2
        </text>
        <text x="818" y="255">
          ﾍ
        </text>
        <text x="838" y="190">
          7
        </text>
        <text x="838" y="175">
          ﾎ
        </text>
        <text x="838" y="160">
          4
        </text>
        <text x="858" y="285">
          1
        </text>
        <text x="858" y="270">
          ﾏ
        </text>
        <text x="858" y="255">
          9
        </text>
        <text x="878" y="165">
          ﾐ
        </text>
        <text x="878" y="150">
          6
        </text>
        <text x="878" y="135">
          ﾑ
        </text>
        <text x="898" y="200">
          3
        </text>
        <text x="898" y="185">
          ﾒ
        </text>
        <text x="918" y="235">
          0
        </text>
        <text x="918" y="220">
          ﾓ
        </text>
        <text x="918" y="205">
          8
        </text>
        <text x="938" y="175">
          ﾔ
        </text>
        <text x="938" y="160">
          5
        </text>
        <text x="938" y="145">
          ﾕ
        </text>
        <text x="958" y="295">
          2
        </text>
        <text x="958" y="280">
          ﾖ
        </text>
        <text x="978" y="210">
          7
        </text>
        <text x="978" y="195">
          ﾗ
        </text>
        <text x="978" y="180">
          4
        </text>
        <text x="998" y="250">
          ﾘ
        </text>
        <text x="998" y="235">
          1
        </text>
        <text x="998" y="220">
          ﾙ
        </text>
        <text x="1018" y="180">
          9
        </text>
        <text x="1018" y="165">
          ﾚ
        </text>
        <text x="1018" y="150">
          6
        </text>
        <text x="1038" y="270">
          ﾛ
        </text>
        <text x="1038" y="255">
          3
        </text>
        <text x="1058" y="195">
          0
        </text>
        <text x="1058" y="180">
          ﾜ
        </text>
        <text x="1058" y="165">
          8
        </text>
        <text x="1078" y="235">
          ﾝ
        </text>
        <text x="1078" y="220">
          5
        </text>
        <text x="1078" y="205">
          ｦ
        </text>
        <text x="1098" y="175">
          2
        </text>
        <text x="1098" y="160">
          ｧ
        </text>
        <text x="1098" y="145">
          7
        </text>
        <text x="1118" y="280">
          ｨ
        </text>
        <text x="1118" y="265">
          4
        </text>
        <text x="1138" y="205">
          1
        </text>
        <text x="1138" y="190">
          ｩ
        </text>
        <text x="1138" y="175">
          9
        </text>
        <text x="1158" y="245">
          ｪ
        </text>
        <text x="1158" y="230">
          6
        </text>
        <text x="1158" y="215">
          ｫ
        </text>
        <text x="1178" y="190">
          3
        </text>
        <text x="1178" y="175">
          ｬ
        </text>
        <text x="1178" y="160">
          0
        </text>
      </g>

      {/* === TOP REGION CHARS — near top of viewbox for full coverage === */}
      <g
        fontFamily="'Courier New', Courier, monospace"
        fontSize="12"
        fill="#005519"
        opacity="0.75"
      >
        <text x="28" y="85">
          6
        </text>
        <text x="28" y="72">
          ﾂ
        </text>
        <text x="28" y="58">
          3
        </text>
        <text x="68" y="75">
          ﾃ
        </text>
        <text x="68" y="62">
          9
        </text>
        <text x="68" y="48">
          ﾄ
        </text>
        <text x="108" y="90">
          1
        </text>
        <text x="108" y="76">
          ﾅ
        </text>
        <text x="108" y="62">
          7
        </text>
        <text x="148" y="68">
          ﾆ
        </text>
        <text x="148" y="54">
          4
        </text>
        <text x="148" y="40">
          ﾇ
        </text>
        <text x="188" y="82">
          ﾈ
        </text>
        <text x="188" y="68">
          0
        </text>
        <text x="188" y="54">
          ﾉ
        </text>
        <text x="228" y="72">
          8
        </text>
        <text x="228" y="58">
          ﾊ
        </text>
        <text x="228" y="44">
          5
        </text>
        <text x="268" y="88">
          ﾋ
        </text>
        <text x="268" y="74">
          2
        </text>
        <text x="268" y="60">
          ﾌ
        </text>
        <text x="308" y="60">
          ﾍ
        </text>
        <text x="308" y="46">
          7
        </text>
        <text x="308" y="32">
          ﾎ
        </text>
        <text x="348" y="80">
          ﾏ
        </text>
        <text x="348" y="66">
          4
        </text>
        <text x="348" y="52">
          ﾐ
        </text>
        <text x="388" y="65">
          1
        </text>
        <text x="388" y="51">
          ﾑ
        </text>
        <text x="388" y="37">
          9
        </text>
        <text x="428" y="85">
          ﾒ
        </text>
        <text x="428" y="71">
          6
        </text>
        <text x="428" y="57">
          ﾓ
        </text>
        <text x="468" y="70">
          3
        </text>
        <text x="468" y="56">
          ﾔ
        </text>
        <text x="468" y="42">
          0
        </text>
        <text x="508" y="78">
          ﾕ
        </text>
        <text x="508" y="64">
          8
        </text>
        <text x="508" y="50">
          ﾖ
        </text>
        <text x="548" y="62">
          5
        </text>
        <text x="548" y="48">
          ﾗ
        </text>
        <text x="548" y="34">
          2
        </text>
        <text x="588" y="88">
          ﾘ
        </text>
        <text x="588" y="74">
          7
        </text>
        <text x="588" y="60">
          ﾙ
        </text>
        <text x="628" y="55">
          4
        </text>
        <text x="628" y="41">
          ﾚ
        </text>
        <text x="628" y="27">
          1
        </text>
        <text x="668" y="82">
          ﾛ
        </text>
        <text x="668" y="68">
          9
        </text>
        <text x="668" y="54">
          ﾜ
        </text>
        <text x="708" y="68">
          6
        </text>
        <text x="708" y="54">
          ﾝ
        </text>
        <text x="708" y="40">
          3
        </text>
        <text x="748" y="90">
          ｦ
        </text>
        <text x="748" y="76">
          0
        </text>
        <text x="748" y="62">
          ｧ
        </text>
        <text x="788" y="60">
          8
        </text>
        <text x="788" y="46">
          ｨ
        </text>
        <text x="788" y="32">
          5
        </text>
        <text x="828" y="78">
          ｩ
        </text>
        <text x="828" y="64">
          2
        </text>
        <text x="828" y="50">
          ｪ
        </text>
        <text x="868" y="66">
          7
        </text>
        <text x="868" y="52">
          ｫ
        </text>
        <text x="868" y="38">
          4
        </text>
        <text x="908" y="84">
          ｬ
        </text>
        <text x="908" y="70">
          1
        </text>
        <text x="908" y="56">
          ｭ
        </text>
        <text x="948" y="58">
          9
        </text>
        <text x="948" y="44">
          ｮ
        </text>
        <text x="948" y="30">
          6
        </text>
        <text x="988" y="80">
          ｯ
        </text>
        <text x="988" y="66">
          3
        </text>
        <text x="988" y="52">
          ｰ
        </text>
        <text x="1028" y="72">
          0
        </text>
        <text x="1028" y="58">
          ｱ
        </text>
        <text x="1028" y="44">
          8
        </text>
        <text x="1068" y="86">
          ｲ
        </text>
        <text x="1068" y="72">
          5
        </text>
        <text x="1068" y="58">
          ｳ
        </text>
        <text x="1108" y="64">
          2
        </text>
        <text x="1108" y="50">
          ｴ
        </text>
        <text x="1108" y="36">
          7
        </text>
        <text x="1148" y="82">
          ｵ
        </text>
        <text x="1148" y="68">
          4
        </text>
        <text x="1148" y="54">
          ｶ
        </text>
        <text x="1188" y="70">
          1
        </text>
        <text x="1188" y="56">
          ｷ
        </text>
        <text x="1188" y="42">
          9
        </text>
      </g>

      {/* Vignette overlay for cinematic depth */}
      <rect width="1200" height="800" fill="url(#matrixVignette)" />
    </svg>
  );

  const renderOceanWorld = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-label="Ocean world"
      role="img"
    >
      <defs>
        {/* Deep ocean background gradient */}
        <linearGradient id="oceanBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020c1a" />
          <stop offset="25%" stopColor="#031528" />
          <stop offset="55%" stopColor="#041c35" />
          <stop offset="80%" stopColor="#03101f" />
          <stop offset="100%" stopColor="#010a14" />
        </linearGradient>
        {/* Sandy seabed gradient */}
        <linearGradient id="seabedGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d2c1a" />
          <stop offset="60%" stopColor="#2a1e10" />
          <stop offset="100%" stopColor="#1a120a" />
        </linearGradient>
        {/* Light ray gradient */}
        <linearGradient id="rayGrad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a5e8a" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#0d3f5e" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#061f30" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rayGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a7080" stopOpacity="0.28" />
          <stop offset="55%" stopColor="#0d4050" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#041a22" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rayGrad3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#134f78" stopOpacity="0.22" />
          <stop offset="50%" stopColor="#0a2f48" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#030e18" stopOpacity="0" />
        </linearGradient>
        {/* Bioluminescent ambient glow */}
        <radialGradient id="bioGlow1" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#0a3d5c" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#010d1a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bioGlow2" cx="20%" cy="60%" r="35%">
          <stop offset="0%" stopColor="#063344" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#010d1a" stopOpacity="0" />
        </radialGradient>
        {/* Coral gradients */}
        <radialGradient id="brainCoralGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#ff8c55" />
          <stop offset="100%" stopColor="#c04428" />
        </radialGradient>
        <linearGradient id="fanCoralGrad1" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#cc3399" />
          <stop offset="100%" stopColor="#ff66cc" />
        </linearGradient>
        <linearGradient id="tubeCoral1" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#1a4a6e" />
          <stop offset="100%" stopColor="#3ab5e0" />
        </linearGradient>
        <linearGradient id="tubeCoral2" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#5a1a6e" />
          <stop offset="100%" stopColor="#c066ee" />
        </linearGradient>
        <linearGradient id="kelpGrad1" x1="0" y1="1" x2="0.3" y2="0">
          <stop offset="0%" stopColor="#0d2e10" />
          <stop offset="60%" stopColor="#1a5e20" />
          <stop offset="100%" stopColor="#2a8a30" />
        </linearGradient>
        <linearGradient id="kelpGrad2" x1="0" y1="1" x2="0.2" y2="0">
          <stop offset="0%" stopColor="#0a2a12" />
          <stop offset="60%" stopColor="#157020" />
          <stop offset="100%" stopColor="#229a2a" />
        </linearGradient>
        {/* Water depth overlay */}
        <linearGradient id="depthOverlay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#010a14" stopOpacity="0.6" />
          <stop offset="40%" stopColor="#010a14" stopOpacity="0" />
          <stop offset="75%" stopColor="#010a14" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#010308" stopOpacity="0.7" />
        </linearGradient>
        {/* Vignette */}
        <radialGradient id="vigOcean" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#010a14" stopOpacity="0" />
          <stop offset="100%" stopColor="#000408" stopOpacity="0.75" />
        </radialGradient>
        {/* Plankton inner-glow gradients */}
        <radialGradient id="plankGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7ff0e8" stopOpacity="1" />
          <stop offset="100%" stopColor="#40c8d0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="plankGlowG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#80ffb0" stopOpacity="1" />
          <stop offset="100%" stopColor="#30d070" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="plankGlowCyan" cx="38%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#c8fffc" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#7ff0e8" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#20b0c0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="plankGlowTeal" cx="38%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#b0fff4" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#50e8d8" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#10907c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="plankGlowGreen" cx="38%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#ccffe0" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#80ffb0" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#20a050" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="plankGlowBlue" cx="38%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#e0f8ff" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#b0f0ff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#2060a0" stopOpacity="0" />
        </radialGradient>
        {/* Algae blade gradients */}
        <linearGradient id="algaeBlade1" x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor="#0a3a0e" />
          <stop offset="40%" stopColor="#0d5c1a" />
          <stop offset="75%" stopColor="#156b22" />
          <stop offset="100%" stopColor="#1e8a30" />
        </linearGradient>
        <linearGradient id="algaeBlade2" x1="0.5" y1="1" x2="0.6" y2="0">
          <stop offset="0%" stopColor="#092e12" />
          <stop offset="40%" stopColor="#0c5218" />
          <stop offset="75%" stopColor="#14621e" />
          <stop offset="100%" stopColor="#1a7a28" />
        </linearGradient>
        <linearGradient id="algaeBlade3" x1="0.5" y1="1" x2="0.4" y2="0">
          <stop offset="0%" stopColor="#08322a" />
          <stop offset="40%" stopColor="#0a6b50" />
          <stop offset="75%" stopColor="#0f7a5a" />
          <stop offset="100%" stopColor="#168c68" />
        </linearGradient>
        <linearGradient id="algaeBlade4" x1="0.5" y1="1" x2="0.55" y2="0">
          <stop offset="0%" stopColor="#0b3d14" />
          <stop offset="50%" stopColor="#137020" />
          <stop offset="100%" stopColor="#1c8c2c" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softGlow" x="-80%" y="-80%" width="360%" height="360%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Plankton shape symbols — reusable micro-organism shapes */}
        {/* Radiolarian star — 8 spines */}
        <symbol id="plk-radiol" viewBox="-6 -6 12 12">
          <circle cx="0" cy="0" r="2" fill="url(#plankGlowCyan)" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line
              key={`r-${a}`}
              x1={Math.cos((a * Math.PI) / 180) * 2.2}
              y1={Math.sin((a * Math.PI) / 180) * 2.2}
              x2={Math.cos((a * Math.PI) / 180) * 5.5}
              y2={Math.sin((a * Math.PI) / 180) * 5.5}
              stroke="#7ff0e8"
              strokeWidth="0.5"
              strokeLinecap="round"
            />
          ))}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <circle
              key={`rt-${a}`}
              cx={Math.cos((a * Math.PI) / 180) * 5.5}
              cy={Math.sin((a * Math.PI) / 180) * 5.5}
              r="0.4"
              fill="#b0f8f4"
            />
          ))}
        </symbol>
        {/* Radiolarian star — 6 spines teal variant */}
        <symbol id="plk-radiol6" viewBox="-6 -6 12 12">
          <circle cx="0" cy="0" r="2.2" fill="url(#plankGlowTeal)" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <line
              key={`r6-${a}`}
              x1={Math.cos((a * Math.PI) / 180) * 2.4}
              y1={Math.sin((a * Math.PI) / 180) * 2.4}
              x2={Math.cos((a * Math.PI) / 180) * 5.8}
              y2={Math.sin((a * Math.PI) / 180) * 5.8}
              stroke="#50e8d8"
              strokeWidth="0.55"
              strokeLinecap="round"
            />
          ))}
          {[30, 90, 150, 210, 270, 330].map((a) => (
            <line
              key={`r6b-${a}`}
              x1={Math.cos((a * Math.PI) / 180) * 1.8}
              y1={Math.sin((a * Math.PI) / 180) * 1.8}
              x2={Math.cos((a * Math.PI) / 180) * 3.8}
              y2={Math.sin((a * Math.PI) / 180) * 3.8}
              stroke="#50e8d8"
              strokeWidth="0.35"
              strokeLinecap="round"
              opacity="0.6"
            />
          ))}
        </symbol>
        {/* Copepod — elongated teardrop with antenna */}
        <symbol id="plk-copepod" viewBox="-5 -8 10 14">
          <ellipse cx="0" cy="1" rx="2.2" ry="4" fill="url(#plankGlowGreen)" />
          <ellipse
            cx="0"
            cy="-3.5"
            rx="1.1"
            ry="1.5"
            fill="#a0ffcc"
            opacity="0.7"
          />
          <line
            x1="-0.5"
            y1="-5"
            x2="-2.2"
            y2="-7.5"
            stroke="#80ffb0"
            strokeWidth="0.45"
            strokeLinecap="round"
          />
          <line
            x1="0.5"
            y1="-5"
            x2="2.4"
            y2="-7.2"
            stroke="#80ffb0"
            strokeWidth="0.45"
            strokeLinecap="round"
          />
          <line
            x1="-1.8"
            y1="-1"
            x2="-4"
            y2="-2"
            stroke="#60d890"
            strokeWidth="0.4"
            strokeLinecap="round"
            opacity="0.7"
          />
          <line
            x1="1.8"
            y1="-1"
            x2="4"
            y2="-1.5"
            stroke="#60d890"
            strokeWidth="0.4"
            strokeLinecap="round"
            opacity="0.7"
          />
        </symbol>
        {/* Dinoflagellate — crescent comma shape with flagellum */}
        <symbol id="plk-dino" viewBox="-5 -5 10 10">
          <path
            d="M0,-3.8 C2.5,-3.2 4,0 3,2.5 C2,4.5 -1,4.2 -2.5,2 C-4,-0.5 -2.8,-3.5 0,-3.8 Z"
            fill="url(#plankGlowBlue)"
            opacity="0.85"
          />
          <path
            d="M2.8,-1 Q5.5,1.5 3.5,4.5"
            stroke="#b0f0ff"
            strokeWidth="0.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M-1.5,3.8 Q-3.5,5.5 -2,7"
            stroke="#b0f0ff"
            strokeWidth="0.4"
            fill="none"
            strokeLinecap="round"
            opacity="0.55"
          />
        </symbol>
        {/* Jellyfish bell — tiny dome with tentacles */}
        <symbol id="plk-jelly" viewBox="-5 -4 10 14">
          <path
            d="M-3.5,0 Q0,-4 3.5,0 L3.5,2 Q0,4.5 -3.5,2 Z"
            fill="url(#plankGlowCyan)"
            opacity="0.8"
          />
          <path
            d="M-3.5,1 Q0,5 3.5,1"
            stroke="#7ff0e8"
            strokeWidth="0.5"
            fill="none"
            opacity="0.6"
          />
          {[-2.5, -1, 0, 1, 2.5].map((tx) => (
            <path
              key={`jt-${tx}`}
              d={`M${tx},2.5 Q${tx + 0.5},6 ${tx},9`}
              stroke="#7ff0e8"
              strokeWidth="0.4"
              fill="none"
              strokeLinecap="round"
              opacity="0.55"
            />
          ))}
        </symbol>
        {/* Tiny round bioluminescent cell */}
        <symbol id="plk-cell" viewBox="-4 -4 8 8">
          <circle cx="0" cy="0" r="3" fill="url(#plankGlowTeal)" />
          <circle cx="-0.8" cy="-0.8" r="0.8" fill="#e0fffc" opacity="0.6" />
        </symbol>
        {/* Green bioluminescent orb */}
        <symbol id="plk-orb" viewBox="-4 -4 8 8">
          <circle cx="0" cy="0" r="3" fill="url(#plankGlowGreen)" />
          <circle cx="-0.7" cy="-0.8" r="0.7" fill="#e0fff0" opacity="0.55" />
        </symbol>
      </defs>

      {/* === BACKGROUND — deep ocean water === */}
      <rect width="1200" height="800" fill="url(#oceanBg)" />
      <rect width="1200" height="800" fill="url(#bioGlow1)" />
      <rect width="1200" height="800" fill="url(#bioGlow2)" />

      {/* === LIGHT RAYS from above === */}
      {/* Ray 1 */}
      <polygon points="180,0 280,0 520,800 390,800" fill="url(#rayGrad1)" />
      {/* Ray 2 */}
      <polygon points="350,0 420,0 620,800 530,800" fill="url(#rayGrad2)" />
      {/* Ray 3 */}
      <polygon points="550,0 600,0 760,800 700,800" fill="url(#rayGrad3)" />
      {/* Ray 4 */}
      <polygon points="700,0 770,0 920,800 840,800" fill="url(#rayGrad2)" />
      {/* Ray 5 */}
      <polygon points="900,0 960,0 1080,800 1000,800" fill="url(#rayGrad1)" />
      {/* Ray 6 — narrow subtle */}
      <polygon points="50,0 90,0 260,800 190,800" fill="url(#rayGrad3)" />
      <polygon points="1100,0 1150,0 1200,700 1170,700" fill="url(#rayGrad3)" />

      {/* === SANDY SEABED === */}
      <path
        d="M0,740 Q60,730 130,745 Q200,758 300,742 Q420,728 520,746 Q640,762 750,744 Q860,728 960,748 Q1060,762 1140,745 Q1180,738 1200,742 L1200,800 L0,800 Z"
        fill="url(#seabedGrad)"
      />
      {/* Sand texture bumps */}
      <ellipse cx="80" cy="762" rx="60" ry="8" fill="#3a2814" opacity="0.5" />
      <ellipse cx="240" cy="755" rx="45" ry="6" fill="#3a2814" opacity="0.4" />
      <ellipse cx="450" cy="760" rx="70" ry="9" fill="#3a2814" opacity="0.5" />
      <ellipse cx="680" cy="754" rx="55" ry="7" fill="#3a2814" opacity="0.4" />
      <ellipse cx="900" cy="758" rx="65" ry="8" fill="#3a2814" opacity="0.45" />
      <ellipse cx="1100" cy="753" rx="50" ry="6" fill="#3a2814" opacity="0.4" />
      {/* Rock formations */}
      <ellipse cx="145" cy="748" rx="35" ry="22" fill="#1e1208" />
      <ellipse cx="152" cy="744" rx="28" ry="18" fill="#261a0e" />
      <ellipse cx="970" cy="752" rx="42" ry="26" fill="#1e1208" />
      <ellipse cx="975" cy="746" rx="32" ry="20" fill="#261a0e" />
      <ellipse cx="580" cy="744" rx="28" ry="18" fill="#1e1208" />
      <ellipse cx="585" cy="740" rx="20" ry="14" fill="#2a1c0e" />
      <ellipse cx="1120" cy="749" rx="38" ry="24" fill="#1c1006" />
      <ellipse cx="1125" cy="743" rx="29" ry="18" fill="#261808" />

      {/* === KELP / SEAWEED FOREST === */}
      {/* Tall kelp strands — left cluster */}
      <path
        d="M60,760 Q40,720 55,680 Q70,640 48,600 Q28,560 50,510 Q68,465 52,420 Q38,385 58,340"
        stroke="url(#kelpGrad1)"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M75,758 Q95,715 78,670 Q62,630 80,585 Q96,545 76,500 Q58,462 78,415 Q96,375 80,330"
        stroke="url(#kelpGrad2)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M42,762 Q22,718 38,672 Q52,630 34,588 Q18,548 38,502"
        stroke="url(#kelpGrad1)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M90,756 Q112,710 96,662 Q80,620 100,574 Q118,534 100,488"
        stroke="url(#kelpGrad2)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Kelp fronds on left strands */}
      <ellipse
        cx="55"
        cy="680"
        rx="20"
        ry="7"
        fill="#1d6020"
        opacity="0.8"
        transform="rotate(-25,55,680)"
      />
      <ellipse
        cx="50"
        cy="600"
        rx="18"
        ry="6"
        fill="#1a5a1e"
        opacity="0.75"
        transform="rotate(20,50,600)"
      />
      <ellipse
        cx="78"
        cy="670"
        rx="16"
        ry="5"
        fill="#226630"
        opacity="0.8"
        transform="rotate(15,78,670)"
      />
      <ellipse
        cx="80"
        cy="585"
        rx="18"
        ry="6"
        fill="#1e6428"
        opacity="0.75"
        transform="rotate(-18,80,585)"
      />

      {/* Mid kelp cluster */}
      <path
        d="M480,762 Q460,716 475,668 Q490,625 472,578 Q455,536 472,488 Q488,450 470,405"
        stroke="url(#kelpGrad1)"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M498,758 Q518,712 502,664 Q486,622 505,576 Q522,535 504,489 Q488,452 506,408"
        stroke="url(#kelpGrad2)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M462,760 Q442,714 458,666 Q472,624 454,578"
        stroke="url(#kelpGrad1)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse
        cx="475"
        cy="668"
        rx="19"
        ry="6"
        fill="#1c5e1e"
        opacity="0.8"
        transform="rotate(-20,475,668)"
      />
      <ellipse
        cx="472"
        cy="578"
        rx="17"
        ry="6"
        fill="#1a5820"
        opacity="0.75"
        transform="rotate(22,472,578)"
      />
      <ellipse
        cx="502"
        cy="664"
        rx="16"
        ry="5"
        fill="#22602e"
        opacity="0.8"
        transform="rotate(14,502,664)"
      />

      {/* Right kelp cluster */}
      <path
        d="M1080,762 Q1058,716 1074,668 Q1090,625 1072,578 Q1055,536 1072,488 Q1088,450 1072,405"
        stroke="url(#kelpGrad2)"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M1098,758 Q1118,712 1102,664 Q1086,622 1105,576 Q1122,535 1104,489"
        stroke="url(#kelpGrad1)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M1062,760 Q1042,714 1058,666 Q1072,624 1054,578"
        stroke="url(#kelpGrad2)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse
        cx="1074"
        cy="668"
        rx="19"
        ry="6"
        fill="#1c5e1e"
        opacity="0.8"
        transform="rotate(20,1074,668)"
      />
      <ellipse
        cx="1072"
        cy="578"
        rx="17"
        ry="6"
        fill="#1a5820"
        opacity="0.75"
        transform="rotate(-22,1072,578)"
      />

      {/* === ALGAE CLUSTERS — organic seaweed blades with midribs === */}

      {/* Algae cluster 1 — far left, between rocks and kelp */}
      <g opacity="0.92">
        {/* Blade A — tall, slight left lean */}
        <path
          d="M178,762 C175,740 168,715 172,688 C176,662 170,640 175,615 C179,592 174,572 178,548"
          fill="url(#algaeBlade1)"
          stroke="none"
        />
        <path
          d="M186,762 C184,740 178,714 183,687 C188,660 182,638 188,612 C193,590 188,568 192,545"
          fill="url(#algaeBlade2)"
          stroke="none"
          opacity="0.88"
        />
        <path
          d="M170,762 C166,742 158,720 162,696 C166,673 160,652 163,630 C166,611 161,592 163,570"
          fill="url(#algaeBlade3)"
          stroke="none"
          opacity="0.78"
        />
        <path
          d="M194,762 C193,745 187,722 192,700 C197,679 192,658 196,638"
          fill="url(#algaeBlade4)"
          stroke="none"
          opacity="0.72"
        />
        <path
          d="M162,762 C157,748 150,730 153,712 C156,694 150,676 152,658"
          fill="url(#algaeBlade2)"
          stroke="none"
          opacity="0.62"
        />
        {/* Midrib lines */}
        <path
          d="M181,762 C179,742 176,715 178,688 C180,662 176,640 178,615"
          stroke="#2aa838"
          strokeWidth="0.8"
          fill="none"
          opacity="0.45"
        />
        <path
          d="M189,762 C188,742 185,715 187,688 C189,661 185,638 188,612"
          stroke="#1e9030"
          strokeWidth="0.7"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M165,762 C163,744 160,722 162,698 C164,675 160,654 162,632"
          stroke="#158c50"
          strokeWidth="0.7"
          fill="none"
          opacity="0.38"
        />
        {/* Wavy highlight on widest blade */}
        <path
          d="M176,720 Q171,705 173,690 Q175,675 170,660"
          stroke="#22aa3a"
          strokeWidth="1.2"
          fill="none"
          opacity="0.3"
          strokeLinecap="round"
        />
      </g>

      {/* Algae cluster 2 — mid-left, crevice between seabed ripples */}
      <g opacity="0.88">
        {/* Blade A */}
        <path
          d="M336,762 C333,743 326,718 330,692 C334,668 328,646 332,622 C336,600 330,580 333,558"
          fill="url(#algaeBlade2)"
          stroke="none"
        />
        {/* Blade B — slightly wider, right lean */}
        <path
          d="M345,762 C344,744 338,720 343,695 C348,671 343,650 348,627 C352,607 347,587 350,565"
          fill="url(#algaeBlade1)"
          stroke="none"
          opacity="0.85"
        />
        {/* Blade C — shorter teal */}
        <path
          d="M325,762 C321,745 313,724 317,703 C321,683 315,663 317,645"
          fill="url(#algaeBlade3)"
          stroke="none"
          opacity="0.75"
        />
        {/* Blade D — thin accent */}
        <path
          d="M355,762 C354,748 349,728 353,710 C357,693 352,676 354,658"
          fill="url(#algaeBlade4)"
          stroke="none"
          opacity="0.65"
        />
        {/* Midrib lines */}
        <path
          d="M339,762 C337,744 334,719 336,693 C338,668 334,647 336,622"
          stroke="#22a436"
          strokeWidth="0.8"
          fill="none"
          opacity="0.42"
        />
        <path
          d="M347,762 C346,744 343,720 346,695 C349,671 345,650 348,627"
          stroke="#1a9040"
          strokeWidth="0.7"
          fill="none"
          opacity="0.38"
        />
        {/* Ripple on leading blade */}
        <path
          d="M343,700 Q337,683 340,666 Q343,649 337,633"
          stroke="#20a060"
          strokeWidth="1.1"
          fill="none"
          opacity="0.28"
          strokeLinecap="round"
        />
      </g>

      {/* Algae cluster 3 — mid, teal-green variety near center seabed */}
      <g opacity="0.9">
        {/* Blade A — main tall teal blade */}
        <path
          d="M635,762 C631,742 622,716 627,689 C632,663 625,641 630,615 C634,592 628,570 631,545"
          fill="url(#algaeBlade3)"
          stroke="none"
        />
        {/* Blade B */}
        <path
          d="M645,762 C643,743 637,718 642,692 C647,667 641,645 646,621 C650,599 644,578 647,555"
          fill="url(#algaeBlade1)"
          stroke="none"
          opacity="0.82"
        />
        {/* Blade C — lean left */}
        <path
          d="M624,762 C619,744 611,721 614,699 C617,677 611,657 614,637 C616,619 611,600 613,582"
          fill="url(#algaeBlade2)"
          stroke="none"
          opacity="0.72"
        />
        {/* Blade D — wide short */}
        <path
          d="M654,762 C652,747 646,726 651,707 C655,689 650,671 652,653"
          fill="url(#algaeBlade4)"
          stroke="none"
          opacity="0.68"
        />
        {/* Blade E — thin far left */}
        <path
          d="M614,762 C609,749 601,733 603,717 C605,701 600,685 601,668"
          fill="url(#algaeBlade3)"
          stroke="none"
          opacity="0.55"
        />
        {/* Midrib lines */}
        <path
          d="M638,762 C636,743 633,718 635,692 C637,666 633,642 636,616"
          stroke="#168c60"
          strokeWidth="0.85"
          fill="none"
          opacity="0.45"
        />
        <path
          d="M647,762 C646,743 643,718 646,692 C649,667 645,645 648,621"
          stroke="#1a9428"
          strokeWidth="0.75"
          fill="none"
          opacity="0.4"
        />
        {/* Highlight ripple */}
        <path
          d="M629,716 Q623,698 626,680 Q629,662 623,645"
          stroke="#18a468"
          strokeWidth="1.2"
          fill="none"
          opacity="0.3"
          strokeLinecap="round"
        />
      </g>

      {/* Algae cluster 4 — mid-right, behind branching coral */}
      <g opacity="0.87">
        <path
          d="M816,762 C813,743 806,718 810,692 C814,667 808,645 812,621 C816,599 810,579 813,556"
          fill="url(#algaeBlade1)"
          stroke="none"
        />
        <path
          d="M826,762 C824,744 818,720 823,695 C828,671 822,650 827,627"
          fill="url(#algaeBlade2)"
          stroke="none"
          opacity="0.83"
        />
        <path
          d="M805,762 C801,745 793,724 797,703 C800,682 794,663 797,644"
          fill="url(#algaeBlade3)"
          stroke="none"
          opacity="0.72"
        />
        <path
          d="M835,762 C834,748 828,729 832,712 C836,696 830,679 832,661"
          fill="url(#algaeBlade4)"
          stroke="none"
          opacity="0.65"
        />
        {/* Midrib lines */}
        <path
          d="M819,762 C817,744 814,719 816,693 C818,668 814,646 816,622"
          stroke="#20a030"
          strokeWidth="0.8"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M828,762 C827,744 824,720 827,695 C829,671 825,650 828,627"
          stroke="#168850"
          strokeWidth="0.7"
          fill="none"
          opacity="0.36"
        />
        <path
          d="M824,710 Q818,692 820,674 Q823,657 817,640"
          stroke="#1a9c3a"
          strokeWidth="1.1"
          fill="none"
          opacity="0.28"
          strokeLinecap="round"
        />
      </g>

      {/* Algae cluster 5 — far right edge */}
      <g opacity="0.86">
        <path
          d="M1156,762 C1153,743 1146,718 1150,692 C1154,667 1148,645 1152,621 C1155,600 1150,580 1152,558"
          fill="url(#algaeBlade2)"
          stroke="none"
        />
        <path
          d="M1165,762 C1164,744 1158,720 1163,695 C1167,671 1161,650 1165,627"
          fill="url(#algaeBlade1)"
          stroke="none"
          opacity="0.82"
        />
        <path
          d="M1145,762 C1141,745 1133,724 1137,703 C1140,682 1134,662 1137,643"
          fill="url(#algaeBlade3)"
          stroke="none"
          opacity="0.72"
        />
        <path
          d="M1173,762 C1172,748 1166,729 1170,712 C1174,696 1169,679 1171,661"
          fill="url(#algaeBlade4)"
          stroke="none"
          opacity="0.62"
        />
        {/* Midrib lines */}
        <path
          d="M1159,762 C1157,744 1154,719 1156,693 C1158,668 1154,646 1156,621"
          stroke="#1e9e2e"
          strokeWidth="0.8"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M1167,762 C1166,744 1163,720 1166,695 C1168,671 1164,650 1167,627"
          stroke="#14845a"
          strokeWidth="0.7"
          fill="none"
          opacity="0.36"
        />
        <path
          d="M1153,718 Q1147,700 1149,682 Q1152,665 1146,648"
          stroke="#16a054"
          strokeWidth="1.1"
          fill="none"
          opacity="0.27"
          strokeLinecap="round"
        />
      </g>

      {/* === CORAL REEF — detailed foreground === */}
      {/* Brain coral — large, center-left */}
      <g filter="url(#softGlow)">
        <ellipse
          cx="220"
          cy="755"
          rx="55"
          ry="38"
          fill="url(#brainCoralGrad)"
        />
        <ellipse
          cx="220"
          cy="755"
          rx="48"
          ry="32"
          fill="none"
          stroke="#e85a1a"
          strokeWidth="1.5"
          opacity="0.4"
        />
        {/* Brain ridges */}
        <path
          d="M175,748 Q185,742 195,750 Q205,758 215,748 Q225,740 235,750 Q245,758 255,748 Q261,742 265,752"
          stroke="#c94020"
          strokeWidth="2.5"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M180,760 Q192,752 204,762 Q216,770 228,760 Q240,752 252,762 Q260,768 264,762"
          stroke="#c94020"
          strokeWidth="2.5"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M178,755 Q190,747 202,755 Q214,763 226,755 Q238,747 250,755 Q258,760 263,756"
          stroke="#b83818"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />
      </g>
      {/* Brain coral — right */}
      <g filter="url(#softGlow)">
        <ellipse cx="880" cy="756" rx="48" ry="34" fill="#e06030" />
        <ellipse
          cx="880"
          cy="756"
          rx="41"
          ry="28"
          fill="none"
          stroke="#c04820"
          strokeWidth="1.5"
          opacity="0.4"
        />
        <path
          d="M836,748 Q847,742 858,750 Q869,758 878,748 Q889,740 898,750 Q907,758 920,748"
          stroke="#b03818"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M838,760 Q850,752 862,762 Q874,770 884,760 Q895,752 906,760 Q914,768 922,762"
          stroke="#b03818"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
      </g>

      {/* Branching coral — orange, left */}
      <g filter="url(#glow)">
        <path
          d="M120,760 L120,710 L100,680 M120,710 L140,675 M120,720 L105,695 M120,720 L136,692 M100,680 L88,658 M100,680 L112,652 M140,675 L128,645 M140,675 L155,648"
          stroke="#ff6622"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M88,658 L78,638 M88,658 L98,632 M112,652 L104,628 M112,652 L122,626 M128,645 L118,622 M155,648 L148,622 M155,648 L165,620"
          stroke="#ff7733"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Polyp tips */}
        <circle cx="78" cy="638" r="4" fill="#ff9955" />
        <circle cx="98" cy="632" r="4" fill="#ff9955" />
        <circle cx="104" cy="628" r="3" fill="#ff8844" />
        <circle cx="122" cy="626" r="4" fill="#ffaa55" />
        <circle cx="118" cy="622" r="3" fill="#ff9944" />
        <circle cx="148" cy="622" r="4" fill="#ffaa55" />
        <circle cx="165" cy="620" r="3" fill="#ff9944" />
      </g>
      {/* Branching coral — pink, mid */}
      <g filter="url(#glow)">
        <path
          d="M560,762 L560,715 L542,688 M560,715 L580,682 M560,724 L544,700 M560,724 L576,698 M542,688 L530,665 M542,688 L554,660 M580,682 L566,655 M580,682 L594,652"
          stroke="#ff44aa"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M530,665 L520,645 M530,665 L540,640 M554,660 L545,635 M554,660 L564,632 M566,655 L556,628 M594,652 L586,626 M594,652 L604,622"
          stroke="#ff55bb"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="520" cy="645" r="4" fill="#ff88cc" />
        <circle cx="540" cy="640" r="4" fill="#ffaadd" />
        <circle cx="545" cy="635" r="3" fill="#ff88cc" />
        <circle cx="564" cy="632" r="4" fill="#ffbbee" />
        <circle cx="556" cy="628" r="3" fill="#ff99dd" />
        <circle cx="586" cy="626" r="4" fill="#ffbbee" />
        <circle cx="604" cy="622" r="3" fill="#ff99dd" />
      </g>
      {/* Branching coral — yellow, right */}
      <g filter="url(#glow)">
        <path
          d="M1020,762 L1020,718 L1003,690 M1020,718 L1038,685 M1020,727 L1006,703 M1020,727 L1034,700 M1003,690 L991,668 M1003,690 L1015,662 M1038,685 L1026,658 M1038,685 L1052,655"
          stroke="#ffcc22"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M991,668 L982,648 M991,668 L1001,642 M1015,662 L1006,638 M1015,662 L1025,633 M1026,658 L1016,632 M1052,655 L1044,629 M1052,655 L1062,626"
          stroke="#ffdd33"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="982" cy="648" r="4" fill="#ffee66" />
        <circle cx="1001" cy="642" r="4" fill="#ffee66" />
        <circle cx="1006" cy="638" r="3" fill="#ffdd55" />
        <circle cx="1025" cy="633" r="4" fill="#ffff77" />
        <circle cx="1016" cy="632" r="3" fill="#ffee66" />
        <circle cx="1044" cy="629" r="4" fill="#ffff77" />
        <circle cx="1062" cy="626" r="3" fill="#ffee66" />
      </g>

      {/* Fan coral — large purple, center */}
      <g filter="url(#softGlow)">
        {/* Fan structure */}
        <line
          x1="720"
          y1="760"
          x2="690"
          y2="680"
          stroke="#cc44aa"
          strokeWidth="3"
        />
        <line
          x1="720"
          y1="760"
          x2="700"
          y2="672"
          stroke="#cc44aa"
          strokeWidth="3"
        />
        <line
          x1="720"
          y1="760"
          x2="712"
          y2="668"
          stroke="#cc44aa"
          strokeWidth="3"
        />
        <line
          x1="720"
          y1="760"
          x2="722"
          y2="665"
          stroke="#cc44aa"
          strokeWidth="3"
        />
        <line
          x1="720"
          y1="760"
          x2="732"
          y2="669"
          stroke="#cc44aa"
          strokeWidth="3"
        />
        <line
          x1="720"
          y1="760"
          x2="742"
          y2="675"
          stroke="#cc44aa"
          strokeWidth="3"
        />
        <line
          x1="720"
          y1="760"
          x2="750"
          y2="683"
          stroke="#cc44aa"
          strokeWidth="3"
        />
        <line
          x1="720"
          y1="760"
          x2="755"
          y2="695"
          stroke="#cc44aa"
          strokeWidth="2.5"
        />
        <line
          x1="720"
          y1="760"
          x2="680"
          y2="696"
          stroke="#cc44aa"
          strokeWidth="2.5"
        />
        {/* Fan cross-hatching */}
        <path
          d="M685,700 Q700,690 715,685 Q730,680 748,687"
          stroke="#dd55bb"
          strokeWidth="1.5"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M683,715 Q698,705 714,700 Q730,695 748,701"
          stroke="#dd55bb"
          strokeWidth="1.5"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M683,730 Q698,720 714,715 Q730,710 748,716"
          stroke="#dd55bb"
          strokeWidth="1.5"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M685,744 Q700,735 715,730 Q730,726 748,731"
          stroke="#dd55bb"
          strokeWidth="1.5"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M688,698 Q700,706 705,720 Q708,734 706,748"
          stroke="#ee66cc"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M706,686 Q710,698 712,712 Q714,728 713,748"
          stroke="#ee66cc"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M722,684 Q724,698 724,714 Q724,730 724,748"
          stroke="#ee66cc"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M736,688 Q736,702 733,716 Q730,730 730,748"
          stroke="#ee66cc"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M748,695 Q744,708 740,722 Q736,736 737,748"
          stroke="#ee66cc"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
      </g>
      {/* Fan coral — smaller red-orange, far left */}
      <g filter="url(#softGlow)" opacity="0.9">
        <line
          x1="30"
          y1="762"
          x2="14"
          y2="710"
          stroke="#ff5533"
          strokeWidth="2.5"
        />
        <line
          x1="30"
          y1="762"
          x2="20"
          y2="705"
          stroke="#ff5533"
          strokeWidth="2.5"
        />
        <line
          x1="30"
          y1="762"
          x2="26"
          y2="702"
          stroke="#ff5533"
          strokeWidth="2.5"
        />
        <line
          x1="30"
          y1="762"
          x2="34"
          y2="702"
          stroke="#ff5533"
          strokeWidth="2.5"
        />
        <line
          x1="30"
          y1="762"
          x2="40"
          y2="706"
          stroke="#ff5533"
          strokeWidth="2.5"
        />
        <line
          x1="30"
          y1="762"
          x2="46"
          y2="713"
          stroke="#ff5533"
          strokeWidth="2.5"
        />
        <path
          d="M12,718 Q22,714 30,712 Q38,710 46,716"
          stroke="#ff7755"
          strokeWidth="1.2"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M11,730 Q22,726 30,724 Q38,722 46,728"
          stroke="#ff7755"
          strokeWidth="1.2"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M12,742 Q22,738 30,736 Q38,734 46,740"
          stroke="#ff7755"
          strokeWidth="1.2"
          fill="none"
          opacity="0.7"
        />
      </g>

      {/* Tube corals — clusters */}
      {/* Left tube cluster */}
      <g filter="url(#glow)">
        <rect
          x="290"
          y="722"
          width="10"
          height="40"
          rx="5"
          fill="url(#tubeCoral1)"
        />
        <rect
          x="304"
          y="715"
          width="9"
          height="47"
          rx="4"
          fill="url(#tubeCoral2)"
        />
        <rect
          x="317"
          y="720"
          width="10"
          height="42"
          rx="5"
          fill="url(#tubeCoral1)"
        />
        <rect
          x="330"
          y="712"
          width="8"
          height="50"
          rx="4"
          fill="url(#tubeCoral2)"
        />
        <rect
          x="342"
          y="718"
          width="9"
          height="44"
          rx="4"
          fill="url(#tubeCoral1)"
        />
        <circle cx="295" cy="722" r="6" fill="#5ad8f0" />
        <circle cx="308" cy="715" r="6" fill="#d088ff" />
        <circle cx="322" cy="720" r="6" fill="#5ad8f0" />
        <circle cx="334" cy="712" r="5" fill="#c070ee" />
        <circle cx="346" cy="718" r="6" fill="#5ad8f0" />
      </g>
      {/* Right tube cluster */}
      <g filter="url(#glow)">
        <rect
          x="740"
          y="724"
          width="10"
          height="38"
          rx="5"
          fill="url(#tubeCoral2)"
        />
        <rect
          x="754"
          y="717"
          width="9"
          height="45"
          rx="4"
          fill="url(#tubeCoral1)"
        />
        <rect
          x="767"
          y="722"
          width="10"
          height="40"
          rx="5"
          fill="url(#tubeCoral2)"
        />
        <rect
          x="780"
          y="714"
          width="8"
          height="48"
          rx="4"
          fill="url(#tubeCoral1)"
        />
        <rect
          x="792"
          y="720"
          width="9"
          height="42"
          rx="4"
          fill="url(#tubeCoral2)"
        />
        <circle cx="745" cy="724" r="6" fill="#c070ee" />
        <circle cx="758" cy="717" r="6" fill="#5ad8f0" />
        <circle cx="772" cy="722" r="6" fill="#d088ff" />
        <circle cx="784" cy="714" r="5" fill="#5ad8f0" />
        <circle cx="796" cy="720" r="6" fill="#c070ee" />
      </g>
      {/* Small red anemone-style coral */}
      <g filter="url(#glow)">
        <circle cx="420" cy="755" r="18" fill="#8B0020" opacity="0.85" />
        <circle cx="420" cy="755" r="13" fill="#cc1133" opacity="0.9" />
        {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle) => (
          <line
            key={`anemone-ray-${angle}`}
            x1={420}
            y1={755}
            x2={420 + Math.cos((angle * Math.PI) / 180) * 20}
            y2={755 + Math.sin((angle * Math.PI) / 180) * 20}
            stroke="#ff3355"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
        <circle cx="420" cy="735" r="3" fill="#ff6688" />
        <circle cx="434" cy="741" r="3" fill="#ff6688" />
        <circle cx="437" cy="757" r="3" fill="#ff6688" />
        <circle cx="430" cy="770" r="3" fill="#ff6688" />
        <circle cx="417" cy="775" r="3" fill="#ff6688" />
        <circle cx="404" cy="771" r="3" fill="#ff6688" />
        <circle cx="400" cy="758" r="3" fill="#ff6688" />
        <circle cx="406" cy="743" r="3" fill="#ff6688" />
        <circle cx="420" cy="740" r="3" fill="#ff6688" />
      </g>

      {/* === SMALL FISH SCHOOLS (mid-water) === */}
      {/* School 1 — upper mid, small dark silhouettes */}
      <g opacity="0.55" fill="#0a2a3a">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g
            key={`fish1-${i}`}
            transform={`translate(${300 + i * 22},${260 + (i % 3) * 12})`}
          >
            <ellipse cx="0" cy="0" rx="7" ry="3" />
            <polygon points="-7,0 -13,-4 -13,4" />
          </g>
        ))}
      </g>
      {/* School 2 — right side, mid depth */}
      <g opacity="0.5" fill="#0a2838">
        {[0, 1, 2, 3, 4].map((i) => (
          <g
            key={`fish2-${i}`}
            transform={`translate(${820 + i * 18},${380 + (i % 2) * 14})`}
          >
            <ellipse cx="0" cy="0" rx="6" ry="2.5" />
            <polygon points="-6,0 -11,-3 -11,3" />
          </g>
        ))}
      </g>
      {/* School 3 — small school, far left, upper */}
      <g opacity="0.45" fill="#0c2c3c">
        {[0, 1, 2, 3].map((i) => (
          <g
            key={`fish3-${i}`}
            transform={`translate(${150 + i * 16},${320 + (i % 2) * 10})`}
          >
            <ellipse cx="0" cy="0" rx="5" ry="2" />
            <polygon points="-5,0 -9,-2.5 -9,2.5" />
          </g>
        ))}
      </g>
      {/* Single larger fish — right mid */}
      <g opacity="0.6" fill="#0a2030">
        <ellipse cx="1050" cy="440" rx="16" ry="7" />
        <polygon points="1034,440 1022,432 1022,448" />
        <ellipse cx="1056" cy="438" rx="3" ry="3" fill="#1a4060" />
      </g>
      {/* Single fish mid-left */}
      <g opacity="0.55" fill="#0a2030">
        <ellipse cx="200" cy="480" rx="14" ry="6" />
        <polygon points="186,480 175,473 175,487" />
        <ellipse cx="205" cy="478" rx="2.5" ry="2.5" fill="#1a3a55" />
      </g>

      {/* === BUBBLES — rising from reef === */}
      {/* Large bubble column from center-left */}
      <circle
        cx="130"
        cy="700"
        r="5"
        fill="none"
        stroke="#3aaccc"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <circle
        cx="136"
        cy="655"
        r="4"
        fill="none"
        stroke="#3aaccc"
        strokeWidth="1.2"
        opacity="0.5"
      />
      <circle
        cx="128"
        cy="608"
        r="6"
        fill="none"
        stroke="#3aaccc"
        strokeWidth="1.5"
        opacity="0.45"
      />
      <circle
        cx="133"
        cy="558"
        r="4"
        fill="none"
        stroke="#3aaccc"
        strokeWidth="1.2"
        opacity="0.35"
      />
      <circle
        cx="126"
        cy="510"
        r="5"
        fill="none"
        stroke="#3aaccc"
        strokeWidth="1"
        opacity="0.25"
      />
      {/* Bubble column from mid */}
      <circle
        cx="520"
        cy="710"
        r="4"
        fill="none"
        stroke="#3ab8cc"
        strokeWidth="1.2"
        opacity="0.6"
      />
      <circle
        cx="525"
        cy="665"
        r="5"
        fill="none"
        stroke="#3ab8cc"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <circle
        cx="518"
        cy="618"
        r="3"
        fill="none"
        stroke="#3ab8cc"
        strokeWidth="1"
        opacity="0.4"
      />
      <circle
        cx="523"
        cy="572"
        r="5"
        fill="none"
        stroke="#3ab8cc"
        strokeWidth="1.2"
        opacity="0.3"
      />
      <circle
        cx="516"
        cy="525"
        r="4"
        fill="none"
        stroke="#3ab8cc"
        strokeWidth="1"
        opacity="0.2"
      />
      {/* Scattered single bubbles */}
      <circle
        cx="360"
        cy="640"
        r="3"
        fill="none"
        stroke="#3ab0c0"
        strokeWidth="1"
        opacity="0.45"
      />
      <circle
        cx="680"
        cy="620"
        r="4"
        fill="none"
        stroke="#3ab0c0"
        strokeWidth="1.2"
        opacity="0.4"
      />
      <circle
        cx="820"
        cy="680"
        r="3"
        fill="none"
        stroke="#3ab0c0"
        strokeWidth="1"
        opacity="0.45"
      />
      <circle
        cx="940"
        cy="650"
        r="5"
        fill="none"
        stroke="#3ab0c0"
        strokeWidth="1.2"
        opacity="0.4"
      />
      <circle
        cx="1000"
        cy="590"
        r="3"
        fill="none"
        stroke="#3ab0c0"
        strokeWidth="1"
        opacity="0.3"
      />
      <circle
        cx="240"
        cy="560"
        r="4"
        fill="none"
        stroke="#3ab0c0"
        strokeWidth="1"
        opacity="0.35"
      />
      <circle
        cx="770"
        cy="540"
        r="3"
        fill="none"
        stroke="#3ab0c0"
        strokeWidth="1"
        opacity="0.28"
      />
      <circle
        cx="1100"
        cy="620"
        r="4"
        fill="none"
        stroke="#3ab0c0"
        strokeWidth="1.2"
        opacity="0.4"
      />

      {/* === BIOLUMINESCENT PLANKTON — diverse micro-organism shapes === */}

      {/* --- Upper water column: radiolarians, copepods, cells --- */}
      <g filter="url(#glow)" opacity="0.88">
        {/* Radiolarian stars — upper zone */}
        <use href="#plk-radiol" x="407" y="107" width="12" height="12" />
        <use href="#plk-radiol6" x="648" y="82" width="10" height="10" />
        <use href="#plk-radiol" x="828" y="127" width="14" height="14" />
        <use href="#plk-radiol6" x="207" y="147" width="10" height="10" />
        <use href="#plk-radiol" x="988" y="97" width="11" height="11" />
        <use href="#plk-radiol6" x="747" y="52" width="9" height="9" />
        <use href="#plk-radiol" x="307" y="72" width="12" height="12" />
        <use href="#plk-radiol6" x="908" y="65" width="13" height="13" />
        <use href="#plk-radiol" x="1067" y="42" width="11" height="11" />
        <use href="#plk-radiol6" x="527" y="57" width="15" height="15" />
        <use href="#plk-radiol" x="88" y="67" width="10" height="10" />
        <use href="#plk-radiol6" x="1108" y="82" width="10" height="10" />
        {/* Copepods — upper */}
        <use href="#plk-copepod" x="168" y="37" width="9" height="13" />
        <use href="#plk-copepod" x="418" y="112" width="8" height="12" />
        <use href="#plk-copepod" x="658" y="89" width="9" height="13" />
        <use href="#plk-copepod" x="998" y="103" width="8" height="11" />
        {/* Tiny cells */}
        <use href="#plk-cell" x="62" y="74" width="7" height="7" />
        <use href="#plk-orb" x="534" y="63" width="8" height="8" />
        <use href="#plk-cell" x="754" y="58" width="7" height="7" />
        <use href="#plk-orb" x="1116" y="88" width="7" height="7" />
      </g>

      {/* --- Mid-upper zone: mix of all types --- */}
      <g filter="url(#glow)" opacity="0.8">
        <use href="#plk-radiol" x="127" y="207" width="11" height="11" />
        <use href="#plk-jelly" x="368" y="190" width="12" height="16" />
        <use href="#plk-radiol6" x="598" y="228" width="13" height="13" />
        <use href="#plk-copepod" x="778" y="183" width="8" height="12" />
        <use href="#plk-radiol" x="1038" y="203" width="11" height="11" />
        <use href="#plk-dino" x="248" y="168" width="10" height="10" />
        <use href="#plk-radiol6" x="958" y="158" width="10" height="10" />
        <use href="#plk-jelly" x="468" y="143" width="11" height="15" />
        <use href="#plk-cell" x="1138" y="188" width="8" height="8" />
        <use href="#plk-orb" x="38" y="178" width="9" height="9" />
        <use href="#plk-copepod" x="708" y="163" width="9" height="13" />
        <use href="#plk-dino" x="868" y="220" width="11" height="11" />
        <use href="#plk-radiol" x="1128" y="195" width="9" height="9" />
        <use href="#plk-cell" x="310" y="140" width="7" height="7" />
        <use href="#plk-jelly" x="560" y="108" width="10" height="14" />
        <use href="#plk-orb" x="820" y="145" width="8" height="8" />
      </g>

      {/* --- Mid water: dinoflagellates, jellyfish bells, mixed --- */}
      <g filter="url(#glow)" opacity="0.72">
        <use href="#plk-dino" x="188" y="290" width="11" height="11" />
        <use href="#plk-jelly" x="438" y="268" width="13" height="17" />
        <use href="#plk-radiol6" x="688" y="298" width="12" height="12" />
        <use href="#plk-copepod" x="938" y="278" width="8" height="12" />
        <use href="#plk-dino" x="68" y="328" width="10" height="10" />
        <use href="#plk-jelly" x="1148" y="313" width="12" height="16" />
        <use href="#plk-radiol" x="318" y="343" width="11" height="11" />
        <use href="#plk-orb" x="568" y="318" width="9" height="9" />
        <use href="#plk-cell" x="818" y="348" width="8" height="8" />
        <use href="#plk-dino" x="1058" y="333" width="11" height="11" />
        <use href="#plk-radiol6" x="150" y="370" width="10" height="10" />
        <use href="#plk-jelly" x="730" y="350" width="11" height="15" />
        <use href="#plk-copepod" x="480" y="382" width="9" height="13" />
        <use href="#plk-cell" x="1178" y="368" width="7" height="7" />
        <use href="#plk-orb" x="264" y="360" width="9" height="9" />
        <use href="#plk-radiol" x="858" y="388" width="12" height="12" />
        <use href="#plk-dino" x="988" y="305" width="9" height="9" />
        <use href="#plk-cell" x="448" y="255" width="6" height="6" />
      </g>

      {/* --- Mid-deep zone: scattered across full width --- */}
      <g filter="url(#glow)" opacity="0.64">
        <use href="#plk-jelly" x="148" y="420" width="12" height="16" />
        <use href="#plk-radiol" x="378" y="440" width="11" height="11" />
        <use href="#plk-dino" x="608" y="410" width="10" height="10" />
        <use href="#plk-copepod" x="838" y="450" width="8" height="12" />
        <use href="#plk-radiol6" x="1088" y="425" width="11" height="11" />
        <use href="#plk-cell" x="38" y="470" width="9" height="9" />
        <use href="#plk-orb" x="258" y="460" width="8" height="8" />
        <use href="#plk-jelly" x="488" y="480" width="12" height="16" />
        <use href="#plk-radiol" x="738" y="470" width="13" height="13" />
        <use href="#plk-dino" x="988" y="460" width="11" height="11" />
        <use href="#plk-cell" x="1168" y="480" width="8" height="8" />
        <use href="#plk-radiol6" x="560" y="440" width="10" height="10" />
        <use href="#plk-copepod" x="910" y="412" width="9" height="13" />
        <use href="#plk-orb" x="1050" y="395" width="9" height="9" />
      </g>

      {/* --- Deeper water: larger glowing orbs + soft cells --- */}
      <g filter="url(#softGlow)" opacity="0.55">
        <use href="#plk-cell" x="97" y="540" width="11" height="11" />
        <use href="#plk-orb" x="326" y="510" width="10" height="10" />
        <use href="#plk-jelly" x="577" y="550" width="14" height="18" />
        <use href="#plk-cell" x="788" y="520" width="11" height="11" />
        <use href="#plk-radiol" x="1047" y="545" width="12" height="12" />
        <use href="#plk-orb" x="207" y="590" width="10" height="10" />
        <use href="#plk-radiol6" x="447" y="570" width="13" height="13" />
        <use href="#plk-cell" x="677" y="600" width="10" height="10" />
        <use href="#plk-jelly" x="917" y="580" width="12" height="16" />
        <use href="#plk-radiol" x="1167" y="560" width="11" height="11" />
        <use href="#plk-dino" x="340" y="555" width="11" height="11" />
        <use href="#plk-copepod" x="750" y="542" width="9" height="13" />
        <use href="#plk-orb" x="1080" y="510" width="10" height="10" />
      </g>

      {/* --- Tiny sparkle cells scattered everywhere — smallest/fastest to render --- */}
      <g opacity="0.5">
        <use href="#plk-cell" x="68" y="136" width="6" height="6" />
        <use href="#plk-orb" x="189" y="124" width="6" height="6" />
        <use href="#plk-cell" x="424" y="99" width="6" height="6" />
        <use href="#plk-orb" x="704" y="119" width="6" height="6" />
        <use href="#plk-cell" x="979" y="92" width="6" height="6" />
        <use href="#plk-orb" x="1134" y="109" width="6" height="6" />
        <use href="#plk-cell" x="284" y="254" width="5" height="5" />
        <use href="#plk-orb" x="549" y="269" width="5" height="5" />
        <use href="#plk-cell" x="864" y="242" width="5" height="5" />
        <use href="#plk-orb" x="1014" y="276" width="5" height="5" />
        <use href="#plk-cell" x="139" y="384" width="5" height="5" />
        <use href="#plk-orb" x="674" y="396" width="5" height="5" />
        <use href="#plk-cell" x="1084" y="412" width="5" height="5" />
        <use href="#plk-orb" x="450" y="330" width="5" height="5" />
        <use href="#plk-cell" x="780" y="310" width="5" height="5" />
        <use href="#plk-orb" x="1148" y="352" width="5" height="5" />
        <use href="#plk-cell" x="58" y="528" width="5" height="5" />
        <use href="#plk-orb" x="1190" y="498" width="5" height="5" />
      </g>

      {/* === DEPTH + VIGNETTE overlays === */}
      <rect width="1200" height="800" fill="url(#depthOverlay)" />
      <rect width="1200" height="800" fill="url(#vigOcean)" />
    </svg>
  );

  const renderMinecraftWorld = () => {
    // Grass segment A x-positions (0..144 step 16)
    const grassAX = [0, 16, 32, 48, 64, 80, 96, 112, 128, 144];
    // Grass step up (bump) x=160..224
    const grassStepX = [160, 176, 192, 208, 224];
    // Grass segment B x=240..464
    const grassBX = [
      240, 256, 272, 288, 304, 320, 336, 352, 368, 384, 400, 416, 432, 448, 464,
    ];
    // Water grid vertical lines
    const waterVX = [480, 496, 512, 528, 544, 560, 576, 592, 608, 624];
    // Water grid horizontal lines
    const waterHY = [496, 512];
    // Grass segment C x=656..784
    const grassCX = [656, 672, 688, 704, 720, 736, 752, 768, 784];
    // Grass step up 2 x=800..864
    const grassStep2X = [800, 816, 832, 848, 864];
    // Grass segment D x=880..1184
    const grassDX = [
      880, 896, 912, 928, 944, 960, 976, 992, 1008, 1024, 1040, 1056, 1072,
      1088, 1104, 1120, 1136, 1152, 1168, 1184,
    ];
    // Exposed stone x=960..1008
    const expStoneData: { x: number; shade: string }[] = [
      { x: 960, shade: "#7E7E7E" },
      { x: 976, shade: "#727272" },
      { x: 992, shade: "#7E7E7E" },
      { x: 1008, shade: "#727272" },
    ];
    // Gravel patch x=720..752
    const gravelData: { x: number; shade: string }[] = [
      { x: 720, shade: "#999999" },
      { x: 736, shade: "#888888" },
      { x: 752, shade: "#999999" },
    ];
    // Trunk 1 y-positions (tree1 x=100, surface=512)
    const trunk1Y = [432, 448, 464, 480, 496];
    // Trunk 2 y-positions (tree2 x=1020, surface=480)
    const trunk2Y = [416, 432, 448, 464];
    // Tree 1 leaves (4×4 grid) — [row, col] → [lx, ly, isEdge]
    const leaves1: { lx: number; ly: number; edge: boolean; id: string }[] = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        leaves1.push({
          lx: 84 + c * 16,
          ly: 384 + r * 16,
          edge: r === 0 || r === 3 || c === 0 || c === 3,
          id: `${r}-${c}`,
        });
      }
    }
    // Tree 2 leaves (4×3 grid)
    const leaves2: { lx: number; ly: number; edge: boolean; id: string }[] = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        leaves2.push({
          lx: 1004 + c * 16,
          ly: 368 + r * 16,
          edge: r === 0 || r === 2 || c === 0 || c === 3,
          id: `${r}-${c}`,
        });
      }
    }
    // Dirt layer rows/cols as explicit coords
    const dirtBlocks: { x: number; y: number; shade: string }[] = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 75; col++) {
        dirtBlocks.push({
          x: col * 16,
          y: 528 + row * 16,
          shade: (col + row) % 2 === 0 ? "#8B5E3C" : "#7A5230",
        });
      }
    }
    // Stone deep layer rows/cols as explicit coords
    const stoneBlocks: { x: number; y: number; shade: string }[] = [];
    for (let row = 0; row < 12; row++) {
      for (let col = 0; col < 75; col++) {
        const s = (col + row) % 3;
        stoneBlocks.push({
          x: col * 16,
          y: 608 + row * 16,
          shade: s === 0 ? "#6A6A6A" : s === 1 ? "#767676" : "#7E7E7E",
        });
      }
    }
    return (
      <svg
        role="img"
        aria-label="Minecraft world background"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="mcSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="65%" stopColor="#B8E0F5" />
            <stop offset="100%" stopColor="#D8EEFA" />
          </linearGradient>
          <linearGradient id="mcGrassTop" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6FC040" />
            <stop offset="100%" stopColor="#5D9B3B" />
          </linearGradient>
          <linearGradient id="mcGrassSide" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5D9B3B" />
            <stop offset="100%" stopColor="#4C7A2E" />
          </linearGradient>
          <linearGradient id="mcWater" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4488EE" />
            <stop offset="30%" stopColor="#3366CC" />
            <stop offset="100%" stopColor="#2244AA" />
          </linearGradient>
          <linearGradient id="mcStone" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8A8A8A" />
            <stop offset="100%" stopColor="#6E6E6E" />
          </linearGradient>
          <linearGradient id="mcSun" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF176" />
            <stop offset="100%" stopColor="#FFD600" />
          </linearGradient>
          <radialGradient
            id="mcVignette"
            cx="50%"
            cy="50%"
            r="70%"
            fx="50%"
            fy="50%"
          >
            <stop offset="55%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.28)" />
          </radialGradient>
        </defs>

        {/* SKY */}
        <rect x="0" y="0" width="1200" height="480" fill="url(#mcSky)" />

        {/* PIXEL SUN — upper right */}
        <rect
          x="1090"
          y="34"
          width="20"
          height="20"
          fill="#FFD600"
          opacity="0.85"
        />
        <rect
          x="1090"
          y="14"
          width="20"
          height="16"
          fill="#FFD600"
          opacity="0.55"
        />
        <rect
          x="1090"
          y="118"
          width="20"
          height="20"
          fill="#FFD600"
          opacity="0.85"
        />
        <rect
          x="1090"
          y="138"
          width="20"
          height="16"
          fill="#FFD600"
          opacity="0.55"
        />
        <rect
          x="1050"
          y="76"
          width="20"
          height="20"
          fill="#FFD600"
          opacity="0.85"
        />
        <rect
          x="1032"
          y="76"
          width="16"
          height="20"
          fill="#FFD600"
          opacity="0.55"
        />
        <rect
          x="1134"
          y="76"
          width="20"
          height="20"
          fill="#FFD600"
          opacity="0.85"
        />
        <rect
          x="1154"
          y="76"
          width="16"
          height="20"
          fill="#FFD600"
          opacity="0.55"
        />
        <rect
          x="1056"
          y="40"
          width="16"
          height="16"
          fill="#FFD600"
          opacity="0.65"
        />
        <rect
          x="1128"
          y="40"
          width="16"
          height="16"
          fill="#FFD600"
          opacity="0.65"
        />
        <rect
          x="1056"
          y="116"
          width="16"
          height="16"
          fill="#FFD600"
          opacity="0.65"
        />
        <rect
          x="1128"
          y="116"
          width="16"
          height="16"
          fill="#FFD600"
          opacity="0.65"
        />
        <rect x="1070" y="54" width="60" height="60" fill="url(#mcSun)" />
        <rect
          x="1070"
          y="54"
          width="30"
          height="30"
          fill="#FFF9C4"
          opacity="0.45"
        />
        <rect
          x="1100"
          y="84"
          width="30"
          height="30"
          fill="#F9A825"
          opacity="0.35"
        />

        {/* PIXEL CLOUDS */}
        {/* Cloud 1 */}
        <rect x="80" y="80" width="32" height="32" fill="#FFFFFF" />
        <rect x="112" y="64" width="32" height="48" fill="#FFFFFF" />
        <rect x="144" y="64" width="48" height="48" fill="#FFFFFF" />
        <rect x="192" y="80" width="32" height="32" fill="#FFFFFF" />
        <rect x="224" y="96" width="32" height="16" fill="#FFFFFF" />
        <rect
          x="80"
          y="96"
          width="176"
          height="8"
          fill="#D8D8D8"
          opacity="0.5"
        />
        {/* Cloud 2 */}
        <rect x="500" y="52" width="32" height="32" fill="#FFFFFF" />
        <rect x="532" y="36" width="48" height="48" fill="#FFFFFF" />
        <rect x="580" y="36" width="64" height="48" fill="#FFFFFF" />
        <rect x="644" y="52" width="48" height="32" fill="#FFFFFF" />
        <rect x="692" y="68" width="32" height="16" fill="#FFFFFF" />
        <rect
          x="500"
          y="68"
          width="224"
          height="8"
          fill="#D8D8D8"
          opacity="0.5"
        />
        {/* Cloud 3 */}
        <rect x="840" y="100" width="32" height="32" fill="#FFFFFF" />
        <rect x="872" y="84" width="48" height="48" fill="#FFFFFF" />
        <rect x="920" y="84" width="48" height="48" fill="#FFFFFF" />
        <rect x="968" y="100" width="32" height="32" fill="#FFFFFF" />
        <rect
          x="840"
          y="116"
          width="160"
          height="8"
          fill="#D8D8D8"
          opacity="0.5"
        />

        {/* STONE DEEP LAYER */}
        {stoneBlocks.map((b) => (
          <g key={`st-${b.x}-${b.y}`}>
            <rect x={b.x} y={b.y} width="16" height="16" fill={b.shade} />
            <rect
              x={b.x}
              y={b.y}
              width="16"
              height="2"
              fill="#909090"
              opacity="0.4"
            />
            <rect
              x={b.x}
              y={b.y}
              width="2"
              height="16"
              fill="#909090"
              opacity="0.4"
            />
            <rect
              x={b.x + 14}
              y={b.y}
              width="2"
              height="16"
              fill="#585858"
              opacity="0.35"
            />
            <rect
              x={b.x}
              y={b.y + 14}
              width="16"
              height="2"
              fill="#585858"
              opacity="0.35"
            />
          </g>
        ))}

        {/* DIRT LAYER */}
        {dirtBlocks.map((b) => (
          <g key={`di-${b.x}-${b.y}`}>
            <rect x={b.x} y={b.y} width="16" height="16" fill={b.shade} />
            <rect
              x={b.x}
              y={b.y}
              width="16"
              height="2"
              fill="#A07040"
              opacity="0.35"
            />
            <rect
              x={b.x}
              y={b.y}
              width="2"
              height="16"
              fill="#A07040"
              opacity="0.35"
            />
            <rect
              x={b.x + 14}
              y={b.y}
              width="2"
              height="16"
              fill="#5A3520"
              opacity="0.3"
            />
            <rect
              x={b.x}
              y={b.y + 14}
              width="16"
              height="2"
              fill="#5A3520"
              opacity="0.3"
            />
          </g>
        ))}

        {/* GRASS SEGMENT A */}
        {grassAX.map((bx) => (
          <g key={`gA-${bx}`}>
            <rect
              x={bx}
              y={512}
              width="16"
              height="4"
              fill="url(#mcGrassTop)"
            />
            <rect
              x={bx}
              y={516}
              width="16"
              height="12"
              fill="url(#mcGrassSide)"
            />
            <rect
              x={bx}
              y={512}
              width="16"
              height="1"
              fill="#8FD44F"
              opacity="0.6"
            />
            <rect
              x={bx}
              y={512}
              width="1"
              height="16"
              fill="#7DC442"
              opacity="0.4"
            />
          </g>
        ))}

        {/* GRASS STEP */}
        {grassStepX.map((bx) => (
          <g key={`gSt-${bx}`}>
            <rect
              x={bx}
              y={496}
              width="16"
              height="4"
              fill="url(#mcGrassTop)"
            />
            <rect
              x={bx}
              y={500}
              width="16"
              height="12"
              fill="url(#mcGrassSide)"
            />
            <rect
              x={bx}
              y={496}
              width="16"
              height="1"
              fill="#8FD44F"
              opacity="0.6"
            />
            <rect x={bx} y={512} width="16" height="16" fill="#8B5E3C" />
          </g>
        ))}

        {/* GRASS SEGMENT B */}
        {grassBX.map((bx) => (
          <g key={`gB-${bx}`}>
            <rect
              x={bx}
              y={496}
              width="16"
              height="4"
              fill="url(#mcGrassTop)"
            />
            <rect
              x={bx}
              y={500}
              width="16"
              height="12"
              fill="url(#mcGrassSide)"
            />
            <rect
              x={bx}
              y={496}
              width="16"
              height="1"
              fill="#8FD44F"
              opacity="0.6"
            />
            <rect
              x={bx}
              y={496}
              width="1"
              height="16"
              fill="#7DC442"
              opacity="0.4"
            />
          </g>
        ))}

        {/* WATER POOL */}
        <rect x="480" y="496" width="160" height="32" fill="url(#mcWater)" />
        <rect
          x="480"
          y="496"
          width="160"
          height="4"
          fill="#6AABFF"
          opacity="0.6"
        />
        {waterVX.map((vx) => (
          <rect
            key={`wv-${vx}`}
            x={vx}
            y={496}
            width="1"
            height="32"
            fill="#2244AA"
            opacity="0.25"
          />
        ))}
        {waterHY.map((hy) => (
          <rect
            key={`wh-${hy}`}
            x={480}
            y={hy}
            width="160"
            height="1"
            fill="#2244AA"
            opacity="0.25"
          />
        ))}
        <rect x="464" y="496" width="16" height="32" fill="#8B5E3C" />
        <rect x="464" y="496" width="16" height="4" fill="url(#mcGrassTop)" />
        <rect x="640" y="496" width="16" height="32" fill="#8B5E3C" />
        <rect x="640" y="496" width="16" height="4" fill="url(#mcGrassTop)" />

        {/* GRASS SEGMENT C */}
        {grassCX.map((bx) => (
          <g key={`gC-${bx}`}>
            <rect
              x={bx}
              y={496}
              width="16"
              height="4"
              fill="url(#mcGrassTop)"
            />
            <rect
              x={bx}
              y={500}
              width="16"
              height="12"
              fill="url(#mcGrassSide)"
            />
            <rect
              x={bx}
              y={496}
              width="16"
              height="1"
              fill="#8FD44F"
              opacity="0.6"
            />
          </g>
        ))}

        {/* GRASS STEP 2 */}
        {grassStep2X.map((bx) => (
          <g key={`gSt2-${bx}`}>
            <rect
              x={bx}
              y={480}
              width="16"
              height="4"
              fill="url(#mcGrassTop)"
            />
            <rect
              x={bx}
              y={484}
              width="16"
              height="12"
              fill="url(#mcGrassSide)"
            />
            <rect
              x={bx}
              y={480}
              width="16"
              height="1"
              fill="#8FD44F"
              opacity="0.6"
            />
            <rect x={bx} y={496} width="16" height="16" fill="#8B5E3C" />
          </g>
        ))}

        {/* GRASS SEGMENT D */}
        {grassDX.map((bx) => (
          <g key={`gD-${bx}`}>
            <rect
              x={bx}
              y={480}
              width="16"
              height="4"
              fill="url(#mcGrassTop)"
            />
            <rect
              x={bx}
              y={484}
              width="16"
              height="12"
              fill="url(#mcGrassSide)"
            />
            <rect
              x={bx}
              y={480}
              width="16"
              height="1"
              fill="#8FD44F"
              opacity="0.6"
            />
            <rect
              x={bx}
              y={480}
              width="1"
              height="16"
              fill="#7DC442"
              opacity="0.4"
            />
          </g>
        ))}

        {/* CAVE OPENING */}
        <rect x="320" y="496" width="48" height="32" fill="#1A1A1A" />
        <rect x="316" y="492" width="56" height="8" fill="url(#mcStone)" />
        <rect x="316" y="492" width="8" height="40" fill="url(#mcStone)" />
        <rect x="364" y="492" width="8" height="40" fill="url(#mcStone)" />
        <rect
          x="316"
          y="492"
          width="56"
          height="2"
          fill="#909090"
          opacity="0.4"
        />
        <rect
          x="316"
          y="492"
          width="2"
          height="40"
          fill="#909090"
          opacity="0.4"
        />

        {/* EXPOSED STONE */}
        {expStoneData.map((s) => (
          <g key={`es-${s.x}`}>
            <rect x={s.x} y={484} width="16" height="12" fill={s.shade} />
            <rect
              x={s.x}
              y={484}
              width="16"
              height="2"
              fill="#909090"
              opacity="0.45"
            />
            <rect
              x={s.x}
              y={484}
              width="2"
              height="12"
              fill="#909090"
              opacity="0.45"
            />
            <rect
              x={s.x + 14}
              y={484}
              width="2"
              height="12"
              fill="#585858"
              opacity="0.3"
            />
          </g>
        ))}

        {/* GRAVEL PATCH */}
        {gravelData.map((g) => (
          <g key={`gr-${g.x}`}>
            <rect x={g.x} y={496} width="16" height="4" fill={g.shade} />
            <rect
              x={g.x + 3}
              y={497}
              width="3"
              height="2"
              fill="#777"
              opacity="0.5"
            />
            <rect
              x={g.x + 10}
              y={498}
              width="3"
              height="2"
              fill="#AAAAAA"
              opacity="0.5"
            />
          </g>
        ))}

        {/* TREE 1 — TRUNK */}
        {trunk1Y.map((ty) => (
          <g key={`t1-${ty}`}>
            <rect x={100} y={ty} width="16" height="16" fill="#5C3A1E" />
            <rect x={116} y={ty} width="16" height="16" fill="#4A2C14" />
            <rect
              x={100}
              y={ty}
              width="4"
              height="16"
              fill="#7A5030"
              opacity="0.5"
            />
          </g>
        ))}
        <rect x="100" y="512" width="32" height="16" fill="#5C3A1E" />

        {/* TREE 1 — LEAVES */}
        {leaves1.map((l) => (
          <g key={`l1-${l.id}`}>
            <rect
              x={l.lx}
              y={l.ly}
              width="16"
              height="16"
              fill={l.edge ? "#2E7A1E" : "#3E9E2A"}
            />
            <rect
              x={l.lx}
              y={l.ly}
              width="16"
              height="2"
              fill="#4DB832"
              opacity="0.4"
            />
            <rect
              x={l.lx}
              y={l.ly}
              width="2"
              height="16"
              fill="#4DB832"
              opacity="0.4"
            />
            <rect
              x={l.lx + 14}
              y={l.ly}
              width="2"
              height="16"
              fill="#1E5A12"
              opacity="0.3"
            />
            <rect
              x={l.lx}
              y={l.ly + 14}
              width="16"
              height="2"
              fill="#1E5A12"
              opacity="0.3"
            />
          </g>
        ))}

        {/* TREE 2 — TRUNK */}
        {trunk2Y.map((ty) => (
          <g key={`t2-${ty}`}>
            <rect x={1020} y={ty} width="16" height="16" fill="#5C3A1E" />
            <rect x={1036} y={ty} width="16" height="16" fill="#4A2C14" />
            <rect
              x={1020}
              y={ty}
              width="4"
              height="16"
              fill="#7A5030"
              opacity="0.5"
            />
          </g>
        ))}
        <rect x="1020" y="480" width="32" height="16" fill="#5C3A1E" />

        {/* TREE 2 — LEAVES */}
        {leaves2.map((l) => (
          <g key={`l2-${l.id}`}>
            <rect
              x={l.lx}
              y={l.ly}
              width="16"
              height="16"
              fill={l.edge ? "#2E7A1E" : "#3E9E2A"}
            />
            <rect
              x={l.lx}
              y={l.ly}
              width="16"
              height="2"
              fill="#4DB832"
              opacity="0.4"
            />
            <rect
              x={l.lx}
              y={l.ly}
              width="2"
              height="16"
              fill="#4DB832"
              opacity="0.4"
            />
            <rect
              x={l.lx + 14}
              y={l.ly}
              width="2"
              height="16"
              fill="#1E5A12"
              opacity="0.3"
            />
            <rect
              x={l.lx}
              y={l.ly + 14}
              width="16"
              height="2"
              fill="#1E5A12"
              opacity="0.3"
            />
          </g>
        ))}

        {/* TALL GRASS BLADES */}
        <rect x="50" y="500" width="4" height="12" fill="#5CBF2A" />
        <rect x="58" y="502" width="3" height="10" fill="#4CAF20" />
        <rect x="64" y="499" width="4" height="13" fill="#5CBF2A" />
        <rect x="72" y="501" width="3" height="11" fill="#6FD030" />
        <rect x="448" y="484" width="4" height="12" fill="#5CBF2A" />
        <rect x="456" y="485" width="3" height="11" fill="#4CAF20" />
        <rect x="658" y="484" width="4" height="12" fill="#5CBF2A" />
        <rect x="666" y="486" width="3" height="10" fill="#6FD030" />
        <rect x="900" y="468" width="4" height="12" fill="#5CBF2A" />
        <rect x="908" y="470" width="3" height="10" fill="#4CAF20" />
        <rect x="916" y="467" width="4" height="13" fill="#5CBF2A" />
        <rect x="1080" y="468" width="4" height="12" fill="#5CBF2A" />
        <rect x="1088" y="470" width="3" height="10" fill="#6FD030" />
        <rect x="1150" y="468" width="4" height="12" fill="#5CBF2A" />
        <rect x="1158" y="469" width="3" height="11" fill="#4CAF20" />

        {/* VIGNETTE */}
        <rect x="0" y="0" width="1200" height="800" fill="url(#mcVignette)" />
      </svg>
    );
  };

  const renderPumpFunWorld = () => {
    // Candlestick data helpers — purely visual, no text
    // Each candle: [open%, close%, low%, high%] as 0–1 fraction of chart height (0=top)
    const chart1Candles = [
      { o: 0.78, c: 0.62, l: 0.85, h: 0.55, green: true },
      { o: 0.62, c: 0.48, l: 0.68, h: 0.42, green: true },
      { o: 0.48, c: 0.55, l: 0.45, h: 0.6, green: false },
      { o: 0.55, c: 0.38, l: 0.6, h: 0.32, green: true },
      { o: 0.38, c: 0.28, l: 0.42, h: 0.22, green: true },
      { o: 0.28, c: 0.34, l: 0.25, h: 0.38, green: false },
      { o: 0.34, c: 0.2, l: 0.38, h: 0.14, green: true },
      { o: 0.2, c: 0.12, l: 0.24, h: 0.08, green: true },
      { o: 0.12, c: 0.18, l: 0.1, h: 0.22, green: false },
      { o: 0.18, c: 0.08, l: 0.22, h: 0.04, green: true },
      { o: 0.08, c: 0.14, l: 0.06, h: 0.18, green: false },
      { o: 0.14, c: 0.05, l: 0.18, h: 0.02, green: true },
    ];
    const chart2Candles = [
      { o: 0.82, c: 0.7, l: 0.88, h: 0.64, green: true },
      { o: 0.7, c: 0.75, l: 0.66, h: 0.8, green: false },
      { o: 0.75, c: 0.58, l: 0.8, h: 0.52, green: true },
      { o: 0.58, c: 0.45, l: 0.62, h: 0.38, green: true },
      { o: 0.45, c: 0.5, l: 0.42, h: 0.55, green: false },
      { o: 0.5, c: 0.32, l: 0.54, h: 0.26, green: true },
      { o: 0.32, c: 0.38, l: 0.28, h: 0.42, green: false },
      { o: 0.38, c: 0.22, l: 0.42, h: 0.16, green: true },
      { o: 0.22, c: 0.14, l: 0.26, h: 0.1, green: true },
      { o: 0.14, c: 0.2, l: 0.1, h: 0.24, green: false },
      { o: 0.2, c: 0.1, l: 0.24, h: 0.06, green: true },
      { o: 0.1, c: 0.04, l: 0.14, h: 0.01, green: true },
    ];
    const chart3Candles = [
      { o: 0.75, c: 0.65, l: 0.82, h: 0.58, green: true },
      { o: 0.65, c: 0.7, l: 0.6, h: 0.76, green: false },
      { o: 0.7, c: 0.52, l: 0.74, h: 0.46, green: true },
      { o: 0.52, c: 0.42, l: 0.56, h: 0.36, green: true },
      { o: 0.42, c: 0.48, l: 0.38, h: 0.52, green: false },
      { o: 0.48, c: 0.3, l: 0.52, h: 0.24, green: true },
      { o: 0.3, c: 0.22, l: 0.34, h: 0.16, green: true },
      { o: 0.22, c: 0.28, l: 0.18, h: 0.32, green: false },
      { o: 0.28, c: 0.14, l: 0.32, h: 0.08, green: true },
      { o: 0.14, c: 0.06, l: 0.18, h: 0.02, green: true },
      { o: 0.06, c: 0.1, l: 0.04, h: 0.14, green: false },
      { o: 0.1, c: 0.03, l: 0.14, h: 0.01, green: true },
    ];
    const chart4Candles = [
      { o: 0.8, c: 0.68, l: 0.86, h: 0.62, green: true },
      { o: 0.68, c: 0.58, l: 0.72, h: 0.52, green: true },
      { o: 0.58, c: 0.64, l: 0.54, h: 0.7, green: false },
      { o: 0.64, c: 0.44, l: 0.68, h: 0.38, green: true },
      { o: 0.44, c: 0.35, l: 0.48, h: 0.28, green: true },
      { o: 0.35, c: 0.42, l: 0.3, h: 0.48, green: false },
      { o: 0.42, c: 0.25, l: 0.46, h: 0.18, green: true },
      { o: 0.25, c: 0.16, l: 0.28, h: 0.1, green: true },
      { o: 0.16, c: 0.22, l: 0.12, h: 0.26, green: false },
      { o: 0.22, c: 0.1, l: 0.26, h: 0.06, green: true },
      { o: 0.1, c: 0.04, l: 0.14, h: 0.01, green: true },
    ];

    const renderCandles = (
      candles: typeof chart1Candles,
      W: number,
      H: number,
      padX: number,
      padY: number,
    ) => {
      const chartW = W - padX * 2;
      const chartH = H - padY * 2;
      const step = chartW / candles.length;
      const bodyW = Math.max(step * 0.55, 4);
      return candles.map((c, i) => {
        const cx = padX + i * step + step / 2;
        const color = c.green ? "#26D96B" : "#EF4444";
        const dimColor = c.green ? "#1AAD54" : "#CC2222";
        const openY = padY + c.o * chartH;
        const closeY = padY + c.c * chartH;
        const lowY = padY + c.l * chartH;
        const highY = padY + c.h * chartH;
        const bodyTop = Math.min(openY, closeY);
        const bodyH = Math.max(Math.abs(closeY - openY), 2);
        return (
          <g
            key={`cd-${Math.round(c.o * 100)}-${Math.round(c.c * 100)}-${Math.round(c.h * 100)}`}
          >
            {/* Wick */}
            <line
              x1={cx}
              y1={highY}
              x2={cx}
              y2={lowY}
              stroke={dimColor}
              strokeWidth="1.5"
            />
            {/* Body */}
            <rect
              x={cx - bodyW / 2}
              y={bodyTop}
              width={bodyW}
              height={bodyH}
              fill={color}
              rx="1"
            />
            {/* Gloss shine on body */}
            {c.green && bodyH > 6 && (
              <rect
                x={cx - bodyW / 2 + 1}
                y={bodyTop + 1}
                width={bodyW * 0.35}
                height={Math.min(bodyH - 2, 8)}
                fill="white"
                opacity="0.18"
                rx="1"
              />
            )}
          </g>
        );
      });
    };

    const renderLineOverlay = (
      candles: typeof chart1Candles,
      W: number,
      H: number,
      glowId: string,
      padX: number,
      padY: number,
    ) => {
      const chartW = W - padX * 2;
      const chartH = H - padY * 2;
      const step = chartW / candles.length;
      const pts = candles
        .map((c, i) => {
          const cx = padX + i * step + step / 2;
          const cy = padY + c.c * chartH;
          return `${cx},${cy}`;
        })
        .join(" ");
      return (
        <polyline
          points={pts}
          fill="none"
          stroke="#00FF88"
          strokeWidth="2"
          strokeLinejoin="round"
          filter={`url(#${glowId})`}
          opacity="0.85"
        />
      );
    };

    // Chart panel dimensions — 4 corner charts, each 260x180
    const C1 = { x: 50, y: 40, w: 260, h: 180 }; // top-left
    const C2 = { x: 870, y: 40, w: 260, h: 180 }; // top-right
    const C3 = { x: 50, y: 560, w: 260, h: 180 }; // bottom-left
    const C4 = { x: 870, y: 560, w: 260, h: 180 }; // bottom-right

    // Pill geometry — 240x100 centered at (600,390), rotated -30°
    const PX = 480; // x of pill rect (600 - 240/2)
    const PY = 340; // y of pill rect (390 - 100/2)
    const PW = 240;
    const PH = 100;
    const PR = 50; // border-radius = PH/2
    const PCX = 600; // pivot x (center)
    const PCY = 390; // pivot y (center)

    return (
      <svg
        role="img"
        aria-label="pump.fun world background"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* ── BACKGROUND — premium dark terminal aesthetic ── */}
          <radialGradient id="pfBgCenter" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#0D1F12" />
            <stop offset="55%" stopColor="#090F0A" />
            <stop offset="100%" stopColor="#050505" />
          </radialGradient>

          {/* Atmospheric glow spots */}
          <radialGradient id="pfGlow1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0A5C20" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#0A5C20" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="pfGlow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0A3D2A" stopOpacity="0.13" />
            <stop offset="100%" stopColor="#0A3D2A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="pfGlow3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2A2A2A" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#2A2A2A" stopOpacity="0" />
          </radialGradient>

          {/* Pill green half — local coords, gradient along pill x axis */}
          <linearGradient id="pfPillGreen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#BAEFD4" />
            <stop offset="45%" stopColor="#7CC8A0" />
            <stop offset="100%" stopColor="#4D9E72" />
          </linearGradient>

          {/* Pill white half */}
          <linearGradient id="pfPillWhite" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#F2F2F2" />
            <stop offset="100%" stopColor="#E0E0E0" />
          </linearGradient>

          {/* Pill top-edge highlight (cylindrical sheen) */}
          <linearGradient id="pfPillSheen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.12" />
          </linearGradient>

          {/* Pill drop shadow */}
          <filter
            id="pfPillShadow"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feDropShadow
              dx="0"
              dy="10"
              stdDeviation="12"
              floodColor="#000000"
              floodOpacity="0.65"
            />
          </filter>

          {/* Pill ambient glow */}
          <filter id="pfPillGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="14" result="blur" />
            <feFlood floodColor="#7CC8A0" floodOpacity="0.25" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Line chart glow */}
          <filter id="pfLineGlow1" x="-5%" y="-40%" width="110%" height="180%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="pfLineGlow2" x="-5%" y="-40%" width="110%" height="180%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="pfLineGlow3" x="-5%" y="-40%" width="110%" height="180%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="pfLineGlow4" x="-5%" y="-40%" width="110%" height="180%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Chart panel — darker to match premium bg */}
          <linearGradient id="pfChartBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0D1A0F" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#060C07" stopOpacity="0.90" />
          </linearGradient>

          {/* Vignette */}
          <radialGradient id="pfVignette" cx="50%" cy="50%" r="72%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.60" />
          </radialGradient>

          {/* ── PILL clipPaths — local-coordinate approach ── */}
          {/* Left half: x from PX to PCX (green) */}
          <clipPath id="pfClipLeft">
            <rect x={PX} y={PY - PH} width={PCX - PX} height={PH * 3} />
          </clipPath>
          {/* Right half: x from PCX to PX+PW (white) */}
          <clipPath id="pfClipRight">
            <rect x={PCX} y={PY - PH} width={PW - (PCX - PX)} height={PH * 3} />
          </clipPath>
          {/* Pill outline clip for sheen overlay */}
          <clipPath id="pfClipPill">
            <rect x={PX} y={PY} width={PW} height={PH} rx={PR} />
          </clipPath>
        </defs>

        {/* ── BACKGROUND BASE ── */}
        <rect width="1200" height="800" fill="#080E09" />
        <rect width="1200" height="800" fill="url(#pfBgCenter)" />

        {/* Atmospheric glow spots */}
        <ellipse cx="300" cy="250" rx="200" ry="200" fill="url(#pfGlow1)" />
        <ellipse cx="900" cy="700" rx="180" ry="180" fill="url(#pfGlow2)" />
        <ellipse cx="1100" cy="150" rx="150" ry="150" fill="url(#pfGlow3)" />

        {/* Fine circuit-board grid — dark green, very subtle */}
        <g stroke="#152A18" strokeWidth="0.5" opacity="0.20">
          {[80, 160, 240, 320, 400, 480, 560, 640, 720].map((y) => (
            <line key={`gh${y}`} x1="0" y1={y} x2="1200" y2={y} />
          ))}
          {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100].map(
            (x) => (
              <line key={`gv${x}`} x1={x} y1="0" x2={x} y2="800" />
            ),
          )}
        </g>

        {/* Horizontal scan-lines — very subtle depth texture */}
        <g stroke="#FFFFFF" strokeWidth="0.8" opacity="0.03">
          {[
            20, 60, 100, 140, 180, 220, 260, 300, 340, 380, 420, 460, 500, 540,
            580, 620, 660, 700, 740, 780,
          ].map((y) => (
            <line key={`sl${y}`} x1="0" y1={y} x2="1200" y2={y} />
          ))}
        </g>

        {/* ── CHART 1 — Top Left ── */}
        <g transform={`translate(${C1.x}, ${C1.y})`}>
          <rect
            x="0"
            y="0"
            width={C1.w}
            height={C1.h}
            rx="5"
            fill="url(#pfChartBg)"
            stroke="#1A3A20"
            strokeWidth="0.8"
            strokeOpacity="0.5"
          />
          <g stroke="#1A3A20" strokeWidth="0.5" opacity="0.4">
            {[0.25, 0.5, 0.75].map((f) => (
              <line
                key={f}
                x1="10"
                y1={10 + f * (C1.h - 20)}
                x2={C1.w - 8}
                y2={10 + f * (C1.h - 20)}
              />
            ))}
          </g>
          {renderCandles(chart1Candles, C1.w, C1.h, 10, 10)}
          {renderLineOverlay(chart1Candles, C1.w, C1.h, "pfLineGlow1", 10, 10)}
          <rect
            x="0"
            y="0"
            width={C1.w}
            height="2"
            rx="1"
            fill="#26D96B"
            opacity="0.55"
          />
        </g>

        {/* ── CHART 2 — Top Right ── */}
        <g transform={`translate(${C2.x}, ${C2.y})`}>
          <rect
            x="0"
            y="0"
            width={C2.w}
            height={C2.h}
            rx="5"
            fill="url(#pfChartBg)"
            stroke="#1A3A20"
            strokeWidth="0.8"
            strokeOpacity="0.5"
          />
          <g stroke="#1A3A20" strokeWidth="0.5" opacity="0.4">
            {[0.25, 0.5, 0.75].map((f) => (
              <line
                key={f}
                x1="10"
                y1={10 + f * (C2.h - 20)}
                x2={C2.w - 8}
                y2={10 + f * (C2.h - 20)}
              />
            ))}
          </g>
          {renderCandles(chart2Candles, C2.w, C2.h, 10, 10)}
          {renderLineOverlay(chart2Candles, C2.w, C2.h, "pfLineGlow2", 10, 10)}
          <rect
            x="0"
            y="0"
            width={C2.w}
            height="2"
            rx="1"
            fill="#26D96B"
            opacity="0.55"
          />
        </g>

        {/* ── CHART 3 — Bottom Left ── */}
        <g transform={`translate(${C3.x}, ${C3.y})`}>
          <rect
            x="0"
            y="0"
            width={C3.w}
            height={C3.h}
            rx="5"
            fill="url(#pfChartBg)"
            stroke="#1A3A20"
            strokeWidth="0.8"
            strokeOpacity="0.5"
          />
          <g stroke="#1A3A20" strokeWidth="0.5" opacity="0.4">
            {[0.25, 0.5, 0.75].map((f) => (
              <line
                key={f}
                x1="10"
                y1={10 + f * (C3.h - 20)}
                x2={C3.w - 8}
                y2={10 + f * (C3.h - 20)}
              />
            ))}
          </g>
          {renderCandles(chart3Candles, C3.w, C3.h, 10, 10)}
          {renderLineOverlay(chart3Candles, C3.w, C3.h, "pfLineGlow3", 10, 10)}
          <rect
            x="0"
            y="0"
            width={C3.w}
            height="2"
            rx="1"
            fill="#26D96B"
            opacity="0.55"
          />
        </g>

        {/* ── CHART 4 — Bottom Right ── */}
        <g transform={`translate(${C4.x}, ${C4.y})`}>
          <rect
            x="0"
            y="0"
            width={C4.w}
            height={C4.h}
            rx="5"
            fill="url(#pfChartBg)"
            stroke="#1A3A20"
            strokeWidth="0.8"
            strokeOpacity="0.5"
          />
          <g stroke="#1A3A20" strokeWidth="0.5" opacity="0.4">
            {[0.25, 0.5, 0.75].map((f) => (
              <line
                key={f}
                x1="10"
                y1={10 + f * (C4.h - 20)}
                x2={C4.w - 8}
                y2={10 + f * (C4.h - 20)}
              />
            ))}
          </g>
          {renderCandles(chart4Candles, C4.w, C4.h, 10, 10)}
          {renderLineOverlay(chart4Candles, C4.w, C4.h, "pfLineGlow4", 10, 10)}
          <rect
            x="0"
            y="0"
            width={C4.w}
            height="2"
            rx="1"
            fill="#26D96B"
            opacity="0.55"
          />
        </g>

        {/* ── PILL / CAPSULE — all drawn inside rotate group (local coords) ── */}

        {/* 1. Ambient glow behind pill */}
        <g filter="url(#pfPillGlow)">
          <rect
            x={PX}
            y={PY}
            width={PW}
            height={PH}
            rx={PR}
            fill="#7CC8A0"
            opacity="0.35"
            transform={`rotate(-30 ${PCX} ${PCY})`}
          />
        </g>

        {/* 2. Drop shadow */}
        <g filter="url(#pfPillShadow)">
          <rect
            x={PX}
            y={PY}
            width={PW}
            height={PH}
            rx={PR}
            fill="#1A2E24"
            transform={`rotate(-30 ${PCX} ${PCY})`}
          />
        </g>

        {/* 3–9. All pill internals in one rotate group — local coordinate space */}
        <g transform={`rotate(-30 ${PCX} ${PCY})`}>
          {/* 3. Green left half */}
          <rect
            x={PX}
            y={PY}
            width={PW}
            height={PH}
            rx={PR}
            fill="url(#pfPillGreen)"
            clipPath="url(#pfClipLeft)"
          />

          {/* 4. White right half */}
          <rect
            x={PX}
            y={PY}
            width={PW}
            height={PH}
            rx={PR}
            fill="url(#pfPillWhite)"
            clipPath="url(#pfClipRight)"
          />

          {/* 5. Cylindrical sheen overlay — top edge highlight */}
          <rect
            x={PX}
            y={PY}
            width={PW}
            height={PH}
            rx={PR}
            fill="url(#pfPillSheen)"
            clipPath="url(#pfClipPill)"
          />

          {/* 6. Capsule seam — intentional gray divider line at center */}
          <rect
            x={PCX - 1.5}
            y={PY}
            width={3}
            height={PH}
            fill="#A0A0A0"
            opacity={0.7}
          />

          {/* 7. Gloss highlights on green half — small white ellipse dashes */}
          <ellipse
            cx={PCX - 55}
            cy={PY + 22}
            rx="32"
            ry="7"
            fill="white"
            opacity="0.30"
            clipPath="url(#pfClipLeft)"
          />
          <ellipse
            cx={PCX - 68}
            cy={PY + 36}
            rx="16"
            ry="4"
            fill="white"
            opacity="0.20"
            clipPath="url(#pfClipLeft)"
          />
          <ellipse
            cx={PCX - 78}
            cy={PY + 50}
            rx="8"
            ry="2.5"
            fill="white"
            opacity="0.14"
            clipPath="url(#pfClipLeft)"
          />

          {/* 8. Subtle gloss reflection on white half (right side) */}
          <ellipse
            cx={PCX + 50}
            cy={PY + 20}
            rx="26"
            ry="6"
            fill="white"
            opacity="0.14"
            clipPath="url(#pfClipRight)"
          />

          {/* 9. Outer border — dark charcoal stroke */}
          <rect
            x={PX}
            y={PY}
            width={PW}
            height={PH}
            rx={PR}
            fill="none"
            stroke="#2D4A3E"
            strokeWidth="5.5"
          />
        </g>

        {/* ── VIGNETTE ── */}
        <rect width="1200" height="800" fill="url(#pfVignette)" />
      </svg>
    );
  };

  const renderWorld = () => {
    switch (world) {
      case "volcano":
        return renderVolcanoWorld();
      case "space":
        return renderSpaceWorld();
      case "desert":
        return renderDesertWorld();
      case "jungle":
        return renderJungleWorld();
      case "snowy":
        return renderSnowyWorld();
      case "sky":
        return renderSkyWorld();
      case "cyberpunk":
        return renderCyberpunkWorld();
      case "caffeineai":
        return renderCaffeineAIWorld();
      case "zombietown":
        return renderZombietownWorld();
      case "halloween":
        return renderHalloweenWorld();
      case "tokyo":
        return renderTokyoWorld();
      case "windows":
        return renderWindowsWorld();
      case "bitcoin":
        return renderBitcoinWorld();
      case "matrix":
        return renderMatrixWorld();
      case "ocean":
        return renderOceanWorld();
      case "minecraft":
        return renderMinecraftWorld();
      case "pumpfun":
        return renderPumpFunWorld();
      default:
        return renderOriginalWorld();
    }
  };

  return <div className="absolute inset-0">{renderWorld()}</div>;
};

export default BackgroundRenderer;
