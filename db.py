from pymongo import MongoClient
client = MongoClient("mongodb://localhost:27017/")
db = client['womwom']


collection = db['notes']



def insertNote(id, note, font):
    collection.insert_one({"id" : id, "note" : note, "font" : font})
    return True
def getNote(id):
    note = collection.find_one({"id" : id})
    if note:
        return {"note" : note['note'], "font" : note['font']}
    else:
        return None