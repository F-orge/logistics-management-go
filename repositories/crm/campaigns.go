package crm

import (
	"context"
	"fmt"

	"github.com/F-orge/logistics-management-go/models"
	"github.com/jackc/pgx/v5/pgtype"
)

type CrmCampaignRepository struct {
	Query *models.Queries
}

func (r *CrmCampaignRepository) Paginate(page int32, perPage int32, search string) ([]models.CrmCampaign, error) {

	searchQuery := fmt.Sprintf("%%%s%%", search)

	result, err := r.Query.CrmPaginateCampaign(context.Background(), models.CrmPaginateCampaignParams{
		Page:    page,
		PerPage: perPage,
		Search:  pgtype.Text{String: searchQuery, Valid: true},
	})

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (r *CrmCampaignRepository) Find(id pgtype.UUID) (models.CrmCampaign, error) {

	result, err := r.Query.CrmFindCampaign(context.Background(), id)

	if err != nil {
		return models.CrmCampaign{}, err
	}

	return result, nil
}

func (r *CrmCampaignRepository) Any(ids []pgtype.UUID) ([]models.CrmCampaign, error) {
	result, err := r.Query.CrmAnyCampaign(context.Background(), ids)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *CrmCampaignRepository) Range(from pgtype.Date, to pgtype.Date, search string) ([]models.CrmCampaign, error) {

	searchQuery := fmt.Sprintf("%%%s%%", search)

	result, err := r.Query.CrmRangeCampaign(context.Background(), models.CrmRangeCampaignParams{
		Datefrom: from,
		Dateto:   to,
		Search:   pgtype.Text{String: searchQuery, Valid: true},
	})

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (r *CrmCampaignRepository) Insert(value models.CrmInsertCampaignParams) (models.CrmCampaign, error) {

	result, err := r.Query.CrmInsertCampaign(context.Background(), value)

	if err != nil {
		return models.CrmCampaign{}, err
	}

	return result, nil
}

func (r *CrmCampaignRepository) Update(value models.CrmUpdateCampaignParams) (models.CrmCampaign, error) {

	result, err := r.Query.CrmUpdateCampaign(context.Background(), value)

	if err != nil {
		return models.CrmCampaign{}, err
	}

	return result, nil
}

func (r *CrmCampaignRepository) Remove(id pgtype.UUID) error {

	err := r.Query.CrmRemoveCampaign(context.Background(), id)

	if err != nil {
		return err
	}

	return nil
}
