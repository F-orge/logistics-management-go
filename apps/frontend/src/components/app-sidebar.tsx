"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@packages/ui/components/ui/sidebar";
import {
	AudioWaveform,
	Bell,
	BookOpen,
	Bot,
	Building,
	Check,
	Command,
	FileText,
	Frame,
	GalleryVerticalEnd,
	LifeBuoy,
	Link,
	ListOrdered,
	Map as MapIcon,
	Megaphone,
	MessageCircle,
	Package,
	PackageSearch,
	PieChart,
	Settings2,
	SquareTerminal,
	TrendingUp,
	User2,
	UserPlus,
} from "lucide-react";
import type * as React from "react";
import { NavMain } from "@/components/nav-main";
import { SubSystemSwitcher } from "@/components/subsystem-switcher";
import { NavUser } from "./nav-user";

export type SidebarType = {
	subSystems: {
		name: string;
		logo: React.ElementType;
		urlToMatch: string;
		href: string;
	}[];
	navMain: {
		subSystemUrl: string;
		navigation: {
			title: string;
			items: {
				title: string;
				url: string;
				icon: React.ElementType;
				items?: {
					title: string;
					url: string;
				}[];
			}[];
		}[];
	}[];
};

const data: SidebarType = {
	subSystems: [
		{
			name: "Customer Relation",
			logo: GalleryVerticalEnd,
			urlToMatch: "/dashboard/crm",
			href: "/dashboard/crm/companies",
		},
		{
			name: "Warehouse Management",
			logo: GalleryVerticalEnd,
			urlToMatch: "/dashboard/wms",
			href: "/dashboard/wms/products",
		},
		{
			name: "Billing Management",
			logo: GalleryVerticalEnd,
			urlToMatch: "/dashboard/billing",
			href: "/dashboard/billing/invoices",
		},
		{
			name: "Transport Management",
			logo: GalleryVerticalEnd,
			urlToMatch: "/dashboard/tms",
			href: "/dashboard/tms/trips",
		},
		{
			name: "Delivery Management",
			logo: GalleryVerticalEnd,
			urlToMatch: "/dashboard/dms",
			href: "/dashboard/dms/delivery-tasks",
		},
	],
	navMain: [
		{
			subSystemUrl: "/dashboard/crm",
			navigation: [
				{
					title: "Core",
					items: [
						{
							title: "Companies",
							icon: Building,
							url: "/dashboard/crm/companies",
						},
						{
							title: "Contacts",
							icon: User2,
							url: "/dashboard/crm/contacts",
						},
						{
							title: "Leads",
							icon: UserPlus,
							url: "/dashboard/crm/leads",
						},
						{
							title: "Opportunities",
							icon: TrendingUp,
							url: "/dashboard/crm/opportunities",
						},
					],
				},
				{
					title: "Sales",
					items: [
						{
							title: "Campaigns",
							icon: Megaphone,
							url: "/dashboard/crm/campaigns",
						},
						{
							title: "Products",
							icon: Package,
							url: "/dashboard/crm/products",
						},
					],
				},
				{
					title: "Billing",
					items: [
						{
							title: "Invoices",
							icon: FileText,
							url: "/dashboard/crm/invoices",
						},
					],
				},
				{
					title: "Support",
					items: [
						{
							title: "Cases",
							icon: LifeBuoy,
							url: "/dashboard/crm/cases",
						},
						{
							title: "Interactions",
							icon: MessageCircle,
							url: "/dashboard/crm/interactions",
						},
						{
							title: "Notifications",
							icon: Bell,
							url: "/dashboard/crm/notifications",
						},
					],
				},
			],
		},
		{
			subSystemUrl: "/dashboard/wms",
			navigation: [
				{
					title: "Inventory",
					items: [
						{
							title: "Products",
							icon: Package,
							url: "/dashboard/wms/products",
						},
						{
							title: "Inventory Stock",
							icon: ListOrdered,
							url: "/dashboard/wms/inventory-stock",
						},
						{
							title: "Inventory Batch",
							icon: Bot,
							url: "/dashboard/wms/inventory-batches",
						},
						{
							title: "Inventory Adjustment",
							icon: Settings2,
							url: "/dashboard/wms/inventory-adjustments",
						},
					],
				},
				{
					title: "Warehouse Operations",
					items: [
						{
							title: "Warehouses",
							icon: Building,
							url: "/dashboard/wms/warehouses",
						},
						{
							title: "Locations",
							icon: MapIcon,
							url: "/dashboard/wms/locations",
						},
						{
							title: "Tasks",
							icon: Command,
							url: "/dashboard/wms/tasks",
						},
						{
							title: "Pick Batches",
							icon: PackageSearch,
							url: "/dashboard/wms/pick-batches",
						},
						{
							title: "Stock Transfers",
							icon: SquareTerminal,
							url: "/dashboard/wms/stock-transfers",
						},
						{
							title: "Returns",
							icon: BookOpen,
							url: "/dashboard/wms/returns",
						},
					],
				},
				{
					title: "Suppliers & Orders",
					items: [
						{
							title: "Suppliers",
							icon: User2,
							url: "/dashboard/wms/suppliers",
						},
						{
							title: "Sales Orders",
							icon: FileText,
							url: "/dashboard/wms/sales-orders",
						},
						{
							title: "Inbound Shipments",
							icon: TrendingUp,
							url: "/dashboard/wms/inbound-shipments",
						},
						{
							title: "Outbound Shipments",
							icon: TrendingUp,
							url: "/dashboard/wms/outbound-shipments",
						},
					],
				},
				{
					title: "Rules & Thresholds",
					items: [
						{
							title: "Reorder Points",
							icon: AudioWaveform,
							url: "/dashboard/wms/reorder-points",
						},
						{
							title: "Bin Thresholds",
							icon: Frame,
							url: "/dashboard/wms/bin-thresholds",
						},
						{
							title: "Putaway Rules",
							icon: Command,
							url: "/dashboard/wms/putaway-rules",
						},
					],
				},
			],
		},
		{
			subSystemUrl: "/dashboard/billing",
			navigation: [
				{
					title: "Financials",
					items: [
						{
							title: "Invoices",
							icon: FileText,
							url: "/dashboard/billing/invoices",
						},
						{
							title: "Payments",
							icon: FileText,
							url: "/dashboard/billing/payments",
						},
						{
							title: "Credit Notes",
							icon: FileText,
							url: "/dashboard/billing/credit-notes",
						},
						{
							title: "Quotes",
							icon: FileText,
							url: "/dashboard/billing/quotes",
						},
					],
				},
				{
					title: "Accounts & Disputes",
					items: [
						{
							title: "Client Accounts",
							icon: User2,
							url: "/dashboard/billing/client-accounts",
						},
						{
							title: "Disputes",
							icon: LifeBuoy,
							url: "/dashboard/billing/disputes",
						},
					],
				},
				{
					title: "Rates & Sync",
					items: [
						{
							title: "Rate Cards",
							icon: FileText,
							url: "/dashboard/billing/rate-cards",
						},
						{
							title: "Rate Rules",
							icon: FileText,
							url: "/dashboard/billing/rate-rules",
						},
						{
							title: "Surcharges",
							icon: FileText,
							url: "/dashboard/billing/surcharges",
						},
						{
							title: "Accounting Sync Logs",
							icon: FileText,
							url: "/dashboard/billing/accounting-sync-log",
						},
					],
				},
			],
		},
		{
			subSystemUrl: "/dashboard/tms",
			navigation: [
				{
					title: "Operations",
					items: [
						{
							title: "Trips",
							icon: MapIcon,
							url: "/dashboard/tms/trips",
						},
						{
							title: "Routes",
							icon: MapIcon,
							url: "/dashboard/tms/routes",
						},
						{
							title: "Shipment Legs",
							icon: SquareTerminal,
							url: "/dashboard/tms/shipment-legs",
						},
						{
							title: "Proof of Delivery",
							icon: Check,
							url: "/dashboard/tms/proof-of-deliveries",
						},
					],
				},
				{
					title: "Fleet & Drivers",
					items: [
						{
							title: "Drivers",
							icon: User2,
							url: "/dashboard/tms/drivers",
						},
						{
							title: "Vehicles",
							icon: Building,
							url: "/dashboard/tms/vehicles",
						},
						{
							title: "GPS Pings",
							icon: MapIcon,
							url: "/dashboard/tms/gps-pings",
						},
						{
							title: "Geofences",
							icon: Frame,
							url: "/dashboard/tms/geofences",
						},
					],
				},
				{
					title: "Financials",
					items: [
						{
							title: "Expenses",
							icon: FileText,
							url: "/dashboard/tms/expenses",
						},
						{
							title: "Partner Invoices",
							icon: FileText,
							url: "/dashboard/tms/partner-invoices",
						},
					],
				},
			],
		},
		{
			subSystemUrl: "/dashboard/dms",
			navigation: [
				{
					title: "Deliveries",
					items: [
						{
							title: "Delivery Tasks",
							icon: Command,
							url: "/dashboard/dms/delivery-tasks",
						},
						{
							title: "Delivery Routes",
							icon: MapIcon,
							url: "/dashboard/dms/delivery-routes",
						},
						{
							title: "Tasks",
							icon: Command,
							url: "/dashboard/wms/tasks",
						},
						{
							title: "Pick Batches",
							icon: PackageSearch,
							url: "/dashboard/wms/pick-batches",
						},
						{
							title: "Stock Transfers",
							icon: SquareTerminal,
							url: "/dashboard/wms/stock-transfers",
						},
						{
							title: "Returns",
							icon: BookOpen,
							url: "/dashboard/wms/returns",
						},
					],
				},
				{
					title: "Suppliers & Orders",
					items: [
						{
							title: "Suppliers",
							icon: User2,
							url: "/dashboard/wms/suppliers",
						},
						{
							title: "Sales Orders",
							icon: FileText,
							url: "/dashboard/wms/sales-orders",
						},
						{
							title: "Inbound Shipments",
							icon: TrendingUp,
							url: "/dashboard/wms/inbound-shipments",
						},
						{
							title: "Outbound Shipments",
							icon: TrendingUp,
							url: "/dashboard/wms/outbound-shipments",
						},
					],
				},
				{
					title: "Rules & Thresholds",
					items: [
						{
							title: "Reorder Points",
							icon: AudioWaveform,
							url: "/dashboard/wms/reorder-points",
						},
						{
							title: "Bin Thresholds",
							icon: Frame,
							url: "/dashboard/wms/bin-thresholds",
						},
						{
							title: "Putaway Rules",
							icon: Command,
							url: "/dashboard/wms/putaway-rules",
						},
					],
				},
			],
		},
		{
			subSystemUrl: "/dashboard/billing",
			navigation: [
				{
					title: "Financials",
					items: [
						{
							title: "Invoices",
							icon: FileText,
							url: "/dashboard/billing/invoices",
						},
						{
							title: "Payments",
							icon: FileText,
							url: "/dashboard/billing/payments",
						},
						{
							title: "Credit Notes",
							icon: FileText,
							url: "/dashboard/billing/credit-notes",
						},
						{
							title: "Quotes",
							icon: FileText,
							url: "/dashboard/billing/quotes",
						},
					],
				},
				{
					title: "Accounts & Disputes",
					items: [
						{
							title: "Client Accounts",
							icon: User2,
							url: "/dashboard/billing/client-accounts",
						},
						{
							title: "Disputes",
							icon: LifeBuoy,
							url: "/dashboard/billing/disputes",
						},
					],
				},
				{
					title: "Rates & Sync",
					items: [
						{
							title: "Rate Cards",
							icon: FileText,
							url: "/dashboard/billing/rate-cards",
						},
						{
							title: "Rate Rules",
							icon: FileText,
							url: "/dashboard/billing/rate-rules",
						},
						{
							title: "Surcharges",
							icon: FileText,
							url: "/dashboard/billing/surcharges",
						},
						{
							title: "Accounting Sync Logs",
							icon: FileText,
							url: "/dashboard/billing/accounting-sync-log",
						},
					],
				},
			],
		},
		{
			subSystemUrl: "/dashboard/tms",
			navigation: [
				{
					title: "Operations",
					items: [
						{
							title: "Trips",
							icon: MapIcon,
							url: "/dashboard/tms/trips",
						},
						{
							title: "Routes",
							icon: MapIcon,
							url: "/dashboard/tms/routes",
						},
						{
							title: "Shipment Legs",
							icon: SquareTerminal,
							url: "/dashboard/tms/shipment-legs",
						},
						{
							title: "Proof of Delivery",
							icon: Check,
							url: "/dashboard/tms/proof-of-deliveries",
						},
					],
				},
				{
					title: "Fleet & Drivers",
					items: [
						{
							title: "Drivers",
							icon: User2,
							url: "/dashboard/tms/drivers",
						},
						{
							title: "Vehicles",
							icon: Building,
							url: "/dashboard/tms/vehicles",
						},
						{
							title: "GPS Pings",
							icon: MapIcon,
							url: "/dashboard/tms/gps-pings",
						},
						{
							title: "Geofences",
							icon: Frame,
							url: "/dashboard/tms/geofences",
						},
					],
				},
				{
					title: "Financials",
					items: [
						{
							title: "Expenses",
							icon: FileText,
							url: "/dashboard/tms/expenses",
						},
						{
							title: "Partner Invoices",
							icon: FileText,
							url: "/dashboard/tms/partner-invoices",
						},
					],
				},
			],
		},
		{
			subSystemUrl: "/dashboard/dms",
			navigation: [
				{
					title: "Deliveries",
					items: [
						{
							title: "Delivery Tasks",
							icon: Command,
							url: "/dashboard/dms/delivery-tasks",
						},
						{
							title: "Delivery Routes",
							icon: MapIcon,
							url: "/dashboard/dms/delivery-routes",
						},
						{
							title: "Proof of Delivery",
							icon: Check,
							url: "/dashboard/dms/proof-of-deliveries",
						},
						{
							title: "Task Events",
							icon: ListOrdered,
							url: "/dashboard/dms/task-events",
						},
						{
							title: "Customer Tracking Links",
							icon: Link,
							url: "/dashboard/dms/customer-tracking-links",
						},
					],
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SubSystemSwitcher subSystems={data.subSystems} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain systemNavs={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
