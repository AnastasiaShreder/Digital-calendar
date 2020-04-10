function taskplace(){
    var div = document.getElementById('taskplace');
    for (i=0; i<100;i++){
        div.insertAdjacentHTML("beforeend", `<div class="task-elem">
        <p><input type="checkbox" name="task${i}" value="task${i}">  Задача ${i}</p>
        </div>`);
    }
}

function projectplace(){
    var div = document.getElementById('projectplace');
    for (i=0; i<100;i++){
        div.insertAdjacentHTML("beforeend", `<a class="button" href="index3.html">
        <div class="project-elem">
            <img src="icons/folder.png">
            <p>Проект ${i} </p>
        </div>
        </a>`);
    }
}

function colleaguesplace(){
    var div = document.getElementById('colleaguesplace');
    let col_list = ["Андрей Тагиев","Марк Шерман","Анастасия Шредер","Иван Конев","Данил Лялин"]
    for (i=0; i<col_list.length; i++){
        div.insertAdjacentHTML("beforeend", `<a class="button" href="index3.html">
        <div class="сolleagues-elem">
            <img src="icons/person.png">
            <p>${col_list[i]}</p>
        </div>
        </a>`);
    }
}

function mycalendar(){
    var div = document.getElementById('mycalendar');
	for (i=0; i<100;i++){
		div.insertAdjacentHTML("beforeend", `<li><a href="#">Проект ${i}</a></li>`);
	}
}