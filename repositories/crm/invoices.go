package crm

import (
	"context"
	"fmt"

	"github.com/F-orge/logistics-management-go/models"
	"github.com/jackc/pgx/v5/pgtype"
)

type CrmInvoiceRepository struct {
	Query *models.Queries
}

func (r *CrmInvoiceRepository) Paginate(page int32, perPage int32, search string) ([]models.CrmPaginateInvoiceRow, error) {
	searchQuery := fmt.Sprintf("%%%s%%", search)
	result, err := r.Query.CrmPaginateInvoice(context.Background(), models.CrmPaginateInvoiceParams{
		Page:    page,
		PerPage: perPage,
		Search:  pgtype.Text{String: searchQuery, Valid: true},
	})
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *CrmInvoiceRepository) Find(id pgtype.UUID) (models.CrmFindInvoiceRow, error) {
	result, err := r.Query.CrmFindInvoice(context.Background(), id)
	if err != nil {
		return models.CrmFindInvoiceRow{}, err
	}
	return result, nil
}

func (r *CrmInvoiceRepository) Any(ids []pgtype.UUID) ([]models.CrmAnyInvoiceRow, error) {
	result, err := r.Query.CrmAnyInvoice(context.Background(), ids)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *CrmInvoiceRepository) Range(from pgtype.Date, to pgtype.Date, search string) ([]models.CrmRangeInvoiceRow, error) {
	searchQuery := fmt.Sprintf("%%%s%%", search)
	result, err := r.Query.CrmRangeInvoice(context.Background(), models.CrmRangeInvoiceParams{
		Datefrom: from,
		Dateto:   to,
		Search:   pgtype.Text{String: searchQuery, Valid: true},
	})
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *CrmInvoiceRepository) Insert(value models.CrmInsertInvoiceParams) (models.CrmInvoice, error) {
	result, err := r.Query.CrmInsertInvoice(context.Background(), value)
	if err != nil {
		return models.CrmInvoice{}, err
	}
	return result, nil
}

func (r *CrmInvoiceRepository) Update(value models.CrmUpdateInvoiceParams) (models.CrmInvoice, error) {
	result, err := r.Query.CrmUpdateInvoice(context.Background(), value)
	if err != nil {
		return models.CrmInvoice{}, err
	}
	return result, nil
}

func (r *CrmInvoiceRepository) Remove(id pgtype.UUID) error {
	err := r.Query.CrmRemoveInvoice(context.Background(), id)
	if err != nil {
		return err
	}
	return nil
}
