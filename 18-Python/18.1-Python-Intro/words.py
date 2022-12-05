def print_upper_words(words):
    """Print all words in uppercase"""

    for word in words:
        print(word.upper())


print_upper_words(['hello', 'hey', 'goodbye', 'yo', 'yes'])


def print_upper_words2(words):
    """Print each word in uppercase, but only if it starts with E or e"""

    for word in words:
        if word.startswith('e') or word.startswith('E'):
            print(word.upper())


print_upper_words2(['eagle', 'Edward', 'Alfred'])


def print_upper_words3(words, must_start_with):
    """Print each word in uppercase, but only if it starts with one of the given letters"""

    for word in words:
        for letter in must_start_with:
            if word.startswith(letter):
                print(word.upper())
                break


print_upper_words3(["eagle", "Edward", "Alfred", "zope"],
                   must_start_with=["A", "E"])
