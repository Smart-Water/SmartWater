app.controller('report3Ctrl', function($rootScope, $location)
{
   $rootScope.activetab = $location.path();
     $rootScope.pageTitle = 'Report 3';
     $rootScope.message = 'This graphic presents the total consumption of water per person.';
});
