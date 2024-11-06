import socket
import threading
import json
import time
from typing import Dict, List
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class WebsocketServer:
  """
  WebsocketServer class to manage WebSocket connections.
  """
  def __init__(self, host: str, port: int, buffer_size: int) -> None:
    self.host = host
    self.port = port
    self.buffer_size = buffer_size
    self.server_socket = None
    self.clients = {}
    self.thread = None
    self.running = False

  def start(self) -> None:
    """
    Start the WebSocket server.
    """
    try:
      self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
      self.server_socket.bind((self.host, self.port))
      self.server_socket.listen(5)
      self.running = True
      self.thread = threading.Thread(target=self.handle_clients)
      self.thread.start()
      logging.info(f"WebSocket server started on {self.host}:{self.port}")

    except Exception as e:
      logging.info(f"Error starting server: {e}")

  def handle_clients(self) -> None:
    """
    Manage client connections.
    """
    while self.running:
      try:
        client_socket, address = self.server_socket.accept()
        logging.info(f"New connection {address}")
        client_thread = threading.Thread(target=self.handle_client, args=(client_socket, address))
        client_thread.start()
      except Exception as e:
        logging.info(f"Error accepting connection: {e}")

  def handle_client(self, client_socket, address: str) -> None:
    """
    Handles the connection of an individual client.

    Args:
      client_socket: The socket of the client connection.  
      address: The IP address and port of the client.
    """
    try:
      while self.running:
        data = json.loads(client_socket.recv(self.buffer_size).decode(errors='ignore'))
        logging.info(f"Received data: {data}")
        response = ""
      
        if isinstance(data, str):
          validation_result = self.validate_chains(data)

          if validation_result['valid']:
            weight = self.calculate_string_weight(data)
            response = f"The chain weight is: {weight:.2f}"
          else:
            response = validation_result['error']
        else:
          weight = self.calculate_string_weight_in_list(data)
          response = f"The weighting of all chains is: {weight:.2f}"

        client_socket.sendall(response.encode())
        
    except Exception as e:
      logging.info(f"Error when handling client: {e}")
    finally:
      self.remove_client(client_socket)
      client_socket.close() 

  def remove_client(self, client_socket) -> None:
    """
    Removes a customer from the customer list.

    Args:
      client_socket: The socket of the client to remove.
    """
    if client_socket in self.clients:
      del self.clients[client_socket]

    logging.info("WebSocket client disconnected.")

  def validate_chains(self, data: str) -> Dict:
    """
    Validates strings sent by the client.

    Args:
      data: The string received from the client.

    Returns:
      A dictionary with the validation results:
        - 'valid': True if the string is valid, False otherwise.
        - 'error': An error message if the string is invalid.
    """
    if 'aa' in data.lower():
      return {
        'valid': False,
        'error': f"Double 'a' rule detected >> '{data}'"
      }
    else: 
      return {
      'valid': True,
      'error': None
    }

  def calculate_string_weight(self, data: str) -> int | float:
    """
    Calculates the weight of a string.

    Args:
      data: The string to weight.

    Returns:
      The weight of the chain.
    """
    letters = sum(1 for char in data if char.isalpha())
    numbers = sum(1 for char in data if char.isdigit())
    spaces = data.count(' ')

    if spaces == 0:
      return 0 

    return (letters * 1.5 + numbers * 2) / spaces

  def calculate_string_weight_in_list(self, data: List[str]) -> int:
    """
    Calculates the weight of a list of strings.

    Args:
      data: A list of strings to weight.

    Returns:
      The total weight of the chains.
    """
    start_time = time.time() 
    total_weight = sum(self.calculate_string_weight(item) for item in data if self.validate_chains(item)['valid'])

    end_time = time.time()
    elapsed_time = end_time - start_time

    logging.info(f"Calculating the weighting of all chains took {elapsed_time:.4f} seconds.")

    return total_weight
    
