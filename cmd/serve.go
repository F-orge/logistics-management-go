/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"log"

	"github.com/f-orge/logistics-management-go/internal/handlers"
	"github.com/jackc/pgx/v5"
	"github.com/labstack/echo/v4"
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

		server := echo.New()
		server.HideBanner = true
		server.Static("/dist", "dist")

		conn, err := pgx.Connect(cmd.Context(), "postgres://postgres:postgres@localhost:5432/postgres")

		if err != nil {
			log.Fatalln(err)
		}

		handlers.NewCompanyHandler(handlers.CompanyHandler{DBConn: conn}, server)
		handlers.NewAuthHandler(handlers.AuthHandler{DBConn: conn}, server)

		if err := server.Start(":8080"); err != nil {
			server.Logger.Fatal(err)
		}

	},
}

func init() {
	rootCmd.AddCommand(serveCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// serveCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// serveCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
