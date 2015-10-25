app.controller('reportDailyCtrl', function($scope, $http, $rootScope, $location,$cookies)
{
  $rootScope.activetab = $location.path();
  $rootScope.pageTitle = 'Daily Report';
  $rootScope.message = 'This graphic presents the daily total consumption of water.';

  userCPF = $cookies.get('userCPF');

  //populate the select with all monhts that register
  listMonths($rootScope, $http, userCPF);

  //set charts with current month
  var time = new Date();
  setCharts($rootScope, $http, userCPF, time.getFullYear(), time.getMonth()+1);

  $scope.updateCharts = function() {
    var monthYear = $scope.selectedMonth.split("/");
    setCharts($rootScope, $http, userCPF, monthYear[1], monthYear[0]);
  }

});

function listMonths($rootScope, $http, userCPF) {
  var monthNames = ["","January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  var months = [];

  $http.get('../api/report/getMonthsByUser/'+userCPF).success(function(data) {
    for (var i in data){
      months.push({'value' : data[i].month+"/"+data[i].year, 'description' : monthNames[data[i].month]+" "+data[i].year});
    }
    //setCharts($rootScope, $http, )
    $rootScope.months = months;
  });
}

function setCharts($rootScope, $http, userCPF, year, month){
  var monthNames = ["","January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];

  monthTitle = monthNames[month] +" "+year;
  $http.get('../api/report/daily/'+userCPF+"/"+year+"/"+month).success(function(months) {

    $rootScope.dailyCharts = {
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
