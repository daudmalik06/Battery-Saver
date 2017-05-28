$(document).ready(function () {
    $('a').mousedown(function(e) {
        e.preventDefault();
    });
    $('.mail').click(function () {
        copyClipboard('.mail');
        showSaveNotification('Copied');
    });

});



function copyClipboard(elementSelector){
    // creating new textarea element and giveing it id 't'
    let t = document.createElement('textarea')
    t.id = 't'
    // Optional step to make less noise in the page, if any!
    t.style.height = 0
    // You have to append it to your page somewhere, I chose <body>
    document.body.appendChild(t)
    // Copy whatever is in your div to our new textarea
    t.value = $(elementSelector).text();
    // Now copy whatever inside the textarea to clipboard
    let selector = document.querySelector('#t')
    selector.select()
    document.execCommand('copy')
    // Remove the textarea
    document.body.removeChild(t)
}