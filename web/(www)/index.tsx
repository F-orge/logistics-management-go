import { createAsync } from "@solidjs/router";
import { ArrowRight } from "lucide-solid";
import { For, Match, Switch, type Component } from "solid-js";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { pb } from "~/lib/pocketbase";
import { MarketingServicesLayoutStyleOptions } from "~/lib/pocketbase-types";

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
					<For each={servicesConfig()}>
						{(item) => (
							<TabsContent
								value={item.title}
								class="p-4 space-y-5 grid grid-cols-2"
							>
								<Switch>
									<Match
										when={
											item.layout_style ===
											MarketingServicesLayoutStyleOptions.grid
										}
									>
										<div>
											<h3 class="text-2xl font-bold">{item.title}</h3>
											<div
												class="text-muted-foreground"
												innerHTML={item.description}
											/>
										</div>
										<div class="grid grid-cols-2 gap-2.5">
											<For each={item.images}>
												{(image) => (
													<img
														class="rounded-md"
														src={`${import.meta.env.PUBLIC_BACKEND_URL}/api/files/marketing_services/${item.id}/${image}`}
														alt=""
													/>
												)}
											</For>
										</div>
									</Match>
								</Switch>
							</TabsContent>
						)}
					</For>
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
