var app = angular.module('smartWater',['ngRoute', 'ngMessages','ui.mask','ngCookies', 'highcharts-ng']);

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

   .when('/detailsUser/:cpf', {
     templateUrl : 'app/views/detailsUser.html',
     controller  : 'DetailsUserCtrl',
   })

   .when('/editUser/:cpf', {
     templateUrl : 'app/views/user.html',
     controller  : 'EditUserCtrl',
   })

   .when('/about', {
     templateUrl : 'app/views/about.html',
     controller  : 'AboutCtrl',
   })

   .when('/changePassword', {
     templateUrl : 'app/views/changePassword.html',
     controller  : 'changePasswordCtrl',
   })

   .when('/userGeneralReport/:cpf', {
     templateUrl : 'app/views/userGeneralReport.html',
     controller  : 'userGeneralReportCtrl',
   })

   .when('/userLastMonthsReport/:cpf', {
     templateUrl : 'app/views/userLastMonthsReport.html',
     controller  : 'userLastMonthsReportCtrl',
   })

   .when('/userDailyReport/:cpf', {
     templateUrl : 'app/views/userDailyReport.html',
     controller  : 'userDailyReportCtrl',
   })

   .when('/report1', {
     templateUrl : 'app/views/report1.html',
     controller  : 'report1Ctrl',
   })

   .when('/report2', {
     templateUrl : 'app/views/report2.html',
     controller  : 'report2Ctrl',
   })

   .when('/report3', {
     templateUrl : 'app/views/report3.html',
     controller  : 'report3Ctrl',
   })

   // caso não seja nenhum desses, redirecione para a rota '/'
   .otherwise ({ redirectTo: '/' });

});
