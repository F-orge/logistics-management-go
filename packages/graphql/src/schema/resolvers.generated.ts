/* This file was automatically generated. DO NOT UPDATE MANUALLY. */

import { DateResolver } from "graphql-scalars";
import { DeleteResult } from "./base/resolvers/DeleteResult";
import { File } from "./base/resolvers/File";
import { User } from "./base/resolvers/User";
import { AccountTransactions } from "./billing/account_transactions/resolvers/AccountTransactions";
import { BillingMutation as account_transactions_BillingMutation } from "./billing/account_transactions/resolvers/BillingMutation";
import { BillingQuery as account_transactions_BillingQuery } from "./billing/account_transactions/resolvers/BillingQuery";
import { transactionCredited as Subscription_transactionCredited } from "./billing/account_transactions/resolvers/Subscription/transactionCredited";
import { transactionDebited as Subscription_transactionDebited } from "./billing/account_transactions/resolvers/Subscription/transactionDebited";
import { TransactionCreditedEvent } from "./billing/account_transactions/resolvers/TransactionCreditedEvent";
import { TransactionDebitedEvent } from "./billing/account_transactions/resolvers/TransactionDebitedEvent";
import { AccountingSyncFailedEvent } from "./billing/accounting_sync_log/resolvers/AccountingSyncFailedEvent";
import { AccountingSyncLogs } from "./billing/accounting_sync_log/resolvers/AccountingSyncLogs";
import { AccountingSyncSucceededEvent } from "./billing/accounting_sync_log/resolvers/AccountingSyncSucceededEvent";
import { AccountingSyncTriggeredEvent } from "./billing/accounting_sync_log/resolvers/AccountingSyncTriggeredEvent";
import { BillingMutation as accounting_sync_log_BillingMutation } from "./billing/accounting_sync_log/resolvers/BillingMutation";
import { BillingQuery as accounting_sync_log_BillingQuery } from "./billing/accounting_sync_log/resolvers/BillingQuery";
import { accountingSyncFailed as Subscription_accountingSyncFailed } from "./billing/accounting_sync_log/resolvers/Subscription/accountingSyncFailed";
import { accountingSyncSucceeded as Subscription_accountingSyncSucceeded } from "./billing/accounting_sync_log/resolvers/Subscription/accountingSyncSucceeded";
import { accountingSyncTriggered as Subscription_accountingSyncTriggered } from "./billing/accounting_sync_log/resolvers/Subscription/accountingSyncTriggered";
import { BillingMutation as client_accounts_BillingMutation } from "./billing/client_accounts/resolvers/BillingMutation";
import { BillingQuery as client_accounts_BillingQuery } from "./billing/client_accounts/resolvers/BillingQuery";
import { ClientAccountBalanceUpdatedEvent } from "./billing/client_accounts/resolvers/ClientAccountBalanceUpdatedEvent";
import { ClientAccountLastPaymentDateUpdatedEvent } from "./billing/client_accounts/resolvers/ClientAccountLastPaymentDateUpdatedEvent";
import { ClientAccounts } from "./billing/client_accounts/resolvers/ClientAccounts";
import { clientAccountBalanceUpdated as Subscription_clientAccountBalanceUpdated } from "./billing/client_accounts/resolvers/Subscription/clientAccountBalanceUpdated";
import { clientAccountLastPaymentDateUpdated as Subscription_clientAccountLastPaymentDateUpdated } from "./billing/client_accounts/resolvers/Subscription/clientAccountLastPaymentDateUpdated";
import { BillingMutation as credit_notes_BillingMutation } from "./billing/credit_notes/resolvers/BillingMutation";
import { BillingQuery as credit_notes_BillingQuery } from "./billing/credit_notes/resolvers/BillingQuery";
import { CreditNoteAppliedEvent } from "./billing/credit_notes/resolvers/CreditNoteAppliedEvent";
import { CreditNoteOnDisputeApprovalEvent } from "./billing/credit_notes/resolvers/CreditNoteOnDisputeApprovalEvent";
import { CreditNotes } from "./billing/credit_notes/resolvers/CreditNotes";
import { creditNoteApplied as Subscription_creditNoteApplied } from "./billing/credit_notes/resolvers/Subscription/creditNoteApplied";
import { creditNoteIssued as Subscription_creditNoteIssued } from "./billing/credit_notes/resolvers/Subscription/creditNoteIssued";
import { creditNoteOnDisputeApproval as Subscription_creditNoteOnDisputeApproval } from "./billing/credit_notes/resolvers/Subscription/creditNoteOnDisputeApproval";
import { BillingMutation as disputes_BillingMutation } from "./billing/disputes/resolvers/BillingMutation";
import { BillingQuery as disputes_BillingQuery } from "./billing/disputes/resolvers/BillingQuery";
import { DisputeApprovedEvent } from "./billing/disputes/resolvers/DisputeApprovedEvent";
import { DisputeDeniedEvent } from "./billing/disputes/resolvers/DisputeDeniedEvent";
import { DisputeResolvedEvent } from "./billing/disputes/resolvers/DisputeResolvedEvent";
import { DisputeStatusChangedEvent } from "./billing/disputes/resolvers/DisputeStatusChangedEvent";
import { Disputes } from "./billing/disputes/resolvers/Disputes";
import { disputeApproved as Subscription_disputeApproved } from "./billing/disputes/resolvers/Subscription/disputeApproved";
import { disputeDenied as Subscription_disputeDenied } from "./billing/disputes/resolvers/Subscription/disputeDenied";
import { disputeOpened as Subscription_disputeOpened } from "./billing/disputes/resolvers/Subscription/disputeOpened";
import { disputeResolved as Subscription_disputeResolved } from "./billing/disputes/resolvers/Subscription/disputeResolved";
import { disputeStatusChanged as Subscription_disputeStatusChanged } from "./billing/disputes/resolvers/Subscription/disputeStatusChanged";
import { disputeUnderReview as Subscription_disputeUnderReview } from "./billing/disputes/resolvers/Subscription/disputeUnderReview";
import { BillingMutation as documents_BillingMutation } from "./billing/documents/resolvers/BillingMutation";
import { BillingQuery as documents_BillingQuery } from "./billing/documents/resolvers/BillingQuery";
import { DocumentGeneratedEvent } from "./billing/documents/resolvers/DocumentGeneratedEvent";
import { Documents } from "./billing/documents/resolvers/Documents";
import { documentGenerated as Subscription_documentGenerated } from "./billing/documents/resolvers/Subscription/documentGenerated";
import { BillingMutation as invoice_line_items_BillingMutation } from "./billing/invoice_line_items/resolvers/BillingMutation";
import { InvoiceLineItems } from "./billing/invoice_line_items/resolvers/InvoiceLineItems";
import { BillingInvoices } from "./billing/invoices/resolvers/BillingInvoices";
import { BillingMutation as invoices_BillingMutation } from "./billing/invoices/resolvers/BillingMutation";
import { BillingQuery as invoices_BillingQuery } from "./billing/invoices/resolvers/BillingQuery";
import { InvoiceDisputedEvent } from "./billing/invoices/resolvers/InvoiceDisputedEvent";
import { InvoiceOverdueEvent } from "./billing/invoices/resolvers/InvoiceOverdueEvent";
import { InvoicePaidEvent } from "./billing/invoices/resolvers/InvoicePaidEvent";
import { InvoicePartiallyPaidEvent } from "./billing/invoices/resolvers/InvoicePartiallyPaidEvent";
import { InvoiceStatusChangedEvent } from "./billing/invoices/resolvers/InvoiceStatusChangedEvent";
import { invoiceCreated as Subscription_invoiceCreated } from "./billing/invoices/resolvers/Subscription/invoiceCreated";
import { invoiceDisputed as Subscription_invoiceDisputed } from "./billing/invoices/resolvers/Subscription/invoiceDisputed";
import { invoiceOverdue as Subscription_invoiceOverdue } from "./billing/invoices/resolvers/Subscription/invoiceOverdue";
import { invoicePaid as Subscription_invoicePaid } from "./billing/invoices/resolvers/Subscription/invoicePaid";
import { invoicePartiallyPaid as Subscription_invoicePartiallyPaid } from "./billing/invoices/resolvers/Subscription/invoicePartiallyPaid";
import { invoiceSent as Subscription_invoiceSent } from "./billing/invoices/resolvers/Subscription/invoiceSent";
import { invoiceStatusChanged as Subscription_invoiceStatusChanged } from "./billing/invoices/resolvers/Subscription/invoiceStatusChanged";
import { invoiceViewed as Subscription_invoiceViewed } from "./billing/invoices/resolvers/Subscription/invoiceViewed";
import { BillingMutation as payments_BillingMutation } from "./billing/payments/resolvers/BillingMutation";
import { BillingQuery as payments_BillingQuery } from "./billing/payments/resolvers/BillingQuery";
import { PaymentFailedEvent } from "./billing/payments/resolvers/PaymentFailedEvent";
import { PaymentRefundedEvent } from "./billing/payments/resolvers/PaymentRefundedEvent";
import { PaymentStatusChangedEvent } from "./billing/payments/resolvers/PaymentStatusChangedEvent";
import { Payments } from "./billing/payments/resolvers/Payments";
import { paymentFailed as Subscription_paymentFailed } from "./billing/payments/resolvers/Subscription/paymentFailed";
import { paymentInitiated as Subscription_paymentInitiated } from "./billing/payments/resolvers/Subscription/paymentInitiated";
import { paymentProcessing as Subscription_paymentProcessing } from "./billing/payments/resolvers/Subscription/paymentProcessing";
import { paymentRefunded as Subscription_paymentRefunded } from "./billing/payments/resolvers/Subscription/paymentRefunded";
import { paymentStatusChanged as Subscription_paymentStatusChanged } from "./billing/payments/resolvers/Subscription/paymentStatusChanged";
import { paymentSuccessful as Subscription_paymentSuccessful } from "./billing/payments/resolvers/Subscription/paymentSuccessful";
import { BillingMutation as quotes_BillingMutation } from "./billing/quotes/resolvers/BillingMutation";
import { BillingQuery as quotes_BillingQuery } from "./billing/quotes/resolvers/BillingQuery";
import { QuoteConvertedEvent } from "./billing/quotes/resolvers/QuoteConvertedEvent";
import { QuoteExpiredEvent } from "./billing/quotes/resolvers/QuoteExpiredEvent";
import { QuoteStatusChangedEvent } from "./billing/quotes/resolvers/QuoteStatusChangedEvent";
import { Quotes } from "./billing/quotes/resolvers/Quotes";
import { quoteAccepted as Subscription_quoteAccepted } from "./billing/quotes/resolvers/Subscription/quoteAccepted";
import { quoteConverted as Subscription_quoteConverted } from "./billing/quotes/resolvers/Subscription/quoteConverted";
import { quoteCreated as Subscription_quoteCreated } from "./billing/quotes/resolvers/Subscription/quoteCreated";
import { quoteExpired as Subscription_quoteExpired } from "./billing/quotes/resolvers/Subscription/quoteExpired";
import { quoteSent as Subscription_quoteSent } from "./billing/quotes/resolvers/Subscription/quoteSent";
import { quoteStatusChanged as Subscription_quoteStatusChanged } from "./billing/quotes/resolvers/Subscription/quoteStatusChanged";
import { BillingMutation as rate_cards_BillingMutation } from "./billing/rate_cards/resolvers/BillingMutation";
import { BillingQuery as rate_cards_BillingQuery } from "./billing/rate_cards/resolvers/BillingQuery";
import { RateCardDeactivatedEvent } from "./billing/rate_cards/resolvers/RateCardDeactivatedEvent";
import { RateCards } from "./billing/rate_cards/resolvers/RateCards";
import { rateCardDeactivated as Subscription_rateCardDeactivated } from "./billing/rate_cards/resolvers/Subscription/rateCardDeactivated";
import { BillingMutation as rate_rules_BillingMutation } from "./billing/rate_rules/resolvers/BillingMutation";
import { BillingQuery as rate_rules_BillingQuery } from "./billing/rate_rules/resolvers/BillingQuery";
import { RateRules } from "./billing/rate_rules/resolvers/RateRules";
import { billing as Mutation_billing } from "./billing/resolvers/Mutation/billing";
import { billing as Query_billing } from "./billing/resolvers/Query/billing";
import { ShipmentCreatedFromPaymentEvent } from "./billing/resolvers/ShipmentCreatedFromPaymentEvent";
import { shipmentCreatedFromPayment as Subscription_shipmentCreatedFromPayment } from "./billing/resolvers/Subscription/shipmentCreatedFromPayment";
import { BillingMutation as surcharges_BillingMutation } from "./billing/surcharges/resolvers/BillingMutation";
import { BillingQuery as surcharges_BillingQuery } from "./billing/surcharges/resolvers/BillingQuery";
import { surchargeDeactivated as Subscription_surchargeDeactivated } from "./billing/surcharges/resolvers/Subscription/surchargeDeactivated";
import { SurchargeDeactivatedEvent } from "./billing/surcharges/resolvers/SurchargeDeactivatedEvent";
import { Surcharges } from "./billing/surcharges/resolvers/Surcharges";
import { Attachments } from "./crm/attachments/resolvers/Attachments";
import { CrmMutation as attachments_CrmMutation } from "./crm/attachments/resolvers/CrmMutation";
import { CrmQuery as attachments_CrmQuery } from "./crm/attachments/resolvers/CrmQuery";
import { Campaigns } from "./crm/campaigns/resolvers/Campaigns";
import { CrmMutation as campaigns_CrmMutation } from "./crm/campaigns/resolvers/CrmMutation";
import { CrmQuery as campaigns_CrmQuery } from "./crm/campaigns/resolvers/CrmQuery";
import { Cases } from "./crm/cases/resolvers/Cases";
import { CrmCaseAssignedEvent } from "./crm/cases/resolvers/CrmCaseAssignedEvent";
import { CrmCaseStatusChangedEvent } from "./crm/cases/resolvers/CrmCaseStatusChangedEvent";
import { CrmMutation as cases_CrmMutation } from "./crm/cases/resolvers/CrmMutation";
import { CrmQuery as cases_CrmQuery } from "./crm/cases/resolvers/CrmQuery";
import { caseAssigned as Subscription_caseAssigned } from "./crm/cases/resolvers/Subscription/caseAssigned";
import { caseStatusChanged as Subscription_caseStatusChanged } from "./crm/cases/resolvers/Subscription/caseStatusChanged";
import { Companies } from "./crm/companies/resolvers/Companies";
import { CrmMutation as companies_CrmMutation } from "./crm/companies/resolvers/CrmMutation";
import { CrmQuery as companies_CrmQuery } from "./crm/companies/resolvers/CrmQuery";
import { Contacts } from "./crm/contacts/resolvers/Contacts";
import { CrmMutation as contacts_CrmMutation } from "./crm/contacts/resolvers/CrmMutation";
import { CrmQuery as contacts_CrmQuery } from "./crm/contacts/resolvers/CrmQuery";
import { CrmMutation as interactions_CrmMutation } from "./crm/interactions/resolvers/CrmMutation";
import { CrmQuery as interactions_CrmQuery } from "./crm/interactions/resolvers/CrmQuery";
import { Interactions } from "./crm/interactions/resolvers/Interactions";
import { CrmMutation as invoice_items_CrmMutation } from "./crm/invoice_items/resolvers/CrmMutation";
import { InvoiceItems } from "./crm/invoice_items/resolvers/InvoiceItems";
import { CrmInvoiceStatusChangedEvent } from "./crm/invoices/resolvers/CrmInvoiceStatusChangedEvent";
import { CrmMutation as invoices_CrmMutation } from "./crm/invoices/resolvers/CrmMutation";
import { CrmQuery as invoices_CrmQuery } from "./crm/invoices/resolvers/CrmQuery";
import { Invoices } from "./crm/invoices/resolvers/Invoices";
import { crmInvoicePaid as Subscription_crmInvoicePaid } from "./crm/invoices/resolvers/Subscription/crmInvoicePaid";
import { crmInvoiceStatusChanged as Subscription_crmInvoiceStatusChanged } from "./crm/invoices/resolvers/Subscription/crmInvoiceStatusChanged";
import { CrmLeadStatusChangedEvent } from "./crm/leads/resolvers/CrmLeadStatusChangedEvent";
import { CrmMutation as leads_CrmMutation } from "./crm/leads/resolvers/CrmMutation";
import { CrmQuery as leads_CrmQuery } from "./crm/leads/resolvers/CrmQuery";
import { Leads } from "./crm/leads/resolvers/Leads";
import { leadConverted as Subscription_leadConverted } from "./crm/leads/resolvers/Subscription/leadConverted";
import { leadStatusChanged as Subscription_leadStatusChanged } from "./crm/leads/resolvers/Subscription/leadStatusChanged";
import { CrmMutation as notifications_CrmMutation } from "./crm/notifications/resolvers/CrmMutation";
import { CrmNotificationMarkedEvent } from "./crm/notifications/resolvers/CrmNotificationMarkedEvent";
import { CrmQuery as notifications_CrmQuery } from "./crm/notifications/resolvers/CrmQuery";
import { Notifications } from "./crm/notifications/resolvers/Notifications";
import { notificationMarked as Subscription_notificationMarked } from "./crm/notifications/resolvers/Subscription/notificationMarked";
import { CrmMutation as opportunities_CrmMutation } from "./crm/opportunities/resolvers/CrmMutation";
import { CrmOpportunityStageChangedEvent } from "./crm/opportunities/resolvers/CrmOpportunityStageChangedEvent";
import { CrmQuery as opportunities_CrmQuery } from "./crm/opportunities/resolvers/CrmQuery";
import { Opportunities } from "./crm/opportunities/resolvers/Opportunities";
import { opportunityLost as Subscription_opportunityLost } from "./crm/opportunities/resolvers/Subscription/opportunityLost";
import { opportunityStageChanged as Subscription_opportunityStageChanged } from "./crm/opportunities/resolvers/Subscription/opportunityStageChanged";
import { opportunityWon as Subscription_opportunityWon } from "./crm/opportunities/resolvers/Subscription/opportunityWon";
import { CrmMutation as opportunity_products_CrmMutation } from "./crm/opportunity_products/resolvers/CrmMutation";
import { OpportunityProducts } from "./crm/opportunity_products/resolvers/OpportunityProducts";
import { CrmMutation as products_CrmMutation } from "./crm/products/resolvers/CrmMutation";
import { CrmQuery as products_CrmQuery } from "./crm/products/resolvers/CrmQuery";
import { Products } from "./crm/products/resolvers/Products";
import { crm as Mutation_crm } from "./crm/resolvers/Mutation/crm";
import { crm as Query_crm } from "./crm/resolvers/Query/crm";
import { CustomerTrackingLinks } from "./dms/customer_tracking_links/resolvers/CustomerTrackingLinks";
import { DmsMutation as customer_tracking_links_DmsMutation } from "./dms/customer_tracking_links/resolvers/DmsMutation";
import { DmsQuery as customer_tracking_links_DmsQuery } from "./dms/customer_tracking_links/resolvers/DmsQuery";
import { DmsTrackingLinkExpiredEvent } from "./dms/customer_tracking_links/resolvers/DmsTrackingLinkExpiredEvent";
import { trackingLinkExpired as Subscription_trackingLinkExpired } from "./dms/customer_tracking_links/resolvers/Subscription/trackingLinkExpired";
import { trackingLinkGenerated as Subscription_trackingLinkGenerated } from "./dms/customer_tracking_links/resolvers/Subscription/trackingLinkGenerated";
import { DeliveryRoutes } from "./dms/delivery_routes/resolvers/DeliveryRoutes";
import { DmsMutation as delivery_routes_DmsMutation } from "./dms/delivery_routes/resolvers/DmsMutation";
import { DmsQuery as delivery_routes_DmsQuery } from "./dms/delivery_routes/resolvers/DmsQuery";
import { deliveryRouteCancelled as Subscription_deliveryRouteCancelled } from "./dms/delivery_routes/resolvers/Subscription/deliveryRouteCancelled";
import { deliveryRouteCompleted as Subscription_deliveryRouteCompleted } from "./dms/delivery_routes/resolvers/Subscription/deliveryRouteCompleted";
import { deliveryRoutePaused as Subscription_deliveryRoutePaused } from "./dms/delivery_routes/resolvers/Subscription/deliveryRoutePaused";
import { deliveryRouteStarted as Subscription_deliveryRouteStarted } from "./dms/delivery_routes/resolvers/Subscription/deliveryRouteStarted";
import { DeliveryTasks } from "./dms/delivery_tasks/resolvers/DeliveryTasks";
import { DmsDeliveryTaskFailedEvent } from "./dms/delivery_tasks/resolvers/DmsDeliveryTaskFailedEvent";
import { DmsDeliveryTaskStatusChangedEvent } from "./dms/delivery_tasks/resolvers/DmsDeliveryTaskStatusChangedEvent";
import { DmsMutation as delivery_tasks_DmsMutation } from "./dms/delivery_tasks/resolvers/DmsMutation";
import { DmsQuery as delivery_tasks_DmsQuery } from "./dms/delivery_tasks/resolvers/DmsQuery";
import { deliveryTaskDelivered as Subscription_deliveryTaskDelivered } from "./dms/delivery_tasks/resolvers/Subscription/deliveryTaskDelivered";
import { deliveryTaskFailed as Subscription_deliveryTaskFailed } from "./dms/delivery_tasks/resolvers/Subscription/deliveryTaskFailed";
import { deliveryTaskOutForDelivery as Subscription_deliveryTaskOutForDelivery } from "./dms/delivery_tasks/resolvers/Subscription/deliveryTaskOutForDelivery";
import { deliveryTaskStatusChanged as Subscription_deliveryTaskStatusChanged } from "./dms/delivery_tasks/resolvers/Subscription/deliveryTaskStatusChanged";
import { DmsDriverLocationRemovedEvent } from "./dms/driver_locations/resolvers/DmsDriverLocationRemovedEvent";
import { DmsMutation as driver_locations_DmsMutation } from "./dms/driver_locations/resolvers/DmsMutation";
import { DmsQuery as driver_locations_DmsQuery } from "./dms/driver_locations/resolvers/DmsQuery";
import { DriverLocations } from "./dms/driver_locations/resolvers/DriverLocations";
import { driverLocationRemoved as Subscription_driverLocationRemoved } from "./dms/driver_locations/resolvers/Subscription/driverLocationRemoved";
import { driverLocationUpdated as Subscription_driverLocationUpdated } from "./dms/driver_locations/resolvers/Subscription/driverLocationUpdated";
import { DmsMutation as proof_of_deliveries_DmsMutation } from "./dms/proof_of_deliveries/resolvers/DmsMutation";
import { DmsProofOfDeliveries } from "./dms/proof_of_deliveries/resolvers/DmsProofOfDeliveries";
import { DmsQuery as proof_of_deliveries_DmsQuery } from "./dms/proof_of_deliveries/resolvers/DmsQuery";
import { proofOfDeliveryRecorded as Subscription_proofOfDeliveryRecorded } from "./dms/proof_of_deliveries/resolvers/Subscription/proofOfDeliveryRecorded";
import { dms as Mutation_dms } from "./dms/resolvers/Mutation/dms";
import { dms as Query_dms } from "./dms/resolvers/Query/dms";
import { DmsMutation as task_events_DmsMutation } from "./dms/task_events/resolvers/DmsMutation";
import { DmsQuery as task_events_DmsQuery } from "./dms/task_events/resolvers/DmsQuery";
import { DmsTaskEventStatusUpdatedEvent } from "./dms/task_events/resolvers/DmsTaskEventStatusUpdatedEvent";
import { taskEventRecorded as Subscription_taskEventRecorded } from "./dms/task_events/resolvers/Subscription/taskEventRecorded";
import { taskEventStatusUpdated as Subscription_taskEventStatusUpdated } from "./dms/task_events/resolvers/Subscription/taskEventStatusUpdated";
import { TaskEvents } from "./dms/task_events/resolvers/TaskEvents";
import { CarrierRates } from "./tms/carrier_rates/resolvers/CarrierRates";
import { TmsMutation as carrier_rates_TmsMutation } from "./tms/carrier_rates/resolvers/TmsMutation";
import { Carriers } from "./tms/carriers/resolvers/Carriers";
import { TmsMutation as carriers_TmsMutation } from "./tms/carriers/resolvers/TmsMutation";
import { TmsQuery as carriers_TmsQuery } from "./tms/carriers/resolvers/TmsQuery";
import { DriverSchedules } from "./tms/driver_schedules/resolvers/DriverSchedules";
import { TmsMutation as driver_schedules_TmsMutation } from "./tms/driver_schedules/resolvers/TmsMutation";
import { Drivers } from "./tms/drivers/resolvers/Drivers";
import { driverStatusChanged as Subscription_driverStatusChanged } from "./tms/drivers/resolvers/Subscription/driverStatusChanged";
import { TmsDriverStatusChangedEvent } from "./tms/drivers/resolvers/TmsDriverStatusChangedEvent";
import { TmsMutation as drivers_TmsMutation } from "./tms/drivers/resolvers/TmsMutation";
import { TmsQuery as drivers_TmsQuery } from "./tms/drivers/resolvers/TmsQuery";
import { Expenses } from "./tms/expenses/resolvers/Expenses";
import { expenseApproved as Subscription_expenseApproved } from "./tms/expenses/resolvers/Subscription/expenseApproved";
import { expenseRejected as Subscription_expenseRejected } from "./tms/expenses/resolvers/Subscription/expenseRejected";
import { expenseStatusChanged as Subscription_expenseStatusChanged } from "./tms/expenses/resolvers/Subscription/expenseStatusChanged";
import { expenseSubmitted as Subscription_expenseSubmitted } from "./tms/expenses/resolvers/Subscription/expenseSubmitted";
import { TmsExpenseRejectedEvent } from "./tms/expenses/resolvers/TmsExpenseRejectedEvent";
import { TmsExpenseStatusChangedEvent } from "./tms/expenses/resolvers/TmsExpenseStatusChangedEvent";
import { TmsMutation as expenses_TmsMutation } from "./tms/expenses/resolvers/TmsMutation";
import { TmsQuery as expenses_TmsQuery } from "./tms/expenses/resolvers/TmsQuery";
import { GeofenceEvents } from "./tms/geofence_events/resolvers/GeofenceEvents";
import { geofenceEntered as Subscription_geofenceEntered } from "./tms/geofence_events/resolvers/Subscription/geofenceEntered";
import { geofenceExited as Subscription_geofenceExited } from "./tms/geofence_events/resolvers/Subscription/geofenceExited";
import { TmsGeofenceEvent } from "./tms/geofence_events/resolvers/TmsGeofenceEvent";
import { TmsMutation as geofence_events_TmsMutation } from "./tms/geofence_events/resolvers/TmsMutation";
import { Geofences } from "./tms/geofences/resolvers/Geofences";
import { TmsMutation as geofences_TmsMutation } from "./tms/geofences/resolvers/TmsMutation";
import { TmsQuery as geofences_TmsQuery } from "./tms/geofences/resolvers/TmsQuery";
import { GpsPings } from "./tms/gps_pings/resolvers/GpsPings";
import { TmsMutation as gps_pings_TmsMutation } from "./tms/gps_pings/resolvers/TmsMutation";
import { TmsQuery as gps_pings_TmsQuery } from "./tms/gps_pings/resolvers/TmsQuery";
import { PartnerInvoiceItems } from "./tms/partner_invoice_items/resolvers/PartnerInvoiceItems";
import { TmsMutation as partner_invoice_items_TmsMutation } from "./tms/partner_invoice_items/resolvers/TmsMutation";
import { PartnerInvoices } from "./tms/partner_invoices/resolvers/PartnerInvoices";
import { TmsMutation as partner_invoices_TmsMutation } from "./tms/partner_invoices/resolvers/TmsMutation";
import { TmsQuery as partner_invoices_TmsQuery } from "./tms/partner_invoices/resolvers/TmsQuery";
import { ProofOfDeliveries } from "./tms/proof_of_deliveries/resolvers/ProofOfDeliveries";
import { TmsMutation as proof_of_deliveries_TmsMutation } from "./tms/proof_of_deliveries/resolvers/TmsMutation";
import { TmsQuery as proof_of_deliveries_TmsQuery } from "./tms/proof_of_deliveries/resolvers/TmsQuery";
import { tms as Mutation_tms } from "./tms/resolvers/Mutation/tms";
import { tms as Query_tms } from "./tms/resolvers/Query/tms";
import { Routes } from "./tms/routes/resolvers/Routes";
import { TmsMutation as routes_TmsMutation } from "./tms/routes/resolvers/TmsMutation";
import { TmsQuery as routes_TmsQuery } from "./tms/routes/resolvers/TmsQuery";
import { ShipmentLegEvents } from "./tms/shipment_leg_events/resolvers/ShipmentLegEvents";
import { TmsMutation as shipment_leg_events_TmsMutation } from "./tms/shipment_leg_events/resolvers/TmsMutation";
import { ShipmentLegs } from "./tms/shipment_legs/resolvers/ShipmentLegs";
import { TmsMutation as shipment_legs_TmsMutation } from "./tms/shipment_legs/resolvers/TmsMutation";
import { TmsQuery as shipment_legs_TmsQuery } from "./tms/shipment_legs/resolvers/TmsQuery";
import { tripStopArrived as Subscription_tripStopArrived } from "./tms/trip_stops/resolvers/Subscription/tripStopArrived";
import { tripStopCompleted as Subscription_tripStopCompleted } from "./tms/trip_stops/resolvers/Subscription/tripStopCompleted";
import { tripStopSkipped as Subscription_tripStopSkipped } from "./tms/trip_stops/resolvers/Subscription/tripStopSkipped";
import { TmsMutation as trip_stops_TmsMutation } from "./tms/trip_stops/resolvers/TmsMutation";
import { TmsTripStopSkippedEvent } from "./tms/trip_stops/resolvers/TmsTripStopSkippedEvent";
import { TripStops } from "./tms/trip_stops/resolvers/TripStops";
import { tripCancelled as Subscription_tripCancelled } from "./tms/trips/resolvers/Subscription/tripCancelled";
import { tripCompleted as Subscription_tripCompleted } from "./tms/trips/resolvers/Subscription/tripCompleted";
import { tripCreated as Subscription_tripCreated } from "./tms/trips/resolvers/Subscription/tripCreated";
import { tripStarted as Subscription_tripStarted } from "./tms/trips/resolvers/Subscription/tripStarted";
import { tripStatusChanged as Subscription_tripStatusChanged } from "./tms/trips/resolvers/Subscription/tripStatusChanged";
import { TmsMutation as trips_TmsMutation } from "./tms/trips/resolvers/TmsMutation";
import { TmsQuery as trips_TmsQuery } from "./tms/trips/resolvers/TmsQuery";
import { TmsTripStatusChangedEvent } from "./tms/trips/resolvers/TmsTripStatusChangedEvent";
import { Trips } from "./tms/trips/resolvers/Trips";
import { TmsMutation as vehicle_maintenance_TmsMutation } from "./tms/vehicle_maintenance/resolvers/TmsMutation";
import { VehicleMaintenance } from "./tms/vehicle_maintenance/resolvers/VehicleMaintenance";
import { vehicleMaintenanceScheduled as Subscription_vehicleMaintenanceScheduled } from "./tms/vehicles/resolvers/Subscription/vehicleMaintenanceScheduled";
import { vehicleStatusChanged as Subscription_vehicleStatusChanged } from "./tms/vehicles/resolvers/Subscription/vehicleStatusChanged";
import { TmsMutation as vehicles_TmsMutation } from "./tms/vehicles/resolvers/TmsMutation";
import { TmsQuery as vehicles_TmsQuery } from "./tms/vehicles/resolvers/TmsQuery";
import { TmsVehicleStatusChangedEvent } from "./tms/vehicles/resolvers/TmsVehicleStatusChangedEvent";
import { Vehicles } from "./tms/vehicles/resolvers/Vehicles";
import type { Resolvers } from "./types.generated";
import { BinThresholds } from "./wms/bin_thresholds/resolvers/BinThresholds";
import { WmsMutation as bin_thresholds_WmsMutation } from "./wms/bin_thresholds/resolvers/WmsMutation";
import { WmsQuery as bin_thresholds_WmsQuery } from "./wms/bin_thresholds/resolvers/WmsQuery";
import { InboundShipmentItems } from "./wms/inbound_shipment_items/resolvers/InboundShipmentItems";
import { WmsMutation as inbound_shipment_items_WmsMutation } from "./wms/inbound_shipment_items/resolvers/WmsMutation";
import { InboundShipments } from "./wms/inbound_shipments/resolvers/InboundShipments";
import { inboundShipmentCompleted as Subscription_inboundShipmentCompleted } from "./wms/inbound_shipments/resolvers/Subscription/inboundShipmentCompleted";
import { inboundShipmentProcessing as Subscription_inboundShipmentProcessing } from "./wms/inbound_shipments/resolvers/Subscription/inboundShipmentProcessing";
import { inboundShipmentReceived as Subscription_inboundShipmentReceived } from "./wms/inbound_shipments/resolvers/Subscription/inboundShipmentReceived";
import { inboundShipmentStatusChanged as Subscription_inboundShipmentStatusChanged } from "./wms/inbound_shipments/resolvers/Subscription/inboundShipmentStatusChanged";
import { WmsInboundShipmentStatusChangedEvent } from "./wms/inbound_shipments/resolvers/WmsInboundShipmentStatusChangedEvent";
import { WmsMutation as inbound_shipments_WmsMutation } from "./wms/inbound_shipments/resolvers/WmsMutation";
import { WmsQuery as inbound_shipments_WmsQuery } from "./wms/inbound_shipments/resolvers/WmsQuery";
import { InventoryAdjustments } from "./wms/inventory_adjustments/resolvers/InventoryAdjustments";
import { inventoryAdjustmentDamagedReturn as Subscription_inventoryAdjustmentDamagedReturn } from "./wms/inventory_adjustments/resolvers/Subscription/inventoryAdjustmentDamagedReturn";
import { inventoryAdjustmentRecorded as Subscription_inventoryAdjustmentRecorded } from "./wms/inventory_adjustments/resolvers/Subscription/inventoryAdjustmentRecorded";
import { WmsInventoryAdjustmentDamagedReturnEvent } from "./wms/inventory_adjustments/resolvers/WmsInventoryAdjustmentDamagedReturnEvent";
import { WmsInventoryAdjustmentRecordedEvent } from "./wms/inventory_adjustments/resolvers/WmsInventoryAdjustmentRecordedEvent";
import { WmsMutation as inventory_adjustments_WmsMutation } from "./wms/inventory_adjustments/resolvers/WmsMutation";
import { WmsQuery as inventory_adjustments_WmsQuery } from "./wms/inventory_adjustments/resolvers/WmsQuery";
import { InventoryBatches } from "./wms/inventory_batches/resolvers/InventoryBatches";
import { WmsMutation as inventory_batches_WmsMutation } from "./wms/inventory_batches/resolvers/WmsMutation";
import { WmsQuery as inventory_batches_WmsQuery } from "./wms/inventory_batches/resolvers/WmsQuery";
import { InventoryStock } from "./wms/inventory_stock/resolvers/InventoryStock";
import { inventoryStockLowStockAlert as Subscription_inventoryStockLowStockAlert } from "./wms/inventory_stock/resolvers/Subscription/inventoryStockLowStockAlert";
import { inventoryStockReleased as Subscription_inventoryStockReleased } from "./wms/inventory_stock/resolvers/Subscription/inventoryStockReleased";
import { inventoryStockReserved as Subscription_inventoryStockReserved } from "./wms/inventory_stock/resolvers/Subscription/inventoryStockReserved";
import { inventoryStockStatusChanged as Subscription_inventoryStockStatusChanged } from "./wms/inventory_stock/resolvers/Subscription/inventoryStockStatusChanged";
import { WmsInventoryStockLowStockAlertEvent } from "./wms/inventory_stock/resolvers/WmsInventoryStockLowStockAlertEvent";
import { WmsInventoryStockReleasedEvent } from "./wms/inventory_stock/resolvers/WmsInventoryStockReleasedEvent";
import { WmsInventoryStockReservedEvent } from "./wms/inventory_stock/resolvers/WmsInventoryStockReservedEvent";
import { WmsInventoryStockStatusChangedEvent } from "./wms/inventory_stock/resolvers/WmsInventoryStockStatusChangedEvent";
import { WmsMutation as inventory_stock_WmsMutation } from "./wms/inventory_stock/resolvers/WmsMutation";
import { WmsQuery as inventory_stock_WmsQuery } from "./wms/inventory_stock/resolvers/WmsQuery";
import { Locations } from "./wms/locations/resolvers/Locations";
import { WmsMutation as locations_WmsMutation } from "./wms/locations/resolvers/WmsMutation";
import { WmsQuery as locations_WmsQuery } from "./wms/locations/resolvers/WmsQuery";
import { OutboundShipmentItems } from "./wms/outbound_shipment_items/resolvers/OutboundShipmentItems";
import { WmsMutation as outbound_shipment_items_WmsMutation } from "./wms/outbound_shipment_items/resolvers/WmsMutation";
import { OutboundShipments } from "./wms/outbound_shipments/resolvers/OutboundShipments";
import { outboundShipmentCreated as Subscription_outboundShipmentCreated } from "./wms/outbound_shipments/resolvers/Subscription/outboundShipmentCreated";
import { outboundShipmentDelivered as Subscription_outboundShipmentDelivered } from "./wms/outbound_shipments/resolvers/Subscription/outboundShipmentDelivered";
import { outboundShipmentPacked as Subscription_outboundShipmentPacked } from "./wms/outbound_shipments/resolvers/Subscription/outboundShipmentPacked";
import { outboundShipmentPicking as Subscription_outboundShipmentPicking } from "./wms/outbound_shipments/resolvers/Subscription/outboundShipmentPicking";
import { outboundShipmentShipped as Subscription_outboundShipmentShipped } from "./wms/outbound_shipments/resolvers/Subscription/outboundShipmentShipped";
import { outboundShipmentStatusChanged as Subscription_outboundShipmentStatusChanged } from "./wms/outbound_shipments/resolvers/Subscription/outboundShipmentStatusChanged";
import { WmsMutation as outbound_shipments_WmsMutation } from "./wms/outbound_shipments/resolvers/WmsMutation";
import { WmsOutboundShipmentStatusChangedEvent } from "./wms/outbound_shipments/resolvers/WmsOutboundShipmentStatusChangedEvent";
import { WmsQuery as outbound_shipments_WmsQuery } from "./wms/outbound_shipments/resolvers/WmsQuery";
import { PackageItems } from "./wms/package_items/resolvers/PackageItems";
import { WmsMutation as package_items_WmsMutation } from "./wms/package_items/resolvers/WmsMutation";
import { Packages } from "./wms/packages/resolvers/Packages";
import { WmsMutation as packages_WmsMutation } from "./wms/packages/resolvers/WmsMutation";
import { WmsQuery as packages_WmsQuery } from "./wms/packages/resolvers/WmsQuery";
import { PickBatchItems } from "./wms/pick_batch_items/resolvers/PickBatchItems";
import { WmsMutation as pick_batch_items_WmsMutation } from "./wms/pick_batch_items/resolvers/WmsMutation";
import { PickBatches } from "./wms/pick_batches/resolvers/PickBatches";
import { pickBatchCompleted as Subscription_pickBatchCompleted } from "./wms/pick_batches/resolvers/Subscription/pickBatchCompleted";
import { pickBatchCreated as Subscription_pickBatchCreated } from "./wms/pick_batches/resolvers/Subscription/pickBatchCreated";
import { pickBatchStarted as Subscription_pickBatchStarted } from "./wms/pick_batches/resolvers/Subscription/pickBatchStarted";
import { pickBatchStatusChanged as Subscription_pickBatchStatusChanged } from "./wms/pick_batches/resolvers/Subscription/pickBatchStatusChanged";
import { WmsMutation as pick_batches_WmsMutation } from "./wms/pick_batches/resolvers/WmsMutation";
import { WmsPickBatchStatusChangedEvent } from "./wms/pick_batches/resolvers/WmsPickBatchStatusChangedEvent";
import { WmsQuery as pick_batches_WmsQuery } from "./wms/pick_batches/resolvers/WmsQuery";
import { WmsMutation as products_WmsMutation } from "./wms/products/resolvers/WmsMutation";
import { WmsProducts } from "./wms/products/resolvers/WmsProducts";
import { WmsQuery as products_WmsQuery } from "./wms/products/resolvers/WmsQuery";
import { PutawayRules } from "./wms/putaway_rules/resolvers/PutawayRules";
import { WmsMutation as putaway_rules_WmsMutation } from "./wms/putaway_rules/resolvers/WmsMutation";
import { WmsQuery as putaway_rules_WmsQuery } from "./wms/putaway_rules/resolvers/WmsQuery";
import { ReorderPoints } from "./wms/reorder_points/resolvers/ReorderPoints";
import { WmsMutation as reorder_points_WmsMutation } from "./wms/reorder_points/resolvers/WmsMutation";
import { WmsQuery as reorder_points_WmsQuery } from "./wms/reorder_points/resolvers/WmsQuery";
import { wms as Mutation_wms } from "./wms/resolvers/Mutation/wms";
import { wms as Query_wms } from "./wms/resolvers/Query/wms";
import { ReturnItems } from "./wms/return_items/resolvers/ReturnItems";
import { returnItemEvaluated as Subscription_returnItemEvaluated } from "./wms/return_items/resolvers/Subscription/returnItemEvaluated";
import { WmsMutation as return_items_WmsMutation } from "./wms/return_items/resolvers/WmsMutation";
import { WmsReturnItemEvaluatedEvent } from "./wms/return_items/resolvers/WmsReturnItemEvaluatedEvent";
import { Returns } from "./wms/returns/resolvers/Returns";
import { returnApproved as Subscription_returnApproved } from "./wms/returns/resolvers/Subscription/returnApproved";
import { returnProcessed as Subscription_returnProcessed } from "./wms/returns/resolvers/Subscription/returnProcessed";
import { returnReceived as Subscription_returnReceived } from "./wms/returns/resolvers/Subscription/returnReceived";
import { returnRejected as Subscription_returnRejected } from "./wms/returns/resolvers/Subscription/returnRejected";
import { returnStatusChanged as Subscription_returnStatusChanged } from "./wms/returns/resolvers/Subscription/returnStatusChanged";
import { WmsMutation as returns_WmsMutation } from "./wms/returns/resolvers/WmsMutation";
import { WmsQuery as returns_WmsQuery } from "./wms/returns/resolvers/WmsQuery";
import { WmsReturnRejectedEvent } from "./wms/returns/resolvers/WmsReturnRejectedEvent";
import { WmsReturnStatusChangedEvent } from "./wms/returns/resolvers/WmsReturnStatusChangedEvent";
import { SalesOrderItems } from "./wms/sales_order_items/resolvers/SalesOrderItems";
import { WmsMutation as sales_order_items_WmsMutation } from "./wms/sales_order_items/resolvers/WmsMutation";
import { SalesOrders } from "./wms/sales_orders/resolvers/SalesOrders";
import { salesOrderCompleted as Subscription_salesOrderCompleted } from "./wms/sales_orders/resolvers/Subscription/salesOrderCompleted";
import { salesOrderCreated as Subscription_salesOrderCreated } from "./wms/sales_orders/resolvers/Subscription/salesOrderCreated";
import { salesOrderProcessing as Subscription_salesOrderProcessing } from "./wms/sales_orders/resolvers/Subscription/salesOrderProcessing";
import { salesOrderShipped as Subscription_salesOrderShipped } from "./wms/sales_orders/resolvers/Subscription/salesOrderShipped";
import { salesOrderStatusChanged as Subscription_salesOrderStatusChanged } from "./wms/sales_orders/resolvers/Subscription/salesOrderStatusChanged";
import { WmsMutation as sales_orders_WmsMutation } from "./wms/sales_orders/resolvers/WmsMutation";
import { WmsQuery as sales_orders_WmsQuery } from "./wms/sales_orders/resolvers/WmsQuery";
import { WmsSalesOrderStatusChangedEvent } from "./wms/sales_orders/resolvers/WmsSalesOrderStatusChangedEvent";
import { StockTransfers } from "./wms/stock_transfers/resolvers/StockTransfers";
import { stockTransferInitiated as Subscription_stockTransferInitiated } from "./wms/stock_transfers/resolvers/Subscription/stockTransferInitiated";
import { stockTransferInTransit as Subscription_stockTransferInTransit } from "./wms/stock_transfers/resolvers/Subscription/stockTransferInTransit";
import { stockTransferReceived as Subscription_stockTransferReceived } from "./wms/stock_transfers/resolvers/Subscription/stockTransferReceived";
import { stockTransferStatusChanged as Subscription_stockTransferStatusChanged } from "./wms/stock_transfers/resolvers/Subscription/stockTransferStatusChanged";
import { WmsMutation as stock_transfers_WmsMutation } from "./wms/stock_transfers/resolvers/WmsMutation";
import { WmsQuery as stock_transfers_WmsQuery } from "./wms/stock_transfers/resolvers/WmsQuery";
import { WmsStockTransferStatusChangedEvent } from "./wms/stock_transfers/resolvers/WmsStockTransferStatusChangedEvent";
import { Suppliers } from "./wms/suppliers/resolvers/Suppliers";
import { WmsMutation as suppliers_WmsMutation } from "./wms/suppliers/resolvers/WmsMutation";
import { WmsQuery as suppliers_WmsQuery } from "./wms/suppliers/resolvers/WmsQuery";
import { taskItemCompleted as Subscription_taskItemCompleted } from "./wms/task_items/resolvers/Subscription/taskItemCompleted";
import { taskItemDamaged as Subscription_taskItemDamaged } from "./wms/task_items/resolvers/Subscription/taskItemDamaged";
import { taskItemShortPicked as Subscription_taskItemShortPicked } from "./wms/task_items/resolvers/Subscription/taskItemShortPicked";
import { taskItemStatusChanged as Subscription_taskItemStatusChanged } from "./wms/task_items/resolvers/Subscription/taskItemStatusChanged";
import { TaskItems } from "./wms/task_items/resolvers/TaskItems";
import { WmsMutation as task_items_WmsMutation } from "./wms/task_items/resolvers/WmsMutation";
import { WmsTaskItemShortPickedEvent } from "./wms/task_items/resolvers/WmsTaskItemShortPickedEvent";
import { WmsTaskItemStatusChangedEvent } from "./wms/task_items/resolvers/WmsTaskItemStatusChangedEvent";
import { taskAssigned as Subscription_taskAssigned } from "./wms/tasks/resolvers/Subscription/taskAssigned";
import { taskCancelled as Subscription_taskCancelled } from "./wms/tasks/resolvers/Subscription/taskCancelled";
import { taskCompleted as Subscription_taskCompleted } from "./wms/tasks/resolvers/Subscription/taskCompleted";
import { taskCreated as Subscription_taskCreated } from "./wms/tasks/resolvers/Subscription/taskCreated";
import { taskPutawayCreated as Subscription_taskPutawayCreated } from "./wms/tasks/resolvers/Subscription/taskPutawayCreated";
import { taskReplenishmentCreated as Subscription_taskReplenishmentCreated } from "./wms/tasks/resolvers/Subscription/taskReplenishmentCreated";
import { taskStarted as Subscription_taskStarted } from "./wms/tasks/resolvers/Subscription/taskStarted";
import { taskStatusChanged as Subscription_taskStatusChanged } from "./wms/tasks/resolvers/Subscription/taskStatusChanged";
import { Tasks } from "./wms/tasks/resolvers/Tasks";
import { WmsMutation as tasks_WmsMutation } from "./wms/tasks/resolvers/WmsMutation";
import { WmsQuery as tasks_WmsQuery } from "./wms/tasks/resolvers/WmsQuery";
import { WmsTaskAssignedEvent } from "./wms/tasks/resolvers/WmsTaskAssignedEvent";
import { WmsTaskPutawayCreatedEvent } from "./wms/tasks/resolvers/WmsTaskPutawayCreatedEvent";
import { WmsTaskReplenishmentCreatedEvent } from "./wms/tasks/resolvers/WmsTaskReplenishmentCreatedEvent";
import { WmsTaskStatusChangedEvent } from "./wms/tasks/resolvers/WmsTaskStatusChangedEvent";
import { Warehouses } from "./wms/warehouses/resolvers/Warehouses";
import { WmsMutation as warehouses_WmsMutation } from "./wms/warehouses/resolvers/WmsMutation";
import { WmsQuery as warehouses_WmsQuery } from "./wms/warehouses/resolvers/WmsQuery";
export const resolvers: Resolvers = {
	Query: {
		billing: Query_billing,
		crm: Query_crm,
		dms: Query_dms,
		tms: Query_tms,
		wms: Query_wms,
	},
	Mutation: {
		billing: Mutation_billing,
		crm: Mutation_crm,
		dms: Mutation_dms,
		tms: Mutation_tms,
		wms: Mutation_wms,
	},
	Subscription: {
		accountingSyncFailed: Subscription_accountingSyncFailed,
		accountingSyncSucceeded: Subscription_accountingSyncSucceeded,
		accountingSyncTriggered: Subscription_accountingSyncTriggered,
		caseAssigned: Subscription_caseAssigned,
		caseStatusChanged: Subscription_caseStatusChanged,
		clientAccountBalanceUpdated: Subscription_clientAccountBalanceUpdated,
		clientAccountLastPaymentDateUpdated:
			Subscription_clientAccountLastPaymentDateUpdated,
		creditNoteApplied: Subscription_creditNoteApplied,
		creditNoteIssued: Subscription_creditNoteIssued,
		creditNoteOnDisputeApproval: Subscription_creditNoteOnDisputeApproval,
		crmInvoicePaid: Subscription_crmInvoicePaid,
		crmInvoiceStatusChanged: Subscription_crmInvoiceStatusChanged,
		deliveryRouteCancelled: Subscription_deliveryRouteCancelled,
		deliveryRouteCompleted: Subscription_deliveryRouteCompleted,
		deliveryRoutePaused: Subscription_deliveryRoutePaused,
		deliveryRouteStarted: Subscription_deliveryRouteStarted,
		deliveryTaskDelivered: Subscription_deliveryTaskDelivered,
		deliveryTaskFailed: Subscription_deliveryTaskFailed,
		deliveryTaskOutForDelivery: Subscription_deliveryTaskOutForDelivery,
		deliveryTaskStatusChanged: Subscription_deliveryTaskStatusChanged,
		disputeApproved: Subscription_disputeApproved,
		disputeDenied: Subscription_disputeDenied,
		disputeOpened: Subscription_disputeOpened,
		disputeResolved: Subscription_disputeResolved,
		disputeStatusChanged: Subscription_disputeStatusChanged,
		disputeUnderReview: Subscription_disputeUnderReview,
		documentGenerated: Subscription_documentGenerated,
		driverLocationRemoved: Subscription_driverLocationRemoved,
		driverLocationUpdated: Subscription_driverLocationUpdated,
		driverStatusChanged: Subscription_driverStatusChanged,
		expenseApproved: Subscription_expenseApproved,
		expenseRejected: Subscription_expenseRejected,
		expenseStatusChanged: Subscription_expenseStatusChanged,
		expenseSubmitted: Subscription_expenseSubmitted,
		geofenceEntered: Subscription_geofenceEntered,
		geofenceExited: Subscription_geofenceExited,
		inboundShipmentCompleted: Subscription_inboundShipmentCompleted,
		inboundShipmentProcessing: Subscription_inboundShipmentProcessing,
		inboundShipmentReceived: Subscription_inboundShipmentReceived,
		inboundShipmentStatusChanged: Subscription_inboundShipmentStatusChanged,
		inventoryAdjustmentDamagedReturn:
			Subscription_inventoryAdjustmentDamagedReturn,
		inventoryAdjustmentRecorded: Subscription_inventoryAdjustmentRecorded,
		inventoryStockLowStockAlert: Subscription_inventoryStockLowStockAlert,
		inventoryStockReleased: Subscription_inventoryStockReleased,
		inventoryStockReserved: Subscription_inventoryStockReserved,
		inventoryStockStatusChanged: Subscription_inventoryStockStatusChanged,
		invoiceCreated: Subscription_invoiceCreated,
		invoiceDisputed: Subscription_invoiceDisputed,
		invoiceOverdue: Subscription_invoiceOverdue,
		invoicePaid: Subscription_invoicePaid,
		invoicePartiallyPaid: Subscription_invoicePartiallyPaid,
		invoiceSent: Subscription_invoiceSent,
		invoiceStatusChanged: Subscription_invoiceStatusChanged,
		invoiceViewed: Subscription_invoiceViewed,
		leadConverted: Subscription_leadConverted,
		leadStatusChanged: Subscription_leadStatusChanged,
		notificationMarked: Subscription_notificationMarked,
		opportunityLost: Subscription_opportunityLost,
		opportunityStageChanged: Subscription_opportunityStageChanged,
		opportunityWon: Subscription_opportunityWon,
		outboundShipmentCreated: Subscription_outboundShipmentCreated,
		outboundShipmentDelivered: Subscription_outboundShipmentDelivered,
		outboundShipmentPacked: Subscription_outboundShipmentPacked,
		outboundShipmentPicking: Subscription_outboundShipmentPicking,
		outboundShipmentShipped: Subscription_outboundShipmentShipped,
		outboundShipmentStatusChanged: Subscription_outboundShipmentStatusChanged,
		paymentFailed: Subscription_paymentFailed,
		paymentInitiated: Subscription_paymentInitiated,
		paymentProcessing: Subscription_paymentProcessing,
		paymentRefunded: Subscription_paymentRefunded,
		paymentStatusChanged: Subscription_paymentStatusChanged,
		paymentSuccessful: Subscription_paymentSuccessful,
		pickBatchCompleted: Subscription_pickBatchCompleted,
		pickBatchCreated: Subscription_pickBatchCreated,
		pickBatchStarted: Subscription_pickBatchStarted,
		pickBatchStatusChanged: Subscription_pickBatchStatusChanged,
		proofOfDeliveryRecorded: Subscription_proofOfDeliveryRecorded,
		quoteAccepted: Subscription_quoteAccepted,
		quoteConverted: Subscription_quoteConverted,
		quoteCreated: Subscription_quoteCreated,
		quoteExpired: Subscription_quoteExpired,
		quoteSent: Subscription_quoteSent,
		quoteStatusChanged: Subscription_quoteStatusChanged,
		rateCardDeactivated: Subscription_rateCardDeactivated,
		returnApproved: Subscription_returnApproved,
		returnItemEvaluated: Subscription_returnItemEvaluated,
		returnProcessed: Subscription_returnProcessed,
		returnReceived: Subscription_returnReceived,
		returnRejected: Subscription_returnRejected,
		returnStatusChanged: Subscription_returnStatusChanged,
		salesOrderCompleted: Subscription_salesOrderCompleted,
		salesOrderCreated: Subscription_salesOrderCreated,
		salesOrderProcessing: Subscription_salesOrderProcessing,
		salesOrderShipped: Subscription_salesOrderShipped,
		salesOrderStatusChanged: Subscription_salesOrderStatusChanged,
		shipmentCreatedFromPayment: Subscription_shipmentCreatedFromPayment,
		stockTransferInTransit: Subscription_stockTransferInTransit,
		stockTransferInitiated: Subscription_stockTransferInitiated,
		stockTransferReceived: Subscription_stockTransferReceived,
		stockTransferStatusChanged: Subscription_stockTransferStatusChanged,
		surchargeDeactivated: Subscription_surchargeDeactivated,
		taskAssigned: Subscription_taskAssigned,
		taskCancelled: Subscription_taskCancelled,
		taskCompleted: Subscription_taskCompleted,
		taskCreated: Subscription_taskCreated,
		taskEventRecorded: Subscription_taskEventRecorded,
		taskEventStatusUpdated: Subscription_taskEventStatusUpdated,
		taskItemCompleted: Subscription_taskItemCompleted,
		taskItemDamaged: Subscription_taskItemDamaged,
		taskItemShortPicked: Subscription_taskItemShortPicked,
		taskItemStatusChanged: Subscription_taskItemStatusChanged,
		taskPutawayCreated: Subscription_taskPutawayCreated,
		taskReplenishmentCreated: Subscription_taskReplenishmentCreated,
		taskStarted: Subscription_taskStarted,
		taskStatusChanged: Subscription_taskStatusChanged,
		trackingLinkExpired: Subscription_trackingLinkExpired,
		trackingLinkGenerated: Subscription_trackingLinkGenerated,
		transactionCredited: Subscription_transactionCredited,
		transactionDebited: Subscription_transactionDebited,
		tripCancelled: Subscription_tripCancelled,
		tripCompleted: Subscription_tripCompleted,
		tripCreated: Subscription_tripCreated,
		tripStarted: Subscription_tripStarted,
		tripStatusChanged: Subscription_tripStatusChanged,
		tripStopArrived: Subscription_tripStopArrived,
		tripStopCompleted: Subscription_tripStopCompleted,
		tripStopSkipped: Subscription_tripStopSkipped,
		vehicleMaintenanceScheduled: Subscription_vehicleMaintenanceScheduled,
		vehicleStatusChanged: Subscription_vehicleStatusChanged,
	},
	AccountTransactions: AccountTransactions,
	AccountingSyncFailedEvent: AccountingSyncFailedEvent,
	AccountingSyncLogs: AccountingSyncLogs,
	AccountingSyncSucceededEvent: AccountingSyncSucceededEvent,
	AccountingSyncTriggeredEvent: AccountingSyncTriggeredEvent,
	Attachments: Attachments,
	BillingInvoices: BillingInvoices,
	BillingMutation: {
		...invoice_line_items_BillingMutation,
		...account_transactions_BillingMutation,
		...accounting_sync_log_BillingMutation,
		...invoices_BillingMutation,
		...client_accounts_BillingMutation,
		...credit_notes_BillingMutation,
		...disputes_BillingMutation,
		...documents_BillingMutation,
		...payments_BillingMutation,
		...quotes_BillingMutation,
		...rate_cards_BillingMutation,
		...rate_rules_BillingMutation,
		...surcharges_BillingMutation,
	},
	BillingQuery: {
		...account_transactions_BillingQuery,
		...accounting_sync_log_BillingQuery,
		...invoices_BillingQuery,
		...client_accounts_BillingQuery,
		...credit_notes_BillingQuery,
		...disputes_BillingQuery,
		...documents_BillingQuery,
		...payments_BillingQuery,
		...quotes_BillingQuery,
		...rate_cards_BillingQuery,
		...rate_rules_BillingQuery,
		...surcharges_BillingQuery,
	},
	BinThresholds: BinThresholds,
	Campaigns: Campaigns,
	CarrierRates: CarrierRates,
	Carriers: Carriers,
	Cases: Cases,
	ClientAccountBalanceUpdatedEvent: ClientAccountBalanceUpdatedEvent,
	ClientAccountLastPaymentDateUpdatedEvent:
		ClientAccountLastPaymentDateUpdatedEvent,
	ClientAccounts: ClientAccounts,
	Companies: Companies,
	Contacts: Contacts,
	CreditNoteAppliedEvent: CreditNoteAppliedEvent,
	CreditNoteOnDisputeApprovalEvent: CreditNoteOnDisputeApprovalEvent,
	CreditNotes: CreditNotes,
	CrmCaseAssignedEvent: CrmCaseAssignedEvent,
	CrmCaseStatusChangedEvent: CrmCaseStatusChangedEvent,
	CrmInvoiceStatusChangedEvent: CrmInvoiceStatusChangedEvent,
	CrmLeadStatusChangedEvent: CrmLeadStatusChangedEvent,
	CrmMutation: {
		...invoice_items_CrmMutation,
		...opportunity_products_CrmMutation,
		...attachments_CrmMutation,
		...campaigns_CrmMutation,
		...cases_CrmMutation,
		...companies_CrmMutation,
		...contacts_CrmMutation,
		...interactions_CrmMutation,
		...invoices_CrmMutation,
		...leads_CrmMutation,
		...notifications_CrmMutation,
		...opportunities_CrmMutation,
		...products_CrmMutation,
	},
	CrmNotificationMarkedEvent: CrmNotificationMarkedEvent,
	CrmOpportunityStageChangedEvent: CrmOpportunityStageChangedEvent,
	CrmQuery: {
		...attachments_CrmQuery,
		...campaigns_CrmQuery,
		...cases_CrmQuery,
		...companies_CrmQuery,
		...contacts_CrmQuery,
		...interactions_CrmQuery,
		...invoices_CrmQuery,
		...leads_CrmQuery,
		...notifications_CrmQuery,
		...opportunities_CrmQuery,
		...products_CrmQuery,
	},
	CustomerTrackingLinks: CustomerTrackingLinks,
	DeleteResult: DeleteResult,
	DeliveryRoutes: DeliveryRoutes,
	DeliveryTasks: DeliveryTasks,
	DisputeApprovedEvent: DisputeApprovedEvent,
	DisputeDeniedEvent: DisputeDeniedEvent,
	DisputeResolvedEvent: DisputeResolvedEvent,
	DisputeStatusChangedEvent: DisputeStatusChangedEvent,
	Disputes: Disputes,
	DmsDeliveryTaskFailedEvent: DmsDeliveryTaskFailedEvent,
	DmsDeliveryTaskStatusChangedEvent: DmsDeliveryTaskStatusChangedEvent,
	DmsDriverLocationRemovedEvent: DmsDriverLocationRemovedEvent,
	DmsMutation: {
		...customer_tracking_links_DmsMutation,
		...delivery_routes_DmsMutation,
		...delivery_tasks_DmsMutation,
		...proof_of_deliveries_DmsMutation,
		...driver_locations_DmsMutation,
		...task_events_DmsMutation,
	},
	DmsProofOfDeliveries: DmsProofOfDeliveries,
	DmsQuery: {
		...customer_tracking_links_DmsQuery,
		...delivery_routes_DmsQuery,
		...delivery_tasks_DmsQuery,
		...proof_of_deliveries_DmsQuery,
		...driver_locations_DmsQuery,
		...task_events_DmsQuery,
	},
	DmsTaskEventStatusUpdatedEvent: DmsTaskEventStatusUpdatedEvent,
	DmsTrackingLinkExpiredEvent: DmsTrackingLinkExpiredEvent,
	DocumentGeneratedEvent: DocumentGeneratedEvent,
	Documents: Documents,
	DriverLocations: DriverLocations,
	DriverSchedules: DriverSchedules,
	Drivers: Drivers,
	Expenses: Expenses,
	GeofenceEvents: GeofenceEvents,
	Geofences: Geofences,
	GpsPings: GpsPings,
	InboundShipmentItems: InboundShipmentItems,
	InboundShipments: InboundShipments,
	Interactions: Interactions,
	InventoryAdjustments: InventoryAdjustments,
	InventoryBatches: InventoryBatches,
	InventoryStock: InventoryStock,
	InvoiceDisputedEvent: InvoiceDisputedEvent,
	InvoiceItems: InvoiceItems,
	InvoiceLineItems: InvoiceLineItems,
	InvoiceOverdueEvent: InvoiceOverdueEvent,
	InvoicePaidEvent: InvoicePaidEvent,
	InvoicePartiallyPaidEvent: InvoicePartiallyPaidEvent,
	InvoiceStatusChangedEvent: InvoiceStatusChangedEvent,
	Invoices: Invoices,
	Leads: Leads,
	Locations: Locations,
	Notifications: Notifications,
	Opportunities: Opportunities,
	OpportunityProducts: OpportunityProducts,
	OutboundShipmentItems: OutboundShipmentItems,
	OutboundShipments: OutboundShipments,
	PackageItems: PackageItems,
	Packages: Packages,
	PartnerInvoiceItems: PartnerInvoiceItems,
	PartnerInvoices: PartnerInvoices,
	PaymentFailedEvent: PaymentFailedEvent,
	PaymentRefundedEvent: PaymentRefundedEvent,
	PaymentStatusChangedEvent: PaymentStatusChangedEvent,
	Payments: Payments,
	PickBatchItems: PickBatchItems,
	PickBatches: PickBatches,
	Products: Products,
	ProofOfDeliveries: ProofOfDeliveries,
	PutawayRules: PutawayRules,
	QuoteConvertedEvent: QuoteConvertedEvent,
	QuoteExpiredEvent: QuoteExpiredEvent,
	QuoteStatusChangedEvent: QuoteStatusChangedEvent,
	Quotes: Quotes,
	RateCardDeactivatedEvent: RateCardDeactivatedEvent,
	RateCards: RateCards,
	RateRules: RateRules,
	ReorderPoints: ReorderPoints,
	ReturnItems: ReturnItems,
	Returns: Returns,
	Routes: Routes,
	SalesOrderItems: SalesOrderItems,
	SalesOrders: SalesOrders,
	ShipmentCreatedFromPaymentEvent: ShipmentCreatedFromPaymentEvent,
	ShipmentLegEvents: ShipmentLegEvents,
	ShipmentLegs: ShipmentLegs,
	StockTransfers: StockTransfers,
	Suppliers: Suppliers,
	SurchargeDeactivatedEvent: SurchargeDeactivatedEvent,
	Surcharges: Surcharges,
	TaskEvents: TaskEvents,
	TaskItems: TaskItems,
	Tasks: Tasks,
	TmsDriverStatusChangedEvent: TmsDriverStatusChangedEvent,
	TmsExpenseRejectedEvent: TmsExpenseRejectedEvent,
	TmsExpenseStatusChangedEvent: TmsExpenseStatusChangedEvent,
	TmsGeofenceEvent: TmsGeofenceEvent,
	TmsMutation: {
		...partner_invoice_items_TmsMutation,
		...vehicle_maintenance_TmsMutation,
		...carriers_TmsMutation,
		...carrier_rates_TmsMutation,
		...drivers_TmsMutation,
		...driver_schedules_TmsMutation,
		...expenses_TmsMutation,
		...geofences_TmsMutation,
		...geofence_events_TmsMutation,
		...gps_pings_TmsMutation,
		...partner_invoices_TmsMutation,
		...proof_of_deliveries_TmsMutation,
		...routes_TmsMutation,
		...shipment_legs_TmsMutation,
		...shipment_leg_events_TmsMutation,
		...trips_TmsMutation,
		...trip_stops_TmsMutation,
		...vehicles_TmsMutation,
	},
	TmsQuery: {
		...carriers_TmsQuery,
		...drivers_TmsQuery,
		...expenses_TmsQuery,
		...geofences_TmsQuery,
		...gps_pings_TmsQuery,
		...partner_invoices_TmsQuery,
		...proof_of_deliveries_TmsQuery,
		...routes_TmsQuery,
		...shipment_legs_TmsQuery,
		...trips_TmsQuery,
		...vehicles_TmsQuery,
	},
	TmsTripStatusChangedEvent: TmsTripStatusChangedEvent,
	TmsTripStopSkippedEvent: TmsTripStopSkippedEvent,
	TmsVehicleStatusChangedEvent: TmsVehicleStatusChangedEvent,
	TransactionCreditedEvent: TransactionCreditedEvent,
	TransactionDebitedEvent: TransactionDebitedEvent,
	TripStops: TripStops,
	Trips: Trips,
	User: User,
	VehicleMaintenance: VehicleMaintenance,
	Vehicles: Vehicles,
	Warehouses: Warehouses,
	WmsInboundShipmentStatusChangedEvent: WmsInboundShipmentStatusChangedEvent,
	WmsInventoryAdjustmentDamagedReturnEvent:
		WmsInventoryAdjustmentDamagedReturnEvent,
	WmsInventoryAdjustmentRecordedEvent: WmsInventoryAdjustmentRecordedEvent,
	WmsInventoryStockLowStockAlertEvent: WmsInventoryStockLowStockAlertEvent,
	WmsInventoryStockReleasedEvent: WmsInventoryStockReleasedEvent,
	WmsInventoryStockReservedEvent: WmsInventoryStockReservedEvent,
	WmsInventoryStockStatusChangedEvent: WmsInventoryStockStatusChangedEvent,
	WmsMutation: {
		...inbound_shipment_items_WmsMutation,
		...outbound_shipment_items_WmsMutation,
		...package_items_WmsMutation,
		...pick_batch_items_WmsMutation,
		...return_items_WmsMutation,
		...sales_order_items_WmsMutation,
		...task_items_WmsMutation,
		...bin_thresholds_WmsMutation,
		...inbound_shipments_WmsMutation,
		...inventory_adjustments_WmsMutation,
		...inventory_batches_WmsMutation,
		...inventory_stock_WmsMutation,
		...locations_WmsMutation,
		...outbound_shipments_WmsMutation,
		...packages_WmsMutation,
		...pick_batches_WmsMutation,
		...putaway_rules_WmsMutation,
		...reorder_points_WmsMutation,
		...returns_WmsMutation,
		...sales_orders_WmsMutation,
		...stock_transfers_WmsMutation,
		...suppliers_WmsMutation,
		...tasks_WmsMutation,
		...warehouses_WmsMutation,
		...products_WmsMutation,
	},
	WmsOutboundShipmentStatusChangedEvent: WmsOutboundShipmentStatusChangedEvent,
	WmsPickBatchStatusChangedEvent: WmsPickBatchStatusChangedEvent,
	WmsProducts: WmsProducts,
	WmsQuery: {
		...bin_thresholds_WmsQuery,
		...inbound_shipments_WmsQuery,
		...inventory_adjustments_WmsQuery,
		...inventory_batches_WmsQuery,
		...inventory_stock_WmsQuery,
		...locations_WmsQuery,
		...outbound_shipments_WmsQuery,
		...packages_WmsQuery,
		...pick_batches_WmsQuery,
		...putaway_rules_WmsQuery,
		...reorder_points_WmsQuery,
		...returns_WmsQuery,
		...sales_orders_WmsQuery,
		...stock_transfers_WmsQuery,
		...suppliers_WmsQuery,
		...tasks_WmsQuery,
		...warehouses_WmsQuery,
		...products_WmsQuery,
	},
	WmsReturnItemEvaluatedEvent: WmsReturnItemEvaluatedEvent,
	WmsReturnRejectedEvent: WmsReturnRejectedEvent,
	WmsReturnStatusChangedEvent: WmsReturnStatusChangedEvent,
	WmsSalesOrderStatusChangedEvent: WmsSalesOrderStatusChangedEvent,
	WmsStockTransferStatusChangedEvent: WmsStockTransferStatusChangedEvent,
	WmsTaskAssignedEvent: WmsTaskAssignedEvent,
	WmsTaskItemShortPickedEvent: WmsTaskItemShortPickedEvent,
	WmsTaskItemStatusChangedEvent: WmsTaskItemStatusChangedEvent,
	WmsTaskPutawayCreatedEvent: WmsTaskPutawayCreatedEvent,
	WmsTaskReplenishmentCreatedEvent: WmsTaskReplenishmentCreatedEvent,
	WmsTaskStatusChangedEvent: WmsTaskStatusChangedEvent,
	File: File,
	Date: DateResolver,
};
