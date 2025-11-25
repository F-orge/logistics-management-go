package events

import (
	"fmt"
	"time"

	"github.com/pocketbase/pocketbase/core"
)

// ============================================================================
// LEAD EVENTS HANDLERS
// ============================================================================

// OnLeadQualified handles the event when a lead transitions to QUALIFIED status
// It creates an email notification to the sales team
func OnLeadQualified(e *core.RecordEvent) error {
	// Get the lead record
	leadRecord := e.Record
	orig := leadRecord.Original()

	// Check if status changed TO "qualified"
	newStatus := leadRecord.GetString("status")
	oldStatus := orig.GetString("status")
	if newStatus != "qualified" || oldStatus == "qualified" {
		return e.Next()
	}

	// Extract lead information
	leadID := leadRecord.GetString("id")
	leadName := leadRecord.GetString("name")
	leadEmail := leadRecord.GetString("email")
	leadScore := leadRecord.GetFloat("score")
	ownerID := leadRecord.GetString("owner")

	// Create email record
	emailCollection, err := e.App.FindCollectionByNameOrId("emails")
	if err != nil {
		return fmt.Errorf("failed to find emails collection: %w", err)
	}

	emailRecord := core.NewRecord(emailCollection)
	emailProxy := &Emails{}
	emailProxy.SetProxyRecord(emailRecord)

	// Build email content
	emailSubject := fmt.Sprintf("Lead Qualified: %s (Score: %.0f)", leadName, leadScore)
	emailBody := fmt.Sprintf(`
		<h2>Lead Qualified Notification</h2>
		<p>A new lead has been qualified and is ready for follow-up.</p>
		<hr>
		<p><strong>Lead Name:</strong> %s</p>
		<p><strong>Email:</strong> %s</p>
		<p><strong>Lead Score:</strong> %.0f/100</p>
		<p><strong>Lead ID:</strong> %s</p>
		<p><strong>Status:</strong> Qualified</p>
		<p><strong>Qualified At:</strong> %s</p>
		<hr>
		<p>Please reach out to this lead as soon as possible to move them to the next stage.</p>
	`, leadName, leadEmail, leadScore, leadID, time.Now().Format("2006-01-02 15:04:05"))

	// Set email fields
	emailProxy.SetTo(leadEmail)
	emailProxy.SetSubject(emailSubject)
	emailProxy.SetMessage(emailBody)
	emailProxy.SetUserId(ownerID) // Set to lead owner

	// Save the email record
	if err := e.App.Save(emailProxy); err != nil {
		return fmt.Errorf("failed to save email record: %w", err)
	}

	// Continue with the next event handler
	return e.Next()
}

// OnLeadConverted handles the event when a lead is converted to a customer
// It creates an email notification to the customer success team
func OnLeadConverted(e *core.RecordEvent) error {
	// Get the lead record
	leadRecord := e.Record
	orig := leadRecord.Original()

	// Check if status changed TO "converted"
	newStatus := leadRecord.GetString("status")
	oldStatus := orig.GetString("status")
	if newStatus != "converted" || oldStatus == "converted" {
		return e.Next()
	}

	// Extract lead information
	leadID := leadRecord.GetString("id")
	leadName := leadRecord.GetString("name")
	leadEmail := leadRecord.GetString("email")
	ownerID := leadRecord.GetString("owner")
	convertedContactID := leadRecord.GetString("convertedContact")
	convertedCompanyID := leadRecord.GetString("convertedCompany")

	// Create email record
	emailCollection, err := e.App.FindCollectionByNameOrId("emails")
	if err != nil {
		return fmt.Errorf("failed to find emails collection: %w", err)
	}

	emailRecord := core.NewRecord(emailCollection)
	emailProxy := &Emails{}
	emailProxy.SetProxyRecord(emailRecord)

	// Build email content
	emailSubject := fmt.Sprintf("Lead Converted: %s", leadName)
	emailBody := fmt.Sprintf(`
		<h2>Lead Conversion Notification</h2>
		<p>A lead has been successfully converted to a customer.</p>
		<hr>
		<p><strong>Lead Name:</strong> %s</p>
		<p><strong>Email:</strong> %s</p>
		<p><strong>Lead ID:</strong> %s</p>
		<p><strong>Converted Contact ID:</strong> %s</p>
		<p><strong>Converted Company ID:</strong> %s</p>
		<p><strong>Converted At:</strong> %s</p>
		<hr>
		<p>Please begin onboarding and customer success activities.</p>
	`, leadName, leadEmail, leadID, convertedContactID, convertedCompanyID, time.Now().Format("2006-01-02 15:04:05"))

	// Set email fields
	emailProxy.SetTo(leadEmail)
	emailProxy.SetSubject(emailSubject)
	emailProxy.SetMessage(emailBody)
	emailProxy.SetUserId(ownerID)

	// Save the email record
	if err := e.App.Save(emailProxy); err != nil {
		return fmt.Errorf("failed to save email record: %w", err)
	}

	return e.Next()
}

