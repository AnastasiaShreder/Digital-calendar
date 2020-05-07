# -*- coding: utf-8 -*-
from flask import Flask, request, make_response, render_template
import json

#from flask_cors import CORS, cross_origin
app = Flask(__name__)
#cors = CORS(app)


import pymysql as pms

conn = pms.connect(user = "root",passwd = "password", host = "localhost", database = "EdgePoint")
cursor = conn.cursor()

tasks = [{"eventName":"Конференция 1", "calendar":"Конференция", "date":"2020-05-01", "mark":"Внимание","person":"", "descr":"", "project":"Проект 1"},
         {"eventName":"Форум 1",       "calendar":"Форум",       "date":"2020-05-02", "mark":"Внимание","person":"", "descr":"", "project":"Проект 1"},
         {"eventName":"Фестиваль 1",   "calendar":"Фестиваль",   "date":"2020-05-10", "mark":"Внимание","person":"", "descr":"", "project":"Проект 1"},
         {"eventName":"Встреча 1",     "calendar":"Встреча",     "date":"2020-05-12", "mark":"Внимание","person":"", "descr":"", "project":"Проект 1"},
         {"eventName":"Совещание 1",   "calendar":"Совещание",   "date":"2020-05-23", "mark":"Внимание","person":"", "descr":"", "project":"Проект 1"},
         {"eventName":"Заказ 1",       "calendar":"Заказ",       "date":"2020-05-12", "mark":"Внимание","person":"", "descr":"", "project":"Проект 1"},
         {"eventName":"Прочее 1",      "calendar":"Прочее",      "date":"2020-05-21", "mark":"Внимание","person":"", "descr":"", "project":"Проект 1"},
         {"eventName":"Конференция 2", "calendar":"Конференция", "date":"2020-05-17", "mark":"Важно","person":"", "descr":"", "project":"Проект 2"},
         {"eventName":"Форум 2",       "calendar":"Форум",       "date":"2020-05-09", "mark":"Важно","person":"", "descr":"", "project":"Проект 2"},
         {"eventName":"Фестиваль 2",   "calendar":"Фестиваль",   "date":"2020-05-11", "mark":"Важно","person":"", "descr":"", "project":"Проект 2"},
         {"eventName":"Встреча 2",     "calendar":"Встреча",     "date":"2020-05-04", "mark":"Важно","person":"", "descr":"", "project":"Проект 2"},
         {"eventName":"Совещание 2",   "calendar":"Совещание",   "date":"2020-05-28", "mark":"Важно","person":"", "descr":"", "project":"Проект 2"},
         {"eventName":"Заказ 2",       "calendar":"Заказ",       "date":"2020-05-25", "mark":"Важно","person":"", "descr":"", "project":"Проект 2"},
         {"eventName":"Прочее 2",      "calendar":"Прочее",      "date":"2020-05-29", "mark":"Важно","person":"", "descr":"", "project":"Проект 2"},
         {"eventName":"Конференция 3", "calendar":"Конференция", "date":"2020-05-20", "mark":"Важно","person":"", "descr":"", "project":"Проект 2"},
         {"eventName":"Форум 3",       "calendar":"Форум",       "date":"2020-05-05", "mark":"Важно","person":"", "descr":"", "project":"Проект 2"},
         {"eventName":"Фестиваль 3",   "calendar":"Фестиваль",   "date":"2020-05-24", "mark":"Важно","person":"", "descr":"", "project":"Проект 3"},
         {"eventName":"Встреча 3",     "calendar":"Встреча",     "date":"2020-05-17", "mark":"Важно","person":"", "descr":"", "project":"Проект 3"},
         {"eventName":"Совещание 3",   "calendar":"Совещание",   "date":"2020-05-13", "mark":"Важно","person":"", "descr":"", "project":"Проект 3"},
         {"eventName":"Заказ 3",       "calendar":"Заказ",       "date":"2020-05-26", "mark":"Важно","person":"", "descr":"", "project":"Проект 3"},
         {"eventName":"Прочее 3",      "calendar":"Прочее",      "date":"2020-05-23", "mark":"Важно","person":"", "descr":"", "project":"Проект 3"},
         {"eventName":"Конференция 4", "calendar":"Конференция", "date":"2020-05-13", "mark":"Важно","person":"", "descr":"", "project":"Проект 3"},
         {"eventName":"Форум 4",       "calendar":"Форум",       "date":"2020-05-07", "mark":"Важно","person":"", "descr":"", "project":"Проект 3"},
         {"eventName":"Фестиваль 4",   "calendar":"Фестиваль",   "date":"2020-05-14", "mark":"Срочно","person":"", "descr":"", "project":"Проект 5"},
         {"eventName":"Встреча 4",     "calendar":"Встреча",     "date":"2020-05-18", "mark":"Срочно","person":"", "descr":"", "project":"Проект 3"},
         {"eventName":"Совещание 4",   "calendar":"Совещание",   "date":"2020-05-19", "mark":"Срочно","person":"", "descr":"", "project":"Проект 3"},
         {"eventName":"Заказ 4",       "calendar":"Заказ",       "date":"2020-05-20", "mark":"Срочно","person":"", "descr":"", "project":"Проект 3"},
         {"eventName":"Прочее 4",      "calendar":"Прочее",      "date":"2020-05-21", "mark":"Срочно","person":"", "descr":"", "project":"Проект 3"},
         {"eventName":"Конференция 5", "calendar":"Конференция", "date":"2020-05-22", "mark":"Срочно","person":"", "descr":"", "project":"Проект 3"},
         {"eventName":"Форум 5",       "calendar":"Форум",       "date":"2020-05-23", "mark":"Срочно","person":"", "descr":"", "project":"Проект 3"},
         {"eventName":"Фестиваль 5",   "calendar":"Фестиваль",   "date":"2020-05-24", "mark":"Срочно","person":"", "descr":"", "project":"Проект 3"},
         {"eventName":"Встреча 5",     "calendar":"Встреча",     "date":"2020-05-25", "mark":"Срочно","person":"", "descr":"", "project":"Проект 3"},
         {"eventName":"Совещание 5",   "calendar":"Совещание",   "date":"2020-05-26", "mark":"Срочно","person":"", "descr":"", "project":"Проект 3"},
         {"eventName":"Заказ 5",       "calendar":"Заказ",       "date":"2020-05-27", "mark":"Срочно","person":"", "descr":"", "project":"Проект 4"},
         {"eventName":"Прочее 5",      "calendar":"Прочее",      "date":"2020-05-30", "mark":"Срочно","person":"", "descr":"", "project":"Проект 4"},
         ]



