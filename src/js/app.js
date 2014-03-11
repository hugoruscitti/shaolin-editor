var app = angular.module("app", []);

app.controller("AppCtrl", function($scope) {
	$scope.panel_invisible = true;
	
	$scope.alternar_panel = function() {
		$scope.panel_invisible = !$scope.panel_invisible;
	}
});


app.directive('itembutton', function(){
  return {
    restrict: 'EA',
    replace: true,
    template: '<button ng-click="eventHandler()">Elemento</button>',
    scope: {
    	eventHandler: '&ngClick'
    },
    link: function(scope, element, attrs) {
      console.log(attrs);
    }
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