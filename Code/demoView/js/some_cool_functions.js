let filter = []
let tasks = []
let projects = []
let colleagues = []
let user_id = 0 // при успешной авторизации отличен от 0

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
  
  //render_calendar_m(...)оставить только задачи с галочками
  
 //сработает при нажатии кнопки "применить" справа
} 


function apply_colleague(){
  //get_tasks(user_id = )
  taskplace()
  render_calendar_m()
  
  //сработает при нажатии на коллегу
}

function apply_project(){
  //get_tasks(project_id = )
  taskplace()
  render_calendar_m()

  //сработает при нажатии на проект  
}
