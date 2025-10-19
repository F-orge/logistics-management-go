package crm

import (
	"context"
	"fmt"

	"github.com/F-orge/logistics-management-go/models"
	"github.com/jackc/pgx/v5/pgtype"
)

type CrmContactRepository struct {
	Query *models.Queries
}

func (r *CrmContactRepository) Paginate(page int32, perPage int32, search string) ([]models.CrmPaginateContactRow, error) {
	searchQuery := fmt.Sprintf("%%%s%%", search)
	result, err := r.Query.CrmPaginateContact(context.Background(), models.CrmPaginateContactParams{
		Page:    page,
		PerPage: perPage,
		Search:  pgtype.Text{String: searchQuery, Valid: true},
	})
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *CrmContactRepository) Find(id pgtype.UUID) (models.CrmFindContactRow, error) {
	result, err := r.Query.CrmFindContact(context.Background(), id)
	if err != nil {
		return models.CrmFindContactRow{}, err
	}
	return result, nil
}

func (r *CrmContactRepository) Any(ids []pgtype.UUID) ([]models.CrmAnyContactRow, error) {
	result, err := r.Query.CrmAnyContact(context.Background(), ids)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *CrmContactRepository) Range(from pgtype.Date, to pgtype.Date, search string) ([]models.CrmRangeContactRow, error) {
	searchQuery := fmt.Sprintf("%%%s%%", search)
	result, err := r.Query.CrmRangeContact(context.Background(), models.CrmRangeContactParams{
		Datefrom: from,
		Dateto:   to,
		Search:   pgtype.Text{String: searchQuery, Valid: true},
	})
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *CrmContactRepository) Insert(value models.CrmInsertContactParams) (models.CrmContact, error) {
	result, err := r.Query.CrmInsertContact(context.Background(), value)
	if err != nil {
		return models.CrmContact{}, err
	}
	return result, nil
}

func (r *CrmContactRepository) Update(value models.CrmUpdateContactParams) (models.CrmContact, error) {
	result, err := r.Query.CrmUpdateContact(context.Background(), value)
	if err != nil {
		return models.CrmContact{}, err
	}
	return result, nil
}

func (r *CrmContactRepository) Remove(id pgtype.UUID) error {
	err := r.Query.CrmRemoveContact(context.Background(), id)
	if err != nil {
		return err
	}
	return nil
}
