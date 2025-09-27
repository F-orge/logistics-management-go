#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum CarrierRateUnitEnum {
    PerKg,
    PerContainer,
    PerMile,
    PerKm,
    FlatRate,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum CurrencyEnum {
    Usd,
    Eur,
    Gbp,
    Cad,
    Aud,
    Jpy,
    Php,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum DriverScheduleReasonEnum {
    Vacation,
    SickLeave,
    Training,
    PersonalLeave,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum DriverStatusEnum {
    Active,
    Inactive,
    OnLeave,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum ExpenseStatusEnum {
    Pending,
    Approved,
    Rejected,
    Reimbursed,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum ExpenseTypeEnum {
    Fuel,
    Tolls,
    Maintenance,
    Parking,
    Meals,
    Accommodation,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum GeofenceEventTypeEnum {
    Enter,
    Exit,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum PartnerInvoiceStatusEnum {
    Pending,
    Paid,
    Disputed,
    Overdue,
    Cancelled,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum ProofTypeEnum {
    Signature,
    Photo,
    BarcodeScan,
    PinVerification,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum ShipmentLegStatusEnum {
    Pending,
    InTransit,
    Delivered,
    Cancelled,
    Failed,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum TripStatusEnum {
    Planned,
    InProgress,
    Completed,
    Cancelled,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum TripStopStatusEnum {
    Pending,
    Arrived,
    Completed,
    Skipped,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum VehicleServiceTypeEnum {
    RoutineMaintenance,
    Repair,
    Inspection,
    OilChange,
    TireReplacement,
    BrakeService,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum VehicleStatusEnum {
    Available,
    InMaintenance,
    OnTrip,
    OutOfService,
}
