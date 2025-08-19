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
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text491676904",
					"max": 200,
					"min": 0,
					"name": "company_name",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "select2363381545",
					"maxSelect": 1,
					"name": "type",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "select",
					"values": [
						"courier",
						"freight",
						"postal",
						"express",
						"full_truckload",
						"less_than_truck_load"
					]
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text2756634359",
					"max": 100,
					"min": 0,
					"name": "contact_person",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"exceptDomains": null,
					"hidden": false,
					"id": "email3885137012",
					"name": "email",
					"onlyDomains": null,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "email"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text1795275867",
					"max": 0,
					"min": 0,
					"name": "phone_number",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_1659436351",
					"hidden": false,
					"id": "relation223244161",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "address",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"exceptDomains": null,
					"hidden": false,
					"id": "url393856500",
					"name": "api_endpoint",
					"onlyDomains": null,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "url"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text3373460893",
					"max": 0,
					"min": 0,
					"name": "api_key",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "date2355559313",
					"max": "",
					"min": "",
					"name": "contract_start_date",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "date300654785",
					"max": "",
					"min": "",
					"name": "contract_end_date",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"convertURLs": false,
					"hidden": false,
					"id": "editor3756722627",
					"maxSize": 0,
					"name": "payment_terms",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "editor"
				},
				{
					"hidden": false,
					"id": "number4077356329",
					"max": null,
					"min": null,
					"name": "insurance_coverage",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number3093366848",
					"max": 5,
					"min": 1,
					"name": "performance_rating",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "bool458715613",
					"name": "is_active",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "bool"
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
			"id": "pbc_3232226346",
			"indexes": [],
			"listRule": null,
			"name": "lms_transport_providers",
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
		collection, err := app.FindCollectionByNameOrId("pbc_3232226346")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
