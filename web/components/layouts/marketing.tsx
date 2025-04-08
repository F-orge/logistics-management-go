import type { RouteSectionProps } from "@solidjs/router";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
} from "../ui/navigation-menu";
import { FileQuestion, House, Workflow } from "lucide-solid";
import { Button } from "../ui/button";

const MarketingLayout = (props: RouteSectionProps) => {
	return (
		<main class="h-screen container mx-auto max-w-7xl">
			<header class="p-4 flex flex-row items-center justify-between">
				<div class="flex flex-row items-center gap-2.5">
					<img
						src="https://placehold.co/32x32"
						class="size-8 rounded-md object-cover"
						alt="Relocation Services"
					/>
					<span class="font-bold">ETMAR Philippines</span>
				</div>
				<NavigationMenu>
					<NavigationMenuItem>
						<NavigationMenuLink class="flex items-center gap-2.5">
							<House size={16} />
							Home
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink class="flex items-center gap-2.5">
							<Workflow size={16} />
							Services
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink class="flex items-center gap-2.5">
							<FileQuestion size={16} />
							Support
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenu>
				<div class="flex flex-row items-center gap-2.5">
					<Button>Sign in</Button>
					<Button variant={"outline"}>Register</Button>
				</div>
			</header>
			<article class="space-y-24 py-24">{props.children}</article>
			<footer>
				<span>Logo</span>
			</footer>
		</main>
	);
};

export default MarketingLayout;
