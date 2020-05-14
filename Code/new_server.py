# -*- coding: utf-8 -*-
from flask import Flask, request, make_response, render_template
import json

from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)

import pymysql as pms

database_pass = "password"

def names_to_ids(namesList):
    idList = []
    for i in namesList:
        user_name = i.split(" ")
        conn = pms.connect(user = "root",passwd = database_pass, host = "localhost", database = "EdgePoint")
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM EdgePoint.users where EdgePoint.users.name = '"+ str(user_name[0])+"' AND EdgePoint.users.surname = '"+ str(user_name[1])+"';")
        idList.append(cursor.fetchall()[0][0])
        cursor.close()
    return idList


def create_data(data):
    if data["type"]=="colleaguesplace":
        conn = pms.connect(user = "root",passwd = database_pass, host = "localhost", database = "EdgePoint")
        cursor = conn.cursor()
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
        cursor.close()
        for i in col_names:
            colleagues.append({"id":i[0],"name":i[1]+" "+i[2]})

        return json.dumps(colleagues)


    if data["type"]=="projectplace":
        conn = pms.connect(user = "root",passwd = database_pass, host = "localhost", database = "EdgePoint")
        cursor = conn.cursor()
        cursor.execute("SELECT EdgePoint.user_project.id_project FROM EdgePoint.user_project WHERE EdgePoint.user_project.id_user = "+str(data["user_id"])+";")
        proj_ids = cursor.fetchall()
        user_projects = []
        if (len(proj_ids) == 0):
            return user_projects

        proj_ids = list(map(lambda x: x[0], proj_ids))

        query = "SELECT id,name,deadline,description,global,location FROM EdgePoint.projects where id="+str(proj_ids[0])
        for i in range(1,len(proj_ids)):
            query += " OR id=" + str(proj_ids[i])
        query+=";"
        cursor.execute(query)

        proj_names = cursor.fetchall()
        cursor.close()

        for i in proj_names:
            project_data = {"id":i[0],"name":i[1],"date":str(i[2]),"descr":i[3]}
            if i[4] == 1 :
                project_data.update({"isglobal" : "True"})
            else:
                project_data.update({"isglobal" : "False"})
            if i[5] == None :
                project_data.update({"location" : ""})
            else:
                project_data.update({"location" : i[5]})
            conn = pms.connect(user = "root",passwd = database_pass, host = "localhost", database = "EdgePoint")
            cursor = conn.cursor()
            cursor.execute("SELECT name,surname FROM `EdgePoint`.`users` WHERE id in (SELECT id_user FROM EdgePoint.user_project WHERE EdgePoint.user_project.id_project = "+str(i[0])+");")
            names_fetched = cursor.fetchall()
            names = []
            for j in names_fetched:
                names.append(" ".join(j))
            cursor.close()
            project_data.update({"members":names})
            user_projects.append(project_data)
        return json.dumps(user_projects)

    if data["type"] == "add_task":
        conn = pms.connect(user = "root",passwd = database_pass, host = "localhost", database = "EdgePoint")
        cursor = conn.cursor()
        cursor.execute("INSERT INTO `EdgePoint`.`projects` (`name`, `deadline`,  `global`,  `description`,`location`) VALUES ('"+data["name"]+"','"+data["date"]+"','"+str(1)+"','"+data["descr"]+"','"+data["location"]+"');")
        conn.commit()
        cursor.execute("SELECT LAST_INSERT_ID();")
        new_project_id = cursor.fetchall()[0][0]
        new_users_id = names_to_ids(data["members"])
        for i in new_users_id:
            cursor.execute("INSERT INTO `EdgePoint`.`user_project` (`id_user`, `id_project`,`is_admin`) VALUES ("+str(i)+", "+str(new_project_id)+", "+str(0)+");")
        conn.commit()
        cursor.close()
        return "True"

    if data["type"] == "deleteproject":
        conn = pms.connect(user = "root",passwd = database_pass, host = "localhost", database = "EdgePoint")
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM `EdgePoint`.`projects` WHERE name = '"+str(data["project_name"])+"';")
        proj_id = cursor.fetchall()[0][0]
        cursor.execute("DELETE FROM `EdgePoint`.`tasks` WHERE id in (SELECT EdgePoint.task_project.id_task FROM EdgePoint.task_project WHERE EdgePoint.task_project.id_project = "+str(proj_id)+");")
        cursor.execute("DELETE FROM `EdgePoint`.`projects` WHERE id = "+str(proj_id)+";")
        conn.commit()
        cursor.close()
        return "True"

    if data["type"]=="taskplace":
        conn = pms.connect(user = "root",passwd = database_pass, host = "localhost", database = "EdgePoint")
        cursor = conn.cursor()
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
                "UNION (SELECT tag FROM EdgePoint.tag_task where id_task = "+str(i[0])+" AND tag IN ('Важно','Внимание','Срочно','Без метки'))")
            tags=cursor.fetchall()
            cursor.execute("SELECT name FROM EdgePoint.projects WHERE id = (SELECT id_project FROM EdgePoint.task_project where id_task = "+str(i[0])+" )")
            task_project_name = cursor.fetchall()[0][0]
            cursor.execute("SELECT name,surname FROM EdgePoint.users where id = (SELECT id_user FROM EdgePoint.user_task where id_task = "+str(i[0])+" )")
            pers= cursor.fetchall()[0]
            user_tasks.append({"eventName":i[1],"date":str(i[2]),"descr":i[3],"mark":tags[1][0],"calendar":tags[0][0],"project":task_project_name,"person":pers[0] + " " + pers[1]})
        cursor.close()
        return json.dumps(user_tasks)

    if data["type"] == "add_task":
        #Примечания:
        #Дата в формате ГГГГ-ММ-ДД
        #data["calendar"] нигде не используется,а то,глобальная или не глобальная задача зависит от проекта
        # в запросе еще есть data["user_id"],но я его не использую
        conn = pms.connect(user = "root",passwd = database_pass, host = "localhost", database = "EdgePoint")
        cursor = conn.cursor()
        cursor.execute("INSERT INTO `EdgePoint`.`tasks` (       `name`,     `deadline`,     `color`,        `description`) VALUES ('"+data["eventName"]+"','"+data["date"]+"',ff00ff,'"+data["descr"]+"');")
        conn.commit()
        cursor.execute("SELECT LAST_INSERT_ID();")
        new_task_id = cursor.fetchall()[0][0]
        new_users_id = names_to_ids(data["person"])
        for i in new_users_id:
            cursor.execute("INSERT INTO `EdgePoint`.`user_task` (`id_user`, `id_task`) VALUES ("+str(i)+", "+str(new_task_id)+");")
        cursor.execute("INSERT INTO `EdgePoint`.`task_project`  (`id_task`, `id_project`) VALUES ("+str(new_task_id)+", "+str(data["project"])+");")
        #пердполагаю,что в #data["mark"] хранится 1 элемент - тэг задачи
        cursor.execute("INSERT INTO `EdgePoint`.`tag_task`  (`tag`, `id_task`)  VALUES  ("+str(data["mark"])+","+str(new_task_id)+");")
        conn.commit()
        cursor.close()
        return "True"

    if data["type"] == "login":
        conn = pms.connect(user = "root",passwd = database_pass, host = "localhost", database = "EdgePoint")
        cursor = conn.cursor()
        cursor.execute("select id from EdgePoint.users where password = '"+str(data["password"])+"' and email = '"+str(data["email"])+"';")
        res =cursor.fetchall()
        cursor.close()
        if len(res) == 0:
            return json.dumps({'isTrue':"False", 'user_id' : 0})
        else:
            return json.dumps({'isTrue':"True", 'user_id' : res[0][0]})

    return json.dumps([])


@app.route("/",methods=['GET'])
def simple():
	return render_template('index.html')

@app.route("/",methods = ['POST'])
@cross_origin()
def returnlist():
    data = create_data(json.loads(request.data))
    response = make_response(data)
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response
 
if __name__ == "__main__":

    app.run(host= '192.168.0.121',port='5001')
    conn.close()