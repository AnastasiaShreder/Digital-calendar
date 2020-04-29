function render_mp_menu(){
    render_mp_pusher()
    var div = document.getElementById('mp-pusher');
    div.insertAdjacentHTML("beforeend", `<!-- mp-menu -->
    <nav id="mp-menu" class="mp-menu">
      <div class="mp-level">
        <h2 class="icon icon-world">Календарь</h2>
        <ul>
          <li class="icon icon-arrow-left">
            <a class="icon icon-display" href="#">Общий календарь</a>
            <div class="mp-level">
              <h2 class="icon icon-display">Общий календарь</h2>
              <a class="mp-back" href="#">назад</a>
              <ul>
                <li><a href="#">Фильтры</a></li>
              </ul>
            </div>
          </li>
          <li class="icon icon-arrow-left">
            <a class="icon icon-news" href="#">Мой календарь</a>
            <div class="mp-level">
              <h2 class="icon icon-news">Мой календарь</h2>
              <a class="mp-back" href="#">назад</a>
              <ul id="mycalendar"></ul>
            </div>
          </li>
          <li><a class="icon icon-wallet" href="#">Список задач</a></li>
        </ul>
          
      </div>
    </nav>`);
  }

  
  function render_mp_pusher(){
    var div = document.getElementById("container");
    div.insertAdjacentHTML("beforeend", `			<!-- Push Wrapper -->
    <div class="mp-pusher" id="mp-pusher">
      <div class="scroller">
        <div class="scroller-inner">
      
          <div class="content clearfix">
            <div class="block block-100 clearfix">
              
                <span class="open-menu"><a href="#" id="trigger" class="menu-trigger"></a></span>
                <section class="section" id="Prospero">
                  <nav class="menu menu--prospero">
                    <ul class="menu__list">
                      <li class="menu__item menu__item--current"><button style="background-color: transparent; border-color: transparent;" onclick="render_calendar_m()" class="menu__link">Месяц</button></li>
                      <li class="menu__item"><button style="background-color: transparent; border-color: transparent;" onclick="render_calendar_w()" class="menu__link">Неделя</button></li>
                      <li class="menu__item"><button style="background-color: transparent; border-color: transparent;" onclick="render_calendar_d()" class="menu__link">День</button></li>
                    </ul>
                  </nav>
                </section>	
            </div>
                
            <div class="surround-calendar">
              <div class="left-section">
                <div class="filter-header">
                <p><u>Фильтры:</u><p>
                </div>
                <form name="filters_left" id="filters_left">
                </form>
                <div class="line">
                <p><input type="checkbox" name="filter-supervisor" value="filter-supervisor"> Отображать по руководителю:</p>
                </div>
                <div class="filter-search">
                  <input type="search" placeholder="Руководитель">
                </div>
                <input type="button" onclick="apply_filters()" value="Применить"></input>
              </div>
   
              <div class="calendar-box" id="calendar-box">
                   <div id="calendar"></div>
              </div>
               <div class="right-section">
              <p>Задачи из группы:
              <select id="filter">
                <option value="all">Все</option>
                <option value="important">Важно</option>
                <option value="attention">Внимание</option>
                <option value="soon">Срочно</option>
              </select>
              </p>
    
              <div class="task-place" id="taskplace"></div>
              <p>Проекты:</p>
              <div class="project-place" id ="projectplace"></div>
              <p>Коллеги:</p>
              <div class="сolleagues-place" id="colleaguesplace"></div>
              
              <input type="button" style="width: 13vw;" onclick="apply_right()" value="Применить"></input>
              <input type="button" style="width: 13vw;" onclick="add_task()" value="Добавить"></input>
    
              
            </div>
          </div>
          </div>
        </div><!-- /scroller-inner -->
        
                  
      </div><!-- /scroller -->
   
    </div><!-- /pusher -->`)
 
   }

   function mycalendar(){
    var div = document.getElementById('mycalendar');
	for (i=0; i<100;i++){
		div.insertAdjacentHTML("beforeend", `<li><a href="#">Проект ${i}</a></li>`);
    }
    
}


function filters_left(){
    r = filter
    
    var div = document.getElementById('filters_left');
    for (i=0;i<r.length;i++){
        div.insertAdjacentHTML("beforeend", `<div class="filter-elem">
        <p><input type="checkbox" name="${r[i]}" value="filter" checked>  ${r[i]}</p>
        </div>`);
    }
}


