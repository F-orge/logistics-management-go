package main

import (
	"context"
	"embed"
	"net/http"

	"github.com/go-playground/validator"
	"github.com/jackc/pgx/v5"
	"github.com/karlrobeck/echo-react-template/web"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

//go:embed dist/*
var assetsDir embed.FS

type Validator struct {
	validator *validator.Validate
}

func (cv *Validator) Validate(i any) error {
	if err := cv.validator.Struct(i); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return nil
}

func main() {

	ctx := context.Background()

	server := echo.New()
	server.HideBanner = true
	server.StaticFS("/", assetsDir)
	server.Validator = &Validator{validator: validator.New()}

	dbConn, err := pgx.Connect(ctx, "postgres://postgres:postgres@localhost:5432/postgres")

	if err != nil {
		server.Logger.Fatal(err)
		return
	}

	defer dbConn.Close(ctx)

	server.Use(middleware.Logger())
	server.Use(middleware.Recover())

	authService := web.AuthHandler{DBConn: dbConn}
	registerService := web.RegisterHandler{DBConn: dbConn}
	companiesService := web.CompaniesHandler{DBConn: dbConn}

	authService.Bind(server.Group("/auth"))
	registerService.Bind(server.Group("/auth"))
	companiesService.Bind(server.Group("/dashboard/companies"))

	if err := server.Start(":8080"); err != nil {
		server.Logger.Fatal(err)
	}
}
