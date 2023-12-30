import subprocess
import os
import time
import webbrowser

caminho_do_diretorio = r'C:\\wamp64\\'

comando = 'start wampmanager.exe'

os.chdir(caminho_do_diretorio)

subprocess.run(comando, shell=True)

time.sleep(20)

caminho_do_diretorio = r'C:\wamp64\www\test'

os.chdir(caminho_do_diretorio)

comando = 'node index.js'



url = "http://localhost:3000"
webbrowser.open(url, new=2) 



subprocess.run(comando, shell=True)


