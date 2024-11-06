import os

def generate_env():
  with open(".env", "w") as env_file:
    env_file.write("HOST=localhost\n")
    env_file.write("PORT=3000\n")
    env_file.write("BUFFER_SIZE=1000000")

def main():
  generate_env()

if __name__ == "__main__":
  main()