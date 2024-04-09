function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Limpa a tabela antes de recarregar os dados
    $("tbody").empty();
    
    // Adiciona cada tarefa na tabela
    tasks.forEach(function(task) {
        $("tbody").append(
            "<tr>" +
                "<td>" + task.nome + "</td>" +
                "<td>" + task.funcao + "</td>" +
                "<td>" + task.salario + "</td>" +
                "<td class='action'>Editar</td>" +
                "<td class='action'>Excluir</td>" +
            "</tr>"
        );
    });
}

// Carrega os dados ao iniciar a página
loadTasks();

$(".openModal").click(function(){
    $(".modal").modal('show');
});

// Função para salvar a tarefa no localStorage e recarregar a tabela
$("form").submit(function(event) {
    event.preventDefault();
    
    var nome = $("#exampleInputNome").val();
    var funcao = $("#exampleInputFuncao").val();
    var salario = $("#exampleInputSalario").val();
    
    // Verifica se todos os campos estão preenchidos
    if (nome.trim() === '' || funcao.trim() === '' || salario.trim() === '') {
        alert("Por favor, preencha todos os campos!");
        return;
    }
    
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({nome: nome, funcao: funcao, salario: salario});
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    // Recarrega a tabela
    loadTasks();
    
    // Fecha o modal
    $(".modal").modal('hide');
    
    // Limpa os campos do formulário
    $("form")[0].reset();
});