package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2046544490")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as totalShipments,\n  count(case when status = 'delivered' then 1 end) as deliveredShipments,\n  count(case when status = 'in-transit' then 1 end) as shipmentsInTransit,\n  count(case when status = 'exception' then 1 end) as shipmentExceptions,\n  count(case when proof_of_delivery is not null and proof_of_delivery != '' then 1 end) as shipmentWithPod\nfrom shipments;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number682747586")

		// remove field
		collection.Fields.RemoveById("number3320430792")

		// remove field
		collection.Fields.RemoveById("number320288760")

		// remove field
		collection.Fields.RemoveById("number2039875676")

		// remove field
		collection.Fields.RemoveById("number3405723663")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number2259112358",
			"max": null,
			"min": null,
			"name": "totalShipments",
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
			"id": "number1711438630",
			"max": null,
			"min": null,
			"name": "deliveredShipments",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "number1695611509",
			"max": null,
			"min": null,
			"name": "shipmentsInTransit",
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
			"id": "number278970268",
			"max": null,
			"min": null,
			"name": "shipmentExceptions",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"hidden": false,
			"id": "number1025527529",
			"max": null,
			"min": null,
			"name": "shipmentWithPod",
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
		collection, err := app.FindCollectionByNameOrId("pbc_2046544490")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_shipments,\n  count(case when status = 'delivered' then 1 end) as delivered_shipments,\n  count(case when status = 'in-transit' then 1 end) as shipments_in_transit,\n  count(case when status = 'exception' then 1 end) as shipment_exceptions,\n  count(case when proof_of_delivery is not null and proof_of_delivery != '' then 1 end) as shipments_with_pod\nfrom shipments;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number682747586",
			"max": null,
			"min": null,
			"name": "total_shipments",
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
			"id": "number3320430792",
			"max": null,
			"min": null,
			"name": "delivered_shipments",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "number320288760",
			"max": null,
			"min": null,
			"name": "shipments_in_transit",
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
			"id": "number2039875676",
			"max": null,
			"min": null,
			"name": "shipment_exceptions",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"hidden": false,
			"id": "number3405723663",
			"max": null,
			"min": null,
			"name": "shipments_with_pod",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number2259112358")

		// remove field
		collection.Fields.RemoveById("number1711438630")

		// remove field
		collection.Fields.RemoveById("number1695611509")

		// remove field
		collection.Fields.RemoveById("number278970268")

		// remove field
		collection.Fields.RemoveById("number1025527529")

		return app.Save(collection)
	})
}
