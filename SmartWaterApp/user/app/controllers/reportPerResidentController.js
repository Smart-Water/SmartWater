app.controller('reportPerResidentCtrl',  function($scope, $http, $rootScope, $location, $cookies)
{
  $rootScope.activetab = $location.path();
  $rootScope.pageTitle = 'Total Per Resident';
  $rootScope.message = 'This report presents the total consumption of water per resident.';

  var userCPF = $cookies.get('userCPF');

  setTotalPerResident($rootScope, $http, userCPF);

});

function setTotalPerResident($rootScope, $http, userCPF){
  if(typeof totalPerResidentTimeout !=='undefined'){
    window.clearInterval(totalPerResidentInterval);
    window.clearTimeout(totalPerResidentTimeout);
  }
  GeneralCounter = new FlipClock($('.totalPerResident'), 1000000000, {
    clockFace: 'Counter'
  });
  $http.get('../api/report/perResidentByUser/'+userCPF).success(function(data) {
    GeneralCounter.setValue(data.totalPerResident);
    $rootScope.lastUpdatePerResident = data.lastUpdate;
    $rootScope.totalResidents = data.residents;
  });

  totalPerResidentTimeout = setTimeout(function() {
    totalPerResidentInterval = setInterval(function() {
      $http.get('../api/report/perResidentByUser/'+userCPF).success(function(data) {
        GeneralCounter.setValue(data.totalPerResident);
        $rootScope.lastUpdate = data.lastUpdate;
      });
    }, 10000);
  });
}
