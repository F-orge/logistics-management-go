#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "dms.delivery_failure_reason", rename_all = "kebab-case")]
pub enum DeliveryFailureReasonEnum {
    RecipientNotHome,
    AddressNotFound,
    RefusedDelivery,
    DamagedPackage,
    AccessDenied,
    WeatherConditions,
    VehicleBreakdown,
    Other,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "dms.delivery_route_status", rename_all = "kebab-case")]
pub enum DeliveryRouteStatusEnum {
    Planned,
    InProgress,
    Completed,
    Cancelled,
    Paused,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "dms.delivery_task_status", rename_all = "kebab-case")]
pub enum DeliveryTaskStatusEnum {
    Pending,
    Assigned,
    OutForDelivery,
    Delivered,
    Failed,
    Cancelled,
    Rescheduled,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "dms.proof_of_delivery_type", rename_all = "kebab-case")]
pub enum ProofOfDeliveryTypeEnum {
    Signature,
    Photo,
    CodeVerification,
    ContactlessDelivery,
    LeftAtDoor,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "dms.task_event_status", rename_all = "kebab-case")]
pub enum TaskEventStatusEnum {
    Assigned,
    Started,
    Arrived,
    Delivered,
    Failed,
    Exception,
    Cancelled,
    Rescheduled,
}