// OnLeadUnqualified handles the event when a lead is marked as unqualified
// It creates an internal notification for archival
func OnLeadUnqualified(e *core.RecordEvent) error {
	// Get the lead record
	leadRecord := e.Record
	orig := leadRecord.Original()

	// Check if status changed TO "unqualified"
	newStatus := leadRecord.GetString("status")
	oldStatus := orig.GetString("status")
	if newStatus != "unqualified" || oldStatus == "unqualified" {
		return e.Next()
	}

	// Extract lead information
	leadID := leadRecord.GetString("id")
	leadName := leadRecord.GetString("name")
	leadEmail := leadRecord.GetString("email")
	ownerID := leadRecord.GetString("owner")

	// Create email record
	emailCollection, err := e.App.FindCollectionByNameOrId("emails")
	if err != nil {
		return fmt.Errorf("failed to find emails collection: %w", err)
	}

	emailRecord := core.NewRecord(emailCollection)
	emailProxy := &Emails{}
	emailProxy.SetProxyRecord(emailRecord)

	// Build email content
	emailSubject := fmt.Sprintf("Lead Unqualified: %s", leadName)
	emailBody := fmt.Sprintf(`
		<h2>Lead Unqualified Notification</h2>
		<p>The following lead has been marked as unqualified and archived.</p>
		<hr>
		<p><strong>Lead Name:</strong> %s</p>
		<p><strong>Email:</strong> %s</p>
		<p><strong>Lead ID:</strong> %s</p>
		<p><strong>Unqualified At:</strong> %s</p>
		<hr>
		<p>This lead has been archived and may be reviewed at a later time.</p>
	`, leadName, leadEmail, leadID, time.Now().Format("2006-01-02 15:04:05"))

	// Set email fields
	emailProxy.SetTo(leadEmail)
	emailProxy.SetSubject(emailSubject)
	emailProxy.SetMessage(emailBody)
	emailProxy.SetUserId(ownerID)

	// Save the email record
	if err := e.App.Save(emailProxy); err != nil {
		return fmt.Errorf("failed to save email record: %w", err)
	}

	return e.Next()
}

// ============================================================================
// OPPORTUNITY EVENTS HANDLERS
// ============================================================================

// OnOpportunityCreated handles the event when a new opportunity is created
// It sends a notification to the contact/customer
func OnOpportunityCreated(e *core.RecordEvent) error {
	// Get the opportunity record
	oppRecord := e.Record

	// Extract opportunity information
	oppID := oppRecord.GetString("id")
	oppName := oppRecord.GetString("name")
	dealValue := oppRecord.GetFloat("dealValue")
	stage := oppRecord.GetString("stage")
	expectedCloseDate := oppRecord.GetString("expectedCloseDate")

	// Get contact to retrieve email
	contactID := oppRecord.GetString("contact")
	if contactID == "" {
		return e.Next() // Skip if no contact
	}

	contactCollection, err := e.App.FindCollectionByNameOrId("customer_relations_contacts")
	if err != nil {
		return fmt.Errorf("failed to find contacts collection: %w", err)
	}

	contactRecord, err := e.App.FindRecordById(contactCollection, contactID)
	if err != nil {
		return fmt.Errorf("failed to find contact: %w", err)
	}

	contactEmail := contactRecord.GetString("email")

	if contactEmail == "" {
		return e.Next() // Skip if no email
	}

	// Create email record
	emailCollection, err := e.App.FindCollectionByNameOrId("emails")
	if err != nil {
		return fmt.Errorf("failed to find emails collection: %w", err)
	}

	emailRecord := core.NewRecord(emailCollection)
	emailProxy := &Emails{}
	emailProxy.SetProxyRecord(emailRecord)

	// Build email content
	emailSubject := fmt.Sprintf("New Opportunity: %s", oppName)
	emailBody := fmt.Sprintf(`
		<h2>New Opportunity</h2>
		<p>We've created a new opportunity for you:</p>
		<hr>
		<p><strong>Opportunity Name:</strong> %s</p>
		<p><strong>Deal Value:</strong> ₱%.2f</p>
		<p><strong>Current Stage:</strong> %s</p>
		<p><strong>Expected Close Date:</strong> %s</p>
		<p><strong>Opportunity ID:</strong> %s</p>
		<hr>
		<p>We look forward to working with you on this opportunity.</p>
	`, oppName, dealValue, stage, expectedCloseDate, oppID)

	// Set email fields
	emailProxy.SetTo(contactEmail)
	emailProxy.SetSubject(emailSubject)
	emailProxy.SetMessage(emailBody)

	// Save the email record
	if err := e.App.Save(emailProxy); err != nil {
		return fmt.Errorf("failed to save email record: %w", err)
	}

	return e.Next()
}

