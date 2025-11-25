import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemHeader,
	ItemMedia,
	ItemTitle,
} from "@/components/ui/item";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type DataDialogProps = {
	data: unknown;
	title?: React.ReactNode;
	description?: React.ReactNode;
	trigger?: React.ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	showCloseButton?: boolean;
	variant?: "table" | "list" | "auto";
};

/**
 * Renders generic data as a dialog with automatic layout selection.
 * - Objects: Displays as a list of key-value pairs using Item components
 * - Arrays of objects: Displays as a table
 * - Arrays of primitives: Displays as a list
 * - Nested structures: Recursively rendered
 */
const DataDialog = ({
	data,
	title = "Data",
	description,
	trigger = "View Data",
	open: controlledOpen,
	onOpenChange,
	showCloseButton = true,
	variant = "auto",
}: DataDialogProps) => {
	const [internalOpen, setInternalOpen] = React.useState(false);
	const isControlled = controlledOpen !== undefined;
	const isOpen = isControlled ? controlledOpen : internalOpen;
	const setOpen = (value: boolean) => {
		if (isControlled) {
			onOpenChange?.(value);
		} else {
			setInternalOpen(value);
		}
	};

	const isArrayOfObjects = (
		value: unknown,
	): value is Record<string, unknown>[] =>
		Array.isArray(value) &&
		value.length > 0 &&
		typeof value[0] === "object" &&
		value[0] !== null;

	const isArrayOfPrimitives = (value: unknown): value is unknown[] =>
		Array.isArray(value) && value.every((item) => typeof item !== "object");

	const renderPrimitive = (value: unknown): string => {
		if (value === null) return "null";
		if (value === undefined) return "undefined";
		if (typeof value === "boolean") return value ? "true" : "false";
		return String(value);
	};

	const renderObjectAsTable = (
		data: Record<string, unknown>[] | null | undefined,
	) => {
		if (!data || !isArrayOfObjects(data)) {
			return null;
		}

		const keys = Array.from(
			new Set(data.flatMap((item) => Object.keys(item))),
		).slice(0, 10); // Limit columns to 10

		return (
			<div className="border rounded-lg overflow-hidden">
				<Table>
					<TableHeader>
						<TableRow>
							{keys.map((key) => (
								<TableHead key={key} className="truncate">
									{key}
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map((row, rowIdx) => (
							<TableRow key={rowIdx}>
								{keys.map((key) => (
									<TableCell
										key={`${rowIdx}-${key}`}
										className="truncate max-w-xs"
									>
										{typeof row[key] === "object"
											? JSON.stringify(row[key])
											: renderPrimitive(row[key])}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		);
	};

	const renderObjectAsItems = (
		obj: Record<string, unknown>,
		depth = 0,
	): React.ReactNode => {
		if (depth > 5) return <span className="text-muted-foreground">...</span>;

		const entries = Object.entries(obj);

		return (
			<ItemGroup>
				{entries.map(([key, value], idx) => (
					<Item
						key={`${key}-${idx}`}
						variant={idx % 2 === 0 ? "default" : "muted"}
					>
						<ItemHeader className="w-full">
							<ItemTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								{key}
							</ItemTitle>
						</ItemHeader>
						<ItemContent className="w-full">
							{typeof value === "object" && value !== null ? (
								<div className="ml-2 text-xs border-l-2 border-muted pl-2">
									{Array.isArray(value) ? (
										value.length > 0 && typeof value[0] === "object" ? (
											<Table>
												<TableBody>
													{value.map((item, itemIdx) => (
														<TableRow key={itemIdx}>
															<TableCell className="text-xs">
																{JSON.stringify(item).slice(0, 50)}
																{JSON.stringify(item).length > 50 ? "..." : ""}
															</TableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>
										) : (
											<div className="space-y-1">
												{value.map((item, itemIdx) => (
													<div
														key={itemIdx}
														className="text-xs text-muted-foreground"
													>
														• {renderPrimitive(item)}
													</div>
												))}
											</div>
										)
									) : (
										renderObjectAsItems(
											value as Record<string, unknown>,
											depth + 1,
										)
									)}
								</div>
							) : (
								<ItemDescription className="text-xs font-mono wrap-break-word">
									{renderPrimitive(value)}
								</ItemDescription>
							)}
						</ItemContent>
					</Item>
				))}
			</ItemGroup>
		);
	};

	const renderArrayAsList = (arr: unknown[]) => {
		return (
			<ItemGroup>
				{arr.map((item, idx) => (
					<Item key={idx} variant={idx % 2 === 0 ? "default" : "muted"}>
						<ItemContent>
							{typeof item === "object" && item !== null ? (
								<div className="text-xs border-l-2 border-muted pl-2">
									{JSON.stringify(item).slice(0, 100)}
									{JSON.stringify(item).length > 100 ? "..." : ""}
								</div>
							) : (
								<ItemDescription className="text-xs font-mono">
									{renderPrimitive(item)}
								</ItemDescription>
							)}
						</ItemContent>
					</Item>
				))}
			</ItemGroup>
		);
	};

	const selectRenderer = () => {
		if (variant === "table") {
			return renderObjectAsTable(
				isArrayOfObjects(data)
					? data
					: Array.isArray(data)
						? null
						: [data as Record<string, unknown>],
			);
		}

		if (variant === "list") {
			if (Array.isArray(data)) {
				return isArrayOfObjects(data)
					? renderObjectAsItems(data[0] as Record<string, unknown>)
					: renderArrayAsList(data);
			}
			return renderObjectAsItems(data as Record<string, unknown>);
		}

		// Auto variant
		if (isArrayOfObjects(data)) {
			return renderObjectAsTable(data);
		}

		if (isArrayOfPrimitives(data)) {
			return renderArrayAsList(data);
		}

		if (typeof data === "object" && data !== null) {
			return renderObjectAsItems(data as Record<string, unknown>);
		}

		return (
			<div className="text-muted-foreground text-sm">
				{renderPrimitive(data)}
			</div>
		);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button className="text-xs underline underline-offset-2 hover:text-primary transition-colors">
					{trigger}
				</button>
			</DialogTrigger>
			<DialogContent
				showCloseButton={showCloseButton}
				className="max-w-2xl max-h-[80vh] overflow-y-auto"
			>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description && <DialogDescription>{description}</DialogDescription>}
				</DialogHeader>
				<div className="mt-4">{selectRenderer()}</div>
			</DialogContent>
		</Dialog>
	);
};

export default DataDialog;
