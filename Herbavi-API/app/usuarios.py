import json
import re
import bcrypt

#--------------------------------------------------------------------------------------------
# Funcion que busca la lista de usuarios en el JSON y retorna una lista de Python
def listaUsuarios():
    try:
        archivo = open('../DB/usuarios.json')
        json.load(archivo)
        archivo.close()
    except:
        # Cuando falla abrir archivo
        print('No se ha podido abrir el archivo usuarios.json ')
        return None
    else:
        archivo = open('../DB/usuarios.json')

        # Cargar los datos del archivo
        listaUsuarios = json.load(archivo)

        # Cerrar el archivo
        archivo.close()

        # Retornar la lista de usuarios
        return listaUsuarios


#--------------------------------------------------------------------------------------------
# Funcion para sobreescribir los datos en el archivo JSON de usuarios
# Se debe enviar la lista de usuarios con los datos modificados
def modificarUsuarios(usuarios):

    # Abrir el archivo JSON de usuarios y sobreescribir los datos
    archivo = open('../DB/usuarios.json', 'w')
   
    # Sobreescribir los nuevos datos en el archivo JSON
    json.dump(usuarios, archivo, indent = 6)
            
    # Cerrar el archivo
    archivo.close()

    # Retorno de la funcion
    return None


#--------------------------------------------------------------------------------------------
# Funcion para validar si el usuario es admin

def verificarAdmin(usuario: str, password: str):
    if usuario == 'ADMIN' and password == 'ACEVEDOBABY':
        return True
    # Retorno en caso de que no se cumpla la condicion anterrior
    return False

#--------------------------------------------------------------------------------------------
# Funcion para verificar que un nombre de usuario no se repita
def usuarioExiste(nombre_usuario: str):
    # Primero se obtiene la lista de usuarios llamando a la funcion correspondiente
    lista_usuarios = listaUsuarios()

    # Recorrer la lista de usuarios y activar una bandera en caso de que el nombre de usuario esté en la lista
    existe = False
    for usuario in lista_usuarios:
        if usuario['usuario'] == nombre_usuario:
            existe = True
            break
    
    # Retornar el valor de la variable repetido
    return existe


#--------------------------------------------------------------------------------------------
# Funcion para verificar que una contraseña coincide con el usuario guardado en el JSON
def passwordCorrecta(nombre_usuario: str, password: str):
    # Primero se obtiene la lista de usuarios llamando a la funcion correspondiente
    lista_usuarios = listaUsuarios()

    # Recorrer la lista de usuarios y activar una bandera en caso de que el nombre de usuario esté en la lista
    coincide = False
    for usuario in lista_usuarios:
        if usuario['usuario'] != nombre_usuario:
            continue
        
        # Se codifica la contraseña ingresada
        password = password.encode('utf-8')

        # Obtener la contraseña almacenada en el sistema
        stored_password = usuario['password'].encode('utf-8')

        if bcrypt.checkpw(password, stored_password) == False:
            return False

        # Si las contraseñas coinciden retornar True
        coincide = True
        break

    # Retornar el valor de la variable coincide
    return coincide


#--------------------------------------------------------------------------------------------
# Funcion para verificar que una dirección de correo electrónico sea válida en términos de formato
def correoValido(correo: str):
    valido = False
    formato = "^[a-zA-Z0-9-_]+@[a-zA-Z0-9]+\.[a-z]{1,3}$"

    # Verificar si el correo ingresado hace match con el formato especificado
    if re.match(formato, correo):
      valido = True
   
    # Retornar el valor de la variable valido
    return valido

