function render_mp_menu(switcher){
    if (switcher == "local")
    {
      render_mp_pusher();
    }
    else if (switcher == "global")
    {
      render_mp_pusher_for_global();
    }
    else if (switcher == "task_list")
    {
      render_mp_pusher_for_task_list();
    }
    var div = document.getElementById('mp-pusher');
    div.insertAdjacentHTML("beforeend", `<!-- mp-menu -->
    <nav id="mp-menu" class="mp-menu">
      <div class="mp-level">
        <h2 class="icon icon-world">Календарь</h2>
        <ul>
          <li>
            <a class="GO_global" onClick="b()"><img src="../static/icons/global.png">Общий календарь</a>
          </li>
          <li>
            <a class="GO_local" onClick="a()"><img src="../static/icons/local.png">Мой календарь</a>
          </li>
          <li>
            <a class="GO_list" onClick="c()"><img src="../static/icons/task.png">Список задач</a>
          </li>
        </ul>
          
      </div>
    </nav>`);
  }

  function a(){
    tasks = []
    filter = []
    projects = []
    colleagues = []
    document.getElementById("container").remove()
    render_calendar("local")
  }
  function b(){
    tasks = []
    filter = []
    projects = []
    colleagues = [] 
    document.getElementById("container").remove()
    render_calendar("global")
  }

  function c(){
    tasks = []
    filter = []
    projects = []
    colleagues = [] 
    document.getElementById("container").remove()
    render_calendar("task_list")
  }
  
  
  function render_mp_pusher(){
    var div = document.getElementById("container");
    div.insertAdjacentHTML("beforeend", `			<!-- Push Wrapper -->
    <div class="mp-pusher" id="mp-pusher">
      <div class="scroller">
        <div class="scroller-inner">
      
          <div class="content clearfix">
            <div class="block1 block-100 clearfix">
                <span class="open-menu"><a href="#" id="trigger" class="menu-trigger"></a></span>
                <section class="section" id="Prospero">
                </section>	
            </div>
            
            <div class="surround-calendar">
              <div class="left-section">
                <div class="filter-header">
                <p><u>Фильтры:</u><p>
                </div>
                <form name="filters_left" id="filters_left">
                </form>
                <input type="button" id="DO_IT" onclick="apply_filters()" value="Применить"></input>
              </div>
  
              <div class="calendar-box" id="calendar-box">
                  <div id="calendar"></div>
              </div> 
              
              <div class="right-section" id="right-section" style="height: 650px;">
                <p>Задачи из группы:
                <select id="filter" onChange="select_mark()">
                  <option value="Все">Все</option>
                  <option value="Без метки">Без метки</option>
                  <option value="Важно">Важно</option>
                  <option value="Внимание">Внимание</option>
                  <option value="Срочно">Срочно</option>
                </select>
                </p>
      
                <form class="task-place" id="task_place"></form>
                <p id="aftertaskplace">Проекты:</p>
                <div class="project-place" id ="projectplace"></div>
                <p>Коллеги:</p> 
                <div class="сolleagues-place" id="colleaguesplace"></div>
                
                <input type="button" onclick="apply_right()" id="apply_right" value="Применить"></input>
                <input type="button" style="width: 13vw;" onclick="add_button()" id="add_button" value="Добавить"></input>   
              </div> 
              
              <button id="GO_AWAY" onclick="logout()"><img src="../static/icons/logout2.png"></button>

            </div>
          </div>
        </div>
      </div><!-- /scroller-inner -->
      </div><!-- /scroller -->
    </div><!-- /pusher -->`)
   }

   function render_mp_pusher_for_global(){
    var div = document.getElementById("container");
    div.insertAdjacentHTML("beforeend", `			<!-- Push Wrapper -->
    <div class="mp-pusher" id="mp-pusher">
      <div class="scroller">
        <div class="scroller-inner">
      
          <div class="content clearfix">
            <div class="block1 block-100 clearfix">
                <span class="open-menu"><a href="#" id="trigger" class="menu-trigger"></a></span>
                <section class="section" id="Prospero">
                </section>	
            </div>
            
            <div class="surround-calendar">
              <div class="left-section">
                <div class="filter-header">
                <p><u>Фильтры:</u><p>
                </div>
                <form name="filters_left" id="filters_left">
                </form>
                <input type="button" id="DO_IT" onclick="apply_filters()" value="Применить"></input>
              </div>
  
              <div class="calendar-box" id="calendar-box">
                  <div id="calendar"></div>
              </div> 

              <div class="right-section" id="right-section" style="height: 650px;">
                <p>Отделы:</p>
      
                <div class="group-place" style="height: 260px;" id="group_place">
                Андрей, запихни сюда рандомные отделы как во вкладке проектов.
                </div>
                <p id="afterGroupPlace">Проекты:</p>
                <div class="project-place" style="height: 260px;" id ="projectplace"></div>
                
                <input type="button" onclick="apply_right()" id="apply_right" value="Применить"></input>
                <input type="button" style="width: 13vw;" onclick="add_button()" id="add_button" value="Добавить"></input>   
              </div> 
              
              <button id="GO_AWAY" onclick="logout()"><img src="../static/icons/logout2.png"></input>

            </div>
          </div>
        </div>
      </div><!-- /scroller-inner -->
      </div><!-- /scroller -->
    </div><!-- /pusher -->`)
   }

   function render_mp_pusher_for_task_list(){
    var div = document.getElementById("container");
    div.insertAdjacentHTML("beforeend", `			<!-- Push Wrapper -->
    <div class="mp-pusher" id="mp-pusher">
      <div class="scroller">
        <div class="scroller-inner">
      
          <div class="content clearfix">
            <div class="block1 block-100 clearfix">
                <span class="open-menu"><a href="#" id="trigger" class="menu-trigger"></a></span>
                <section class="section" id="Prospero">
                </section>	
            </div>
            
            <div class="surround-task">

              <div class="My-tasks">
                <form id="LilCrutch">
                  <p><input type="search" onkeypress = "if (event.keyCode==13){ return false}" id="TaskSearchInput" placeholder=" Введите название задачи"> 
                  <input type="button" id="TaskSearchButton" onClick="find_task()" value="Найти задачу"></p>
                </form>  

                <div id = "task_list_tasks"></div>
              </div>

              <div class="right-task-section">
                <p id="marks">Метки:</p>
                <div class="marks-place" style="height: 180px;' id ="marksplace">
                
                <a class="button" onClick="select_mark_task_list(this.textContent)"><div class="project-elem"><img src="../static/icons/gaymark.png"><p>Все</p></div></a>  

                <a class="button" onClick="select_mark_task_list(this.textContent)"><div class="project-elem"><img src="../static/icons/whitemark.png"><p>Без метки</p></div></a>  

                <a class="button" onClick="select_mark_task_list(this.textContent)"><div class="project-elem"><img src="../static/icons/redmark.png"><p>Срочно</p></div></a>  
                
                <a class="button" onClick="select_mark_task_list(this.textContent)"><div class="project-elem"><img src="../static/icons/yellowmark.png"><p>Важно</p></div></a>  
                
                <a class="button" onClick="select_mark_task_list(this.textContent)"><div class="project-elem"><img src="../static/icons/greenmark.png"><p>Внимание</p></div></a>  

                </div> 

                <p id="afterGroupPlace">Мои проекты:</p>
                <div class="project-place-task-list" id ="projectplace"></div> 
              </div> 
              
              <button id="GO_AWAY_from_task" onclick="logout()"><img src="../static/icons/logout2.png"></input>

            </div>
          </div>
        </div>
      </div><!-- /scroller-inner -->
      </div><!-- /scroller -->
    </div><!-- /pusher -->`)

    render_task_list_tasks(tasks)

   }

