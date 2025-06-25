package handlers

import (
	"github.com/f-orge/logistics-management-go/internal/repository"
	"github.com/f-orge/logistics-management-go/internal/views"
	"github.com/jackc/pgx/v5"
	"github.com/labstack/echo/v4"
)

type DepartmentHandler struct {
	DBConn *pgx.Conn
}

func (d *DepartmentHandler) Show(ctx echo.Context) error {

	repo := repository.New(d.DBConn)

	departments, err := repo.GetAllDepartments(ctx.Request().Context())

	if err != nil {
		return err
	}

	return views.DepartmentsPage(views.DepartmentsPageProps{
		Departments: departments,
	}).Render(ctx.Request().Context(), ctx.Response().Writer)
}

func NewDepartmentHandler(handler DepartmentHandler, server *echo.Echo) {
	server.GET("/departments", handler.Show)
}
