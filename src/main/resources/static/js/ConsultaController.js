(function () {
    'use strict';

    angular
        .module('crudApp')
        .config(config)
        .controller('ConsultaController', ConsultaController);

    ConsultaController.$inject = ['$scope', 'Restangular'];

    function ConsultaController($scope, Restangular) {

        var self = this;
        self.authors;
        self.author = {
            firstName: null,
            lastName: null
        };
        listar();

        $scope.$watch('[consultaCtrl.author.firstName, consultaCtrl.author.lastName]',
            function (val) {
                listar();
            });


        this.ordenar = function (variavel) {
            self.authors.sort(function (primeiro, segundo) {
                if (variavel == 'firstName') {
                    return primeiro.firstName >= segundo.firstName
                }
                if (variavel == 'lastName') {
                    return primeiro.firstName >= segundo.firstName
                }
            });

        };

        this.getAutores = function () {
            return self.authors;
        };

        this.removerAuthor = function (id) {
            Restangular.all('/author/' + id).remove().then(function () {
                listar();
            });
        };


        function listar() {
            Restangular.all('/author/listar').post(self.author).then(
                function (result) {
                    self.authors = result;
                });
        }


    }

    function config($stateProvider) {
        $stateProvider.state('edicao', {
            url: '/author/:id',
            templateUrl: '/cadastro',
            controller: 'CadastroController',
            controllerAs: 'cadastroCtrl'
        })
    }

})();
