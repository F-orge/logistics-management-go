/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"github.com/F-orge/logistics-management-go/api"
	"github.com/F-orge/logistics-management-go/repositories"
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

		router := echo.New()

		// repos
		companyRepo := &repositories.CrmCompanyRepository{}

		api.RegisterRepository(router, "/crm/companies", companyRepo)

		if err := router.Start(":8080"); err != nil {
			return
		}
	},
}

func init() {
	rootCmd.AddCommand(serveCmd)
}
