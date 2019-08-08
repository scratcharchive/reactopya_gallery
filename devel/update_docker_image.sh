#!/bin/bash

set -ex

git pull --recurse-submodules
docker build . -t magland/reactopya_gallery
docker push magland/reactopya_gallery
