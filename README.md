# nginx-sandwich

A sketch of a proxy that uses nginx as incoming and outgoing bridge while running out-of-process code inside a Kubernetes environment. The basic flow through the Kubernetes services looks like this:

client -> inbound (nginx) -> nginx-gateway (node) -> outbound (nginx) -> target (node)

## To use

Simply deploy `kubernetes/gateway-dockerhub.yaml` to a Kubernetes environment then use curl or similar to send a message in using the "Host" header to determine the target. Current setup simply hard-codes 2 targets: 'target1' and 'target2'. Target1 terminates in the outbound nginx and simply returns 200 w/ no body. Target2 terminates in the target service and returns 'target2' in the body. Example:

```
$ kubectl create -f gateway-dockerhub.yaml
You have exposed your service on an external port on all nodes in your
cluster.  If you want to expose this service to the external internet, you may
need to set up firewall rules for the service port(s) (tcp:30303) to serve traffic.

See http://releases.k8s.io/release-1.1/docs/user-guide/services-firewalls.md for more details.
service "inbound" created
service "outbound" created
service "nginx-gateway" created
service "target2" created
replicationcontroller "gateway" created

$ curl -i http://192.168.64.4:30303 --header "Host: target2"
HTTP/1.1 200 OK
Server: nginx/1.9.10
Date: Wed, 27 Jan 2016 19:10:25 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 7
Connection: keep-alive
X-Powered-By: Express
ETag: W/"7-4RVrtYiXbBmAUP7wGKZGag"
```
