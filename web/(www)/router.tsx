import { Route } from "@solidjs/router";
import type { Component } from "solid-js";
import HomePage from ".";
import MarketingLayout from "~/components/layouts/marketing";

const PublicSiteRouter: Component<{}> = (props) => {
	return (
		<>
			<Route component={MarketingLayout}>
				<Route path={""} component={HomePage} />
			</Route>
		</>
	);
};

export default PublicSiteRouter;
