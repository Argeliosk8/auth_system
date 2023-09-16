"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)
app = Flask(__name__)
bcrypt = Bcrypt(app)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email and password:
        pw_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        newUser = User(name = name, email = email, pw_hash = pw_hash, is_active = True)
        db.session.add(newUser)
        db.session.commit()
        return jsonify({"message": "user successfully registered"}), 200
    else:
        return jsonify({"message": "there was an error sigining up"}), 400