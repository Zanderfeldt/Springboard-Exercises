nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

evens = []
for num in nums:
    if num % 2 == 0:
        evens.append(num)

print(evens)

evens = [num for num in nums if num % 2 == 0]

# ------------------------------

# [what_to_append for thing in list]

new_list = [num * 2 for num in nums]
# ^ what we add   ^the loop

# same way of doing:
new_list = []
for num in nums:
    new_list.append(num * 2)

# ------------------------------
evens = [2, 4, 6, 8]

square = [num ** 2 for num in evens]

# ------------------------------

[char.upper() + '.' for char in 'lmfao']

[num/2 for num in range(10, 20)]

# -------------------Nested Comprehensions-------------------

[[0 for y in range(3)]for x in range(3)]
#  = [[0,0,0],[0,0,0],[0,0,0]]


def gen_board(size, initial_val=None):
    return [[initial_val for x in range(size)] for y in range(size)]

# ----------------------------------------------------------


[x * 2 for x in range(10) if x % 2 == 0]
# = [0, 4, 8, 12, 16]

chickens = [
    {'name': 'Henry', 'sex': 'Rooster'},
    {'name': 'Lady Gray', 'sex': 'Hen'},
    {'name': 'Junior', 'sex': 'Rooster'},
    {'name': 'Stevie Chicks', 'sex': 'Hen'},
    {'name': 'Rocket', 'sex': 'Hen'},
    {'name': 'Butters', 'sex': 'Rooster'},
]

hens = [bird['name'] for bird in chickens if bird['sex'] == 'Hen']


scores = [55, 89, 99, 87, 60, 70, 74, 76, 90, 50, 82]

# grades = ['PASS' for score in scores if score >= 70]
# syntax [do_this if something else do this for thing in things]


grades = ['PASS' if score >= 70 else 'FAIL' for score in scores]

# ------------------Dict and Set Comprehensions--------------------
# DICT
{day: 0 for day in 'MTWRFSU'}
# = {'M': 0, 'T': 0, 'W': 0, 'R': 0, 'F': 0, 'S': 0, 'U': 0}

{num: num * num for num in range(1, 10)}
#  = {1: 1, 2: 4, 3: 9, 4: 16, 5: 25, 6: 36, 7: 49, 8: 64, 9: 81}

{num: num * num for num in range(1, 10) if num % 2 == 0}
#  = {2: 4, 4: 16, 6: 36, 8: 64}

# SET
{char for char in 'abracadabra'}
#  = {'a', 'b', 'c', 'd', 'r'}

{char for char in 'hello darkness my old friend' if char not in 'aeiou'}
#  = {' ', 'd', 'f', 'h', 'k', 'l', 'm', 'n', 'r', 's', 'y'}
