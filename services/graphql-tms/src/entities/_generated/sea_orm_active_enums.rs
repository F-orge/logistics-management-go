use sea_orm::entity::prelude::*;

#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Copy,
    async_graphql :: Enum,
    fake :: Dummy,
)]
#[sea_orm(
    rs_type = "String",
    db_type = "Enum",
    enum_name = "carrier_rate_unit_enum"
)]
pub enum CarrierRateUnitEnum {
    #[sea_orm(string_value = "per_kg")]
    PerKg,
    #[sea_orm(string_value = "per_container")]
    PerContainer,
    #[sea_orm(string_value = "per_mile")]
    PerMile,
    #[sea_orm(string_value = "per_km")]
    PerKm,
    #[sea_orm(string_value = "flat_rate")]
    FlatRate,
}
#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Copy,
    async_graphql :: Enum,
    fake :: Dummy,
)]
#[sea_orm(rs_type = "String", db_type = "Enum", enum_name = "currency_enum")]
pub enum CurrencyEnum {
    #[sea_orm(string_value = "USD")]
    Usd,
    #[sea_orm(string_value = "EUR")]
    Eur,
    #[sea_orm(string_value = "GBP")]
    Gbp,
    #[sea_orm(string_value = "CAD")]
    Cad,
    #[sea_orm(string_value = "AUD")]
    Aud,
    #[sea_orm(string_value = "JPY")]
    Jpy,
    #[sea_orm(string_value = "PHP")]
    Php,
}
#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Copy,
    async_graphql :: Enum,
    fake :: Dummy,
)]
#[sea_orm(
    rs_type = "String",
    db_type = "Enum",
    enum_name = "driver_schedule_reason_enum"
)]
pub enum DriverScheduleReasonEnum {
    #[sea_orm(string_value = "vacation")]
    Vacation,
    #[sea_orm(string_value = "sick_leave")]
    SickLeave,
    #[sea_orm(string_value = "training")]
    Training,
    #[sea_orm(string_value = "personal_leave")]
    PersonalLeave,
}
#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Copy,
    async_graphql :: Enum,
    fake :: Dummy,
)]
#[sea_orm(rs_type = "String", db_type = "Enum", enum_name = "driver_status_enum")]
pub enum DriverStatusEnum {
    #[sea_orm(string_value = "active")]
    Active,
    #[sea_orm(string_value = "inactive")]
    Inactive,
    #[sea_orm(string_value = "on_leave")]
    OnLeave,
}
#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Copy,
    async_graphql :: Enum,
    fake :: Dummy,
)]
#[sea_orm(
    rs_type = "String",
    db_type = "Enum",
    enum_name = "expense_status_enum"
)]
pub enum ExpenseStatusEnum {
    #[sea_orm(string_value = "pending")]
    Pending,
    #[sea_orm(string_value = "approved")]
    Approved,
    #[sea_orm(string_value = "rejected")]
    Rejected,
    #[sea_orm(string_value = "reimbursed")]
    Reimbursed,
}
#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Copy,
    async_graphql :: Enum,
    fake :: Dummy,
)]
#[sea_orm(rs_type = "String", db_type = "Enum", enum_name = "expense_type_enum")]
pub enum ExpenseTypeEnum {
    #[sea_orm(string_value = "fuel")]
    Fuel,
    #[sea_orm(string_value = "tolls")]
    Tolls,
    #[sea_orm(string_value = "maintenance")]
    Maintenance,
    #[sea_orm(string_value = "parking")]
    Parking,
    #[sea_orm(string_value = "meals")]
    Meals,
    #[sea_orm(string_value = "accommodation")]
    Accommodation,
}
#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Copy,
    async_graphql :: Enum,
    fake :: Dummy,
)]
#[sea_orm(
    rs_type = "String",
    db_type = "Enum",
    enum_name = "geofence_event_type_enum"
)]
pub enum GeofenceEventTypeEnum {
    #[sea_orm(string_value = "enter")]
    Enter,
    #[sea_orm(string_value = "exit")]
    Exit,
}
#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Copy,
    async_graphql :: Enum,
    fake :: Dummy,
)]
#[sea_orm(
    rs_type = "String",
    db_type = "Enum",
    enum_name = "partner_invoice_status_enum"
)]
pub enum PartnerInvoiceStatusEnum {
    #[sea_orm(string_value = "pending")]
    Pending,
    #[sea_orm(string_value = "paid")]
    Paid,
    #[sea_orm(string_value = "disputed")]
    Disputed,
    #[sea_orm(string_value = "overdue")]
    Overdue,
    #[sea_orm(string_value = "cancelled")]
    Cancelled,
}
#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Copy,
    async_graphql :: Enum,
    fake :: Dummy,
)]
#[sea_orm(rs_type = "String", db_type = "Enum", enum_name = "proof_type_enum")]
pub enum ProofTypeEnum {
    #[sea_orm(string_value = "signature")]
    Signature,
    #[sea_orm(string_value = "photo")]
    Photo,
    #[sea_orm(string_value = "barcode_scan")]
    BarcodeScan,
    #[sea_orm(string_value = "pin_verification")]
    PinVerification,
}
#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Copy,
    async_graphql :: Enum,
    fake :: Dummy,
)]
#[sea_orm(
    rs_type = "String",
    db_type = "Enum",
    enum_name = "shipment_leg_status_enum"
)]
pub enum ShipmentLegStatusEnum {
    #[sea_orm(string_value = "pending")]
    Pending,
    #[sea_orm(string_value = "in_transit")]
    InTransit,
    #[sea_orm(string_value = "delivered")]
    Delivered,
    #[sea_orm(string_value = "cancelled")]
    Cancelled,
    #[sea_orm(string_value = "failed")]
    Failed,
}
#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Copy,
    async_graphql :: Enum,
    fake :: Dummy,
)]
#[sea_orm(rs_type = "String", db_type = "Enum", enum_name = "trip_status_enum")]
pub enum TripStatusEnum {
    #[sea_orm(string_value = "planned")]
    Planned,
    #[sea_orm(string_value = "in_progress")]
    InProgress,
    #[sea_orm(string_value = "completed")]
    Completed,
    #[sea_orm(string_value = "cancelled")]
    Cancelled,
}
#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Copy,
    async_graphql :: Enum,
    fake :: Dummy,
)]
#[sea_orm(
    rs_type = "String",
    db_type = "Enum",
    enum_name = "trip_stop_status_enum"
)]
pub enum TripStopStatusEnum {
    #[sea_orm(string_value = "pending")]
    Pending,
    #[sea_orm(string_value = "arrived")]
    Arrived,
    #[sea_orm(string_value = "completed")]
    Completed,
    #[sea_orm(string_value = "skipped")]
    Skipped,
}
#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Copy,
    async_graphql :: Enum,
    fake :: Dummy,
)]
#[sea_orm(
    rs_type = "String",
    db_type = "Enum",
    enum_name = "vehicle_service_type_enum"
)]
pub enum VehicleServiceTypeEnum {
    #[sea_orm(string_value = "routine_maintenance")]
    RoutineMaintenance,
    #[sea_orm(string_value = "repair")]
    Repair,
    #[sea_orm(string_value = "inspection")]
    Inspection,
    #[sea_orm(string_value = "oil_change")]
    OilChange,
    #[sea_orm(string_value = "tire_replacement")]
    TireReplacement,
    #[sea_orm(string_value = "brake_service")]
    BrakeService,
}
#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Copy,
    async_graphql :: Enum,
    fake :: Dummy,
)]
#[sea_orm(
    rs_type = "String",
    db_type = "Enum",
    enum_name = "vehicle_status_enum"
)]
pub enum VehicleStatusEnum {
    #[sea_orm(string_value = "available")]
    Available,
    #[sea_orm(string_value = "in_maintenance")]
    InMaintenance,
    #[sea_orm(string_value = "on_trip")]
    OnTrip,
    #[sea_orm(string_value = "out_of_service")]
    OutOfService,
}