function render_task_list_tasks(task = tasks){
  document.getElementById("task_list_tasks").remove()
  document.getElementById("LilCrutch").insertAdjacentHTML("afterend",`<div id = "task_list_tasks"></div>`)
  var div = document.getElementById("task_list_tasks")
  for (i = 0 ; i < task.length ; i++){
      if (task[i].mark == "Важно"){
        div.insertAdjacentHTML("beforeend",`<div class="task-list-elem">
        <img src="../static/icons/yellowmark.png">
        <div class="move_task_lil_up" name="${task[i].eventName}" onClick="click_on_task(this.textContent)">${task[i].eventName}</div>
        </div>`)
      }
      if (task[i].mark == "Внимание"){
        div.insertAdjacentHTML("beforeend",`<div class="task-list-elem">
        <img src="../static/icons/greenmark.png">
        <div class="move_task_lil_up" name="${task[i].eventName}" onClick="click_on_task(this.textContent)">${task[i].eventName}</div>
        </div>`)
      }
      if (task[i].mark == "Срочно"){
        div.insertAdjacentHTML("beforeend",`<div class="task-list-elem">
        <img src="../static/icons/redmark.png">
        <div class="move_task_lil_up" name="${task[i].eventName}" onClick="click_on_task(this.textContent)">${task[i].eventName}</div>
        </div>`)
      }
      if (task[i].mark == "Без метки"){
        div.insertAdjacentHTML("beforeend",`<div class="task-list-elem">
        <img src="../static/icons/whitemark.png">
        <div class="move_task_lil_up" name="${task[i].eventName}" onClick="click_on_task(this.textContent)">${task[i].eventName}</div>
        </div>`)
      }
    }
}

