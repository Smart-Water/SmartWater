app.controller('DashboardCtrl', function($http, $rootScope, $location,$cookies)
{
  $rootScope.activetab = $location.path();
  $rootScope.pageTitle = 'Welcome';
  userCPF = $cookies.get('userCPF');

  //set counters
  setGeneralTotal($http,userCPF);
  setMonthTotal($http,userCPF);
});

function setGeneralTotal($http, userCPF){
  GeneralCounter = new FlipClock($('.generalTotal'), 1, {
    clockFace: 'Counter'
  });
  $http.get('../api/report/totalByUser/'+userCPF).success(function(data) {
    GeneralCounter.setValue(data.total);
  });

  setTimeout(function() {
    setInterval(function() {
      $http.get('../api/report/totalByUser/'+userCPF).success(function(data) {
        GeneralCounter.setValue(data.total);
      });
    }, 10000);
  });
}

function setMonthTotal($http, userCPF){
  monthCounter = new FlipClock($('.monthTotal'), 1, {
    clockFace: 'Counter'
  });
  $http.get('../api/report/monthTotalByUser/'+userCPF).success(function(data) {
    monthCounter.setValue(data.total);
  });

  setTimeout(function() {
    setInterval(function() {
      $http.get('../api/report/monthTotalByUser/'+userCPF).success(function(data) {
        monthCounter.setValue(data.total);
      });
    }, 10000);
  });
}
