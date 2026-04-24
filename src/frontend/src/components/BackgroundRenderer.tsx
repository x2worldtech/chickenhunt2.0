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
      default:
        return renderOriginalWorld();
    }
  };

  return <div className="absolute inset-0">{renderWorld()}</div>;
};

export default BackgroundRenderer;
