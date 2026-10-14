import React, { useId } from "react";
import { interpolate } from "remotion";
import { ClipArt, ClipKind, coral, Heart, ink, Mascot, paper } from "./Art";
export const mix = (t: number, input: number[], output: number[]) =>
  interpolate(t, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
export const Box: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  fill?: string;
  r?: number;
  stroke?: string;
  sw?: number;
}> = ({ x, y, w, h, fill = paper, r = 9, stroke = ink, sw = 2.4 }) => (
  <g>
    <rect
      x={x + 1.4}
      y={y + 1.5}
      width={w}
      height={h}
      rx={r}
      fill="none"
      stroke={stroke}
      strokeWidth={0.7}
      opacity=".35"
    />
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      fill={fill}
      stroke={stroke}
      strokeWidth={sw}
    />
  </g>
);
export const Label: React.FC<{
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
  bold?: boolean;
}> = ({
  x,
  y,
  children,
  size = 18,
  fill = ink,
  anchor = "start",
  bold = false,
}) => (
  <text
    x={x}
    y={y}
    fontSize={size}
    fill={fill}
    textAnchor={anchor}
    fontWeight={bold ? 700 : 400}
  >
    {children}
  </text>
);
export const Comic: React.FC<{
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  color?: string;
  rotate?: number;
}> = ({ x, y, children, size = 30, color = "#f2cd62", rotate = 0 }) => (
  <text
    x={x}
    y={y}
    transform={`rotate(${rotate} ${x} ${y})`}
    fontFamily="HandLatin, HandChinese"
    fontSize={size}
    fontWeight="bold"
    fill={color}
    stroke={ink}
    strokeWidth={size / 6}
    paintOrder="stroke"
    strokeLinejoin="round"
  >
    {children}
  </text>
);
const names = ["夜景.mp4", "拉面.mp4", "柴犬.mov", "小克蹦迪.mp4"];
const kinds: ClipKind[] = ["city", "ramen", "dog", "dance"];
const titles = ["素材", "转场", "文字"];
const transitionColors = [
  "#dcd7ec",
  "#e5eddf",
  "#f4d9e3",
  "#d9edf1",
  "#f8ecc5",
  "#e8e4d7",
];
const transitionSymbols = ["◎", "▤", "▣", "⊕", "❯", "▧"];

