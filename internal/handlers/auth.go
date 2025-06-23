package handlers

import (
	"net/http"

	"github.com/f-orge/logistics-management-go/internal/views"
	"github.com/jackc/pgx/v5"
	"github.com/labstack/echo/v4"
)

type (
	LoginPayload struct {
		Email    string `form:"email"`
		Password string `form:"password"`
	}

	AuthHandler struct {
		DBConn *pgx.Conn
	}
)

func (a *AuthHandler) Login(ctx echo.Context) error {

	if ctx.Request().Method == "GET" {
		return views.LoginPage().Render(ctx.Request().Context(), ctx.Response().Writer)
	}

	payload := new(LoginPayload)

	if err := ctx.Bind(payload); err != nil {
		return ctx.String(401, "Invalid email or password")
	}

	return ctx.Redirect(http.StatusTemporaryRedirect, "/")
}

func (a *AuthHandler) Register(ctx echo.Context) error {

	if ctx.Request().Method == "GET" {
		return ctx.String(200, "register page")
	}

	return ctx.String(201, "Successfully created a new user")
}

func NewAuthHandler(handler AuthHandler, server *echo.Echo) {

	server.GET("/login", handler.Login)
	server.POST("/login", handler.Login)
	server.GET("/register", handler.Register)
	server.POST("/register", handler.Register)

}
