package api

import (
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/karlrobeck/echo-react-template/models"
	"github.com/labstack/echo/v4"
)

type RegisterPayload struct {
	Email           string `json:"email" validate:"email"`
	Password        string `json:"password"`
	Name            string `json:"name"`
	ConfirmPassword string `json:"confirmPassword"`
}

type LoginPayload struct {
	Email    string `json:"email" validate:"email"`
	Password string `json:"password"`
}

type UpdatePasswordPayload struct {
	NewPassword string `json:"newPassword"`
	OldPassword string `json:"oldPassword"`
}

type UpdateEmailPayload struct {
	NewEmail string `json:"newEmail"`
	OldEmail string `json:"oldEmail"`
}

type AuthUserResponse struct {
	ID      pgtype.UUID        `json:"id" ts_type:"string"`
	Email   string             `json:"email"`
	Name    string             `json:"name"`
	Created pgtype.Timestamptz `json:"created" ts_type:"string"`
	Updated pgtype.Timestamptz `json:"updated" ts_type:"string"`
}

type RefreshPayload struct {
	Token string `json:"token"`
}

type JWTClaims struct {
	jwt.RegisteredClaims
}

type AuthService struct {
	DbConn *pgx.Conn
}

func (a *AuthService) register(ctx echo.Context) error {

	newUser := new(RegisterPayload)

	if newUser.Password != newUser.ConfirmPassword {
		return ctx.String(400, "Password does not match")
	}

	if err := ctx.Bind(newUser); err != nil {
		return err
	}

	trx, err := a.DbConn.Begin(ctx.Request().Context())

	if err != nil {
		return err
	}

	defer trx.Rollback(ctx.Request().Context())

	queries := models.New(a.DbConn)

	qtx := queries.WithTx(trx)

	if _, err = qtx.CreateUser(ctx.Request().Context(), models.CreateUserParams{
		Name:     newUser.Name,
		Email:    newUser.Email,
		Password: newUser.Password,
	}); err != nil {
		return err
	}

	if err := trx.Commit(ctx.Request().Context()); err != nil {
		return err
	}

	return ctx.String(201, "register endpoint")
}

func (a *AuthService) login(ctx echo.Context) error {

	payload := new(LoginPayload)

	if err := ctx.Bind(payload); err != nil {
		return err
	}

	queries := models.New(a.DbConn)

	authUser, err := queries.AuthenticateUser(ctx.Request().Context(), models.AuthenticateUserParams{
		Email:    payload.Email,
		Password: payload.Password,
	})

	if err != nil {
		return err
	}

	claims := &JWTClaims{
		RegisteredClaims: jwt.RegisteredClaims{
			Subject:   authUser.ID.String(),
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 1)),
		},
	}

	tokenClaims := jwt.NewWithClaims(jwt.SigningMethodES256, claims)

	token, err := tokenClaims.SignedString("hello-password")

	if err != nil {
		return err
	}

	return ctx.JSON(http.StatusOK, echo.Map{
		"token": token,
	})
}

func (a *AuthService) refresh(ctx echo.Context) error {

	payload := new(RefreshPayload)

	if err := ctx.Bind(payload); err != nil {
		return err
	}

	token, err := jwt.ParseWithClaims(payload.Token, &JWTClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte("hello-password"), nil
	})

	if err != nil || !token.Valid {
		return ctx.String(http.StatusUnauthorized, "Invalid token")
	}

	return ctx.String(201, "refresh endpoint")
}

func (a *AuthService) me(ctx echo.Context) error {

	user := ctx.Get("user").(*jwt.Token)

	claims := user.Claims.(*JWTClaims)

	queries := models.New(a.DbConn)

	var userID pgtype.UUID

	if err := userID.Scan(claims.Subject); err != nil {
		return err
	}

	dbUser, err := queries.GetUserByID(ctx.Request().Context(), userID)

	if err != nil {
		return err
	}

	return ctx.JSON(200, AuthUserResponse{
		ID:      dbUser.ID,
		Email:   dbUser.Email,
		Name:    dbUser.Name,
		Created: dbUser.Created,
		Updated: dbUser.Updated,
	})
}

func (a *AuthService) updatePassword(ctx echo.Context) error {

	user := ctx.Get("user").(*jwt.Token)

	claims := user.Claims.(*JWTClaims)

	payload := new(UpdatePasswordPayload)

	if err := ctx.Bind(payload); err != nil {
		return err
	}

	queries := models.New(a.DbConn)

	var userID pgtype.UUID

	if err := userID.Scan(claims.Subject); err != nil {
		return err
	}

	if _, err := queries.UpdateUserPassword(ctx.Request().Context(), models.UpdateUserPasswordParams{
		NewPassword: payload.NewPassword,
		OldPassword: payload.OldPassword,
		ID:          userID,
	}); err != nil {
		return err
	}

	return ctx.String(201, "password updated successfully")

}

func (a *AuthService) updateEmail(ctx echo.Context) error {
	user := ctx.Get("user").(*jwt.Token)

	claims := user.Claims.(*JWTClaims)

	payload := new(UpdateEmailPayload)

	if err := ctx.Bind(payload); err != nil {
		return err
	}

	queries := models.New(a.DbConn)

	var userID pgtype.UUID

	if err := userID.Scan(claims.Subject); err != nil {
		return err
	}

	if _, err := queries.UpdateUserEmail(ctx.Request().Context(), models.UpdateUserEmailParams{
		NewEmail: payload.NewEmail,
		OldEmail: payload.OldEmail,
		ID:       userID,
	}); err != nil {
		return err
	}

	return ctx.String(200, "Email updated sucessfully")
}

func (a *AuthService) Bind(server *echo.Echo) {
	group := server.Group("/api/auth")
	group.POST("/register", a.register)
	group.POST("/login", a.login)
	group.POST("/refresh", a.refresh)
	group.GET("/me", a.me)
	group.PATCH("/update-password", a.updatePassword)
	group.PATCH("/update-email", a.updateEmail)
}
