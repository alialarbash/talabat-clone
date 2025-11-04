import React from "react";
import {
  Svg,
  Defs,
  LinearGradient,
  Stop,
  Rect,
  G,
  Path,
  ClipPath,
} from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  // optional palette overrides
  tileStart?: string; // top-left of tile
  tileEnd?: string; // bottom-right of tile
  accentStart?: string; // top-left of logo stroke
  accentEnd?: string; // bottom-right of logo stroke
  bagFill?: string; // bag color
  bagStroke?: string; // bag outline
};

export default function Logo({
  width = 96,
  height = 96,
  tileStart = "#FF6F00",
  tileEnd = "#FF3D00",
  accentStart = "#FF3D00",
  accentEnd = "#D32F2F",
  bagFill = "#FFFFFF",
  bagStroke = "rgba(0,0,0,0.06)",
}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 96 96">
      <Defs>
        {/* App tile gradient */}
        <LinearGradient id="grad-tile" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={tileStart} />
          <Stop offset="1" stopColor={tileEnd} />
        </LinearGradient>

        {/* Accent gradient for the "t" stroke */}
        <LinearGradient id="grad-accent" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={accentStart} />
          <Stop offset="1" stopColor={accentEnd} />
        </LinearGradient>

        {/* Soft highlight clip for the tile (subtle sheen) */}
        <ClipPath id="clip-round">
          <Rect x="2" y="2" width="92" height="92" rx="24" />
        </ClipPath>
      </Defs>

      {/* Rounded app tile */}
      <Rect x="2" y="2" width="92" height="92" rx="24" fill="url(#grad-tile)" />

      {/* Subtle top-left sheen for depth */}
      <G clipPath="url(#clip-round)" opacity={0.18}>
        <Path
          d="M-10 20 C 25 -5, 65 -8, 110 10 L110 -10 L-10 -10 Z"
          fill="#FFFFFF"
        />
      </G>

      {/* Delivery bag group */}
      <G>
        {/* Soft bag shadow (fake inner-shadow via offset duplicate) */}
        <Rect
          x="22"
          y="28"
          width="52"
          height="50"
          rx="12"
          fill="rgba(0,0,0,0.06)"
        />
        {/* Main bag */}
        <Rect
          x="22"
          y="26"
          width="52"
          height="50"
          rx="12"
          fill={bagFill}
          stroke={bagStroke}
        />

        {/* Handle cutout illusion: a rounded white bar overlapping the bag top */}
        <Rect x="33" y="18" width="30" height="10" rx="5" fill={bagFill} />

        {/* Tiny notch to suggest handle join */}
        <Rect x="33" y="24" width="30" height="4" rx="2" fill={bagFill} />
      </G>

      {/* Stylized "t" as a rounded stroke (keeps it crisp at all sizes) */}
      {/* Horizontal cap + vertical stem built as a single path with round caps/joins */}
      <Path
        d="
          M 32 42
          H 64
          M 48 42
          V 66
        "
        stroke="url(#grad-accent)"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
