import React from "react";

type ResponseProps = {
  children: React.ReactChild | React.ReactChild[];
};

export function Response({ children }: ResponseProps) {
  return <p className="info-response">{children}</p>;
}