function filters_left(){
    var div = document.getElementById('filters_left');
    for (i=0;i<filter.length;i++){
        div.insertAdjacentHTML("beforeend", `<div class="filter-elem">
        <p><input type="checkbox" name="${i}" value="${filter[i]}" checked>${filter[i]}</p>
        </div>`);
    }
}


function render_calendar_m(task = tasks){
    var div = document.getElementById('calendar');
    div.remove()
    var div = document.getElementById('calendar-box');
    div.insertAdjacentHTML("beforeend",`<div id="calendar"></div>`)
    var calendar = new Calendar('#calendar', task);
}

function taskplace(task = tasks){
  document.getElementById('task_place').remove()
  document.getElementById("aftertaskplace").insertAdjacentHTML("beforebegin",`<form class="task-place" id="task_place"></form>`)
  var div = document.getElementById('task_place');
  for (i=0;i<task.length;i++){
      if (task[i].checked == "True"){
        div.insertAdjacentHTML("beforeend", `<div class="task-elem">
        <p><input type="checkbox" name="task${i}" value="${task[i].eventName}" checked>${task[i].eventName}</p>
        </div>`);}
      else{
        div.insertAdjacentHTML("beforeend", `<div class="task-elem">
        <p><input type="checkbox" name="task${i}" value="${task[i].eventName}">${task[i].eventName}</p>
        </div>`);}
  }
}

function projectplace(switcher){
  var div = document.getElementById('projectplace');
  div.textContent = ""
  if (switcher == "task_list"){
//TODO заставить кнопки удаления проекта и показа инфы о нем работать!
    div.insertAdjacentHTML("beforeend", `<a class="button" onclick="apply_project_task_list(this.name)" name="Все проекты">
    <div class="project-elem">
    <img src="../static/icons/folder.png">
    <p>Все проекты</p>
    </div></a>`);
		for (i=0;i<projects.length;i++){
      div.insertAdjacentHTML("beforeend", `<a class="button" onclick="apply_project_task_list(this.name)" name="${projects[i].name}">
        <div class="project-elem">
        <img src="../static/icons/folder.png">
        <p>${projects[i].name} </p>
        <button id="info" onClick = "project_info(this.name)" name="${projects[i].name}">?</button>
        <button id="close" onClick = "delete_project(this.name,'tl')" name="${projects[i].name}">X</button>
        </div></a>`);
      }

  }
  else{
//TODO заставить кнопки удаления проекта и показа инфы о нем работать!
    div.insertAdjacentHTML("beforeend", `<a class="button" onclick="apply_project(this.name)" name="Все проекты">
    <div class="project-elem">
    <img src="../static/icons/folder.png">
    <p>Все проекты</p>
    </div></a>`);
		for (i=0;i<projects.length;i++){
      div.insertAdjacentHTML("beforeend", `<a class="button" onclick="apply_project(this.name)" name="${projects[i].name}">
        <div class="project-elem">
        <img src="../static/icons/folder.png">
        <p onclick="apply_project(this.name)" >${projects[i].name} </p>
        <button id="info" onClick = "project_info(this.name)" name="${projects[i].name}">?</button>
        <button id="close" onClick = "delete_project(this.name,'cl')" name="${projects[i].name}">X</button>
        </div></a>`);
      }
  }
}

