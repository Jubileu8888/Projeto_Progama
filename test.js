const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: '7705231d961be085d276031fa7a240e1'
  },
  body: JSON.stringify({number: '63985126784', message: 'test'})
};

fetch('https://v5.chatpro.com.br/chatpro-24a6afc29d/api/v1/send_message', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));