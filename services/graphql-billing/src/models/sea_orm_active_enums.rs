#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "billing.dispute_status", rename_all = "kebab-case")]
pub enum DisputeStatusEnum {
    Open,
    UnderReview,
    Approved,
    Denied,
    Escalated,
    Closed,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "billing.document_type", rename_all = "kebab-case")]
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
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "billing.invoice_status", rename_all = "kebab-case")]
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
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "billing.payment_method", rename_all = "kebab-case")]
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
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "billing.payment_status", rename_all = "kebab-case")]
pub enum PaymentStatusEnum {
    Pending,
    Processing,
    Successful,
    Failed,
    Cancelled,
    Refunded,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "billing.pricing_model", rename_all = "kebab-case")]
pub enum PricingModelEnum {
    PerKg,
    PerItem,
    FlatRate,
    PerCubicMeter,
    PerZone,
    Percentage,
    Tiered,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "billing.quote_status", rename_all = "kebab-case")]
pub enum QuoteStatusEnum {
    Pending,
    Accepted,
    Expired,
    Cancelled,
    Converted,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "billing.service_type", rename_all = "kebab-case")]
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
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(
    type_name = "billing.surcharge_calculation_method",
    rename_all = "kebab-case"
)]
pub enum SurchargeCalculationMethodEnum {
    Percentage,
    Fixed,
    PerUnit,
    SlidingScale,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "billing.sync_status", rename_all = "kebab-case")]
pub enum SyncStatusEnum {
    Pending,
    InProgress,
    Success,
    Failed,
    Retry,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "billing.transaction_type", rename_all = "kebab-case")]
pub enum TransactionTypeEnum {
    Credit,
    Debit,
    TopUp,
    Refund,
    Adjustment,
    Fee,
}
