from flask import Flask, request, make_response
import json

from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)

def create_data(data):
    if data["type"]=="colleaguesplace":
        #выдать отдел для data["user_id"]
        #вернуть id и имена работников отдела
        return json.dumps([{"user_id": 2, "name":"Андрей Тагиев"},{"user_id": 3, "name":"Марк Шерман"},{"user_id": 4, "name":"Анастасия Шредер"},{"user_id": 5, "name":"Иван Конев"},{"user_id": 6, "name":"Данил Лялин"}])
    if data["type"]=="filters":
        return json.dumps(["Конференция","Форум","Фестиваль","Встреча","Совещание","Заказ","Прочее"])
    if data["type"]=="projectplace":
        #data["user_id"] получить список проектов по user_id 
        #SELECT edgepoint.user_project.id_project FROM edgepoint.user_project WHERE edgepoint.user_project.id_user = %id пользователя%;
        #SELECT edgepoint.user_project.project_name FROM edgepoint.user_project WHERE edgepoint.user_project.id_user = %id пользователя%;
        return json.dumps([{"id":1,"project":"Проект 1"},{"id":2,"project":"Проект 2"},{"id":3,"project":"Проект 3"},"Проект 4","Проект 5","Проект 6","Проект 7","Проект 8"])
    if data["type"]=="taskplace":
        #свой user_id, id проекта, id юзера 
        return json.dumps([{"eventName":"Задача 1", "calendar":"Встреча", "color":"blue","date":"2020-04-27"},{"eventName":"Задача 3", "calendar":"Мероприятие", "color":"orange","date":"2020-04-04"}])
    
    
    if data["type"] == "login":
        if data["email"] =="user" and data["password"] == "user":
            return json.dumps({'isTrue':"True", 'user_id' : 1})
        
        if data["email"] =="l" and data["password"] == "p":
            return json.dumps({'isTrue':"True", 'user_id' : 239})
        return json.dumps({'isTrue':"False", 'user_id' : 0})
    
    return json.dumps([])


@app.route("/",methods=['GET'])
def simple():
    print(request.args)
    return '<a>ТУТ НИЧЕГО НЕТ</a>'

@app.route("/",methods = ['POST'])
@cross_origin()
def returnlist():
    data = create_data(json.loads(request.data))
    response = make_response(data)
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response


 
if __name__ == "__main__":
    app.run(host= '192.168.0.121',port='5000')