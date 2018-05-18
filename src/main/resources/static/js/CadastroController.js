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

    CadastroController.$inject = ['$scope', 'Restangular', '$stateParams'];


    function CadastroController($scope, Restangular, $stateParams) {

        var self = this;
        self.author = {};
        self.livros;
        self.livrosTemp;
        self.book = {};
        self.success = false;

        $scope.temMensagem = false;
        $scope.mensagem = "";
        self.saveButton = "Salvar";

        self.saveBookButton = "Salvar";

        retrieveAuthorById();
        $scope.isModeloSelected = false;

        this.getLivros = function () {
            return self.livros;
        };

        this.salvarLivro = function (livro) {
            if (livro.id == null) {
                salvarBook(livro);
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
            self.book = angular.copy(livro);
        };

        this.adicionarLivro = function () {
            self.saveBookButton = "Salvar";
            self.book = {};
            $('#modalBook').modal('show');
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
            self.livrosTemp = angular.copy(self.livros);
            Restangular
                .all('/author/salvar')
                .post(self.author)
                .then(function (result) {
                        self.author = result;
                        self.livros = null;
                        self.livrosTemp.forEach(function (livro) {
                            salvarBook(livro)
                        });
                        self.livrosTemp = [];
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

        function salvarBook(livro) {

            if (self.author.id != null) {
                livro.authorId = self.author.id;
                Restangular
                    .all('/book/salvar')
                    .post(livro)
                    .then(function (result) {
                        if (self.livros == null) {
                            self.livros = [];
                        }
                        replaceBookFromList(result);
                        self.book = {};
                    })
            } else {
                if (self.livros == null) {
                    self.livros = [];
                }
                self.livros.push(self.book);
                self.book = {};
            }
        }

        function replaceBookFromList(result) {
            var index = self.livros.findIndex(function (obj) {
                return obj.id === result.id
            });
            if (index >= 0) {
                self.livros.splice(index, 1, result);
            } else {
                self.livros.push(result);
            }
        }

        function editarBook() {
            self.book.authorId = self.author.id;
            Restangular
                .all('/book/alterar')
                .customPUT(self.book)
                .then(function () {
                    replaceBookFromList(self.book);
                    self.book = {};
                })
        }
    }
})();
