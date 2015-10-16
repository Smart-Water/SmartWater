app.controller('DashboardCtrl', function($scope, $http, $rootScope, $location,$cookies)
{
  $rootScope.activetab = $location.path();
  $rootScope.pageTitle = 'Welcome';
  userCPF = $cookies.get('userCPF');

  //set charts
  setCharts($scope,$http, userCPF);

  //set counters
  setGeneralTotal($http,userCPF);
  setMonthTotal($http,userCPF);


});

function setGeneralTotal($http, userCPF){
  GeneralCounter = new FlipClock($('.generalTotal'), 0000000000, {
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
  monthCounter = new FlipClock($('.monthTotal'), 0000000000, {
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


function setCharts($scope,$http, userCPF){
  $http.get('../api/report/lastYear/'+userCPF).success(function(months) {
    $scope.monthCharts = {
        options: {
          chart: {
              type: 'column'
          }
        },
        title: {
          text: 'Consumption per month'
        },
        subtitle: {
          text: 'Last 12 months'
        },
        xAxis: {
          categories: months.categories,
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Flow (Liters)'
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [{
          name: 'Water',
          data: months.series
        }]
      }

  });

};
