## Problem 1

Terminal: - Error from server (InternalError): error when creating "STDIN": Internal error occurred: failed calling webhook "validate.nginx.ingress.kubernetes.io": Post "https://ingress-nginx-controller-admission.ingress-nginx.svc:443/networking/v1/ingresses?timeout=10s": context deadline exceeded

## Solution

Terminal: kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission

## Problem 2

Postman: Can not reach endpoints

## Solution 2.1

1. Stop skaffold

2. Delete ingress-nginx with a kubectl delete namespace ingress-nginx

3. Redeploy ingress-nginx with the appropriate script from https://kubernetes.github.io/ingress-nginx/deploy/

4. Terminal: kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission

5. Restart skaffold

## Solution 2.2

Terminal: type "code /etc/hosts"

127.0.0.1:80 ticketing.dev ----> to not forget a PORT number here
192.168.49.2 ticketing.dev ----> for minikube users enter minikube ip here

## Problem 3

Browser: Your connection is not private

## Solution 3

click on any place of a page and type "thisisunsafe"

## Problem 4

Postman: SSL Error: Unable to verify the first certificate

## Solution 4

Postman -> Settings -> SSL certificate verifications

## Problem 5

Terminal: invalid skaffold config: getting minikube env: running [/usr/local/bin/minikube docker-env --shell none -p minikube --user=skaffold]

- stdout: "false exit code 89\n"
- stderr: ""
- cause: exit status 89

## Solution 5

Terminal: restart minikube with "minikube start"

## Problem 6

Terminal error: kubectl create: running [kubectl --context minikube create --dry-run=client

## Solution 6

inside ingress yaml change:
backend:
serviceName: client-srv
servicePort: 3000

to
backend:
service:
name: client-srv
port:
number: 3000

## Problem 7

Browser: Can not reach website

## Solution 7

replace localhost with ticketing.dev

## Problem 8

getaddrinfo ENOTFOUND ingress-nginx.ingress-nginx-controller.svc.cluster.local

## Solution 8

VS Code: `http://ingress-nginx-controller.ingress-nginx.svc.cluster.local${AuthUrls.currentUser}`

## Port redirect

kub port-forward nats-depl-77c5955577-jd7dz 4222:4222
