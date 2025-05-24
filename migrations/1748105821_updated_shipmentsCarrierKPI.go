package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2359164382")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  carrier as id,\n  carrier as carrierId,\n  count(*) as shipmentCountPerCarrier\nfrom shipments\nwhere carrier is not null and carrier != ''\ngroup by carrier;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_okUY")

		// remove field
		collection.Fields.RemoveById("number495613244")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_3866053794",
			"hidden": false,
			"id": "_clone_zW9C",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "carrierId",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "number4105759561",
			"max": null,
			"min": null,
			"name": "shipmentCountPerCarrier",
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
		collection, err := app.FindCollectionByNameOrId("pbc_2359164382")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  carrier as id,\n  carrier as carrier_id,\n  count(*) as shipment_count_per_carrier\nfrom shipments\nwhere carrier is not null and carrier != ''\ngroup by carrier;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_3866053794",
			"hidden": false,
			"id": "_clone_okUY",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "carrier_id",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "number495613244",
			"max": null,
			"min": null,
			"name": "shipment_count_per_carrier",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_zW9C")

		// remove field
		collection.Fields.RemoveById("number4105759561")

		return app.Save(collection)
	})
}
