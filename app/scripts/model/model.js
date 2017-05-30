(function(){
    'use strict';
    angular
        .module('fetchProductsApp')
        .service('modelService', modelService);

    modelService.$inject = ['$http'];

    function modelService($http) {
        var httpModel = {};

        httpModel.getData = function(scopeObject) {
            if (scopeObject.nextLink) {
                $http.get(scopeObject.nextLink)
                .then(function(response) {
                    var link = response.headers('Link');
                    scopeObject.nextLink = link.slice(1, link.indexOf(">"));
                    scopeObject.onDataReceived(response);
                });
            }
        };
        httpModel.saveData = function(scopeObject, itemToSave) {
            var parameter = JSON.stringify(itemToSave);
            $http({
             url: 'http://requestb.in/s30bmgs3',
             method: "POST",
             data: parameter,
             headers: {'Content-Type': 'application/json'}
            }).then(function(parameter) {
                scopeObject.onDataSaved();
            });
        };

        return httpModel;
    }
})();
