app.controller('userGeneralReportCtrl', function($scope, $http, $rootScope, $location, $routeParams)
{
  $rootScope.activetab = $location.path();

  userCPF = $routeParams.cpf;
  $rootScope.pageTitle = 'General Report';
  $http.get('../api/user/'+userCPF).success(function(data) {
    $rootScope.message = 'This graphic presents the general total consumption of water for '+data.name;
  });

  //set counters
  setUserGeneralTotal($rootScope, $http, userCPF);
  setUserMonthTotal($http, userCPF);

});


function setUserGeneralTotal($rootScope, $http, userCPF){
  if(typeof timeoutGeneralTotal !=='undefined'){
    window.clearInterval(intervalGeneralCounter);
    window.clearTimeout(timeoutGeneralTotal);
  }
  GeneralCounter = new FlipClock($('.userGeneralTotal'), 1000000000, {
    clockFace: 'Counter'
  });
  $http.get('../api/report/totalByUser/'+userCPF).success(function(data) {
    GeneralCounter.setValue(data.total);
    $rootScope.lastUpdate = data.last_update;
  });
  timeoutGeneralTotal = setTimeout(function() {
    intervalGeneralCounter = setInterval(function() {
      $http.get('../api/report/totalByUser/'+userCPF).success(function(data) {
        GeneralCounter.setValue(data.total);
        $rootScope.lastUpdate = data.last_update;
      });
    }, 10000);
  });
}

function setUserMonthTotal($http, userCPF){
  if(typeof timeoutMonthTotal !=='undefined'){
    window.clearInterval(intervalMonthCounter);
    window.clearTimeout(timeoutMonthTotal);
  }
  monthCounter = new FlipClock($('.userMonthTotal'), 1000000000, {
    clockFace: 'Counter'
  });
  $http.get('../api/report/monthTotalByUser/'+userCPF).success(function(data) {
    monthCounter.setValue(data.total);
  });
  timeoutMonthTotal = setTimeout(function() {
    intervalMonthCounter = setInterval(function() {
      $http.get('../api/report/monthTotalByUser/'+userCPF).success(function(data) {
        monthCounter.setValue(data.total);
      });
    }, 10000);
  });
};
