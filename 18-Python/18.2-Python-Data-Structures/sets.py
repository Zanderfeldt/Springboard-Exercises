# can also use constructor set()
lemon = {'sour', 'yellow', 'fruit', 'bumpy'}
banana = {'fruit', 'smooth', 'sweet', 'yellow'}

# union: lemon | banana    or    banana.union(lemon)

# intersection: lemon & banana   or  lemon.intersection(banana)

# difference:  lemon - banana   or   lemon.difference(banana)

# symmetric difference: banana ^ lemon   or   banana.symmetric_difference(banana)

# using operands (|,&,-,^) only works with things that are already sets
# can use . method with sets and an iterable (which will be turned into a set)
# ----------------------------------------------------------------------
# s.add(x) add item x to s

# s.copy() make new copy of s

# s.pop() remove & return arbitrary item from s

# s.remove(x) remove x from s

# membership: x in s

for adj in banana | lemon:
    print(adj)

