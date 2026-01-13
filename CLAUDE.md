# PWT - Power Wash Technologies Development Guide

This is a Go web application built with Templ, HTMX, and Tailwind CSS for PWT (Power Wash Technologies), a commercial kitchen hood cleaning service.

## Critical Build Error Checking

**ALWAYS check `./tmp/air-combined.log` after making code changes.** This log contains:
- Compilation errors
- Template generation errors
- Tailwind CSS generation errors

Never assume code changes succeeded without checking this log. The `build-errors.log` file is usually less comprehensive - use `air-combined.log` instead.

## Development Workflow

The primary development command is `make dev`, which:
- Kills any existing process on port 8000
- Regenerates Templ templates automatically
- Runs `go mod tidy` automatically
- Rebuilds and restarts the server on file changes

**You do NOT need to manually run:**
- `templ generate` (Air does this automatically)
- `go build` (Air does this automatically)
- `air` directly (use `make dev` instead)

## Environment Configuration

All configuration is via `.envrc` with direnv:

```bash
export PORT="8000"
export ENV="development"
export LOG_LEVEL="DEBUG"
export SITE_NAME="PWT - Power Wash Technologies"
export SITE_URL="http://localhost:8000"
export DEFAULT_OG_IMAGE="/static/images/og-default.png"
```

Load environment: `direnv allow` or `source .envrc`

## Key Commands

| Command | Description |
|---------|-------------|
| `make dev` | Start with Air hot reload (main workflow) |
| `make build` | Build production binary |
| `make test` | Run tests with race detection |
| `make lint` | Run golangci-lint and templ fmt |
| `make css` | Build Tailwind CSS (production) |
| `make css-watch` | Watch Tailwind CSS (separate terminal) |
| `make setup` | Install development tools |
| `make clean` | Remove build artifacts |

## Project Structure

| Directory | Purpose |
|-----------|---------|
| `cmd/server/` | Entry point for local development |
| `api/` | Vercel serverless function entry point |
| `internal/config/` | Environment configuration |
| `internal/handler/` | HTTP request handlers |
| `internal/middleware/` | Echo middleware |
| `internal/meta/` | SEO and page metadata |
| `templates/` | Templ templates (layouts, pages) |
| `static/` | CSS, JS, images (served as /static/) |
| `public/` | Vercel static files (mirrors static/) |

## Code Patterns

### Logging
Use `slog` (never `fmt.Printf` or `log.Printf`):

```go
slog.Info("message", "key", value)
slog.Error("error occurred", "error", err)
slog.Debug("debug info", "data", data)
```

### Error Handling
Wrap errors with context:

```go
if err != nil {
    return fmt.Errorf("failed to do something: %w", err)
}
```

### Templates
Templates own their meta tags - handlers do NOT construct meta:

```go
// Handler (home.go)
func (h *Handler) Home(c echo.Context) error {
    return pages.Home().Render(c.Request().Context(), c.Response().Writer)
}
```

```templ
// Template (home.templ)
templ Home() {
    @layouts.Base(meta.New("Home", "Description")) {
        // content
    }
}
```

### Tailwind CSS Classes
Use Tailwind utilities directly in templates. The project uses Tailwind CSS v4:

```templ
<button class="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700">
    Click me
</button>
```

## Vercel Deployment

The project is configured for Vercel deployment:

1. `vercel.json` - Routes all requests through `/api/index.go`
2. `api/index.go` - Serverless function that initializes Echo
3. `public/` - Static files (CSS, JS, images)

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Environment Variables on Vercel

Set these in your Vercel project settings:
- `SITE_NAME`: "PWT - Power Wash Technologies"
- `SITE_URL`: Your production URL
- `ENV`: "production"

## SEO and Meta Tags

Site name comes from environment/context, NOT from handlers:

```templ
// In templates, access site name from context
<h1>{ meta.SiteNameFromCtx(ctx) }</h1>
```

Page meta is constructed in templates:

```templ
templ AboutPage() {
    @layouts.Base(meta.New("About Us", "Learn about PWT services")) {
        // content
    }
}
```

## Common Tasks

### Add a new page

1. Create template: `templates/pages/newpage.templ`
2. Add handler: `internal/handler/newpage.go`
3. Register route in `internal/handler/handler.go`

### Update styles

Edit `static/css/input.css` and run `make css` or use `make css-watch` during development.

### Add client-side interactivity

Use HTMX attributes for server-driven interactions:

```templ
<button hx-get="/api/data" hx-target="#result">Load Data</button>
<div id="result"></div>
```

## Troubleshooting

### Build Fails
Check `./tmp/air-combined.log` for the actual error.

### Port Already in Use
Air's pre_cmd kills processes on port 8000, but if it fails:
```bash
lsof -ti:8000 | xargs kill -9
```

### Templates Not Updating
Air watches for `.templ` file changes and regenerates automatically. Check `air-combined.log` for generation errors.

### CSS Not Applying
Ensure Tailwind CSS is built:
```bash
make css
```

For development, run in a separate terminal:
```bash
make css-watch
```

## Testing

Run tests:
```bash
make test
```

Run specific test:
```bash
go test -v ./internal/handler -run TestHome
```

## Production Build

Build for production:
```bash
make build
```

This generates a `website-template` binary. Run it:
```bash
./website-template
```

Make sure to set production environment variables first.
