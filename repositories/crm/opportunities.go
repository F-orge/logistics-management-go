package crm

import (
	"context"
	"fmt"

	"github.com/F-orge/logistics-management-go/models"
	"github.com/jackc/pgx/v5/pgtype"
)

type CrmOpportunityRepository struct {
	Query *models.Queries
}

func (r *CrmOpportunityRepository) Paginate(page int32, perPage int32, search string) ([]models.CrmPaginateOpportunityRow, error) {
	searchQuery := fmt.Sprintf("%%%s%%", search)
	result, err := r.Query.CrmPaginateOpportunity(context.Background(), models.CrmPaginateOpportunityParams{
		Page:    page,
		PerPage: perPage,
		Search:  pgtype.Text{String: searchQuery, Valid: true},
	})
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *CrmOpportunityRepository) Find(id pgtype.UUID) (models.CrmFindOpportunityRow, error) {
	result, err := r.Query.CrmFindOpportunity(context.Background(), id)
	if err != nil {
		return models.CrmFindOpportunityRow{}, err
	}
	return result, nil
}

func (r *CrmOpportunityRepository) Any(ids []pgtype.UUID) ([]models.CrmAnyOpportunityRow, error) {
	result, err := r.Query.CrmAnyOpportunity(context.Background(), ids)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *CrmOpportunityRepository) Range(from pgtype.Date, to pgtype.Date, search string) ([]models.CrmRangeOpportunityRow, error) {
	searchQuery := fmt.Sprintf("%%%s%%", search)
	result, err := r.Query.CrmRangeOpportunity(context.Background(), models.CrmRangeOpportunityParams{
		Datefrom: from,
		Dateto:   to,
		Search:   pgtype.Text{String: searchQuery, Valid: true},
	})
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *CrmOpportunityRepository) Insert(value models.CrmInsertOpportunityParams) (models.CrmOpportunitiesView, error) {
	result, err := r.Query.CrmInsertOpportunity(context.Background(), value)
	if err != nil {
		return models.CrmOpportunitiesView{}, err
	}
	return result, nil
}

func (r *CrmOpportunityRepository) Update(value models.CrmUpdateOpportunityParams) (models.CrmOpportunitiesView, error) {
	result, err := r.Query.CrmUpdateOpportunity(context.Background(), value)
	if err != nil {
		return models.CrmOpportunitiesView{}, err
	}
	return result, nil
}

func (r *CrmOpportunityRepository) Remove(id pgtype.UUID) error {
	err := r.Query.CrmRemoveOpportunity(context.Background(), id)
	if err != nil {
		return err
	}
	return nil
}
