use async_graphql::Enum;

#[derive(Debug, Clone, PartialEq, Eq, Copy, Enum, sqlx::Type)]
#[sqlx(type_name = "crm.case_priority", rename_all = "kebab-case")]
pub enum CasePriority {
    Critical,
    High,
    Medium,
    Low,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, Enum, sqlx::Type)]
#[sqlx(type_name = "crm.case_status", rename_all = "kebab-case")]
pub enum CaseStatus {
    New,
    InProgress,
    WaitingForCustomer,
    WaitingForInternal,
    Escalated,
    Resolved,
    Closed,
    Cancelled,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, Enum, sqlx::Type)]
#[sqlx(type_name = "crm.case_type", rename_all = "kebab-case")]
pub enum CaseType {
    Question,
    Problem,
    Complaint,
    FeatureRequest,
    BugReport,
    TechnicalSupport,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, Enum, sqlx::Type)]
#[sqlx(type_name = "crm.interaction_type", rename_all = "kebab-case")]
pub enum InteractionType {
    Call,
    Meeting,
    Text,
    Email,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, Enum, sqlx::Type)]
#[sqlx(type_name = "crm.invoice_status", rename_all = "kebab-case")]
pub enum InvoiceStatus {
    Draft,
    Sent,
    Paid,
    Overdue,
    Cancelled,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, Enum, sqlx::Type)]
#[sqlx(type_name = "crm.lead_source", rename_all = "kebab-case")]
pub enum LeadSource {
    Website,
    Referral,
    SocialMedia,
    EmailCampaign,
    ColdCall,
    Event,
    Advertisement,
    Partner,
    Other,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, Enum, sqlx::Type)]
#[sqlx(type_name = "crm.lead_status", rename_all = "kebab-case")]
pub enum LeadStatus {
    New,
    Contacted,
    Qualified,
    Unqualified,
    Converted,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, Enum, sqlx::Type)]
#[sqlx(type_name = "crm.opportunity_source", rename_all = "kebab-case")]
pub enum OpportunitySource {
    Website,
    Referral,
    SocialMedia,
    EmailCampaign,
    ColdCall,
    Event,
    Advertisement,
    Partner,
    ExistingCustomer,
    Other,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, Enum, sqlx::Type)]
#[sqlx(type_name = "crm.opportunity_stage", rename_all = "kebab-case")]
pub enum OpportunityStage {
    Prospecting,
    Qualification,
    NeedAnalysis,
    Demo,
    Proposal,
    Negotiation,
    ClosedWon,
    ClosedLost,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, Enum, sqlx::Type)]
#[sqlx(type_name = "crm.payment_method", rename_all = "kebab-case")]
pub enum PaymentMethod {
    CreditCard,
    BankTransfer,
    Cash,
    Check,
    Paypal,
    Stripe,
    WireTransfer,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, Enum, sqlx::Type)]
#[sqlx(type_name = "crm.product_type", rename_all = "kebab-case")]
pub enum ProductType {
    Service,
    Good,
    Digital,
    Subscription,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, Enum, sqlx::Type)]
#[sqlx(type_name = "crm.record_type", rename_all = "kebab-case")]
pub enum RecordType {
    Companies,
    Contacts,
    Leads,
    Opportunities,
    Cases,
    Interactions,
    Campaigns,
    Products,
    Invoices,
}
