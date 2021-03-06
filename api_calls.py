import json
import requests
from keys import dark_sky_key, true_way_key

def get_weather(location):
    # True Way
    TW_URL = "https://trueway-geocoding.p.rapidapi.com/Geocode"
    TW_Parameters = {"address":location,"language":"en"}

    TW_Request = requests.request("GET", TW_URL, headers = true_way_key, params = TW_Parameters)
    TW_Results = TW_Request.json()

    location_coords = TW_Results['results'][0]['location']

    lat = location_coords['lat']
    lng = location_coords['lng']

    # Dark Sky
    DS_URL = f"https://dark-sky.p.rapidapi.com/{lat},{lng}"
    DS_Parameters = {"lang":"en","units":"auto","exclude":"minutely,flags"} # Make these parameters into variables

    DS_Request = requests.request('GET', DS_URL, headers =dark_sky_key, params = DS_Parameters )
    DS_Results = DS_Request.json()

    return DS_Results

