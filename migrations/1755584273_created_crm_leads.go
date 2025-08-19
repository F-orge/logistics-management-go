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
					"max": 0,
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
					"id": "text491676904",
					"max": 0,
					"min": 0,
					"name": "company_name",
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
					"id": "select107027552",
					"maxSelect": 1,
					"name": "lead_status",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "select",
					"values": [
						"new",
						"qualified",
						"contacted",
						"unqualified"
					]
				},
				{
					"hidden": false,
					"id": "number1417607902",
					"max": null,
					"min": 0,
					"name": "lead_score",
					"onlyInt": false,
					"presentable": false,
					"required": false,
					"system": false,
					"type": "number"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_174005470",
					"hidden": false,
					"id": "relation1991387803",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "converted_to_contact",
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
			"id": "pbc_3484613874",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_PBCfIwag3n` + "`" + ` ON ` + "`" + `crm_leads` + "`" + ` (` + "`" + `email` + "`" + `)",
				"CREATE INDEX ` + "`" + `idx_IesfhDPhyU` + "`" + ` ON ` + "`" + `crm_leads` + "`" + ` (` + "`" + `lead_status` + "`" + `)",
				"CREATE INDEX ` + "`" + `idx_oxVXYasTSw` + "`" + ` ON ` + "`" + `crm_leads` + "`" + ` (` + "`" + `lead_source` + "`" + `)",
				"CREATE INDEX ` + "`" + `idx_RzfXmyfX6X` + "`" + ` ON ` + "`" + `crm_leads` + "`" + ` (` + "`" + `lead_score` + "`" + `)",
				"CREATE INDEX ` + "`" + `idx_nIswYInAE2` + "`" + ` ON ` + "`" + `crm_leads` + "`" + ` (` + "`" + `converted_to_contact` + "`" + `)"
			],
			"listRule": null,
			"name": "crm_leads",
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
		collection, err := app.FindCollectionByNameOrId("pbc_3484613874")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
