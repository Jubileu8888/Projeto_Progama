import requests

url = "https://v5.chatpro.com.br/chatpro-24a6afc29d/api/v1/send_message"

payload = {
    "number": "63985126784",
    "message": "testando"
}
headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "Authorization": "7705231d961be085d276031fa7a240e1"
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)