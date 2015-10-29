  app.controller('addUserCtrl', function($scope, $http, $rootScope, $location)
  {
     $scope.pageTitle = "New User";
     ListAccessLevels($scope,$http);
     AddCtrl($scope, $http, $location);
     $rootScope.activetab = $location.path();

  });

  function ListAccessLevels($scope, $http) {
    $http.get('../api/access_level/').success(function(data) {
      $scope.access_levels = data;
    });
  }

  function AddCtrl($scope, $http, $location) {
    $scope.master = {};
    $scope.activePath = null;
    $scope.submit_form = function(user, board, formUser) {
      tempString = user.zip_code;
      user.zip_code = tempString.replace("-","").replace("/","").replace(".","");
      if(user.access_level==2){
        board.cpf_user = user.cpf;
        $http.post('../api/user/', user).success(function(){
          $http.post('../api/board/', board).success(function(){
            $scope.reset();
            $scope.activePath = $location.path('listUser');
          });
        });
      }else{
        $http.post('../api/user/', user).success(function(){
          $scope.reset();
          $scope.activePath = $location.path('listUser');
        });
      }
    };

    $scope.reset = function() {
      $scope.user = angular.copy($scope.master);
      $scope.board = angular.copy($scope.master);
    };
    $scope.reset();
  };
