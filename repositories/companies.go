package repositories

import (
	"context"
	"fmt"

	"github.com/F-orge/logistics-management-go/models"
	"github.com/jackc/pgx/v5/pgtype"
)

type CrmCompanyRepository struct {
	Query models.Queries
}

func (r *CrmCompanyRepository) Paginate(page int32, perPage int32, search string) ([]models.CrmPaginateCompanyRow, error) {

	searchQuery := fmt.Sprintf("%%%s%%", search)

	result, err := r.Query.CrmPaginateCompany(context.Background(), models.CrmPaginateCompanyParams{
		Page:    page,
		PerPage: perPage,
		Search:  pgtype.Text{String: searchQuery},
	})

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (r *CrmCompanyRepository) Find(id pgtype.UUID) (models.CrmFindCompanyRow, error) {

	result, err := r.Query.CrmFindCompany(context.Background(), id)

	if err != nil {
		return models.CrmFindCompanyRow{}, err
	}

	return result, nil
}

func (r *CrmCompanyRepository) Any(ids []pgtype.UUID) ([]models.CrmAnyCompanyRow, error) {

	result, err := r.Query.CrmAnyCompany(context.Background(), ids)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (r *CrmCompanyRepository) Range(from pgtype.Date, to pgtype.Date, search string) ([]models.CrmRangeCompanyRow, error) {

	searchQuery := fmt.Sprintf("%%%s%%", search)

	result, err := r.Query.CrmRangeCompany(context.Background(), models.CrmRangeCompanyParams{
		Datefrom: from,
		Dateto:   to,
		Search:   pgtype.Text{String: searchQuery},
	})

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (r *CrmCompanyRepository) Insert(value models.CrmInsertCompanyParams) (models.CrmCompany, error) {

	result, err := r.Query.CrmInsertCompany(context.Background(), value)

	if err != nil {
		return models.CrmCompany{}, err
	}

	return result, nil
}

func (r *CrmCompanyRepository) Update(value models.CrmUpdateCompanyParams) (models.CrmCompany, error) {

	result, err := r.Query.CrmUpdateCompany(context.Background(), value)

	if err != nil {
		return models.CrmCompany{}, err
	}

	return result, err
}

func (r *CrmCompanyRepository) Remove(id pgtype.UUID) error {

	if err := r.Query.CrmRemoveCompany(context.Background(), id); err != nil {
		return err
	}

	return nil
}
