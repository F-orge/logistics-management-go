package handlers

import (
	"github.com/f-orge/logistics-management-go/internal/repository"
	"github.com/f-orge/logistics-management-go/internal/views"
	"github.com/jackc/pgx/v5"
	"github.com/labstack/echo/v4"
)

type InventoryHandler struct {
	DBConn *pgx.Conn
}

func (i *InventoryHandler) Show(ctx echo.Context) error {

	repo := repository.New(i.DBConn)

	inventoryItems, err := repo.GetAllInventoryItems(ctx.Request().Context())

	if err != nil {
		return err
	}

	return views.InventoryPage(views.InventoryPageProps{
		InventoryItems: inventoryItems,
	}).Render(ctx.Request().Context(), ctx.Response().Writer)

}

func NewInventoryHandler(handler InventoryHandler, server *echo.Echo) {
	server.GET("/inventory", handler.Show)
}
