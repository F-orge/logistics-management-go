import { createAsync, type RouteSectionProps } from "@solidjs/router";
import {
	Bell,
	Boxes,
	LogOut,
	MessageCircleIcon,
	MoreHorizontal,
	NotebookText,
	Settings2,
	User,
	Users,
} from "lucide-solid";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuGroup,
	DropdownMenuGroupLabel,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
	DropdownMenuPortal,
} from "~/components/ui/dropdown-menu";
import { pb } from "~/lib/pocketbase";
import { Button } from "~/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "~/components/ui/sheet";
import { For } from "solid-js";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";

const DashboardProfile: Component<{}> = (props) => {
	const userProfile = createAsync(() =>
		pb.collection("users").getOne(pb.authStore.record?.id || ""),
	);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src="https://github.com/stefan-karger.png" />
					<AvatarFallback>EK</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					<div class="flex flex-row items-center gap-2.5">
						<Avatar class="size-8">
							<AvatarImage src="https://github.com/stefan-karger.png" />
							<AvatarFallback>EK</AvatarFallback>
						</Avatar>
						<div class="flex flex-col p-1">
							<span>{userProfile()?.name}</span>
							<span class="text-muted-foreground">{userProfile()?.email}</span>
						</div>
					</div>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Settings2 size={20} />
					Settings
				</DropdownMenuItem>
				<DropdownMenuItem>
					<User size={20} />
					My account
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => {
						pb.authStore.clear();
						window.location.href = "/";
					}}
				>
					<LogOut size={20} />
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const DashboardNotifications: Component<{}> = (props) => {
	const userNotifications = createAsync(() =>
		pb.collection("notifications").getFullList(),
	);

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger as={Button} variant="ghost" size="sm">
					<Bell size={20} />
				</DropdownMenuTrigger>
				<DropdownMenuContent class="w-full max-w-2xl">
					<DropdownMenuSub overlap>
						<DropdownMenuLabel class="flex flex-row items-center justify-between px-3">
							Notifications
							<DropdownMenuSubTrigger as={Button} size={"sm"} variant={"ghost"}>
								<MoreHorizontal size={20} />
							</DropdownMenuSubTrigger>
							<DropdownMenuPortal>
								<DropdownMenuSubContent>
									<DropdownMenuItem>Mark all as read</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuLabel>
					</DropdownMenuSub>
					<DropdownMenuSeparator />
					<For each={userNotifications() || []}>
						{(item) => (
							<>
								<DropdownMenuItem>
									<div class="flex flex-col gap-2.5 p-1.5">
										<span class="text-sm">{item.title}</span>
										<p class="text-muted-foreground">{item.message}</p>
									</div>
								</DropdownMenuItem>
							</>
						)}
					</For>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

const DashboardNavigation: Component<{}> = (props) => {
	return (
		<nav class="p-4">
			<NavigationMenu>
				<NavigationMenuItem>
					<NavigationMenuTrigger class="gap-2.5">
						<MessageCircleIcon size={20} />
						Chats
					</NavigationMenuTrigger>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger class="gap-2.5">
						<Users size={20} />
						Employees
					</NavigationMenuTrigger>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger class="gap-2.5">
						<Boxes size={20} />
						Shipments
					</NavigationMenuTrigger>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger class="gap-2.5">
						<NotebookText size={20} />
						Tasks
					</NavigationMenuTrigger>
				</NavigationMenuItem>
			</NavigationMenu>
		</nav>
	);
};

const Dashboard = (props: RouteSectionProps) => {
	return (
		<main class="container mx-auto max-w-7xl">
			<header class="p-1.5 border-b flex items-center justify-between rounded-md">
				<div class="flex flex-row items-center gap-2.5">
					<img
						src="https://placehold.co/32x32"
						class="size-10 rounded-md object-cover"
						alt="Relocation Services"
					/>
					<DashboardNavigation />
				</div>
				<div class="flex flex-row items-center gap-5">
					<DashboardNotifications />
					<DashboardProfile />
				</div>
			</header>
			<nav class="p-4">Breadcrumbs</nav>
			<article>{props.children}</article>
		</main>
	);
};

export default Dashboard;
