import React, { useId } from "react";
export const ink = "#302d29";
export const paper = "#f5f2e8";
export const coral = "#cf7560";
export type ClipKind = "city" | "ramen" | "dog" | "dance";

export const Star: React.FC<{
  x: number;
  y: number;
  r?: number;
  color?: string;
}> = ({ x, y, r = 6, color = "#fffbe8" }) => (
  <path
    d={`M${x} ${y - r} Q${x + 1} ${y - 1} ${x + r} ${y} Q${x + 1} ${y + 1} ${x} ${y + r} Q${x - 1} ${y + 1} ${x - r} ${y} Q${x - 1} ${y - 1} ${x} ${y - r}`}
    fill={color}
    stroke={ink}
    strokeWidth="1.3"
  />
);

export const Heart: React.FC<{ x: number; y: number; size?: number }> = ({
  x,
  y,
  size = 1,
}) => (
  <path
    transform={`translate(${x} ${y}) scale(${size})`}
    d="M0 6 C-18 -6 -12 -17 -5 -16 C0 -16 1 -12 1 -12 C8 -23 22 -15 13 -3 Z"
    fill="#e893ad"
    stroke={ink}
    strokeWidth="2"
  />
);

export const Mascot: React.FC<{
  x: number;
  y: number;
  scale?: number;
  time?: number;
  mood?: "happy" | "plain" | "angry" | "star";
  glasses?: boolean;
  dance?: boolean;
}> = ({
  x,
  y,
  scale = 1,
  time = 0,
  mood = "happy",
  glasses = false,
  dance = false,
}) => {
  const bounce = dance ? Math.sin(time * 8) * 4 : 0;
  const tilt = dance ? Math.sin(time * 5) * 5 : 0;
  return (
    <g
      transform={`translate(${x} ${y + bounce}) scale(${scale}) rotate(${tilt} 48 38)`}
      stroke={ink}
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M14 57 L15 88 L24 89 L25 58 M31 61 L31 90 L40 91 L39 61 M68 60 L67 89 L76 90 L78 59 M82 60 L83 86 L91 87 L92 61"
        fill={coral}
      />
      {dance ? (
        <>
          <path
            d="M4 42 Q-11 31 -16 10 M97 40 Q112 30 116 9"
            fill="none"
            stroke={ink}
            strokeWidth="10"
          />
          <path
            d="M4 42 Q-11 31 -16 10 M97 40 Q112 30 116 9"
            fill="none"
            stroke={coral}
            strokeWidth="6"
          />
          <circle cx="-16" cy="8" r="7" fill={coral} />
          <circle cx="116" cy="7" r="7" fill={coral} />
        </>
      ) : (
        <path
          d="M1 31 L-10 31 L-10 43 L4 44 M95 31 L107 31 L107 43 L96 43"
          fill={coral}
        />
      )}
      <path d="M1 1 Q49 -2 99 0 L100 68 Q49 71 0 69 Z" fill={coral} />
      <path d="M7 6 L32 5" stroke="#e6a28c" strokeWidth="3" />
      <path d="M4 66 L97 67" stroke="#b46152" strokeWidth="1" />
      {Array.from({ length: 14 }, (_, i) => (
        <path
          key={i}
          d={`M${6 + i * 6} 59 l10 -17`}
          stroke="#b96352"
          opacity=".2"
          strokeWidth=".9"
        />
      ))}
      {mood === "star" ? (
        <>
          <Star x={34} y={29} r={10} color="#ffe07c" />
          <Star x={66} y={29} r={10} color="#ffe07c" />
        </>
      ) : mood === "happy" ? (
        <>
          <path
            d="M31 29 Q36 17 42 28 M63 28 Q69 17 75 28"
            fill="none"
            strokeWidth="3.5"
          />
          <ellipse cx="24" cy="39" rx="7" ry="4" fill="#e99092" stroke="none" />
          <ellipse cx="79" cy="39" rx="7" ry="4" fill="#e99092" stroke="none" />
        </>
      ) : mood === "angry" ? (
        <path d="M30 22 L40 26 M64 26 L75 22" strokeWidth="5" />
      ) : (
        <>
          <ellipse cx="35" cy="26" rx="3.2" ry="6" fill={ink} />
          <ellipse cx="68" cy="26" rx="3.2" ry="6" fill={ink} />
          <circle cx="34.5" cy="23" r="1.2" fill="white" stroke="none" />
          <circle cx="67.5" cy="23" r="1.2" fill="white" stroke="none" />
        </>
      )}
      {glasses && (
        <g transform="translate(19 -5) rotate(-4)">
          <path
            d="M0 0 L63 0 L57 12 L37 12 L31 6 L26 12 L7 12 Z"
            fill="#242320"
          />
          <path
            d="M13 2 L8 7 M19 2 L13 8 M47 2 L41 8"
            stroke="white"
            strokeWidth="1.5"
          />
        </g>
      )}
    </g>
  );
};

