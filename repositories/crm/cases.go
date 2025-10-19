package crm

import (
	"context"
	"fmt"

	"github.com/F-orge/logistics-management-go/models"
	"github.com/jackc/pgx/v5/pgtype"
)

type CrmCaseRepository struct {
	Query models.Queries
}

func (r *CrmCaseRepository) Paginate(page int32, perPage int32, search string) ([]models.CrmPaginateCaseRow, error) {

	searchQuery := fmt.Sprintf("%%%s%%", search)

	result, err := r.Query.CrmPaginateCase(context.Background(), models.CrmPaginateCaseParams{
		Page:    page,
		PerPage: perPage,
		Search:  pgtype.Text{String: searchQuery, Valid: true},
	})

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (r *CrmCaseRepository) Find(id pgtype.UUID) (models.CrmFindCaseRow, error) {

	result, err := r.Query.CrmFindCase(context.Background(), id)

	if err != nil {
		return models.CrmFindCaseRow{}, err
	}

	return result, nil
}

func (r *CrmCaseRepository) Any(ids []pgtype.UUID) ([]models.CrmAnyCaseRow, error) {

	result, err := r.Query.CrmAnyCase(context.Background(), ids)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (r *CrmCaseRepository) Range(from pgtype.Date, to pgtype.Date, search string) ([]models.CrmRangeCaseRow, error) {

	searchQuery := fmt.Sprintf("%%%s%%", search)

	result, err := r.Query.CrmRangeCase(context.Background(), models.CrmRangeCaseParams{
		Datefrom: from,
		Dateto:   to,
		Search:   pgtype.Text{String: searchQuery, Valid: true},
	})

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (r *CrmCaseRepository) Insert(value models.CrmInsertCaseParams) (models.CrmCase, error) {

	result, err := r.Query.CrmInsertCase(context.Background(), value)

	if err != nil {
		return models.CrmCase{}, err
	}

	return result, nil
}

func (r *CrmCaseRepository) Update(value models.CrmUpdateCaseParams) (models.CrmCase, error) {

	result, err := r.Query.CrmUpdateCase(context.Background(), value)

	if err != nil {
		return models.CrmCase{}, err
	}

	return result, nil
}

func (r *CrmCaseRepository) Remove(id pgtype.UUID) error {

	err := r.Query.CrmRemoveCase(context.Background(), id)

	if err != nil {
		return err
	}

	return nil
}