const Library: React.FC<{ t: number }> = ({ t }) => {
  const tab = t < 7.8 ? 0 : t < 11.7 ? 1 : 2;
  return (
    <g>
      <Box x={26} y={66} w={254} h={314} />
      {titles.map((text, i) => (
        <g key={text}>
          <Box
            x={39 + i * 79}
            y={76}
            w={73}
            h={25}
            r={5}
            fill={i === tab ? "#f2cc62" : "#f8f6ed"}
            sw={1.6}
          />
          <Label x={76 + i * 79} y={94} size={17} anchor="middle">
            {text}
          </Label>
        </g>
      ))}
      {tab === 0 && (
        <>
          {kinds.map((kind, i) => (
            <g key={kind}>
              <Box
                x={42 + (i % 2) * 117}
                y={112 + Math.floor(i / 2) * 90}
                w={105}
                h={63}
                r={5}
                fill="#c9b98a"
              />
              <ClipArt
                kind={kind}
                x={44 + (i % 2) * 117}
                y={114 + Math.floor(i / 2) * 90}
                width={101}
                height={59}
              />
              <Label
                x={94 + (i % 2) * 117}
                y={190 + Math.floor(i / 2) * 90}
                anchor="middle"
                size={14}
              >
                {names[i]}
              </Label>
              <Label
                x={138 + (i % 2) * 117}
                y={169 + Math.floor(i / 2) * 90}
                anchor="end"
                fill="white"
                size={11}
              >
                {[2.4, 4.6, 2.4, 2.8][i]}s
              </Label>
            </g>
          ))}
          {[0, 1].map((i) => (
            <g key={i}>
              <rect
                x={43 + i * 117}
                y={292}
                width={102}
                height={61}
                rx="6"
                stroke="#a9a79e"
                strokeWidth="1.4"
                strokeDasharray="4 4"
                fill="none"
              />
              <Label
                x={94 + i * 117}
                y={332}
                size={35}
                fill="#b6b2a7"
                anchor="middle"
              >
                +
              </Label>
              <Label
                x={94 + i * 117}
                y={366}
                size={13}
                fill="#b1ada1"
                anchor="middle"
              >
                导入素材
              </Label>
            </g>
          ))}
        </>
      )}
      {tab === 1 &&
        ["旋转", "翻页", "故障", "缩放", "滑动", "溶解"].map((name, i) => (
          <g key={name}>
            <Box
              x={42 + (i % 2) * 117}
              y={112 + Math.floor(i / 2) * 85}
              w={104}
              h={61}
              fill={transitionColors[i]}
              r={7}
            />
            <Label
              x={94 + (i % 2) * 117}
              y={153 + Math.floor(i / 2) * 85}
              size={40}
              fill={i === 0 ? "#6bb6a5" : "#655b82"}
              anchor="middle"
            >
              {transitionSymbols[i]}
            </Label>
            <Label
              x={94 + (i % 2) * 117}
              y={188 + Math.floor(i / 2) * 85}
              anchor="middle"
              size={14}
            >
              {name}
            </Label>
          </g>
        ))}
      {tab === 2 && (
        <>
          <Box x={41} y={113} w={224} h={75} fill="#fff5d5" />
          <Label x={50} y={132} size={11} fill="#999383">
            爆款
          </Label>
          <Comic x={79} y={165} size={30}>
            前方高能
          </Comic>
          <Box x={41} y={200} w={224} h={76} fill="#f8e4ec" />
          <Box
            x={87}
            y={222}
            w={130}
            h={35}
            fill="#fff"
            r={17}
            stroke="#d984a0"
            sw={1.6}
          />
          <Label x={152} y={248} anchor="middle" fill="#ca7798" size={27}>
            好耶～
          </Label>
          <Box x={41} y={289} w={224} h={75} fill="#302a40" />
          <text
            x="153"
            y="338"
            fill="#fff0ff"
            stroke="#d5a2e1"
            strokeWidth="1"
            fontSize="28"
            textAnchor="middle"
          >
            霓虹 NEON
          </text>
        </>
      )}
    </g>
  );
};

const Adjustments: React.FC<{ t: number }> = ({ t }) => {
  const flash = mix(t, [15.6, 16.2], [0, 0.7]);
  const sat = mix(t, [16.3, 17, 17.7, 18], [1, 3, 3, 1.1]);
  const zoom = mix(t, [18.2, 19.2], [0, 0.6]);
  const values = [flash, sat / 3, zoom, 0.5];
  return (
    <g>
      <Box x={1000} y={66} w={254} h={314} />
      <Label x={1017} y={100} size={24}>
        调整 ✧
      </Label>
      <path d="M1016 114 H1238" stroke="#aaa69b" />
      {["闪光", "饱和度", "缩放冲击", "速度"].map((name, i) => {
        const y = 138 + i * 60;
        return (
          <g key={name}>
            <Label x={1018} y={y} size={18}>
              {name}
            </Label>
            <Label
              x={1237}
              y={y}
              anchor="end"
              size={16}
              fill={sat > 2.5 && i === 1 ? "#d44340" : "#8a887f"}
            >
              {i === 3
                ? "1.0×"
                : i === 1
                  ? sat > 2.5
                    ? "爆表!!"
                    : `${Math.round(sat * 100)}%`
                  : `${Math.round(values[i] * 100)}%`}
            </Label>
            <rect
              x="1020"
              y={y + 14}
              width="214"
              height="7"
              rx="3"
              fill="#e4e2d8"
              stroke={ink}
              strokeWidth="1.5"
            />
            <rect
              x="1021"
              y={y + 15}
              width={212 * values[i]}
              height="5"
              rx="2"
              fill={sat > 2.5 && i === 1 ? "#e95857" : "#72bbaa"}
            />
            <circle
              cx={1020 + 214 * values[i]}
              cy={y + 18}
              r="9.5"
              fill="#fbf9ee"
              stroke={ink}
              strokeWidth="1.8"
            />
            <circle
              cx={1020 + 214 * values[i]}
              cy={y + 18}
              r="1.4"
              fill="#929083"
            />
          </g>
        );
      })}
    </g>
  );
};

