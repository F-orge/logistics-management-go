import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import {
	AlertCircle,
	Award,
	Calendar,
	Mail,
	MapPin,
	TrendingUp,
	Trophy,
	User,
} from "lucide-react";
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
	CustomerRelationsCompaniesResponse,
	CustomerRelationsContactsResponse,
	CustomerRelationsLeadsResponse,
	CustomerRelationsOpportunitiesResponse,
	UsersRecord,
} from "@/lib/pb.types";

const sourceColors: Record<string, string> = {
	website: "text-blue-600",
	referral: "text-purple-600",
	"social-media": "text-pink-600",
	"email-campaign": "text-orange-600",
	"cold-call": "text-red-600",
	event: "text-green-600",
	advertisment: "text-indigo-600",
	partner: "text-cyan-600",
	other: "text-gray-600",
};

const sourceIcons: Record<string, React.ReactNode> = {
	website: <MapPin className="size-4" />,
	referral: <User className="size-4" />,
	"social-media": <TrendingUp className="size-4" />,
	"email-campaign": <Mail className="size-4" />,
	"cold-call": <Mail className="size-4" />,
	event: <Trophy className="size-4" />,
	advertisment: <AlertCircle className="size-4" />,
	partner: <Award className="size-4" />,
	other: <AlertCircle className="size-4" />,
};

const statusColors: Record<string, string> = {
	new: "text-blue-600",
	contacted: "text-yellow-600",
	qualified: "text-green-600",
	unqualified: "text-red-600",
	converted: "text-purple-600",
};

const statusIcons: Record<string, React.ReactNode> = {
	new: <AlertCircle className="size-4" />,
	contacted: <Mail className="size-4" />,
	qualified: <Trophy className="size-4" />,
	unqualified: <AlertCircle className="size-4" />,
	converted: <TrendingUp className="size-4" />,
};

