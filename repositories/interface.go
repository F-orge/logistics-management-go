package repositories

import (
	"github.com/jackc/pgx/v5/pgtype"
)

type PaginateResponse[T any] struct {
	TotalItems int32
	TotalPages int32
	Items      []T
}

type GenericRepository[PageT any, FindT any, AnyT any, RangeT any, InsertT any, UpdateT any, MutationT any] interface {
	Paginate(page int32, perPage int32, search string) ([]PaginateResponse[PageT], error)
	Find(id pgtype.UUID) (FindT, error)
	Any(ids []pgtype.UUID) ([]AnyT, error)
	Range(from pgtype.Date, to pgtype.Date, search string) ([]RangeT, error)
	Insert(value InsertT) (MutationT, error)
	Update(value UpdateT) (MutationT, error)
	Remove(id pgtype.UUID) error
}