const City: React.FC<{ time: number }> = ({ time }) => {
  const id = useId().replace(/[^A-Za-z0-9_-]/g, "");
  return (
    <>
      <defs>
        <linearGradient id={id} x2="0" y2="1">
          <stop stopColor="#34355e" />
          <stop offset="1" stopColor="#555188" />
        </linearGradient>
      </defs>
      <rect width="200" height="300" fill={`url(#${id})`} />
      {Array.from({ length: 26 }, (_, i) => (
        <circle
          key={i}
          cx={(i * 61 + 13) % 200}
          cy={(i * 37) % 190}
          r={i % 4 === 0 ? 1.5 : 0.7}
          fill="#fbf5da"
          opacity={0.35 + 0.6 * Math.abs(Math.sin(time + i))}
        />
      ))}
      <circle cx="144" cy="67" r="29" fill="#f8d779" opacity=".1" />
      <path
        d="M149 39 C124 48 132 77 163 72 C145 94 115 65 149 39"
        fill="#f3d064"
        stroke={ink}
        strokeWidth="2"
      />
      {Array.from({ length: 13 }, (_, i) => {
        const h = 70 + ((i * 31) % 98);
        return (
          <g key={i}>
            <rect
              x={i * 18 - 10}
              y={300 - h}
              width={21}
              height={h}
              fill={["#373c66", "#464774", "#30384e"][i % 3]}
              stroke={ink}
              strokeWidth="1.5"
            />
            {Array.from({ length: 18 }, (_, j) => (
              <rect
                key={j}
                x={i * 18 - 7 + (j % 3) * 6}
                y={307 - h + Math.floor(j / 3) * 15}
                width="3"
                height="6"
                fill={(i + j) % 3 ? "#eed575" : "#5c6482"}
                opacity={0.75}
              />
            ))}
          </g>
        );
      })}
      {time % 4 > 2 && (
        <path
          d={`M${150 - ((time % 4) - 2) * 40} 36 l-20 18`}
          stroke="#e9e8f3"
          strokeWidth="1"
        />
      )}
      <Star x={46} y={114} r={4} />
      <Star x={116} y={160} r={5} />
    </>
  );
};

const Ramen: React.FC<{ time: number }> = ({ time }) => (
  <>
    <rect width="200" height="300" fill="#f6df9b" />
    <rect
      y="221"
      width="200"
      height="79"
      fill="#e6b575"
      stroke={ink}
      strokeWidth="2"
    />
    {[240, 265, 283].map((y) => (
      <path key={y} d={`M0 ${y} H200`} stroke="#cf9e66" opacity=".5" />
    ))}
    <rect width="200" height="50" fill="#434d8c" />
    {[0, 45, 98, 154, 200].map((x) => (
      <path key={x} d={`M${x} 0 v50`} stroke="#ddc472" strokeWidth="2" />
    ))}
    <text x="100" y="37" textAnchor="middle" fill="white" fontSize="29">
      • 拉 面 •
    </text>
    <ellipse cx="102" cy="247" rx="61" ry="5" fill="#b47e4f" opacity=".3" />
    <path
      d="M22 185 Q28 245 99 248 Q171 246 181 185 Z"
      fill="#fff9e9"
      stroke={ink}
      strokeWidth="2.6"
    />
    <path
      d="M30 213 Q100 247 173 213 L176 199 Q103 229 25 199 Z"
      fill="#fff9e9"
      stroke="#b94e62"
      strokeWidth="2"
    />
    {Array.from({ length: 11 }, (_, i) => (
      <path
        key={i}
        d={`M${33 + i * 12} ${210 + Math.sin((i / 10) * Math.PI) * 13} v8 h8 v-5 h-5`}
        stroke="#c45464"
        strokeWidth="2"
        fill="none"
      />
    ))}
    <ellipse
      cx="102"
      cy="184"
      rx="79"
      ry="28"
      fill="#efe7ca"
      stroke={ink}
      strokeWidth="2.5"
    />
    <ellipse
      cx="102"
      cy="184"
      rx="70"
      ry="21"
      fill="#735039"
      stroke={ink}
      strokeWidth="1.5"
    />
    {Array.from({ length: 9 }, (_, i) => (
      <path
        key={i}
        d={`M${45 + i * 13} 179 q-18 18 9 17 q15 -4 0 -9`}
        fill="none"
        stroke="#eccb76"
        strokeWidth="2"
      />
    ))}
    <ellipse
      cx="65"
      cy="177"
      rx="20"
      ry="11"
      fill="#df959a"
      stroke={ink}
      strokeWidth="2"
    />
    <ellipse cx="65" cy="177" rx="13" ry="7" fill="#ac5060" stroke="#efbbc2" />
    <ellipse
      cx="58"
      cy="195"
      rx="14"
      ry="10"
      fill="#ffffe9"
      stroke={ink}
      strokeWidth="1.5"
    />
    <ellipse cx="59" cy="195" rx="7" ry="6" fill="#efb646" />
    <path
      d="M121 181 l-3 -37 l27 3 l-4 37"
      fill="#365b40"
      stroke={ink}
      strokeWidth="2"
    />
    <path
      d="M124 149 l17 2 M124 158 l17 2 M124 167 l17 2 M128 145 v36 M136 146 v36"
      stroke="#788466"
      opacity=".6"
    />
    <ellipse
      cx="144"
      cy="191"
      rx="15"
      ry="10"
      fill="#fff2e7"
      stroke={ink}
      strokeWidth="1.5"
    />
    <path
      d="M145 194 c-15 0 -9 -10 0 -8 c9 4 -4 8 -6 3"
      fill="none"
      stroke="#d9759b"
      strokeWidth="2"
    />
    <g transform={`translate(0 ${Math.sin(time * 3) * 3})`}>
      {[0, 3, 6, 9, 12].map((n) => (
        <path
          key={n}
          d={`M${104 + n / 5} 114 Q${100 + n} 162 ${85 + n * 2} 191`}
          fill="none"
          stroke="#fff2bf"
          strokeWidth="2"
        />
      ))}
      <path
        d="M107 111 L204 30 L206 35 L109 115 Z M111 116 L208 43 L209 48 L113 120 Z"
        fill="#caa874"
        stroke={ink}
        strokeWidth="1.3"
      />
    </g>
    {[72, 99].map((x, i) => (
      <path
        key={x}
        d={`M${x} 145 q-10 -12 0 -22 q10 -11 0 -20`}
        transform={`translate(0 ${-Math.sin(time * 2 + i) * 5})`}
        stroke="#fffbea"
        strokeWidth="3"
        opacity=".7"
        fill="none"
      />
    ))}
  </>
);

