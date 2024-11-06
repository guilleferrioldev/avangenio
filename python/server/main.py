from websockets_server import WebsocketServer

def main():
    with open(".env", "r") as f:
        env_vars = {}
        for line in f:
            key, value = line.strip().split("=")
            env_vars[key] = value

        host = env_vars["HOST"]
        port = int(env_vars["PORT"])
        buffer_size = int(env_vars["BUFFER_SIZE"])
    
        server = WebsocketServer(host, port, buffer_size)
        server.start()

if __name__ == "__main__":
    main()
     