(function () {
    'use strict';

    angular
        .module('crudApp')
        .controller('CadastroController', CadastroController)
        .directive('fabricante', function () {
            return {
                controller: CadastroController,
                controllerAs: 'cadastroCtrl',
                templateUrl: '../cadastro/bookModal.html'
            };
        });

    CadastroController.$inject = ['$http', '$scope', 'Restangular', '$stateParams'];


    function CadastroController($http, $scope, Restangular, $stateParams) {

        var self = this;
        self.author = {};
        self.livros = {};
        self.book = {};
        self.success = false;
        self.descricaoTemp = '';
        $scope.categorias = [];
        $scope.tracoes = [];
        $scope.modelos = [];

        $scope.temMensagem = false;
        $scope.mensagem = "";
        self.saveButton = "Salvar";

        self.saveBookButton = "Salvar";

        retrieveAuthorById();
        $scope.isModeloSelected = false;

        this.getLivros = function () {
            return self.livros;
        };

        this.salvarLivro = function () {
            if (self.book.id == null) {
                salvarBook();
            } else {
                editarBook();
            }
        };

        this.removerLivro = function (id) {
            Restangular
                .all('/book/' + id)
                .remove()
                .then(function () {
                    recuperarLivros(self.author.id);
                });
        };

        this.editarLivro = function (livro) {
            self.saveBookButton = "Alterar";
            $('#modalBook').modal('show');
            this.book = angular.copy(livro);
        };

        this.adicionarLivro = function () {
            self.saveBookButton = "Salvar";
            $('#modalBook').modal('show');
            this.book = [];
        };


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

        function retrieveAuthorById() {
            var id = $stateParams.id;
            if (id != null) {
                recuperarAuthor(id);
                recuperarLivros(id);
            }
        }

        function recuperarAuthor(id) {
            Restangular
                .one('/author/' + id)
                .get()
                .then(function (result) {
                    self.author = result;
                    self.saveButton = "Alterar";
                });
        }

        function recuperarLivros(id) {
            Restangular.all('/book/listar').post(id).then(
                function (result) {
                    self.livros = result;
                });
        }

        function salvarBook() {
            if (self.author.id != null) {
                self.book.authorId = self.author.id;
                Restangular
                    .all('/book/salvar')
                    .post(self.book)
                    .then(function (result) {
                        self.livros.push(result);
                        self.book = [];
                    })
            } else {
                self.livros.push(self.book);
                self.book = [];
            }
        }

        function editarBook() {
            self.book.authorId = self.author.id;
            Restangular
                .all('/book/alterar')
                .customPUT(self.book)
                .then(function () {
                    var index = self.livros.findIndex(function (obj) {
                        return obj.id === self.book.id
                    });
                    self.livros.splice(index, 1, self.book);
                    self.book = [];
                })
        }
    }
})();
