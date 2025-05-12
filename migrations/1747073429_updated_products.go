package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_4092854851")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.body.supplier.type = \"supplier\" && (@request.auth.role = \"warehouse_manager\" || @request.auth.role = \"executive\")",
			"deleteRule": "@request.auth.role = \"warehouse_manager\" || @request.auth.role = \"executive\"",
			"indexes": [
				"CREATE UNIQUE INDEX ` + "`" + `idx_OZc1GGhrWX` + "`" + ` ON ` + "`" + `products` + "`" + ` (` + "`" + `sku` + "`" + `)"
			],
			"updateRule": "@request.auth.role = \"warehouse_manager\" || @request.auth.role = \"executive\""
		}`), &collection); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"hidden": false,
			"id": "file3309110367",
			"maxSelect": 99,
			"maxSize": 0,
			"mimeTypes": [
				"image/jpeg",
				"image/png",
				"image/vnd.mozilla.apng",
				"image/webp",
				"image/jpx",
				"image/jp2"
			],
			"name": "image",
			"presentable": false,
			"protected": false,
			"required": false,
			"system": false,
			"thumbs": [],
			"type": "file"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_4092854851")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"createRule": "@request.auth.role = \"warehouse_manager\" ||\n@request.auth.role = \"it_admin\" || @request.auth.role = \"executive\"",
			"deleteRule": "@request.auth.role = \"warehouse_manager\" ||\n@request.auth.role = \"it_admin\" || @request.auth.role = \"executive\"",
			"indexes": [],
			"updateRule": "@request.auth.role = \"warehouse_manager\" ||\n@request.auth.role = \"it_admin\" || @request.auth.role = \"executive\""
		}`), &collection); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"hidden": false,
			"id": "file3309110367",
			"maxSelect": 1,
			"maxSize": 0,
			"mimeTypes": [
				"image/jpeg",
				"image/png",
				"image/vnd.mozilla.apng",
				"image/webp",
				"image/jpx",
				"image/jp2"
			],
			"name": "image",
			"presentable": false,
			"protected": false,
			"required": false,
			"system": false,
			"thumbs": [],
			"type": "file"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
