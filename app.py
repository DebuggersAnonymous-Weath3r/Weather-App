from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/')
def home_page():
    """A homepage with the form to search and some quick locations that can be searched."""
    return render_template('home.html')

@app.route('/search')
def search_page():
    """A page where it will be display the seven day forcast of a specific location."""
    return render_template('search.html')

@app.route('/graphs')
def graphs_page():
    """A page that will display the graph indexes for air quality, hi/low temperatures etc."""
    return render_template('graphs.html')




if __name__ == '__main__':
    app.run(debug=True)