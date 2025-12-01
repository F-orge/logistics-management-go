import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import {
	AlertCircle,
	AlertTriangle,
	Bug,
	CheckCircle,
	Clock,
	FileText,
	HelpCircle,
	Lightbulb,
	Tag,
	Ticket,
	User,
	Wrench,
} from "lucide-react";
import React from "react";
import { Dialog } from "@/components/ui/dialog";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemTitle,
} from "@/components/ui/item";
import { CustomerRelationsCasesResponse, UsersRecord } from "@/lib/pb.types";

const priorityColors: Record<string, string> = {
	critical: "text-destructive",
	high: "text-orange-600",
	medium: "text-yellow-600",
	low: "text-green-600",
};

const statusColors: Record<string, string> = {
	new: "text-blue-600",
	"in-progress": "text-purple-600",
	"waiting-for-customer": "text-orange-600",
	"waiting-for-internal": "text-yellow-600",
	escalated: "text-red-600",
	resolved: "text-green-600",
	closed: "text-gray-600",
	cancelled: "text-gray-500",
};

const typeIcons: Record<string, React.ReactNode> = {
	question: <HelpCircle className="size-4" />,
	problem: <AlertCircle className="size-4" />,
	complaint: <AlertTriangle className="size-4" />,
	"feature-request": <Lightbulb className="size-4" />,
	"bug-report": <Bug className="size-4" />,
	"technical-support": <Wrench className="size-4" />,
};

const CaseRecord = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useSuspenseQuery({
		queryKey: ["case", searchQuery.id],
		queryFn: async () => {
			if (!searchQuery.id) return null;
			return pocketbase.collection("customer_relations_cases").getOne<
				CustomerRelationsCasesResponse & {
					expand?: {
						owner?: UsersRecord;
						contact?: any;
					};
				}
			>(searchQuery.id, { expand: "owner,contact" });
		},
	});

	if (!data) {
		return <ItemGroup>No case data available</ItemGroup>;
	}

	return (
		<ItemGroup className="gap-3">
			{/* Case Number */}
			<Item variant="outline">
				<ItemContent className="gap-1">
					<ItemTitle className="flex items-center gap-2">
						<Ticket className="size-4" />
						Case Number
					</ItemTitle>
					<ItemDescription className="text-foreground font-mono">
						{data.caseNumber}
					</ItemDescription>
				</ItemContent>
			</Item>

			{/* Status */}
			<Item variant="outline">
				<ItemContent className="gap-1">
					<ItemTitle className="flex items-center gap-2">
						<CheckCircle className="size-4" />
						Status
					</ItemTitle>
					<ItemDescription
						className={`font-medium capitalize ${statusColors[data.status] || "text-foreground"}`}
					>
						{data.status.replace(/-/g, " ")}
					</ItemDescription>
				</ItemContent>
			</Item>

			{/* Priority */}
			<Item variant="outline">
				<ItemContent className="gap-1">
					<ItemTitle className="flex items-center gap-2">
						<AlertCircle className="size-4" />
						Priority
					</ItemTitle>
					<ItemDescription
						className={`font-medium capitalize ${priorityColors[data.priority] || "text-foreground"}`}
					>
						{data.priority}
					</ItemDescription>
				</ItemContent>
			</Item>

			{/* Type */}
			<Item variant="outline">
				<ItemContent className="gap-1">
					<ItemTitle className="flex items-center gap-2">
						<Tag className="size-4" />
						Type
					</ItemTitle>
					<ItemDescription className="text-foreground flex items-center gap-2">
						{typeIcons[data.type]}
						<span className="capitalize">{data.type.replace(/-/g, " ")}</span>
					</ItemDescription>
				</ItemContent>
			</Item>

			{/* Description */}
			{data.description && (
				<Item variant="outline">
					<ItemContent className="gap-2">
						<ItemTitle className="flex items-center gap-2">
							<FileText className="size-4" />
							Description
						</ItemTitle>
						<div
							className="text-sm text-muted-foreground prose prose-sm max-w-none"
							dangerouslySetInnerHTML={{ __html: data.description }}
						/>
					</ItemContent>
				</Item>
			)}

			{/* Owner - Relation */}
			{data.expand?.owner && (
				<Item variant="outline">
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

			{/* Contact - Relation */}
			{data.expand?.contact && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<User className="size-4" />
							Contact
						</ItemTitle>
						<ItemDescription className="text-foreground font-medium">
							{data.expand.contact.name}
						</ItemDescription>
						{data.expand.contact.email && (
							<ItemDescription className="text-muted-foreground text-xs">
								{data.expand.contact.email}
							</ItemDescription>
						)}
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

export default CaseRecord;
