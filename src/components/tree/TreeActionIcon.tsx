import React from "react";

type ThreeActionIconProps = {
  title?: string;
  onClick: any;
  value: React.ReactChild | React.ReactChild[];
  visible?: boolean;
};

export function ThreeActionIcon({
  value,
  title,
  onClick,
  visible,
}: ThreeActionIconProps) {
  return (
    <span
      title={title}
      className="tree-button"
      onClick={onClick}
      style={{
        display: visible ? "none" : "inline",
      }}
    >
      {value}
    </span>
  );
}
