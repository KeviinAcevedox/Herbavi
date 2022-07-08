import json

#--------------------------------------------------------------------------------------------
# Funcion para acceder al archivo JSON de productos y guardar los datos en una lista de Python
def listaCategorias():
    try:
        archivo = open('DB/productos.json')
        json.load(archivo)
        archivo.close()
    except:
        print('No se ha podido abrir el archivo productos.json ')
        return []
    else:
        archivo = open('DB/productos.json')

        # JSON Object con los datos
        categorias = json.load(archivo)

        # Cerrar el archivo JSON
        archivo.close()

        # Primero guardar los datos en variables
        return categorias

#--------------------------------------------------------------------------------------------
# Funcion para sobreescribir los datos en el archivo JSON de productos
# Se debe enviar la lista de categorias de productos en formato de diccionario
def modificarProductos(lista_categorias):
    # Abrir nuevamente el archivo JSON de productos y sobreescribir los datos
    archivo = open('DB/productos.json', 'w')
   
    # Sobreescribir los nuevos datos en el archivo JSON
    json.dump(lista_categorias, archivo, indent = 6, sort_keys=True)
            
    # Cerrar el archivo
    archivo.close()

    # Retorno de la funcion
    return None
