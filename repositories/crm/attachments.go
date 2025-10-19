package crm

import (
	"context"
	"fmt"

	"github.com/F-orge/logistics-management-go/models"
	"github.com/jackc/pgx/v5/pgtype"
)

type CrmAttachmentRepository struct {
	Query *models.Queries
}

func (r *CrmAttachmentRepository) Paginate(page int32, perPage int32, search string) ([]models.CrmAttachment, error) {

	searchQuery := fmt.Sprintf("%%%s%%", search)

	result, err := r.Query.CrmPaginateAttachment(context.Background(), models.CrmPaginateAttachmentParams{
		Page:    page,
		PerPage: perPage,
		Search:  pgtype.Text{String: searchQuery, Valid: true},
	})

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (r *CrmAttachmentRepository) Find(id pgtype.UUID) (models.CrmAttachment, error) {

	result, err := r.Query.CrmFindAttachment(context.Background(), id)

	if err != nil {
		return models.CrmAttachment{}, err
	}

	return result, nil
}

func (r *CrmAttachmentRepository) Any(ids []pgtype.UUID) ([]models.CrmAttachment, error) {

	result, err := r.Query.CrmAnyAttachment(context.Background(), ids)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (r *CrmAttachmentRepository) Range(from pgtype.Date, to pgtype.Date, search string) ([]models.CrmAttachment, error) {

	searchQuery := fmt.Sprintf("%%%s%%", search)

	result, err := r.Query.CrmRangeAttachment(context.Background(), models.CrmRangeAttachmentParams{
		Datefrom: from,
		Dateto:   to,
		Search:   pgtype.Text{String: searchQuery, Valid: true},
	})

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (r *CrmAttachmentRepository) Insert(value models.CrmInsertAttachmentParams) (models.CrmAttachment, error) {

	result, err := r.Query.CrmInsertAttachment(context.Background(), value)

	if err != nil {
		return models.CrmAttachment{}, err
	}

	return result, nil
}

func (r *CrmAttachmentRepository) Update(value models.CrmUpdateAttachmentParams) (models.CrmAttachment, error) {

	result, err := r.Query.CrmUpdateAttachment(context.Background(), value)

	if err != nil {
		return models.CrmAttachment{}, err
	}

	return result, nil
}

func (r *CrmAttachmentRepository) Remove(id pgtype.UUID) error {

	err := r.Query.CrmRemoveAttachment(context.Background(), id)

	if err != nil {
		return err
	}

	return nil
}
