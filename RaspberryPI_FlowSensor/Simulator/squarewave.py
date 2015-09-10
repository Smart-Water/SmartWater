#!/usr/bin/python
#squarewave.py
# Square wave generator to test flowsensor
# connect GPIO 23 to GPIO 17
# change frequency settings to simulate water flows streams

import RPi.GPIO as GPIO
import time
import random
square_wave_pin = 17

# change this variable for other flow streams
# 1.0   == 0.135 l/m
# 5.0   == 0.675 l/m
# 10.0  ==  1.35 l/m
# 20.0  ==   2.7 l/m
# 225.0 ==  30.0 l/m
#frequency = 1.0
frequency = float(random.randint(0,225))

seconds = 1 / (2 * frequency)
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(square_wave_pin,GPIO.OUT)

GPIO.output(square_wave_pin, False)
time.sleep(seconds)
try:

   while True:
      GPIO.output(square_wave_pin, False)
      time.sleep(seconds)
      GPIO.output(square_wave_pin, True)
      time.sleep(seconds)

except KeyboardInterrupt:
   GPIO.cleanup()
