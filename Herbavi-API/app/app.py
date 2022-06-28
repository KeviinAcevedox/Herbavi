from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from id import *

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

#--------------------------------------------------------------------------------------------
# Ruta para solicitar todos los productos que se encuentran en el archivo JSON
@app.route('/api/productos', methods = ['GET'])
def getTodosProductos():
    # Abrir el archivo JSON productos.json
    try:
        archivo = open('../DB/productos.json')
        json.load(archivo)
        archivo.close()
    except:
        # Cuando falla abrir archivo
        print('No se ha podido abrir el archivo productos.json ')
        return jsonify('Error al intentar acceder a la base de datos')
    else:
        # Este bloque se ejecuta cuando no hay errores
        archivo = open('../DB/productos.json')

        # JSON Object con los datos
        datos = json.load(archivo)

        # Primero guardar los datos en variables
        lista_categorias = datos['categorias']

        # Cerrar el archivo
        archivo.close()

        # Crear una lista vacia para meter TODOS los productos
        entrega_productos = []

        # Iterar la lista de productos por cada categoria encontrada
        for categoria in lista_categorias:
            for producto in categoria['productos_categoria']:
                entrega_productos.append(producto)

        # Retornar la lista con todos los productos
        return jsonify(entrega_productos)

#--------------------------------------------------------------------------------------------
# Ruta para solicitar todos los productos de una categoría específica y para una pagina especifica
@app.route('/api/productos/<string:nombre_categoria>/<int:pagina>', methods = ['GET']) 
def getProductosCategoria(nombre_categoria: str, pagina: int):
    # Abrir el archivo JSON productos.json
    try:
        archivo = open('../DB/productos.json')
        json.load(archivo)
        archivo.close()
    except:
        # Cuando falla abrir archivo
        print('No se ha podido abrir el archivo productos.json ')
        return jsonify('Error al intentar acceder a la base de datos')
    else:
        # Este bloque se ejecuta cuando no hay errores
        archivo = open('../DB/productos.json')

        # JSON Object con los datos
        datos = json.load(archivo)

        # Primero guardar los datos en variables
        lista_categorias = datos['categorias']

        # Cerrar el archivo
        archivo.close()

        # Crear una lista vacia para meter TODOS los productos
        entrega_productos = []

        # Iterar la lista de productos por cada categoria encontrada
        for categoria in lista_categorias:
            if categoria['nombre_categoria'] == nombre_categoria:
                entrega_productos = categoria['productos_categoria']
                break

        # Solo se pueden entregar 12 productos por pagina
        # Caso 1:
        if pagina == 1:
            return jsonify(entrega_productos[0:12])
        else:
            inicio = 12 * (pagina - 1)
            final = 12 * (pagina)
            # Retornar la lista con todos los productos
            return jsonify(entrega_productos[inicio:final])

#--------------------------------------------------------------------------------------------
# Ruta para solicitar una lista con el nombre de todas las categorías de productos y la cantidada de productos
# por categoría
@app.route('/api/categorias', methods = ['GET'])
def getCategorias():
    # Abrir el archivo JSON productos.json
    try:
        archivo = open('../DB/productos.json')
        json.load(archivo)
        archivo.close()
    except:
        # Cuando falla abrir archivo
        print('No se ha podido abrir el archivo productos.json ')
        return jsonify('Error al intentar acceder a la base de datos')
    else:
        # Este bloque se ejecuta cuando no hay errores
        archivo = open('../DB/productos.json')

        # JSON Object con los datos
        datos = json.load(archivo)

        # Primero guardar los datos en variables
        lista_categorias = datos['categorias']

        # Cerrar el archivo
        archivo.close()

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
    # Abrir el archivo JSON productos.json
    try:
        archivo = open('../DB/productos.json')
        json.load(archivo)
        archivo.close()
    except:
        # Cuando falla abrir archivo
        print('No se ha podido abrir el archivo productos.json ')
        return jsonify('Error al intentar acceder a la base de datos')
    else:
        # Cargar los datos del JSON
        nombre_categoria = request.json['nombre_categoria']

        # Primero se lee el archivo para verificar que no se repita la categoria
        archivo = open('../DB/productos.json', 'r')

        # JSON Object con los datos
        datos = json.load(archivo)

        # Primero guardar los datos en variables
        lista_categorias = datos['categorias']

        # Cerrar el archivo en modo lectura
        archivo.close()

        # Iterar la lista de productos por cada categoria encontrada
        for categoria in lista_categorias:
            if categoria['nombre_categoria'] == nombre_categoria:
                return jsonify(False)
        
        # Crear un template
        nueva_categoria = {
            "nombre_categoria": nombre_categoria,
            "productos_categoria": []
        }

        # Agregar el template a la lista de las categorias
        lista_categorias.append(nueva_categoria)

        # Crear el objeto con el formato JSON deseado y los datos nuevos
        productos_json = {
            "categorias": lista_categorias
        }

        with open('../DB/productos.json', 'w') as archivo:
            # Sobreescribir los datos del archivo json
            json.dump(productos_json, archivo, indent = 6)

        # Cerrar el archivo
        archivo.close()

        # Retornar True para indicar que no hay problemas
        return jsonify(True)

