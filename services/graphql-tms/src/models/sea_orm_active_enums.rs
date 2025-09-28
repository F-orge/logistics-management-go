#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "tms.carrier_rate_unit", rename_all = "kebab-case")]
pub enum CarrierRateUnitEnum {
    PerKg,
    PerContainer,
    PerMile,
    PerKm,
    FlatRate,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "tms.currency", rename_all = "kebab-case")]
pub enum CurrencyEnum {
    Usd,
    Eur,
    Gbp,
    Cad,
    Aud,
    Jpy,
    Php,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "tms.driver_schedule_reason", rename_all = "kebab-case")]
pub enum DriverScheduleReasonEnum {
    Vacation,
    SickLeave,
    Training,
    PersonalLeave,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "tms.driver_status", rename_all = "kebab-case")]
pub enum DriverStatusEnum {
    Active,
    Inactive,
    OnLeave,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "tms.expense_status", rename_all = "kebab-case")]
pub enum ExpenseStatusEnum {
    Pending,
    Approved,
    Rejected,
    Reimbursed,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "tms.expense_type", rename_all = "kebab-case")]
pub enum ExpenseTypeEnum {
    Fuel,
    Tolls,
    Maintenance,
    Parking,
    Meals,
    Accommodation,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "tms.geofence_event_type", rename_all = "kebab-case")]
pub enum GeofenceEventTypeEnum {
    Enter,
    Exit,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "tms.partner_invoice_status", rename_all = "kebab-case")]
pub enum PartnerInvoiceStatusEnum {
    Pending,
    Paid,
    Disputed,
    Overdue,
    Cancelled,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "tms.proof_type", rename_all = "kebab-case")]
pub enum ProofTypeEnum {
    Signature,
    Photo,
    BarcodeScan,
    PinVerification,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "tms.shipment_leg_status", rename_all = "kebab-case")]
pub enum ShipmentLegStatusEnum {
    Pending,
    InTransit,
    Delivered,
    Cancelled,
    Failed,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "tms.trip_status", rename_all = "kebab-case")]
pub enum TripStatusEnum {
    Planned,
    InProgress,
    Completed,
    Cancelled,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "tms.trip_stop_status", rename_all = "kebab-case")]
pub enum TripStopStatusEnum {
    Pending,
    Arrived,
    Completed,
    Skipped,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "tms.vehicle_service_type", rename_all = "kebab-case")]
pub enum VehicleServiceTypeEnum {
    RoutineMaintenance,
    Repair,
    Inspection,
    OilChange,
    TireReplacement,
    BrakeService,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "tms.vehicle_status", rename_all = "kebab-case")]
pub enum VehicleStatusEnum {
    Available,
    InMaintenance,
    OnTrip,
    OutOfService,
}
