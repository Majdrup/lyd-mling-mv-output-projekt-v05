def on_button_pressed_a():
    serial.write_numbers(mVdB)
input.on_button_pressed(Button.A, on_button_pressed_a)

def MV_list():
    # pt skal have lave denne om til et map, der er ikke behov for at hente dB værdierne fra dB tuple
    if volt < 0.2:
        mVdB[0] += input.running_time()
    elif volt >= 0.2 and volt < 0.26:
        mVdB[1] += input.running_time()
    elif volt >= 0.26 and volt < 0.38:
        mVdB[2] += input.running_time()
    elif volt >= 0.38 and volt < 0.92:
        mVdB[3] += input.running_time()
        mVdB[3] += input.running_time()
    elif volt >= 0.92 and volt < 1.5:
        mVdB[4] += input.running_time()
    elif volt >= 1.5 and volt < 2.4:
        mVdB[5] += input.running_time()
    elif volt >= 2.4 and volt < 3.2:
        mVdB[6] += input.running_time()
    elif volt >= 3.2 and volt < 6:
        mVdB[7] += input.running_time()
    elif volt >= 6 and volt < 10:
        mVdB[8] += input.running_time()
    elif volt >= 10 and volt < 15:
        mVdB[9] += input.running_time()
    elif volt >= 15 and volt < 225:
        mVdB[10] += input.running_time() + mVdB[9]
    elif volt >= 225 and volt < 360:
        mVdB[11] += input.running_time() + mVdB[10]
    elif volt >= 360 and volt < 640:
        mVdB[12] += input.running_time() + mVdB[11]
    else:
        pass
    return mVdB
def mV3():
    global volt
    volt = pins.analog_read_pin(AnalogPin.P0) * 2.465119152
    return volt
def Gultid():
    # Ændres til at referere til mVdB listen
    if mVdB[9] >= 216 * 60000 or mVdB[10] >= 60 * 60000 or mVdB[11] >= 18 * 60000 or mVdB[12] >= 6 * 60000 or mVdB[13] >= 20000:
        music.set_volume(86)
        # antal millisekunder for 15 min, alternativ kan der skrives x= antal min. (x * 60000)
        for index in range(4):
            basic.show_leds("""
                . # # # .
                . # # # .
                # # # # #
                . # # # .
                . . # . .
                """)
            basic.pause(500)
            basic.show_icon(IconNames.NO)
            basic.pause(500)
    else:
        basic.show_icon(IconNames.YES)

def on_button_pressed_b():
    control.reset()
input.on_button_pressed(Button.B, on_button_pressed_b)

def MVmap():
    global lyd
    # pt skal have lave denne om til et map, der er ikke behov for at hente dB værdierne fra dB tuple
    if lyd < 0.2:
        lyd = pins.map(dB, 0, 0.2, 10, 40)
        mVdB[0] = mVdB[0 + input.running_time()]
    elif lyd >= 0.2 and lyd < 0.26:
        lyd = pins.map(dB, 0.2, 0.26, 40, 45)
        mVdB[1] = mVdB[1 + input.running_time()]
    elif lyd >= 0.26 and volt < 0.38:
        lyd = pins.map(dB, 0.26, 0.38, 45, 50)
        mVdB[2] += input.running_time()
    elif lyd >= 0.38 and volt < 0.92:
        lyd = pins.map(dB, 0.38, 0.92, 50, 55)
        mVdB[3] += input.running_time()
    elif lyd >= 0.92 and volt < 1.5:
        lyd = pins.map(dB, 0.92, 1.5, 55, 60)
        mVdB[4] += input.running_time()
    elif lyd >= 1.5 and volt < 2.4:
        lyd = pins.map(dB, 1.5, 2.4, 60, 65)
        mVdB[5] += input.running_time()
    elif lyd >= 2.4 and volt < 3.2:
        lyd = pins.map(dB, 2.4, 3.2, 65, 70)
        mVdB[6] += input.running_time()
    elif lyd >= 3.2 and volt < 6:
        lyd = pins.map(dB, 3.2, 6, 70, 75)
        mVdB[7] += input.running_time()
    elif lyd >= 6 and volt < 10:
        lyd = pins.map(dB, 6, 10, 75, 80)
        mVdB[8] += input.running_time()
    elif lyd >= 10 and volt < 15:
        lyd = pins.map(dB, 10, 15, 80, 85)
        mVdB[9] += input.running_time()
    elif lyd >= 15 and volt < 225:
        lyd = pins.map(dB, 15, 225, 85, 90)
        mVdB[10] += input.running_time() + mVdB[9]
    elif lyd >= 225 and volt < 360:
        lyd = pins.map(dB, 225, 360, 90, 95)
        mVdB[11] += input.running_time() + mVdB[10]
    elif lyd >= 360 and volt < 640:
        lyd = pins.map(dB, 360, 640, 95, 100)
        mVdB[12] += input.running_time() + mVdB[11]
    return mVdB
def Gns_volt():
    global voltage, volt, lyd
    voltage = 0
    for index2 in range(100):
        voltage += pins.analog_read_pin(AnalogPin.P0)
    volt = voltage / 100
    lyd = volt * 2.465119152
    return Math.round(lyd)
def Redtid():
    if mVdB[10] >= 168 * 60000 or mVdB[11] >= 60 * 60000 or mVdB[12] >= 16 * 60000 or mVdB[13] >= 5 * 60000:
        music.set_volume(0)
        for index3 in range(10):
            basic.show_leds("""
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                """)
            basic.pause(500)
            basic.show_icon(IconNames.NO)
            basic.pause(500)
voltage = 0
dB = 0
lyd = 0
volt = 0
mVdB: List[number] = []
mVdB = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

def on_forever():
    Gns_volt()
    MVmap()
    Gultid()
    Redtid()
    serial.write_value("dB_lyd", lyd)
    serial.write_value("dB_value", dB)
basic.forever(on_forever)
