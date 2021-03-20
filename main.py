def Tidlarm():
    if db85 >= 1800000 or (db90 >= 1200000 or (db95 >= 600000 or db100 >= 300000)):
        # antal millisekunder for 15 min
        basic.show_icon(IconNames.NO)
    else:
        basic.show_icon(IconNames.YES)

def on_button_pressed_a():
    music.set_volume(music.volume() + 10)
    basic.show_icon(IconNames.NO)
input.on_button_pressed(Button.A, on_button_pressed_a)

def dB_monitor():
    serial.write_value("db65", db65)
    serial.write_value("db70", db70)
    serial.write_value("db75", db75)
    serial.write_value("db80", db80)
    serial.write_value("db85", db85)
    serial.write_value("db90", db90)
    serial.write_value("db95", db95)
    serial.write_value("db100", db100)
def mV3():
    global volt
    volt = pins.analog_read_pin(AnalogPin.P2) * 2.465119152
def Live_mV_input():
    global db, db65, db70, db75, db1, db80, db85, db90, db95, db100
    if volt < 0.2:
        db = 40
    elif volt >= 0.2 and volt < 0.26:
        db = 45
    elif volt >= 0.26 and volt < 0.38:
        db = 50
    elif volt >= 0.38 and volt < 0.92:
        db = 55
    elif volt >= 0.92 and volt < 1.5:
        db = 60
    elif volt >= 1.5 and volt < 2.4:
        db = 65
        db65 += input.running_time()
    elif volt >= 2.4 and volt < 3.2:
        db = 70
        db70 += input.running_time()
    elif volt >= 3.2 and volt < 6:
        db = 75
        db75 += input.running_time()
        if db > db1:
            db1 = db
    elif volt >= 6 and volt < 10:
        db = 80
        db80 += input.running_time()
        if db > db1:
            db1 = db
    elif volt >= 10 and volt < 15:
        db = 85
        db85 += input.running_time()
        if db > db1:
            db1 = db
    elif volt >= 15 and volt < 225:
        db = 90
        db90 = db85 + input.running_time()
        if db > db1:
            db1 = db
    elif volt >= 225 and volt < 360:
        db = 95
        db95 = db90 + input.running_time()
        if db > db1:
            db1 = db
    elif volt >= 360 and volt < 640:
        db = 100
        db100 = db95 + input.running_time()
        if db > db1:
            db1 = db
    else:
        pass

def on_button_pressed_b():
    music.set_volume(music.volume() - 10)
    basic.show_icon(IconNames.YES)
input.on_button_pressed(Button.B, on_button_pressed_b)

db70 = 0
db65 = 0
volt = 0
db = 0
db1 = 0
db85 = 0
db90 = 0
db95 = 0
db100 = 0
db80 = 0
db75 = 0
mv = 0
db75 = 0
db80 = 0
db100 = 0
db95 = 0
db90 = 0
db85 = 0
db1 = 0
db = 0
volt = 0
list85 = [db85]
list90 = [db90]
music.set_volume(127)
music.get_melody(Melodies.DADADADUM)

def on_forever():
    mV3()
    Live_mV_input()
    Tidlarm()
    serial.write_value("volt", volt)
    dB_monitor()
    music.play_tone(volt, music.beat(BeatFraction.WHOLE))
basic.forever(on_forever)