function render_calendar_m(){
    let div = document.getElementById('calendar');
    div.remove()
    let div2 = document.getElementById('calendar-box');
    div2.insertAdjacentHTML("beforeend",`<div id="calendar"></div>`)
    var calendar = new Calendar('#calendar', tasks);
}

function render_calendar_w(){
    let div = document.getElementById('calendar');
    div.remove()
    let div2 = document.getElementById('calendar-box');
    div2.insertAdjacentHTML("beforeend",`<div id="calendar"></div>`)
    var calendar = new Calendar_w('#calendar', tasks);

}

function render_calendar_d(){
    let div = document.getElementById('calendar');
    div.remove()
    let div2 = document.getElementById('calendar-box');
    div2.insertAdjacentHTML("beforeend",`<div id="calendar"></div>`)
    var calendar = new Calendar('#calendar', tasks); //заменить на день
}

function taskplace(){
    var div = document.getElementById('taskplace');
	for (i=0;i<tasks.length;i++){
        div.insertAdjacentHTML("beforeend", `<div class="task-elem">
        <p><input type="checkbox" name="task${i}" value="task${i}">${tasks[i].eventName}</p>
        </div>`);
    }
}


function projectplace(){
    var div = document.getElementById('projectplace');

    var request = new XMLHttpRequest();
    request.open('POST','http://85.142.164.100:5000/',true);//request.open('POST','/',false);
	request.addEventListener('readystatechange', function() {
	    if ((request.readyState==4) && (request.status==200)) {
            responce = JSON.parse(request.responseText)
			for (i=0;i<responce.length;i++){
                div.insertAdjacentHTML("beforeend", `<a class="button" onclick="apply_project()">
                    <div class="project-elem">
                        <img src="icons/folder.png">
                        <p>${responce[i]} </p>
                    </div>
                    </a>`);
            }
    
		}
	}); 
    request.send(JSON.stringify({'type':'projectplace', 'sql':'something'})); 
}

function colleaguesplace(){
    var div = document.getElementById('colleaguesplace');
    
    var request = new XMLHttpRequest();
    
    request.open('POST','http://85.142.164.100:5000/',true);//request.open('POST','/',false);
	request.addEventListener('readystatechange', function() {
	    if ((request.readyState==4) && (request.status==200)) {
            responce = JSON.parse(request.responseText)
			for (i=0;i<responce.length;i++){
                div.insertAdjacentHTML("beforeend", `<a class="button" onclick="apply_colleague()">
                    <div class="сolleagues-elem">
                        <img src="icons/person.png">
                        <p>${responce[i]}</p>
                    </div>
                    </a>`);
            }
		}
	}); 
    request.send(JSON.stringify({'type':'colleaguesplace', 'sql':'something'})); 
}


function add_task(){
    let div = document.getElementById('calendar');
    div.remove()
    let div2 = document.getElementById('calendar-box');
    div2.insertAdjacentHTML("beforeend",`
        <div id="calendar">
			<form>
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
				  <input type="text" id="lname" name="lastname" placeholder="Введите имя сотрудника..">
				</div>
			  </div>
			  <div class="row">
				<div class="col-25">
				  <label for="datapicker">Дата</label>
				</div>
				<div class="col-75">
					<!--<input type="text" value="dd-mm-yy" onfocus="this.select();lcs(this)" onclick="event.cancelBubble=true;this.select();lcs(this)">-->
					<input type="date" value="ДД/ММ/ГГГГГ">
				</div>
			  </div>
			  <div class="row">
				<div class="col-25">
				  <label for="mark">Метки</label>
				</div>
				<div class="col-75">
				  <select id="mark" name="mark">
					<option value="important">Важно</option>
					<option value="attention">Внимание</option>
					<option value="urgently">Срочно</option>
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
				<input onclick="render_calendar_m()" type="submit" value="Submit">
			  </div>
			</form>
		  
    </div><!-- content -->
    
  </div><!-- modal -->
  </div>`)

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
  









  async function render_calendar(){
    await collect_data()

    render_mp_menu()

    mycalendar()
    filters_left()
    render_calendar_m()
    taskplace()
    projectplace()
    colleaguesplace()

    mp_menu_animate()



  }