package api

import "github.com/labstack/echo/v4"

type HealthCheckService struct {
	// internal state
}

// handlers
func (h *HealthCheckService) check(ctx echo.Context) error {
	return ctx.String(200, "healthy")
}

func (h *HealthCheckService) Bind(server *echo.Echo) {
	server.GET("/health", h.check)
}
