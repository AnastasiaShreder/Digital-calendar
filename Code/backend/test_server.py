from flask import Flask, request, make_response
import json

from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)


#import pymysql as pms

#conn = pms.connect(user = "root",passwd = "0000", host = "localhost", database = "EdgePoint")
#cursor = conn.cursor()

tasks = [{"eventName":"Конференция 1", "calendar":"Конференция", "date":"2020-05-01", "mark":"Внимание","person":"", "descr":""},
         {"eventName":"Форум 1",       "calendar":"Форум",       "date":"2020-05-02", "mark":"Внимание","person":"", "descr":""},
         {"eventName":"Фестиваль 1",   "calendar":"Фестиваль",   "date":"2020-05-10", "mark":"Внимание","person":"", "descr":""},
         {"eventName":"Встреча 1",     "calendar":"Встреча",     "date":"2020-05-12", "mark":"Внимание","person":"", "descr":""},
         {"eventName":"Совещание 1",   "calendar":"Совещание",   "date":"2020-05-23", "mark":"Внимание","person":"", "descr":""},
         {"eventName":"Заказ 1",       "calendar":"Заказ",       "date":"2020-05-12", "mark":"Внимание","person":"", "descr":""},
         {"eventName":"Прочее 1",      "calendar":"Прочее",      "date":"2020-05-21", "mark":"Внимание","person":"", "descr":""},
         {"eventName":"Конференция 2", "calendar":"Конференция", "date":"2020-05-17", "mark":"Важно","person":"", "descr":""},
         {"eventName":"Форум 2",       "calendar":"Форум",       "date":"2020-05-09", "mark":"Важно","person":"", "descr":""},
         {"eventName":"Фестиваль 2",   "calendar":"Фестиваль",   "date":"2020-05-11", "mark":"Важно","person":"", "descr":""},
         {"eventName":"Встреча 2",     "calendar":"Встреча",     "date":"2020-05-04", "mark":"Важно","person":"", "descr":""},
         {"eventName":"Совещание 2",   "calendar":"Совещание",   "date":"2020-05-28", "mark":"Важно","person":"", "descr":""},
         {"eventName":"Заказ 2",       "calendar":"Заказ",       "date":"2020-05-25", "mark":"Важно","person":"", "descr":""},
         {"eventName":"Прочее 2",      "calendar":"Прочее",      "date":"2020-05-29", "mark":"Важно","person":"", "descr":""},
         {"eventName":"Конференция 3", "calendar":"Конференция", "date":"2020-05-20", "mark":"Важно","person":"", "descr":""},
         {"eventName":"Форум 3",       "calendar":"Форум",       "date":"2020-05-05", "mark":"Важно","person":"", "descr":""},
         {"eventName":"Фестиваль 3",   "calendar":"Фестиваль",   "date":"2020-05-24", "mark":"Важно","person":"", "descr":""},
         {"eventName":"Встреча 3",     "calendar":"Встреча",     "date":"2020-05-17", "mark":"Важно","person":"", "descr":""},
         {"eventName":"Совещание 3",   "calendar":"Совещание",   "date":"2020-05-13", "mark":"Важно","person":"", "descr":""},
         {"eventName":"Заказ 3",       "calendar":"Заказ",       "date":"2020-05-26", "mark":"Важно","person":"", "descr":""},
         {"eventName":"Прочее 3",      "calendar":"Прочее",      "date":"2020-05-23", "mark":"Важно","person":"", "descr":""},
         {"eventName":"Конференция 4", "calendar":"Конференция", "date":"2020-05-13", "mark":"Важно","person":"", "descr":""},
         {"eventName":"Форум 4",       "calendar":"Форум",       "date":"2020-05-07", "mark":"Важно","person":"", "descr":""},
         {"eventName":"Фестиваль 4",   "calendar":"Фестиваль",   "date":"2020-05-14", "mark":"Срочно","person":"", "descr":""},
         {"eventName":"Встреча 4",     "calendar":"Встреча",     "date":"2020-05-18", "mark":"Срочно","person":"", "descr":""},
         {"eventName":"Совещание 4",   "calendar":"Совещание",   "date":"2020-05-19", "mark":"Срочно","person":"", "descr":""},
         {"eventName":"Заказ 4",       "calendar":"Заказ",       "date":"2020-05-20", "mark":"Срочно","person":"", "descr":""},
         {"eventName":"Прочее 4",      "calendar":"Прочее",      "date":"2020-05-21", "mark":"Срочно","person":"", "descr":""},
         {"eventName":"Конференция 5", "calendar":"Конференция", "date":"2020-05-22", "mark":"Срочно","person":"", "descr":""},
         {"eventName":"Форум 5",       "calendar":"Форум",       "date":"2020-05-23", "mark":"Срочно","person":"", "descr":""},
         {"eventName":"Фестиваль 5",   "calendar":"Фестиваль",   "date":"2020-05-24", "mark":"Срочно","person":"", "descr":""},
         {"eventName":"Встреча 5",     "calendar":"Встреча",     "date":"2020-05-25", "mark":"Срочно","person":"", "descr":""},
         {"eventName":"Совещание 5",   "calendar":"Совещание",   "date":"2020-05-26", "mark":"Срочно","person":"", "descr":""},
         {"eventName":"Заказ 5",       "calendar":"Заказ",       "date":"2020-05-27", "mark":"Срочно","person":"", "descr":""},
         {"eventName":"Прочее 5",      "calendar":"Прочее",      "date":"2020-05-30", "mark":"Срочно","person":"", "descr":""},
         ]



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
        return json.dumps(tasks)
    
    
    if data["type"] == "login":
        if data["email"] =="user" and data["password"] == "user":
            return json.dumps({'isTrue':"True", 'user_id' : 1})
        
        if data["email"] =="l" and data["password"] == "p":
            return json.dumps({'isTrue':"True", 'user_id' : 239})
        return json.dumps({'isTrue':"False", 'user_id' : 0})



    if data["type"] == "add_task":
        tasks.append({"eventName":data["eventName"], "calendar":data["calendar"], "date":data["date"], "mark":data["mark"], "person":data["person"], "descr":data["descr"]})
        return True
    
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