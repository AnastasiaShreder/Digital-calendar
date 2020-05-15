let filter = []
let tasks = []
let projects = []
let colleagues = []
let user_id = 0 // при успешной авторизации отличен от 0
let url = "/"

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

function apply_project(name){
  var new_tasks = []
  if (name == "Все проекты"){
    try{
    taskplace(tasks)}
    catch (e){}
    render_calendar_m(tasks)
  }
    else{
    for (i = 0; i< tasks.length;i++){
      if (name == tasks[i].project){
        new_tasks.push(tasks[i])
      }
    }
    try{
    taskplace(new_tasks)}
    catch (e){}
    render_calendar_m(new_tasks)
  }
  //сработает при нажатии на проект  
}

function apply_project_task_list(name) {
  var new_tasks = []
  if (name == "Все проекты"){
    render_task_list_tasks(tasks)
  }
    else{
    for (i = 0; i< tasks.length;i++){
      if (name == tasks[i].project){
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

function select_mark_task_list(mark){
  var new_tasks = []
  if (mark == "Все"){
    render_task_list_tasks(tasks)
  }
  else{
    for (i=0; i<tasks.length; i++){
      if (tasks[i].mark == mark){
        new_tasks.push(tasks[i])
      }
    }
    render_task_list_tasks(new_tasks)
  }

}

function click_on_task(taskname){
  for (i=0;i<tasks.length;i++){
    if (tasks[i].eventName == taskname){
      alert("Название : "+tasks[i].eventName+"\nГруппа : "+tasks[i].calendar+"\nПроект : "+tasks[i].project+"\nКому поручено : "+tasks[i].person+"\nОписание : "+tasks[i].descr+"\nМетка : "+tasks[i].mark+"\nДата : "+moment(tasks[i].date).format('YYYY-MM-DD'))
      break
    }
  }
}

function find_task(){
  var div = document.getElementById("TaskSearchInput")
  var find = div.value
  var new_tasks = []
  for (i = 0;i<tasks.length;i++){
    if ((tasks[i].eventName.toLowerCase()).indexOf(find.toLowerCase()) != -1){
      new_tasks.push(tasks[i])
    }
  }
  render_task_list_tasks(new_tasks)

}

function project_info(name){
  for (i=0;i<projects.length;i++){
    if (projects[i].name == name){
      alert("Название : "+projects[i].name+"\nМесто : "+projects[i].location+"\nДедлайн : "+moment(projects[i].date).format('YYYY-MM-DD')+"\nОписание : "+projects[i].descr+"\nУчастники : "+projects[i].members)
      break
    }
  }
}

function delete_project(obj,a){
  for (i=0;i<projects.length;i++){
    if (projects[i].name == obj){
      var request = new XMLHttpRequest();
      request.open('POST',url,false);
      request.send(JSON.stringify({'type':'deleteproject', 'project_name':projects[i].name})); 
      projects.splice(i,1)


      break
    }
  }
  tasks = tasks.filter(function (e){ return e.project != obj})
  if (a=="tl"){
    projectplace("task_list")
    apply_project_task_list("Все проекты")}
  else {
    projectplace("local")
    projectplace("global")
    apply_project("Все проекты")}
}


function apply_otdel(name){
  if (name =="Все отделы"){
    render_calendar_m(tasks)
  }
  else if (name == "Отдел №1"){
    new_tasks=[]
    for (i=0;i<tasks.length;i++){
      if (tasks[i].person=="Светлана Конкова" || tasks[i].person=="Анастасия Шредер" || tasks[i].person=="Данил Лялин"){ new_tasks.push(tasks[i])}
    }
    render_calendar_m(new_tasks)
  }
  else if (name == "Отдел №2"){
    new_tasks=[]
    for (i=0;i<tasks.length;i++){
      if (tasks[i].person=="Андрей Тагиев" || tasks[i].person=="Марк Шерман"){ new_tasks.push(tasks[i])}
    }
    render_calendar_m(new_tasks)
  }
}