import { Route } from "@solidjs/router";
import { type Component, lazy } from "solid-js";
import { pb } from "~/lib/pocketbase";

const AuthLayout = lazy(() => import("~/components/layouts/auth"));
const SignInPage = lazy(() => import("./signin"));
const RegisterPage = lazy(() => import("./register"));
const ResetPage = lazy(() => import("./reset"));
const VerificationPage = lazy(() => import("./verification"));
const ResetPasswordPage = lazy(() => import("./reset-password"));
const VerifyEmailPage = lazy(() => import("./verify-email"));

// biome-ignore lint/complexity/noBannedTypes: <explanation>
const AuthRouter: Component<{}> = (props) => {
	return (
		<>
			<Route path={""} component={AuthLayout}>
				<Route path={"signin"} component={SignInPage} />
				<Route path={"reset"} component={ResetPage} />
				<Route path={"verification"} component={VerificationPage} />
				<Route path={"reset-password"} component={ResetPasswordPage} />
				<Route path={"verify-email"} component={VerifyEmailPage} />
				<Route path={"register"} component={RegisterPage} />
			</Route>
			<Route path={"callback"} />
		</>
	);
};

export default AuthRouter;
