#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum DisputeStatusEnum {
    Open,
    UnderReview,
    Approved,
    Denied,
    Escalated,
    Closed,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum DocumentTypeEnum {
    Bol,
    CommercialInvoice,
    PackingList,
    Receipt,
    CreditNote,
    ShippingLabel,
    CustomsDeclaration,
    ProofOfDelivery,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum InvoiceStatusEnum {
    Draft,
    Sent,
    Viewed,
    Paid,
    PartialPaid,
    PastDue,
    Disputed,
    Cancelled,
    Void,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum PaymentMethodEnum {
    CreditCard,
    DebitCard,
    Wallet,
    QrPh,
    ClientCredit,
    BankTransfer,
    Cash,
    Check,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum PaymentStatusEnum {
    Pending,
    Processing,
    Successful,
    Failed,
    Cancelled,
    Refunded,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum PricingModelEnum {
    PerKg,
    PerItem,
    FlatRate,
    PerCubicMeter,
    PerZone,
    Percentage,
    Tiered,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum QuoteStatusEnum {
    Pending,
    Accepted,
    Expired,
    Cancelled,
    Converted,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum ServiceTypeEnum {
    Shipping,
    Storage,
    Fulfillment,
    Handling,
    Insurance,
    Customs,
    Packaging,
    Returns,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum SurchargeCalculationMethodEnum {
    Percentage,
    Fixed,
    PerUnit,
    SlidingScale,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum SyncStatusEnum {
    Pending,
    InProgress,
    Success,
    Failed,
    Retry,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum TransactionTypeEnum {
    Credit,
    Debit,
    TopUp,
    Refund,
    Adjustment,
    Fee,
}
