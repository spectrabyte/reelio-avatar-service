#!/bin/sh

$(aws ecr get-login --region eu-west-1) && \
docker build -t 295733432709.dkr.ecr.eu-west-1.amazonaws.com/avatars-alt:latest ./ && \
docker push 295733432709.dkr.ecr.eu-west-1.amazonaws.com/avatars-alt:latest




