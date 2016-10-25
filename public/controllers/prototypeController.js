angular.module('app')
  .controller('prototypeController', function($scope, $controller, $http, $window, $interval, $timeout) {

    function init() {
      $scope.listOfGrids = [false, false, false, false, false, false, false, false]
      $scope.optionDistanceFromMouse = 120;
      $scope.optionSize = 200;
      $scope.images = [];
      $scope.preloadedImages = [];
      $scope.firstTime = true;
    }

    $scope.begin = function(e) {
      if ($scope.firstTime) {
        $scope.firstTime = false;
        $timeout(function () {
          $scope.nextQuestion(e);
        }, 200)
        
      }
    }


    $scope.nextQuestion = function(e) {
      for(var i = 0; i < $scope.images.length; ++i) {
          (function(i) {
              setTimeout(function() {
                $scope.placeImage(i, e.pageX, e.pageY, 4)
              }, 500);
          })(i);
      }
    }

    $scope.optionChosen = function(e, id) {
      for (i = 0; i < $scope.images.length; i++) {
        $scope.images[i].visible = false
      }
      console.log("all should be cleared")
      $scope.listOfGrids.length = 0
      $scope.listOfGrids = [false, false, false, false, false, false, false, false]
      $timeout(function () {$scope.nextQuestion(e)}, 200)
    }

    // | 1 | 2 | 3 |
    // | 4 |   | 5 |
    // | 6 | 7 | 8 |
    $scope.placeImage = function (id, mouseX, mouseY, gridId) {
      
        console.log("grid ID " + gridId)
        var topLeftX = mouseX - $scope.optionDistanceFromMouse / 2;
        var topLeftY = mouseY - $scope.optionDistanceFromMouse / 2;
        if (gridId == 1 || gridId == 4 || gridId == 6) {
          topLeftX = mouseX - $scope.optionDistanceFromMouse - $scope.optionSize;
        }
        if (gridId == 3 || gridId == 5 || gridId == 8) {
          topLeftX = mouseX + $scope.optionDistanceFromMouse;
        }
        if (gridId == 1 || gridId == 2 || gridId == 3) {
          topLeftY = mouseY - $scope.optionDistanceFromMouse - $scope.optionSize;
        }
        if (gridId == 6 || gridId == 7 || gridId == 8) {
          topLeftY = mouseY + $scope.optionDistanceFromMouse;
        }

        if (topLeftX < 0 || topLeftX + $scope.optionSize > $(window).width() ||
         topLeftY < 0 || topLeftY + $scope.optionSize > $(window).height() || 
         $scope.listOfGrids[gridId] == true) {
          gridId++
          if (gridId > 8) {
            gridId = 1
          }
          $timeout(function () {$scope.placeImage(id, mouseX, mouseY, gridId)}, 200)
        } else {
          $scope.listOfGrids[gridId] = true
          $("#" + id).css("left", topLeftX)
          $("#" + id).css("top", topLeftY)
          $scope.images[id].visible = true
        }
      
    }

    init();
  });