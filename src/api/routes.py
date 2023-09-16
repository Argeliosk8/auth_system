"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)
app = Flask(__name__)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

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
    
@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    pw_to_check = request.json.get('password', None)
    user = User.query.filter_by(email = email).first()
    if user:
        is_correct = bcrypt.check_password_hash(user.pw_hash, pw_to_check)
    if is_correct == True:
        token = create_access_token(identity = email)
        return jsonify({"user": user.serialize(), "token": token}), 200
    else:
        return jsonify({"message": "unable to verify user"}), 400