app.controller('EditUserCtrl', function($scope,$http,$rootScope,$location,$routeParams) {

  $rootScope.activetab = $location.path();
  $rootScope.pageTitle = 'Edit User';
  ListAccessLevels($scope,$http);
  $http.get('../api/user/'+$routeParams.cpf).success(function(data) {
    $scope.user = data;
    $http.get('../api/board/user/'+$routeParams.cpf).success(function(data) {
      $scope.board = data;
      old_board = angular.copy($scope.board);
    });
  });

  EditCtrl($scope, $routeParams, $http, $location);
  
});

function ListAccessLevels($scope, $http) {
  $http.get('../api/access_level/').success(function(data) {
    $scope.access_levels = data;
  });
}

function EditCtrl($scope, $routeParams, $http, $location) {
  $scope.master = {};
  $scope.activePath = null;
  $scope.submit_form = function(user, board, formUser) {
    tempString = user.zip_code;
    user.zip_code = tempString.replace("-","").replace("/","").replace(".","");
    if(user.access_level==2){
      $http.put('../api/user/'+$routeParams.cpf, user).success(function(data){
        board.cpf_user = data.cpf;
        $http.put('../api/board/'+old_board.mac_address, board).success(function(data){
          $scope.reset();
          $scope.activePath = $location.path('listUser');
        });
      });
    }else{
      $http.put('../api/user/'+user.cpf, user).success(function(){
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
