import { ArrowRight } from "lucide-solid";
import type { Component } from "solid-js";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

const HomePage: Component<{}> = (props) => {
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
						<TabsTrigger value="freight-forwarding">
							Freigh Forwarding
						</TabsTrigger>
						<TabsTrigger value="relocation-services">
							Relocation Services
						</TabsTrigger>
						<TabsTrigger value="import-export-services">
							Import / Export Services
						</TabsTrigger>
						<TabsTrigger value="custom-clearance">Custom Clearance</TabsTrigger>
						<TabsTrigger value="trucking">Trucking</TabsTrigger>
						<TabsTrigger value="door-to-door-delivery">
							Door to Door Delivery
						</TabsTrigger>
					</TabsList>
					<TabsContent value="freight-forwarding">
						<AspectRatio ratio={16 / 9}>
							<img
								src="https://placehold.co/1280x720"
								class="size-full rounded-md object-cover"
								alt="Freight Forwarding"
							/>
						</AspectRatio>
					</TabsContent>
					<TabsContent value="relocation-services">
						<AspectRatio ratio={16 / 9}>
							<img
								src="https://placehold.co/1280x720"
								class="size-full rounded-md object-cover"
								alt="Relocation Services"
							/>
						</AspectRatio>
					</TabsContent>
					<TabsContent value="import-export-services">
						<AspectRatio ratio={16 / 9}>
							<img
								src="https://placehold.co/1280x720"
								class="size-full rounded-md object-cover"
								alt="Import / Export Services"
							/>
						</AspectRatio>
					</TabsContent>
					<TabsContent value="custom-clearance">
						<AspectRatio ratio={16 / 9}>
							<img
								src="https://placehold.co/1280x720"
								class="size-full rounded-md object-cover"
								alt="Custom Clearance"
							/>
						</AspectRatio>
					</TabsContent>
					<TabsContent value="trucking">
						<AspectRatio ratio={16 / 9}>
							<img
								src="https://placehold.co/1280x720"
								class="size-full rounded-md object-cover"
								alt="Trucking"
							/>
						</AspectRatio>
					</TabsContent>
					<TabsContent value="door-to-door-delivery">
						<AspectRatio ratio={16 / 9}>
							<img
								src="https://placehold.co/1280x720"
								class="size-full rounded-md object-cover"
								alt="Door to Door Delivery"
							/>
						</AspectRatio>
					</TabsContent>
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
