from flask import Flask, request, render_template
from api_calls import get_weather
import datetime
import json

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home_page():
    """A homepage with the form to search and some quick locations that can be searched."""
    if request.method == "POST":
        location = request.form.get("location")
        api_results = get_weather(location)
        weekly = api_results["daily"]["data"]
        currently = api_results["currently"]
        weekdays = []
        for i in range(len(weekly)):
            date = datetime.datetime.fromtimestamp(weekly[i]["time"])
            day = date.strftime('%A')
            weekdays.append(day)
        context = {
            "location" : location,
            "api_results" : api_results,
            "currently" : currently,
            "weekly" : weekly,
            "weekdays" : weekdays
        }
        return render_template('search.html', **context)
    else:
        return render_template('home.html')

@app.route('/search', methods=['GET', 'POST'])
def search_page():
    """A page where it will be display the seven day forcast of a specific location."""
    if request.method == "POST":
        location = request.form.get("location")
        api_results = get_weather(location)
        weekly = api_results["daily"]["data"]
        currently = api_results["currently"]
        weekdays = []
        for i in range(len(weekly)):
            date = datetime.datetime.fromtimestamp(weekly[i]["time"])
            day = date.strftime('%A')
            weekdays.append(day)
        context = {
            "location" : location,
            "api_results" : api_results,
            "currently" : currently,
            "weekly" : weekly,
            "weekdays" : weekdays
        }
        return render_template('search.html', **context)
    else:
        return render_template('home.html')

@app.route('/graphs')
def graphs_page():
    """A page that will display the graph indexes for air quality, hi/low temperatures etc."""
    return render_template('graphs.html')
