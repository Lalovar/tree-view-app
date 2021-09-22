import React from "react";

type Props = {
  children: React.ReactChild | React.ReactChild[];
};

export function Response({ children }: Props) {
  return <p className="info-response">{children}</p>;
}
