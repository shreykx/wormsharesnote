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
    note = data['note']
    font = data['font']

    if (not ((note.strip()) or font.strip())):
        return jsonify({'error': 'Note and font cannot be empty'}), 400
    try:
        id = get_random_string()
        insertNote(id, note, font)

        return jsonify({'id': id}), 200
    except:
        print("Error making a new note.")
        return jsonify({'error': 'Failed to create note'}), 500
    

@app.route('/note/<id>', methods=['GET'])
def get_note(id):
    try:
        data = getNote(id)

        note = data['note']
        font = data['font']
        
        return render_template('note.html', note=note, font=font)
    except:
        return render_template('notfound.html')

if __name__=='__main__':
    app.run('0.0.0.0', debug=True, port=8080)