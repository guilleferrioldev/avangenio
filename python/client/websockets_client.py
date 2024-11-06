import socket
import threading
import string
import random
import time
import json
from typing import Tuple, List
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

txt = "chains.txt"

class WebsocketClient:
  """
  WebsocketClient class to manage WebSocket connections.  
  """

  def __init__(self, host: str, port: int, buffer_size: int) -> None:
    self.host = host
    self.port = port
    self.buffer_size = buffer_size
    self.socket = None
    self.thread = None
    self.connected = False
    
  def connect(self) -> None:
    """
    Establishes the WebSocket connection.
    """
    try:
      self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
      self.socket.connect((self.host, self.port))
      self.connected = True
      self.thread = threading.Thread(target=self.listen)
      self.thread.start()
      logging.info("WebSocket connection established.")
    except Exception as e:
      logging.info(f"Error connecting: {e}")

  def listen(self) -> None:
    """
    Listens for messages from the WebSocket server.
    """
    while self.connected:
      try:
        data = self.socket.recv(self.buffer_size).decode(errors='ignore')
        if data:
          print(f"Message received: {data}")
      except Exception as e:
        logging.info(f"Error receiving message: {e}")
        self.close()

  def send(self, message: str | List[str]) -> None:
    """
    Send a message to the WebSocket server.

    Args:
        message: Message to send.
    """
    if not self.connected:
      return 
    
    try:
        self.socket.sendall(json.dumps(message).encode())
    except Exception as e:
      logging.info(f"Error sending message: {e}")
      self.close()

  def close(self) -> None:
    """
    Close the WebSocket connection.
    """
    if self.connected:
      try:
        self.socket.close()
        self.connected = False
        logging.info("WebSocket connection closed.")
      except Exception as e:
        logging.info(f"Error closing connection: {e}")
  
  def validate_chain(self, chain: str) -> Tuple[bool, str]:
    """
    Validates whether a string meets the specified rules.

    Returns:
      True if the string meets the specified rules, False otherwise.
      Error message if the chain does not meet the specified rules.
    """
    if not all(char in string.ascii_letters + string.digits + ' ' for char in chain):
      return False, "Invalid characters"

    if not 50 <= len(chain) <= 100:
      return False, "Invalid length"

    num_spaces = chain.count(' ')
    if not 3 <= num_spaces <= 5:
      return False, "Invalid number of spaces"

    if chain.startswith(' ') or chain.endswith(' '):
      return False, "Spaces at beginning or end"

    if '  ' in chain:
      return False, "Consecutive spaces"

    return True, None

  def generate_chain(self) -> str:
    """
    Generates a string that meets the specified rules.

    Returns:
      Chain that meets the specified rules.
    """
    chain_length = random.randint(50, 100)
    num_spaces = random.randint(3, 5)
        
    characters = string.ascii_letters + string.digits
    chain = ''.join(random.choice(characters) for _ in range(chain_length))

    for _ in range(num_spaces):
      space_index = random.randint(1, chain_length - 2)
      chain = chain[:space_index] + ' ' + chain[space_index:]

    return chain

  def save_chain(self, chain: str) -> None:
    """
    Saves a chain to a file.

    Args:
        chain: Chain to save.
    """
    with open(txt, "a") as f:
      f.write(chain + "\n")

  def get_user_input(self) -> None:
    """
    Gets the next user input after the server response.
    """
    number_of_chains = self.number_of_chains()
  
    while self.connected and number_of_chains < 1000001:
      option = input("Select an option: \n1. Enter a string manually\n2. Generate a string automatically\n3. Send all generated strings\n")
      
      if option == "1":
        chain = input("Enter a string: ")
        valid, response = self.validate_chain(chain)
        if valid:
          logging.info("Valid string. Sending to server...")
          self.send(chain)
          self.save_chain(chain)
          number_of_chains += 1
        else:
          logging.info(response)
      elif option == "2":
        chain = self.generate_chain()
        self.send(chain)
        self.save_chain(chain)
        number_of_chains += 1
      elif option == "3":
        self.send(self.get_all_chains())
      else:
        logging.info("Invalid option.")

      time.sleep(1)

  def get_all_chains(self) -> List[str]:
    """
    Gets all strings that have been sent to the server.
    Create the file "chains.txt" if it does not exist.

    Returns:
        List of chains.
    """
    try:
      with open(txt, "r") as f:
        chains = f.readlines()
    except FileNotFoundError:
      with open(txt, "w") as f:
        pass 
      chains = []
    return chains 

  def number_of_chains(self):
    """
    Gets the number of chains in the file.

    Returns:
        Number of chains in the file.
    """
    return len(self.get_all_chains())
