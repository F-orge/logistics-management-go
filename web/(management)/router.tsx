import { Route } from "@solidjs/router";
import { lazy, type Component } from "solid-js";
import Dashboard from "~/components/layouts/dashboard";
const OverviewPage = lazy(() => import("."));

// biome-ignore lint/complexity/noBannedTypes: <explanation>
const ManagementRouter: Component<{}> = (props) => {
	return (
		<>
			<Route component={Dashboard}>
				<Route path={""} component={OverviewPage} />
			</Route>
		</>
	);
};

export default ManagementRouter;