#--------------------------------------------------------------------------------------------
# Ruta para agregar un producto a una categoría existente
@app.route('/api/producto', methods = ['POST'])
def postNuevoProducto():
    # Abrir el archivo JSON productos.json
    try:
        archivo = open('../DB/productos.json')
        json.load(archivo)
        archivo.close()
    except:
        # Cuando falla abrir archivo
        print('No se ha podido abrir el archivo productos.json ')
        return jsonify('Error al intentar acceder a la base de datos')
    else:
        # Colcar el objeto json de la peticion en una variable de Python
        producto_template = request.json

        # Primero se lee el archivo para verificar que no se repita la categoria
        archivo = open('../DB/productos.json', 'r')

        # JSON Object con los datos
        datos = json.load(archivo)

        # Primero guardar los datos en variables
        lista_categorias = datos['categorias']

        # Una vez sacados los datos del archivo, se cierra el archivo JSON
        archivo.close()

        # Generar un id random para el nuevo producto
        producto_template['id'] = generarNuevoID()

        # Variable para verificar si se logró agregar el producto
        agregado = False

        # Buscar la categoría a la que pertenece el producto y agregarlo a la lista
        for categoria in lista_categorias:
            if categoria['nombre_categoria'] == producto_template['categoria']:
                categoria['productos_categoria'].append(producto_template)
                agregado = True
                break
        
        # Crear el template del JSON total
        template_completo = {
            'categorias': lista_categorias
        }

        # Abrir nuevamente el archivo JSON de productos y sobreescribir los datos
        with open('../DB/productos.json', 'w') as archivo:
            json.dump(template_completo, archivo, indent = 6)
            
        # Cerrar el archivo
        archivo.close()

        # Informar el estado de la operacion
        return jsonify(agregado)

#--------------------------------------------------------------------------------------------
# Ruta para eliminar una categoria
@app.route('/api/categoria/<string:nombre_categoria>', methods = ['DELETE'])   
def deleteCategoria(nombre_categoria: str):
    # Abrir el archivo JSON productos.json
    try:
        archivo = open('../DB/productos.json')
        json.load(archivo)
        archivo.close()
    except:
        # Cuando falla abrir archivo
        print('No se ha podido abrir el archivo productos.json ')
        return jsonify('Error al intentar acceder a la base de datos')
    else:
        # Primero se lee el archivo para verificar que no se repita la categoria
        archivo = open('../DB/productos.json', 'r')

        # JSON Object con los datos
        datos = json.load(archivo)

        # Primero guardar los datos en variables
        lista_categorias = datos['categorias']

        # Cerrar el archivo en modo lectura
        archivo.close()

        # Bandera de estado
        eliminada = False

        # Iterar la lista de productos por cada categoria encontrada
        for categoria in lista_categorias:
            if categoria['nombre_categoria'] == nombre_categoria:
                lista_categorias.remove(categoria)
                eliminada = True
        
        # Crear el objeto con el formato JSON deseado y los datos nuevos
        productos_json = {
            "categorias": lista_categorias
        }

        with open('../DB/productos.json', 'w') as archivo:
            # Sobreescribir los datos del archivo json
            json.dump(productos_json, archivo, indent = 6)

        # Cerrar el archivo
        archivo.close()

        # Retornar True para indicar que no hay problemas
        return jsonify(eliminada)

#--------------------------------------------------------------------------------------------
# Ruta para eliminar un producto dentro de una categoria
@app.route('/api/producto/<string:id>/<string:nombre_categoria>', methods = ['DELETE'])
def deleteProducto(id: str, nombre_categoria: str):
    # Abrir el archivo JSON productos.json
    try:
        archivo = open('../DB/productos.json')
        json.load(archivo)
        archivo.close()
    except:
        # Cuando falla abrir archivo
        print('No se ha podido abrir el archivo productos.json ')
        return None
    else:
        # Primero se lee el archivo para verificar que no se repita la categoria
        archivo = open('../DB/productos.json', 'r')

        # JSON Object con los datos
        datos = json.load(archivo)

        # Primero guardar los datos en variables
        lista_categorias = datos['categorias']

        # Una vez sacados los datos del archivo, se cierra el archivo JSON
        archivo.close()

        # Eliminar el id del producto
        deleteID(id)

        # Variable para verificar si se logró encontrar la categoría indicada por argumento
        eliminado = False

        # Buscar la categoría a la que pertenece el producto y agregarlo a la lista
        for categoria in lista_categorias:
            if categoria['nombre_categoria'] == nombre_categoria:
                for producto in categoria['productos_categoria']:
                    if producto['id'] == id:
                        categoria['productos_categoria'].remove(producto)
                        eliminado = True
                        break
        
        # Crear el template del JSON total
        template_completo = {
            'categorias': lista_categorias
        }

        # Abrir nuevamente el archivo JSON de productos y sobreescribir los datos
        with open('../DB/productos.json', 'w') as archivo:
            json.dump(template_completo, archivo, indent = 6)
            
        # Cerrar el archivo
        archivo.close()

        # Informar que se ha realizado correctamente
        return jsonify(eliminado)

if __name__ == '__main__':
    app.run(debug = True, port = 4000)
