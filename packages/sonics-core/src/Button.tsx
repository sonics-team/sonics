import * as React from "react";

export interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

export function Button(props: ButtonProps) {
  return <button onClick={props.onClick}>{props.children}</button>;
}

Button.displayName = "Button";
