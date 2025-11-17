"use client";

import {
	AudioWaveform,
	BookOpen,
	Bot,
	Building,
	Check,
	Command,
	FileText,
	Frame,
	GalleryVerticalEnd,
	LifeBuoy,
	ListOrdered,
	Map as MapIcon,
	Megaphone,
	MessageCircle,
	Package,
	PackageSearch,
	Settings2,
	SquareTerminal,
	TrendingUp,
	User2,
	UserPlus,
} from "lucide-react";
import type * as React from "react";
import { NavMain } from "@/components/nav-main";
import { SubSystemSwitcher } from "@/components/subsystem-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
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

const navigation: SidebarType = {
	subSystems: [
		{
			name: "Customer Relation",
			logo: GalleryVerticalEnd,
			urlToMatch: "/dashboard/customer-relations",
			href: "/dashboard/customer-relations/companies",
		},
		{
			name: "Warehouse Management",
			logo: GalleryVerticalEnd,
			urlToMatch: "/dashboard/warehouse-management",
			href: "/dashboard/warehouse-management/products",
		},
		{
			name: "Billing Management",
			logo: GalleryVerticalEnd,
			urlToMatch: "/dashboard/billing-management",
			href: "/dashboard/billing-management/invoices",
		},
		{
			name: "Transport Management",
			logo: GalleryVerticalEnd,
			urlToMatch: "/dashboard/transport-management",
			href: "/dashboard/transport-management/trips",
		},
		{
			name: "Delivery Management",
			logo: GalleryVerticalEnd,
			urlToMatch: "/dashboard/delivery-management",
			href: "/dashboard/delivery-management/tasks",
		},
	],
	navMain: [
		{
			subSystemUrl: "/dashboard/customer-relations",
			navigation: [
				{
					title: "Core",
					items: [
						{
							title: "Companies",
							icon: Building,
							url: "/dashboard/customer-relations/companies",
						},
						{
							title: "Contacts",
							icon: User2,
							url: "/dashboard/customer-relations/contacts",
						},
						{
							title: "Leads",
							icon: UserPlus,
							url: "/dashboard/customer-relations/leads",
						},
						{
							title: "Opportunities",
							icon: TrendingUp,
							url: "/dashboard/customer-relations/opportunities",
						},
					],
				},
				{
					title: "Sales",
					items: [
						{
							title: "Campaigns",
							icon: Megaphone,
							url: "/dashboard/customer-relations/campaigns",
						},
						{
							title: "Products",
							icon: Package,
							url: "/dashboard/customer-relations/products",
						},
					],
				},
				{
					title: "Billing",
					items: [
						{
							title: "Invoices",
							icon: FileText,
							url: "/dashboard/customer-relations/invoices",
						},
					],
				},
				{
					title: "Support",
					items: [
						{
							title: "Cases",
							icon: LifeBuoy,
							url: "/dashboard/customer-relations/cases",
						},
						{
							title: "Interactions",
							icon: MessageCircle,
							url: "/dashboard/customer-relations/interactions",
						},
					],
				},
			],
		},
		{
			subSystemUrl: "/dashboard/warehouse-management",
			navigation: [
				{
					title: "Inventory",
					items: [
						{
							title: "Products",
							icon: Package,
							url: "/dashboard/warehouse-management/products",
						},
						{
							title: "Inventory Stock",
							icon: ListOrdered,
							url: "/dashboard/warehouse-management/inventory-stock",
						},
						{
							title: "Inventory Batch",
							icon: Bot,
							url: "/dashboard/warehouse-management/inventory-batches",
						},
						{
							title: "Inventory Adjustment",
							icon: Settings2,
							url: "/dashboard/warehouse-management/inventory-adjustment",
						},
					],
				},
				{
					title: "Warehouse Operations",
					items: [
						{
							title: "Warehouses",
							icon: Building,
							url: "/dashboard/warehouse-management/warehouses",
						},
						{
							title: "Locations",
							icon: MapIcon,
							url: "/dashboard/warehouse-management/locations",
						},
						{
							title: "Tasks",
							icon: Command,
							url: "/dashboard/warehouse-management/tasks",
						},
						{
							title: "Pick Batches",
							icon: PackageSearch,
							url: "/dashboard/warehouse-management/pick-batches",
						},
						{
							title: "Stock Transfers",
							icon: SquareTerminal,
							url: "/dashboard/warehouse-management/stock-transfer",
						},
						{
							title: "Returns",
							icon: BookOpen,
							url: "/dashboard/warehouse-management/returns",
						},
					],
				},
				{
					title: "Suppliers & Orders",
					items: [
						{
							title: "Suppliers",
							icon: User2,
							url: "/dashboard/warehouse-management/suppliers",
						},
						{
							title: "Sales Orders",
							icon: FileText,
							url: "/dashboard/warehouse-management/sales-orders",
						},
						{
							title: "Inbound Shipments",
							icon: TrendingUp,
							url: "/dashboard/warehouse-management/inbound-shipments",
						},
						{
							title: "Outbound Shipments",
							icon: TrendingUp,
							url: "/dashboard/warehouse-management/outbound-shipments",
						},
					],
				},
				{
					title: "Rules & Thresholds",
					items: [
						{
							title: "Reorder Points",
							icon: AudioWaveform,
							url: "/dashboard/warehouse-management/reorder-points",
						},
						{
							title: "Bin Thresholds",
							icon: Frame,
							url: "/dashboard/warehouse-management/bin-threshold",
						},
						{
							title: "Putaway Rules",
							icon: Command,
							url: "/dashboard/warehouse-management/putaway-rules",
						},
					],
				},
			],
		},
		{
			subSystemUrl: "/dashboard/billing-management",
			navigation: [
				{
					title: "Financials",
					items: [
						{
							title: "Invoices",
							icon: FileText,
							url: "/dashboard/billing-management/invoices",
						},
						{
							title: "Payments",
							icon: FileText,
							url: "/dashboard/billing-management/payments",
						},
						{
							title: "Credit Notes",
							icon: FileText,
							url: "/dashboard/billing-management/credit-notes",
						},
						{
							title: "Quotes",
							icon: FileText,
							url: "/dashboard/billing-management/quotes",
						},
					],
				},
				{
					title: "Accounts & Disputes",
					items: [
						{
							title: "Client Accounts",
							icon: User2,
							url: "/dashboard/billing-management/client-accounts",
						},
						{
							title: "Disputes",
							icon: LifeBuoy,
							url: "/dashboard/billing-management/disputes",
						},
					],
				},
				{
					title: "Rates & Sync",
					items: [
						{
							title: "Rate Cards",
							icon: FileText,
							url: "/dashboard/billing-management/rate-cards",
						},
						{
							title: "Rate Rules",
							icon: FileText,
							url: "/dashboard/billing-management/rate-rules",
						},
						{
							title: "Surcharges",
							icon: FileText,
							url: "/dashboard/billing-management/surcharges",
						},
						{
							title: "Accounting Sync Logs",
							icon: FileText,
							url: "/dashboard/billing-management/account-logs",
						},
					],
				},
			],
		},
		{
			subSystemUrl: "/dashboard/transport-management",
			navigation: [
				{
					title: "Operations",
					items: [
						{
							title: "Trips",
							icon: MapIcon,
							url: "/dashboard/transport-management/trips",
						},
						{
							title: "Routes",
							icon: MapIcon,
							url: "/dashboard/transport-management/routes",
						},
						{
							title: "Shipment Legs",
							icon: SquareTerminal,
							url: "/dashboard/transport-management/shipment-legs",
						},
						{
							title: "Proof of Delivery",
							icon: Check,
							url: "/dashboard/transport-management/proof-of-deliveries",
						},
					],
				},
				{
					title: "Fleet & Drivers",
					items: [
						{
							title: "Drivers",
							icon: User2,
							url: "/dashboard/transport-management/drivers",
						},
						{
							title: "Vehicles",
							icon: Building,
							url: "/dashboard/transport-management/vehicles",
						},
						{
							title: "GPS Pings",
							icon: MapIcon,
							url: "/dashboard/transport-management/gps-pings",
						},
						{
							title: "Geofences",
							icon: Frame,
							url: "/dashboard/transport-management/geofence",
						},
					],
				},
				{
					title: "Financials",
					items: [
						{
							title: "Expenses",
							icon: FileText,
							url: "/dashboard/transport-management/expenses",
						},
						{
							title: "Partner Invoices",
							icon: FileText,
							url: "/dashboard/transport-management/partner-invoice",
						},
					],
				},
			],
		},
		{
			subSystemUrl: "/dashboard/delivery-management",
			navigation: [
				{
					title: "Deliveries",
					items: [
						{
							title: "Delivery Tasks",
							icon: Command,
							url: "/dashboard/delivery-management/tasks",
						},
						{
							title: "Delivery Routes",
							icon: MapIcon,
							url: "/dashboard/delivery-management/routes",
						},
						{
							title: "Task Events",
							icon: SquareTerminal,
							url: "/dashboard/delivery-management/task-events",
						},
						{
							title: "Proof of Deliveries",
							icon: Check,
							url: "/dashboard/delivery-management/proof-of-deliveries",
						},
						{
							title: "Driver Location",
							icon: MapIcon,
							url: "/dashboard/delivery-management/driver-location",
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
				<SubSystemSwitcher subSystems={navigation.subSystems} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain systemNavs={navigation.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
