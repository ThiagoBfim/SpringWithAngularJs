(function () {
    'use strict';

    angular
        .module('crudApp')
        .controller('CadastroController', CadastroController)
        .directive('fabricante', function () {
            return {
                controller: CadastroController,
                controllerAs: 'cadastroCtrl',
                templateUrl: '../cadastro/fabricanteModal.html'
            };
        })
        .directive('modelo', function () {
            return {
                templateUrl: '../cadastro/modelo.html'
            };
        });

    CadastroController.$inject = ['$http', '$scope', 'Restangular', '$stateParams'];


    function CadastroController($http, $scope, Restangular, $stateParams) {

        var self = this;
        self.author = {};
        self.success = false;
        self.descricaoTemp = '';
        $scope.categorias = [];
        $scope.tracoes = [];
        $scope.modelos = [];

        $scope.temMensagem = false;
        $scope.mensagem = "";
        self.saveButton = "Salvar";

        retrieveAuthorById();
        $scope.isModeloSelected = false;
        var id = $stateParams.id;

        function retrieveAuthorById() {
            var id = $stateParams.id;
            if (id != null) {
                Restangular
                    .one('/author/' + id)
                    .get()
                    .then(function (result) {
                        self.author = result;
                        self.saveButton = "Alterar";
                    });
            }
        }

        this.salvar = function () {
            if (self.author.id == null) {
                cadastrar();
            } else {
                alterar();
            }
        };
        function alterar() {
            Restangular
                .all('/author/alterar')
                .customPUT(self.author)
                .then(function () {
                        self.success = true;
                        $scope.temMensagem = true;
                        $scope.mensagem = "Autor Alterado com Sucesso!";
                    },
                    function (result) {
                        $scope.mensagem = result.data[0];
                        $scope.temMensagem = true;
                        self.success = false;
                    });
        }

        function cadastrar() {
            Restangular
                .all('/author/salvar')
                .post(self.author)
                .then(function () {
                        self.success = true;
                        $scope.temMensagem = true;
                        $scope.mensagem = "Autor Salvo com Sucesso!";
                    },
                    function (result) {
                        $scope.mensagem = result.data[0];
                        $scope.temMensagem = true;
                        self.success = false;
                    });

        }
    }
})();