def create_data(data):
    if data["type"]=="colleaguesplace":
	    cursor.execute("SELECT id FROM EdgePoint.users where EdgePoint.users.unit = (SELECT unit FROM EdgePoint.users where EdgePoint.users.id = "+ str(data["user_id"])+") AND EdgePoint.users.id != "+str(data["user_id"])+";")
	    colleagues = []   
	    col_ids = cursor.fetchall()
	    if (len(col_ids) == 0):
			return colleagues

	    query = "SELECT id,name,surname FROM EdgePoint.users where id="+str(col_ids[0][0])
	    for i in range(1,len(col_ids)):
	    	query += " OR id=" + str(col_ids[i][0])
	    query+=";"

	    cursor.execute(query)
	    col_names = cursor.fetchall()
	    for i in col_names:
	    	colleagues.append({"id":i[0],"name":i[1]+" "+i[2]})

	    return json.dumps(colleagues)

    if data["type"]=="filters":
    		cursor.execute("SELECT tag FROM EdgePoint.tag_task;")
    		filters_set = set(cursor.fetchall())
    		return json.dumps(map(lambda x: x[0], filters_set))

    if data["type"]=="projectplace":
		cursor.execute("SELECT EdgePoint.user_project.id_project FROM EdgePoint.user_project WHERE EdgePoint.user_project.id_user = "+str(data["user_id"])+";")
		proj_ids = cursor.fetchall()
		user_projects = []
		if (len(proj_ids) == 0):
				return user_projects

		proj_ids = map(lambda x: x[0], proj_ids)

		query = "SELECT id,name FROM EdgePoint.projects where id="+str(proj_ids[0])
		for i in range(1,len(proj_ids)):
			query += " OR id=" + str(proj_ids[i])
		query+=";"
		cursor.execute(query)

		proj_names = cursor.fetchall()
		for i in proj_names:
				user_projects.append({"id":i[0],"name":i[1]})
		return json.dumps(user_projects)

    if data["type"]=="taskplace":
    	#здесь возвращаются ВООБЩЕ все задачи пользователя,аналогично projectplace
		cursor.execute("SELECT EdgePoint.user_task.id_task FROM EdgePoint.user_task WHERE EdgePoint.user_task.id_user = 5"+str(data["user_id"])+";")
		task_ids = cursor.fetchall()
		user_tasks = []
		if (len(task_ids) == 0):
			return user_tasks
		task_ids = map(lambda x: x[0], task_ids)
		query = "SELECT id,name FROM EdgePoint.tasks where id="+str(task_ids[0])
		for i in range(1,len(task_ids)):
			query += " OR id=" + str(task_ids[i])
		query+=";"
		cursor.execute(query)
		task_names = cursor.fetchall()
		for i in task_names:
			user_tasks.append({"id":i[0],"name":i[1]})
		return json.dumps(user_tasks)
		
    if data["type"] == "login":
		if data["email"] =="user" and data["password"] == "user":
			return json.dumps({'isTrue':"True", 'user_id' : 0})
		#if data["email"] =="l" and data["password"] == "p":
		 #   return json.dumps({'isTrue':"True", 'user_id' : 239})
		cursor.execute("select id from EdgePoint.users where password = '"+str(data["password"])+"' and email = '"+str(data["email"])+"';")
		res =cursor.fetchall()
		if len(res) == 0:
			return json.dumps({'isTrue':"False", 'user_id' : 0})
		else:
			return json.dumps({'isTrue':"True", 'user_id' : res[0][0]})
        	



    if data["type"] == "add_task":
		#Примечания:
		#Дата в формате ГГГГ-ММ-ДД
		#data["calendar"] нигде не используется,а то,глобальная или не глобальная задача зависит от проекта
        # в запросе еще есть data["user_id"],но я его не использую

		cursor.execute("INSERT INTO `EdgePoint`.`tasks` (		`name`,		`deadline`,		`color`,		`description`) VALUES ("+data["eventName"]+","+data["date"]+",ff00ff,"+data["descr"]+");")
		conn.commit()
		cursor.execute("SELECT LAST_INSERT_ID();")
		new_task_id = cursor.fetchall()[0][0]
		print(new_task_id)
		#пердполагаю,что в data["person"] список из всех,кого надо прикрепить к задаче
		for i in data["person"]:
			cursor.execute("INSERT INTO `EdgePoint`.`user_task` (`id_user`, `id_task`) VALUES ("+str(i)+", "+str(new_task_id)+");")
		cursor.execute("INSERT INTO `EdgePoint`.`task_project`	(`id_task`,	`id_project`) VALUES ("+str(new_task_id)+", "+str(data["project"])+");")
		#пердполагаю,что в #data["mark"] хранится 1 элемент - тэг задачи
		cursor.execute("INSERT INTO `EdgePoint`.`tag_task`	(`tag`,	`id_task`)	VALUES	("+str(data["mark"])+","+str(new_task_id)+");")
		conn.commit()
        #tasks.append({"eventName":data["eventName"], "calendar":data["calendar"], "date":data["date"], "mark":data["mark"], "person":data["person"], "descr":data["descr"], "project":data["project"]})
		return "True"
    
    return json.dumps([])


@app.route("/",methods=['GET'])
def simple():
    return render_template('index.html')

@app.route("/",methods = ['POST'])
@cross_origin()
def returnlist():
	data = create_data(json.loads(request.data))
	response = make_response(data)
	#response.headers.add("Access-Control-Allow-Credentials", "true")
	return response


 
if __name__ == "__main__":

    app.run(host= '127.0.0.1',port='5000')
    conn.close()