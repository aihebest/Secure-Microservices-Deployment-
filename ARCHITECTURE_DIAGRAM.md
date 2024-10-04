```mermaid
graph TD
    Dev[Developer] -->|Push Code| Git[GitHub Repository]
    Git -->|Trigger| GHA[GitHub Actions]
    GHA -->|Build & Scan| Trivy[Trivy Scanner]
    GHA -->|Push Image| DockerHub[Docker Hub]
    Git -->|Detect Changes| ArgoCD[ArgoCD]
    ArgoCD -->|Sync| EKS[Amazon EKS]
    EKS -->|Deploy| App[Sample App]
    EKS -->|Collect Metrics| Prom[Prometheus]
    Prom -->|Visualize| Grafana[Grafana Dashboards]
    EKS -->|Enforce| NP[Network Policies]