(function() {
  var app = angular.module("github", []);
  app.controller("mainController", ["$scope", "$http", function($scope, $http) {

    $scope.search = function(username) {
      console.log('llegue aqui?');
      $http.get("https://api.github.com/users/" + username).then(onUserComplete, onError);
    };

    var onUserComplete = function(res) {
      $scope.user = res.data;
      $http.get(
        $scope.user.repos_url, 
        $scope.user.html_url,
        $scope.user.id,
        $scope.user.ssh_url
        ).then(onRepos, onError);
    };

    var onRepos = function(res) {
      $scope.repos = res.data;
    };

    var onError = function(err) {
      $scope.error = 'Hubo un error';
    };

  }]);
}());
