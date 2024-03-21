"""
This code snippet reads data from a JSON file, extracts a specific key's values, calculates the average, maximum, minimum, and count of those values, and then prints the results.

Inputs:
- file_path: a string representing the path to the JSON file
- key_selected: a string representing the key to extract values from the JSON data

Outputs:
- The name of the sensor (capteur_name)
- The average value of the selected key's values
- The maximum value among the selected key's values
- The minimum value among the selected key's values
- The count of the selected key's values

Example Usage:
import json
import statistics

capteur_name = "sensor_3"
file_path = 'data.json'
key_selected = 'sensor_3'
with open(file_path, 'r') as file:
    datas = json.load(file)

count = 0
total = 0
mylist = []

for item in datas:
    if key_selected in item:
        mylist.append(item[key_selected])
        count += 1
        total += item[key_selected]

# Calculate the average using the statistics.mean() function
average = statistics.mean(mylist) if mylist else 0
print(f"{capteur_name}:")
print(f"Avg: {average}")
print(f"Max: {max(mylist)}")
print(f"Min: {min(mylist)}")
print(f"Count: {count}")
"""

import json
import statistics

capteur_name = "sensor_2"
file_path = 'data.json'
key_selected = 'sensor_2'

with open(file_path, 'r') as file:
    datas = json.load(file)

mylist = [item[key_selected] for item in datas if key_selected in item]
count = len(mylist)
total = sum(mylist)

average = statistics.mean(mylist) if mylist else 0

print(f"{capteur_name}:")
print(f"Avg: {average}")
print(f"Max: {max(mylist)}")
print(f"Min: {min(mylist)}")
print(f"Count: {count}")