// OnOpportunityClosed handles the event when an opportunity is closed (won or lost)
// It sends a notification to the contact with the outcome
func OnOpportunityClosed(e *core.RecordEvent) error {
	// Get the opportunity record
	oppRecord := e.Record

	// Check if opportunity is in a closed state
	stage := oppRecord.GetString("stage")
	if stage != "closed-won" && stage != "closed-lost" {
		return e.Next()
	}

	// Extract opportunity information
	oppID := oppRecord.GetString("id")
	oppName := oppRecord.GetString("name")
	dealValue := oppRecord.GetFloat("dealValue")
	lostReason := oppRecord.GetString("lostReason")

	// Get contact to retrieve email
	contactID := oppRecord.GetString("contact")
	if contactID == "" {
		return e.Next() // Skip if no contact
	}

	contactCollection, err := e.App.FindCollectionByNameOrId("customer_relations_contacts")
	if err != nil {
		return fmt.Errorf("failed to find contacts collection: %w", err)
	}

	contactRecord, err := e.App.FindRecordById(contactCollection, contactID)
	if err != nil {
		return fmt.Errorf("failed to find contact: %w", err)
	}

	contactEmail := contactRecord.GetString("email")

	if contactEmail == "" {
		return e.Next() // Skip if no email
	}

	// Create email record
	emailCollection, err := e.App.FindCollectionByNameOrId("emails")
	if err != nil {
		return fmt.Errorf("failed to find emails collection: %w", err)
	}

	emailRecord := core.NewRecord(emailCollection)
	emailProxy := &Emails{}
	emailProxy.SetProxyRecord(emailRecord)

	// Build email content based on outcome
	var emailSubject, emailBody string

	if stage == "closed-won" {
		emailSubject = fmt.Sprintf("Opportunity Won: %s", oppName)
		emailBody = fmt.Sprintf(`
			<h2>Opportunity Won!</h2>
			<p>Great news! We're excited to announce that your opportunity has been closed successfully.</p>
			<hr>
			<p><strong>Opportunity Name:</strong> %s</p>
			<p><strong>Deal Value:</strong> ₱%.2f</p>
			<p><strong>Status:</strong> Closed - Won</p>
			<p><strong>Opportunity ID:</strong> %s</p>
			<hr>
			<p>Thank you for your business. We look forward to a great partnership!</p>
		`, oppName, dealValue, oppID)
	} else {
		emailSubject = fmt.Sprintf("Opportunity Status Update: %s", oppName)
		emailBody = fmt.Sprintf(`
			<h2>Opportunity Closed</h2>
			<p>We wanted to inform you that your opportunity has been closed.</p>
			<hr>
			<p><strong>Opportunity Name:</strong> %s</p>
			<p><strong>Deal Value:</strong> ₱%.2f</p>
			<p><strong>Status:</strong> Closed - Lost</p>
			<p><strong>Reason:</strong> %s</p>
			<p><strong>Opportunity ID:</strong> %s</p>
			<hr>
			<p>We appreciate your consideration and hope to work together in the future.</p>
		`, oppName, dealValue, lostReason, oppID)
	}

	// Set email fields
	emailProxy.SetTo(contactEmail)
	emailProxy.SetSubject(emailSubject)
	emailProxy.SetMessage(emailBody)

	// Save the email record
	if err := e.App.Save(emailProxy); err != nil {
		return fmt.Errorf("failed to save email record: %w", err)
	}

	return e.Next()
}

