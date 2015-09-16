var app = angular.module('smartWater',['ngRoute']);

app.config(function($routeProvider, $locationProvider)
{
   // remove o # da url
   $locationProvider.html5Mode(true);

   $routeProvider

   // para a rota '/', carregaremos o template dashboard.html e o controller 'HomeCtrl'
   .when('/', {
      templateUrl : 'app/views/dashboard.html',
      controller     : 'DashboardCtrl',
   })

   .when('/addUser', {
      templateUrl : 'app/views/addUser.html',
      controller     : 'UserCtrl',
   })

   // caso não seja nenhum desses, redirecione para a rota '/'
   .otherwise ({ redirectTo: '/' });
});
