<?php

session_start();

?>
<!DOCTYPE html>
<html ng-app="login">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <link rel="shortcut icon" href="assets/images/favicon.ico" />
  <title>smartWater</title>

  <!-- AngularJS -->
  <script src="assets/vendor/angularJS/angular.js" charset="utf-8"></script>
  <script src="assets/vendor/angularJS/angular-route.js" charset="utf-8"></script>
  <script src="assets/vendor/angularJS/angular-messages.js" charset="utf-8"></script>
  <script src="assets/vendor/angularJS/mask.js" charset="utf-8"></script>
  <script src="assets/vendor/angularJS/angular-cookies.js" charset="utf-8"></script>

  <!-- jQuery -->
  <script src="assets/vendor/jquery/jquery-2.1.4.js" charset="utf-8"></script>

  <!-- Bootstrap js and css file -->
  <link href="assets/vendor/bootstrap/css/bootstrap.css" rel="stylesheet">
  <script src="assets/vendor/bootstrap/js/bootstrap.js" charset="utf-8"></script>

  <!-- Custom styles -->
  <link href="assets/css/index.css" rel="stylesheet">

</head>
<body>

  <div class="container" ng-controller="loginCtrl">

          <div ng-show="error" class="alert alert-danger" id="errorMessage">{{errorMessage}}
            <button class="close" data-dismiss="alert">x</button>
          </div>

    <div class="row">
      <div class="col-md-4 col-md-offset-4">
        <div class="login-panel panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Please Sign In</h3>
          </div>
          <div class="panel-body">
              <form method="post" name="formLogin" id="formLogin" ng-submit="loginFunction()" role="form">
              <fieldset>
                <div class="form-group">
                  <label for="cpf">CPF:</label>
                  <input class="form-control" id="userCPF" name="userCPF" type="text" ng-model="user.cpf"
                  ui-mask="999.999.999-99" required="">
                </div>
                <div class="form-group">
                  <label for="password">Password:</label>
                  <input class="form-control" placeholder="Password" id="password" name="userPassword" type="password" ng-model="user.password" required="">
                </div>
                <div class="checkbox">
                  <label>
                    <input name="remember" type="checkbox" value="Remember Me">Remember Me
                  </label>
                </div>
                <input type="submit" class="btn btn-primary btn-block" id="login-btn" value="Sign in">
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>

<footer>
  <a href="https://github.com/Smart-Water/SmartWater" target="_blank">
    <span class="glyphicon glyphicon-cloud-download" aria-hidden="true"> GitHub</span>
  </a>
</footer>

<script src="assets/js/loginController.js" charset="utf-8"></script>

</html>
