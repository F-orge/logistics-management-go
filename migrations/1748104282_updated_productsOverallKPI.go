package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1844141181")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as totalProducts,\n  avg(cost) as averageProductCost,\n  count(case when image is not null and image != '' then 1 end) as productsWithImages,\n  count(case when image is null or image = '' then 1 end) as productsWithoutImages\nfrom products;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number222648043")

		// remove field
		collection.Fields.RemoveById("json2509514797")

		// remove field
		collection.Fields.RemoveById("number1102058749")

		// remove field
		collection.Fields.RemoveById("number1917406527")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number3398989827",
			"max": null,
			"min": null,
			"name": "totalProducts",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "json1797788278",
			"maxSize": 1,
			"name": "averageProductCost",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "number2438006676",
			"max": null,
			"min": null,
			"name": "productsWithImages",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "number1459457670",
			"max": null,
			"min": null,
			"name": "productsWithoutImages",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1844141181")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_products,\n  avg(cost) as average_product_cost,\n  count(case when image is not null and image != '' then 1 end) as products_with_images,\n  count(case when image is null or image = '' then 1 end) as products_without_images\nfrom products;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number222648043",
			"max": null,
			"min": null,
			"name": "total_products",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "json2509514797",
			"maxSize": 1,
			"name": "average_product_cost",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "number1102058749",
			"max": null,
			"min": null,
			"name": "products_with_images",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "number1917406527",
			"max": null,
			"min": null,
			"name": "products_without_images",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number3398989827")

		// remove field
		collection.Fields.RemoveById("json1797788278")

		// remove field
		collection.Fields.RemoveById("number2438006676")

		// remove field
		collection.Fields.RemoveById("number1459457670")

		return app.Save(collection)
	})
}
