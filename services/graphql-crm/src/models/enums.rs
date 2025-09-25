use async_graphql::Enum;

#[derive(Debug, Clone, PartialEq, Eq, Copy, Enum)]
pub enum CasePriority {
    Critical,
    High,
    Medium,
    Low,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, Enum)]
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
#[derive(Debug, Clone, PartialEq, Eq, Copy, Enum)]
pub enum CaseType {
    Question,
    Problem,
    Complaint,
    FeatureRequest,
    BugReport,
    TechnicalSupport,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, Enum)]
pub enum InteractionType {
    Call,
    Meeting,
    Text,
    Email,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, Enum)]
pub enum InvoiceStatus {
    Draft,
    Sent,
    Paid,
    Overdue,
    Cancelled,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, Enum)]
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
#[derive(Debug, Clone, PartialEq, Eq, Copy, Enum)]
pub enum LeadStatus {
    New,
    Contacted,
    Qualified,
    Unqualified,
    Converted,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, Enum)]
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
#[derive(Debug, Clone, PartialEq, Eq, Copy, Enum)]
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
#[derive(Debug, Clone, PartialEq, Eq, Copy, Enum)]
pub enum PaymentMethod {
    CreditCard,
    BankTransfer,
    Cash,
    Check,
    Paypal,
    Stripe,
    WireTransfer,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, Enum)]
pub enum ProductType {
    Service,
    Good,
    Digital,
    Subscription,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, Enum)]
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