// OnProposalSent handles the event when an opportunity moves to PROPOSAL stage
// It sends the proposal details to the contact
func OnProposalSent(e *core.RecordEvent) error {
	// Get the opportunity record
	oppRecord := e.Record

	// Check if stage changed to proposal
	stage := oppRecord.GetString("stage")
	if stage != "proposal" {
		return e.Next()
	}

	// Extract opportunity information
	oppID := oppRecord.GetString("id")
	oppName := oppRecord.GetString("name")
	dealValue := oppRecord.GetFloat("deal_value")

	// Get contact to retrieve email
	contactID := oppRecord.GetString("contact")
	if contactID == "" {
		return e.Next() // Skip if no contact
	}

	contactCollection, err := e.App.FindCollectionByNameOrId("customer_relations_contacts")
	if err != nil {
		return fmt.Errorf("failed to find contacts collection: %w", err)
	}

	contactRecord, err := e.App.FindRecordById(contactCollection, contactID)
	if err != nil {
		return fmt.Errorf("failed to find contact: %w", err)
	}

	contactEmail := contactRecord.GetString("email")

	if contactEmail == "" {
		return e.Next() // Skip if no email
	}

	// Create email record
	emailCollection, err := e.App.FindCollectionByNameOrId("emails")
	if err != nil {
		return fmt.Errorf("failed to find emails collection: %w", err)
	}

	emailRecord := core.NewRecord(emailCollection)
	emailProxy := &Emails{}
	emailProxy.SetProxyRecord(emailRecord)

	// Build email content
	emailSubject := fmt.Sprintf("Your Proposal: %s", oppName)
	emailBody := fmt.Sprintf(`
		<h2>Proposal Submitted</h2>
		<p>We're pleased to submit our proposal for your consideration.</p>
		<hr>
		<p><strong>Opportunity Name:</strong> %s</p>
		<p><strong>Proposed Value:</strong> ₱%.2f</p>
		<p><strong>Proposal Status:</strong> Under Review</p>
		<p><strong>Reference ID:</strong> %s</p>
		<hr>
		<p>Please review the proposal at your convenience. We're available to discuss any questions or modifications you may have.</p>
	`, oppName, dealValue, oppID)

	// Set email fields
	emailProxy.SetTo(contactEmail)
	emailProxy.SetSubject(emailSubject)
	emailProxy.SetMessage(emailBody)

	// Save the email record
	if err := e.App.Save(emailProxy); err != nil {
		return fmt.Errorf("failed to save email record: %w", err)
	}

	return e.Next()
}

// OnCaseCreated sends an email when a new support case is created
func OnCaseCreated(e *core.RecordEvent) error {
	// Extract case information
	caseNumber := e.Record.GetString("caseNumber")
	caseDescription := e.Record.GetString("description")
	contactID := e.Record.GetString("contact")
	priority := e.Record.GetString("priority")

	// Get contact to retrieve email
	contactCollection, err := e.App.FindCollectionByNameOrId("customer_relations_contacts")
	if err != nil {
		return fmt.Errorf("failed to find contacts collection: %w", err)
	}

	contact, err := e.App.FindRecordById(contactCollection, contactID)
	if err != nil {
		return nil // Skip if contact not found
	}

	contactEmail := contact.GetString("email")
	if contactEmail == "" {
		return e.Next()
	}

	// Find emails collection
	emailsCollection, err := e.App.FindCollectionByNameOrId("emails")
	if err != nil {
		return fmt.Errorf("failed to find emails collection: %w", err)
	}

	// Create new email record
	emailRecord := core.NewRecord(emailsCollection)
	emailProxy := &Emails{}
	emailProxy.SetProxyRecord(emailRecord)

	// Build email content
	emailSubject := fmt.Sprintf("New Support Case Created: %s", caseNumber)
	emailBody := fmt.Sprintf(`
		<h2>Your support case has been created</h2>
		<p>Thank you for reaching out. We have created a support case for you.</p>
		<p><strong>Case Number:</strong> %s</p>
		<p><strong>Priority:</strong> %s</p>
		<p><strong>Description:</strong> %s</p>
		<p>Our support team will be in touch with you shortly.</p>
	`, caseNumber, priority, caseDescription)

	// Set email fields
	emailProxy.SetTo(contactEmail)
	emailProxy.SetSubject(emailSubject)
	emailProxy.SetMessage(emailBody)

	// Save the email record
	if err := e.App.Save(emailProxy); err != nil {
		return fmt.Errorf("failed to save email record: %w", err)
	}

	return e.Next()
}

