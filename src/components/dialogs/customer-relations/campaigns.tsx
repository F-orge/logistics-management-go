import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import { Calendar, DollarSign, FileText, Megaphone } from "lucide-react";
import React from "react";
import { Dialog } from "@/components/ui/dialog";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from "@/components/ui/item";
import {
	CustomerRelationsCampaignsResponse,
	UsersRecord,
} from "@/lib/pb.types";

const CampaignRecord = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useSuspenseQuery({
		queryKey: ["campaign", searchQuery.id],
		queryFn: async () => {
			if (!searchQuery.id) return null;
			return pocketbase
				.collection("customer_relations_campaigns")
				.getOne<CustomerRelationsCampaignsResponse>(searchQuery.id);
		},
	});

	if (!data) {
		return <ItemGroup>No campaign data available</ItemGroup>;
	}

	return (
		<ItemGroup className="gap-3">
			{/* Campaign Name */}
			<Item variant="outline">
				<ItemContent className="gap-1">
					<ItemTitle className="flex items-center gap-2">
						<Megaphone className="size-4" />
						Campaign Name
					</ItemTitle>
					<ItemDescription className="text-foreground font-medium">
						{data.name}
					</ItemDescription>
				</ItemContent>
			</Item>

			{/* Budget */}
			<Item variant="outline">
				<ItemContent className="gap-1">
					<ItemTitle className="flex items-center gap-2">
						<DollarSign className="size-4" />
						Budget
					</ItemTitle>
					<ItemDescription className="text-foreground">
						{new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD",
						}).format(data.budget)}
					</ItemDescription>
				</ItemContent>
			</Item>

			{/* Start Date */}
			{data.startDate && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Calendar className="size-4" />
							Start Date
						</ItemTitle>
						<ItemDescription className="text-foreground">
							{new Date(data.startDate).toLocaleDateString()}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* End Date */}
			{data.endDate && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Calendar className="size-4" />
							End Date
						</ItemTitle>
						<ItemDescription className="text-foreground">
							{new Date(data.endDate).toLocaleDateString()}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Campaign Duration */}
			{data.startDate && data.endDate && (
				<Item variant="muted" size="sm">
					<ItemContent className="gap-1">
						<ItemDescription className="text-xs text-muted-foreground">
							Duration:{" "}
							{Math.ceil(
								(new Date(data.endDate).getTime() -
									new Date(data.startDate).getTime()) /
									(1000 * 60 * 60 * 24),
							)}{" "}
							days
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Attachments */}
			{data.attachments && data.attachments.length > 0 && (
				<Item variant="outline">
					<ItemContent className="gap-2">
						<ItemTitle className="flex items-center gap-2">
							<FileText className="size-4" />
							Attachments
						</ItemTitle>
						<div className="space-y-1.5">
							{data.attachments.map((attachment) => (
								<a
									key={attachment}
									href={pocketbase.files.getURL(data, attachment)}
									target="_blank"
									rel="noopener noreferrer"
									className="block text-sm truncate text-primary hover:underline"
								>
									{attachment}
								</a>
							))}
						</div>
					</ItemContent>
				</Item>
			)}

			{/* Metadata */}
			<Item variant="muted" size="sm">
				<ItemContent className="gap-1">
					<ItemDescription className="text-xs text-muted-foreground">
						Created: {new Date(data.created).toLocaleDateString()}
					</ItemDescription>
					<ItemDescription className="text-xs text-muted-foreground">
						Updated: {new Date(data.updated).toLocaleDateString()}
					</ItemDescription>
					<ItemDescription className="text-xs text-muted-foreground">
						ID: {data.id}
					</ItemDescription>
				</ItemContent>
			</Item>
		</ItemGroup>
	);
};

export default CampaignRecord;
