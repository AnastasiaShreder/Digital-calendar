function taskplace(){
    var div = document.getElementById('taskplace');
    
    var request = new XMLHttpRequest();
    request.withCredentials = true;
    request.open('POST','http://85.142.164.100:5000/',true);//request.open('POST','/',false); //заменим, когда сайт обзаведется сервером
	request.addEventListener('readystatechange', function() {
	    if ((request.readyState==4) && (request.status==200)) {
            responce = JSON.parse(request.responseText)
			for (i=0;i<responce.length;i++){
                div.insertAdjacentHTML("beforeend", `<div class="task-elem">
                <p><input type="checkbox" name="task${i}" value="task${i}">${responce[i]}</p>
                </div>`);
            }
    
		}
	}); 
    request.send(JSON.stringify({'type':'taskplace', 'sql':'something'})); 
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

function mycalendar(){
    var div = document.getElementById('mycalendar');
	for (i=0; i<100;i++){
		div.insertAdjacentHTML("beforeend", `<li><a href="#">Проект ${i}</a></li>`);
	}
}