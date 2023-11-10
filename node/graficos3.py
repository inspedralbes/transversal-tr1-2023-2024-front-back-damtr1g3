import json
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib import rcParams
from datetime import datetime

with open('log.json', 'r') as file:
    data = json.load(file)

# Función para obtener la franja horaria a partir de una hora dada
def get_time_slot(hour):
    hour = int(hour.split(':')[0])
    if 0 <= hour < 4:
        return '00:00 - 03:59'
    elif 4 <= hour < 8:
        return '04:00 - 07:59'
    elif 8 <= hour < 12:
        return '08:00 - 11:59'
    elif 12 <= hour < 16:
        return '12:00 - 15:59'
    elif 16 <= hour < 20:
        return '16:00 - 19:59'
    else:
        return '20:00 - 23:59'

# Crear un diccionario para contabilizar los ingresos en franjas horarias
time_slots = {
    '00:00 - 03:59': 0,
    '04:00 - 07:59': 0,
    '08:00 - 11:59': 0,
    '12:00 - 15:59': 0,
    '16:00 - 19:59': 0,
    '20:00 - 23:59': 0
}

for pedido in data:
    fecha_pedido = datetime.fromisoformat(pedido['FechaPedido'][:-1])
    hora = fecha_pedido.strftime('%H:%M')
    franja_horaria = get_time_slot(hora)
    # Suponiendo que tienes un campo "monto" en tus datos para el monto de cada pedido
    monto = float(pedido['Total'])
    time_slots[franja_horaria] += monto

# Extraer franjas horarias y montos
franjas_horarias, montos = zip(*time_slots.items())

# Crear el gráfico de barras
plt.bar(franjas_horarias, montos)
plt.xlabel('Franja horaria')
plt.ylabel('Ingressos acumulats €')
plt.title('Estadístiques d\'ingressos per franja horaria')

plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig('./estadisticas_ingresos.jpeg')