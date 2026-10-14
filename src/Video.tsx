import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  cancelRender,
  continueRender,
  delayRender,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Box, Editor, Label, mix, Phone } from "./Editor";
import { ink, Mascot, paper, Star } from "./Art";

const Intro: React.FC<{ t: number }> = ({ t }) => (
  <g opacity={mix(t, [0.45, 0.8], [1, 0])}>
    <Box x={312} y={247} w={655} h={200} fill="#fcfaf6" r={11} />
    <path d="M313 284 H966" stroke="#aaa495" />
    {["#de7881", "#edce73", "#91c591"].map((c, i) => (
      <circle
        key={c}
        cx={335 + i * 16}
        cy="267"
        r="4.6"
        fill={c}
        stroke={ink}
        strokeWidth="1.2"
      />
    ))}
    <Label x={640} y={271} size={17} anchor="middle">
      小克.js — 终端
    </Label>
    <Label x={336} y={333} size={20} fill="#aaa59a">
      1
    </Label>
    <Label x={336} y={381} size={20} fill="#aaa59a">
      2
    </Label>
    <Label x={336} y={426} size={20} fill="#aaa59a">
      3
    </Label>
    <text x="375" y="334" fontSize="29">
      <tspan fill="#9980bf">const </tspan>
      <tspan fill="#569c91">剪辑软件 </tspan>
      <tspan>= </tspan>
      <tspan fill="#c27763">小克</tspan>
      <tspan>.写代码()</tspan>
    </text>
    <text x="375" y="380" fontSize="29">
      <tspan fill="#569c91">剪辑软件</tspan>
      <tspan>.画出(</tspan>
      <tspan fill="#cda83c">时间轴, 预览, 面板</tspan>
      <tspan>)</tspan>
    </text>
    <rect x="883" y="356" width="9" height="29" fill="#ca7965" />
  </g>
);

const Finale: React.FC<{ t: number }> = ({ t }) => {
  const entry = mix(t, [25.5, 26.15], [0, 1]);
  return (
    <g opacity={entry}>
      <rect width="1280" height="720" fill={paper} opacity=".73" />
      <g transform={`translate(0 ${(1 - entry) * 45})`}>
        <Phone t={t} x={450} y={130} w={302} h={461} social />
        <g
          transform={`translate(${mix(t, [25.6, 26.35], [-440, 0])} 0) rotate(-1.5 225 326)`}
        >
          <Box x={46} y={166} w={359} h={324} fill="#fffdf7" r={11} />
          {Array.from({ length: 6 }, (_, i) => (
            <path
              key={i}
              d={`M64 ${232 + i * 43} H389`}
              stroke="#c3c9bb"
              opacity=".3"
            />
          ))}
          <rect
            x="177"
            y="160"
            width="93"
            height="21"
            fill="#f0ce59"
            opacity=".78"
          />
          <Label x={76} y={244} size={36} fill="#69685d">
            30 秒剪完,
          </Label>
          <Label x={74} y={362} size={71}>
            {"Opus 5.5".slice(0, Math.floor(mix(t, [27.1, 28.65], [0, 8])))}
          </Label>
          {t > 28.6 && (
            <path
              d={`M70 385 Q200 364 ${mix(t, [28.6, 29], [75, 377])} 382`}
              fill="none"
              stroke="#cd7b67"
              strokeWidth="5"
              strokeLinecap="round"
            />
          )}
          {t > 29 && (
            <>
              <Label x={175} y={452} size={32} fill="#6c6b5e">
                — 小克 收工
              </Label>
              <Star x={377} y={436} r={11} color="#f3d97d" />
            </>
          )}
        </g>
        <Mascot x={973} y={485} scale={1.18} time={t} glasses mood="happy" />
        {t > 28.8 && <Star x={1116} y={474} r={9} color="#f1d369" />}
      </g>
      {Array.from({ length: 34 }, (_, i) => {
        const elapsed = t - 25.5;
        const y = ((i * 83 + elapsed * (24 + (i % 5) * 9)) % 820) - 100;
        const x = (i * 173 + 29) % 1280;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={4 + (i % 3)}
            height={3 + (i % 4)}
            transform={`rotate(${i * 31 + elapsed * 33} ${x} ${y})`}
            fill={["#dca386", "#c1add5", "#e9cf70", "#93bcb0"][i % 4]}
            stroke={ink}
            strokeWidth=".8"
            opacity=".8"
          />
        );
      })}
    </g>
  );
};

export const Video: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const [fontHandle] = useState(() =>
    delayRender("Load bundled handwriting fonts"),
  );
  useEffect(() => {
    let active = true;
    Promise.all([
      new FontFace(
        "HandChinese",
        `url(${staticFile("fonts/LXGWWenKaiTC-Regular.ttf")})`,
      ).load(),
      new FontFace(
        "HandLatin",
        `url(${staticFile("fonts/PatrickHand-Regular.ttf")})`,
      ).load(),
    ])
      .then((fonts) => {
        if (active) {
          fonts.forEach((font) => document.fonts.add(font));
          continueRender(fontHandle);
        }
      })
      .catch(cancelRender);
    return () => {
      active = false;
    };
  }, [fontHandle]);
  const scale = mix(
    t,
    [
      0, 0.8, 1.3, 2.1, 7.5, 10.5, 12, 15.5, 16, 19.4, 20.1, 22.1, 23.3, 25.5,
      26,
    ],
    [
      1, 1, 1, 1.09, 1.12, 1.22, 1.3, 1.3, 1.37, 1.37, 1.05, 1.05, 1.28, 1.28,
      1,
    ],
  );
  const cx = mix(
    t,
    [0, 2.1, 10.5, 12, 15.5, 16, 19.4, 20.1, 22.1, 23.3, 25.5, 26],
    [640, 602, 563, 630, 630, 811, 811, 647, 647, 785, 785, 640],
  );
  const cy = mix(
    t,
    [0, 2.1, 10.5, 12, 15.5, 16, 19.4, 20.1, 23.3, 25.5, 26],
    [360, 397, 390, 344, 344, 265, 265, 355, 283, 283, 360],
  );
  const editorOpacity = mix(t, [0.5, 0.95], [0, 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: paper }}>
      <Audio src={staticFile("audio/reference-soundtrack.m4a")} />
      <svg
        width="1280"
        height="720"
        viewBox="0 0 1280 720"
        style={{ fontFamily: "HandLatin, HandChinese, cursive", color: ink }}
      >
        <defs>
          <pattern
            id="hatch"
            patternUnits="userSpaceOnUse"
            width="7"
            height="7"
            patternTransform="rotate(40)"
          >
            <path d="M0 0 V7" stroke="#e3dece" strokeWidth="2" opacity=".3" />
          </pattern>
        </defs>
        <rect width="1280" height="720" fill={paper} />
        <g
          opacity={editorOpacity}
          transform={`translate(640 360) scale(${scale}) translate(${-cx} ${-cy})`}
        >
          <Editor t={t} hidePhone={t >= 25.5} />
        </g>
        {t < 0.8 && <Intro t={t} />}
        {t >= 25.5 && <Finale t={t} />}
        {Array.from({ length: 220 }, (_, i) => (
          <circle
            key={i}
            cx={(i * 197.83) % 1280}
            cy={(i * 113.69) % 720}
            r={0.3 + (i % 3) * 0.15}
            fill="#7e7361"
            opacity=".055"
          />
        ))}
        <rect
          x="0"
          y="0"
          width="1280"
          height="720"
          fill="#fff7d8"
          opacity=".018"
        />
      </svg>
    </AbsoluteFill>
  );
};
