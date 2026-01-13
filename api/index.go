package handler

import (
	"net/http"
	"os"

	"website-template/internal/config"
	"website-template/internal/handler"
	"website-template/internal/middleware"

	"github.com/labstack/echo/v4"
)

var e *echo.Echo

func init() {
	cfg := config.Load()

	e = echo.New()
	e.HideBanner = true
	e.HidePort = true

	middleware.Setup(e, cfg)

	h := handler.New(cfg)
	h.RegisterRoutes(e)
}

func Handler(w http.ResponseWriter, r *http.Request) {
	e.ServeHTTP(w, r)
}
