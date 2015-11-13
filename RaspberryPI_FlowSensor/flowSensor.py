#!/usr/bin/env python

from uuid import getnode as get_mac
from datetime import datetime
import paho.mqtt.publish as publish
import RPi.GPIO as GPIO
import time,sys,os

#Constant variables
MQTT_HOST = 'test.mosquitto.org'
FLOW_SENSOR = 23
DELAY = 10
FILE_PATH = '/home/pi/waterFlow/pulses.txt'

#global variables
global count
global flow
global mac_address

# The callback to read the mac address from the interface eth0 of RasberryPI
# board.
def read_mac():
    global mac_address
    mac_in_hex = hex(get_mac())
    mac_address = str(mac_in_hex).replace("0x","")
    mac_address = mac_address.replace("L","")
    mac_address = mac_address.zfill(12)

# The callback to read initial pulses stored on board when start the system
def read_initial_pulses():
    global count
    if os.path.isfile(FILE_PATH):
        pulses_total_file = open(FILE_PATH,"r+")
        count = int(pulses_total_file.read())
        pulses_total_file.close()
    else:
        pulses_total_file = open(FILE_PATH,"w+")
        pulses_total_file.write("0")
        pulses_total_file.close()
        count = 0

# The callback to get the current time and date.
def get_current_time():
    current_time = datetime.strftime(datetime.now(), '%Y-%m-%d %H:%M:%S')
    return current_time

# The callback for when a pulse is received from the flow sensor.
# This calback increse the total of pulses received from flow sensor
def count_pulses(channel):
    global count
    count = count+1
    #print "Pulses: %d" %(count)
    #print "The flow is: %.3f Liters"% ((count * 2.25 / 1000))

# The calback to convert the total of pulses in water flow.
def calc_flow(pulses):
    global flow
    flow = (pulses * 2.25 / 1000)
    #print "The flow is: %.3f Liters for the mac address %s at %s " % (flow, \
    #mac_address,get_current_time())

# Update count value into file pulses.txt
def update_file(count):
    pulses_total_file.write(str(count))
    pulses_total_file.seek(0)

# The callback for publish the mac,time and flow in mosquitto server
def publish_mqtt(flow):
    update_file(count)
    try:
        publish.single(("UNIVAS_TCC_2015/%s/waterFlow" % (mac_address)), \
        ('{"mac_address":"%s","date":"%s","flow":"%.3f"}' % (mac_address, \
        get_current_time(),flow)),qos=1, hostname=MQTT_HOST)
    except:
        pass

#read initial pulses stored on board when start the system
read_initial_pulses()
#read the mac_address from interface eth0 of RasberryPI board
read_mac()

#configure the GPIO Pin 23
GPIO.setmode(GPIO.BCM)
GPIO.setup(FLOW_SENSOR, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.add_event_detect(FLOW_SENSOR, GPIO.FALLING, callback=count_pulses)

pulses_total_file = open(FILE_PATH,"w+")

while True:
    try:
        calc_flow(count)
        publish_mqtt(flow)
        time.sleep(DELAY)

    except KeyboardInterrupt:
        print '\ncaught keyboard interrupt!, bye'
        pulses_total_file.close()
        GPIO.cleanup()
        sys.exit()