// OnCaseAssigned sends an email when a support case is assigned
func OnCaseAssigned(e *core.RecordEvent) error {
	// Check if the record has changed owner field
	newOwner := e.Record.GetString("owner")
	if newOwner == "" {
		return e.Next()
	}

	// Extract case information
	caseNumber := e.Record.GetString("caseNumber")
	contactID := e.Record.GetString("contact")

	// Get contact to retrieve email
	contactCollection, err := e.App.FindCollectionByNameOrId("customer_relations_contacts")
	if err != nil {
		return fmt.Errorf("failed to find contacts collection: %w", err)
	}

	contact, err := e.App.FindRecordById(contactCollection, contactID)
	if err != nil {
		return nil // Skip if contact not found
	}

	contactEmail := contact.GetString("email")
	if contactEmail == "" {
		return e.Next()
	}

	// Find emails collection
	emailsCollection, err := e.App.FindCollectionByNameOrId("emails")
	if err != nil {
		return fmt.Errorf("failed to find emails collection: %w", err)
	}

	// Create new email record
	emailRecord := core.NewRecord(emailsCollection)
	emailProxy := &Emails{}
	emailProxy.SetProxyRecord(emailRecord)

	// Build email content
	emailSubject := fmt.Sprintf("Your Support Case Has Been Assigned: %s", caseNumber)
	emailBody := fmt.Sprintf(`
		<h2>Your support case has been assigned</h2>
		<p>Your case has been assigned to our support team and we are actively working on resolving it.</p>
		<p><strong>Case Number:</strong> %s</p>
		<p>We appreciate your patience and will keep you updated on the progress.</p>
	`, caseNumber)

	// Set email fields
	emailProxy.SetTo(contactEmail)
	emailProxy.SetSubject(emailSubject)
	emailProxy.SetMessage(emailBody)

	// Save the email record
	if err := e.App.Save(emailProxy); err != nil {
		return fmt.Errorf("failed to save email record: %w", err)
	}

	return e.Next()
}

// OnCaseEscalated sends an email when a support case is escalated
func OnCaseEscalated(e *core.RecordEvent) error {
	// Check if status is escalated
	status := e.Record.GetString("status")
	if status != "escalated" {
		return e.Next()
	}

	// Extract case information
	caseNumber := e.Record.GetString("caseNumber")
	contactID := e.Record.GetString("contact")

	// Get contact to retrieve email
	contactCollection, err := e.App.FindCollectionByNameOrId("customer_relations_contacts")
	if err != nil {
		return fmt.Errorf("failed to find contacts collection: %w", err)
	}

	contact, err := e.App.FindRecordById(contactCollection, contactID)
	if err != nil {
		return nil // Skip if contact not found
	}

	contactEmail := contact.GetString("email")
	if contactEmail == "" {
		return e.Next()
	}

	// Find emails collection
	emailsCollection, err := e.App.FindCollectionByNameOrId("emails")
	if err != nil {
		return fmt.Errorf("failed to find emails collection: %w", err)
	}

	// Create new email record
	emailRecord := core.NewRecord(emailsCollection)
	emailProxy := &Emails{}
	emailProxy.SetProxyRecord(emailRecord)

	// Build email content
	emailSubject := fmt.Sprintf("Your Support Case Has Been Escalated: %s", caseNumber)
	emailBody := fmt.Sprintf(`
		<h2>Your support case has been escalated</h2>
		<p>Due to the complexity of your case, it has been escalated to our senior support team. This ensures your issue receives the highest level of attention.</p>
		<p><strong>Case Number:</strong> %s</p>
		<p>Thank you for your patience. We will prioritize this case and resolve it as quickly as possible.</p>
	`, caseNumber)

	// Set email fields
	emailProxy.SetTo(contactEmail)
	emailProxy.SetSubject(emailSubject)
	emailProxy.SetMessage(emailBody)

	// Save the email record
	if err := e.App.Save(emailProxy); err != nil {
		return fmt.Errorf("failed to save email record: %w", err)
	}

	return e.Next()
}

// OnCaseResolved sends an email when a support case is resolved
func OnCaseResolved(e *core.RecordEvent) error {
	// Check if status is resolved
	status := e.Record.GetString("status")
	if status != "resolved" {
		return e.Next()
	}

	// Extract case information
	caseNumber := e.Record.GetString("caseNumber")
	caseDescription := e.Record.GetString("description")
	contactID := e.Record.GetString("contact")

	// Get contact to retrieve email
	contactCollection, err := e.App.FindCollectionByNameOrId("customer_relations_contacts")
	if err != nil {
		return fmt.Errorf("failed to find contacts collection: %w", err)
	}

	contact, err := e.App.FindRecordById(contactCollection, contactID)
	if err != nil {
		return nil // Skip if contact not found
	}

	contactEmail := contact.GetString("email")
	if contactEmail == "" {
		return e.Next()
	}

	// Find emails collection
	emailsCollection, err := e.App.FindCollectionByNameOrId("emails")
	if err != nil {
		return fmt.Errorf("failed to find emails collection: %w", err)
	}

	// Create new email record
	emailRecord := core.NewRecord(emailsCollection)
	emailProxy := &Emails{}
	emailProxy.SetProxyRecord(emailRecord)

	// Build email content
	emailSubject := fmt.Sprintf("Your Support Case Has Been Resolved: %s", caseNumber)
	emailBody := fmt.Sprintf(`
		<h2>Your support case has been resolved</h2>
		<p>We are pleased to inform you that your support case has been resolved.</p>
		<p><strong>Case Number:</strong> %s</p>
		<p><strong>Description:</strong> %s</p>
		<p>Please feel free to reach out if you have any further questions or concerns. Thank you for your patience!</p>
	`, caseNumber, caseDescription)

	// Set email fields
	emailProxy.SetTo(contactEmail)
	emailProxy.SetSubject(emailSubject)
	emailProxy.SetMessage(emailBody)

	// Save the email record
	if err := e.App.Save(emailProxy); err != nil {
		return fmt.Errorf("failed to save email record: %w", err)
	}

	return e.Next()
}

