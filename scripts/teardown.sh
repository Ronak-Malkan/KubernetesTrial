#!/bin/bash

# Delete all Kubernetes resources
kubectl delete -f ../k8s/

# Optionally, delete the Kind cluster
echo "Would you like to delete the Kind cluster as well? (y/n)"
read answer
if [ "$answer" == "y" ]; then
  kind delete cluster --name todo-cluster
  echo "Kind cluster 'todo-cluster' has been deleted."
else
  echo "Resources have been cleaned up, but the Kind cluster remains active."
fi
