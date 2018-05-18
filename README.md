# SpringWithAngularJs
<h3>Info:</h3> 
<p>
Sistema com Spring que faz requisções Rest e utiliza Angular JS para o front end.

<h3>Como iniciar o projeto:</h3> 
<p>
Essa aplicação foi realizada com Spring Boot e Maven, então apos importar o projeto e baixar as dependencias, é necessário apenas executar o main do arquivo App.java. 
<p>A aplicação sobe na porta 8080, http://localhost:8080/
<p>Tomar cuidado para não subir com https, o correto é HTTP nessa aplicação.

<b>A aplicação foi feita para gerar um jar, então a unica coisa necessária para subir a aplicação é 
executar o comando <i>maven clean install</i> na raiz e depois executar o jar: <i>java -jar livraria-1.0-SNAPSHOT.jar</i></b>

<h3>Observações:</h3> 
<p>
Não foi realizado nenhum armazenamento em banco de dados, essa aplicação apenas realiza consulta de serviço Rest do servidor (https://bibliapp.herokuapp.com/)

