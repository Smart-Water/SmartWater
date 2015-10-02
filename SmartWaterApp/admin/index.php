<?php
     include ("../session/session.php");
?>
<!DOCTYPE html>
<html ng-app="smartWater">
   <head>

      <!--<base href="/SmartWater/SmartWaterApp/"></base> !-->
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <link rel="shortcut icon" href="../assets/images/favicon.ico" />

      <title>smartWater</title>

      <!-- AngularJS -->
      <script src="../assets/vendor/angularJS/angular.js" charset="utf-8"></script>
      <script src="../assets/vendor/angularJS/angular-route.js" charset="utf-8"></script>
      <script src="../assets/vendor/angularJS/angular-messages.js" charset="utf-8"></script>
      <script src="../assets/vendor/angularJS/mask.js" charset="utf-8"></script>
      <script src="../assets/vendor/angularJS/angular-cookies.js" charset="utf-8"></script>

      <!-- jQuery -->
      <script src="../assets/vendor/jquery/jquery-2.1.4.js" charset="utf-8"></script>

      <!-- Highcharts -->
      <script src="../assets/js/highcharts-ng.js" charset="utf-8"></script>
      <script src="../assets/js/highcharts.js" charset="utf-8"></script>
      <script src="../assets/js/exporting.js" charset="utf-8"></script>

      <!-- Bootstrap js and css file -->
      <link href="../assets/vendor/bootstrap/css/bootstrap.css" rel="stylesheet">
      <script src="../assets/vendor/bootstrap/js/bootstrap.js" charset="utf-8"></script>

      <!-- Custom styles -->
      <link href="../assets/css/dashboard.css" rel="stylesheet">

      <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
      <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
      <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
      <![endif]-->
   </head>
   <body>
      <!-- Navbar header-->
      <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
         <div class="container-fluid">
            <div class="navbar-header">
               <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                 <span class="sr-only">Toggle navigation</span>
                 <span class="icon-bar"></span>
                 <span class="icon-bar"></span>
                 <span class="icon-bar"></span>
               </button>
                <span class="navbar-brand">
                  <img alt="smartWater" class="navbar-logo" src="../assets/images/logoOnly.png" aria-hidden="true">
                  <span class="first-word">smart</span><span class="second-word">Water</span>
               </span>
            </div>
            <div class="navbar-collapse collapse">
               <ul class="nav navbar-nav navbar-right dashboard">
                  <li class="dropdown">
                     <a id="dashboard-btn" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">
                     <i class="glyphicon glyphicon-dashboard" aria-hidden="true"></i>Dashboard <b class="caret"></b></a>
                     <ul class="dropdown-menu" role="menu" aria-labelledby="dashboard-btn">
                        <li role="presentation">
                           <a role="menuitem" tabindex="-1" a href="#/listUser" ng-class="{active: activetab == '/listUser'}">
                           <i class="glyphicon glyphicon-list-alt" aria-hidden="true"></i>All users</a>
                        </li>
                        <li role="presentation">
                           <a role="menuitem" tabindex="-1" href="#/addUser" ng-class="{active: activetab == '/addUser'}">
                           <i class="glyphicon glyphicon-plus" aria-hidden="true"></i>Add new</a>
                        </li>
                        <li role="presentation" ng-class="{active: activetab == '/report1'}">
                           <a role="menuitem" tabindex="-1" href="#/report1">Report 1</a>
                        </li>
                        <li role="presentation" ng-class="{active: activetab == '/report2'}">
                           <a role="menuitem" tabindex="-1" href="#/report2">Report 2</a>
                        </li>
                        <li role="presentation" ng-class="{active: activetab == '/report3'}">
                           <a role="menuitem" tabindex="-1" href="#/report3">Report 3</a>
                        </li>
                     </ul>
                  </li>
                  <li><a href="#/changePassword" ng-class="{active: activetab == '/changePassword'}">
                     <i class="glyphicon glyphicon-refresh" aria-hidden="true"></i>
                     Change Password
                     </a>
                  </li>
                  <li><a href="#/about" ng-class="{active: activetab == '/about'}">
                     <i class="glyphicon glyphicon-book" aria-hidden="true"></i>
                     About
                     </a>
                  </li>
                  <li><a href="" onclick="logout()">
                     <i class="glyphicon glyphicon-log-out" aria-hidden="true"></i>
                     Logout
                     </a>
                  </li>
               </ul>
            </div>
         </div>
      </div>

      <!-- Sidebar -->
      <div class="container-fluid">
         <div class="row">
            <div class="col-sm-3 col-md-2 sidebar" id="sidebar">
               <ul class="nav nav-sidebar">
                  <li class="item-sidebar active" ng-class="{active: activetab == '/'}">
                     <a href="#/">
                     <i class="glyphicon glyphicon-dashboard" aria-hidden="true"></i>
                     Dashboard
                     </a>
                  </li>
                  <li class="item-sidebar collapsed">
                     <a href="" data-toggle="collapse" data-target="#sub-menu-users" data-parent="#sidebar">
                     <i class="glyphicon glyphicon-user" aria-hidden="true"></i>
                     Users
                     <i class="indicator glyphicon glyphicon-chevron-down  pull-right"></i>
                     </a>
                  </li>
                  <ul class="nav sub-menu collapse" id="sub-menu-users">
                     <li ng-class="{active: activetab == '/listUser'}">
                        <a href="#/listUser">
                        <i class="glyphicon glyphicon-list-alt" aria-hidden="true"></i>
                        All users
                        </a>
                     </li>
                     <li ng-class="{active: activetab == '/addUser'}">
                        <a href="#/addUser">
                        <i class="glyphicon glyphicon-plus" aria-hidden="true"></i>
                        Add new
                        </a>
                     </li>
                  </ul>
                  <li class="item-sidebar collapsed" >
                     <a href=""  data-toggle="collapse" data-target="#sub-menu-reports" data-parent="#sidebar">
                     <i class="glyphicon glyphicon-paste" aria-hidden="true"></i>
                     Reports
                     <i class="indicator glyphicon glyphicon-chevron-down  pull-right"></i>
                     </a>
                  </li>
                  <ul class="nav sub-menu collapse" id="sub-menu-reports">
                     <li ng-class="{active: activetab == '/report1'}">
                        <a href="#/report1">Report 1</a>
                     </li>
                     <li ng-class="{active: activetab == '/report2'}">
                        <a href="#/report2">Report 2</a>
                     </li>
                     <li ng-class="{active: activetab == '/report3'}">
                        <a href="#/report3">Report 3</a>
                     </li>
                  </ul>
               </ul>
            </div>

            <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
               <div ng-view></div>
            </div>

         </div>
      </div>

      <!-- Modal Logout -->
      <div class="modal fade" id="modalLogout" tabindex="-1" role="dialog" aria-labelledby="modalLogoutLabel" aria-hidden="true"
      visible="showModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 class="modal-title" id="modalLogoutLabel">Logout</h4>
            </div>
            <div class="modal-body">
              Are you sure?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" onclick="confirmLogout()">Confirm</button>
              <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Include all compiled plugins (below), or include individual files as needed -->
      <script src="../assets/js/dashboard.js" charset="utf-8"></script>

      <!-- AngularJS scripts -->
      <script src="app/smartWater.js" charset="utf-8"></script>
      <script src="app/controllers/dashboardController.js" charset="utf-8"></script>
      <script src="app/controllers/addUserController.js" charset="utf-8"></script>
      <script src="app/controllers/listUserController.js" charset="utf-8"></script>
      <script src="app/controllers/detailsUserController.js" charset="utf-8"></script>
      <script src="app/controllers/aboutController.js" charset="utf-8"></script>
      <script src="app/controllers/logoutController.js" charset="utf-8"></script>
      <script src="app/controllers/changePasswordController.js" charset="utf-8"></script>
      <script src="app/controllers/report1Controller.js" charset="utf-8"></script>
      <script src="app/controllers/report2Controller.js" charset="utf-8"></script>
      <script src="app/controllers/report3Controller.js" charset="utf-8"></script>

   </body>
</html>