export const Phone: React.FC<{
  t: number;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  social?: boolean;
}> = ({ t, x = 543, y = 66, w = 196, h = 298, social = false }) => {
  const id = useId().replace(/[^A-Za-z0-9_-]/g, "");
  const kind: ClipKind = social
    ? t < 26.5
      ? "city"
      : t < 27
        ? "ramen"
        : t < 27.5
          ? "dog"
          : "dance"
    : t < 4.1
      ? "city"
      : t < 11.8
        ? "ramen"
        : t < 15.6
          ? "dog"
          : "dance";
  const spin = t > 8.6 && t < 9.4 ? mix(t, [8.6, 9, 9.4], [0, 360, 360]) : 0;
  const flip = t > 10.3 && t < 11.1 ? mix(t, [10.3, 10.7, 11.1], [0, 1, 0]) : 0;
  const glitch = t > 11.1 && t < 11.5;
  const inside = { x: x + 10, y: y + 12, w: w - 20, h: h - 23 };
  return (
    <g>
      <rect
        x={x + 3}
        y={y + 4}
        width={w}
        height={h}
        rx={w * 0.15}
        fill="#b3ab9a"
        opacity=".35"
      />
      <rect
        x={x - 2}
        y={y + h * 0.24}
        width="4"
        height={h * 0.08}
        rx="1"
        fill={ink}
      />
      <rect
        x={x - 2}
        y={y + h * 0.35}
        width="4"
        height={h * 0.08}
        rx="1"
        fill={ink}
      />
      <Box x={x} y={y} w={w} h={h} r={w * 0.14} fill="#272521" sw={3} />
      <rect
        x={x + 4}
        y={y + 4}
        width={w - 8}
        height={h - 8}
        rx={w * 0.13}
        fill="none"
        stroke="#5b5249"
        strokeWidth="1.3"
      />
      <defs>
        <clipPath id={id}>
          <rect
            x={inside.x}
            y={inside.y}
            width={inside.w}
            height={inside.h}
            rx={w * 0.1}
          />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <g transform={`rotate(${spin} ${x + w / 2} ${y + h / 2})`}>
          {t < 1.55 && !social ? (
            <rect
              x={inside.x}
              y={inside.y}
              width={inside.w}
              height={inside.h}
              fill="#24211f"
            />
          ) : (
            <ClipArt
              kind={kind}
              time={t}
              x={inside.x}
              y={inside.y}
              width={inside.w}
              height={inside.h}
              vivid={t > 16.7 && t < 17.8}
              sparkle={t > 15.8}
            />
          )}
        </g>
        {flip > 0 && (
          <path
            d={`M${x + w - 10} ${y + 12} L${x + w - 10 - inside.w * flip} ${y + inside.h * 0.75} L${x + w - 10} ${y + h - 12} Z`}
            fill="#eee9d7"
            stroke={ink}
            strokeWidth="1.3"
          />
        )}
        {glitch &&
          [0.2, 0.45, 0.6].map((r, i) => (
            <rect
              key={r}
              x={inside.x}
              y={y + h * r}
              width={inside.w}
              height={8 + i * 5}
              fill={["#ed77ac", "#87dacd", "#8270c1"][i]}
              opacity=".5"
            />
          ))}
        {t >= 12 && t < 15.6 && !social && (
          <Comic x={x + 14} y={y + h * 0.72} size={22}>
            {t < 14.2 ? "前方高能预颈" : "前方高能预警"}
          </Comic>
        )}
        {social && (
          <>
            <g transform={`translate(${x + w - 48} ${y + 82})`}>
              <circle r="20" fill={coral} stroke="#fff9e6" strokeWidth="3" />
              <circle cx="-6" cy="-1" r="2.5" fill={ink} />
              <circle cx="6" cy="-1" r="2.5" fill={ink} />
              <circle cy="20" r="7" fill="#e88186" />
              <Label x={0} y={24} anchor="middle" fill="white" size={15}>
                +
              </Label>
            </g>
            <Heart x={x + w - 49} y={y + 146} size={1} />
            <Label
              x={x + w - 48}
              y={y + 170}
              anchor="middle"
              fill="white"
              size={15}
            >
              10.2w
            </Label>
            <Box
              x={x + w - 62}
              y={y + 190}
              w={27}
              h={19}
              fill="white"
              r={6}
              sw={1.5}
            />
            <Label x={x + w - 48} y={y + 204} anchor="middle" size={18}>
              •••
            </Label>
            <Label
              x={x + w - 48}
              y={y + 227}
              anchor="middle"
              fill="white"
              size={15}
            >
              2333
            </Label>
            <Label
              x={x + w - 48}
              y={y + 264}
              anchor="middle"
              fill="white"
              size={32}
            >
              ➜
            </Label>
            <Label
              x={x + w - 48}
              y={y + 286}
              anchor="middle"
              fill="white"
              size={16}
            >
              分享
            </Label>
            <Label x={x + 27} y={y + h - 60} fill="white" size={18}>
              @小克 · Opus 5.5
            </Label>
            <Label x={x + 27} y={y + h - 35} fill="white" size={15}>
              #AI剪辑 #卡点 #code2video
            </Label>
            {t >= 28.4 && (
              <Comic x={x + 35} y={y + 180} size={49} rotate={-5}>
                拿捏了!
              </Comic>
            )}
          </>
        )}
      </g>
      <rect
        x={x + w * 0.4}
        y={y + 19}
        width={w * 0.2}
        height={h * 0.033}
        rx="5"
        fill="#252320"
      />
      {!social && (
        <g>
          <Label
            x={x + w / 2}
            y={y + h + 23}
            size={24}
            anchor="middle"
            fill="#79776d"
          >
            ⏮ ⊙ ⏵
          </Label>
        </g>
      )}
    </g>
  );
};