function colleaguesplace(){
    var div = document.getElementById('colleaguesplace');
    div=`<div class="сolleagues-place" id="colleaguesplace"></div>`
    div = document.getElementById('colleaguesplace');
    div.insertAdjacentHTML("beforeend", `<a class="button" onclick="apply_colleague(this)" name="Все коллеги">
    <div class="сolleagues-elem">
    <img src="../static/icons/person.png">
    <p>Все коллеги</p>
    </div></a>`)
		for (i=0;i<colleagues.length;i++){
      div.insertAdjacentHTML("beforeend", `<a class="button" onclick="apply_colleague(this)" name="${colleagues[i].name}">
        <div class="сolleagues-elem">
        <img src="../static/icons/person.png">
        <p>${colleagues[i].name}</p>
        </div></a>`)
      }	  
}
function add_button(){
  var div = document.getElementById('add_button');
  div.remove()
  var div = document.getElementById('apply_right');
  div.insertAdjacentHTML("afterend",`<input type="button" style="width: 13vw;" onclick="add_project()" id="add_project" value="Добавить проект"></input>`)
  div.insertAdjacentHTML("afterend",`<input type="button" style="width: 13vw;" onclick="add_task()" id="add_task" value="Добавить задачу"></input>`)
  var div = document.getElementById('right-section');
  div.style = `height: 678px;`
}

function delete_back_button(){
  var div = document.getElementById('back_button');
  div.remove()
  var div = document.getElementById('apply_right');
  div.insertAdjacentHTML("afterend",`<input type="button" style="width: 13vw;" onclick="add_button()" id="add_button" value="Добавить"></input>`);
  render_calendar_m(tasks);
}

function add_task(){
    var div = document.getElementById('right-section');
    div.style = `height: 650px`;
    var div = document.getElementById('apply_right');
    div.insertAdjacentHTML("afterend",`<input type="button" style="width: 13vw;" onclick="delete_back_button()" id="back_button" value="Назад"></input>`)
  
    var div = document.getElementById('add_task');
    div.remove()
    var div = document.getElementById('add_project');
    div.remove()
    var div = document.getElementById('calendar');
    div.remove()
    var div = document.getElementById('calendar-box');
    div.insertAdjacentHTML("beforeend",`
        <div id="calendar"> 
        <div class="make-form">
			<form name="add_task_form">
			  <div class="row">
				<div class="col-25">
				  <label for="fname">Название</label>
				</div>
				<div class="col-75">
				  <input type="text" id="fname" name="firstname" placeholder="Название задачи..">
				</div>
			  </div>
			  <div class="row">
				<div class="col-25">
				  <label for="lname">Поручить</label>
				</div>
        <div class="col-75">
        <select id="colleague" name="colleague">
        </select>
        </div>
			  </div>
			  <div class="row">
				<div class="col-25">
				  <label for="datapicker">Дата</label>
				</div>
				<div class="col-75">
					<!--<input type="text" value="dd-mm-yy" onfocus="this.select();lcs(this)" onclick="event.cancelBubble=true;this.select();lcs(this)">-->
					<input type="date" name="datapicker2" value="ДД/ММ/ГГГГГ">
				</div>
			  </div>
			  <div class="row">
				<div class="col-25">
				  <label for="mark">Метки</label>
				</div>
				<div class="col-75">
          <select id="mark" name="mark">
          <option value="Без метки">Без метки</option>
					<option value="Важно">Важно</option>
					<option value="Внимание">Внимание</option>
					<option value="Срочно">Срочно</option>
				  </select>
				</div>
        </div>
        <div class="row">
				<div class="col-25">
				  <label for="group">Группа</label>
				</div>
				<div class="col-75">
				  <select id="group" name="group">
					<option value="Конференция">Конференция</option>
					<option value="Форум">Форум</option>
          <option value="Фестиваль">Фестиваль</option>
          <option value="Встреча">Встреча</option>
					<option value="Совещание">Совещание</option>
          <option value="Заказ">Заказ</option>
          <option value="Прочее">Прочее</option>
				  </select>
				</div>
        </div>
        <div class="row">
				<div class="col-25">
				  <label for="group">Проект</label>
				</div>
				<div class="col-75">
				  <select id="divproject" name="divproject">
				  </select>
				</div>
			  </div>
			  <div class="row">
				<div class="col-25">
				  <label for="characteristic">Описание задачи</label>
				</div>
				<div class="col-75">
				  <textarea id="characteristic" name="characteristic" placeholder="Введите описание задачи..." style="height:200px"></textarea>
				</div>
			  </div>
			  <div class="row">
				<input onclick="add_task_submit()" type="submit" value="Submit">
			  </div>
			</form>
		  
    </div><!-- content -->
    
  </div><!-- modal -->
  </div>`)
  var a = document.getElementById("divproject")
  for (i=0;i<projects.length;i++){
    a.insertAdjacentHTML("beforeend",`<option value="${projects[i].name}">${projects[i].name}</option>`)
  }
  a = document.getElementById("colleague")
  for (i=0;i<colleagues.length;i++){
    a.insertAdjacentHTML("beforeend",`<option value="${colleagues[i].name}">${colleagues[i].name}</option>`)
  }

}

