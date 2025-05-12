import type { Component } from "solid-js";
import { Button } from "./components/ui/button";
import { ArrowLeft } from "lucide-solid";

const NotFoundPage: Component<{ href: string }> = (props) => {
	return (
		<main class="h-screen max-h-screen flex flex-col justify-center items-center gap-5">
			<h1 class="text-6xl font-bold">404</h1>
			<div class="text-center">
				<span class="text-4xl">Page not found</span>
				<p class="text-muted-foreground">
					Sorry, the page you're looking for cannot be found.
				</p>
			</div>
			<Button as="a" href={props.href}>
				<ArrowLeft size={16} /> Back to home
			</Button>
		</main>
	);
};

export default NotFoundPage;
