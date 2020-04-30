from flask import Flask, request, make_response
import json

from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)

def create_data(data):
    if data["type"]=="colleaguesplace":
        return json.dumps(["Андрей Тагиев","Марк Шерман","Анастасия Шредер","Иван Конев","Данил Лялин"])
    if data["type"]=="filters":
        return json.dumps(["Конференция","Форум","Фестиваль","Встреча","Совещание","Заказ","Прочее"])
    if data["type"]=="projectplace":
        return json.dumps(["Проект 1","Проект 2","Проект 3","Проект 4","Проект 5","Проект 6","Проект 7","Проект 8"])
    if data["type"]=="taskplace":
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