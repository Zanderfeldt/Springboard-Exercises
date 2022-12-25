"""Simple example decorator."""

import functools


def friendly(fn):
    @functools.wraps(fn)
    def wrapped(*args, **kwargs):
        print("Hello.")
        result = fn(*args, **kwargs)  # Call the wrapped function
        print("Goodbye.")
        return result

    return wrapped


@friendly
def adder(x, y):
    print("Adding...")
    return x + y