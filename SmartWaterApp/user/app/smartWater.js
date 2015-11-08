var app = angular.module('smartWater',['ngRoute', 'ngMessages','ui.mask','highcharts-ng','ngCookies']);

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

   .when('/listUser', {
     templateUrl : 'app/views/listUser.html',
     controller  : 'UserListCtrl',
   })

   .when('/listUser/:cpf', {
     templateUrl : 'app/views/listUser.html',
     controller  : 'UserListCtrl',
   })

   .when('/detailsUser', {
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

   .when('/daily', {
     templateUrl : 'app/views/reportDaily.html',
     controller  : 'reportDailyCtrl',
   })

   .when('/perResident', {
     templateUrl : 'app/views/reportPerResident.html',
     controller  : 'reportPerResidentCtrl',
   })

   // caso não seja nenhum desses, redirecione para a rota '/'
   .otherwise ({ redirectTo: '/' });

});
