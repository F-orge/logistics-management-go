/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"
	"log"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jaswdr/faker/v2"
	"github.com/karlrobeck/echo-react-template/models"
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

		queries := models.New(dbConn)

		for i := range 50 {

			fakeUser := fake.Person()

			newUser, err := queries.CreateUser(cmd.Context(), models.CreateUserParams{
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

			newCompany, err := queries.CreateCompany(cmd.Context(), models.CreateCompanyParams{
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

		// products
		companies, err := queries.GetCompanies(cmd.Context())

		if err != nil {
			log.Fatalln(err)
		}

		for _, company := range companies {

			// create 100 items per company
			for i := range 100 {
				newProduct, err := queries.CreateProduct(cmd.Context(), models.CreateProductParams{
					Sku:         fmt.Sprintf("SKU-%06d", fake.IntBetween(100000, 999999)),
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

				fmt.Println(i, "New product", newProduct.Sku)
			}

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
