app.controller('monthlyReportCtrl', function($rootScope, $location, $http)
{
  $rootScope.activetab = $location.path();
  $rootScope.pageTitle = 'Monthly Report';
  $rootScope.message = 'This graphic presents the total consumption of water by all customers on last year.';

  setChartsMonthlyAllUser($rootScope, $http);
});


function setChartsMonthlyAllUser($rootScope, $http){
  $http.get('../api/report/lastYearAllUser/').success(function(days) {
    $rootScope.monthChartsAllUsers = {
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
