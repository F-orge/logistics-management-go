import type { RouteSectionProps } from "@solidjs/router";

const MarketingLayout = (props: RouteSectionProps) => {
	return (
		<main class="h-screen container mx-auto max-w-7xl">
			<header class="p-4">
				<span>Logo</span>
			</header>
			<article class="space-y-24 py-24">{props.children}</article>
			<footer>
				<span>Logo</span>
			</footer>
		</main>
	);
};

export default MarketingLayout;
