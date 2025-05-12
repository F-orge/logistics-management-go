import { type Component, Show } from "solid-js";
import { redirect, Route, Router } from "@solidjs/router";
import { lazy } from "solid-js";
import {
	ColorModeProvider,
	ColorModeScript,
	createLocalStorageManager,
} from "@kobalte/core";
import { Toaster } from "~/components/ui/sonner";
import ManagementRouter from "./(management)/router";
import { pb } from "./lib/pocketbase";

const AuthRouter = lazy(() => import("./(auth)/router"));
const PublicSiteRouter = lazy(() => import("./(www)/router"));
const NotFoundPage = lazy(() => import("./not-found"));

const SystemRouting: Component<{}> = (props) => {
	const storageManager = createLocalStorageManager("solid-ui-theme");

	return (
		<Router
			root={(props) => (
				<>
					<ColorModeScript storageType={storageManager.type} />
					<ColorModeProvider storageManager={storageManager}>
						{props.children}
					</ColorModeProvider>
					<Toaster />
				</>
			)}
		>
			<Route path="">
				<PublicSiteRouter />
			</Route>
			<Route path="auth">
				<AuthRouter />
			</Route>
			<Route
				preload={() => {
					// checkc if the user is authenticated or not.
					if (!pb.authStore.isValid) window.location.href = "/auth/signin";
				}}
				path="management"
			>
				<ManagementRouter />
			</Route>
			<Route path={"*"} component={() => <NotFoundPage href="/" />} />
		</Router>
	);
};

export default SystemRouting;
