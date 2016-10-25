angular.module('app')
.controller('uploadController', function($scope, $http) {
  function init() {
      
      $scope.images = [];
      $http.get('/allImages')
          .success(function(data) {
            //var parsed = JSON.parse(data);
            console.log(data);
            var i;
            for (i = 0; i < data.length; i++) {
              $scope.images.push({url: data[i].url, filename: data[i].filename, visible: false});
            }
            
          })
        .error(function(data) {
          console.log("Error:" + data);
        });
      $scope.title = "Click anywhere to start."

      
    }

    init();
});
