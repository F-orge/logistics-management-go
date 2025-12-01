import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import {
	Briefcase,
	Building2,
	DollarSign,
	Globe,
	Link as LinkIcon,
	Mail,
	MapPin,
	Phone,
	User,
} from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemTitle,
} from "@/components/ui/item";
import {
	CustomerRelationsCompaniesResponse,
	UsersRecord,
} from "@/lib/pb.types";

const CompanyRecord = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useSuspenseQuery({
		queryKey: ["company", searchQuery.id],
		queryFn: async () => {
			if (!searchQuery.id) return null;
			return pocketbase.collection("customer_relations_companies").getOne<
				CustomerRelationsCompaniesResponse & {
					expand?: {
						owner?: UsersRecord;
					};
				}
			>(searchQuery.id, { expand: "owner" });
		},
	});

	if (!data) {
		return <ItemGroup>No company data available</ItemGroup>;
	}

	return (
		<ItemGroup className="gap-3">
			{/* Company Name */}
			<Item variant="muted">
				<ItemContent className="gap-1">
					<ItemTitle className="flex items-center gap-2">
						<Building2 className="size-4" />
						Company Name
					</ItemTitle>
					<ItemDescription className="text-foreground font-medium">
						{data.name}
					</ItemDescription>
				</ItemContent>
			</Item>

			{/* Industry */}
			{data.industry && (
				<Item variant="muted">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Briefcase className="size-4" />
							Industry
						</ItemTitle>
						<ItemDescription className="text-foreground">
							{data.industry}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Annual Revenue */}
			{data.annualRevenue && (
				<Item variant="muted">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<DollarSign className="size-4" />
							Annual Revenue
						</ItemTitle>
						<ItemDescription className="text-foreground">
							{new Intl.NumberFormat("en-US", {
								style: "currency",
								currency: "USD",
							}).format(data.annualRevenue)}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Email/Website */}
			{data.website && (
				<Item variant="muted" asChild>
					<a href={data.website} target="_blank" rel="noopener noreferrer">
						<ItemContent className="gap-1">
							<ItemTitle className="flex items-center gap-2">
								<Globe className="size-4" />
								Website
							</ItemTitle>
							<ItemDescription className="truncate text-blue-600 hover:underline">
								{data.website}
							</ItemDescription>
						</ItemContent>
					</a>
				</Item>
			)}

			{/* Phone Number */}
			{data.phoneNumber && (
				<Item variant="muted" asChild>
					<a href={`tel:${data.phoneNumber}`}>
						<ItemContent className="gap-1">
							<ItemTitle className="flex items-center gap-2">
								<Phone className="size-4" />
								Phone Number
							</ItemTitle>
							<ItemDescription className="text-foreground">
								{data.phoneNumber}
							</ItemDescription>
						</ItemContent>
					</a>
				</Item>
			)}

			{/* Address */}
			{(data.street ||
				data.city ||
				data.state ||
				data.country ||
				data.postalCode) && (
				<Item variant="muted">
					<ItemContent className="gap-2">
						<ItemTitle className="flex items-center gap-2">
							<MapPin className="size-4" />
							Address
						</ItemTitle>
						<div className="text-sm text-muted-foreground space-y-1">
							{data.street && <div>{data.street}</div>}
							{(data.city || data.state || data.postalCode) && (
								<div>
									{[data.city, data.state, data.postalCode]
										.filter(Boolean)
										.join(", ")}
								</div>
							)}
							{data.country && <div>{data.country}</div>}
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

			{/* Owner - Relation */}
			{data.expand?.owner && (
				<Item variant="muted">
					{data.expand.owner.avatar && (
						<ItemMedia>
							<img
								src={pocketbase.files.getURL(
									data.expand.owner,
									data.expand.owner.avatar,
								)}
								alt={data.expand.owner.name || "Owner"}
								className="size-10 rounded-full object-cover"
							/>
						</ItemMedia>
					)}
					<ItemContent className="gap-2">
						<ItemTitle className="flex items-center gap-2">
							<User className="size-4" />
							Owner
						</ItemTitle>
						<div className="text-sm space-y-1">
							{data.expand.owner.name && (
								<ItemDescription className="text-foreground font-medium">
									{data.expand.owner.name}
								</ItemDescription>
							)}
							{data.expand.owner.email && (
								<ItemDescription className="text-muted-foreground">
									{data.expand.owner.email}
								</ItemDescription>
							)}
							{data.expand.owner.roles &&
								data.expand.owner.roles.length > 0 && (
									<ItemDescription className="text-xs text-muted-foreground">
										{data.expand.owner.roles.join(", ")}
									</ItemDescription>
								)}
						</div>
					</ItemContent>
				</Item>
			)}
		</ItemGroup>
	);
};

export default CompanyRecord;
