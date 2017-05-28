navigator.getBattery().then(function(battery) {
    // Update the battery status initially when the promise resolves ...
    setBatteryObject(battery);
    updateBatteryStatus(battery);

    // .. and for any subsequent updates.
    battery.onchargingchange = function () {
        updateBatteryStatus(battery);
    };

    battery.onlevelchange = function () {
        updateBatteryStatus(battery);
    };

    battery.ondischargingtimechange = function () {
        updateBatteryStatus(battery);
    };
});