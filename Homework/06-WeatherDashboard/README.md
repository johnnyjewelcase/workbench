# Weather Dashboard

On page load, I create a global array to store the city search history and a global variable to keep track of the last city searched. If there is a list of cities in localstorage, I bring that into the cities array and populate the list of buttons, one for each previously-searched city. To avoid duplication, I start this list from scratch every time there's a change. The last button in the list will clear localstorage.

If there's nothing in localstorage, I hide the results divs until there is something to show, and I don't add any buttons to the list.

A user can load a city's weather one of two ways:

1. Typing a city name into the form and either hitting enter or clicking the magnifying glass button.
1. Clicking a button with a city name on it.

The city name from the form or button is passed to a function that makes an API call to OpenWeather. If the city isn't found, an error message is briefly flasshed inside the form to let the user know. Otherwise, it's added to the array of cities (if it isn't already in there) as well as the list of city buttons. The latitued and longitude of the city are stored in variables for the next, more detailed API call. The search form is then cleared.

The next API call uses the just-retrieved lat & lon variables to get details. I get the current date (reformatted from the unix format to something more readable), weather icon location, temperature, humidity, wind speed, and UV index, putting all of them in the results pane for current weather. The UV index is placed in a badge color-coded based on the official severity ranges.

The API results also contain an array for forecasted weather objects. We just want five days, so I loop through array objects 1-5, skipping 0 since we've already done the current weather above. As I loop through the forecast days, I build each card one element at a time and add it to the designated row.

Because of the use of localstorage, the next time the user refreshes or revisits the page, the same list of previously-searched city buttons will appear, and the last city that they searched will have its updated results displayed.