//TODO сделать форму для проекта
function add_project(){
    var div = document.getElementById('right-section');
    div.style = `height: 650px`;

    var div = document.getElementById('apply_right');
    div.insertAdjacentHTML("afterend",`<input type="button" style="width: 13vw;" onclick="delete_back_button()" id="back_button" value="Назад"></input>`);

    var div = document.getElementById('add_task');
    div.remove()
    var div = document.getElementById('add_project');
    div.remove()
    var div = document.getElementById('calendar');
    div.remove()
    var div = document.getElementById('calendar-box');
    div.insertAdjacentHTML("beforeend",`
        <div id="calendar">
			<form name="add_project_form">
			  <div class="row">
				<div class="col-25">
				  <label for="fname">Название</label>
				</div>
				<div class="col-75">
				  <input type="text" id="fname" name="firstname" placeholder="Название проекта..">
				</div>
			  </div>
			  <div class="row">
				<div class="col-25">
				  <label for="lname">Место</label>
				</div>
        <div class="col-75">
          <input type="text" id="place" name="place" placeholder="Место проведения...">
        </div>
			  </div>
			  <div class="row">
				<div class="col-25">
				  <label for="datapicker">Дедлайн</label>
				</div>
				<div class="col-75">
					<!--<input type="text" value="dd-mm-yy" onfocus="this.select();lcs(this)" onclick="event.cancelBubble=true;this.select();lcs(this)">-->
					<input type="date" name="datapicker2" value="ДД/ММ/ГГГГГ">
				</div>
			  </div>
			  <div class="row">
				<div class="col-25">
				  <label for="mark">Метки</label>
				</div>
				<div class="col-75">
          <select id="mark" name="mark">
          <option value="Без метки">Важно</option>
					<option value="Важно">Важно</option>
					<option value="Внимание">Внимание</option>
					<option value="Срочно">Срочно</option>
				  </select>
				</div>
        </div>
        <div class="row">
				<div class="col-25">
				  <label for="group">Группа</label>
				</div>
				<div class="col-75">
				  <select id="group" name="group">
					<option value="Конференция">Конференция</option>
					<option value="Форум">Форум</option>
          <option value="Фестиваль">Фестиваль</option>
          <option value="Встреча">Встреча</option>
					<option value="Совещание">Совещание</option>
          <option value="Заказ">Заказ</option>
          <option value="Прочее">Прочее</option>
				  </select>
				</div>
        </div>
        <div class="row">
				<div class="col-25">
				  <label for="group">Проект</label>
				</div>
				<div class="col-75">
				  <select id="divproject" name="divproject">
				  </select>
				</div>
			  </div>
			  <div class="row">
				<div class="col-25">
				  <label for="characteristic">Описание задачи</label>
				</div>
				<div class="col-75">
				  <textarea id="characteristic" name="characteristic" placeholder="Введите описание задачи..." style="height:200px"></textarea>
				</div>
			  </div>
			  <div class="row">
				<input onclick="add_task_submit()" type="submit" value="Submit">
			  </div>
			</form>
		  
    </div><!-- content -->
    
  </div><!-- modal -->
  </div>`)
  var a = document.getElementById("divproject")
  for (i=0;i<projects.length;i++){
    a.insertAdjacentHTML("beforeend",`<option value="${projects[i].name}">${projects[i].name}</option>`)
  }
  a = document.getElementById("colleague")
  for (i=0;i<colleagues.length;i++){
    a.insertAdjacentHTML("beforeend",`<option value="${colleagues[i].name}">${colleagues[i].name}</option>`)
  }

}



