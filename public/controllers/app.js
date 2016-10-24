angular.module('app', ['ngAnimate'])
  .controller('voteController', function($scope, $controller, $http, $window, $interval, $timeout) {

    function init() {
      $scope.listOfGrids = [false, false, false, false, false, false, false, false]
      $scope.optionDistanceFromMouse = 160;
      $scope.optionSize = 200;
      $scope.questions = [
        {question: "Which option will you choose?", options: ["A", "B"], answer: ""},
        {question: "Sample question 2", options: ["A", "B"], answer: ""},
        {question: "Sample question 3", options: ["A", "B", "C"], answer: ""},
      ];
      $scope.images = [];

      $scope.images.push({url:"/assets/images/spiderman.png", answer: "A", visible: false});
      $scope.images.push({url:"/assets/images/recall.png", answer: "B", visible: false});
      $scope.images.push({url:"/assets/images/ironman.png", answer: "C", visible: false});
      $scope.images.push({url:"/assets/images/recall.png", answer: "D", visible: false});

      $scope.currQuestion = -1;

      $scope.title = "Click anywhere to start."
      
    }

    $scope.beginVote = function() {
      if ($scope.currQuestion == -1) {
        $scope.currQuestion++
        $scope.numOptions = $scope.questions[$scope.currQuestion].options.length
        var i;
        for (i = 0; i < $scope.numOptions; i++) {
          $scope.images[i].visible = true
          console.log("width " + $(window).width() + "height " + $(window).height());
          $scope.placeImage(i, $(window).width() / 2, $(window).height() / 2, 4)
        }
      }
    }


    $scope.nextQuestion = function(e) {
      $scope.currQuestion = ($scope.currQuestion + 1) % ($scope.questions.length)
      $scope.title = $scope.questions[$scope.currQuestion].question
      $scope.numOptions = $scope.questions[$scope.currQuestion].options.length
      var i;
      for (i = 0; i < $scope.numOptions; i++) {
        $scope.images[i].visible = true
        $scope.placeImage(i, e.pageX, e.pageY, 4)
      }
      
    }

    $scope.optionChosen = function(e, id) {
      for (i = 0; i < $scope.images.length; i++) {
        $scope.images[i].visible = false
      }
      console.log("all should be cleared")
      $scope.listOfGrids.length = 0
      $scope.listOfGrids = [false, false, false, false, false, false, false, false]
      $timeout(function () {$scope.nextQuestion(e)}, 1500)
    }

    // | 1 | 2 | 3 |
    // | 4 |   | 5 |
    // | 6 | 7 | 8 |
    $scope.placeImage = function (id, mouseX, mouseY, gridId, counter) {
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
        console.log("taken place left " + topLeftX + " top " + topLeftY);
          if (gridId + 1 > 8) {
              $scope.placeImage(id, mouseX, mouseY, 1)
            } else {
              $scope.placeImage(id, mouseX, mouseY, gridId + 1)
            }
        
      } else {
        console.log("place left " + topLeftX + " top " + topLeftY);
        $scope.listOfGrids[gridId] = true
        $("#" + id).css("left", topLeftX)
        $("#" + id).css("top", topLeftY)
      }
    }

    init();
  });