package main

import (
	"context"
	"net/http"

	"github.com/go-playground/validator"
	"github.com/golang-jwt/jwt/v5"
	"github.com/jackc/pgx/v5"
	"github.com/karlrobeck/echo-react-template/api"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

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
	server.Validator = &Validator{validator: validator.New()}

	dbConn, err := pgx.Connect(ctx, "postgres://postgres:postgres@localhost:5432/postgres")

	if err != nil {
		server.Logger.Fatal(err)
		return
	}

	defer dbConn.Close(ctx)

	server.Use(middleware.Logger())
	server.Use(middleware.Recover())
	server.Use(echojwt.WithConfig(
		echojwt.Config{
			NewClaimsFunc: func(c echo.Context) jwt.Claims {
				return new(api.JWTClaims)
			},
			ErrorHandler: func(c echo.Context, err error) error {
				return c.JSON(403, echo.Map{
					"code":    "FORBIDDEN",
					"message": "Forbidden access",
				})
			},
			SigningKey: []byte("hello-secret"),
		},
	))

	healthService := api.HealthCheckService{}
	authService := api.AuthService{DbConn: dbConn}

	healthService.Bind(server)
	authService.Bind(server)

	if err := server.Start(":8080"); err != nil {
		server.Logger.Fatal(err)
	}
}
