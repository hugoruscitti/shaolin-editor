var app = angular.module("app", []);

var elemento = document.getElementById('canvas_container');
var paper = Raphael(elemento, 800, 500);


function crear_objeto(ruta_imagen) {
    var rect = paper.image(ruta_imagen, 200, 10, 100, 100);

    rect.click(function () {
        var ft = paper.freeTransform(this);
        ft.showHandles();
    });
}


// Add freeTransform

// Hide freeTransform handles
//ft.hideHandles();

// Show hidden freeTransform handles
//ft.showHandles();

// Apply transformations programmatically
//ft.attrs.rotate = 45;

//ft.apply();

// Remove freeTransform completely
//ft.unplug();

// Add freeTransform with options and callback
//ft = paper.freeTransform(rect, { keepRatio: true }, function(ft, events) {
//    console.log(ft.attrs);
//});

// Change options on the fly
//ft.setOpts({ keepRatio: false });

var fs = require('fs');

app.controller("AppCtrl", function($scope) {
    $scope.panel_invisible = false;
    $scope.cargando = true;
    $scope.texturas = [];

    fs.readdir('data/', function(err, listado) {
        listado = listado.filter(function(e) {return e.indexOf('.png') > 0});
        $scope.texturas = listado.map(function(e) {return {ruta: 'data/' + e}});
        $scope.cargando = false;
        $scope.$apply();
    });

    $scope.alternar_panel = function() {
        $scope.panel_invisible = !$scope.panel_invisible;
    }

    $scope.seleccionar_textura = function(indice) {
        var ruta_imagen = $scope.texturas[indice].ruta;
        crear_objeto(ruta_imagen);
    }
});

app.controller("BotonesCtrl", function($scope) {

    $scope.abrir_archivo = function() {
        var openDialog = document.getElementById('openDialog');
        openDialog.click();

        openDialog.onchange = function(evento) {
            var archivo = this.value;
            console.log(evento, archivo);
            this.value = ""; // Hace que se pueda seleccionar el archivo mas de una vez.
        }
    }


    $scope.guardar_archivo = function() {
        var saveDialog = document.getElementById('saveDialog');
        saveDialog.click();

        saveDialog.onchange = function(evento) {
            var archivo = this.value;
            this.value = ""; // Hace que se pueda seleccionar el archivo mas de una vez.
        }
    }

});
