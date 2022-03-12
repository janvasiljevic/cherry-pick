from time import sleep
import redis
from debug import initialize_flask_server_debugger_if_needed


red = redis.StrictRedis(
    'redis', 6379, charset="utf-8", decode_responses=True, password="redis-pass", username="default")
sub = red.pubsub()
sub.subscribe('usernames')


a = 0


def stream():
    global a
    print("stream")
    red.publish('usernames', "int: " + str(a))
    a += 1


def read():
    print("read")
    print(sub.get_message())


if __name__ == "__main__":
    initialize_flask_server_debugger_if_needed()

    print("hejla hoyla geyla")
    while True:
        stream()
        sleep(1)
        read()
        sleep(1)
        print(".")
