package api

import (
	"strconv"

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

func (h *GenericEchoHandler[PageT, FindT, AnyT, RangeT, InsertT, UpdateT, MutationT]) GetMany(ctx echo.Context) error {

	page, err := strconv.ParseInt(ctx.QueryParam("page"), 10, 32)

	if err != nil {
		return ctx.String(400, "page search param required")
	}

	perPage, err := strconv.Atoi(ctx.QueryParam("perPage"))

	if err != nil {
		return ctx.String(400, "perPage search query required")
	}

	searchQuery := ctx.QueryParam("search")

	result, err := h.Repo.Paginate(int32(page), int32(perPage), searchQuery)

	if err != nil {
		return err
	}

	return ctx.JSON(200, result)
}

func (h *GenericEchoHandler[PageT, FindT, AnyT, RangeT, InsertT, UpdateT, MutationT]) GetOne(ctx echo.Context) error {

	id := ctx.Param("id")

	return ctx.String(200, "get "+id)
}

func (h *GenericEchoHandler[PageT, FindT, AnyT, RangeT, InsertT, UpdateT, MutationT]) Post(ctx echo.Context) error {
	return ctx.String(201, "hello world")
}

func (h *GenericEchoHandler[PageT, FindT, AnyT, RangeT, InsertT, UpdateT, MutationT]) Patch(ctx echo.Context) error {
	return ctx.String(200, "hello world")
}

func (h *GenericEchoHandler[PageT, FindT, AnyT, RangeT, InsertT, UpdateT, MutationT]) Delete(ctx echo.Context) error {
	return ctx.String(204, "hello world")
}

// RegisterRepository wires the repository to HTTP routes.
func RegisterRepository[PageT any, FindT any, AnyT any, RangeT any, InsertT any, UpdateT any, MutationT any](
	router *echo.Group,
	path string,
	repo repositories.GenericRepository[PageT, FindT, AnyT, RangeT, InsertT, UpdateT, MutationT],
) {
	handler := NewGenericHandler(repo)

	group := router.Group(path)

	group.GET("/", handler.GetMany)
	group.GET("/:id", handler.GetOne)
	group.POST("/", handler.Post)
	group.PATCH("/:id", handler.Patch)
	group.DELETE("/:id", handler.Delete)
}
