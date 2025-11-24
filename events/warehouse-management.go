package events

import (
	"fmt"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/core"
)

// ============================================================================
// SALES ORDER EVENTS HANDLERS
// ============================================================================

// OnOrderShipped sends an email when a sales order is shipped
func OnOrderShipped(e *core.RecordEvent) error {
	// Check if status changed to shipped
	status := e.Record.GetString("status")
	if status != "shipped" {
		return e.Next()
	}

	// Extract order information
	orderNumber := e.Record.GetString("orderNumber")
	orderID := e.Record.GetString("id")
	shippingAddress := e.Record.GetString("shippingAddress")
	clientID := e.Record.GetString("client")

	// Validate that we have required fields
	if orderNumber == "" || clientID == "" {
		return e.Next()
	}

	// Query for a contact associated with this company
	contacts, err := e.App.FindRecordsByFilter(
		"customer_relations_contacts",
		"company = {:company}",
		"", // sort
		1,  // limit
		0,  // offset
		dbx.Params{"company": clientID},
	)
	if err != nil || len(contacts) == 0 {
		return e.Next() // Skip if no contact found
	}

	// Get the first contact's email
	contactEmail := contacts[0].GetString("email")
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
	emailSubject := fmt.Sprintf("Your Order %s Has Been Shipped", orderNumber)
	emailBody := fmt.Sprintf(`
		<h2>Order Shipped</h2>
		<p>Your order has been shipped and is on its way to you!</p>
		<hr>
		<p><strong>Order Number:</strong> %s</p>
		<p><strong>Shipping Address:</strong> %s</p>
		<p><strong>Order ID:</strong> %s</p>
		<hr>
		<p>You can track your shipment for real-time updates. Thank you for your business!</p>
	`, orderNumber, shippingAddress, orderID)

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

// OnOrderCompleted sends an email when a sales order is completed
func OnOrderCompleted(e *core.RecordEvent) error {
	// Check if status changed to completed
	status := e.Record.GetString("status")
	if status != "completed" {
		return e.Next()
	}

	// Extract order information
	orderNumber := e.Record.GetString("orderNumber")
	orderID := e.Record.GetString("id")
	clientID := e.Record.GetString("client")

	// Validate that we have required fields
	if orderNumber == "" || clientID == "" {
		return e.Next()
	}

	// Query for a contact associated with this company
	contacts, err := e.App.FindRecordsByFilter(
		"customer_relations_contacts",
		"company = {:company}",
		"", // sort
		1,  // limit
		0,  // offset
		dbx.Params{"company": clientID},
	)
	if err != nil || len(contacts) == 0 {
		return e.Next() // Skip if no contact found
	}

	// Get the first contact's email
	contactEmail := contacts[0].GetString("email")
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
	emailSubject := fmt.Sprintf("Order %s Has Been Delivered", orderNumber)
	emailBody := fmt.Sprintf(`
		<h2>Order Delivered</h2>
		<p>Your order has been successfully delivered! We hope you are satisfied with your purchase.</p>
		<hr>
		<p><strong>Order Number:</strong> %s</p>
		<p><strong>Order ID:</strong> %s</p>
		<hr>
		<p>If you have any issues or questions about your order, please don't hesitate to contact us. Thank you!</p>
	`, orderNumber, orderID)

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

// OnOrderCancelled sends an email when a sales order is cancelled
func OnOrderCancelled(e *core.RecordEvent) error {
	// Check if status changed to cancelled
	status := e.Record.GetString("status")
	if status != "cancelled" {
		return e.Next()
	}

	// Extract order information
	orderNumber := e.Record.GetString("orderNumber")
	orderID := e.Record.GetString("id")
	clientID := e.Record.GetString("client")

	// Validate that we have required fields
	if orderNumber == "" || clientID == "" {
		return e.Next()
	}

	// Query for a contact associated with this company
	contacts, err := e.App.FindRecordsByFilter(
		"customer_relations_contacts",
		"company = {:company}",
		"", // sort
		1,  // limit
		0,  // offset
		dbx.Params{"company": clientID},
	)
	if err != nil || len(contacts) == 0 {
		return e.Next() // Skip if no contact found
	}

	// Get the first contact's email
	contactEmail := contacts[0].GetString("email")
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
	emailSubject := fmt.Sprintf("Order %s Has Been Cancelled", orderNumber)
	emailBody := fmt.Sprintf(`
		<h2>Order Cancelled</h2>
		<p>Your order has been cancelled. If you did not request this cancellation or have questions, please contact us.</p>
		<hr>
		<p><strong>Order Number:</strong> %s</p>
		<p><strong>Order ID:</strong> %s</p>
		<hr>
		<p>We appreciate your understanding. If you would like to place a new order, we are here to help!</p>
	`, orderNumber, orderID)

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
