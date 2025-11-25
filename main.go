package main

import (
	"log"
	"os"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"

	"github.com/f-org-e/logistics-management-go/events"
	_ "github.com/f-org-e/logistics-management-go/migrations"
)

func main() {

	app := pocketbase.New()

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		Automigrate: true,
	})

	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.GET("/{path...}", apis.Static(os.DirFS("./frontend"), true))
		return se.Next()
	})

	// events

	// customer relations - leads
	app.OnRecordUpdate("customer_relations_leads").BindFunc(func(e *core.RecordEvent) error {
		// Handle lead qualified transition
		if e.Record.GetString("status") == "qualified" {
			return events.OnLeadQualified(e)
		}
		// Handle lead converted transition
		if e.Record.GetString("status") == "converted" {
			return events.OnLeadConverted(e)
		}
		// Handle lead unqualified transition
		if e.Record.GetString("status") == "unqualified" {
			return events.OnLeadUnqualified(e)
		}
		return e.Next()
	})

	// customer relations - opportunities
	app.OnRecordUpdate("customer_relations_opportunities").BindFunc(func(e *core.RecordEvent) error {
		// Handle opportunity closed transition
		if stage := e.Record.GetString("stage"); stage == "closed-won" || stage == "closed-lost" {
			return events.OnOpportunityClosed(e)
		}
		// Handle proposal sent transition
		if e.Record.GetString("stage") == "proposal" {
			return events.OnProposalSent(e)
		}
		return e.Next()
	})

	// Handle opportunity creation
	app.OnRecordCreate("customer_relations_opportunities").BindFunc(func(e *core.RecordEvent) error {
		return events.OnOpportunityCreated(e)
	})

	// customer relations - cases
	app.OnRecordUpdate("customer_relations_cases").BindFunc(func(e *core.RecordEvent) error {
		// Handle case escalated transition
		if e.Record.GetString("status") == "escalated" {
			return events.OnCaseEscalated(e)
		}
		// Handle case resolved transition
		if e.Record.GetString("status") == "resolved" {
			return events.OnCaseResolved(e)
		}
		// Handle case closed transition
		if e.Record.GetString("status") == "closed" {
			return events.OnCaseClosed(e)
		}
		// Handle case assigned transition
		if e.Record.GetString("owner") != "" {
			return events.OnCaseAssigned(e)
		}
		return e.Next()
	})

	// Handle case creation
	app.OnRecordCreate("customer_relations_cases").BindFunc(func(e *core.RecordEvent) error {
		return events.OnCaseCreated(e)
	})

	// customer relations - invoices
	app.OnRecordUpdate("customer_relations_invoices").BindFunc(func(e *core.RecordEvent) error {
		// Handle invoice sent transition
		if e.Record.GetString("status") == "sent" {
			return events.OnInvoiceSent(e)
		}
		// Handle invoice paid transition
		if e.Record.GetString("status") == "paid" {
			return events.OnInvoicePaid(e)
		}
		// Handle invoice overdue transition
		if e.Record.GetString("status") == "overdue" {
			return events.OnInvoiceOverdue(e)
		}
		// Handle invoice cancelled transition
		if e.Record.GetString("status") == "cancelled" {
			return events.OnInvoiceCancelled(e)
		}
		return e.Next()
	})

	// warehouse management - sales orders
	app.OnRecordUpdate("warehouse_management_sales_orders").BindFunc(func(e *core.RecordEvent) error {
		// Handle order shipped transition
		if e.Record.GetString("status") == "shipped" {
			return events.OnOrderShipped(e)
		}
		// Handle order completed transition
		if e.Record.GetString("status") == "completed" {
			return events.OnOrderCompleted(e)
		}
		// Handle order cancelled transition
		if e.Record.GetString("status") == "cancelled" {
			return events.OnOrderCancelled(e)
		}
		return e.Next()
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
