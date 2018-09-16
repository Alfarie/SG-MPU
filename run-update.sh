#!/bin/bash
echo "Script executed from: ${PWD}"
BASEDIR=$(dirname $0)
PASS="raspberry"
echo "Script location: ${BASEDIR}"
CMD="sshpass -p $PASS scp -r src/ pi@$1:/home/pi/SG-MPU/"
$CMD
echo "UPLOAD DONE!"