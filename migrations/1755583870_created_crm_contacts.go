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
					"id": "text2849095986",
					"max": 100,
					"min": 0,
					"name": "first_name",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text3356015194",
					"max": 100,
					"min": 0,
					"name": "last_name",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"exceptDomains": [],
					"hidden": false,
					"id": "email3885137012",
					"name": "email",
					"onlyDomains": [],
					"presentable": false,
					"required": true,
					"system": false,
					"type": "email"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text1795275867",
					"max": 20,
					"min": 0,
					"name": "phone_number",
					"pattern": "\\+(9[976]\\d|8[987530]\\d|6[987]\\d|5[90]\\d|42\\d|3[875]\\d| 2[98654321]\\d|9[8543210]|8[6421]|6[6543210]|5[87654321]| 4[987654310]|3[9643210]|2[70]|7|1)\\d{1,14}$",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text711640347",
					"max": 0,
					"min": 0,
					"name": "job_title",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text585827855",
					"max": 0,
					"min": 0,
					"name": "lead_source",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": false,
					"system": false,
					"type": "text"
				},
				{
					"hidden": false,
					"id": "select2063623452",
					"maxSelect": 1,
					"name": "status",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "select",
					"values": [
						"lead",
						"prospect",
						"customer",
						"inactive"
					]
				},
				{
					"hidden": false,
					"id": "date3845444698",
					"max": "",
					"min": "",
					"name": "birth_date",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_706374246",
					"hidden": false,
					"id": "relation1337919823",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "company",
					"presentable": false,
					"required": false,
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
			"id": "pbc_174005470",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_g3VigEO70Z` + "`" + ` ON ` + "`" + `crm_contacts` + "`" + ` (` + "`" + `email` + "`" + `)",
				"CREATE INDEX ` + "`" + `idx_K5ghmSN3GD` + "`" + ` ON ` + "`" + `crm_contacts` + "`" + ` (\n  ` + "`" + `company` + "`" + `,\n  ` + "`" + `lead_source` + "`" + `,\n  ` + "`" + `status` + "`" + `\n)"
			],
			"listRule": null,
			"name": "crm_contacts",
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
		collection, err := app.FindCollectionByNameOrId("pbc_174005470")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
