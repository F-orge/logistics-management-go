import { type Component, Show } from "solid-js";
import { Route, Router } from "@solidjs/router";
import { lazy } from "solid-js";
import {
	ColorModeProvider,
	ColorModeScript,
	createLocalStorageManager,
} from "@kobalte/core";
import { Toaster } from "~/components/ui/sonner";

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
			<Show
				when={
					window.location.host.startsWith(
						`www.${import.meta.env.PUBLIC_DOMAIN_NAME}`,
					) ||
					window.location.host.startsWith(
						import.meta.env.PUBLIC_DOMAIN_NAME || "",
					)
				}
			>
				<PublicSiteRouter />
				<AuthRouter />
			</Show>
			<Route path={"*"} component={() => <NotFoundPage href="/" />} />
		</Router>
	);
};

export default SystemRouting;
