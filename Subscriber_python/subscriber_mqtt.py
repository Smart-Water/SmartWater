#!/usr/bin/env python

import paho.mqtt.client as mqtt
import psycopg2
import json

# Constant variables
MQTT_HOST = 'test.mosquitto.org'
MQTT_TOPIC = 'UNIVAS_TCC_2015/+/waterFlow'
DB_HOST = 'localhost'
DB_USER = 'postgres'
DB_PASSWORD = 'database'
DB_NAME = 'TCC'

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, rc):
    #print("Connected with result code "+str(rc))
    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe(MQTT_TOPIC)

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    values = json.loads(str(msg.payload.decode("utf-8")))
    store_in_database(values['mac_address'],values['date'], \
    float(values['flow']))
    print(msg.topic+" "+str(msg.payload.decode("utf-8")))

# The callback for store the message received from the server in database
def store_in_database(mac_address,time_register,flow):
    c.execute("INSERT INTO history (mac_address,time_register,water_flow) \
    VALUES(\'%s\',\'%s\',%f)"%(mac_address,time_register,flow))
    con.commit()

# Connect on database postgres
con = psycopg2.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD,\
dbname=DB_NAME)
c = con.cursor()

# Connect on mosquitto server
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect(MQTT_HOST, 1883, 60)

# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.
client.loop_forever()
