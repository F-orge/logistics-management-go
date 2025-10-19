/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"context"
	"log"
	"os"

	"github.com/F-orge/logistics-management-go/api"
	"github.com/F-orge/logistics-management-go/models"
	"github.com/F-orge/logistics-management-go/repositories/crm"
	"github.com/jackc/pgx/v5"
	"github.com/labstack/echo"
	"github.com/spf13/cobra"
)

// serveCmd represents the serve command
var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {

		ctx := context.Background()

		connString := os.Getenv("DATABASE_URL")

		conn, err := pgx.Connect(ctx, connString)

		if err != nil {
			log.Fatal(err)
		}

		defer conn.Close(ctx)

		queryExecutor := models.New(conn)

		router := echo.New()

		apiRouter := router.Group("/api")

		// crm repos
		companyRepo := &crm.CrmCompanyRepository{Query: *queryExecutor}
		casesRepo := &crm.CrmCaseRepository{Query: *queryExecutor}

		crmRouter := apiRouter.Group("/crm")

		api.RegisterRepository(crmRouter, "/companies", companyRepo)
		api.RegisterRepository(crmRouter, "/cases", casesRepo)

		if err := router.Start(":8080"); err != nil {
			return
		}
	},
}

func init() {
	rootCmd.AddCommand(serveCmd)
}
