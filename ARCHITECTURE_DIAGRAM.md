```mermaid
graph TD
    Dev[Developer] -->|Push Code| Git[GitHub Repository]
    Git -->|Trigger| GHA[GitHub Actions]
    GHA -->|Build & Scan| Trivy[Trivy Scanner]
    GHA -->|Push Image| DockerHub[Docker Hub]
    Git -->|Detect Changes| ArgoCD[ArgoCD]
    ArgoCD -->|Sync| EKS[Amazon EKS]
    EKS -->|Deploy| App[Sample App]
    App -->|Expose Metrics| Prom[Prometheus]
    Prom -->|Collect Metrics| Prom
    Prom -->|Visualize| Grafana[Grafana Dashboards]
    Prom -->|Trigger Alerts| AlertManager[Alertmanager]
    AlertManager -->|Send Notifications| Notify[Email/Slack]
    EKS -->|Enforce| NP[Network Policies]