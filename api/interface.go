package api

import (
	"github.com/F-orge/logistics-management-go/repositories"
	"github.com/labstack/echo"
)

// GenericEchoHandler holds a repository with separate types for each operation.
type GenericEchoHandler[PageT any, FindT any, AnyT any, RangeT any, InsertT any, UpdateT any, MutationT any] struct {
	Repo repositories.GenericRepository[PageT, FindT, AnyT, RangeT, InsertT, UpdateT, MutationT]
}

func NewGenericHandler[PageT any, FindT any, AnyT any, RangeT any, InsertT any, UpdateT any, MutationT any](repo repositories.GenericRepository[PageT, FindT, AnyT, RangeT, InsertT, UpdateT, MutationT]) *GenericEchoHandler[PageT, FindT, AnyT, RangeT, InsertT, UpdateT, MutationT] {
	return &GenericEchoHandler[PageT, FindT, AnyT, RangeT, InsertT, UpdateT, MutationT]{
		Repo: repo,
	}
}

func (h *GenericEchoHandler[PageT, FindT, AnyT, RangeT, InsertT, UpdateT, MutationT]) Paginate(ctx echo.Context) error {
	return ctx.String(200, "hello world")
}

// RegisterRepository wires the repository to HTTP routes.
func RegisterRepository[PageT any, FindT any, AnyT any, RangeT any, InsertT any, UpdateT any, MutationT any](
	router *echo.Echo,
	path string,
	repo repositories.GenericRepository[PageT, FindT, AnyT, RangeT, InsertT, UpdateT, MutationT],
) {
	handler := NewGenericHandler(repo)

	router.GET(path, handler.Paginate)
}
