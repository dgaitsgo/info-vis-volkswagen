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

## Rooms for Improvement (Product Data API)
- choices/options terminology
- configurations/configuration typo
- countryCode, country_code
- default/base configurations to get images/emissions data easier
- Make Request Body/Parameters headers clearer
- Ability to filter by vehicle type (not just brand)
- Image for a model
- 3D vehicle endpoint