import React from "react";
import Svg, { Rect, Defs, LinearGradient, Stop, G } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
};

export default function Logo({ width = 96, height = 96 }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 96 96">
      <Defs>
        <LinearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FF6F00" />
          <Stop offset="1" stopColor="#FF3D00" />
        </LinearGradient>
        <LinearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FF3D00" />
          <Stop offset="1" stopColor="#D32F2F" />
        </LinearGradient>
      </Defs>

      {/* Rounded square background */}
      <Rect x="2" y="2" width="92" height="92" rx="24" fill="url(#bg)" />

      {/* Delivery bag */}
      <G>
        {/* Handle */}
        <Rect
          x="34"
          y="18"
          width="28"
          height="10"
          rx="5"
          fill="#FFFFFF"
          opacity="0.95"
        />
        {/* Bag body */}
        <Rect x="22" y="26" width="52" height="50" rx="10" fill="#FFFFFF" />
      </G>

      {/* 't' inside the bag */}
      <G>
        <Rect x="32" y="38" width="32" height="8" rx="4" fill="url(#accent)" />
        <Rect x="44" y="46" width="8" height="22" rx="4" fill="url(#accent)" />
      </G>
    </Svg>
  );
}
