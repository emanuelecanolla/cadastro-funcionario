// Asegura que o código só é executado depois que o DOM está totalmente carregado.
$(document).ready(function() {
    loadTasks(); // Carrega os dados ao iniciar a página.

    $(".openModal").click(function() {
        $("#formIndex").val(''); // Limpa o índice do formulário ao abrir o modal.
        $(".modal").modal('show');
    });

    // Função para salvar a tarefa no localStorage e recarregar a tabela.
    $("form").submit(function(event) {
        event.preventDefault();

        var nome = $("#exampleInputNome").val();
        var funcao = $("#exampleInputFuncao").val();
        var salario = $("#exampleInputSalario").val();
        var index = $("#formIndex").val(); // Obtém o índice do formulário.

        // Verifica se todos os campos estão preenchidos.
        if (nome.trim() === '' || funcao.trim() === '' || salario.trim() === '') {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
        if (index !== '') { // Edição.
            tasks[index] = {nome: nome, funcao: funcao, salario: salario};
        } else { // Nova tarefa.
            tasks.push({nome: nome, funcao: funcao, salario: salario});
        }

        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks(); // Recarrega a tabela.
        $(".modal").modal('hide'); // Fecha o modal.
        $("form")[0].reset(); // Limpa os campos do formulário.
    });

    // Evento de clique para o ícone de excluir.
    $("body").on("click", ".bi-trash", function() {
        var taskIndex = $(this).data("index");
        var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.splice(taskIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    });

    // Evento de clique para o ícone de editar.
    $("body").on("click", ".bi-pencil-square", function() {
        var taskIndex = $(this).data("index");
        var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        var task = tasks[taskIndex];

        $("#exampleInputNome").val(task.nome);
        $("#exampleInputFuncao").val(task.funcao);
        $("#exampleInputSalario").val(task.salario);
        $("#formIndex").val(taskIndex);
        $(".modal").modal('show');
    });

    // Função para carregar tarefas na tabela.
    function loadTasks() {
        var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
        // Limpa a tabela antes de recarregar os dados.
        $("tbody").empty();
        
        // Adiciona cada tarefa na tabela.
        tasks.forEach(function(task, index) { // Agora passa 'index' como um argumento.
            $("tbody").append(
                "<tr>" +
                    "<td>" + task.nome + "</td>" +
                    "<td>" + task.funcao + "</td>" +
                    "<td>" + task.salario + "</td>" +
                    "<td class='action'><i class='bi bi-pencil-square' data-index='" + index + "'></i></td>" +
                    "<td class='action'><i class='bi bi-trash' data-index='" + index + "'></i></td>" +
                "</tr>"
            );
        });
    }
});
