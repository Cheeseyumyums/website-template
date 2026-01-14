package handler

import (
	"website-template/internal/config"

	"github.com/labstack/echo/v4"
)

type Handler struct {
	cfg *config.Config
}

func New(cfg *config.Config) *Handler {
	return &Handler{
		cfg: cfg,
	}
}

func (h *Handler) RegisterRoutes(e *echo.Echo) {
	e.Static("/static", "public")

	e.GET("/health", h.Health)
	e.GET("/", h.Home)
	e.GET("/services", h.Services)
	e.GET("/gallery", h.Gallery)
	e.GET("/contact", h.Contact)
}
