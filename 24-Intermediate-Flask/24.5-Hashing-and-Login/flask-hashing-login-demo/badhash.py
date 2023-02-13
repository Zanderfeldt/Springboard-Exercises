"""Examples of particularly awful hashes."""

from random import randint


def next_char(char):
    """Return next character.

        >>> next_char('a')
        'b'
    """

    return chr(ord(char) + 1)


def awful_hash(phrase):
    """Truly terrible hash:
        simply shifts each letter (a->b, etc).

        >>> awful_hash('yay')
        'zbz'
    """

    return ''.join(next_char(c) for c in phrase)


def slightly_better_hash(phrase):
    """Better hash: returns every other letter, shifted, max 4.

        >>> slightly_better_hash('penguin1')
        'qovo'

    Since this is "lossy", multiple inputs return same output:

        >>> slightly_better_hash('penguin1~pretzel7')
        'qovo'

        >>> slightly_better_hash('p?nguinZ')
        'qovo'
    """

    return ''.join(next_char(c) for c in phrase[0:8:2])


def salting_hash(phrase, salt=None):
    """Adds random salt; returns "salt|hash(phrase+salt)

        >>> salting_hash('hey', salt='abc')
        'izbd|abc'

        >>> salting_hash('hey', salt='def')
        'izeg|def'
    """

    if salt is None:
        salt = str(randint(1000, 9999))

    hashed = slightly_better_hash(f"{phrase}|{salt}")
    return f"{hashed}|{salt}"
