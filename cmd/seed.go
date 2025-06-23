/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"
	"log"
	"strconv"
	"time"

	"github.com/f-orge/logistics-management-go/internal/repository"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jaswdr/faker/v2"
	"github.com/spf13/cobra"
)

// seedCmd represents the seed command
var seedCmd = &cobra.Command{
	Use:   "seed",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {

		fake := faker.New()

		dbConn, err := pgx.Connect(cmd.Context(), "postgres://postgres:postgres@localhost:5432/postgres")

		if err != nil {
			log.Fatalln(err)
		}

		queries := repository.New(dbConn)

		for i := range 50 {

			fakeUser := fake.Person()

			newUser, err := queries.CreateUser(cmd.Context(), repository.CreateUserParams{
				Name:     fakeUser.Name(),
				Email:    fakeUser.Contact().Email,
				Password: "password-123",
			})

			if err != nil {
				fmt.Println("unable to create user", err)
			}

			fmt.Println(i, newUser.Name)
		}

		users, err := queries.GetUsers(cmd.Context())

		if err != nil {
			log.Fatalln(err)
		}

		// companies
		for i, user := range users {

			fakeCompany := fake.Company()

			companyTypes := []string{"customer", "supplier", "carrier", "internal"}

			randomType := companyTypes[fake.Int16Between(0, int16(len(companyTypes))-1)]

			newCompany, err := queries.CreateCompany(cmd.Context(), repository.CreateCompanyParams{
				Name:                 fakeCompany.Name(),
				Type:                 randomType,
				Address:              pgtype.Text{String: fake.Address().Address(), Valid: true},
				ContactEmail:         pgtype.Text{String: user.Email, Valid: true},
				ContactPhone:         pgtype.Text{String: fake.Person().Contact().Phone, Valid: true},
				PrimaryContactPerson: user.ID,
			})
			if err != nil {
				fmt.Println(err)
				continue
			}
			fmt.Println(i, "New company", newCompany.Name)
		}

		companies, err := queries.GetCompanies(cmd.Context())

		if err != nil {
			log.Fatalln(err)
		}

		for i, company := range companies {

			// create 100 items per company
			for j := range 100 {
				newProduct, err := queries.CreateProduct(cmd.Context(), repository.CreateProductParams{
					Sku:         fmt.Sprintf("%04d-%03d-%04d", fake.IntBetween(1000, 9999), fake.IntBetween(100, 999), fake.IntBetween(1000, 9999)),
					Name:        fake.Pokemon().English(),
					Description: pgtype.Text{String: fake.Lorem().Paragraph(5), Valid: true},
					Width:       fake.Numerify("##.##"),
					Height:      fake.Numerify("##.##"),
					Length:      fake.Numerify("##.##"),
					Cost: func() pgtype.Numeric {
						val := fake.Numerify("###.##")
						var num pgtype.Numeric
						err := num.Scan(val)
						if err != nil {
							fmt.Println(err.Error())
						}
						return num
					}(),
					Supplier: company.ID,
					ImageUrl: pgtype.Text{String: "https://placehold.co/600x400"},
				})

				if err != nil {
					fmt.Println(err)
					continue
				}

				fmt.Println(i, j, "New product", newProduct.Sku)
			}

		}

		managers, err := queries.GetUsers(cmd.Context())

		if err != nil {
			log.Fatalln(err)
		}

		for i, manager := range managers {

			newWarehouse, err := queries.CreateWarehouse(cmd.Context(), repository.CreateWarehouseParams{
				Name:    fake.Address().BuildingNumber(),
				Address: fake.Address().Address(),
				Longitude: func() pgtype.Numeric {
					var num pgtype.Numeric
					err := num.Scan(fmt.Sprintf("%f", fake.Address().Longitude()))
					if err != nil {
						fmt.Println("Longitude conversion error:", err)
					}
					return num
				}(),
				Latitude: func() pgtype.Numeric {
					var num pgtype.Numeric
					err := num.Scan(fmt.Sprintf("%f", fake.Address().Latitude()))
					if err != nil {
						fmt.Println("Latitude conversion error:", err)
					}
					return num
				}(),
				Manager: manager.ID,
			})

			if err != nil {
				fmt.Println(err)
				continue
			}

			fmt.Println(i, "New Warehouse", newWarehouse.Name)
		}

		warehouses, err := queries.GetWarehouses(cmd.Context())

		if err != nil {
			log.Fatalln(err)
		}

		products, err := queries.GetProducts(cmd.Context())

		if err != nil {
			log.Fatalln(err)
		}

		for i, product := range products {

			orderStatus := []string{"pending-validation", "validated", "allocated", "picking", "packing", "ready-for-shipment", "shipped", "delivered", "cancelled", "on-hold"}

			randomStatus := orderStatus[fake.Int16Between(0, int16(len(orderStatus))-1)]
			randomCompany := companies[fake.Int16Between(0, int16(len(companies))-1)]
			randomWarehouse := warehouses[fake.Int16Between(0, int16(len(warehouses))-1)]
			randomQuantity := fake.Int32()

			newOrder, err := queries.CreateOrder(cmd.Context(), repository.CreateOrderParams{
				CustomID:  fmt.Sprintf("ORDER-%04d-%03d-%04d", fake.IntBetween(1000, 9999), fake.IntBetween(100, 999), fake.IntBetween(1000, 9999)),
				Customer:  randomCompany.ID,
				OrderDate: pgtype.Timestamptz{Time: time.Now(), Valid: true},
				CreatedBy: randomCompany.PrimaryContactPerson,
				Status:    randomStatus,
				TotalAmount: func() pgtype.Numeric {
					val := fake.Numerify("###.##")
					var num pgtype.Numeric
					err := num.Scan(val)
					if err != nil {
						fmt.Println(err.Error())
					}
					return num
				}(),
				ShippingAddress:   fake.Address().Address(),
				BillingAddress:    fake.Address().Address(),
				AssignedWarehouse: randomWarehouse.ID,
			})

			if err != nil {
				fmt.Println(err)
				continue
			}

			if _, err := queries.CreateOrderLineItem(cmd.Context(), repository.CreateOrderLineItemParams{
				Order:    newOrder.ID,
				Product:  product.ID,
				Quantity: randomQuantity,
				PricePerUnit: func() pgtype.Numeric {
					val := fake.Numerify("###.##")
					var num pgtype.Numeric
					err := num.Scan(val)
					if err != nil {
						fmt.Println(err.Error())
					}
					return num
				}(),
			}); err != nil {
				fmt.Println(err)
				continue
			}

			if _, err := queries.CreateInventoryItem(cmd.Context(), repository.CreateInventoryItemParams{
				Product:             product.ID,
				Warehouse:           randomWarehouse.ID,
				QuantityOnHand:      randomQuantity,
				LotNumber:           fake.Lexify("LOT-????-????"),
				SerialNumber:        fake.Lexify("SERIAL-????-????"),
				StorageLocationCode: fake.Lexify("STORAGE-????-????"),
				Status:              "available",
			}); err != nil {
				fmt.Println(err)
				continue
			}
			fmt.Println(i, "New Order", newOrder.CustomID)
		}

		// departments
		for range 50 {
			newDepartment, err := queries.CreateDepartment(cmd.Context(), repository.CreateDepartmentParams{
				Name:        fake.Company().Name(),
				Description: pgtype.Text{String: fake.Company().CatchPhrase(), Valid: true},
			})

			if err != nil {
				fmt.Println(err)
				continue
			}

			for _, user := range users {

				departmentRoles := []string{"manager", "employee"}

				randomRole := departmentRoles[fake.Int16Between(0, int16(len(departmentRoles))-1)]

				if _, err := queries.AssignUserToDepartment(cmd.Context(), repository.AssignUserToDepartmentParams{
					DepartmentID: newDepartment.ID,
					UserID:       user.ID,
					Role:         randomRole,
				}); err != nil {
					fmt.Println(err)
					continue
				}

			}

			fmt.Println("New Department", newDepartment.Name)
		}

		// shipments
		orders, err := queries.GetOrders(cmd.Context())

		if err != nil {
			log.Fatalln(err)
		}

		departments, err := queries.GetDepartments(cmd.Context())

		if err != nil {
			log.Fatalln(err)
		}

		for i, order := range orders {

			shipmentStatuses := []string{"label-created", "pending-pickup", "in-transit", "out-for-delivery", "delivered", "exception", "returned"}

			randomCompany := companies[fake.Int16Between(0, int16(len(companies))-1)]
			randomDriver := users[fake.Int16Between(0, int16(len(users))-1)]
			randomDepartment := departments[fake.Int16Between(0, int16(len(departments))-1)]
			randomStatus := shipmentStatuses[fake.Int16Between(0, int16(len(shipmentStatuses))-1)]

			newShipment, err := queries.CreateShipment(cmd.Context(), repository.CreateShipmentParams{
				Order:              order.ID,
				TrackingNumber:     fake.Lexify("SHIPMENT-????-???-????"),
				Carrier:            randomCompany.ID,
				Status:             randomStatus,
				Driver:             randomDriver.ID,
				DepartmentAssigned: randomDepartment.ID,
			})

			if err != nil {
				fmt.Println(err)
				continue
			}

			fmt.Println(i, "New Shipment", newShipment.TrackingNumber)

		}

		for i := range 50 {

			vehicleStatuses := []string{"available", "in-use", "maintenance", "out-of-service"}
			randomDriver := users[fake.Int16Between(0, int16(len(users))-1)]
			randomStatus := vehicleStatuses[fake.Int16Between(0, int16(len(vehicleStatuses))-1)]

			newVehicle, err := queries.CreateVehicle(cmd.Context(), repository.CreateVehicleParams{
				LicensePlate:  fake.Lexify("???-????"),
				Make:          fake.Company().Name(),
				Model:         fake.Gamer().Tag(),
				Type:          fake.Lorem().Sentence(20),
				CurrentDriver: randomDriver.ID,
				CapacityVolume: func() pgtype.Numeric {
					val := fake.Numerify("###.##")
					var num pgtype.Numeric
					err := num.Scan(val)
					if err != nil {
						fmt.Println(err.Error())
					}
					return num
				}(),
				CapacityWeight: func() pgtype.Numeric {
					val := fake.Numerify("###.##")
					var num pgtype.Numeric
					err := num.Scan(val)
					if err != nil {
						fmt.Println(err.Error())
					}
					return num
				}(),
				Status: randomStatus,
			})

			if err != nil {
				fmt.Println(err)
				continue
			}

			fmt.Println(i, "New Vehicle", newVehicle.LicensePlate)
		}

		shipments, err := queries.GetShipments(cmd.Context())

		if err != nil {
			log.Fatalln(err)
		}

		routeStatuses := []string{"planned", "in-progress", "completed", "delayed", "cancelled"}

		randomStatus := routeStatuses[fake.Int16Between(0, int16(len(routeStatuses))-1)]

		newRoute, err := queries.CreateRoute(
			cmd.Context(),
			repository.CreateRouteParams{
				Name:   fake.Address().City(),
				Status: randomStatus,
			},
		)

		if err != nil {
			fmt.Println(err)
		}

		for i, shipment := range shipments {
			newShipmentForRoute, err := queries.AddShipmentToRoute(cmd.Context(), repository.AddShipmentToRouteParams{
				Route:    newRoute.ID,
				Shipment: shipment.ID,
			})
			if err != nil {
				fmt.Println(err)
				continue
			}
			fmt.Println(i, "New shipment for route", newShipmentForRoute.Route, newShipmentForRoute.Shipment)
		}

		fmt.Println("New Route", newRoute.Name)

		for i := range 50 {

			segmentType := []string{"start-point", "pickup", "waypoint", "delivery", "end-point"}

			randomType := segmentType[fake.Int16Between(0, int16(len(segmentType))-1)]

			newRouteSegment, err := queries.CreateRouteSegment(cmd.Context(), repository.CreateRouteSegmentParams{
				Route:          newRoute.ID,
				SequenceNumber: int32(i),
				SegmentType:    randomType,
				Address:        pgtype.Text{String: fake.Address().Address(), Valid: true},
				Longitude: func() pgtype.Numeric {
					val := fake.Address().Longitude()
					valString := strconv.FormatFloat(val, 'f', -1, 64)
					var num pgtype.Numeric
					err := num.Scan(valString)
					if err != nil {
						fmt.Println(err.Error())
					}
					return num
				}(),
				Latitude: func() pgtype.Numeric {
					val := fake.Address().Latitude()
					valString := strconv.FormatFloat(val, 'f', -1, 64)
					var num pgtype.Numeric
					err := num.Scan(valString)
					if err != nil {
						fmt.Println(err.Error())
					}
					return num
				}(),
				Instructions: pgtype.Text{String: fake.Lorem().Paragraph(5)},
			})

			if err != nil {
				fmt.Println(err)
				continue
			}

			fmt.Println(i, "New route segment", newRouteSegment.Address)
		}

		for i, order := range orders {

			invoiceStatuses := []string{"draft", "sent", "paid", "partially-paid", "overdue", "void"}

			randomInvoiceStatus := invoiceStatuses[fake.Int16Between(0, int16(len(invoiceStatuses))-1)]

			newInvoice, err := queries.CreateInvoice(cmd.Context(), repository.CreateInvoiceParams{
				InvoiceNumber: fake.Lexify("????-???-????-?????"),
				Order:         order.ID,
				Customer:      order.Customer,
				InvoiceDate:   pgtype.Timestamptz{Time: time.Now(), Valid: true},
				DueDate:       pgtype.Timestamptz{Time: time.Now().Add(24 * time.Hour), Valid: true},
				TotalAmount: func() pgtype.Numeric {
					val := fake.Numerify("###.##")
					var num pgtype.Numeric
					err := num.Scan(val)
					if err != nil {
						fmt.Println(err.Error())
					}
					return num
				}(),
				Status:        randomInvoiceStatus,
				InvoicePdfUrl: pgtype.Text{String: ""},
			})

			if err != nil {
				fmt.Println(err)
				continue
			}

			fmt.Println(i, "New Invoice", newInvoice.InvoiceNumber)
		}

		invoices, err := queries.GetInvoices(cmd.Context())

		if err != nil {
			log.Fatalln(err)
		}

		for i, invoice := range invoices {

			paymentMethods := []string{"credit-card", "bank-transfer", "ach", "check", "cash", "other"}
			paymentStatus := []string{"pending", "completed", "failed", "refunded"}

			randomPaymentMethod := paymentMethods[fake.Int16Between(0, int16(len(paymentMethods))-1)]
			randomPaymentStatus := paymentStatus[fake.Int16Between(0, int16(len(paymentStatus))-1)]

			newPayment, err := queries.CreatePayment(cmd.Context(), repository.CreatePaymentParams{
				Invoice:       invoice.ID,
				TransactionID: fake.Lexify("???-????-????"),
				Notes:         pgtype.Text{String: fake.Lorem().Paragraph(20), Valid: true},
				PaymentDate:   pgtype.Timestamptz{Time: time.Now(), Valid: true},
				AmountPaid: func() pgtype.Numeric {
					val := fake.Numerify("###.##")
					var num pgtype.Numeric
					err := num.Scan(val)
					if err != nil {
						fmt.Println(err.Error())
					}
					return num
				}(),
				PaymentMethod: randomPaymentMethod,
				Status:        randomPaymentStatus,
			})

			if err != nil {
				fmt.Println(err)
				continue
			}

			fmt.Println(i, "New Payment", newPayment.TransactionID)
		}

	},
}

func init() {
	rootCmd.AddCommand(seedCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// seedCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// seedCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
