import React from "react";
import { Composition } from "remotion";
import { Video } from "./Video";
export const RemotionRoot: React.FC = () => (
  <Composition
    id="ClaudeVideoMotion"
    component={Video}
    width={1280}
    height={720}
    fps={30}
    durationInFrames={900}
  />
);