const Dog: React.FC<{ time: number }> = ({ time }) => (
  <>
    <rect width="200" height="300" fill="#b9e4d7" />
    {Array.from({ length: 72 }, (_, i) => (
      <circle
        key={i}
        cx={(i % 8) * 28 + 8}
        cy={Math.floor(i / 8) * 38 + 10}
        r="2.5"
        fill="#e4f4e9"
        opacity=".65"
      />
    ))}
    <g
      transform={`rotate(${Math.sin(time * 3) * 4} 100 195)`}
      stroke={ink}
      strokeWidth="2"
    >
      <path d="M129 209 Q191 172 181 220 Q177 241 146 234" fill="#d7904e" />
      <path
        d="M26 300 L28 245 Q31 203 98 201 Q164 204 174 247 L174 300"
        fill="#d88b44"
      />
      <ellipse cx="102" cy="251" rx="34" ry="44" fill="#fff9ef" stroke="none" />
      <path
        d="M43 135 L48 77 L80 108 M127 107 L169 85 L166 145"
        fill="#d98e4e"
      />
      <path
        d="M50 116 L53 90 L72 112 M139 115 L162 97 L161 125"
        fill="#eba4a7"
        stroke="none"
      />
      <ellipse cx="103" cy="153" rx="65" ry="54" fill="#d88f4b" />
      <path
        d="M40 165 Q67 137 99 166 Q130 140 166 165 Q162 206 104 208 Q48 205 40 165"
        fill="#fffaf2"
        stroke="none"
      />
      <ellipse cx="78" cy="131" rx="6" ry="4" fill="white" stroke="none" />
      <ellipse cx="126" cy="131" rx="6" ry="4" fill="white" stroke="none" />
      <path d="M74 151 Q79 141 83 152 M123 151 Q128 141 132 152" fill="none" />
      <path d="M94 168 Q102 163 110 168 L103 174 Z" fill={ink} />
      <path d="M102 173 v4 q-7 7 -12 0 M102 177 q7 7 13 -1" fill="none" />
      <path d="M102 184 q-3 13 6 5" fill="#e492a6" stroke="none" />
      <ellipse cx="62" cy="170" rx="8" ry="4" fill="#eda0b0" stroke="none" />
      <ellipse cx="143" cy="170" rx="8" ry="4" fill="#eda0b0" stroke="none" />
    </g>
    <Heart x={37} y={104 + Math.sin(time * 2) * 4} size={0.7} />
    <Heart x={160} y={65 + Math.sin(time * 2 + 2) * 5} size={0.9} />
  </>
);

