var app = angular.module('smartWater',['ngRoute', 'ngMessages','ui.mask']);

app.config(function($routeProvider, $locationProvider)
{

   // remove o # da url
  // $locationProvider.html5Mode(true);

   $routeProvider

   // para a rota '/', carregaremos o template dashboard.html e o controller 'HomeCtrl'
   .when('/', {
      templateUrl : 'app/views/dashboard.html',
      controller     : 'DashboardCtrl',
   })

   .when('/addUser', {
      templateUrl : 'app/views/user.html',
      controller     : 'addUserCtrl',
   })

   .when('/listUser', {
     templateUrl : 'app/views/listUser.html',
     controller  : 'UserListCtrl',
   })

   .when('/listUser/:cpf', {
     templateUrl : 'app/views/listUser.html',
     controller  : 'UserListCtrl',
   })

   .when('/detailsUser/:cpf', {
     templateUrl : 'app/views/detailsUser.html',
     controller  : 'DetailsUserCtrl',
   })

   .when('/about', {
     templateUrl : 'app/views/about.html',
     controller  : 'AboutCtrl',
   })

   .when('/changePassword', {
     templateUrl : 'app/views/changePassword.html',
     controller  : 'changePasswordCtrl',
   })

   // caso não seja nenhum desses, redirecione para a rota '/'
   .otherwise ({ redirectTo: '/' });

});
