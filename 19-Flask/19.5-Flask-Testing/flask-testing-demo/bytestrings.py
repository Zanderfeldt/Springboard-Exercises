lunch = "🍔"

# turn lunch into a bytestring
byte_lunch = lunch.encode()

byte_lunch
# b'\xf0\x9f\x8d\x94' <-- woah, a bunch of bytes!

# convert back to a string
lunch_again = byte_lunch.decode('utf-8')

lunch_again
# '🍔'

# this will break, since emojis aren't ASCII!
broken = byte_lunch.decode('ascii')
# UnicodeDecodeError:
# 'ascii' codec can't decode byte 0xf0 in position 0:
# ordinal not in range(128)
