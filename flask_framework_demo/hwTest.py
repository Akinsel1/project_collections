from flask import Flask,render_template
#import RPi.GPIO as GPIO
#import Adafruit_DHT
from time import sleep

'''#Setup Sensor
DHT_SENSOR = Adafruit_DHT.DHT22
DHT_PIN = 4'''

#Setup data
MOD_TEMP = 23.0

#get Temp and humidity
def getData():
    #humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)
    humidity, temperature = 17.5, 22.4
    print(temperature)

    if humidity is not None and temperature is not None:
        return temperature, humidity
    else:
        return None

def response(temp):
    if temp>MOD_TEMP:
        return "It is warm :)"
    else:
        return "It is too cold :("

'''def adjust(temp):
    freq= MOD_TEMP - temp
    freq= freq/MOD_TEMP
    freq= int(freq*100)
    pwm.ChangeDutyCycle(freq)'''
    
#GPIO
PIN = 18
'''
GPIO.setmode(GPIO.BCM)
GPIO.setup(PIN, GPIO.OUT)
#pwm
pwm = GPIO.PWM(PIN, 1000)
pwm.start(0)
'''
PINS ={
    18 : {'name': 'heater','state': ''}
}
    

#Flask
app = Flask(__name__)

'''@app.route('/<int:pin>/<action>')
def control(pin,action):
    name = PIN['name'];

    if action == "on":
        if GPIO.input(pin) ==True:
            response = name + " is already on"
        else:
            adjust(temp)
            GPIO.output(pin,GPIO.HIGH)
            response = name + " was turned on"
    if action == "off":
        if GPIO.input(pin) ==False:
            response = name + " is already off"
        else:
            GPIO.output(pin,GPIO.LOW)
            response = name + " was turned off" 

    data = {
        'message' : response
        }
    return render_template('hwStatus.html', **data)
'''
@app.route('/')
def main():
    #meta data
    '''for pin in PINS:
        #PINS[pin].state = GPIO.input(pin)
        #PINS[pin].state = False
    dataPins = {
        'pins' : PINS
    }'''
    message = ""
    data = ""
    
    #get data test for temp
    temp, humid = getData()
    
    if temp is not None:
        message = response(temp)
        data = "Temp={0:0.1f}*C  Humidity={1:0.1f}%".format(temp, humid)
    else:
        message = "No Data"
        
    return render_template('indexHW.html', message=message, info=data)
