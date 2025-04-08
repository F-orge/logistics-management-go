import type { RouteSectionProps } from "@solidjs/router";

const Dashboard = (props: RouteSectionProps) => {
	return <div>{props.children}</div>;
};

export default Dashboard;
