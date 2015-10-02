app.controller('DashboardCtrl', function($rootScope, $location,$cookies)
{
   $rootScope.activetab = $location.path();
     $rootScope.pageTitle = 'Welcome';
     userCPF = $cookies.get('userCPF');
});
