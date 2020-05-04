let filter = []
let tasks = []
let projects = []
let colleagues = []
let user_id = 0 // при успешной авторизации отличен от 0

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
  get_tasks(u_id = obj.name)
  taskplace()
  render_calendar_m()
  
  //сработает при нажатии на коллегу
}

function apply_project(obj){
  get_tasks(project_id = obj.name)
  taskplace()
  render_calendar_m()

  //сработает при нажатии на проект  
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