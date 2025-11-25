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
					"collectionId": "pbc_2716782250",
					"hidden": false,
					"id": "relation1982522052",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "outboundShipment",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_2875110923",
					"hidden": false,
					"id": "relation1351910237",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "salesOrderItem",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_267730890",
					"hidden": false,
					"id": "relation3544843437",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "product",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_1019214288",
					"hidden": false,
					"id": "relation4161491668",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "batch",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "number1724181665",
					"max": null,
					"min": null,
					"name": "quantityShipped",
					"onlyInt": true,
					"presentable": false,
					"required": true,
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
			"id": "pbc_689259008",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_yb6YRpLpzm` + "`" + ` ON ` + "`" + `warehouse_management_outbound_shipment_items` + "`" + ` (\n  ` + "`" + `outboundShipment` + "`" + `,\n  ` + "`" + `salesOrderItem` + "`" + `,\n  ` + "`" + `product` + "`" + `,\n  ` + "`" + `batch` + "`" + `\n)"
			],
			"listRule": null,
			"name": "warehouse_management_outbound_shipment_items",
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
		collection, err := app.FindCollectionByNameOrId("pbc_689259008")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
