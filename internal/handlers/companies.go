package handlers

import (
	"github.com/f-orge/logistics-management-go/internal/repository"
	"github.com/f-orge/logistics-management-go/internal/views"
	"github.com/jackc/pgx/v5"
	"github.com/labstack/echo/v4"
)

type CompanyHandler struct {
	DBConn *pgx.Conn
}

// full page render
func (c *CompanyHandler) Show(ctx echo.Context) error {

	repo := repository.New(c.DBConn)

	companies, _ := repo.GetCompanies(ctx.Request().Context())

	return views.CompanyPage(views.CompanyPageProps{Companies: companies}).Render(ctx.Request().Context(), ctx.Response().Writer)
}

// partial render or redirect
func (c *CompanyHandler) Create(ctx echo.Context) error {
	return ctx.String(201, "post request")
}

// partial render or redirect
func (c *CompanyHandler) Update(ctx echo.Context) error {
	return ctx.String(200, "patch request")
}

// partial render or redirect
func (c *CompanyHandler) Remove(ctx echo.Context) error {
	return ctx.String(204, "delete request")
}

func NewCompanyHandler(handler CompanyHandler, server *echo.Echo) {

	server.GET("/companies", handler.Show)
	server.POST("/companies", handler.Create)
	server.PATCH("/companies", handler.Update)
	server.DELETE("/companies", handler.Remove)

}
