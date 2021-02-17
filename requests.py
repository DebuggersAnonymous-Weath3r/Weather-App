import requests
from keys import dark_sky_key, true_way_key

location = "mexico"

DS_URL = f"https://dark-sky.p.rapidapi.com/{latitude},{longitude}"

DS_Parameters = {"lang":"en","units":"auto"}


TW_URL = "https://trueway-geocoding.p.rapidapi.com/Geocode"

TW_Parameters = {"address":location,"language":"en"}


TW_Request = requests.get(TW_URL, true_way_key, TW_Parameters)