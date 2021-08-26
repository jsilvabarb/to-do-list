//Obtendo todos os elementos necessários
const inputBox = document.querySelector(".inputField input");
const addBtn = document.getElementById("add");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");


inputBox.onkeyup = ()=>{
    let userData = inputBox.value; //Obtendo o valor inserido pelo usuário
    if(userData.trim() != 0){//Se os valores no input não forem apenas espaços
        addBtn.classList.add("active"); //Ative o botão adicionar 
    } else {
        addBtn.classList.remove("active"); //Desativando o botão adicionar 
    }
}

//Se o usuário clicar em adicionar 
addBtn.onclick = () => {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo"); //Obtendo localstorage
    if(getLocalStorage == null) {// Se local storage for nulo 
        var listArr = [];//Criar um vetor em branco
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);//Adicionando dado 
    localStorage.setItem("New Todo", JSON.stringify(listArr)); // Tranformando uma string json em um objeto js
    showTarefas(); // Chamando a função showTarefas
}
showTarefas();
//Função que adiciona nova tarefa na tag ul
function showTarefas(){
    let getLocalStorage = localStorage.getItem("New Todo"); //Obtendo localstorage
    if(getLocalStorage == null) {// Se local storage for nulo 
        var listArr = [];//Criar um vetor em branco
    } else {
        listArr = JSON.parse(getLocalStorage);        
    }
    const pendingNum = document.querySelector(".pendingNum");
    pendingNum.textContent = listArr.length; //passando o tamanho 
    if(listArr.length > 0){ //Se o tamanho do vetor for maior do que 0
        deleteAllBtn.classList.add("active"); //Então o botão é ativado
    } else {
        deleteAllBtn.classList.remove("active");//Desativado 
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index});"><i class="fas fa-trash"></i></span></li>`;
    });

    todoList.innerHTML = newLiTag; //Adicionando a tag li dentro da tag ul
    inputBox.value = ""; //Deixando p box do input em branco depois de adicionar nova tarefa
}
//Função para deletar uma tarefa
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //Excluindo ou removendo o li indexado particularmente
    //Após remover a tag li atualizar o localstorage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTarefas(); //Chamando a função showTarefas
}
//Função para deletar todas as tarefas
deleteAllBtn.onclick = () => {
    listArr = [];// Esvaziar o array 
    //Após remover todas as tarefas atualizar o localstorage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTarefas(); //Chamando a função showTarefas
}

