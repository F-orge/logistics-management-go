import { UseNavigateResult, useSearch } from "@tanstack/react-router";
import { type ClassValue, clsx } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type GlobalAction<TNavigation extends string> = {
	label: string;
	onSelect?: (navigate: UseNavigateResult<TNavigation>) => Promise<void> | void;
	icon?:
		| React.ReactNode
		| ((searchQuery?: {
				page: number;
				perPage: number;
				filter?: string;
				sort?: string;
				action?: string;
				id?: string;
		  }) => React.ReactNode);
	disabled?: boolean;
	variant?: "default" | "destructive";
	divider?: boolean;
	submenu?: GlobalAction<TNavigation>[];
};
