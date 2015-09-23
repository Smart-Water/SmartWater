var app = angular.module('smartWater',['ngRoute', 'ngMessages','ui.mask']);

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
      templateUrl : 'app/views/user.html',
      controller     : 'addUserCtrl',
   })

   // caso não seja nenhum desses, redirecione para a rota '/'
   .otherwise ({ redirectTo: '/' });
});
