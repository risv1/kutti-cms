#!/bin/sh
export $(cat .env | xargs)

terraform init 
terraform apply -auto-approve