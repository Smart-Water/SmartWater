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
  if(typeof generalTimeout !=='undefined'){
    window.clearInterval(generalInterval);
    window.clearTimeout(generalTimeout);
  }
  generalCounter = new FlipClock($('.generalTotal'), 1000000000, {
    clockFace: 'Counter'
  });
  $http.get('../api/report/generalAllUsers/').success(function(data) {
    generalCounter.setValue(data.total);
  });

  generalTimeout = setTimeout(function() {
    generalInterval = setInterval(function() {
      $http.get('../api/report/generalAllUsers/').success(function(data) {
        generalCounter.setValue(data.total);
      });
    }, 10000);
  });
}

function setGeneralTotalYear($http){
  if(typeof totalYearTimeout !=='undefined'){
    window.clearInterval(totalYearInterval);
    window.clearTimeout(totalYearTimeout);
  }
  generalTotalYearCounter = new FlipClock($('.generalTotalYear'), 1000000000, {
    clockFace: 'Counter'
  });
  $http.get('../api/report/totalAllUsers/').success(function(data) {
    generalTotalYearCounter.setValue(data.total);
  });

  totalYearTimeout = setTimeout(function() {
    totalYearInterval = setInterval(function() {
      $http.get('../api/report/totalAllUsers/').success(function(data) {
        generalTotalYearCounter.setValue(data.total);
      });
    }, 10000);
  });
}

function setMonthTotal($http){
  if(typeof MonthTotalTimeout !=='undefined'){
    window.clearInterval(MonthTotalInterval);
    window.clearTimeout(MonthTotalTimeout);
  }
  monthCounter = new FlipClock($('.monthTotal'), 1000000000, {
    clockFace: 'Counter'
  });
  $http.get('../api/report/monthTotalAllUsers/').success(function(data) {
    monthCounter.setValue(data.total);
  });

  MonthTotalTimeout = setTimeout(function() {
    MonthTotalInterval = setInterval(function() {
      $http.get('../api/report/monthTotalAllUsers/').success(function(data) {
        monthCounter.setValue(data.total);
      });
    }, 10000);
  });
}