const Timeline: React.FC<{ t: number }> = ({ t }) => {
  const cut = t >= 6.3;
  const compact = t >= 7.3;
  const widths = compact ? [170, 140, 195, 213] : [184, 345, 184, 210];
  const starts = widths.map(
    (_, i) => 100 + widths.slice(0, i).reduce((a, b) => a + b, 0),
  );
  const playX = mix(
    t,
    [1.5, 4, 7, 8.5, 11.5, 15.5, 20, 25],
    [100, 100, 375, 315, 490, 680, 755, 818],
  );
  return (
    <g>
      <Box x={26} y={392} w={1228} h={308} fill="#f8f6ee" />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={79}
          y={449 + i * 55}
          width="1163"
          height={i === 0 ? 38 : 49}
          rx="4"
          fill="#eae7df"
          opacity=".5"
        />
      ))}
      {["T", "▶", "♪"].map((a, i) => (
        <g key={a}>
          <Box
            x={40}
            y={454 + i * 55}
            w={36}
            h={i ? 48 : 31}
            fill={["#fcf1c8", "#d0eadf", "#e3dcef"][i]}
            r={5}
          />
          <Label
            x={58}
            y={476 + i * 55 + (i ? 8 : 0)}
            size={i === 2 ? 29 : 20}
            anchor="middle"
          >
            {a}
          </Label>
        </g>
      ))}
      <path d="M99 436 H1240" stroke="#99968b" strokeWidth="1.2" />
      {Array.from({ length: 57 }, (_, i) => (
        <g key={i}>
          <path
            d={`M${100 + i * 20} 436 v${i % 4 ? -6 : -18}`}
            stroke="#9c998e"
            strokeWidth="1"
          />
          {i % 4 === 0 && (
            <Label
              x={100 + i * 20}
              y={414}
              anchor="middle"
              size={13}
              fill="#858277"
            >
              0:{String(i / 4).padStart(2, "0")}
            </Label>
          )}
        </g>
      ))}
      {kinds.map((kind, i) =>
        t < 1.6 + i * 0.55 ? null : (
          <g key={kind}>
            <Box
              x={starts[i]}
              y={503}
              w={widths[i] - 3}
              h={65}
              fill="#ece0ba"
              r={5}
            />
            {Array.from(
              { length: Math.max(2, Math.round(widths[i] / 60)) },
              (_, j) => {
                const count = Math.max(2, Math.round(widths[i] / 60));
                return (
                  <ClipArt
                    key={j}
                    kind={kind}
                    x={starts[i] + 3 + (j * (widths[i] - 8)) / count}
                    y={506}
                    width={(widths[i] - 8) / count}
                    height={59}
                    time={j * 0.3}
                  />
                );
              },
            )}
            <rect
              x={starts[i] + 6}
              y={506}
              width={i === 3 ? 85 : 55}
              height="14"
              rx="5"
              fill="#fffcf0"
            />
            <Label x={starts[i] + 10} y={517} size={11}>
              {names[i]}
            </Label>
            {i === 1 && !compact && t > 3.2 && (
              <g>
                <rect
                  x={starts[i] + 130}
                  y="506"
                  width="130"
                  height="59"
                  fill="#605e57"
                  opacity={t > 5.8 ? 0.75 : 0.45}
                />
                <rect
                  x={starts[i] + 130}
                  y="506"
                  width="130"
                  height="59"
                  fill="url(#hatch)"
                />
                {cut && (
                  <>
                    <path
                      d={`M${starts[i] + 130} 498 v77 M${starts[i] + 260} 498 v77`}
                      stroke="#cb6365"
                      strokeWidth="2"
                    />
                  </>
                )}
              </g>
            )}
            {i === 1 && compact && (
              <path
                d={`M${starts[i] + 92} 503 v65`}
                stroke={ink}
                strokeWidth="3"
              />
            )}
          </g>
        ),
      )}
      {t >= 3.6 && (
        <g>
          <Box x={100} y={580} w={1048} h={34} fill="#e9e3f3" r={5} sw={1.7} />
          <Label x={108} y={591} size={10}>
            ♪ bgm_小克.wav
          </Label>
          {Array.from({ length: 350 }, (_, i) => {
            const height =
              5 + Math.abs(Math.sin(i * 7.31) * Math.sin(i * 0.283)) * 22;
            return (
              <path
                key={i}
                d={`M${105 + i * 2.97} ${601 - height / 2} v${height}`}
                stroke="#a395c1"
                strokeWidth="1.5"
              />
            );
          })}
        </g>
      )}
      {t >= 12 && (
        <g>
          <Box
            x={starts[2]}
            y={460}
            w={195}
            h={25}
            fill="#f3ce61"
            r={4}
            sw={1.8}
          />
          <Label x={starts[2] + 9} y={478} size={14}>
            T {t < 14.2 ? "前方高能预颈" : "前方高能预警"}
          </Label>
        </g>
      )}
      {t > 8.8 &&
        [1, 2, 3].map((i) => (
          <g key={i}>
            <circle
              cx={starts[i]}
              cy="535"
              r="13"
              fill="#fffff6"
              stroke={ink}
              strokeWidth="2"
            />
            <Label
              x={starts[i]}
              y={543}
              anchor="middle"
              size={21}
              fill={i === 1 ? "#539e91" : ink}
            >
              {["", "◎", "▤", "▣"][i]}
            </Label>
          </g>
        ))}
      {t >= 20.3 && (
        <>
          {Array.from({ length: 32 }, (_, i) =>
            t < 20.3 + i * 0.025 ? null : (
              <path
                key={i}
                d={`M${100 + i * 34} 624 l6 12 l7 -12 Z`}
                fill="#f1d679"
                stroke={ink}
                strokeWidth="1"
              />
            ),
          )}
          <Box x={1160} y={580} w={77} h={34} fill="#f2cd65" r={7} />
          <Label x={1198} y={603} anchor="middle" size={18}>
            ▽ 卡点
          </Label>
        </>
      )}
      <path d={`M${playX} 418 V643`} stroke="#d56575" strokeWidth="2.2" />
      <path
        d={`M${playX - 7} 403 h14 v12 l-7 8 l-7 -8 Z`}
        fill="#d96c7d"
        stroke={ink}
        strokeWidth="1.5"
      />
      <Label x={49} y={683} size={17} fill="#a8a599">
        − ──○──── +
      </Label>
      <Label x={1232} y={682} anchor="end" size={12} fill="#ccc8bb">
        片段 4 · 总时长 0:10.5
      </Label>
    </g>
  );
};

