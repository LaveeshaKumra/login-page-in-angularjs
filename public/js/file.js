
var app = angular.module('formExample', []);
app.controller("getValue", ['$scope', '$http', function($scope, $http) {
        $scope.url = 'http://localhost:4300';
		$scope.check=function(){
			$http.post('http://localhost:4300/check',{"name":$scope.name}).
			success(function(data,status){
				$scope.output=data;
			});
		}
		
		$scope.login=function(){
			$http.post('http://localhost:4300/login',{"name":$scope.name,"pass":$scope.pass}).
			success(function(data,status){
				$scope.output1=data;
			});
		}
}]);
		
		
		
		