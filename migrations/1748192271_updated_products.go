package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_4092854851")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "number130897217",
			"max": null,
			"min": 0,
			"name": "weight",
			"onlyInt": false,
			"presentable": false,
			"required": true,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text3799878565",
			"max": 0,
			"min": 0,
			"name": "dimensions",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"hidden": false,
			"id": "number405181692",
			"max": null,
			"min": 0,
			"name": "cost",
			"onlyInt": false,
			"presentable": false,
			"required": true,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_3866053794",
			"hidden": false,
			"id": "relation2603248766",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "supplier",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
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
			"required": true,
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

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "number130897217",
			"max": null,
			"min": 0,
			"name": "weight",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text3799878565",
			"max": 0,
			"min": 0,
			"name": "dimensions",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": false,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"hidden": false,
			"id": "number405181692",
			"max": null,
			"min": 0,
			"name": "cost",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_3866053794",
			"hidden": false,
			"id": "relation2603248766",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "supplier",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
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
	})
}
