$(document).ready(function () {

	$("#botao-meusdados").click(function (e) {
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
				$("#img").attr("src", "http://suap.ifrn.edu.br/" + data.url_foto_150x200);
			},
			error: function (data) {
				alert("Impossível recuperar dados. Você deve fazer login!");
				window.location.href = "login.html";
			}
		});

		$("#botao").click(function (e) {
			$.ajax({
				headers: {
					"Authorization": "JWT "+sessionStorage.getItem("token")
				},
				url: "https://suap.ifrn.edu.br/api/v2/minhas-informacoes/turmas-virtuais/2019/1/",
				contentType: "application/json",
				dataType: "json",
				type: "GET",
				success: function (data) {
					$(data).each(function (indice, disciplina) {
						$("#id_nome").append(disciplina.descricao);
					});
				},
				error: function (data) {
					alert("Não foi possivel buscar suas disciplinas");
				}
			});

		});
	});


	/* COLOQUE AS NOVAS FUNCIONALIDADES AQUI ABAIXO, AINDA DENTRO DO $(document).ready */

});

