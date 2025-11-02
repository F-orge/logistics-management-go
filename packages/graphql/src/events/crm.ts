import type { Selectable } from "kysely";
import type {
	CrmCaseStatus,
	CrmInvoiceStatus,
	CrmLeadStatus,
	CrmOpportunityStage,
	DB,
} from "../db.types";

export type CrmEvents = {
	// Lead Events
	"crm.lead.converted": Selectable<DB["crm.leads"]>;

	"crm.lead.statusChanged": {
		id: string;
		newStatus: CrmLeadStatus;
		previousStatus: CrmLeadStatus;
	};

	// Opportunity Events
	"crm.opportunity.stageChanged": {
		id: string;
		newStage: CrmOpportunityStage;
		previousStage: CrmOpportunityStage;
		probability: number | null;
	};
	"crm.opportunity.won": Selectable<DB["crm.opportunities"]>;
	"crm.opportunity.lost": Selectable<DB["crm.opportunities"]>;

	// Case Events
	"crm.case.statusChanged": {
		id: string;
		newStatus: CrmCaseStatus;
		previousStatus: CrmCaseStatus;
	};
	"crm.case.assigned": {
		id: string;
		ownerId: string;
		previousOwnerId: string;
	};

	// Notification Events
	"crm.notification.marked": {
		id: string;
		userId: string;
		isRead: boolean;
	};

	// Invoice Events
	"crm.invoice.statusChanged": {
		id: string;
		newStatus: CrmInvoiceStatus;
		previousStatus: CrmInvoiceStatus;
	};
	"crm.invoice.paid": Selectable<DB["crm.invoices"]>;
};
