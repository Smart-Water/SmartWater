app.controller('reportDailyCtrl', function($scope, $http, $rootScope, $location,$cookies)
{
  $rootScope.activetab = $location.path();
  $rootScope.pageTitle = 'Daily Report';
  $rootScope.message = 'This graphic presents the daily total consumption of water.';

  userCPF = $cookies.get('userCPF');

  //set charts
  setCharts($scope,$http, userCPF);

});

function setCharts($scope,$http, userCPF){
  month = "October 2015"
  $http.get('../api/report/daily/'+userCPF+"/2015/10").success(function(months) {

    $scope.dailyCharts = {
      options: {
        title: {
          text: 'Daily consumption'
        },
        subtitle: {
          text: month
        }
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
}
