use async_graphql::SimpleObject;
mod department_permissions;
mod department_transport_modes;
mod department_users;
pub mod departments;
pub mod drivers;
pub mod vehicles;

#[derive(Default, SimpleObject)]
pub struct OrgQuery {
    departments: departments::DepartmentsQuery,
    drivers: drivers::DriversQuery,
    vehicles: vehicles::VehiclesQuery,
}

#[derive(Default, SimpleObject)]
pub struct OrgMutation {
    departments: departments::DepartmentsMutation,
    department_users: department_users::DepartmentUsersMutation,
    department_permissions: department_permissions::DepartmentPermissionsMutation,
    department_transport_modes: department_transport_modes::DepartmentTransportModesMutation,
    drivers: drivers::DriversMutation,
    vehicles: vehicles::VehiclesMutation,
}
