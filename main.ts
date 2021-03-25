input.onButtonPressed(Button.A, function () {
    serial.writeNumbers(mVdB)
})
function MV_list () {
    // pt skal have lave denne om til et map, der er ikke behov for at hente dB værdierne fra dB tuple
    if (volt < 0.2) {
        mVdB[0] += input.runningTime()
    } else if (volt >= 0.2 && volt < 0.26) {
        mVdB[1] += input.runningTime()
    } else if (volt >= 0.26 && volt < 0.38) {
        mVdB[2] += input.runningTime()
    } else if (volt >= 0.38 && volt < 0.92) {
        mVdB[3] += input.runningTime()
mVdB[3] += input.runningTime()
    } else if (volt >= 0.92 && volt < 1.5) {
        mVdB[4] += input.runningTime()
    } else if (volt >= 1.5 && volt < 2.4) {
        mVdB[5] += input.runningTime()
    } else if (volt >= 2.4 && volt < 3.2) {
        mVdB[6] += input.runningTime()
    } else if (volt >= 3.2 && volt < 6) {
        mVdB[7] += input.runningTime()
    } else if (volt >= 6 && volt < 10) {
        mVdB[8] += input.runningTime()
    } else if (volt >= 10 && volt < 15) {
        mVdB[9] += input.runningTime()
    } else if (volt >= 15 && volt < 225) {
        mVdB[10] += input.runningTime() + mVdB[9]
    } else if (volt >= 225 && volt < 360) {
        mVdB[11] += input.runningTime() + mVdB[10]
    } else if (volt >= 360 && volt < 640) {
        mVdB[12] += input.runningTime() + mVdB[11]
    } else {
    	
    }
    return mVdB
}
function mV3 () {
    volt = pins.analogReadPin(AnalogPin.P0) * 2.465119152
    return volt
}
function Gultid () {
    // Ændres til at referere til mVdB listen
    if (mVdB[9] >= 216 * 60000 || mVdB[10] >= 60 * 60000 || mVdB[11] >= 18 * 60000 || mVdB[12] >= 6 * 60000 || mVdB[13] >= 20000) {
        music.setVolume(86)
        // antal millisekunder for 15 min, alternativ kan der skrives x= antal min. (x * 60000)
        for (let index = 0; index < 4; index++) {
            basic.showLeds(`
                . # # # .
                . # # # .
                # # # # #
                . # # # .
                . . # . .
                `)
            basic.pause(500)
            basic.showIcon(IconNames.No)
            basic.pause(500)
        }
    } else {
        basic.showIcon(IconNames.Yes)
    }
}
input.onButtonPressed(Button.B, function () {
    control.reset()
})
function MVmap () {
    // pt skal have lave denne om til et map, der er ikke behov for at hente dB værdierne fra dB tuple
    if (lyd < 0.2) {
        lyd = pins.map(
        dB,
        0,
        0.2,
        10,
        40
        )
        mVdB[0] = mVdB[0 + input.runningTime()]
    } else if (lyd >= 0.2 && lyd < 0.26) {
        lyd = pins.map(
        dB,
        0.2,
        0.26,
        40,
        45
        )
        mVdB[1] = mVdB[1 + input.runningTime()]
    } else if (lyd >= 0.26 && volt < 0.38) {
        lyd = pins.map(
        dB,
        0.26,
        0.38,
        45,
        50
        )
        mVdB[2] += input.runningTime()
    } else if (lyd >= 0.38 && volt < 0.92) {
        lyd = pins.map(
        dB,
        0.38,
        0.92,
        50,
        55
        )
        mVdB[3] += input.runningTime()
    } else if (lyd >= 0.92 && volt < 1.5) {
        lyd = pins.map(
        dB,
        0.92,
        1.5,
        55,
        60
        )
        mVdB[4] += input.runningTime()
    } else if (lyd >= 1.5 && volt < 2.4) {
        lyd = pins.map(
        dB,
        1.5,
        2.4,
        60,
        65
        )
        mVdB[5] += input.runningTime()
    } else if (lyd >= 2.4 && volt < 3.2) {
        lyd = pins.map(
        dB,
        2.4,
        3.2,
        65,
        70
        )
        mVdB[6] += input.runningTime()
    } else if (lyd >= 3.2 && volt < 6) {
        lyd = pins.map(
        dB,
        3.2,
        6,
        70,
        75
        )
        mVdB[7] += input.runningTime()
    } else if (lyd >= 6 && volt < 10) {
        lyd = pins.map(
        dB,
        6,
        10,
        75,
        80
        )
        mVdB[8] += input.runningTime()
    } else if (lyd >= 10 && volt < 15) {
        lyd = pins.map(
        dB,
        10,
        15,
        80,
        85
        )
        mVdB[9] += input.runningTime()
    } else if (lyd >= 15 && volt < 225) {
        lyd = pins.map(
        dB,
        15,
        225,
        85,
        90
        )
        mVdB[10] += input.runningTime() + mVdB[9]
    } else if (lyd >= 225 && volt < 360) {
        lyd = pins.map(
        dB,
        225,
        360,
        90,
        95
        )
        mVdB[11] += input.runningTime() + mVdB[10]
    } else if (lyd >= 360 && volt < 640) {
        lyd = pins.map(
        dB,
        360,
        640,
        95,
        100
        )
        mVdB[12] += input.runningTime() + mVdB[11]
    }
    return mVdB
}
function Gns_volt () {
    voltage = 0
    for (let index = 0; index < 100; index++) {
        voltage += pins.analogReadPin(AnalogPin.P0)
    }
    volt = voltage / 100
    lyd = volt * 2.465119152
    return Math.round(lyd)
}
function Redtid () {
    if (mVdB[10] >= 168 * 60000 || mVdB[11] >= 60 * 60000 || mVdB[12] >= 16 * 60000 || mVdB[13] >= 5 * 60000) {
        music.setVolume(0)
        for (let index = 0; index < 10; index++) {
            basic.showLeds(`
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                `)
            basic.pause(500)
            basic.showIcon(IconNames.No)
            basic.pause(500)
        }
    }
}
let voltage = 0
let dB = 0
let lyd = 0
let volt = 0
let mVdB : number[] = []
mVdB = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
basic.forever(function () {
    Gns_volt()
    MVmap()
    Gultid()
    Redtid()
    serial.writeValue("dB_lyd", lyd)
    serial.writeValue("dB_value", dB)
})
