# Information Visualization by Volkswagen
Information visualization for Volkswagen Coding Competition - hosted on `www.IT-Talents.de`

## Introduction
This project is the submission for the "Information Visualization" competition by Volkswagen of Sebastian Kunz, David Gaitsgory and Jessica Liu. Given the data catalog of the VW-Group, ascessible through the OKAPI provided by Volkswagen, visualize the data in an accessible and user friendly way and proposing a graphical insight about the versatility of the productdata.
We took three weeks to finish the project. We worked with the popular JavaScript framework react.

- [Setup](#setup)
- [Who we are](#who-we-are)
- [Concept](#concept)
- Insights in:
    - [Frontend](#frontend)
    - [Styling and Design](#styling-and-design)
    - [Backend](#backend)

## Setup
Visit `www.vwg-okapi-client.de` and explore our website!

### Deploy a development Server
#### MAC OS / LINUX
1. `git clone https://github.com/dgaitsgo/info-vis-volkswagen`
2. `cd info-vis-volkswagen/ui`
3. `npm install` or `yarn install` -> missing npm or yarn ?
4. `npm start` or `yarn start`

### WINDOWS
fuck keine ahnung alda

## The concept
configure car and compare wltp data

## Who we are
We are Sebastian Kunz (19) from Hamburg, Germany, David Gaitsgory (24) from Boston, USA and Jessica Liu (30?) from ... Taiwan. All of us study at 42 Silicon Valley in California, USA.

## Frontend - Sebastian Kunz
We designed the user experience to be linear.

Generally speaking the frontend is divided in three main parts.
1. Containers - making use of components and handling the state of the current page
2. Components - smaller independent parts that are used to build a feature
3. Modules - even smaller parts that are used by components

### Force-Graph
Entering our website or clicking on the VW-Group logo you are presented an interactive 3D graph. It illustrates the network of the VW-Group and points out the relationships between the brands and models. The user can hover over the shperes to see the label or drag them around and play with the physics.
The graph itself is made with a force-graph component that was ported to react. We gathered all the possible models of a brand that exist across countries and stored them in a JSON. Therefore the used data is not live. We made this decision, because grabing all the models of all countries and removing duplicates is extremely expensive regarding the performance of our application. Also updating the data is not a big deal. Whenever a new model is published we can simply add it to the JSON.

### Country Selection
With a simple click on the "Country" field on the navigationbar or the "Explore the Possibilities" title on the graph page you are asked to select a country. The selected country determines the brands you can choose and the language of descriptions on the configure page.
We use the received ISO 3166-2 codes to give each country its corresponding flag. Once you click on one of the flags your country is selected and move on to the Brand Selection.

### Brand Selection
This page lets the user pick one of the selected brands that are available in the previously selected country.

### Model and Model-Type Selection
This page lets the user pick one to all of the presented models. When you click on one of the models a modal opens and asks the user to specify a type for that model. Please note that you have to select at least one model and type to continue to the next page. To deselect a model open the model again and click on selected type. To prevent the user from spamming the model button we make use of a debouncer to keep the amount of request low.

### Model Comparison
This is the core feature of our application. For all of your selected types we build a default configuration, so that you can get an idea on what kind of dimensions your models play in. The barchart offers a quick overview on how the the different models compare against each other. You can switch between CO2 emissions and fuel consumption.
Each selected model has its unique card. The card header specifies the modelname, typename, ranking and the average of the selected comparemode (CO2 consumption or fuel consumption). In the card body a preview of the current model configuration, car weight, fuel type, CO2 consumption, fuel consumption and the tire classification can be found. In case there is an image missing or the card says "No Data Found" click here to read more. To see more detailed information about the CO2 consumption, fuel consumption or tire classification you can click on the arrow. Depending on the selected comparemode the cards are sorted, so that the model with the least CO2 emissions/fuel consumption are ranked as the best. In case you want to change the configuration of a model click its "configure" button. To see how you can configure your model click here.

### Configure your model
Once you click the configure button a modal opens. If there are images for your configuration you will have a preview of the current configuration. Below that you can see all the selected options, that are currently part of the configuration. Clicking the small 'X' removes the option from the configuration. You can manually browse through the categories or search for categories via the search bar. When you click on a category it shows you all the valid and invlaid (grey background) choices that you can make. Already selected choices are highlighted.
Just like for the the Model Selection we make use of a debouncer to prevent floads of network requests.

### No Data Found / Missing image
At the current state of OKAPI only Audi models have image support. We do not have any control over this and hope that VW adds new images soon.
The "No Data Found" messages appears when we could not find WLTP data for that model.
In the OKAPI documentation VW writes "Please be advised, that currently not for all models within OKAPI, WLTP values can be provided. As soon as the homologation for all vehicles has been conducted, WLTP values will be available for all combinations via OKAPI.".

### Client sided routing
DONT OPEN THE NAVIGATION FILE PLLLLLLLLLLLLLLLLEAAAAAAAAAAAAAAASE ITS THE FINEST SPAGETTTTT

## Styling and Design - Jessica Liu

## Backend - David Gaitsgory
-cross origin

## Improvements to OKAPI
First of all we want to mention, that it is difficult to write a perfectly understandable documentation. We appreaciate the appealing design and the interactivity. The CURL examples are amazing and were very helpful. In the following we want to list problems we ran into while working with OKAPI and want to bring in new ideas and improve existing endpoints. We are very interested in working with you to improve OKAPI.

### Missing Images and WLTP data
When we were experimenting with the images endpoint we were not able to consistenly get images of valid configurations. After one day of stress and frustration we realised that there are simply only images for the Audi models. This discovery was very disapointing. It would have been great when you provided a disclamer, just like for the WLTP data, that images are currently only available with audi models.
Speaking of WLTP data. It is very demotivating to take part in a data visualization competition with a lot of missing data. For example all the models of the SEAT brand in Germany do not have WLTP data. For other brands the results are rather disapointing. Only the models of the Audi brand seem to provide the most data.
Inside of the WLTP object there is also an NEDC object. However if there is no WLTP available that means that there is also no NEDC data available. It would have been great if WLTP and NEDC are independent, so that when WLTP is missing we can at least grab the NEDC data.


-type id
-choices and options
### Naming conventions
What was very confusing to us was understanding the exact difference between choices and options. The words are quite similar and



### False information in the documentation / Misleading information
We have noticed that there are several spelling mistake in the guide. "Complete a configuration", "Repair a configuration" and "Check the configuration" are all missing a 's' after '/configuration' in the request URL. The request URL should be  "api.productdata.vwgroup.com/v2/configuration**s**/" instead of "api.productdata.vwgroup.com/v2/configuration/".
Next up are "Operations". As far as we can tell operations make use of configurations. Therefore it would be logical if the request URL takes a configuration_id as parameter. This is not the case and is still very confusing to us. All the API-Endpoints under Operations require a country_code, at least when you follow the documentation. However these endpoints resolve into error responses. So either the documentation is wrong or the endpoint is not working the way it should. Either way it is basiclly impossible to understand what these operations are usefull for.
One more thing that got us very confused was that type_id something.



### Organize Models by categories
As of now when you request models of a brand you receive a code, id and name. It would be great if you add more information to the object. For example add a category like SUV, Coupé, ... so that the user can filter models, that he is not interested in. This would greatly improve the user accessibility.

### Default Configuration Endpoint / Thumbnail endpoint
We implemented a custom endpoint that generates a default configuration, so that we can show the user some WLTP data and an image, without forcing them to make a buildable and distinct car first. When choosing your models, due to the insane amount of API calls, it is not practical to generate a default configuration for every single model of a brand and then fetch the images. It would be great if there is some sort of default configuration endpoint or thumbnail endpoint. These endpoints are great when you want to get an aproximate of the WLTP data or a first impression if the style of the car interests you.


## Testing

## Room for improvement
-reset "session" changes during configu000000000000000ration redo/undo kinda thing ye