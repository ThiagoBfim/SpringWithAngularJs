(function () {
    'use strict';

    angular
        .module('crudApp')
        .config(config)
        .controller('ConsultaController', ConsultaController);

    ConsultaController.$inject = ['$http', '$q', '$scope', 'Restangular'];

    function ConsultaController($http, $q, $scope, Restangular) {

        var carroFilter;
        var self = this;
        self.hasNoElement = true;
        self.authors;
        self.categorias = [];
        self.tracoes = [];
        self.author = {
            firstName: null,
            lastName: null
        };

        Restangular.all('/author/listar').post(self.author).then(
            function (result) {
                self.authors = result;
            });

        this.getAutores = function () {
            return self.authors;
        };

        $scope.$watch('[consultaCtrl.author.firstName, consultaCtrl.author.lastName]',
            function (val) {
                listar();
            });


        function listar() {
            Restangular.all('/author/listar').post(self.author).then(
                function (result) {
                    self.authors = result;
                });
        }

        this.removerAuthor = function (id) {
            Restangular.all('/author/' + id).remove().then(function () {
                listar();
            });
        };

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
