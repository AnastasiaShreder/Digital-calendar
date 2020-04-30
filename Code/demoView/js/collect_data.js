function get_tasks(filters = filter,project_id = 0, u_id = 0){
    tasks = []
    var request = new XMLHttpRequest();
    request.withCredentials = true;
    request.open('POST','http://85.142.164.100:5000/',false);//request.open('POST','/',false); //заменим, когда сайт обзаведется сервером
    request.addEventListener('readystatechange', function() {
        if ((request.readyState==4) && (request.status==200)) {
            responce = JSON.parse(request.responseText)
            for (i=0;i<responce.length;i++){
                if (filters.indexOf(responce[i].calendar)!=-1){
                tasks.push({eventName:responce[i].eventName, calendar:responce[i].calendar, color:responce[i].color, date:moment(responce[i].date)})}
            }
        }
    }) 
    request.send(JSON.stringify({'type':'taskplace', 'user_id':user_id, 'project_id':project_id, 'second_user_id': u_id})); 
}

function get_filters(){
    var request = new XMLHttpRequest();
    request.open('POST','http://85.142.164.100:5000/',false);//request.open('POST','/',false);
	request.addEventListener('readystatechange', function() {
	    if ((request.readyState==4) && (request.status==200)) {
            ret = []
            responce = JSON.parse(request.responseText)
			for (i=0;i<responce.length;i++){
                ret.push(responce[i])
            }
            filter = ret
		}
    })
    request.send(JSON.stringify({'type':'filters'})); 
}


function get_colleagues(){
    var request = new XMLHttpRequest();
    
    request.open('POST','http://85.142.164.100:5000/',false);//request.open('POST','/',false);
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
    
    request.open('POST','http://85.142.164.100:5000/',false);//request.open('POST','/',false);
	request.addEventListener('readystatechange', function() {
        if ((request.readyState==4) && (request.status==200)) {
            responce = JSON.parse(request.responseText)
            for (i=0;i<responce.length;i++){
                projects.push({id : responce[i].id, name : responce[i].name})
            }
            }}); 
    request.send(JSON.stringify({'type':'projectplace', 'user_id':user_id})); 
}