// OnCaseClosed sends an email when a support case is closed
func OnCaseClosed(e *core.RecordEvent) error {
	// Check if status is closed
	status := e.Record.GetString("status")
	if status != "closed" {
		return e.Next()
	}

	// Extract case information
	caseNumber := e.Record.GetString("caseNumber")
	contactID := e.Record.GetString("contact")

	// Get contact to retrieve email
	contactCollection, err := e.App.FindCollectionByNameOrId("customer_relations_contacts")
	if err != nil {
		return fmt.Errorf("failed to find contacts collection: %w", err)
	}

	contact, err := e.App.FindRecordById(contactCollection, contactID)
	if err != nil {
		return nil // Skip if contact not found
	}

	contactEmail := contact.GetString("email")
	if contactEmail == "" {
		return e.Next()
	}

	// Find emails collection
	emailsCollection, err := e.App.FindCollectionByNameOrId("emails")
	if err != nil {
		return fmt.Errorf("failed to find emails collection: %w", err)
	}

	// Create new email record
	emailRecord := core.NewRecord(emailsCollection)
	emailProxy := &Emails{}
	emailProxy.SetProxyRecord(emailRecord)

	// Build email content
	emailSubject := fmt.Sprintf("Your Support Case Is Now Closed: %s", caseNumber)
	emailBody := fmt.Sprintf(`
		<h2>Your support case has been closed</h2>
		<p>Your support case has been closed. If the issue resurfaces or you need further assistance, please open a new case.</p>
		<p><strong>Case Number:</strong> %s</p>
		<p>Thank you for choosing our services!</p>
	`, caseNumber)

	// Set email fields
	emailProxy.SetTo(contactEmail)
	emailProxy.SetSubject(emailSubject)
	emailProxy.SetMessage(emailBody)

	// Save the email record
	if err := e.App.Save(emailProxy); err != nil {
		return fmt.Errorf("failed to save email record: %w", err)
	}

	return e.Next()
}

// ============================================================================
// INVOICE EVENTS HANDLERS
// ============================================================================

// OnInvoiceSent sends an email when an invoice is sent to the customer
func OnInvoiceSent(e *core.RecordEvent) error {
	// Check if status changed to sent
	status := e.Record.GetString("status")
	if status != "sent" {
		return e.Next()
	}

	// Extract invoice information
	invoiceNumber := e.Record.GetString("invoiceNumber")
	invoiceID := e.Record.GetString("id")
	total := e.Record.GetFloat("total")
	dueDate := e.Record.GetString("dueDate")
	opportunityID := e.Record.GetString("opportunity")

	// Get opportunity to retrieve contact
	opportunityCollection, err := e.App.FindCollectionByNameOrId("customer_relations_opportunities")
	if err != nil {
		return fmt.Errorf("failed to find opportunities collection: %w", err)
	}

	opportunity, err := e.App.FindRecordById(opportunityCollection, opportunityID)
	if err != nil {
		return nil // Skip if opportunity not found
	}

	contactID := opportunity.GetString("contact")
	if contactID == "" {
		return e.Next() // Skip if no contact
	}

	// Get contact to retrieve email
	contactCollection, err := e.App.FindCollectionByNameOrId("customer_relations_contacts")
	if err != nil {
		return fmt.Errorf("failed to find contacts collection: %w", err)
	}

	contact, err := e.App.FindRecordById(contactCollection, contactID)
	if err != nil {
		return nil // Skip if contact not found
	}

	contactEmail := contact.GetString("email")
	if contactEmail == "" {
		return e.Next()
	}

	// Find emails collection
	emailsCollection, err := e.App.FindCollectionByNameOrId("emails")
	if err != nil {
		return fmt.Errorf("failed to find emails collection: %w", err)
	}

	// Create new email record
	emailRecord := core.NewRecord(emailsCollection)
	emailProxy := &Emails{}
	emailProxy.SetProxyRecord(emailRecord)

	// Build email content
	emailSubject := fmt.Sprintf("Invoice %s Ready for Payment", invoiceNumber)
	emailBody := fmt.Sprintf(`
		<h2>Invoice Sent</h2>
		<p>Your invoice is ready. Please review and process payment at your earliest convenience.</p>
		<hr>
		<p><strong>Invoice Number:</strong> %s</p>
		<p><strong>Amount Due:</strong> ₱%.2f</p>
		<p><strong>Due Date:</strong> %s</p>
		<p><strong>Invoice ID:</strong> %s</p>
		<hr>
		<p>If you have any questions, please don't hesitate to reach out.</p>
	`, invoiceNumber, total, dueDate, invoiceID)

	// Set email fields
	emailProxy.SetTo(contactEmail)
	emailProxy.SetSubject(emailSubject)
	emailProxy.SetMessage(emailBody)

	// Save the email record
	if err := e.App.Save(emailProxy); err != nil {
		return fmt.Errorf("failed to save email record: %w", err)
	}

	return e.Next()
}

