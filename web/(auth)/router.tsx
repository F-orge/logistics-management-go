import { Route } from "@solidjs/router";
import { type Component, lazy } from "solid-js";

const AuthLayout = lazy(() => import("~/components/layouts/auth"));
const SignInPage = lazy(() => import("./signin"));

const AuthRouter: Component<{}> = (props) => {
  return (
    <Route path={""} component={AuthLayout}>
      <Route path={"signin"} component={SignInPage} />
      <Route path={"reset"} />
      <Route path={"code"} />
      <Route path={"callback"} />
    </Route>
  );
};

export default AuthRouter;
