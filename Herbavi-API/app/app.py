from flask import Flask, jsonify, request
from flask_cors import CORS
from productos import * 
from usuarios import *
from id import *

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

#--------------------------------------------------------------------------------------------
# Ruta para verificar el LOGIN de los usuarios en la app
@app.route('/api/usuario/login', methods = ['POST'])
def login():
    # Cargar el JSON que viene en la peticion POST
    usuario = request.json['usuario']
    password = request.json['password']

    # Veridicar si es un login del admin
    if (verificarAdmin(usuario, password)):
        respuesta = {
            "mensaje": "Le damos la bienvenida ADMIN.",
            "estatus": True,
            "ruta": "/Herbavi-Admin/Productos"
        }
        return jsonify(respuesta)

    # Primero se debe verificar que el nombre de usuario exista
    if usuarioExiste(usuario) == False:
        respuesta = {
            "mensaje": "El nombre de usuario no existe.",
            "estatus": False
        }
        return jsonify(respuesta)
    
    # Ahora se verifica si la contraseña coincide con la contraseña del usuario
    if passwordCorrecta(usuario, password) == False:
        respuesta = {
            "mensaje": "La contraseña es incorrecta.",
            "estatus": False
        }
        return jsonify(respuesta)
    
    # En caso de que se cumplan las condiciones se envia un Ok por medio de un True
    respuesta = {
        "mensaje": "Los datos ingresados son correctos.",
        "estatus": True,
        "ruta": "/Herbavi-Home/Productos"
    }
    return jsonify(respuesta)

#--------------------------------------------------------------------------------------------
# Ruta para registrar un nuevo usuario en la aplicacion
@app.route('/api/usuario/registrar', methods = ['POST'])
def agregarUsuario():
    # Cargar el JSON que viene en la peticion POST
    template = request.json

    # Primero se debe verificar que el nombre de usuario no se repita
    if usuarioExiste(template['usuario']) == True:
        respuesta = {
            "mensaje": "El nombre de usuario ya existe.",
            "estatus": False
        }
        return jsonify(respuesta)
    
    # Luego se debe verificar que la dirección de correo electrónica sea válida
    if correoValido(template['correo']) == False:
        respuesta = {
            "mensaje": "La direccion de correo electrónico es inválida.",
            "estatus": False
        }
        return jsonify(respuesta)

    # Si se cumplen las condiciones se deben modificar los datos en la base de datos
    usuarios = listaUsuarios()

    # Se Encripta la contraseña para proteger la información del usuario
    password = template['password']
    password = password.encode('utf-8')
    encripted_password = bcrypt.hashpw(password, bcrypt.gensalt(10))

    template['password'] = encripted_password.decode('utf-8')

    # Agregar el objeto JSON a la lista de usuarios
    usuarios.append(template)

    # Modificar el archivo JSON con los nuevos datos
    modificarUsuarios(usuarios)

    # Enviar un estado del proceso
    respuesta = {
        "mensaje": "El usuario se ha registrado correctamente.",
        "estatus": True
    }
    return jsonify(respuesta)

#--------------------------------------------------------------------------------------------
# Ruta para solicitar todos los usuarios registrados en el sistema
@app.route('/api/usuarios', methods = ['GET'])
def getUsuarios():
    # Se debe obtener la lista actual de usuarios
    usuarios = listaUsuarios()

    # Luego se empaqueta la lista como un JSON y se envia la respuesta
    return jsonify(usuarios)

#--------------------------------------------------------------------------------------------
# Ruta para eliminar un usuario
@app.route('/api/usuario/eliminar/<string:usuario>', methods = ['DELETE'])
def eliminarUsuario(usuario: str):
    # Primero se debe verificar que el nombre de usuario exista
    if usuarioExiste(usuario) == False:
        respuesta = {
            "mensaje": "El nombre de usuario no existe.",
            "estatus": False
        }
        return jsonify(respuesta)
    
    # Si se cumplen las condiciones se debe obtener la lista actual de usuarios
    usuarios = listaUsuarios()

    # Ahora se debe buscar el usuario y eliminarlo
    for user in usuarios:
        if user['usuario'] == usuario:
            usuarios.remove(user)
            # Modificar los datos en el archivo JSON
            modificarUsuarios(usuarios)
            respuesta = {
                "mensaje": "El nombre se ha eliminado correctamente.",
                "estatus": True
            }
            return jsonify(respuesta)

    # En caso de que no se haya podido eliminar el usuario
    respuesta = {
        "mensaje": "Ha ocurrido un error inesperado al intentar eliminar el usuario.",
        "estatus": False
    }
    return jsonify(respuesta)