// OnInvoicePaid sends an email when an invoice payment is received
func OnInvoicePaid(e *core.RecordEvent) error {
	// Check if status changed to paid
	status := e.Record.GetString("status")
	if status != "paid" {
		return e.Next()
	}

	// Extract invoice information
	invoiceNumber := e.Record.GetString("invoiceNumber")
	invoiceID := e.Record.GetString("id")
	total := e.Record.GetFloat("total")
	paymentMethod := e.Record.GetString("paymentMethod")
	opportunityID := e.Record.GetString("opportunity")

	// Get opportunity to retrieve contact
	opportunityCollection, err := e.App.FindCollectionByNameOrId("customer_relations_opportunities")
	if err != nil {
		return fmt.Errorf("failed to find opportunities collection: %w", err)
	}

	opportunity, err := e.App.FindRecordById(opportunityCollection, opportunityID)
	if err != nil {
		return nil // Skip if opportunity not found
	}

	contactID := opportunity.GetString("contact")
	if contactID == "" {
		return e.Next() // Skip if no contact
	}

	// Get contact to retrieve email
	contactCollection, err := e.App.FindCollectionByNameOrId("customer_relations_contacts")
	if err != nil {
		return fmt.Errorf("failed to find contacts collection: %w", err)
	}

	contact, err := e.App.FindRecordById(contactCollection, contactID)
	if err != nil {
		return nil // Skip if contact not found
	}

	contactEmail := contact.GetString("email")
	if contactEmail == "" {
		return e.Next()
	}

	// Find emails collection
	emailsCollection, err := e.App.FindCollectionByNameOrId("emails")
	if err != nil {
		return fmt.Errorf("failed to find emails collection: %w", err)
	}

	// Create new email record
	emailRecord := core.NewRecord(emailsCollection)
	emailProxy := &Emails{}
	emailProxy.SetProxyRecord(emailRecord)

	// Build email content
	emailSubject := fmt.Sprintf("Payment Received for Invoice %s", invoiceNumber)
	emailBody := fmt.Sprintf(`
		<h2>Payment Received</h2>
		<p>Thank you! We have received your payment. Your invoice is now fully paid.</p>
		<hr>
		<p><strong>Invoice Number:</strong> %s</p>
		<p><strong>Amount Paid:</strong> ₱%.2f</p>
		<p><strong>Payment Method:</strong> %s</p>
		<p><strong>Invoice ID:</strong> %s</p>
		<hr>
		<p>We appreciate your prompt payment. Thank you for your business!</p>
	`, invoiceNumber, total, paymentMethod, invoiceID)

	// Set email fields
	emailProxy.SetTo(contactEmail)
	emailProxy.SetSubject(emailSubject)
	emailProxy.SetMessage(emailBody)

	// Save the email record
	if err := e.App.Save(emailProxy); err != nil {
		return fmt.Errorf("failed to save email record: %w", err)
	}

	return e.Next()
}

