from flask import Flask, request, make_response
import json

from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)

def create_data(data):
    if data["type"]=="colleaguesplace":
        return json.dumps(["Андрей Тагиев","Марк Шерман","Анастасия Шредер","Иван Конев","Данил Лялин"])
    if data["type"]=="projectplace":
        return json.dumps(["Проект 1","Проект 2","Проект 3"])
    if data["type"]=="taskplace":
        return json.dumps(["Задача 1","Задача 2","Задача 3"])
    return json.dumps([])

@app.route("/",methods=['GET'])
def simple():
    print(request.args)
    return "тут ничего нет"

@app.route("/",methods = ['POST'])
@cross_origin()
def returnlist():
    data = create_data(json.loads(request.data))
    response = make_response(data)
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response


 
if __name__ == "__main__":
    app.run(host= '192.168.0.121',port='5000')