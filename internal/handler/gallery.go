package handler

import (
	"website-template/templates/pages"

	"github.com/labstack/echo/v4"
)

func (h *Handler) Gallery(c echo.Context) error {
	return pages.Gallery().Render(c.Request().Context(), c.Response().Writer)
}
