''' 
Este archivo contiene todos los métodos necesarios para acceder y modificar
el archivo JSON que contiene los productos almacenados.
'''
import json
from id import *
#---------------------------------------------------------------------------------------------------------------------------
# Función para leer todos los productos sin importar la categoría
def getTodosProductos():
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
        return entrega_productos

#---------------------------------------------------------------------------------------------------------------------------
# Función para leer todos los productos en una categoría
def getProductosCategoria(nombre_categoria: str):
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

        # Retornar la lista con todos los productos
        return entrega_productos


#---------------------------------------------------------------------------------------------------------------------------
# Función para obtener una lista con el nombre de todas las categorías disponibles
def getNombreCategorias():
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
        # Este bloque se ejecuta cuando no hay errores
        archivo = open('../DB/productos.json')

        # JSON Object con los datos
        datos = json.load(archivo)

        # Primero guardar los datos en variables
        lista_categorias = datos['categorias']

        # Cerrar el archivo
        archivo.close()

        # Crear una lista vacia para meter TODOS los productos
        nombre_categorias = []

        # Iterar la lista de productos por cada categoria encontrada
        for categoria in lista_categorias:
           nombre_categorias.append(categoria['nombre_categoria'])

        # Retornar la lista con todos los productos
        return nombre_categorias


#---------------------------------------------------------------------------------------------------------------------------
# Función para crear una nueva categoria de productos
def postNuevaCategoria(nombre_nueva_categoria: str):
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

        # Cerrar el archivo en modo lectura
        archivo.close()

        # Iterar la lista de productos por cada categoria encontrada
        for categoria in lista_categorias:
            if categoria['nombre_categoria'] == nombre_nueva_categoria:
                return False
        
        # Crear un template
        nueva_categoria = {
            "nombre_categoria": nombre_nueva_categoria,
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
        return True


#---------------------------------------------------------------------------------------------------------------------------
# Función para agregar un producto a una categoría existente
def postNuevoProducto(nombre_categoria: str, nombre: str, precio: int, descripcion: str, img: str, cantidad: int):
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

        # Generar un id random para el nuevo producto
        id = generarNuevoID()

        # Crear el template del nuevo producto
        producto_template = {
            "nombre": nombre,
            "precio": precio,
            "cantidad": cantidad,
            "categoria": nombre_categoria,
            "id": id,
            "imagen": img,
            "descripcion": descripcion
        }

        # Variable para verificar si se logró agregar el producto
        agregado = False

        # Buscar la categoría a la que pertenece el producto y agregarlo a la lista
        for categoria in lista_categorias:
            if categoria['nombre_categoria'] == nombre_categoria:
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
        return agregado
       


def deleteCategoria(nombre_categoria: str):
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
        return eliminada

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
        return eliminado

print(deleteProducto('MMD', 'Carnes'))



 
 