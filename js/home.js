const settings = require('electron-settings');
const app = require('electron').remote;
const dialog = app.dialog;
const fse = require('fs-extra');
var buzz=new Audio('./buzz.mp3');
var batteryObject;
var percentage;
var valueOfMinThreshold;
var valueOfMaxThreshold;


$(document).ready(function () {
    setTheEnableButton();
    setTimeout(setTheEnableButton,0);;
});
function setBatteryObject(battery) {
    batteryObject=battery;
}
function setTheEnableButton() {
    if(!softwareEnabled())
    {
        $('.buttonValue').text('On');
        $('.buttonValue').removeClass('onText');
        $('.buttonValue').addClass('offText');
        $('#startValue').prop('checked',false);
    }
    $('#startButtonDiv').css('display','');
}



function startStop(element) {
    elementValue=$(element).is(':checked');
    if(elementValue)
    {
        //let's check is
        $('.buttonValue').text('Off');
        $('.buttonValue').removeClass('offText');
        $('.buttonValue').addClass('onText');
    }else{
        //uncheck it
        $('.buttonValue').text('On');
        $('.buttonValue').removeClass('onText');
        $('.buttonValue').addClass('offText');
    }
    settings.set('enabled', {
        value:elementValue
    });
    updateBatteryStatus(batteryObject);
}

function softwareEnabled()
{
    if(settings.get('enabled.value')!=1)
    {
        hideFooter($('.minThresholdFooter'));
        hideFooter($('.maxThresholdFooter'));
        return false;
    }
    return true;
}

function updateBatteryStatus(status) {
    $('.batteryLevel').text(Math.floor(status.level * 100) + '%');
    $('.chargingStatus').text(status.charging?'Yes':'No');
    checkStatusAndBuzzIfPossible(status);
}

function checkStatusAndBuzzIfPossible(status) {
    valueOfMaxThreshold=returnValueIfSetPreviously('dangerLevel.max');
    valueOfMinThreshold=returnValueIfSetPreviously('dangerLevel.min');
    percentage=Math.floor(status.level * 100);
    if(!audioFileAvailable())
    {
        msg('Buzzer tone is missing');
    }
    if(!softwareEnabled())
    {
        stopTheBuzzer();
        return;
    }
    if( crossedMaximumThreshold() ||   crossedMinimumThreshold() )
    {
        playTheBuzzer();
    }else{
       stopTheBuzzer();
    }
}
function showSaveNotification(textMessage)
{
    if(textMessage=== undefined)
    {
        textMessage='Saved';
    }
    new PNotify({
        styling:'bootstrap3',
        width:'60px',
        text: textMessage,
        type: 'success',
        icon:true,
        animation_speed : 'normal',
        delay : 400,
        addclass : 'stack-bottomright'
    });
}
function audioFileAvailable() {
    return (buzz.readyState!=0);
}


function stopTheBuzzer()
{
    buzz.pause();
    buzz.currentTime = 0;
}
function playTheBuzzer() {
    let {remote} = require('electron');
    const mainWindow = remote.getGlobal("openMainWindow")();
    buzz.currentTime = 0;
    buzz.loop=true;
    buzz.play();
}
function showFooter(selector) {
    selector.css('display','');
}
function hideFooter(selector)
{
    selector.css('display','none');
}

function crossedMinimumThreshold(status)
{
    if(!(!batteryObject.charging && percentage <=  valueOfMinThreshold))
    {
        hideFooter($('.minThresholdFooter'));
        return false;
    }
    showFooter($('.minThresholdFooter'));
    return true;
}
function crossedMaximumThreshold()
{

    if(! (batteryObject.charging && percentage >=  valueOfMaxThreshold) )
    {
        hideFooter($('.maxThresholdFooter'));
        return false;
    }
    showFooter($('.maxThresholdFooter'));
    return true;
}
function returnValueIfSetPreviously(name)
{
    if(!settings.has(name))
    {
        msg('could found key:'+name+' in settings');
    }
    return settings.get(name);
}

function msg(m) {
    console.log(m);
}