const Dance: React.FC<{ time: number; vivid?: boolean; sparkle?: boolean }> = ({
  time,
  vivid,
  sparkle,
}) => {
  const id = useId().replace(/[^A-Za-z0-9_-]/g, "");
  const colors = [
    "#343b74",
    "#5364a2",
    "#8277b7",
    "#467e9a",
    "#d4aa58",
    "#b47ba9",
  ];
  return (
    <>
      <defs>
        <linearGradient id={id} x2="0" y2="1">
          <stop stopColor={vivid ? "#6e4be5" : "#5b5296"} />
          <stop offset="1" stopColor={vivid ? "#ed4adc" : "#ba7fac"} />
        </linearGradient>
      </defs>
      <rect width="200" height="206" fill={`url(#${id})`} />
      <rect y="206" width="200" height="94" fill="#343b64" />
      {Array.from({ length: 8 }, (_, row) => {
        const y1 = 208 + Math.pow(row / 8, 1.8) * 92;
        const y2 = 208 + Math.pow((row + 1) / 8, 1.8) * 92;
        return Array.from({ length: 10 }, (_, col) => {
          const spread1 = (y1 - 200) * 1.5;
          const spread2 = (y2 - 200) * 1.5;
          return (
            <path
              key={`${row}-${col}`}
              d={`M${100 + ((col - 5) * spread1) / 5} ${y1} L${100 + ((col - 4) * spread1) / 5} ${y1} L${100 + ((col - 4) * spread2) / 5} ${y2} L${100 + ((col - 5) * spread2) / 5} ${y2} Z`}
              fill={
                colors[(row + col * 3 + Math.floor(time * 2)) % colors.length]
              }
              opacity=".7"
            />
          );
        });
      })}
      <g opacity=".09" transform={`rotate(${Math.sin(time) * 9} 100 43)`}>
        <path
          d="M100 43 L-30 210 L26 230 Z M100 43 L95 260 L165 265 Z M100 43 L240 180 L186 201 Z"
          fill="#ffecce"
        />
      </g>
      <path d="M100 0 v27" stroke={ink} strokeWidth="2" />
      <circle
        cx="100"
        cy="45"
        r="19"
        fill="#dad6ed"
        stroke={ink}
        strokeWidth="2.5"
      />
      {[0, 1, 2, 3].map((r) => (
        <g key={r}>
          {[0, 1, 2, 3].map((c) => (
            <rect
              key={c}
              x={86 + c * 7}
              y={31 + r * 7}
              width="7"
              height="7"
              fill={
                ["#eeeaf5", "#b6acd7", "#827aba", "#f2dd8d"][
                  (r + c + Math.floor(time * 3)) % 4
                ]
              }
              opacity=".85"
            />
          ))}
        </g>
      ))}
      <circle
        cx="100"
        cy="45"
        r="19"
        fill="none"
        stroke={ink}
        strokeWidth="2"
      />
      <Mascot
        x={68}
        y={168}
        scale={0.66 + (sparkle ? Math.sin(time * 6) * 0.03 : 0)}
        time={time}
        dance
        mood="happy"
      />
      {Array.from({ length: sparkle ? 16 : 5 }, (_, i) => (
        <Star
          key={i}
          x={12 + ((i * 53) % 176)}
          y={20 + ((i * 71) % 270)}
          r={2 + Math.abs(Math.sin(time * 3 + i)) * (sparkle ? 5 : 2)}
          color={i % 3 ? "#fffaf4" : "#f5d76b"}
        />
      ))}
      {sparkle &&
        Array.from({ length: 6 }, (_, i) => (
          <circle
            key={i}
            cx={(i * 43 + Math.sin(time + i) * 9 + 200) % 200}
            cy={(i * 67 + time * 20) % 300}
            r="7"
            fill={colors[i]}
            opacity=".18"
          />
        ))}
    </>
  );
};

export const ClipArt: React.FC<{
  kind: ClipKind;
  time?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  vivid?: boolean;
  sparkle?: boolean;
}> = ({
  kind,
  time = 0,
  x = 0,
  y = 0,
  width = 200,
  height = 300,
  vivid = false,
  sparkle = false,
}) => (
  <svg
    x={x}
    y={y}
    width={width}
    height={height}
    viewBox="0 0 200 300"
    preserveAspectRatio="xMidYMid slice"
    overflow="hidden"
  >
    {kind === "city" ? (
      <City time={time} />
    ) : kind === "ramen" ? (
      <Ramen time={time} />
    ) : kind === "dog" ? (
      <Dog time={time} />
    ) : (
      <Dance time={time} vivid={vivid} sparkle={sparkle} />
    )}
  </svg>
);