const LeadRecord = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useSuspenseQuery({
		queryKey: ["lead", searchQuery.id],
		queryFn: async () => {
			if (!searchQuery.id) return null;
			return pocketbase.collection("customer_relations_leads").getOne<
				CustomerRelationsLeadsResponse & {
					expand?: {
						owner?: UsersRecord;
						campaign?: CustomerRelationsCampaignsResponse;
						convertedContact?: CustomerRelationsContactsResponse;
						convertedCompany?: CustomerRelationsCompaniesResponse;
						convertedOpportunity?: CustomerRelationsOpportunitiesResponse;
					};
				}
			>(searchQuery.id, {
				expand:
					"owner,campaign,convertedContact,convertedCompany,convertedOpportunity",
			});
		},
	});

	if (!data) {
		return <ItemGroup>No lead data available</ItemGroup>;
	}

	return (
		<ItemGroup className="gap-3">
			{/* Name */}
			<Item variant="outline">
				<ItemContent className="gap-1">
					<ItemTitle className="flex items-center gap-2">
						<User className="size-4" />
						Name
					</ItemTitle>
					<ItemDescription className="text-foreground">
						{data.name}
					</ItemDescription>
				</ItemContent>
			</Item>

			{/* Email */}
			{data.email && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Mail className="size-4" />
							Email
						</ItemTitle>
						<ItemDescription className="text-foreground">
							<a
								href={`mailto:${data.email}`}
								className="text-primary hover:underline"
							>
								{data.email}
							</a>
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Status */}
			{data.status && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							{statusIcons[data.status]}
							Status
						</ItemTitle>
						<ItemDescription
							className={`font-medium capitalize ${statusColors[data.status]}`}
						>
							{data.status}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Source */}
			{data.source && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							{sourceIcons[data.source]}
							Source
						</ItemTitle>
						<ItemDescription
							className={`font-medium capitalize ${sourceColors[data.source]}`}
						>
							{data.source.replace(/-/g, " ")}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Lead Score */}
			{data.score !== null && data.score !== undefined && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Award className="size-4" />
							Lead Score
						</ItemTitle>
						<ItemDescription className="text-foreground">
							<div className="flex items-center gap-2">
								<div className="w-32 bg-gray-200 rounded-full h-2">
									<div
										className="bg-primary h-2 rounded-full"
										style={{ width: `${Math.min(data.score, 100)}%` }}
									/>
								</div>
								<span className="text-sm font-medium">{data.score}/100</span>
							</div>
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Campaign */}
			{data.expand?.campaign && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Trophy className="size-4" />
							Campaign
						</ItemTitle>
						<ItemDescription className="text-foreground">
							<button
								onClick={() => {
									window.location.href = `/dashboard/customer-relations/campaigns?action=view&id=${data.expand?.campaign?.id}`;
								}}
								className="text-primary hover:underline"
							>
								{data.expand?.campaign?.name}
							</button>
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Owner */}
			{data.expand?.owner && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<User className="size-4" />
							Owner
						</ItemTitle>
						<div className="flex items-center gap-2 mt-1">
							{data.expand.owner.avatar && (
								<img
									src={pocketbase.files.getURL(
										data.expand.owner,
										data.expand.owner.avatar,
									)}
									alt={data.expand.owner.name}
									className="w-6 h-6 rounded-full"
								/>
							)}
							<div className="flex-1 min-w-0">
								<ItemDescription className="text-foreground font-medium">
									{data.expand.owner.name}
								</ItemDescription>
								<ItemDescription className="text-muted-foreground text-xs">
									{data.expand.owner.email}
								</ItemDescription>
							</div>
						</div>
					</ItemContent>
				</Item>
			)}

			{/* Converted At */}
			{data.convertedAt && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Calendar className="size-4" />
							Converted At
						</ItemTitle>
						<ItemDescription className="text-foreground">
							{new Date(data.convertedAt).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Converted Contact */}
			{data.expand?.convertedContact && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<User className="size-4" />
							Converted Contact
						</ItemTitle>
						<ItemDescription className="text-foreground">
							<button
								onClick={() => {
									window.location.href = `/dashboard/customer-relations/contacts?action=view&id=${data.expand?.convertedContact?.id}`;
								}}
								className="text-primary hover:underline"
							>
								{data.expand?.convertedContact?.name}
							</button>
							{data.expand?.convertedContact?.email && (
								<div className="text-muted-foreground text-xs">
									{data.expand?.convertedContact?.email}
								</div>
							)}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Converted Company */}
			{data.expand?.convertedCompany && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<MapPin className="size-4" />
							Converted Company
						</ItemTitle>
						<ItemDescription className="text-foreground">
							<button
								onClick={() => {
									window.location.href = `/dashboard/customer-relations/companies?action=view&id=${data.expand?.convertedCompany?.id}`;
								}}
								className="text-primary hover:underline"
							>
								{data.expand?.convertedCompany?.name}
							</button>
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Converted Opportunity */}
			{data.expand?.convertedOpportunity && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<TrendingUp className="size-4" />
							Converted Opportunity
						</ItemTitle>
						<ItemDescription className="text-foreground">
							<button
								onClick={() => {
									window.location.href = `/dashboard/customer-relations/opportunities?action=view&id=${data.expand?.convertedOpportunity?.id}`;
								}}
								className="text-primary hover:underline"
							>
								{data.expand?.convertedOpportunity?.name}
							</button>
							{data.expand?.convertedOpportunity?.dealValue && (
								<div className="text-muted-foreground text-xs">
									Deal Value:{" "}
									{new Intl.NumberFormat("en-US", {
										style: "currency",
										currency: "USD",
									}).format(data.expand?.convertedOpportunity?.dealValue)}
								</div>
							)}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Created */}
			{data.created && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Calendar className="size-4" />
							Created
						</ItemTitle>
						<ItemDescription className="text-muted-foreground text-xs">
							{new Date(data.created).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
								hour: "2-digit",
								minute: "2-digit",
							})}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Updated */}
			{data.updated && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Calendar className="size-4" />
							Updated
						</ItemTitle>
						<ItemDescription className="text-muted-foreground text-xs">
							{new Date(data.updated).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
								hour: "2-digit",
								minute: "2-digit",
							})}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}
		</ItemGroup>
	);
};

export default LeadRecord;
