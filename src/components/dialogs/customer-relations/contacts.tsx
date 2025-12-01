import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import {
	Briefcase,
	Building2,
	FileText,
	Link as LinkIcon,
	Mail,
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
import { CustomerRelationsContactsResponse, UsersRecord } from "@/lib/pb.types";

const ContactRecord = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useSuspenseQuery({
		queryKey: ["contact", searchQuery.id],
		queryFn: async () => {
			if (!searchQuery.id) return null;
			return pocketbase.collection("customer_relations_contacts").getOne<
				CustomerRelationsContactsResponse & {
					expand?: {
						owner?: UsersRecord;
					};
				}
			>(searchQuery.id, { expand: "owner" });
		},
	});

	if (!data) {
		return <ItemGroup>No contact data available</ItemGroup>;
	}

	return (
		<ItemGroup className="gap-3">
			{/* Contact Name */}
			<Item variant="outline">
				<ItemContent className="gap-1">
					<ItemTitle className="flex items-center gap-2">
						<User className="size-4" />
						Contact Name
					</ItemTitle>
					<ItemDescription className="text-foreground font-medium">
						{data.name}
					</ItemDescription>
				</ItemContent>
			</Item>

			{/* Email */}
			<Item variant="outline" asChild>
				<a href={`mailto:${data.email}`}>
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Mail className="size-4" />
							Email
						</ItemTitle>
						<ItemDescription className="truncate text-primary hover:underline">
							{data.email}
						</ItemDescription>
					</ItemContent>
				</a>
			</Item>

			{/* Phone Number */}
			{data.phoneNumber && (
				<Item variant="outline" asChild>
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

			{/* Job Title */}
			{data.jobTitle && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Briefcase className="size-4" />
							Job Title
						</ItemTitle>
						<ItemDescription className="text-foreground">
							{data.jobTitle}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Company - Relation */}
			{data.company && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Building2 className="size-4" />
							Company
						</ItemTitle>
					</ItemContent>
					<ItemActions>
						<Button variant="outline" size="sm" asChild>
							<a
								href={`/dashboard/customer-relations/companies?action=view&id=${data.company}`}
							>
								<LinkIcon className="size-3" />
								View
							</a>
						</Button>
					</ItemActions>
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

export default ContactRecord;
