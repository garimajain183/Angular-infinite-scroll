'use strict';
angular.module('fetchProductsApp')
  .controller('MainCtrl', ['$scope', 'modelService',  function ($scope, modelService) {
  	$scope.nextLink = 'https://api.github.com/repositories?since=862';
  	$scope.getData = function() {
  		modelService.getData($scope);
  	};
  	$scope.onDataReceived = function(response) {
  		if (!$scope.productList) {
  			$scope.productList = response.data;
  		} else {
  			$scope.productList = $scope.productList.concat(response.data);
  		}
  	};
  	// Parameter to keep edit state
  	$scope.rowEditMode = [];
  	$scope.activeEditMode = function(index) {
  		$scope.rowEditMode[index] = true;
  	};
  	$scope.saveAndDeactivateEditMode = function(item, index) {
  		$scope.rowEditMode[index] = false;
  		modelService.saveData($scope, item);
  	};
  	$scope.onDataSaved = function() {
  		console.log("Data Saved.");
  	};
  }]);