app.controller('report2Ctrl', function($rootScope, $location)
{
   $rootScope.activetab = $location.path();
     $rootScope.pageTitle = 'Report 2';
     $rootScope.message = 'This graphic presents the total consumption of water per city.';
});
