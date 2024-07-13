import random as rd



import string




all_letters = string.ascii_lowercase+string.ascii_uppercase+'#%&'

charlist = ' '.join(all_letters).split(' ')

def get_random_string(length = 30):
    token = ''
    for i in range(length):
        token+= rd.choice(charlist)
    return token