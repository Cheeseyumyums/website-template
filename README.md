# PWT - Power Wash Technologies

Professional commercial kitchen hood cleaning services website built with Go, Templ, HTMX, and Tailwind CSS.

## Features

- **Server-side rendering** with Templ templates
- **Modern styling** with Tailwind CSS v4
- **Interactive UI** with HTMX
- **Fast development** with Air hot reload
- **SEO-ready** with meta tags and OpenGraph support
- **Vercel deployment** ready

## Quick Start

### Prerequisites

- Go 1.25+
- Node.js 20+ (for Tailwind CSS)
- direnv (recommended)

### Setup

```bash
# Install development tools
make setup

# Copy environment file
cp .envrc.example .envrc
direnv allow  # or: source .envrc

# Install dependencies
npm install
go mod download
```

### Development

```bash
# Start development server with hot reload
make dev
```

Visit http://localhost:8000

The server will automatically:
- Regenerate Templ templates on changes
- Rebuild Go code on changes
- Restart the server

### Build for Production

```bash
# Build binary
make build

# Run production server
./website-template
```

## Project Structure

```
website-template/
├── cmd/server/         # Entry point for local development
├── api/                # Vercel serverless function entry point
├── internal/           # Go application code
│   ├── config/        # Environment configuration
│   ├── handler/       # HTTP request handlers
│   ├── middleware/    # Echo middleware
│   ├── meta/          # SEO metadata helpers
│   └── ctxkeys/       # Context keys
├── templates/          # Templ templates
│   ├── layouts/       # Base layout & meta tags
│   └── pages/         # Page templates
├── static/            # Source assets (local dev)
├── public/            # Built assets (Vercel)
├── .air.toml          # Air hot reload config
├── Makefile           # Development commands
└── CLAUDE.md          # Detailed development guide
```

## Available Commands

```bash
make dev          # Start with Air hot reload (main workflow)
make build        # Build production binary
make test         # Run tests with race detection
make lint         # Run golangci-lint and templ fmt
make css          # Build Tailwind CSS (production)
make css-watch    # Watch and rebuild Tailwind CSS
make setup        # Install development tools
make clean        # Remove build artifacts
```

## Deployment to Vercel

### One-time Setup

```bash
# Install Vercel CLI
npm i -g vercel

# Link project to Vercel
vercel
```

### Environment Variables

Set these in your Vercel project settings:

- `SITE_NAME`: "PWT - Power Wash Technologies"
- `SITE_URL`: Your production URL (e.g., https://pwt.vercel.app)
- `ENV`: "production"
- `DEFAULT_OG_IMAGE`: "/static/images/og-default.png"

### Deploy

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Technology Stack

- **[Go](https://go.dev/)** - Backend language
- **[Echo](https://echo.labstack.com/)** - Web framework
- **[Templ](https://templ.guide/)** - Type-safe HTML templating
- **[HTMX](https://htmx.org/)** - Modern web interactions
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS
- **[Air](https://github.com/air-verse/air)** - Live reload for Go
- **[Vercel](https://vercel.com/)** - Deployment platform

## Contact

- **Phone**: [715-214-4518](tel:7152144518)
- **Email**: [jeffrogerspwt@yahoo.com](mailto:jeffrogerspwt@yahoo.com)

## Development Guide

For detailed development patterns, code conventions, and troubleshooting, see [CLAUDE.md](./CLAUDE.md).

## License

All rights reserved.
