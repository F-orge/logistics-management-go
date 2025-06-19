package web

import (
	"github.com/a-h/templ"
	"github.com/labstack/echo/v4"
)

func Render(ctx echo.Context, status int, template templ.Component) error {

	ctx.Response().Writer.WriteHeader(status)

	if err := template.Render(ctx.Request().Context(), ctx.Response().Writer); err != nil {
		return err
	}

	return nil
}
