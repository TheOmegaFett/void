# Void Flow WOW+ (Node + CI/CD + Cloud Run)

This project serves a static HTML application (in `public/index.html`) using a Node.js + Express server and deploys it using a CI/CD pipeline.

## What this demonstrates (assessment alignment)
- **CI (Continuous Integration):** installs dependencies, runs lint + multiple automated tests, and stores **persistent logs** as artifacts.
- **CD (Continuous Delivery/Deployment):** builds a Docker image, pushes it to Google Artifact Registry, and deploys to Google Cloud Run.
- **Two environments:** **Staging** deploys from `develop`, **Production** deploys from version tags (`vX.Y.Z`).
- **Service validation:** smoke tests run after deployments and nightly on a schedule.

---

## Architecture (diagram)

```mermaid
flowchart LR
  PR[Pull Request] --> CI[CI workflow]
  CI --> Lint[Lint]
  CI --> Tests[Run Jest tests]
  Tests --> Artifacts[Upload logs/artifacts]

  Dev[Push to develop] --> STG[Deploy Staging]
  STG --> Docker[Build Docker image]
  Docker --> AR[Artifact Registry]
  AR --> CRs[Cloud Run (staging)\nnew revision per SHA]
  CRs --> SmokeS[Smoke test /health]

  Tag[Push tag vX.Y.Z] --> PROD[Deploy Production]
  PROD --> AR2[Artifact Registry]
  AR2 --> CRp[Cloud Run (prod)\nnew revision per SHA]
  CRp --> SmokeP[Smoke test /health]

  Night[Schedule] --> SmokeN[Nightly smoke tests]

