from twilio import rest

# Configura tu cuenta de Twilio
account_sid = 'ACfbce27feb43d94fee53d35ff9706ea7d'
auth_token = 'a14582c184cf73246ede3cc1b08e208f'
cliente_twilio = rest.Client(account_sid, auth_token)

# Función para responder mensajes de WhatsApp
def responder_mensaje(mensaje):
    respuesta = rest.MessagingResponse()
    respuesta.message(mensaje)
    return str(respuesta)

# Función para procesar mensajes recibidos
def procesar_mensaje(mensaje):
    # Aquí puedes agregar la lógica de tu chatbot para determinar la respuesta
    if mensaje.lower() == 'hola':
        return '¡Hola! ¿En qué puedo ayudarte?'
    elif mensaje.lower() == 'ayuda':
        return 'Puedo proporcionarte información. Solo dime qué necesitas.'
    else:
        return 'Lo siento, no entiendo ese mensaje.'

# Manejador de mensajes entrantes
def mensaje_entrante(request):
    mensaje = request.form.get('Body')
    respuesta = procesar_mensaje(mensaje)
    return responder_mensaje(respuesta)

if __name__ == '__main__':
    # Ejecutar el servidor web localmente para recibir mensajes de WhatsApp
    from flask import Flask, request
    app = Flask(__name__)

    @app.route('/webhook', methods=['POST'])
    def webhook():
        return mensaje_entrante(request)

    if __name__ == '__main__':
        app.run(debug=True)
