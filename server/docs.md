## Backend

The backend can be split into several main services :
[-] Identity
[-] Product data
[ ] Default configuration
[ ] Thumbnail service
[ ] Custom configuration

### Identity
One authenticates to Okapi through the use of a JSON Web Token, generated as a seed from client credentials.
The token has to be included in every subsequent request and refreshed every hour. With its middleware design,
we can define a function in Express to load and check the validity of a token or otherwise request and sae a new one.

```
//Identity Code
```

### Product Data

To avoid CORS conundrums, we created and API to sit on top of the Product API. All requests from client hit the client's origin
and our API makes requesets onf behalf of the client. While this breaks the convenient e-tags mechanism OKAPI includes
in its headers, we nonetheless set the approppriate cache headers on our end as to prevent unecessary re-requests.
Okapi is structed in such a way that it was easily to declaritively duplicate its endpoints:

```
Product data code
```

### Default Configurations
To reiterate the goal of our project, we concieved an internal auditing tool that would allow stakehodler to discover
which vehicles had which data and which did not. One key datapoin by which the OKAPI could be audited is WLTP data.
Especially since, by September 2019[link], WLTP will become a cornerstoone for emissions compliance in the EU.
Currently, in order to get a WLTP value for a given vehicle, one has to specify a set of options that lead to a distinct
model. What a distinc model means can be found here[link]. The whole request chain takes the following steps:

- create a configuration for a model
- for the configuration, resolve options to get a distinct build
- make the configuration a distinct build  by setting the options
- finally, obtain the WLTP values

At the moment, many vehicles in the OKAPI database do not have WLTP values. All four requests have to be performed
in order to know whether a model has this data or not. Likewise, our app has a comparison feature for models within
a brand. If a user selects all of the cars for let's say Audi in Germany, we'll need 4 * 32 or 128 requests to know
if a model has WLTP or data or not. Repeated over a number of users, we can imagine how much of a burden this could
post on the API. Cacheing cannot save us as a configuration is unique everytime it is requested for a model.

There's only four steps, so elimenating just one of them means 25% less work. What we did was imagine a new service
that could be integrated into the OKAPI : default configurations for models.


### Custom Configuration





### Thumbnails

The goal of this service is to efficiently display photos of models for to help a user in
choosing which models to compare. While it's clear on the front end on how to efficiently
load image data (lazy-loading, ensuring sizes are never larger than how they'll appear on the page)
we were initially unsure of how to set up the backend to make for a fluid user experiences.
We wondered which methods would be faster, which would take less resources and what's
more important for the user. We set up a few experiments to see, starting with the simplest to make
sure we didn't prematurely optomize.

When a user accesses a brand, get a list of configurations and check if we already have a default
configuration for the vehicle. If so, load its image URLS.

How API works :
- In order to get a photo, a configuration must be a buildable model
- A buildable model means a model for a which a certain minimum of options are added
- The API allow for a model to be underdefined and resolve which options need to be added for the car to be buildable

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
- 3D vehicle endpoint