const Arm: React.FC<{ x: number; y: number; tx: number; ty: number }> = ({
  x,
  y,
  tx,
  ty,
}) => (
  <g strokeLinecap="round">
    <path
      d={`M${x} ${y} Q${(x + tx) / 2} ${(y + ty) / 2 + 18} ${tx} ${ty}`}
      stroke={ink}
      strokeWidth="12"
      fill="none"
    />
    <path
      d={`M${x} ${y} Q${(x + tx) / 2} ${(y + ty) / 2 + 18} ${tx} ${ty}`}
      stroke={coral}
      strokeWidth="7"
      fill="none"
    />
    <circle cx={tx} cy={ty} r="7" fill={coral} stroke={ink} strokeWidth="2" />
  </g>
);

const Actions: React.FC<{ t: number }> = ({ t }) => {
  let x = 160,
    y = 429,
    tx: number | null = null,
    ty = 0;
  if (t < 3.9) {
    const step = Math.min(3, Math.max(0, Math.floor((t - 1.55) / 0.55)));
    tx = 94 + (step % 2) * 117;
    ty = 145 + Math.floor(step / 2) * 90;
  } else if (t < 5.9) {
    tx = null;
  } else if (t < 7.4) {
    tx = mix(t, [5.9, 6.5, 7.4], [417, 530, 380]);
    ty = 560;
  } else if (t < 8.5) {
    tx = 153;
    ty = 89;
  } else if (t < 11.5) {
    tx = t < 9.6 ? 94 : t < 10.7 ? 212 : 94;
    ty = t < 10.7 ? 145 : 230;
  } else if (t < 12.5) {
    tx = 225;
    ty = 88;
  } else if (t < 14.2) {
    x = 185;
  } else if (t < 15.5) {
    x = 410;
    y = 423;
  } else if (t < 19.5) {
    x = 450;
    y = 447;
    const row = t < 16.4 ? 0 : t < 18.1 ? 1 : 2;
    ty = 156 + row * 60;
    tx =
      row === 0
        ? mix(t, [15.5, 16.2], [1020, 1170])
        : row === 1
          ? mix(t, [16.4, 17, 17.7, 18], [1091, 1234, 1234, 1098])
          : mix(t, [18.1, 19.1], [1020, 1148]);
  } else if (t < 22.5) {
    x = mix(t, [19.5, 21.7], [490, 970]);
    y = 485;
    if (t < 21.7) {
      tx = 1193;
      ty = 594;
    }
  } else {
    x = 950;
    y = 470;
    tx = 1150;
    ty = 34;
  }
  return (
    <g>
      {tx !== null && t >= 1.35 && (
        <Arm x={x + 77} y={y + 30} tx={tx} ty={ty} />
      )}
      {t >= 1.35 && (
        <Mascot
          x={x}
          y={y}
          scale={0.8}
          time={t}
          glasses={t >= 19.5}
          mood={
            t > 12.5 && t < 14.2
              ? "angry"
              : t > 16.5
                ? "star"
                : t > 7.4
                  ? "happy"
                  : "plain"
          }
        />
      )}
      {t >= 1.7 &&
        t < 3.9 &&
        (() => {
          const i = Math.min(3, Math.floor((t - 1.7) / 0.55));
          const p = ((t - 1.7) % 0.55) / 0.55;
          const sx = 94 + (i % 2) * 117,
            sy = 140 + Math.floor(i / 2) * 90;
          const ex = 110 + i * 175;
          return (
            <g
              transform={`translate(${sx + (ex - sx) * p} ${sy + (475 - sy) * p}) rotate(${12 - 24 * p})`}
              opacity={Math.sin(p * Math.PI)}
            >
              <Box x={0} y={0} w={90} h={53} r={4} />
              <ClipArt kind={kinds[i]} x={2} y={2} width={86} height={49} />
            </g>
          );
        })()}
      {t >= 6 && t < 7.4 && (
        <>
          <Comic x={460} y={442} size={28} color="#ec9cb6" rotate={-12}>
            刷!
          </Comic>
          <Comic x={610} y={450} size={23} color="#ec9cb6" rotate={8}>
            刷!
          </Comic>
        </>
      )}
      {t >= 7.4 && t < 8.1 && (
        <Comic x={245} y={406} size={26} color="#8cc1ae">
          搞定!
        </Comic>
      )}
      {t >= 9.5 && t < 10.2 && (
        <Comic x={340} y={326} size={29} color="#89bdaa" rotate={-4}>
          空心入网!
        </Comic>
      )}
      {t >= 13.8 && t < 15.5 && (
        <g>
          <Box x={284} y={505} w={154} h={101} fill="#c9c1ac" r={16} />
          <Box x={294} y={512} w={135} h={75} fill="#fffdf4" r={12} />
          <Label x={361} y={560} size={35} anchor="middle" bold>
            Ctrl+Z
          </Label>
        </g>
      )}
      {t >= 14.2 && t < 15.5 && (
        <g
          transform="rotate(-12 840 231)"
          opacity={mix(t, [14.2, 14.4], [0, 1])}
        >
          <rect
            x="772"
            y="185"
            width="158"
            height="73"
            rx="7"
            stroke="#7caf82"
            strokeWidth="4"
            fill="none"
          />
          <rect
            x="778"
            y="191"
            width="146"
            height="61"
            rx="3"
            stroke="#7caf82"
            strokeWidth="1.5"
            fill="none"
          />
          <Label x={851} y={235} anchor="middle" size={36} fill="#7caf82">
            已修正
          </Label>
        </g>
      )}
      {t > 16.7 && t < 17.8 && (
        <Comic x={640} y={103} size={45} color="#ec5aab" rotate={-4}>
          饱和度:拉满
        </Comic>
      )}
    </g>
  );
};

