package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_711030668")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"updateRule": "(@request.auth.role = 'executive' || @request.auth.role = 'finance_dept') && (@request.body.id:isset = false || @request.body.invoiceNumber:isset = false || @request.body.customer:isset = false || @request.body.invoiceDate:isset = false || @request.body.orderRef:isset = false || @request.body.invoicePdf:isset = false)"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_711030668")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"updateRule": "@request.auth.role = \"finance_dept\" || @request.auth.role = \"executive\""
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
