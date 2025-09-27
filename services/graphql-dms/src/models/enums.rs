#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
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
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum DeliveryRouteStatusEnum {
    Planned,
    InProgress,
    Completed,
    Cancelled,
    Paused,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum DeliveryTaskStatusEnum {
    Pending,
    Assigned,
    OutForDelivery,
    Delivered,
    Failed,
    Cancelled,
    Rescheduled,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum ProofOfDeliveryTypeEnum {
    Signature,
    Photo,
    CodeVerification,
    ContactlessDelivery,
    LeftAtDoor,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
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
