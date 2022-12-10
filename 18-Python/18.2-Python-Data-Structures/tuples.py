# Tuples are immutable, ordered sequences (like a list but immutable)
# you can put anything in a tuple, but it's immutable
# items dont have to be unique

colors = ('red', 'yellow', 'green')

# for single item tuples, you must put comma:

tup = (3,)
# type(tup) = tuple

board = {
    (0, 0): 'X',
    (0, 1): None,
    (0, 2): 'O',
    (1, 0): 'X',
    (1, 1): 'O'
}

# can use .count or .index
