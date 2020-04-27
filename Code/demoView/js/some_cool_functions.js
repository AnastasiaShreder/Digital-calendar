let filter = []
tasks = []

function get_tasks(){
    return new Promise(function(resolve, reject) {
        
        var request = new XMLHttpRequest();
        request.withCredentials = true;
        request.open('POST','http://85.142.164.100:5000/',true);//request.open('POST','/',false); //заменим, когда сайт обзаведется сервером
        request.addEventListener('readystatechange', function() {
            if ((request.readyState==4) && (request.status==200)) {
                responce = JSON.parse(request.responseText)
                for (i=0;i<responce.length;i++){
                    tasks.push({eventName:responce[i].eventName, calendar:responce[i].calendar, color:responce[i].color, date:moment(responce[i].date)/*parse(responce[i].date)*/})
                }
                resolve(true)
            }
        }); 
        request.send(JSON.stringify({'type':'taskplace', 'sql':'something'})); 
    })
}

function get_filters(){
    return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('POST','http://85.142.164.100:5000/',true);//request.open('POST','/',false);
	request.addEventListener('readystatechange', function() {
	    if ((request.readyState==4) && (request.status==200)) {
            ret = []
            responce = JSON.parse(request.responseText)
			for (i=0;i<responce.length;i++){
                ret.push(responce[i])
            }
            filter = ret
            resolve(ret)
		}
    }); 
    request.send(JSON.stringify({'type':'filters', 'sql':'something'})); 
});}



async function collect_data(){
    await get_tasks()
    await get_filters()
    
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
                div.insertAdjacentHTML("beforeend", `<a class="button" href="index3.html">
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
                div.insertAdjacentHTML("beforeend", `<a class="button" href="index3.html">
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



async function render_all(){
    await collect_data()
    mycalendar()
    filters_left()
    render_calendar_m()
    taskplace()
    projectplace()
    colleaguesplace()
}



function apply_filters(){
    //тут пройдемся по фильтрам и отправим запрос на бд
}

function apply_right(){
 // тут пройдемся по выбранным задачам и отправим запрос на бд
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
