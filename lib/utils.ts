export const closeDialogButtonRef = (
  e: HTMLDivElement | null,
  callback: () => void,
) => {
  const closeBtn = e?.querySelector('button > span.sr-only')?.parentElement;
  closeBtn?.addEventListener('click', callback);
};

import {
  Boxes,
  BriefcaseBusiness,
  Container,
  CreditCard,
  Forklift,
  LayoutDashboard,
  Logs,
  NotebookTabs,
  QrCode,
  ScrollText,
  UsersRound,
  Warehouse,
  Waypoints,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { pb } from './pocketbase';

export function checkPermission(roles: string[]) {
  return roles.includes(pb.authStore.record?.role || '');
}

// Define all possible user roles
export type UserRole =
  | 'executive'
  | 'warehouse_manager'
  | 'dispatch_coordinator'
  | 'delivery_driver'
  | 'customer_service_rep'
  | 'customer_rep'
  | 'finance_dept'
  | '';

// Navigation item type
export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  roles: UserRole[]; // Which roles can access this item
}

// Navigation group type
export interface NavGroup {
  groupName: string;
  items: NavItem[];
}

/**
 * All navigation items defined with their access roles
 */
const allNavigationItems: NavItem[] = [
  // Overview
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
    roles: [
      'executive',
      'warehouse_manager',
      'dispatch_coordinator',
      'delivery_driver',
      'customer_service_rep',
      'customer_rep',
      'finance_dept',
    ],
  },

  // Finance
  {
    title: 'Invoices',
    url: '/dashboard/invoices',
    icon: ScrollText,
    roles: ['executive', 'finance_dept', 'customer_rep'],
  },
  {
    title: 'Payments',
    url: '/dashboard/payments',
    icon: CreditCard,
    roles: ['executive', 'finance_dept'],
  },

  // Productivity
  {
    title: 'Tasks',
    url: '/dashboard/tasks',
    icon: NotebookTabs,
    roles: [
      'executive',
      'warehouse_manager',
      'dispatch_coordinator',
      'delivery_driver',
      'customer_service_rep',
    ],
  },

  // Organization
  {
    title: 'Companies',
    url: '/dashboard/companies',
    icon: BriefcaseBusiness,
    roles: [
      'executive',
      'warehouse_manager',
      'dispatch_coordinator',
      'customer_service_rep',
      'customer_rep',
      'finance_dept',
    ],
  },
  {
    title: 'Departments',
    url: '/dashboard/departments',
    icon: UsersRound,
    roles: [
      'executive',
      'warehouse_manager',
      'dispatch_coordinator',
      'customer_service_rep',
      'finance_dept',
    ],
  },
  {
    title: 'Warehouses',
    url: '/dashboard/warehouses',
    icon: Warehouse,
    roles: [
      'executive',
      'warehouse_manager',
      'dispatch_coordinator',
      'customer_service_rep',
      'finance_dept',
    ],
  },

  // Inventory
  {
    title: 'Products',
    url: '/dashboard/products',
    icon: QrCode,
    roles: ['executive', 'warehouse_manager', 'dispatch_coordinator'],
  },
  {
    title: 'Inventory',
    url: '/dashboard/inventory',
    icon: Boxes,
    roles: ['executive', 'warehouse_manager', 'dispatch_coordinator'],
  },

  // Operations
  {
    title: 'Orders',
    url: '/dashboard/orders',
    icon: Logs,
    roles: [
      'executive',
      'warehouse_manager',
      'dispatch_coordinator',
      'customer_service_rep',
      'customer_rep',
    ],
  },
  {
    title: 'Shipments',
    url: '/dashboard/shipments',
    icon: Container,
    roles: [
      'executive',
      'warehouse_manager',
      'dispatch_coordinator',
      'delivery_driver',
    ],
  },
  {
    title: 'Routes',
    url: '/dashboard/routes',
    icon: Waypoints,
    roles: ['executive', 'dispatch_coordinator', 'delivery_driver'],
  },
  {
    title: 'Vehicles',
    url: '/dashboard/vehicles',
    icon: Forklift,
    roles: ['executive', 'dispatch_coordinator'],
  },
];

// Group definitions with their items to be filtered based on role
const navigationGroups: NavGroup[] = [
  {
    groupName: 'Overview',
    items: [allNavigationItems.find((item) => item.title === 'Dashboard')!],
  },
  {
    groupName: 'Finance',
    items: [
      allNavigationItems.find((item) => item.title === 'Invoices')!,
      allNavigationItems.find((item) => item.title === 'Payments')!,
    ],
  },
  {
    groupName: 'Productivity',
    items: [allNavigationItems.find((item) => item.title === 'Tasks')!],
  },
  {
    groupName: 'Organization',
    items: [
      allNavigationItems.find((item) => item.title === 'Companies')!,
      allNavigationItems.find((item) => item.title === 'Departments')!,
      allNavigationItems.find((item) => item.title === 'Warehouses')!,
    ],
  },
  {
    groupName: 'Inventory',
    items: [
      allNavigationItems.find((item) => item.title === 'Products')!,
      allNavigationItems.find((item) => item.title === 'Inventory')!,
    ],
  },
  {
    groupName: 'Operations',
    items: [
      allNavigationItems.find((item) => item.title === 'Orders')!,
      allNavigationItems.find((item) => item.title === 'Shipments')!,
      allNavigationItems.find((item) => item.title === 'Routes')!,
      allNavigationItems.find((item) => item.title === 'Vehicles')!,
    ],
  },
];

/**
 * Returns navigation items filtered by user role
 * @param role - The user's role from pb.authStore.record.role
 * @returns Navigation item groups the user can access
 */
export function getNavigationByRole(role: UserRole): NavGroup[] {
  // Filter navigation groups based on role
  return navigationGroups
    .map((group) => {
      // Filter items in each group for this role
      const filteredItems = group.items.filter((item) =>
        item.roles.includes(role),
      );

      // Only include groups that have at least one accessible item
      return filteredItems.length > 0
        ? { ...group, items: filteredItems }
        : null;
    })
    .filter((group): group is NavGroup => group !== null);
}