export const Editor: React.FC<{ t: number; hidePhone?: boolean }> = ({
  t,
  hidePhone = false,
}) => {
  const exporting = t >= 23.1;
  const done = t >= 25.4;
  return (
    <g>
      <Box x={13} y={5} w={1253} h={707} r={13} />
      <Box x={26} y={14} w={1228} h={42} fill="#fcfaf4" r={10} />
      {["#e88792", "#f3d275", "#91c88f"].map((c, i) => (
        <circle
          key={c}
          cx={44 + i * 16}
          cy="35"
          r="4.5"
          fill={c}
          stroke={ink}
          strokeWidth="1.3"
        />
      ))}
      <Mascot x={98} y={28} scale={0.16} mood="plain" />
      <Label x={129} y={39} size={20}>
        小克剪辑_最终版_打死不改(3).mp4
      </Label>
      <Box x={566} y={19} w={148} h={32} r={7} fill="#292721" />
      <Label x={640} y={41} anchor="middle" size={22} fill="#fff9e7">
        00:00:{String(Math.floor(t)).padStart(2, "0")}:
        {String(Math.floor(t * 30) % 30).padStart(2, "0")}
      </Label>
      <Label x={735} y={39} size={15} fill="#928e81">
        · 已自动保存
      </Label>
      <Box x={991} y={21} w={61} h={27} r={6} sw={1.8} />
      <Label x={1021} y={41} anchor="middle" size={17}>
        1080p
      </Label>
      <Box
        x={1065}
        y={19}
        w={175}
        h={32}
        fill={done ? "#a2b798" : exporting ? "#f4d677" : "#76b9b1"}
        r={8}
      />
      <Label
        x={1153}
        y={42}
        anchor="middle"
        size={19}
        fill={exporting && !done ? ink : "#fffdf4"}
      >
        {done
          ? "完成 ✓"
          : exporting
            ? `渲染中 ${Math.floor(mix(t, [23.1, 24.3, 25.2, 25.4], [0, 90, 99, 100]))}%`
            : "↥ 导出"}
      </Label>
      <Library t={t} />
      <Adjustments t={t} />
      {!hidePhone && <Phone t={t} />}
      <Timeline t={t} />
      {t < 25.5 && <Actions t={t} />}
    </g>
  );
};
