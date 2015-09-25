app.controller('AboutCtrl', function($rootScope, $location)
{
   $rootScope.activetab = $location.path();
   $rootScope.pageTitle = 'About System';
   $rootScope.message = 'The SmartWater provides a solution to measure the consumption of water.';
   $rootScope.developers = 'Developed by Rafael William and Thiago Scodeler.';
});
