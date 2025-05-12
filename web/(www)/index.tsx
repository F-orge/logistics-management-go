import { createAsync } from "@solidjs/router";
import { ArrowRight } from "lucide-solid";
import { For, Match, Switch, type Component } from "solid-js";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { pb } from "~/lib/pocketbase";

const HomePage: Component<{}> = (props) => {
	const servicesConfig = createAsync(() =>
		pb.collection("marketing_services").getFullList(),
	);

	return (
		<>
			<section class="grid grid-cols-2">
				<div class="space-y-5">
					<h1 class="text-4xl font-bold">Going Beyong Logistics</h1>
					<p>
						Boost developer efficiency, enhance teamwork, and maximize tech
						investments with Etmar Logistics.
					</p>
					<div class="flex flex-row items-center gap-2.5">
						<Button>Contact US</Button>
						<Button variant={"outline"}>
							Learn more <ArrowRight />{" "}
						</Button>
					</div>
				</div>
			</section>
			<section class="space-y-5">
				<h2 class="text-3xl font-bold">Our services</h2>
				<Tabs>
					<TabsList class="bg-transparent border-b">
						<For each={servicesConfig()}>
							{(item) => (
								<TabsTrigger value={item.title}>{item.title}</TabsTrigger>
							)}
						</For>
					</TabsList>
				</Tabs>
			</section>
			<section>Partners</section>
			<section>Testimonials</section>
			<section>FAQs</section>
			<section>Contacts</section>
		</>
	);
};

export default HomePage;
