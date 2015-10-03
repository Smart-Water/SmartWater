app.controller('report1Ctrl', function($scope,$rootScope, $location)
{
   $rootScope.activetab = $location.path();
     $rootScope.pageTitle = 'Report 1';
     $rootScope.message = 'This graphic presents the monthly total consumption of water.';
});
