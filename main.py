from flask import Flask, render_template, jsonify, request
from flask_cors import CORS

from db import insertNote, getNote
from tokenizer import get_random_string

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')
@app.route('/post/note', methods=['POST'])
def post_note():
    data = request.get_json() # for json format
    note = data.note
    try:
        id = get_random_string()
        insertNote(id, note)

        return jsonify({'id': id}), 200
    except:
        print("Error making a new note.")
        return jsonify({'error': 'Failed to create note'}), 500
    

@app.route('/note/<id>', methods=['GET'])
def get_note(id):
    try:
        note = get_note(id)
        return render_template('note.html', note=note)
    except:
        return render_template('notfound.html')

if __name__=='__main__':
    app.run('0.0.0.0', debug=True, port=8080)