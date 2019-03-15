

# Information Visualization Competition by Volkswagen
Information visualization for Volkswagen Coding Competition - hosted on [`www.IT-Talents.de`](https://www.it-talents.de/)

## Introduction
This project is the submission for the "Information Visualization" competition by Volkswagen of David Gaitsgory, Sebastian Kunz and Jessica Liu. Given the data catalog of the VW-Group, accessible through the OKAPI provided by Volkswagen, visualize the data in an accessible and user friendly interface and proposing a graphical insight about the versatility of the productdata.
We spent three weeks to finish the project. We worked with the popular JavaScript framework reactJS.

- [Setup](#setup)
- [Concept](#concept)
- [UX/UI Design and Styling](#uxui-design-and-styling)
- [Frontend](#frontend)
- [Backend](#backend)
- [Testing](#testing)
- [Room for Improvements](#room-for-improvements)

## Setup
Visit `www.vwg-okapi-client.de` and explore our website!

### Deploy a development Server

#### MAC OS / LINUX

1.  `git clone https://github.com/dgaitsgo/info-vis-volkswagen`
2.  `cd info-vis-volkswagen/ui`
3.  `npm install` or `yarn install` -> missing npm or yarn ?
4.  `npm start` or `yarn start`

#### DOCKER

## About Us
We three are students at 42 Silicon Valley in Fremont, California. Regarding this project we split up the workload into three main sectors.
1. UX/UI Design and Styling - Jessica Liu
2. Frontend - Sebastian Kunz
3. Backend - David Gaitsgory

Obviously everybody contributed in every sector and we finished this project as a team and not as three individuals.

## UX/UI Design and Styling

### Concept
After getting familiar with the OKAPI and its flow, we decided on a linear user experience. Each page narrows the possibilities and finally leads to a page where you can compare and configure your selected models.

Based on those functions, we had drew several wireframes to make sure our user story is easy to understand. After the disscussion, we deceied to make five page:
1. main page - introduce our website and let user know it's configuration website
2. country selection page - show how many countries
3. brand selection page - show total brands under the country
4. model and type selection page - show total model under the brand, and total type under each single model
5. car comparesion page - show the result of multiple cars that user selected and configurate their own car

Whenever user want to go back any page, they can click Navigation Bar's options to go back.

### Style
Our website follows a minimalistic, and easy to follow style, matching the simple user story. We picked plain colors like black, white, grey and blue tones.
We put a lot of effort into responsive web design and mobile compatibility. Due to the great amount of mobile traffic nowadays, this was an important feature for us.

## Frontend
Generally speaking the frontend is divided in three main parts.
1. Containers - making use of components and handling the state of the current page
2. Components - smaller independent parts that are used to build a feature
3. Modules - even smaller parts that are used by components

### Landing Page
Entering our website or clicking on the VW-Group logo, located in the top left corner, you are presented an interactive 3D force-graph. It illustrates the network of the VW-Group and points out the relationships between the brands and models. You can hover over the spheres to see the label or drag them around and play with the physics.
The graph itself is made with the force-graph component that was ported to react. We gathered all the possible models of a brand that exist across countries and stored them in a JSON. Therefore the used data is not live. We made this decision, because grabbing all the models of all countries is extremely expensive regarding the performance of our application. Also updating the data is not a big deal. Whenever a new model is published we can simply add it to the JSON.

### Country Selection
With a click on the "Explore the Possibilities" title on the landing page or "Country" field of the navigation bar you are asked to select a country. The selected country determines the brands you can choose and the language of descriptions on the [configure page](#configure-your-model).
We use the received ISO 3166-2 codes to give each country its corresponding flag. Once you click on one of the flags your country is selected and move on to the [Brand Selection](#brand-selection).

### Brand Selection
This page lets the asks you to pick one of the presented brands that are available in the previously selected country. This determines the models you can choose. Please note you are limited to one brand at the time.

### Model and Model-Type Selection
This page lets you choose from the presented models. When you click on one of the models a modal opens and asks the user to specify a type for that model. Please note that you have to select at least one model and up to a maximum of ten models to continue to the next page. To deselect a model open the model again and click on the selected type (highlighted in blue). To protect ourselves from an insane amount of network requests we make use of a debouncer.

### Model Comparison
This is the core feature of our application. For all of your selected types we build a default configuration, so that we can present you WLTP data and images. Otherwise you would need to configure every single model yourself.
The bar chart offers a quick overview on how the the different models compare against each other. You can switch between CO2 emissions and fuel consumption.
Each selected model has its unique card. The card header specifies the model name, type name, place in the ranking and the average of all the WLTP categories combined of the selected compare mode (CO2 consumption or fuel consumption). In the card body a preview of the current model configuration, car weight, fuel type, CO2 consumption, fuel consumption and the tire classification are presented. In case there is no WLTP data the card says "No Data Found" [click here](#no-data-found) to read more about why there isn't always WLTP data. To see more detailed information about the CO2 consumption, fuel consumption or tire classification you can click on the arrow. Depending on the selected compare mode the cards are sorted, so that the model with the least CO2 emissions/fuel consumption are ranked as the best. In case you want to change the configuration of a model click its "configure" button. To see how you can configure your model click [here](#configure-your-model).

### Configure your model
Once you click the configure button a modal opens. Below that you can see all the selected options, that are currently part of the configuration. Clicking the small 'X' removes the option from the configuration. You can manually browse through the categories or search for categories via the search bar. When you click on a category it shows you all the valid and invalid (grey background) choices that you can make. Already selected choices are highlighted.

Just like for the the Model Selection we make use of a debouncer to prevent floads of network requests.



## Backend

The backend can be split into several main services :
-	[Identity](#identity)
-	[Product data](#product-data)
-	[Default configuration](#default-configurations)
-	[Thumbnail service](#thumbnail-service)
-	[Custom configuration](#custom-configuration)

### Identity
One authenticates to Okapi through the use of a JSON Web Token, generated as a seed from client credentials. The token has to be included in every subsequent request and refreshed every hour. With its middleware design, we can define a function in Express to load and check the validity of a token or otherwise request and save a new one.

### Product Data
To avoid CORS conundrums, we created an API to sit on top of the OKAPI. All requests from client hit the client's origin and our API makes requests on behalf of the client. While this breaks the convenient E-TAGS mechanism OKAPI includes in its headers, we nonetheless set the appropriate cache headers on our end to prevent unnecessary requests. Okapi is structured in such a way that it was easy to declaratively duplicate its endpoints.

### Default Configurations
To reiterate the goal of our project, we convinced an internal auditing tool that would allow stakeholder to discover which vehicles had which data and which did not. One key datapoint by which the OKAPI could be audited is WLTP data.
Especially since, by September 2019[link], WLTP will become a cornerstone for emissions compliance in the EU.
Currently, in order to get a WLTP value for a given vehicle, one has to specify a set of options that lead to a distinct model. What a distinct model means can be found [here](https://productdata.vwgroup.com/quick-start.html). The whole request chain takes the following steps:

1. Create a configuration for a model
2. For the configuration, resolve options to get a distinct build
3. Make the configuration a distinct build by setting the options
4. Finally, obtain the WLTP values

At the moment, many vehicles in the OKAPI database do not have WLTP values. All four requests have to be performed in order to know whether a model has this data or not. Likewise, our app has a comparison feature for models within a brand. If a user selects all of the cars for let's say Audi in Germany, we'll need 4 * 32 or 128 requests to know if a model has WLTP or data or not. Repeated over a number of users, we can imagine how much of a burden this could post on the API. Cacheing cannot save us as a configuration is unique every time it is requested for a model.
There's only four steps, so eliminating just one of them means 25% less work. What we did was imagine a new service that could be integrated into the OKAPI : Default configurations for models.

### Custom Configuration

### Thumbnails
The goal of this service is to efficiently display photos of models for to help a user in
choosing which models to compare. While it's clear on the front end on how to efficiently
load image data (lazy-loading, ensuring sizes are never larger than how they'll appear on the page) we were initially unsure of how to set up the backend to make for a fluid user experiences. We wondered which methods would be faster, which would take less resources and what's more important for the user. We set up a few experiments to see, starting with the simplest to make sure we didn't prematurely optimize.
When a user accesses a brand, get a list of configurations and check if we already have a default configuration for the vehicle. If so, load its image URLS.

How API works :
- In order to get a photo, a configuration must be a buildable model
- A buildable model means a model for a which a certain minimum of options are added
- The API allow for a model to be undefined and resolve which options need to be added for the car to be buildable

Gotchyas :
- The images are quite large

Solution :
- Save configurations as so :
	id, expiration_date, delete_link, self_link, choices_links, model_id, brand_id, links_to_images, thumbnail

### Error Handling

### Rooms for Improvement (Product Data API)
- choices/options terminology
- configurations/configuration typo
- countryCode, country_code
- default/base configurations to get images/emissions data easier
- Make Request Body/Parameters headers clearer
- Ability to filter by vehicle type (not just brand)
- Image for a model


### No Data Found / Missing image

At the current state of OKAPI only Audi models support images. We do not have any control over this and hope that VW adds new images in the future.
The "No Data Found" messages appears when we could not find WLTP data for that model.
In the OKAPI documentation VW writes "Please be advised, that currently not for all models within OKAPI, WLTP values can be provided. As soon as the homologation for all vehicles has been conducted, WLTP values will be available for all combinations via OKAPI.".

### Client sided routing

DONT OPEN THE NAVIGATION FILE PLLLLLLLLLLLLLLLLEAAAAAAAAAAAAAAASE ITS THE FINEST SPAGETTTTT

## Testing
We started the project one week before the original deadline. Therefore we had to write code as fast as possible. When the time extension was announced most of our logic was already finished. Since we didn't begin with TDD (Test-Driven-Development), in the first place it didn't make sense to us to write unit-test just for the sake of satisfying the grading criteria. We decided to invested our time in refining the codebase and implementing more features rather than writing automated test for code that we already manually tested. Even tho we can not prove it in the form of code, we can guarantee that we tested our features rigorously.  For the next project we would like to start with TDD from the beginning and cover our code base with detailed automated tests.

## Room for improvements
-more than one brand


## Improvements to OKAPI
First of all we want to mention, that we really appreciate the interactive design of the documentation. The guide is for the most part well made. The CURL examples are amazing and were very helpful, when learning the flow of the API. However there we had some unpleasant moments while working with OKAPI. We want to tell you about our experience and give possible solutions to the problems we ran into. We are happy to work with you in the future to further improve OKAPI.

### Missing Images and WLTP data
When we were experimenting with the images endpoint we were not able to consistently get images of valid configurations. After one day of frustration we realized that there are only images for the Audi models. This discovery was very disappointing. It would have been great when you provide a disclaimer, just like for the WLTP data, that images are currently only available within the Audi brand.
Speaking of WLTP data. It is very demotivating to take part in a data visualization competition when a lot of data is missing. For example all the models of the SEAT brand in Germany do not have WLTP data. For other brands the results are rather similar.
Inside of the WLTP object there is also an NEDC object. However if there is no WLTP available that means that there is also no NEDC data available. It would have been great if WLTP and NEDC are independent, so that when WLTP is missing we can at least grab the NEDC data.

### Naming conventions
What was very confusing to us was understanding the exact difference between choices and options. The words are quite similar and
Another thing that we noticed is that the the type names for the models are filled with parentheses, exclamation mark, pound signs and sometimes in only capital letters. We could not explain to ourselves how that naming makes sense. For us it makes the typename less clear and creates confusion.

### False/Misleading information in the documentation
We have noticed that there are several spelling mistake in the guide. "Complete a configuration", "Repair a configuration" and "Check the configuration" are all missing a 's' after '/configuration' in the request URL. The request URL should be "api.productdata.vwgroup.com/v2/configuration**s**/" instead of "api.productdata.vwgroup.com/v2/configuration/".
Next up are "Operations". As far as we can tell operations make use of configurations. Therefore it would make sense if the request URL takes a "configuration_id" as parameter. This is not the case and is still very confusing to us. All the API-Endpoints under Operations require "country_code", at least when you follow the documentation. However these endpoints resolve into error responses. So either the documentation is wrong or the endpoint is not working the way it should. Either way it is basically impossible to understand what Operations are used for.
In addition to that it would be helpful if the provided response schema in the documentation is more explicit. Statements like "code: (string) the option's code" are unnecessary and should be replaced with a more explicit description.
One more thing that got us very confused was that type_id something.

## Suggestions for OKAPI

### Organize Models by categories
As of now when you request models of a brand you receive a code, id and name. It would be great if you add more information to the object. For example add a category like SUV, Coupé, ... so that the user can filter models, that he is not interested in. This would greatly improve the user accessibility.

### Default Configuration Endpoint / Thumbnail endpoint
We implemented a custom endpoint that generates a default configuration, so that we can show the user some WLTP data and an image, without forcing them to make a buildable and distinct car first. When choosing your models, due to the insane amount of API calls, it is not practical to generate a default configuration for every single model of a brand and then fetch the images. It would be great if there is some sort of default configuration endpoint or thumbnail endpoint. These endpoints are great when you want to get an approximate of the WLTP data or a first impression if the style of the car interests you.

### 3D Models Endpoint
Yes. This does sound unrealistic and we don't expect you to actually make a 3D model endpoint. But wouldn't it be awesome to have access to 3D models? We imagine so. In addition to images, it would be great to provide a 3D file format that one could use to amaze the user.


