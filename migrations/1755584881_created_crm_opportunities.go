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
					"id": "text1579384326",
					"max": 255,
					"min": 0,
					"name": "name",
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
					"cascadeDelete": false,
					"collectionId": "pbc_174005470",
					"hidden": false,
					"id": "relation2281415180",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "primary_contact",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "select3262944105",
					"maxSelect": 1,
					"name": "stage",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "select",
					"values": [
						"prospecting",
						"qualification",
						"proposal",
						"closed-won",
						"closed-lost"
					]
				},
				{
					"hidden": false,
					"id": "number2392944706",
					"max": null,
					"min": null,
					"name": "amount",
					"onlyInt": false,
					"presentable": false,
					"required": true,
					"system": false,
					"type": "number"
				},
				{
					"hidden": false,
					"id": "date3739677569",
					"max": "",
					"min": "",
					"name": "close_date",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "number3735973451",
					"max": null,
					"min": 0,
					"name": "probability",
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
			"id": "pbc_2888577258",
			"indexes": [
				"CREATE INDEX ` + "`" + `idx_4ChejpLnQR` + "`" + ` ON ` + "`" + `crm_opportunities` + "`" + ` (` + "`" + `company` + "`" + `)",
				"CREATE INDEX ` + "`" + `idx_ysDIl8S2ey` + "`" + ` ON ` + "`" + `crm_opportunities` + "`" + ` (` + "`" + `primary_contact` + "`" + `)",
				"CREATE INDEX ` + "`" + `idx_4oV9AqVGPN` + "`" + ` ON ` + "`" + `crm_opportunities` + "`" + ` (` + "`" + `stage` + "`" + `)",
				"CREATE INDEX ` + "`" + `idx_LsMdBgkpSO` + "`" + ` ON ` + "`" + `crm_opportunities` + "`" + ` (` + "`" + `close_date` + "`" + `)",
				"CREATE INDEX ` + "`" + `idx_r5AYSMWyX4` + "`" + ` ON ` + "`" + `crm_opportunities` + "`" + ` (` + "`" + `amount` + "`" + `)",
				"CREATE INDEX ` + "`" + `idx_PeFpQPqjEc` + "`" + ` ON ` + "`" + `crm_opportunities` + "`" + ` (` + "`" + `probability` + "`" + `)"
			],
			"listRule": null,
			"name": "crm_opportunities",
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
		collection, err := app.FindCollectionByNameOrId("pbc_2888577258")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