#--------------------------------------------------------------------------------------------
# Ruta para solicitar todos los productos que se encuentran en el archivo JSON
@app.route('/api/TodosProductos', methods = ['GET'])
def getTodosProductos():
    # Tomar los valores de los parametros
    pagina = request.args.get('pagina', type = int)

    # Obtener la lista con las categorias de productos en una lista
    lista_categorias = listaCategorias()

    # Crear una lista vacia para meter TODOS los productos
    entrega_productos = []

    # Iterar la lista de productos por cada categoria encontrada
    for categoria in lista_categorias:
        for producto in categoria['productos_categoria']:
            entrega_productos.append(producto)

    # Cargar la cantidad total de productos
    cantidad_productos = len(entrega_productos)

    # Solo se pueden entregar 12 productos por pagina
    # Caso 1:
    if pagina == 1:
        return jsonify({
            "lista_productos":  entrega_productos[0:12],
            "cantidad_total": cantidad_productos
            })
    else:
        inicio = 12 * (pagina - 1)
        final = 12 * (pagina)

        # Retornar la lista con todos los productos
        return jsonify({
            "lista_productos":  entrega_productos[inicio:final],
            "cantidad_total": cantidad_productos
            })

#--------------------------------------------------------------------------------------------
# Ruta para solicitar todos los productos de una categoría específica y para una pagina especifica
@app.route('/api/productos', methods = ['GET']) 
def getProductosCategoria():
    # Obtener los datos de los parametros
    nombre_categoria = request.args.get('nombre_categoria', type = str)
    pagina = request.args.get('pagina', type = int)

    # Primero guardar los datos en variables
    lista_categorias = listaCategorias()

    # Crear una lista vacia para meter TODOS los productos
    entrega_productos = []

    # Iterar la lista de productos por cada categoria encontrada
    for categoria in lista_categorias:
        if categoria['nombre_categoria'] == nombre_categoria:
            entrega_productos = categoria['productos_categoria']
            break

    # Cargar la cantidad total de productos
    cantidad_productos = len(entrega_productos)

    # Solo se pueden entregar 12 productos por pagina
    # Caso 1:
    if pagina == 1:
        return jsonify({
            "lista_productos":  entrega_productos[0:12],
            "cantidad_total": cantidad_productos
            })
    else:
        inicio = 12 * (pagina - 1)
        final = 12 * (pagina)

        # Retornar la lista con todos los productos
        return jsonify({
            "lista_productos":  entrega_productos[inicio:final],
            "cantidad_total": cantidad_productos
            })
#--------------------------------------------------------------------------------------------
# Ruta para solicitar una lista con el nombre de todas las categorías de productos y la cantidada de productos
# por categoría
@app.route('/api/categorias', methods = ['GET'])
def getCategorias():

    # Primero guardar los datos en variables
    lista_categorias = listaCategorias()

    # Crear una lista vacia para meter TODOS los productos
    info_categorias = []

    # Iterar la lista de productos por cada categoria encontrada
    for categoria in lista_categorias:
        info_categorias.append({
        "nombre_categoria": categoria['nombre_categoria'],
        "cantidad_productos": len(categoria['productos_categoria'])
        })

    # Retornar la lista con todos los productos
    return jsonify(info_categorias)


