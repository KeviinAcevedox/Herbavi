import json
import random
import string

#--------------------------------------------------------------------------------------------
# Funcion que retorna un nuevo ID de producto unico
def generarNuevoID():
   # Abrir el archivo JSON productos.json
    try:
        archivo = open('../DB/id.json')
        json.load(archivo)
        archivo.close()
    except:
        # Cuando falla abrir archivo
        print('No se ha podido abrir el archivo id.json ')
        return None
    else:
        # Este bloque se ejecuta cuando no hay errores
        archivo = open('../DB/id.json')

        # JSON Object con los datos
        datos = json.load(archivo)

        # Cargar la lista de id's en una lista de Python
        ids = datos['ids']

        # Cerrar el archivo en modo lectura
        archivo.close()

        repetido = True
        caracteres = string.ascii_uppercase + string.digits

        # Generar un nuevo id en caso de que ya exista el random
        while(repetido):
            # Generar un id random
            random_id = ''.join(random.choice(caracteres) for i in range(4))

            # Verificar que no sea repetido
            existencias = ids.count(random_id)
            if existencias > 0:
                repetido = True
            else:
                repetido = False
        
        # Agregar el nuevo id a la lista
        ids.append(random_id)

        # Crear un template para sobreescribir los datos en id.json
        template = {
            "ids": ids
        }

        # Abrir el archivo y agregar el nuevo dato
        with open('../DB/id.json', 'w') as archivo:
            json.dump(template, archivo, indent = 6)
        
        # Cerrar el archivo
        archivo.close()

        # Retornar el nuevo id
        return random_id 

#--------------------------------------------------------------------------------------------
# Funcion que elimina un ID de la lista cuando se elimina un Producto
def deleteID(id: str):
   # Abrir el archivo JSON productos.json
    try:
        archivo = open('../DB/id.json')
        json.load(archivo)
        archivo.close()
    except:
        # Cuando falla abrir archivo
        print('No se ha podido abrir el archivo id.json ')
        return None
    else:
        # Este bloque se ejecuta cuando no hay errores
        archivo = open('../DB/id.json')

        # JSON Object con los datos
        datos = json.load(archivo)

        # Cargar la lista de id's en una lista de Python
        ids = datos['ids']

        # Cerrar el archivo en modo lectura
        archivo.close()

        # Buascar el id en la lista y eliminarlo
        for ID in ids:
            if ID == id:
                ids.remove(ID)
                break
        
        # Crear un template para sobreescribir los datos en id.json
        template = {
            "ids": ids
        }

        # Abrir el archivo y agregar el nuevo dato
        with open('../DB/id.json', 'w') as archivo:
            json.dump(template, archivo, indent = 6)
        
        # Cerrar el archivo
        archivo.close()

        # Retornar null
        return None
