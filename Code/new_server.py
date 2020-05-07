# -*- coding: utf-8 -*-
from flask import Flask, request, make_response, render_template
import json

from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)


import pymysql as pms

conn = pms.connect(user = "root",passwd = "password", host = "localhost", database = "EdgePoint")
cursor = conn.cursor()

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
			return json.dumps(list(map(lambda x: x[0], filters_set)))

	if data["type"]=="projectplace":
		cursor.execute("SELECT EdgePoint.user_project.id_project FROM EdgePoint.user_project WHERE EdgePoint.user_project.id_user = "+str(data["user_id"])+";")
		proj_ids = cursor.fetchall()
		user_projects = []
		if (len(proj_ids) == 0):
				return user_projects

		proj_ids = list(map(lambda x: x[0], proj_ids))

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
		cursor.execute("SELECT EdgePoint.user_task.id_task FROM EdgePoint.user_task WHERE EdgePoint.user_task.id_user = "+str(data["user_id"])+";")#data["user_id"])+";")
		task_ids = cursor.fetchall()
		user_tasks = []
		if (len(task_ids) == 0):
			return user_tasks
		task_ids = list(map(lambda x: x[0], task_ids))
		query = "SELECT id,name,deadline,description FROM EdgePoint.tasks where id="+str(task_ids[0])
		for i in range(1,len(task_ids)):
			query += " OR id=" + str(task_ids[i])
		query+=";"
		cursor.execute(query)
		task_names = cursor.fetchall()
		
		for i in task_names:
			cursor.execute("(SELECT tag FROM EdgePoint.tag_task where id_task = "+str(i[0])+" AND tag IN ('Конференция','Форум','Фестиваль','Встреча','Совещание','Заказ','Прочее'))"+
				"UNION (SELECT tag FROM EdgePoint.tag_task where id_task = "+str(i[0])+" AND tag IN ('Важно','Внимание','Срочно'))")
			tags=cursor.fetchall()
			cursor.execute("SELECT name FROM EdgePoint.projects WHERE id = (SELECT id_project FROM EdgePoint.task_project where id_task = "+str(i[0])+" )")
			task_project_name = cursor.fetchall()[0][0]
			cursor.execute("SELECT name,surname FROM EdgePoint.users where id = (SELECT id_user FROM EdgePoint.user_task where id_task = "+str(i[0])+" )")
			pers= cursor.fetchall()[0]
			user_tasks.append({"eventName":i[1],"date":str(i[2]),"descr":i[3],"mark":tags[1][0],"calendar":tags[0][0],"project":task_project_name,"person":pers[0] + " " + pers[1]})
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
	print(request.args)
	return render_template('index.html')

@app.route("/",methods = ['POST'])
#@cross_origin()
def returnlist():
	data = create_data(json.loads(request.data))
	response = make_response(data)
	response.headers.add("Access-Control-Allow-Credentials", "true")
	return response
 
if __name__ == "__main__":

	app.run(host= '127.0.0.1',port='5000')
	conn.close()