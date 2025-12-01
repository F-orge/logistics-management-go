import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import {
	Box,
	Calendar,
	DollarSign,
	FileText,
	Package,
	RotateCw,
	Tag,
	Zap,
} from "lucide-react";
import React from "react";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from "@/components/ui/item";
import { CustomerRelationsProductsResponse } from "@/lib/pb.types";

const typeColors: Record<string, string> = {
	service: "text-blue-600",
	good: "text-green-600",
	digital: "text-purple-600",
	subscription: "text-orange-600",
};

const typeIcons: Record<string, React.ReactNode> = {
	service: <Package className="size-4" />,
	good: <Box className="size-4" />,
	digital: <Zap className="size-4" />,
	subscription: <RotateCw className="size-4" />,
};

const ProductRecord = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useSuspenseQuery({
		queryKey: ["product", searchQuery.id],
		queryFn: async () => {
			if (!searchQuery.id) return null;
			return pocketbase
				.collection("customer_relations_products")
				.getOne<CustomerRelationsProductsResponse>(searchQuery.id);
		},
	});

	if (!data) {
		return <ItemGroup>No product data available</ItemGroup>;
	}

	return (
		<ItemGroup className="gap-3">
			{/* Product Name */}
			<Item variant="outline">
				<ItemContent className="gap-1">
					<ItemTitle className="flex items-center gap-2">
						<Package className="size-4" />
						Product Name
					</ItemTitle>
					<ItemDescription className="text-foreground font-medium">
						{data.name}
					</ItemDescription>
				</ItemContent>
			</Item>

			{/* SKU */}
			{data.sku && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Tag className="size-4" />
							SKU
						</ItemTitle>
						<ItemDescription className="text-foreground font-mono">
							{data.sku}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Type */}
			{data.type && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							{typeIcons[data.type]}
							Type
						</ItemTitle>
						<ItemDescription
							className={`font-medium capitalize ${typeColors[data.type]}`}
						>
							{data.type}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Price */}
			{data.price !== null && data.price !== undefined && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<DollarSign className="size-4" />
							Price
						</ItemTitle>
						<ItemDescription className="text-foreground font-medium text-lg">
							{new Intl.NumberFormat("en-US", {
								style: "currency",
								currency: "USD",
							}).format(data.price)}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Description */}
			{data.description && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<FileText className="size-4" />
							Description
						</ItemTitle>
						<ItemDescription className="text-foreground text-sm">
							<div
								dangerouslySetInnerHTML={{ __html: data.description }}
								className="prose prose-sm dark:prose-invert max-w-none"
							/>
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
									className="text-primary hover:underline text-xs block truncate"
								>
									{attachment}
								</a>
							))}
						</div>
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

export default ProductRecord;
