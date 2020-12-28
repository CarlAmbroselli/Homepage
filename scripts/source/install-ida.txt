#!/bin/bash

sudo apt update
sudo apt install -y lsb-core firefox
wget https://out7.hex-rays.com/files/idafree70_linux.run
chmod +x idafree70_linux.run
./idafree70_linux.run