function add_task_submit(){
  var form = document.forms.add_task_form
  var u = true
  for (i=0; i<tasks.length;i++){if (form.elements.firstname.value == tasks[i].eventName){u = false}}

  if ((form.elements.firstname.value != "") && (form.elements.datapicker2.value != "") && u) {

  tasks.push({eventName:form.elements.firstname.value, calendar:form.elements.group.value, color:colors[form.elements.group.value], date:moment(form.elements.datapicker2.value), mark:form.elements.mark.value, person:form.elements.colleague.value, descr:form.elements.characteristic.value, checked:"True", project:form.elements.divproject.value})
  taskplace()

  var request = new XMLHttpRequest();
  request.open('POST',url,false);
  request.send(JSON.stringify({'type':'add_task', "user_id":user_id, "eventName":form.elements.firstname.value, "calendar":form.elements.group.value, "date":form.elements.datapicker2.value, "mark": form.elements.mark.value, "person":form.elements.colleague.value, "descr":form.elements.characteristic.value, "project":form.elements.divproject.value})); 
  var div = document.getElementById('apply_right');
  //div.insertAdjacentHTML("afterend",`<input type="button" style="width: 13vw;" onclick="add_button()" id="add_button" value="Добавить"></input>`)
  //render_calendar_m(tasks)
  delete_back_button()
  }
  else{
    alert("Ошибка при добавлении задачи")
    var div = document.getElementById('apply_right');
    //div.insertAdjacentHTML("afterend",`<input type="button" style="width: 13vw;" onclick="add_button()" id="add_button" value="Добавить"></input>`)
    //render_calendar_m(tasks)
    delete_back_button()
  }

}

//TODO сделать функцию когда будет форма для проекта add_project_submit()   


function delete_container(){
  document.getElementById("container").remove()
  render_login_page()
}

function logout(){
  user_id = 0
  tasks = []
  filter = []
  projects = []
  colleagues = []
  localStorage.clear()
  delete_container()
}


function mp_menu_animate(){
    new mlPushMenu( document.getElementById( 'mp-menu' ), document.getElementById( 'trigger' ) );
    (function() {
      [].slice.call(document.querySelectorAll('.menu')).forEach(function(menu) {
        var menuItems = menu.querySelectorAll('.menu__link'),
          setCurrent = function(ev) {
            ev.preventDefault();
  
            var item = ev.target.parentNode; // li
  
            // return if already current
            if (classie.has(item, 'menu__item--current')) {
              return false;
            }
            // remove current
            classie.remove(menu.querySelector('.menu__item--current'), 'menu__item--current');
            // set current
            classie.add(item, 'menu__item--current');
          };
  
        [].slice.call(menuItems).forEach(function(el) {
          el.addEventListener('click', setCurrent);
        });
      });
  
      [].slice.call(document.querySelectorAll('.link-copy')).forEach(function(link) {
        link.setAttribute('data-clipboard-text', location.protocol + '//' + location.host + location.pathname + '#' + link.parentNode.id);
        new Clipboard(link);
        link.addEventListener('click', function() {
          classie.add(link, 'link-copy--animate');
          setTimeout(function() {
            classie.remove(link, 'link-copy--animate');
          }, 300);
        });
      });
    })(window);
  }
  

function render_calendar(switcher){
  get_filters()
  get_tasks()
  get_projects()
  get_colleagues()

  document.body.insertAdjacentHTML("beforeend",`<div class="container" id = "container"></div>`)
  render_mp_menu(switcher)

  if (switcher != "task_list")
  {
    filters_left()
    render_calendar_m();
  }

  if (switcher == "local")
  {
    taskplace();
    colleaguesplace();
  }
  projectplace(switcher)


  mp_menu_animate()
}

