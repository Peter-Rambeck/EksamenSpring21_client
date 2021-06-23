#!/usr/bin/env bash

XXXX="eksamen"
DROPLET_URL="178.128.207.249"

echo "##############################"
echo "Building the frontend project"
echo "##############################"
npm run build

echo "##############################"
echo "Deploying Frontend project..."
echo "##############################"

scp -r ./build/* root@$DROPLET_URL:/var/www/$XXXX