function get_tasks(){
    tasks = []
    var request = new XMLHttpRequest();
    request.open('POST',url,false);
    request.addEventListener('readystatechange', function() {
        if ((request.readyState==4) && (request.status==200)) {
            responce = JSON.parse(request.responseText)
            for (i=0;i<responce.length;i++){    
                tasks.push({eventName:responce[i].eventName, calendar:responce[i].calendar, color:colors[responce[i].calendar], date:moment(responce[i].date), mark:responce[i].mark, person:responce[i].person, descr:responce[i].descr, checked:"True", project:responce[i].project})
            }
        }
    }) 
    request.send(JSON.stringify({'type':'taskplace', 'user_id':user_id})); 
}

function get_filters(){
    filter = ["Конференция", "Форум", "Фестиваль", "Встреча", "Совещание", "Заказ", "Прочее"]
}

function get_colleagues(){
    var request = new XMLHttpRequest();
    
    request.open('POST',url,false);
	request.addEventListener('readystatechange', function() {
	    if ((request.readyState==4) && (request.status==200)) {
        responce = JSON.parse(request.responseText)
		for (i=0;i<responce.length;i++){
            colleagues.push({id : responce[i].id, name : responce[i].name})
        }
		}}); 
    request.send(JSON.stringify({'type':'colleaguesplace', 'user_id':user_id})); 
}

function get_projects(){
    var request = new XMLHttpRequest();
    
    request.open('POST',url,false);
	request.addEventListener('readystatechange', function() {
        if ((request.readyState==4) && (request.status==200)) {
            responce = JSON.parse(request.responseText)
            for (i=0;i<responce.length;i++){
                //projects.push({id : responce[i].id, name : responce[i].name,location : responce[i].location, date : responce[i].date, descr : responce[i].descr, members: responce[i].members, isglobal : responce[i].isglobal})
                projects.push({id : responce[i].id, name : responce[i].name,location : "место", date : "2020-06-06", descr : "описаниеееее", members: "Иван Конев", isglobal : "True"})
            }
            }}); 
    request.send(JSON.stringify({'type':'projectplace', 'user_id':user_id})); 
}