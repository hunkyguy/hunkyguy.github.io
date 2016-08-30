var clock = document.getElementById('clock');
var c = clock.getContext('2d');
c.lineCap = 'butt';
c.shadowColor = '#28d1fa';

function degToRad(degree) {
    var factor = Math.PI / 180;
    return degree * factor;
}

function renderTime() {
    if(window.innerWidth < 500) {
        c.canvas.width = window.innerWidth - 10;
        c.canvas.height = c.canvas.width;
    } else if(window.innerHeight < 500) {
        c.canvas.height = window.innerHeight - 10;
        c.canvas.width = c.canvas.height;
    } else {
        c.canvas.height = 500;
        c.canvas.width = 500;
    }

    var size = c.canvas.height;
    var halfSize = size / 2;
    var lineWidth = halfSize * 0.124;
    var shadowBlur = halfSize * 25;
    var timeFontSize = halfSize * 0.06;
    var dateFontSize = halfSize * 0.12;
    var timeFont = 'bold ' + timeFontSize + 'px' + ' helvetica';
    var dateFont = 'bold ' + dateFontSize + 'px' + ' helvetica';

    var now = new Date();
    var today = now.toDateString();
    var time = now.toLocaleTimeString();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var milliseconds = now.getMilliseconds();
    var newSeconds = seconds + milliseconds/1000;
    var newMinutes = minutes + seconds/60 + milliseconds/60000;
    var newHours = hours + minutes/60 + seconds/3600 + milliseconds/3600000;

    var gradient = c.createRadialGradient(halfSize, halfSize, 1, halfSize, halfSize, size * 0.6);
    gradient.addColorStop(0, '#09303a');
    gradient.addColorStop(1, 'black');

    //background
    c.shadowBlur = 0;
    c.fillStyle = gradient;
    c.strokeStyle = 'black';
    c.lineWidth = '1';
    c.beginPath();
    c.arc(halfSize, halfSize, halfSize * 0.996, 0, degToRad(360));
    c.stroke();
    c.fill();

    //hours
    c.shadowBlur = shadowBlur;
    c.strokeStyle = '#28d1fa';
    c.lineWidth = lineWidth;
    c.beginPath();
    c.arc(halfSize, halfSize, 0.8 * halfSize, degToRad(270), degToRad((newHours * 30) - 90));
    c.stroke();

    //minutes
    c.beginPath();
    c.arc(halfSize, halfSize, 0.68 * halfSize, degToRad(270), degToRad((newMinutes * 6) - 90));
    c.stroke();

    //seconds
    c.beginPath();
    c.arc(halfSize, halfSize, 0.56 * halfSize, degToRad(270), degToRad((newSeconds * 6) - 90));
    c.stroke();

    milliseconds
     c.beginPath();
     c.arc(halfSize, halfSize, 0.44 * halfSize, degToRad(270), degToRad((milliseconds * 0.36) - 90));
     c.stroke();

    //date & time
    c.font = timeFont;
    c.fillStyle = '#28d1fa';
    c.fillText(today, halfSize * 0.76, halfSize * 1.16);
    c.font = dateFont;
    c.fillText(time, halfSize * 0.556, halfSize);

}

setInterval(renderTime, 10);
