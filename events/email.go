package events

import "github.com/pocketbase/pocketbase/core"

type Emails struct {
	core.BaseRecordProxy
}

// user
func (e *Emails) UserId() string {
	return e.GetString("user")
}

func (e *Emails) SetUserId(id string) {
	e.Set("user", id)
}

// --

// from
func (e *Emails) To() string {
	return e.GetString("to")
}

func (e *Emails) SetTo(to string) {
	e.Set("to", to)
}

// subject
func (e *Emails) Subject() string {
	return e.GetString("subject")
}

func (e *Emails) SetSubject(subject string) {
	e.Set("subject", subject)
}

// --

// message
func (e *Emails) Message() string {
	return e.GetString("message")
}

func (e *Emails) SetMessage(message string) {
	e.Set("message", message)
}

// --
