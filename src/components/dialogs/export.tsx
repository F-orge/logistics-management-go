import {
	useNavigate,
	useParams,
	useRouteContext,
	useSearch,
} from "@tanstack/react-router";
import { format as formatDate, subDays } from "date-fns";
import { ChevronDownIcon, Download, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldTitle,
} from "../ui/field";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type ExportFormat = "json" | "csv";

const ExportData = () => {
	const params = useParams({ from: "/dashboard/$schema/$collection" });
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const [exportFormat, setExportFormat] = useState<ExportFormat>("json");
	const [loading, setLoading] = useState(false);
	const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
		// Default to last 30 days
		const today = new Date();
		const thirtyDaysAgo = subDays(today, 30);
		return {
			from: thirtyDaysAgo,
			to: today,
		};
	});

	const isOpen = searchQuery.action === "export";

	// Convert Date to ISO string for PocketBase filter (UTC)
	const getUTCDateString = (date: Date): string => {
		const localDate = new Date(date);
		localDate.setHours(0, 0, 0, 0);
		return localDate.toISOString();
	};

	const getUTCEndDateString = (date: Date): string => {
		const localDate = new Date(date);
		localDate.setHours(23, 59, 59, 999);
		return localDate.toISOString();
	};

	// CSV conversion
	const convertToCSV = (records: Record<string, unknown>[]): string => {
		if (records.length === 0) return "";

		// Get all unique keys (headers)
		const headers = Array.from(
			new Set(records.flatMap((record) => Object.keys(record))),
		);

		// Create header row
		const headerRow = headers
			.map((header) => `"${header.replace(/"/g, '""')}"`)
			.join(",");

		// Create data rows
		const dataRows = records.map((record) => {
			return headers
				.map((header) => {
					const value = record[header];
					// Escape and quote values
					const stringValue =
						value === null || value === undefined
							? ""
							: String(value).replace(/"/g, '""');
					return `"${stringValue}"`;
				})
				.join(",");
		});

		return [headerRow, ...dataRows].join("\n");
	};

	// JSON conversion
	const convertToJSON = (records: Record<string, unknown>[]): string => {
		return JSON.stringify(records, null, 2);
	};

	// Get collection name from params
	const getCollectionName = (): string => {
		const { schema, collection } = params;
		return `${schema}_${collection}`.replaceAll("-", "_");
	};

	// Fetch and export data
	const handleExport = async () => {
		if (!dateRange?.from || !dateRange?.to) {
			toast.error("Please select a date range");
			return;
		}

		setLoading(true);
		try {
			const collectionName = getCollectionName();
			const startDate = getUTCDateString(dateRange.from);
			const endDate = getUTCEndDateString(dateRange.to);

			// Build filter query
			const filterQuery = `created >= "${startDate}" && created <= "${endDate}"`;

			// Fetch all records with pagination
			const allRecords: Record<string, unknown>[] = [];
			let page = 1;
			const pageSize = 1000;

			let hasMore = true;
			while (hasMore) {
				const result = await pocketbase
					.collection(collectionName)
					.getList(page, pageSize, {
						filter: filterQuery,
						sort: "-created",
					});

				// Filter to single-level fields only (no nested objects)
				const flatRecords = result.items.map(
					(item: Record<string, unknown>) => {
						const flatItem: Record<string, unknown> = {};
						Object.entries(item).forEach(([key, value]) => {
							// Only include non-object values or system fields
							if (
								typeof value !== "object" ||
								value === null ||
								Array.isArray(value)
							) {
								flatItem[key] = value;
							}
						});
						return flatItem;
					},
				);

				allRecords.push(...flatRecords);

				hasMore = result.items.length === pageSize;
				page += 1;
			}

			// Convert to selected format
			let content: string;
			let fileExtension: string;
			let mimeType: string;

			if (exportFormat === "csv") {
				content = convertToCSV(allRecords);
				fileExtension = "csv";
				mimeType = "text/csv;charset=utf-8;";
			} else {
				content = convertToJSON(allRecords);
				fileExtension = "json";
				mimeType = "application/json;charset=utf-8;";
			} // Create blob and download
			const blob = new Blob([content], { type: mimeType });
			const link = document.createElement("a");
			const url = URL.createObjectURL(blob);
			const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
			const filename = `${params.collection}-${timestamp}.${fileExtension}`;

			link.setAttribute("href", url);
			link.setAttribute("download", filename);
			link.style.visibility = "hidden";

			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);

			toast.success(`Exported ${allRecords.length} records to ${filename}`);

			// Close dialog
			navigate({
				search: (prev) => ({ ...prev, action: undefined }),
			});
		} catch (error) {
			console.error("Export error:", error);
			toast.error(
				error instanceof Error ? error.message : "Failed to export data",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={() => {
				navigate({
					search: (prev) => ({ ...prev, action: undefined }),
				});
			}}
		>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Export Data</DialogTitle>
					<DialogDescription>
						Select date range and format to export {params.collection} records
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6">
					{/* Date Range Picker */}
					<div className="space-y-3">
						<Label>Date Range</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className="w-full justify-between font-normal"
								>
									<span>
										{dateRange?.from && dateRange?.to
											? `${formatDate(
													dateRange.from,
													"MMM d, yyyy",
												)} - ${formatDate(dateRange.to, "MMM d, yyyy")}`
											: "Select date range"}
									</span>
									<ChevronDownIcon className="h-4 w-4 opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent
								className="w-auto overflow-hidden p-0"
								align="start"
							>
								<Calendar
									mode="range"
									selected={dateRange}
									onSelect={setDateRange}
									numberOfMonths={2}
									className="rounded-lg border"
									disabled={(date) => date > new Date()}
								/>
							</PopoverContent>
						</Popover>
						{dateRange?.from && (
							<p className="text-xs text-muted-foreground">
								{dateRange?.to
									? `${
											(
												new Date(dateRange.to).getTime() -
													new Date(dateRange.from).getTime()
											) /
												(1000 * 60 * 60 * 24) +
											1
										} days selected`
									: "Select end date"}
							</p>
						)}
					</div>

					{/* Format Selection */}
					<div className="space-y-3">
						<Label>Export Format</Label>
						<RadioGroup
							value={exportFormat}
							onValueChange={(value) => setExportFormat(value as ExportFormat)}
							className="gap-3"
						>
							<FieldLabel htmlFor="json">
								<Field orientation="horizontal">
									<FieldContent>
										<FieldTitle>JSON</FieldTitle>
										<FieldDescription>
											Structured data format with full record information
										</FieldDescription>
									</FieldContent>
									<RadioGroupItem value="json" id="json" />
								</Field>
							</FieldLabel>

							<FieldLabel htmlFor="csv">
								<Field orientation="horizontal">
									<FieldContent>
										<FieldTitle>CSV</FieldTitle>
										<FieldDescription>
											Comma-separated values for spreadsheet applications
										</FieldDescription>
									</FieldContent>
									<RadioGroupItem value="csv" id="csv" />
								</Field>
							</FieldLabel>
						</RadioGroup>
					</div>
				</div>

				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => {
							navigate({
								search: (prev) => ({
									...prev,
									action: undefined,
								}),
							});
						}}
						disabled={loading}
					>
						Cancel
					</Button>
					<Button onClick={handleExport} disabled={loading} className="gap-2">
						{loading ? (
							<>
								<Loader2 className="h-4 w-4 animate-spin" />
								Exporting...
							</>
						) : (
							<>
								<Download className="h-4 w-4" />
								Export
							</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ExportData;
