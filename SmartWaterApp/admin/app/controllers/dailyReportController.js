app.controller('dailyReportCtrl', function($scope,$rootScope, $location, $http)
{
  $rootScope.activetab = $location.path();
  $rootScope.pageTitle = 'Daily Report';
  $rootScope.message = 'This graphic presents the daily total consumption of water by all customers.';

  //populate the select with all monhts that register
  listMonthsAllUsers($rootScope, $http);

  //set charts with current month
  var time = new Date();
  setDailyChartsAllUsers($rootScope, $http, time.getFullYear(), time.getMonth()+1);

  $scope.updateChartsAllUsers = function() {
    var monthYear = $scope.selectedMonth.split("/");
    setDailyChartsAllUsers($rootScope, $http, monthYear[1], monthYear[0]);
  }

});

function listMonthsAllUsers($rootScope, $http) {
  var monthNames = ["","January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  var months = [];

  $http.get('../api/report/getMonthsAllUsers/').success(function(data) {
    for (var i in data){
      months.push({'value' : data[i].month+"/"+data[i].year, 'description' : monthNames[data[i].month]+" "+data[i].year});
    }
    $rootScope.months = months;
  });
}

function setDailyChartsAllUsers($rootScope, $http, year, month){
  var monthNames = ["","January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

monthTitle = monthNames[month] +" "+year;
$http.get('../api/report/dailyAllUsers/'+year+'/'+month).success(function(months) {

  $rootScope.dailyChartsAllUser = {
    options: {
      title: {
        text: 'Daily consumption'
      },
      subtitle: {
        text: monthTitle
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
      },
      plotLines: [{
        label: {
          text: 'Average (' + months.average.toFixed(3) + ' liters)',
          align: 'left'
        },
        dashStyle: 'dash',
        color: 'green',
        value: months.average,
        width: '2',
        zIndex: 2
      }]
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">Day {point.key}</span><table>',
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
      name: 'Water',
      data: months.series
    }]
  }

});
}
