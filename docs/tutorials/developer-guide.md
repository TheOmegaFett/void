# Developer Guide

This guide is for engineers working on the app and deployment pipeline.

## Local Setup

```bash
git clone https://github.com/TheOmegaFett/void.git
cd void
npm ci
npm start
```

App entrypoint:

- `src/server.js`: Express app, routes, static hosting.
- `src/index.js`: server startup and port binding.

## Quality Gates

```bash
npm run lint
npm test
npm run test:junit
```

## Build and Run in Docker

```bash
docker build -t void-flow-wowplus:local .
docker run --rm -p 8080:8080 void-flow-wowplus:local
```

## CI/CD

- CI workflow: `.github/workflows/ci.yml`
- Staging deploy: `.github/workflows/deploy_staging.yml`
- Production deploy: `.github/workflows/deploy_prod.yml`
- Reusable deploy logic: `.github/workflows/deploy_reusable.yml`
- Smoke tests: `.github/workflows/post_deploy_smoke.yml`

Production deploy trigger:

```bash
git tag -a v1.0.10 -m "Production release v1.0.10"
git push origin v1.0.10
```

## Required Secrets

- `GCP_PROJECT_ID`
- `GCP_REGION`
- `ARTIFACT_REPO`
- `GCP_WIF_PROVIDER`
- `GCP_SERVICE_ACCOUNT_EMAIL`
- `CLOUD_RUN_SERVICE_STAGING`
- `CLOUD_RUN_SERVICE_PROD`
- `STAGING_URL`
- `PROD_URL`

## Generate Documentation from Docstrings

Use JSDoc to generate API documentation from source docstrings:

```bash
npm run docs:generate
```

Generated output is written to `docs/api/`.
