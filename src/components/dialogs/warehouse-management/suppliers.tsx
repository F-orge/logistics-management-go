import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import { Calendar, Mail, Phone, User } from "lucide-react";
import React from "react";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from "@/components/ui/item";
import {
	CustomerRelationsCompaniesResponse,
	WarehouseManagementSuppliersResponse,
} from "@/lib/pb.types";

const SupplierRecord = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useSuspenseQuery({
		queryKey: ["supplier", searchQuery.id],
		queryFn: async () => {
			if (!searchQuery.id) return null;
			return pocketbase.collection("warehouse_management_suppliers").getOne<
				WarehouseManagementSuppliersResponse & {
					expand?: {
						client?: CustomerRelationsCompaniesResponse;
					};
				}
			>(searchQuery.id, { expand: "client" });
		},
	});

	if (!data) {
		return <ItemGroup>No supplier data available</ItemGroup>;
	}

	return (
		<ItemGroup className="gap-3">
			{/* Name */}
			{data.name && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<User className="size-4" />
							Supplier Name
						</ItemTitle>
						<ItemDescription className="text-foreground font-medium">
							{data.name}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Client */}
			{data.expand?.client && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<User className="size-4" />
							Client
						</ItemTitle>
						<ItemDescription className="text-foreground font-medium">
							{data.expand.client.name}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Contact Person */}
			{data.contactPerson && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<User className="size-4" />
							Contact Person
						</ItemTitle>
						<ItemDescription className="text-foreground font-medium">
							{data.contactPerson}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Email */}
			{data.email && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Mail className="size-4" />
							Email
						</ItemTitle>
						<ItemDescription>
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

			{/* Phone Number */}
			{data.phoneNumber && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Phone className="size-4" />
							Phone Number
						</ItemTitle>
						<ItemDescription>
							<a
								href={`tel:${data.phoneNumber}`}
								className="text-primary hover:underline"
							>
								{data.phoneNumber}
							</a>
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

export default SupplierRecord;
