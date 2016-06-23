(function() {
  var app = angular.module("github", []);
  app.controller("mainController", ["$scope", "$http", function($scope, $http) {

    /*
     * Al presionar el submit, le envia el $scope.search y por parametro el username
     * hace un request $http a la url de la api de github + el username que le envio por parametro
     * después se ejecutan 2 funciones por parametros, onUserCompelte y onError
     */
    $scope.search = function(username) {
      console.log('llegue aqui?');
      $http.get("https://api.github.com/users/" + username).then(onUserComplete, onError);
    };

    /*
     * Recibe la url de la api mas el username, define que $scope.user = a la url de la api
     * despues hace un request de los atributos del username dentro de la api 
     * luego llama a 2 funciones por parametro, onRepos y onError
     */
    var onUserComplete = function(res) {
      $scope.user = res.data;
      $http.get(
        $scope.user.repos_url,
        $scope.user.html_url,
        $scope.user.id,
        $scope.user.ssh_url
      ).then(onRepos, onError);
    };

    /*
     * devuelve en $scope.repos, el resultado de la petición
     */
    var onRepos = function(res, err) {
      $scope.repos = res.data;
      $scope.error = '';
    };

    /*
     * muestra el error en caso que no encuentre datos
     */
    var onError = function(err) {
      if (err) {
        $scope.error = 'Hubo un error';
      }else{
        $scope.error = '';
      }
    };

  }]);
}());
