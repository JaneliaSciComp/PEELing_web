# PEELing Web Deployment

## Overview

PEELing Web is deployed to Kubernetes using **ArgoCD**, which syncs the Kustomize manifests from this repo. The ArgoCD Application resource is defined externally (not in this repo).

## Architecture

The application runs as a single Deployment with two containers in the `peeling-app` namespace:

- **api** - Python/FastAPI server (uvicorn on port 8000)
- **client** - Nginx reverse proxy serving the frontend and proxying `/api` requests to the API container

Container images are hosted in AWS ECR:
- `777794738451.dkr.ecr.us-east-1.amazonaws.com/peeling/web_api:<tag>`
- `777794738451.dkr.ecr.us-east-1.amazonaws.com/peeling/web_client:<tag>`

## Kubernetes Resources

All manifests live in `k8s/base/`:

| Resource | File | Description |
|---|---|---|
| Namespace | `namespace.yaml` | `peeling-app` namespace |
| Deployment | `deploy.yaml` | Single-pod deployment with API + Nginx containers |
| Service | `service.yaml` | LoadBalancer service exposing port 80 |
| IngressRoute | `ingress-route.yaml` | Traefik IngressRoute for `peeling.janelia.org` (HTTP + HTTPS) |
| IngressRoute (test) | `ingress-route-test.yaml` | Traefik IngressRoute for `peeling-test.janelia.org` |
| Middleware | `https-redirect.yaml` | Traefik middleware for HTTP-to-HTTPS redirect |
| Certificate | `certificate.yaml` | cert-manager certificates (Sectigo prod + Let's Encrypt staging) |
| PVCs | `pvc.yaml` | Three `gp2` PVCs (2Gi each): data, results, logs |
| ConfigMap | generated via `kustomization.yaml` | Nginx config from `config/default.conf` |

## Persistent Storage

The API container mounts three persistent volumes:
- `/retrieved_data` - peeling-data-pvc
- `/results` - peeling-results-pvc
- `/log` - peeling-log-pvc

All use the `gp2` storage class with `ReadWriteOnce` access.

## TLS

Certificates are managed by cert-manager:
- **Production**: `peeling.janelia.org` via `sectigo-prod` ClusterIssuer
- **Test**: `peeling-test.janelia.org` via `letsencrypt-staging` ClusterIssuer

## Deploying

### Syncing via ArgoCD

The `peeling` ArgoCD Application is configured on the `aws-eks-janelia` cluster. Changes pushed to this repo's `k8s/base/` directory will be picked up by ArgoCD automatically (or can be manually synced).

```bash
# Check sync status
kubectl get application peeling -n argocd

# Force a manual sync
argocd app sync peeling
```

### Manual apply (without ArgoCD)

If needed, manifests can also be applied directly:

```bash
kubectl apply -k k8s/base/
```

### Update the application image

Edit the image tags in `k8s/base/deploy.yaml` and push. ArgoCD will detect the change and sync.

### Verify the deployment

```bash
kubectl get pods -n peeling-app
kubectl get svc -n peeling-app
kubectl get ingressroute -n peeling-app
```

## Building Container Images

The API image is built from the root `Dockerfile`:

```bash
podman build -t 777794738451.dkr.ecr.us-east-1.amazonaws.com/peeling/web_api:<tag> .
podman push 777794738451.dkr.ecr.us-east-1.amazonaws.com/peeling/web_api:<tag>
```

The client image build is not defined in this repo (likely built separately from the `client/` directory).
