import os
import time
import subprocess

# Iniciando WAMP para ligar o banco de dados

# username = os.getlogin()
# dir_exe_wamp = rf"C:\Users\{username}\Desktop\Wampserver64"
# subprocess.run([dir_exe_wamp])


dir_node = rf"cd C:\wamp64\www\test"
subprocess.run(["cmd", "/k", dir_node], shell=True)
time.sleep(2)

node_command = rf"node index.js"
subprocess.run(["cmd", "/k", node_command], shell=True)

node_command = rf"cd"
subprocess.run(["cmd", "/k", node_command], shell=True)




