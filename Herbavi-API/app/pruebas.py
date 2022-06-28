lista = []
for i in range(1,100):
    lista.append(i)

pagina = 2
inicio = 12 * (pagina - 1)
final = 12 * (pagina)

print(lista[inicio:final])