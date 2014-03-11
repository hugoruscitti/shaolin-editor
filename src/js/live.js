function notify() {
     var d = document.createElement('div');
     d.innerHTML = "Cargando ...";
     document.body.appendChild(d);
     d.style.position='absolute';
     d.style.top = 0;
     d.style.right= 0;
     d.style.backgroundColor = 'red';
     d.style.color = 'white';
     d.style.padding = '5px';
     d.style.border = "1px solid #B00";
     d.style.opacity = 0.5;
}


var Gaze = require('gaze').Gaze;
var gaze = new Gaze('**/*');
var path = './';

var must_reload = false;

gaze.on('all', function(event, filepath) {
 notify();
 if (! must_reload) {
   setTimeout(function(){
     if (location) {
       location.reload(false);
       must_reload = false;
     }
   }, 1000);
 }
 
 must_reload = true;     
});


