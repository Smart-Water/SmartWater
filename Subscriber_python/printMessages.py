#!/usr/bin/env python

import paho.mqtt.client as mqtt

# Constant variables
MQTT_HOST = 'test.mosquitto.org'
MQTT_TOPIC = 'UNIVAS_TCC_2015/+/waterFlow'

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, rc):
    #print("Connected with result code "+str(rc))
    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe(MQTT_TOPIC)

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    print("Topic: " + msg.topic)
    print("Message: "+ str(msg.payload.decode("utf-8")))

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
