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
			"updateRule": "(@request.auth.role = 'executive' || @request.auth.role = 'finance_dept')"
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
			"updateRule": "(@request.auth.role = 'executive' || @request.auth.role = 'finance_dept') && (@request.body.id = @collection.invoices.id || @request.body.invoiceNumer = @collection.invoices.invoiceNumber)"
		}`), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
