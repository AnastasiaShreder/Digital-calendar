function get_tasks(){
    
    var request = new XMLHttpRequest();
    request.withCredentials = true;
    request.open('POST','http://85.142.164.100:5000/',false);//request.open('POST','/',false); //заменим, когда сайт обзаведется сервером
    request.addEventListener('readystatechange', function() {
        if ((request.readyState==4) && (request.status==200)) {
            responce = JSON.parse(request.responseText)
            for (i=0;i<responce.length;i++){
                tasks.push({eventName:responce[i].eventName, calendar:responce[i].calendar, color:responce[i].color, date:moment(responce[i].date)/*parse(responce[i].date)*/})
            }
        }
    }) 
    request.send(JSON.stringify({'type':'taskplace', 'sql':"something"})); 
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
    request.send(JSON.stringify({'type':'filters', 'sql':'something'})); 
}