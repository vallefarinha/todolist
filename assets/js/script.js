const inputTarefa = document.querySelector(".input-tarefa");
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');


btnTarefa.addEventListener('click', function () {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

function criaTarefa(texto) {
    const li = criaLi();
    li.innerText = texto;    
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefa();
}

function criaLi() {
    const li = document.createElement('li');
    return li;
}

inputTarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
        limpaInput();
    }    
});

function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaBotaoApagar(li) {
    li.innertext += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute("class", 'apagar');
    botaoApagar.setAttribute('title', 'apagar');
    li.appendChild(botaoApagar);
}

document.addEventListener('click', function (e) {
    const el = e.target;
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    }
});

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas); //converte um elemento para uma string em formato JSON (STRINGIFY)
    localStorage.setItem('tarefas', tarefasJSON); //enviar pro local storage
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas'); //pega do local storage
    const listaDeTarefas = JSON.parse(tarefas); //CONVERTE A STRING EM FORMATO JSON PARA UM ELEMENTO JS
    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

adicionaTarefasSalvas();