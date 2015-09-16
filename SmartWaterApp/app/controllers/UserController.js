app.controller('UserCtrl', function($rootScope, $location)
{
   $rootScope.activetab = $location.path();
});
