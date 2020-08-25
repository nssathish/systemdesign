from flask import Flask, request, redirect, abort, Response
import datetime as dt 
import database, redis

app = Flask(__name__)
redis_app = redis.Redis('localhost', 6379, db=0)

@app.route('/<key>', methods=['GET'])
def rate_limit_and_serve(key):
    
    headers = request.headers
    user = headers['user']
    if redis_app.exists(user):
        now_str = dt.datetime.strftime(dt.datetime.now(), '%H:%M:%S')
        now = dt.datetime.strptime(now_str, '%H:%M:%S')
        print(str(redis_app.get(user)))
        cached_time = dt.datetime.strptime(redis_app.get(user).decode(), '%H:%M:%S')
        difference = now - cached_time 
        print(type(difference))
        print(difference.total_seconds())
        if difference.total_seconds() < 5:
            abort(429, 'Too many requests')
        
    now = dt.datetime.now().strftime('%H:%M:%S')
    redis_app.set(user, now)
    return database.get(key) + '\n'