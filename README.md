# Kindle Dashboard

A quiet React dashboard designed for Kindle e-ink screens.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

This project is configured for a GitHub repository named `kindle-dashboard`.

1. Create a GitHub repository named `kindle-dashboard`.
2. Push this project to the `main` branch.
3. In GitHub, open `Settings` -> `Pages`.
4. Set `Build and deployment` -> `Source` to `GitHub Actions`.
5. The workflow in `.github/workflows/deploy.yml` will build and deploy the site.

The preview URL will usually be:

```text
https://<your-github-username>.github.io/kindle-dashboard/
```

If you use a different repository name, update `base` in `vite.config.ts`.
