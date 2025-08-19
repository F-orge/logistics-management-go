package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		jsonData := `{
			"createRule": null,
			"deleteRule": null,
			"fields": [
				{
					"autogeneratePattern": "[a-z0-9]{15}",
					"hidden": false,
					"id": "text3208210256",
					"max": 15,
					"min": 15,
					"name": "id",
					"pattern": "^[a-z0-9]+$",
					"presentable": false,
					"primaryKey": true,
					"required": true,
					"system": true,
					"type": "text"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_1395664440",
					"hidden": false,
					"id": "relation2422544196",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "invoice",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_2571834109",
					"hidden": false,
					"id": "relation46866652",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "shipment",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"convertURLs": false,
					"hidden": false,
					"id": "editor1843675174",
					"maxSize": 0,
					"name": "description",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "editor"
				},
				{
					"hidden": false,
					"id": "number2683508278",
					"max": null,
					"min": null,
					"name": "quantity",
					"onlyInt": true,
					"presentable": false,
					"required": true,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number1106926802",
					"max": null,
					"min": null,
					"name": "unit_price",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number1034667741",
					"max": null,
					"min": null,
					"name": "line_total",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "autodate2990389176",
					"name": "created",
					"onCreate": true,
					"onUpdate": false,
					"presentable": false,
					"system": false,
					"type": "autodate"
				},
				{
					"hidden": false,
					"id": "autodate3332085495",
					"name": "updated",
					"onCreate": true,
					"onUpdate": true,
					"presentable": false,
					"system": false,
					"type": "autodate"
				}
			],
			"id": "pbc_2401454700",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_XeW3osHfiq` + "`" + ` ON ` + "`" + `crm_invoice_line_items` + "`" + ` (\n  ` + "`" + `invoice` + "`" + `,\n  ` + "`" + `shipment` + "`" + `\n)"
			],
			"listRule": null,
			"name": "crm_invoice_line_items",
			"system": false,
			"type": "base",
			"updateRule": null,
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2401454700")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
