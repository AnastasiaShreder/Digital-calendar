let filter = []
let tasks = []
let projects = []
let colleagues = []
let user_id = 0 // при успешной авторизации отличен от 0

function apply_filters(){
  //get_tasks(filters = ) /получить список фильтров с галочками
  //taskplace()
  //render_calendar_m()
  
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
