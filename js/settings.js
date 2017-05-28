$(document).ready(function () {
    var max=setTheMaxThresholdValueIfNotPreviouslySaved();
    var min=setTheMinThresholdValueIfNotPreviouslySaved();
    setupMinMax(min,max);
    $('.batteryThresholdButton').click(function () {
        setupMinMax($('.batteryMinThreshold').val(),$('.batteryMaxThreshold').val());
        showSaveNotification();
        updateBatteryStatus(batteryObject);
    });

});
function setupMinMax(min,max) {
    settings.set('dangerLevel', {
        max:max,
        min:min
    });
}


function setTheMinThresholdValueIfNotPreviouslySaved() {

    valueOfMinThreshold=settings.get('dangerLevel.min');
    if(typeof valueOfMinThreshold !== 'undefined')
    {
        $('.batteryMinThreshold').val(valueOfMinThreshold);
        return valueOfMinThreshold;
    }else
    {
        $('.batteryMinThreshold').val(10);
        return 10;
    }

}

function setTheMaxThresholdValueIfNotPreviouslySaved() {
    valueOfMaxThreshold=returnValueIfSetPreviously('dangerLevel.max');
    if(typeof valueOfMaxThreshold !== 'undefined')
    {
        $('.batteryMaxThreshold').val(valueOfMaxThreshold);
        return valueOfMaxThreshold;
    }else
    {
        $('.batteryMaxThreshold').val(99);
        return 99;
    }
}