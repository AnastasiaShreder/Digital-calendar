from flask import Flask, request, make_response
import json

from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)


#import pymysql as pms

#conn = pms.connect(user = "root",passwd = "0000", host = "localhost", database = "EdgePoint")
#cursor = conn.cursor()





def create_data(data):
    if data["type"]=="colleaguesplace":
        # в data["user_id"] находится id пользователя. Необходимо вернуть его коллег по отделу в виде [{id_коллеги,имя}]
        return json.dumps([{"id":1,"name":"Андрей Тагиев"},{"id":2,"name":"Марк Шерман"},{"id":3,"name":"Анастасия Шредер"},{"id":4,"name":"Иван Конев"},{"id":5,"name":"Данил Лялин"}])
    if data["type"]=="filters":
        return json.dumps(["Конференция","Форум","Фестиваль","Встреча","Совещание","Заказ","Прочее"])
    if data["type"]=="projectplace":
        # в data["user_id"] находится id пользователя. Необходимо вернуть список его проектов[{id_проекта,имя_проекта}]
        #SELECT edgepoint.user_project.id_project FROM edgepoint.user_project WHERE edgepoint.user_project.id_user = %id пользователя%;
        #SELECT edgepoint.user_project.project_name FROM edgepoint.user_project WHERE edgepoint.user_project.id_user = %id пользователя%;
        return json.dumps([{"id":1,"name":"Проект 1"},{"id":2,"name":"Проект 2"},{"id":3,"name":"Проект 3"},{"id":4,"name":"Проект 4"},{"id":5,"name":"Проект 5"}])
    if data["type"]=="taskplace":
        #есть 3 поля:
        #   user_id - всегда непустое поле, содержит id пользователя
        #   project_id - id проекта, на который пользователь тыкнул
        #   second_user_id - id коллеги, на которого тыкнул пользователь
        #
        #свой user_id, id проекта, id юзера 
        return json.dumps([{"eventName":"Задача 1", "calendar":"Встреча", "color":"blue","date":"2020-04-27"},{"eventName":"Задача 3", "calendar":"Совещание", "color":"orange","date":"2020-04-04"}])
    
    
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
    

    #cursor.execute("SELECT id FROM EdgePoint.users where password = 'qwejf;fdkdflknrty' and email = 'danil.lyalin@hh.ru';")
    #for i in cursor.fetchall():
    #    print(i)
    	

    
    
    
    
    
    app.run(host= '192.168.0.121',port='5000')
    #conn.close()