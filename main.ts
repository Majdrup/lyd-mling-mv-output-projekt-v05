function Tidlarm () {
    if (db85 >= 1800000 || (db90 >= 1200000 || (db95 >= 600000 || db100 >= 300000))) {
        // antal millisekunder for 15 min
        basic.showIcon(IconNames.No)
    } else {
        basic.showIcon(IconNames.Yes)
    }
}
input.onButtonPressed(Button.A, function () {
    music.setVolume(music.volume() + 10)
    basic.showIcon(IconNames.No)
})
function dB_monitor () {
    serial.writeValue("db65", db65)
    serial.writeValue("db70", db70)
    serial.writeValue("db75", db75)
    serial.writeValue("db80", db80)
    serial.writeValue("db85", db85)
    serial.writeValue("db90", db90)
    serial.writeValue("db95", db95)
    serial.writeValue("db100", db100)
}
function mV3 () {
    volt = pins.analogReadPin(AnalogPin.P2) * 2.465119152
}
function Live_mV_input () {
    if (volt < 0.2) {
        db = 40
    } else if (volt >= 0.2 && volt < 0.26) {
        db = 45
    } else if (volt >= 0.26 && volt < 0.38) {
        db = 50
    } else if (volt >= 0.38 && volt < 0.92) {
        db = 55
    } else if (volt >= 0.92 && volt < 1.5) {
        db = 60
    } else if (volt >= 1.5 && volt < 2.4) {
        db = 65
        db65 += input.runningTime()
    } else if (volt >= 2.4 && volt < 3.2) {
        db = 70
        db70 += input.runningTime()
    } else if (volt >= 3.2 && volt < 6) {
        db = 75
        db75 += input.runningTime()
        if (db > db1) {
            db1 = db
        }
    } else if (volt >= 6 && volt < 10) {
        db = 80
        db80 += input.runningTime()
        if (db > db1) {
            db1 = db
        }
    } else if (volt >= 10 && volt < 15) {
        db = 85
        db85 += input.runningTime()
        if (db > db1) {
            db1 = db
        }
    } else if (volt >= 15 && volt < 225) {
        db = 90
        db90 = db85 + input.runningTime()
        if (db > db1) {
            db1 = db
        }
    } else if (volt >= 225 && volt < 360) {
        db = 95
        db95 = db90 + input.runningTime()
        if (db > db1) {
            db1 = db
        }
    } else if (volt >= 360 && volt < 640) {
        db = 100
        db100 = db95 + input.runningTime()
        if (db > db1) {
            db1 = db
        }
    } else {
    	
    }
}
input.onButtonPressed(Button.B, function () {
    music.setVolume(music.volume() - 10)
    basic.showIcon(IconNames.Yes)
})
function DB_values () {
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
}
let list90: number[] = []
let list85: number[] = []
let mv = 0
let db1 = 0
let db = 0
let volt = 0
let db80 = 0
let db75 = 0
let db70 = 0
let db65 = 0
let db100 = 0
let db95 = 0
let db90 = 0
let db85 = 0
DB_values()
music.setVolume(127)
basic.forever(function () {
    mV3()
    Live_mV_input()
    Tidlarm()
    serial.writeValue("volt", volt)
    dB_monitor()
    music.ringTone(volt)
})
