$(document).ready(function(){
	
	$("#botao-login").click(function(e){
		e.preventDefault();
		
		//Aqui são buscados os dados dos campos de login e senha informados pelo usuário no arquivo login.html
		var username = $("#login").val();
		var password = $("#senha").val();
		
		//Os dados de login e senha são transformados em formato JSON
		var dadosjson = JSON.stringify({"username": username, "password":password});
	
		//Usando AJAX para acessar a API do SUAP
		$.ajax({
			//Endereço do serviço para obter a autenticação do usuário
			url: "https://suap.ifrn.edu.br/api/v2/autenticacao/token/", 
			dataType: 'json',
			data: dadosjson,
			type: 'POST',
			contentType: 'application/json',
			success: function (data) { 
				sessionStorage.setItem("token", data.token); //Armazenando o token na seção
				$.ajax({
					headers: {
						"Authorization": "JWT " + sessionStorage.getItem("token")
					},
					url: "https://suap.ifrn.edu.br/api/v2/minhas-informacoes/meus-dados/",
					contentType: 'application/json',
					dataType: 'json',
					type: 'GET',
					success: function (data) {
						console.log(JSON.stringify(data));
						$("#usuario-nome_usual").html(data.nome_usual);
						$("#usuario-matricula").html(data.vinculo.matricula);
						$("#usuario-tipo_vinculo").html(data.tipo_vinculo);
						$("#usuario-email").html(data.email);
					},
					error: function (data) {
						alert("Não foi possível recuperar os dados. Problemas com a API do SUAP");
					}
				});
			},
			error: function(data){
				//alert(JSON.stringify(data));
				alert(data.responseJSON.detail);
		
			}
		});

	});	

});