// OnInvoiceOverdue sends a payment reminder when an invoice becomes overdue
func OnInvoiceOverdue(e *core.RecordEvent) error {
	// Check if status changed to overdue
	status := e.Record.GetString("status")
	if status != "overdue" {
		return e.Next()
	}

	// Extract invoice information
	invoiceNumber := e.Record.GetString("invoiceNumber")
	invoiceID := e.Record.GetString("id")
	total := e.Record.GetFloat("total")
	dueDate := e.Record.GetString("dueDate")
	opportunityID := e.Record.GetString("opportunity")

	// Get opportunity to retrieve contact
	opportunityCollection, err := e.App.FindCollectionByNameOrId("customer_relations_opportunities")
	if err != nil {
		return fmt.Errorf("failed to find opportunities collection: %w", err)
	}

	opportunity, err := e.App.FindRecordById(opportunityCollection, opportunityID)
	if err != nil {
		return nil // Skip if opportunity not found
	}

	contactID := opportunity.GetString("contact")
	if contactID == "" {
		return e.Next() // Skip if no contact
	}

	// Get contact to retrieve email
	contactCollection, err := e.App.FindCollectionByNameOrId("customer_relations_contacts")
	if err != nil {
		return fmt.Errorf("failed to find contacts collection: %w", err)
	}

	contact, err := e.App.FindRecordById(contactCollection, contactID)
	if err != nil {
		return nil // Skip if contact not found
	}

	contactEmail := contact.GetString("email")
	if contactEmail == "" {
		return e.Next()
	}

	// Find emails collection
	emailsCollection, err := e.App.FindCollectionByNameOrId("emails")
	if err != nil {
		return fmt.Errorf("failed to find emails collection: %w", err)
	}

	// Create new email record
	emailRecord := core.NewRecord(emailsCollection)
	emailProxy := &Emails{}
	emailProxy.SetProxyRecord(emailRecord)

	// Build email content
	emailSubject := fmt.Sprintf("Payment Reminder: Invoice %s is Overdue", invoiceNumber)
	emailBody := fmt.Sprintf(`
		<h2>Payment Overdue Notice</h2>
		<p>This is a friendly reminder that your invoice payment is now overdue. Please remit payment as soon as possible.</p>
		<hr>
		<p><strong>Invoice Number:</strong> %s</p>
		<p><strong>Amount Due:</strong> ₱%.2f</p>
		<p><strong>Due Date:</strong> %s</p>
		<p><strong>Invoice ID:</strong> %s</p>
		<hr>
		<p>If payment has already been sent, please disregard this notice. If you have questions, please contact us.</p>
	`, invoiceNumber, total, dueDate, invoiceID)

	// Set email fields
	emailProxy.SetTo(contactEmail)
	emailProxy.SetSubject(emailSubject)
	emailProxy.SetMessage(emailBody)

	// Save the email record
	if err := e.App.Save(emailProxy); err != nil {
		return fmt.Errorf("failed to save email record: %w", err)
	}

	return e.Next()
}

// OnInvoiceCancelled sends a notification when an invoice is cancelled
func OnInvoiceCancelled(e *core.RecordEvent) error {
	// Check if status changed to cancelled
	status := e.Record.GetString("status")
	if status != "cancelled" {
		return e.Next()
	}

	// Extract invoice information
	invoiceNumber := e.Record.GetString("invoiceNumber")
	invoiceID := e.Record.GetString("id")
	opportunityID := e.Record.GetString("opportunity")

	// Get opportunity to retrieve contact
	opportunityCollection, err := e.App.FindCollectionByNameOrId("customer_relations_opportunities")
	if err != nil {
		return fmt.Errorf("failed to find opportunities collection: %w", err)
	}

	opportunity, err := e.App.FindRecordById(opportunityCollection, opportunityID)
	if err != nil {
		return nil // Skip if opportunity not found
	}

	contactID := opportunity.GetString("contact")
	if contactID == "" {
		return e.Next() // Skip if no contact
	}

	// Get contact to retrieve email
	contactCollection, err := e.App.FindCollectionByNameOrId("customer_relations_contacts")
	if err != nil {
		return fmt.Errorf("failed to find contacts collection: %w", err)
	}

	contact, err := e.App.FindRecordById(contactCollection, contactID)
	if err != nil {
		return nil // Skip if contact not found
	}

	contactEmail := contact.GetString("email")
	if contactEmail == "" {
		return e.Next()
	}

	// Find emails collection
	emailsCollection, err := e.App.FindCollectionByNameOrId("emails")
	if err != nil {
		return fmt.Errorf("failed to find emails collection: %w", err)
	}

	// Create new email record
	emailRecord := core.NewRecord(emailsCollection)
	emailProxy := &Emails{}
	emailProxy.SetProxyRecord(emailRecord)

	// Build email content
	emailSubject := fmt.Sprintf("Invoice %s Has Been Cancelled", invoiceNumber)
	emailBody := fmt.Sprintf(`
		<h2>Invoice Cancelled</h2>
		<p>We are writing to inform you that the following invoice has been cancelled and is no longer valid.</p>
		<hr>
		<p><strong>Invoice Number:</strong> %s</p>
		<p><strong>Invoice ID:</strong> %s</p>
		<hr>
		<p>If you have any questions regarding this cancellation, please contact us.</p>
	`, invoiceNumber, invoiceID)

	// Set email fields
	emailProxy.SetTo(contactEmail)
	emailProxy.SetSubject(emailSubject)
	emailProxy.SetMessage(emailBody)

	// Save the email record
	if err := e.App.Save(emailProxy); err != nil {
		return fmt.Errorf("failed to save email record: %w", err)
	}

	return e.Next()
}
