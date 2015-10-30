app.controller('userGeneralReportCtrl', function($scope, $http, $rootScope, $location, $routeParams)
{
	
   $rootScope.activetab = $location.path();
   $http.get('../api/user/'+$routeParams.cpf).success(function(data) {
		 user = angular.copy(data);
		 console.log(user);
   });
     
   $rootScope.pageTitle = 'General Report';
   $rootScope.message = 'This graphic presents the general total consumption of water by ';
   
	//set counters
	setGeneralTotal($rootScope, $http, $routeParams.cpf);
	setMonthTotal($http,$routeParams.cpf);
	
	if(typeof timeoutGeneralTotal === 'undefined'){
		setGeneralTotal($rootScope, $http, $routeParams.cpf);
		setMonthTotal($http,$routeParams.cpf);	
	}else{
		clearTimeout(timeoutGeneralTotal);
		clearTimeout(timeoutMonthTotal);
		setGeneralTotal($rootScope, $http, $routeParams.cpf);
		setMonthTotal($http,$routeParams.cpf);	
	}
	
	
});


function setGeneralTotal($rootScope, $http, userCPF){
  GeneralCounter = new FlipClock($('.userGeneralTotal'), 1000000000, {
    clockFace: 'Counter'
  });
  $http.get('../api/report/totalByUser/'+userCPF).success(function(data) {
    GeneralCounter.setValue(data.total);
    $rootScope.lastUpdate = data.last_update;
  });

  var timeoutGeneralTotal = setTimeout(function() {
    setInterval(function() {
      $http.get('../api/report/totalByUser/'+userCPF).success(function(data) {
        GeneralCounter.setValue(data.total);
        $rootScope.lastUpdate = data.last_update;
      });
    }, 10000);
  });
}

function setMonthTotal($http, userCPF){
  monthCounter = new FlipClock($('.userMonthTotal'), 1000000000, {
    clockFace: 'Counter'
  });
  $http.get('../api/report/monthTotalByUser/'+userCPF).success(function(data) {
    monthCounter.setValue(data.total);
  });

  var timeoutMonthTotal = setTimeout(function() {
    setInterval(function() {
      $http.get('../api/report/monthTotalByUser/'+userCPF).success(function(data) {
        monthCounter.setValue(data.total);
      });
    }, 10000);
  });
};