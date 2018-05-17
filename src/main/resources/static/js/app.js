angular
    .module('crudApp', [
        'ui.router',
        'ngMask',
        'restangular'
    ])
    .config(config);


function config($stateProvider, $urlRouterProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl("http://localhost:8080/");

    $stateProvider.state('/home', {
        url: '/home',
    });

    $stateProvider.state('cadastro', {
        url: '/author',
        templateUrl: '/cadastro',
        controller: 'CadastroController',
        controllerAs: 'cadastroCtrl'
    });

    $stateProvider.state('consulta', {
        url: '/carros',
        templateUrl: '/consulta',
        controller: 'ConsultaController',
        controllerAs: 'consultaCtrl'
    });

}
