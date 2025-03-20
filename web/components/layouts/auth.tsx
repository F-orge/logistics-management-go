import type { RouteSectionProps } from "@solidjs/router";
import { type Component } from "solid-js";

const AuthLayout = (props: RouteSectionProps) => {
  return <div>{props.children}</div>;
};

export default AuthLayout;
