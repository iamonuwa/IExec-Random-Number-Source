#!/bin/sh

docker image build -t iamonuwa/random-number-gen:0.0.1

docker image build --file Dockerfile -t iamonuwa/random-number-gen:0.0.1
