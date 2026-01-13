package config

import (
	"log/slog"
	"os"
)

type SiteConfig struct {
	Name           string
	URL            string
	DefaultOGImage string
}

type Config struct {
	Port string
	Env  string
	Site SiteConfig
}

func Load() *Config {
	cfg := &Config{
		Port: getEnvOrDefault("PORT", "8000"),
		Env:  getEnvOrDefault("ENV", "development"),
		Site: SiteConfig{
			Name:           getEnvOrDefault("SITE_NAME", "PWT - Power Wash Technologies"),
			URL:            getEnvOrDefault("SITE_URL", "http://localhost:8000"),
			DefaultOGImage: getEnvOrDefault("DEFAULT_OG_IMAGE", "/static/images/og-default.png"),
		},
	}

	return cfg
}

func (c *Config) IsDevelopment() bool {
	return c.Env == "development"
}

func (c *Config) IsProduction() bool {
	return c.Env == "production"
}

func getEnvOrDefault(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	slog.Debug("using default value for environment variable", "key", key, "default", defaultValue)
	return defaultValue
}
