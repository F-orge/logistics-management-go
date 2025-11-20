import { UsersRolesOptions } from "@/lib/pb.types";

/**
 * Get the default landing page based on user roles
 * Redirects users to the most appropriate section based on their assigned roles
 */
export const getDefaultRoute = (roles?: UsersRolesOptions[]): string => {
  if (!roles || roles.length === 0) {
    return "/dashboard";
  }

  // Check roles in priority order
  if (
    roles.includes(UsersRolesOptions.admin) ||
    roles.includes(UsersRolesOptions.developer)
  ) {
    return "/dashboard/customer-relations/companies";
  }

  // CRM roles
  if (
    roles.includes(UsersRolesOptions["sales-rep"]) ||
    roles.includes(UsersRolesOptions["account-manager"]) ||
    roles.includes(UsersRolesOptions["sales-manager"]) ||
    roles.includes(UsersRolesOptions.sdr) ||
    roles.includes(UsersRolesOptions["marketing-manager"]) ||
    roles.includes(UsersRolesOptions["customer-support-agent"]) ||
    roles.includes(UsersRolesOptions["finance-manager"]) ||
    roles.includes(UsersRolesOptions.accountant)
  ) {
    return "/dashboard/customer-relations/companies";
  }

  // Warehouse roles
  if (
    roles.includes(UsersRolesOptions["inventory-manager"]) ||
    roles.includes(UsersRolesOptions["warehouse-manager"]) ||
    roles.includes(UsersRolesOptions["receiving-manager"]) ||
    roles.includes(UsersRolesOptions["warehouse-operator"]) ||
    roles.includes(UsersRolesOptions.picker) ||
    roles.includes(UsersRolesOptions.packer) ||
    roles.includes(UsersRolesOptions["returns-processor"]) ||
    roles.includes(UsersRolesOptions["qc-manager"]) ||
    roles.includes(UsersRolesOptions["product-manager"]) ||
    roles.includes(UsersRolesOptions["pricing-analyst"])
  ) {
    return "/dashboard/warehouse-management/products";
  }

  // Transport & Delivery roles
  if (
    roles.includes(UsersRolesOptions["logistics-coordinator"]) ||
    roles.includes(UsersRolesOptions["logistics-manager"]) ||
    roles.includes(UsersRolesOptions["logistics-planner"]) ||
    roles.includes(UsersRolesOptions.dispatcher) ||
    roles.includes(UsersRolesOptions.driver) ||
    roles.includes(UsersRolesOptions["fleet-manager"]) ||
    roles.includes(UsersRolesOptions["transport-manager"]) ||
    roles.includes(UsersRolesOptions.carrier)
  ) {
    return "/dashboard/transport-management/drivers";
  }

  // Default fallback
  return "/dashboard";
};
