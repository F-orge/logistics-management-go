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
					"id": "text1042062360",
					"max": 50,
					"min": 0,
					"name": "tracking_number",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_706374246",
					"hidden": false,
					"id": "relation3259617156",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "sender_company",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_174005470",
					"hidden": false,
					"id": "relation3247710451",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "sender_contact",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_1659436351",
					"hidden": false,
					"id": "relation2159585610",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "sender_address",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_706374246",
					"hidden": false,
					"id": "relation847657197",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "receiver_company",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_174005470",
					"hidden": false,
					"id": "relation828102554",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "receiver_contact",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_1659436351",
					"hidden": false,
					"id": "relation1886871075",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "receiver_address",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_15274658",
					"hidden": false,
					"id": "relation131439638",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "shipping_service",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "select4289066355",
					"maxSelect": 1,
					"name": "primary_transport_mode",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "select",
					"values": [
						"air",
						"sea",
						"road",
						"rail"
					]
				},
				{
					"hidden": false,
					"id": "select2063623452",
					"maxSelect": 1,
					"name": "status",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "select",
					"values": [
						"created",
						"picked_up",
						"in_transit",
						"out_for_delivery",
						"delivered",
						"exception",
						"cancelled"
					]
				},
				{
					"hidden": false,
					"id": "number3487135319",
					"max": null,
					"min": null,
					"name": "total_weight",
					"onlyInt": false,
					"presentable": false,
					"required": true,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number3724922374",
					"max": null,
					"min": null,
					"name": "total_value",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number386397634",
					"max": null,
					"min": null,
					"name": "insurance_amount",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "number2308571902",
					"max": null,
					"min": null,
					"name": "shipping_cost",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text1767278655",
					"max": 3,
					"min": 0,
					"name": "currency",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "date3570634520",
					"max": "",
					"min": "",
					"name": "pickup_date",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "date2063794144",
					"max": "",
					"min": "",
					"name": "delivery_date",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "date474178607",
					"max": "",
					"min": "",
					"name": "estimated_delivery_date",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"convertURLs": false,
					"hidden": false,
					"id": "editor1102786338",
					"maxSize": 0,
					"name": "special_instructions",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "editor"
				},
				{
					"cascadeDelete": false,
					"collectionId": "_pb_users_auth_",
					"hidden": false,
					"id": "relation3725765462",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "created_by",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
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
			"id": "pbc_2571834109",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_VA53BeGdHE` + "`" + ` ON ` + "`" + `lms_shipments` + "`" + ` (` + "`" + `tracking_number` + "`" + `)"
			],
			"listRule": null,
			"name": "lms_shipments",
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
		collection, err := app.FindCollectionByNameOrId("pbc_2571834109")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