#--------------------------------------------------------------------------------------------
# Ruta para agregar una nueva categoría
@app.route('/api/categoria', methods = ['POST'])
def postNuevaCategoria():
    # Cargar los datos de la peticion
    nombre_categoria = request.json['nombre_categoria']

    # Primero guardar los datos del archivo JSON en variables
    lista_categorias = listaCategorias()

    # Iterar la lista de productos por cada categoria encontrada
    for categoria in lista_categorias:
        if categoria['nombre_categoria'] == nombre_categoria:
            respuesta = {
                "mensaje": "La categoria ya existe.",
                "estatus": False
            }
            return jsonify(respuesta)
        
    # Crear un template
    nueva_categoria = {
        "nombre_categoria": nombre_categoria,
        "productos_categoria": []
    }

    # Agregar el template a la lista de las categorias
    lista_categorias.append(nueva_categoria)

    # Modificar el archivo JSON con los nuevos datos
    modificarProductos(lista_categorias)

    # Retornar True para indicar que no hay problemas
    respuesta = {
            "mensaje": "La categoria se ha agredado correctamente.",
            "estatus": True
    }
    return jsonify(respuesta)

#--------------------------------------------------------------------------------------------
# Ruta para agregar un producto a una categoría existente
@app.route('/api/producto', methods = ['POST'])
def postNuevoProducto():
    # Obtener el contenido de la peticion POST
    producto_template = request.json

    # Obtener la lista de todas las categorias
    lista_categorias = listaCategorias()

    # Generar un id random para el nuevo producto
    producto_template['id'] = generarNuevoID()

    # Variable para verificar si se logró agregar el producto
    agregado = False
    mensaje = 'La categoria ingresada no existe.'

    # Buscar la categoría a la que pertenece el producto y agregarlo a la lista
    for categoria in lista_categorias:
        if categoria['nombre_categoria'] == producto_template['categoria']:
            categoria['productos_categoria'].append(producto_template)
            mensaje = 'El producto se ha agregado correctamente'
            agregado = True
            break
        
    # Modificar los datos el archivo JSON de productos
    modificarProductos(lista_categorias)

    # Informar el estado de la operacion
    respuesta = {
        "mensaje": mensaje,
        "estatus": agregado
        }
    return jsonify(respuesta)

#--------------------------------------------------------------------------------------------
# Ruta para eliminar una categoria
@app.route('/api/categoria', methods = ['DELETE'])   
def deleteCategoria():
    # Obtener los datos de los parametros
    nombre_categoria = request.args.get('nombre_categoria', type = str)
    
    # Obtener la lista de todas las categorias
    lista_categorias = listaCategorias()

    # Bandera de estado
    eliminada = False
    mensaje = 'La categoria ingresada no existe.'

    # Iterar la lista de productos por cada categoria encontrada
    for categoria in lista_categorias:
        if categoria['nombre_categoria'] == nombre_categoria:
            lista_categorias.remove(categoria)
            eliminada = True
            mensaje = 'La categoria se ha eliminado correctamente.'
            break

    # Modificar los datos el archivo JSON de productos
    modificarProductos(lista_categorias)

    # Retornar True para indicar que no hay problemas
    respuesta = {
        "mensaje": mensaje,
        "estatus": eliminada
        }
    return jsonify(respuesta)

#--------------------------------------------------------------------------------------------
# Ruta para eliminar un producto dentro de una categoria
@app.route('/api/producto', methods = ['DELETE'])
def deleteProducto():
    # Obtener los datos de los parametros
    nombre_categoria = request.args.get('nombre_categoria', type = str)
    id = request.args.get('id', type = str)

    # Obtener la lista de todas las categorias
    lista_categorias = listaCategorias()

    # Eliminar el id del producto
    deleteID(id)

    # Variable para verificar si se logró encontrar la categoría indicada por argumento
    eliminado = False
    mensaje = 'No se ha podido elimindar el producto.'

    # Buscar la categoría a la que pertenece el producto y agregarlo a la lista
    for categoria in lista_categorias:
        if categoria['nombre_categoria'] != nombre_categoria:
            continue
        for producto in categoria['productos_categoria']:
            if producto['id'] != id:
                continue
            categoria['productos_categoria'].remove(producto)
            eliminado = True
            mensaje = 'El producto se ha eliminado correctamente.'
            break

    # Modificar los datos el archivo JSON de productos
    modificarProductos(lista_categorias)

    # Informar que se ha realizado correctamente
    respuesta = {
        "mensaje": mensaje,
        "estatus": eliminado
        }
    return jsonify(respuesta)



if __name__ == '__main__':
    app.run(debug = True, port = 4000)
