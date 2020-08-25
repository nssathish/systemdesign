import time
database = dict([('index.html', '<html>Hello World</html>')])

def get(key):
    time.sleep(1)
    return database.get(key)
