package crm

import (
	"context"
	"fmt"

	"github.com/F-orge/logistics-management-go/models"
	"github.com/jackc/pgx/v5/pgtype"
)

type CrmInteractionRepository struct {
	Query *models.Queries
}

func (r *CrmInteractionRepository) Paginate(page int32, perPage int32, search string) ([]models.CrmPaginateInteractionRow, error) {

	searchQuery := fmt.Sprintf("%%%s%%", search)

	result, err := r.Query.CrmPaginateInteraction(context.Background(), models.CrmPaginateInteractionParams{
		Page:    page,
		PerPage: perPage,
		Search:  pgtype.Text{String: searchQuery, Valid: true},
	})

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (r *CrmInteractionRepository) Find(id pgtype.UUID) (models.CrmFindInteractionRow, error) {

	result, err := r.Query.CrmFindInteraction(context.Background(), id)

	if err != nil {
		return models.CrmFindInteractionRow{}, err
	}

	return result, nil
}

func (r *CrmInteractionRepository) Any(ids []pgtype.UUID) ([]models.CrmAnyInteractionRow, error) {

	result, err := r.Query.CrmAnyInteraction(context.Background(), ids)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (r *CrmInteractionRepository) Range(from pgtype.Date, to pgtype.Date, search string) ([]models.CrmRangeInteractionRow, error) {

	searchQuery := fmt.Sprintf("%%%s%%", search)

	result, err := r.Query.CrmRangeInteraction(context.Background(), models.CrmRangeInteractionParams{
		Datefrom: from,
		Dateto:   to,
		Search:   pgtype.Text{String: searchQuery, Valid: true},
	})

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (r *CrmInteractionRepository) Insert(value models.CrmInsertInteractionParams) (models.CrmInteraction, error) {

	result, err := r.Query.CrmInsertInteraction(context.Background(), value)

	if err != nil {
		return models.CrmInteraction{}, err
	}

	return result, nil
}

func (r *CrmInteractionRepository) Update(value models.CrmUpdateInteractionParams) (models.CrmInteraction, error) {

	result, err := r.Query.CrmUpdateInteraction(context.Background(), value)

	if err != nil {
		return models.CrmInteraction{}, err
	}

	return result, nil
}

func (r *CrmInteractionRepository) Remove(id pgtype.UUID) error {

	err := r.Query.CrmRemoveInteraction(context.Background(), id)

	if err != nil {
		return err
	}

	return nil
}
