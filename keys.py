### It is a bad idea to share API keys. So if you want to test the API calls, go to Rapid API and get your own keys there


### make a copy of this file, and rename it keys.py

import os

api_key = os.getenv("API_KEY")

dark_sky_key = { ### https://rapidapi.com/darkskyapis/api/dark-sky/endpoints
    'x-rapidapi-key': api_key,
    'x-rapidapi-host': "dark-sky.p.rapidapi.com"
    }

true_way_key = { ### https://rapidapi.com/trueway/api/trueway-geocoding/endpoints
    'x-rapidapi-key': api_key,
    'x-rapidapi-host': "trueway-geocoding.p.rapidapi.com"
    }