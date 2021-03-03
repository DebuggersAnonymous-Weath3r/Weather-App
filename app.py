from flask import Flask, request, render_template
from api_calls import get_weather
from api_calls import weather_export
import datetime
import json

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home_page():
    """A homepage with the form to search and some quick locations that can be searched."""

    return render_template('home.html')

@app.route('/search', methods=['GET', 'POST'])
def search_page():
    """A page where it will be display the seven day forcast of a specific location."""
    if request.method == "POST":
        location = request.form.get("location")
        weather_export(location)

        return render_template('search.html', location=location)
    else:
        return render_template('home.html')

@app.route('/graphs/<day>', methods=['GET', 'POST'])
def graphs_page(day):
    """A page that will display the graph indexes for air quality, hi/low temperatures etc."""
    return render_template('graphs.html', day=day)

if __name__ == '__main__':
    app.run(debug=True)