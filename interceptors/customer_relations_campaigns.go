package interceptors

import "github.com/pocketbase/pocketbase/core"

func CampaignValidator(e *core.RecordEvent) error {

	if e.Type == "create" {
		// create validation
	}

	if e.Type == "update" {
		// update validation
	}

	return e.Next()
}
