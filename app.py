from flask import Flask, render_template
import json

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return "<h1>Weath3r</h1><p>Prototype Weather App</p>"

if __name__ == '__main__':
    app.run()