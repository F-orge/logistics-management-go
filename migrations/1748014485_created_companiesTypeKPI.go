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
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text3208210256",
					"max": 0,
					"min": 0,
					"name": "id",
					"pattern": "^[a-z0-9]+$",
					"presentable": false,
					"primaryKey": true,
					"required": true,
					"system": true,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "_clone_BidY",
					"maxSelect": 1,
					"name": "type",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "select",
					"values": [
						"customer",
						"supplier",
						"carrier",
						"internal"
					]
				},
				{
					"hidden": false,
					"id": "number4003700053",
					"max": null,
					"min": null,
					"name": "company_count_per_type",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				}
			],
			"id": "pbc_1583689114",
			"indexes": [],
			"listRule": null,
			"name": "companiesTypeKPI",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "select\n  type as id,\n  type,\n  count(*) as company_count_per_type\nfrom companies\ngroup by type;",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1583689114")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
