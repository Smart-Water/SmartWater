app.controller('DetailsUserCtrl', function($scope,$http,$rootScope,$location,$cookies) {

  $rootScope.activetab = $location.path();
  $rootScope.pageTitle = 'User Details';

  userCPF = $cookies.get('userCPF');

  findUserDetails($scope,$http,userCPF);

});

function findUserDetails($scope,$http,userCPF) {

  $http.get('../api/user/'+userCPF).success(function(data) {
    $scope.user = data;
  });
};
