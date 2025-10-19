package crm

import (
	"context"
	"fmt"

	"github.com/F-orge/logistics-management-go/models"
	"github.com/jackc/pgx/v5/pgtype"
)

type CrmProductRepository struct {
	Query *models.Queries
}

func (r *CrmProductRepository) Paginate(page int32, perPage int32, search string) ([]models.CrmProduct, error) {

	searchQuery := fmt.Sprintf("%%%s%%", search)

	result, err := r.Query.CrmPaginateProduct(context.Background(), models.CrmPaginateProductParams{
		Page:    page,
		PerPage: perPage,
		Search:  pgtype.Text{String: searchQuery, Valid: true},
	})

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (r *CrmProductRepository) Find(id pgtype.UUID) (models.CrmProduct, error) {

	result, err := r.Query.CrmFindProduct(context.Background(), id)

	if err != nil {
		return models.CrmProduct{}, err
	}

	return result, nil
}

func (r *CrmProductRepository) Any(ids []pgtype.UUID) ([]models.CrmProduct, error) {

	result, err := r.Query.CrmAnyProduct(context.Background(), ids)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (r *CrmProductRepository) Range(from pgtype.Date, to pgtype.Date, search string) ([]models.CrmProduct, error) {

	searchQuery := fmt.Sprintf("%%%s%%", search)

	result, err := r.Query.CrmRangeProduct(context.Background(), models.CrmRangeProductParams{
		Datefrom: from,
		Dateto:   to,
		Search:   pgtype.Text{String: searchQuery, Valid: true},
	})

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (r *CrmProductRepository) Insert(value models.CrmInsertProductParams) (models.CrmProduct, error) {

	result, err := r.Query.CrmInsertProduct(context.Background(), value)

	if err != nil {
		return models.CrmProduct{}, err
	}

	return result, nil
}

func (r *CrmProductRepository) Update(value models.CrmUpdateProductParams) (models.CrmProduct, error) {

	result, err := r.Query.CrmUpdateProduct(context.Background(), value)

	if err != nil {
		return models.CrmProduct{}, err
	}

	return result, nil
}

func (r *CrmProductRepository) Remove(id pgtype.UUID) error {

	err := r.Query.CrmRemoveProduct(context.Background(), id)

	if err != nil {
		return err
	}

	return nil
}
