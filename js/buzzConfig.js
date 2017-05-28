$(document).ready( ()=> {
    $('.selectFilebutton').click(function () {

        dialog.showOpenDialog({ filters: [
            { name: 'audio', extensions: ['mp3'] }
        ]},function(fileNames){
            // fileNames is an array that contains all the selected
            if(fileNames === undefined){
            console.log("No file selected");
            return;
        }
        try {
            // stopTheBuzzer();
            // $("#audioFile").attr('src',''); //change the source
            // fse.removeSync(settings.get('buzz.name'));
            // msg(fileNames[0]);
            // var tmpName=time()+'.mp3';
            // fse.copySync(fileNames[0], tmpName);
            //
            // $("#audioFile").attr('src',tmpName); //change the source
            // showSaveNotification();
            // updateBatteryStatus(batteryObject);
            // settings.set('buzz', {
            //     name:tmpName
            // });
        } catch (err) {
            console.error(err)
        }

        });
    });
});