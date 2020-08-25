from flask import Flask, request, redirect, abort, Response
import datetime, database

app = Flask(__name__)

accesses = dict()

@app.route('/<key>', methods=['GET'])
def rate_limit_and_serve(key):
    
    headers = request.headers
    user = headers['user']
    if headers['user'] in accesses:
        difference = datetime.datetime.now() - accesses[user]
        if difference.total_seconds() < 5:
            abort(429, 'Too many requests')
        
    accesses[user] = datetime.datetime.now()
    return database.get(key) + '\n'

# Redis implementation
# from flask import Flask, request, redirect, abort, Response
# import datetime, database, redis

# app = Flask(__name__)
# redis_app = redis.Redis('localhost', 6379, db=0)
# # accesses = dict()

# @app.route('/<key>', methods=['GET'])
# def rate_limit_and_serve(key):
    
#     headers = request.headers
#     user = headers['user']
#     if redis_app.exists(user):
#         difference = datetime.datetime.now() - redis_app.get(user)
#         if difference.total_seconds() < 5:
#             abort(429, 'Too many requests')
        
#     redis_app.set(user, datetime.datetime.now())
#     return database.get(key) + '\n'