app.controller('userLastMonthsReportCtrl', function($scope, $http, $rootScope, $location, $routeParams)
{
  $rootScope.activetab = $location.path();

  userCPF = $routeParams.cpf;
  $rootScope.pageTitle = 'Consumption per month';
  $http.get('../api/user/'+userCPF).success(function(data) {
    $rootScope.message = 'This graphic presents the consumption of water for last 12 months by '+data.name;
  });

  //set Charts
  setUserMonthCharts($scope,$http,userCPF);

});

function setUserMonthCharts($scope, $http, userCPF){
  $http.get('../api/report/lastYear/'+userCPF).success(function(days) {
    $scope.userMonthCharts = {
      options: {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Consumption per month'
        },
        subtitle: {
          text: 'Last 12 months'
        }
      },
      xAxis: {
        categories: days.categories,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Flow (Liters)'
        },
        plotLines: [{
          label: {
            text: 'Average (' + days.average.toFixed(3) + ' liters)',
            align: 'left'
          },
          dashStyle: 'dash',
          color: 'green',
          value: days.average,
          width: '2',
          zIndex: 2
        }]
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
        valueSuffix: 'liters'
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: 'Water (Liters)',
        data: days.series
      }]
    }
  });
};
