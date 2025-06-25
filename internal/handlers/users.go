package handlers

import (
	"github.com/f-orge/logistics-management-go/internal/repository"
	"github.com/f-orge/logistics-management-go/internal/views"
	"github.com/jackc/pgx/v5"
	"github.com/labstack/echo/v4"
)

type UserHandler struct {
	DBConn *pgx.Conn
}

func (u *UserHandler) All(ctx echo.Context) error {

	repo := repository.New(u.DBConn)

	users, err := repo.GetAllUsers(ctx.Request().Context())

	if err != nil {
		return ctx.String(500, "internal server error")
	}

	return views.UsersPage(views.UsersPageProps{
		Users: users,
	}).Render(ctx.Request().Context(), ctx.Response().Writer)
}

func NewUserHandler(handler UserHandler, server *echo.Echo) {
	server.GET("/users", handler.All)
}
