app.controller('DashboardCtrl', function($http, $rootScope, $location,$cookies)
{
  $rootScope.activetab = $location.path();
  $rootScope.pageTitle = 'Welcome';
  userCPF = $cookies.get('userCPF');

  //set counters
  setGeneralTotal($http);
  setGeneralTotalYear($http);
  setMonthTotal($http);
});

function setGeneralTotal($http){
  generalCounter = new FlipClock($('.generalTotal'), 1000000000, {
    clockFace: 'Counter'
  });
  $http.get('../api/report/generalAllUsers/').success(function(data) {
    generalCounter.setValue(data.total);
  });

  setTimeout(function() {
    setInterval(function() {
      $http.get('../api/report/generalAllUsers/').success(function(data) {
        generalCounter.setValue(data.total);
      });
    }, 10000);
  });
}

function setGeneralTotalYear($http){
  generalTotalYearCounter = new FlipClock($('.generalTotalYear'), 1000000000, {
    clockFace: 'Counter'
  });
  $http.get('../api/report/totalAllUsers/').success(function(data) {
    generalTotalYearCounter.setValue(data.total);
  });

  setTimeout(function() {
    setInterval(function() {
      $http.get('../api/report/totalAllUsers/').success(function(data) {
        generalTotalYearCounter.setValue(data.total);
      });
    }, 10000);
  });
}

function setMonthTotal($http){
  monthCounter = new FlipClock($('.monthTotal'), 1000000000, {
    clockFace: 'Counter'
  });
  $http.get('../api/report/monthTotalAllUsers/').success(function(data) {
    monthCounter.setValue(data.total);
  });

  setTimeout(function() {
    setInterval(function() {
      $http.get('../api/report/monthTotalAllUsers/').success(function(data) {
        monthCounter.setValue(data.total);
      });
    }, 10000);
  });
}
