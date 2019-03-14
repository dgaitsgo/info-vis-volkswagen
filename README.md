
# Information Visualization by Volkswagen
Information visualization for Volkswagen Coding Competition - hosted on `www.IT-Talents.de`

## Introduction
This project is the submission for the "Information Visualization" competition by Volkswagen of David Gaitsgory, Sebastian Kunz and Jessica Liu. Given the data catalog of the VW-Group, ascessible through the OKAPI provided by Volkswagen, visualize the data in an accessible and user friendly interface and proposing a graphical insight about the versatility of the productdata.
We took three weeks to finish the project. We worked with the popular JavaScript framework reactJS.

-  [Setup](#setup)

-  [Who we are](#who-we-are)

-  [Concept](#concept)

- Insights in:
	-  [Frontend](#frontend)
	-  [UX/UI Design and Styling](#UX/UI Design and Styling)
	-  [Backend](#backend)

## Setup
Visit `www.vwg-okapi-client.de` and explore our website!

### Deploy a development Server

#### MAC OS / LINUX

1.  `git clone https://github.com/dgaitsgo/info-vis-volkswagen`
2.  `cd info-vis-volkswagen/ui`
3.  `npm install` or `yarn install` -> missing npm or yarn ?
4.  `npm start` or `yarn start`

#### WINDOWS

1.  `git clone https://github.com/dgaitsgo/info-vis-volkswagen`
2.  `cd info-vis-volkswagen/ui`
3.  `npm install` or `yarn install` -> missing npm or yarn ?
4.  `npm start` or `yarn start`

## The concept
Let users configure car and compare car's wltp data

## Who we are
David Gaitsgory, Sebastian Kunz, Jessica Liu 

All of us study at 42 Silicon Valley in California, USA.

## Frontend

Generally speaking the frontend is divided in three main parts.
1. Containers - making use of components and handling the state of the current page
2. Components - smaller independent parts that are used to build a feature
3. Modules - even smaller parts that are used by components

### Landing Page
Entering our website or clicking on the VW-Group logo you are presented an interactive 3D force-graph. It illustrates the network of the VW-Group and points out the relationships between the brands and models. The user can hover over the spheres to see the label or drag them around and play with the physics.
The graph itself is made with a force-graph component that was ported to react. We gathered all the possible models of a brand that exist across countries and stored them in a JSON. Therefore the used data is not live. We made this decision, because grabbing all the models of all countries is extremely expensive regarding the performance of our application. Also updating the data is not a big deal. Whenever a new model is published we can simply add it to the JSON.

### Country Selection
With a click on the "Explore the Possibilities" title on the landing page or "Country" field of the navigation bar you are asked to select a country. The selected country determines the brands you can choose and the language of descriptions on the [configure page](#Configure-your-model).
We use the received ISO 3166-2 codes to give each country its corresponding flag. Once you click on one of the flags your country is selected and move on to the [Brand Selection](#brand-selection).

### Brand Selection
This page lets the user pick one of the presented brands that are available in the previously selected country. This determines the models you can choose. Please note you are limited to one brand at the time.

### Model and Model-Type Selection
This page lets you choose from the presented models. When you click on one of the models a modal opens and asks the user to specify a type for that model. Please note that you have to select at least one model and type to continue to the next page. To deselect a model open the model again and click on the selected type (highlighted in blue). To prevent the user from spamming the model button we make use of a debouncer to keep the amount of request low.

### Model Comparison
This is the core feature of our application. For all of your selected types we build a default configuration, so that we can present you WLTP data and images. Otherwise you would need to configure every single model yourself.
The bar chart offers a quick overview on how the the different models compare against each other. You can switch between CO2 emissions and fuel consumption.
Each selected model has its unique card. The card header specifies the model name, type name, place in the ranking and the average of the selected compare mode (CO2 consumption or fuel consumption). In the card body a preview of the current model configuration, car weight, fuel type, CO2 consumption, fuel consumption and the tire classification are presented. In case there is no WLTP data the card says "No Data Found" [click here](#no-data-found) to read more. To see more detailed information about the CO2 consumption, fuel consumption or tire classification you can click on the arrow. Depending on the selected comparemode the cards are sorted, so that the model with the least CO2 emissions/fuel consumption are ranked as the best. In case you want to change the configuration of a model click its "configure" button. To see how you can configure your model click here.

### Configure your model
Once you click the configure button a modal opens. If there are images for your configuration you will have a preview of the current configuration. Below that you can see all the selected options, that are currently part of the configuration. Clicking the small 'X' removes the option from the configuration. You can manually browse through the categories or search for categories via the search bar. When you click on a category it shows you all the valid and invlaid (grey background) choices that you can make. Already selected choices are highlighted.

Just like for the the Model Selection we make use of a debouncer to prevent floads of network requests.

## UX/UI Design and Styling

### understand the needs
We designed the user experience to be linear. After we read the documents on the OKPAI, and request our data from OKAPI. We figured out in order to create a car configuration, we have to let user select a country, brand, and model. For the car configuration, user can select choices of options, select or remove options, pictures of the current car, check configuration that is buildable, and get the wltp values of cars. 

Base on those functions, we had drew several wireframes to make sure our user story is easy to understand. After the disscussion, we deceied to make five page:
1. main page - introduce our website and let user know it's configuration website
2. country selection page - show how many countries 
3. brand selection page - show total brands under the country
4. model and type selection page - show total model under the brand, and total type under each single model
5. car comparesion page - show the result of multiple cars that user selected

Whenever user want to go back any page, they can click Navigation Bar's list to go back.

### Style
For Styling and Design, we had searched different websites' car configuration. We decieded to make webiste a nice, clear, simple and minimalism style. Also, it need to be look professional and reliable. It has to be a responsive website to allow user can modify their car on the phone. Most of users recently days are using their phone to browse website. 

### Challenge
The biggest challenge in this project is that not all the car's model and type has image. 

## Backend

origin-cross

### No Data Found / Missing image

At the current state of OKAPI only Audi models have image support. We do not have any control over this and hope that VW adds new images soon.

The "No Data Found" messages appears when we could not find WLTP data for that model.

In the OKAPI documentation VW writes "Please be advised, that currently not for all models within OKAPI, WLTP values can be provided. As soon as the homologation for all vehicles has been conducted, WLTP values will be available for all combinations via OKAPI.".



### Client sided routing

DONT OPEN THE NAVIGATION FILE PLLLLLLLLLLLLLLLLEAAAAAAAAAAAAAAASE ITS THE FINEST SPAGETTTTT



## Improvements to OKAPI

First of all we want to mention, that it is difficult to write a perfectly understandable documentation. We appreaciate the appealing design and interactivity. The CURL examples are amazing and were very helpful. In the following we want to list problems we ran into while working with OKAPI and bring up possible new features and improvements. We are happy to help improve OKAPI!



### Missing Images and WLTP data

When we were experimenting with the images endpoint we were not able to consistenly get images of valid configurations. After one day of stress and frustration we realised that there are simply only images for the Audi models. This discovery was very disapointing. It would have been great when you provide a disclamer, just like for the WLTP data, that images are currently only available with Audi models.

Speaking of WLTP data. It is very demotivating to take part in a data visualization competition with a lot of missing data. For example all the models of the SEAT brand in Germany do not have WLTP data. For other brands the results are rather disapointing.

Inside of the WLTP object there is also an NEDC object. However if there is no WLTP available that means that there is also no NEDC data available. It would have been great if WLTP and NEDC are independent, so that when WLTP is missing we can at least grab the NEDC data.



### Naming conventions

What was very confusing to us was understanding the exact difference between choices and options. The words are quite similar and

Another thing that we noticed is that the the typenames for the models are filled with parentheses, exclamation mark, pound signs and sometimes in only capital letters. We could not explain to ourselves how that naming makes sense. For us it makes the typename less clear and creates confusion.



### False/Misleading information in the documentation

We have noticed that there are several spelling mistake in the guide. "Complete a configuration", "Repair a configuration" and "Check the configuration" are all missing a 's' after '/configuration' in the request URL. The request URL should be "api.productdata.vwgroup.com/v2/configuration**s**/" instead of "api.productdata.vwgroup.com/v2/configuration/".

Next up are "Operations". As far as we can tell operations make use of configurations. Therefore it would make sense if the request URL takes a "configuration_id" as parameter. This is not the case and is still very confusing to us. All the API-Endpoints under Operations require "country_code", at least when you follow the documentation. However these endpoints resolve into error responses. So either the documentation is wrong or the endpoint is not working the way it should. Either way it is basiclly impossible to understand what Operations are usefull for.

In addition to that it would be helpful if the provided response schema in the documentation is more explicit. Statements like "code: (string) the option's code" are unnecessary and should be replaced with a more explicit alternative.

One more thing that got us very confused was that type_id something.



### Organize Models by categories

As of now when you request models of a brand you receive a code, id and name. It would be great if you add more information to the object. For example add a category like SUV, Coupé, ... so that the user can filter models, that he is not interested in. This would greatly improve the user accessibility.



### Default Configuration Endpoint / Thumbnail endpoint

We implemented a custom endpoint that generates a default configuration, so that we can show the user some WLTP data and an image, without forcing them to make a buildable and distinct car first. When choosing your models, due to the insane amount of API calls, it is not practical to generate a default configuration for every single model of a brand and then fetch the images. It would be great if there is some sort of default configuration endpoint or thumbnail endpoint. These endpoints are great when you want to get an aproximate of the WLTP data or a first impression if the style of the car interests you.




## Testing



## Room for improvement

-reset "session" changes during configu000000000000000ration redo/undo kinda thing ye
