let filter = []
let tasks = []
let projects = []
let colleagues = []
let user_id = 0 // при успешной авторизации отличен от 0
let url = "http://85.142.164.100:5000/"
//let url = "/"

colors = {
  "Конференция":"orange",
  "Форум":"red",
  "Фестиваль":"purple",
  "Встреча":"green",
  "Совещание":"green2",
  "Заказ":"blue",
  "Прочее":"crimson",
}

function apply_filters(){
  var new_filter = []
  var div = document.getElementById("filters_left")
  for(i=0;i<div.length;i++){
    if(div[i].checked){
      new_filter.push(div[i].value)
    }
  }
  var new_tasks = []
  for (i=0;i<tasks.length;i++){
    if (new_filter.indexOf(tasks[i].calendar)!=-1){
      new_tasks.push(tasks[i])
    }
  }
  render_calendar_m(new_tasks)  

  //сработает при нажатии кнопки "применить" слева
}

function apply_right(){
  var new_tasks = []
  var div = document.getElementById("task_place")
  for(i=0;i<div.length;i++){
    if(div[i].checked){     
      for (j=0;j<tasks.length;j++){
        if (tasks[j].eventName == div[i].value){
          tasks[j].checked = "True"
          new_tasks.push(tasks[j])
        }
      }
    }
    else {
      for (j=0;j<tasks.length;j++){
        if (tasks[j].eventName == div[i].value){
          tasks[j].checked = "False"
        }
      }
    }
  }
  render_calendar_m(new_tasks)

 //сработает при нажатии кнопки "применить" справа
} 


function apply_colleague(obj){
  var new_tasks = []
  if (obj.name == "Все коллеги"){
    taskplace(tasks)
    render_calendar_m(tasks)
  }
  else{
    for (i = 0; i< tasks.length;i++){
      if (obj.name == tasks[i].person){
        new_tasks.push(tasks[i])
      }
    }
    taskplace(new_tasks)
    render_calendar_m(new_tasks)
  }
  
  //сработает при нажатии на коллегу
}

function apply_project(obj){
  var new_tasks = []
  if (obj.name == "Все проекты"){
    taskplace(tasks)
    render_calendar_m(tasks)
  }
    else{
    for (i = 0; i< tasks.length;i++){
      if (obj.name == tasks[i].project){
        new_tasks.push(tasks[i])
      }
    }
    taskplace(new_tasks)
    render_calendar_m(new_tasks)
  }
  //сработает при нажатии на проект  
}

function apply_project_task_list(obj) {
  var new_tasks = []

  if (obj.name == "Все проекты"){
    render_task_list_tasks(tasks)
  }
    else{
    for (i = 0; i< tasks.length;i++){
      if (obj.name == tasks[i].project){
        new_tasks.push(tasks[i])
      }
    }
    render_task_list_tasks(new_tasks)
  }
}

function select_mark(){
  var new_tasks = []
  var mark = document.getElementById("filter").value
  if (mark == "Все"){
    taskplace(tasks)
  }
  else{
    for (i=0; i<tasks.length; i++){
      if (tasks[i].mark == mark){
        new_tasks.push(tasks[i])
      }
    }
    taskplace(new_tasks)
  }

  // сработает при выборе метки
}

function click_on_task(taskname){
  for (i=0;i<tasks.length;i++){
    if (tasks[i].eventName == taskname){
      alert("Название : "+tasks[i].eventName+"\nГруппа : "+tasks[i].calendar+"\nПроект : "+tasks[i].project+"\nКому поручено : "+tasks[i].person+"\nОписание : "+tasks[i].descr+"\nМетка : "+tasks[i].mark+"\nДата : "+moment(tasks[i].date).format('YYYY-MM-DD'))
      break
    }
  }
}