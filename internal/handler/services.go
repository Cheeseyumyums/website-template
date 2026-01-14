package handler

import (
	"github.com/labstack/echo/v4"
	"website-template/templates/pages"
)

func (h *Handler) Services(c echo.Context) error {
	return pages.Services().Render(c.Request().Context(), c.Response().Writer)
}
