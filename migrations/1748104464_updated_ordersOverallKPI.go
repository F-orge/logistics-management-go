package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2929443726")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as totalOrders,\n  sum(total_amount) as totalRevenueFromOrders,\n  avg(total_amount) as averageOrderValue,\n  count(case when status = 'delivered' then 1 end) as deliveredOrders,\n  count(case when status = 'cancelled' then 1 end) as cancelledOrders,\n  count(case when status = 'pending-validation' then 1 end) as pendingValidationOrders,\n  count(case when status = 'shipped' then 1 end) as shippedOrders\nfrom orders;"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number758898424")

		// remove field
		collection.Fields.RemoveById("json3304750266")

		// remove field
		collection.Fields.RemoveById("json3296156873")

		// remove field
		collection.Fields.RemoveById("number2219924477")

		// remove field
		collection.Fields.RemoveById("number290051250")

		// remove field
		collection.Fields.RemoveById("number2052496343")

		// remove field
		collection.Fields.RemoveById("number1844496417")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number2882110070",
			"max": null,
			"min": null,
			"name": "totalOrders",
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
			"id": "json2473572021",
			"maxSize": 1,
			"name": "totalRevenueFromOrders",
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
			"id": "json91935025",
			"maxSize": 1,
			"name": "averageOrderValue",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "number2112017562",
			"max": null,
			"min": null,
			"name": "deliveredOrders",
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
			"id": "number3659995474",
			"max": null,
			"min": null,
			"name": "cancelledOrders",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"hidden": false,
			"id": "number3487062459",
			"max": null,
			"min": null,
			"name": "pendingValidationOrders",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"hidden": false,
			"id": "number3218357660",
			"max": null,
			"min": null,
			"name": "shippedOrders",
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
		collection, err := app.FindCollectionByNameOrId("pbc_2929443726")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "select\n  (row_number() over()) as id,\n  count(*) as total_orders,\n  sum(total_amount) as total_revenue_from_orders,\n  avg(total_amount) as average_order_value,\n  count(case when status = 'delivered' then 1 end) as delivered_orders,\n  count(case when status = 'cancelled' then 1 end) as cancelled_orders,\n  count(case when status = 'pending-validation' then 1 end) as pending_validation_orders,\n  count(case when status = 'shipped' then 1 end) as shipped_orders\nfrom orders;"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "number758898424",
			"max": null,
			"min": null,
			"name": "total_orders",
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
			"id": "json3304750266",
			"maxSize": 1,
			"name": "total_revenue_from_orders",
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
			"id": "json3296156873",
			"maxSize": 1,
			"name": "average_order_value",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "number2219924477",
			"max": null,
			"min": null,
			"name": "delivered_orders",
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
			"id": "number290051250",
			"max": null,
			"min": null,
			"name": "cancelled_orders",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"hidden": false,
			"id": "number2052496343",
			"max": null,
			"min": null,
			"name": "pending_validation_orders",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"hidden": false,
			"id": "number1844496417",
			"max": null,
			"min": null,
			"name": "shipped_orders",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number2882110070")

		// remove field
		collection.Fields.RemoveById("json2473572021")

		// remove field
		collection.Fields.RemoveById("json91935025")

		// remove field
		collection.Fields.RemoveById("number2112017562")

		// remove field
		collection.Fields.RemoveById("number3659995474")

		// remove field
		collection.Fields.RemoveById("number3487062459")

		// remove field
		collection.Fields.RemoveById("number3218357660")

		return app.Save(collection)
	})
}
