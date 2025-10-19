package crm

import (
	"context"
	"fmt"

	"github.com/F-orge/logistics-management-go/models"
	"github.com/jackc/pgx/v5/pgtype"
)

type CrmLeadRepository struct {
	Query *models.Queries
}

func (r *CrmLeadRepository) Paginate(page int32, perPage int32, search string) ([]models.CrmPaginateLeadRow, error) {
	searchQuery := fmt.Sprintf("%%%s%%", search)
	result, err := r.Query.CrmPaginateLead(context.Background(), models.CrmPaginateLeadParams{
		Page:    page,
		PerPage: perPage,
		Search:  pgtype.Text{String: searchQuery, Valid: true},
	})
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *CrmLeadRepository) Find(id pgtype.UUID) (models.CrmFindLeadRow, error) {
	result, err := r.Query.CrmFindLead(context.Background(), id)
	if err != nil {
		return models.CrmFindLeadRow{}, err
	}
	return result, nil
}

func (r *CrmLeadRepository) Any(ids []pgtype.UUID) ([]models.CrmAnyLeadRow, error) {
	result, err := r.Query.CrmAnyLead(context.Background(), ids)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *CrmLeadRepository) Range(from pgtype.Date, to pgtype.Date, search string) ([]models.CrmRangeLeadRow, error) {
	searchQuery := fmt.Sprintf("%%%s%%", search)
	result, err := r.Query.CrmRangeLead(context.Background(), models.CrmRangeLeadParams{
		Datefrom: from,
		Dateto:   to,
		Search:   pgtype.Text{String: searchQuery, Valid: true},
	})
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *CrmLeadRepository) Insert(value models.CrmInsertLeadParams) (models.CrmLead, error) {
	result, err := r.Query.CrmInsertLead(context.Background(), value)
	if err != nil {
		return models.CrmLead{}, err
	}
	return result, nil
}

func (r *CrmLeadRepository) Update(value models.CrmUpdateLeadParams) (models.CrmLead, error) {
	result, err := r.Query.CrmUpdateLead(context.Background(), value)
	if err != nil {
		return models.CrmLead{}, err
	}
	return result, nil
}

func (r *CrmLeadRepository) Remove(id pgtype.UUID) error {
	err := r.Query.CrmRemoveLead(context.Background(), id)
	if err != nil {
		return err
	}
	return nil
}
