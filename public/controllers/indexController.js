angular.module('app')
  .controller('indexController', function($scope, $controller, $http, $window, $interval, $timeout) {

    function init() {
      $scope.listOfGrids = [false, false, false, false, false, false, false, false]
      $scope.optionDistanceFromMouse = 120;
      $scope.optionSize = 200;
      $scope.questions = [
        {question: "Sample test question 1? (2 options)", options: ["A", "B"], answer: ""},
        {question: "Sample test question 2? (2 options)", options: ["A", "B"], answer: ""},
        {question: "Sample test question 3? (3 options)", options: ["A", "B", "C"], answer: ""},
      ];
      $scope.images = [];

      $scope.images.push({url:"/uploads/spiderman.png", answer: "A", visible: false});
      $scope.images.push({url:"/uploads/recall.png", answer: "B", visible: false});
      $scope.images.push({url:"/uploads/ironman.png", answer: "C", visible: false});
      $scope.images.push({url:"/uploads/recall.png", answer: "D", visible: false});

      $scope.currQuestion = -1;

      $scope.title = "Click anywhere to start."
      
    }

    $scope.setupOptions = function() {
      var option1 = "spiderman"
      var option2 = "ironman"
      $http.get('/api/' + option1 + '/' + option2)
          .success(function(data) {
            //var parsed = JSON.parse(data);
            console.log(data);
            $scope.images.push({url: data[0], answer: "A", visible: false});
            $scope.images.push({url: data[1], answer: "B", visible: false});
            
          })
        .error(function(data) {
          console.log("Error:" + data);
        });
    }

    $scope.beginVote = function() {
      if ($scope.currQuestion == -1) {
        $scope.currQuestion++
        $scope.numOptions = $scope.questions[$scope.currQuestion].options.length
        var i;
        for (i = 0; i < $scope.numOptions; i++) {
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
        $scope.placeImage(i, e.pageX, e.pageY, 4)
      }
      
    }

    $scope.optionChosen = function(e, id) {
      $scope.questions[$scope.currQuestion].answer = id
      for (i = 0; i < $scope.images.length; i++) {
        $scope.images[i].visible = false
      }
      console.log("all should be cleared")
      $scope.listOfGrids.length = 0
      $scope.listOfGrids = [false, false, false, false, false, false, false, false]
      $timeout(function () {$scope.nextQuestion(e)}, 1250)
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