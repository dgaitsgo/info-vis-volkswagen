const fs = require('fs')
const axios = require('axios')
const _ = require('lodash')

const token = {
    "access_token": "eyJraWQiOiJlYTlkMzVmZWQyZmM4NjBmIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI1N2M0YWQwNy1jNmYxLTRhYjgtYTVmNi03ZjlhYTI2ZDhiNTlAYXBwc192dy1kaWxhYl9jb20iLCJhdWQiOiI1N2M0YWQwNy1jNmYxLTRhYjgtYTVmNi03ZjlhYTI2ZDhiNTlAYXBwc192dy1kaWxhYl9jb20iLCJhYXQiOiJpZGVudGl0eWtpdCIsImlzcyI6Imh0dHBzOlwvXC9pZGVudGl0eS52d2dyb3VwLmlvIiwianR0IjoiYWNjZXNzX3Rva2VuIiwiZXhwIjoxNTUxMTQ1NTcwLCJpYXQiOjE1NTExNDE5NzAsImp0aSI6IjI1OGFmN2RlLTk2ZmMtNDA0YS04YzMyLWUxZmZlYzE1MjgyMSJ9.o5f29AJbYlpiuEO_4NTP7oqR0PoHgDdjAkO-pCqTquiNVE8teA-qOcBBFBvwfg7bDARqeQtBWJnbcdn_IrKnIvV31KMDRaY7DxmJYTWa1jmocao4jLxkl2R3p7cd_AbopB8wXXfdjP41cnF1Z-Vm7EKN-AWapWFeoPYkxntZrx_V3CnnGnU7bm073VmXyRIIHjNf9CIaqiTIomTYhn1YbXJXxLzK5paLRt2orsEsfI4YhnU6dpL2xipfOmid5M7-LhnYM7XBht6oWLq5nhAFchpwLChR8HgNOYOiDnSIfj79ng5KzZ3we281MEQclSb9lu6cxxNcMXgxbfJ49E9Ra12jH4RlMGJwCdZwMhbtD_YoLuTicC2P29HjhFpnD_2zpVNjkbznNNMHjmz4X_WCjuLXVfXZJLnZkHWW5PAZoI-xP4QUndmFUnCkmu6YB0lLQKEYCoxBclm8FrQfL6JlkH6m3L4XRIlxqINQvpgtSohVrkwMl0TGJ5Q7NCvLS7b6UoLiiMWbfbbPW33yqRWVWTB7uBN-Nr5KeYQ7JL0ATjQuS5nPl6Fjcox0ZnimZj0kHhF-QsANE9dKhRq6x6cw9zgFDbrZ-dK0x4Ay1xv4l-mg2It58HLXnJq9WdV-vK89xwHvrv5BpSoKWQs0jspECY7NmcrXsfGh3RTaJuCTO2w",
    "token_type": "bearer",
    "expires_in": 3600,
    "user_id": "57c4ad07-c6f1-4ab8-a5f6-7f9aa26d8b59@apps_vw-dilab_com"
  }

/*****************************************************************************
 * WRANGLE COUNTRIES
******************************************************************************/
const wrangleCountries = () => {

    const countryMap = {}

    countries.forEach(country => {
        countryMap[country.countryCode] = {
            country_code : country.countryCode,
            name : country.name
        }
    });

    fs.writeFileSync('countries.json', JSON.stringify(countryMap));
}

/*****************************************************************************
 * BRANDS PER COUNTRY
******************************************************************************/
function delay(t, v) {
    return new Promise(function(resolve) { 
        setTimeout(resolve.bind(null, v), t)
    });
 }

const brandsPerCountry = async (countries) => {

   let brandsMap = {}

   await Promise.all(Object.keys(countries).map( async (key, i) =>
        
            delay(i * 1000).then( async () => {

                const brandsRes = await axios({
                    method : 'get',
                    url : `https://api.productdata.vwgroup.com/v2/catalog/${countries[key].country_code}/brands`,
                    headers: {
                        'Authorization' : 'bearer ' + token.access_token,
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    },
                })

                const brands = brandsRes.data.data
                brands.forEach(brand => {
                   
                    if (!brandsMap[key]) {
                        brandsMap[key] = []
                    }
                   
                    brandsMap[key].push(brand)
                })

                // console.log('brands map now equals : ', brandsMap)

            })
        ))
    fs.writeFile('brands.json', JSON.stringify(brandsMap), () => null);
}

// const countries = JSON.parse(fs.readFileSync('./countries.json', 'utf8'))
// brandsPerCountry(countries)

/*****************************************************************************
 * Models per brand
******************************************************************************/
const modelsPerBrand = async (brands) => {

    let modelsMap = {}

    await Promise.all(Object.keys(brands).map(async (key, i) =>

        delay(i * 1000).then( async () => {

            const brand = brands[key]
            
            const modelsRes = await axios({
                method : 'get',
                url : `https://api.productdata.vwgroup.com/v2/catalog/${key}/brands/${brand.id}/models`,
                headers: {
                    'Authorization' : 'bearer ' + token.access_token,
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
            })

            const models = modelsRes.data.data

            models.forEach(model => {
                modelsMap[model.id] = {
                    id : model.id,
                    name : model.name,
                    country_code : key
                }
            })
        }))
    )

    fs.writeFile('models.json', JSON.stringify(modelsMap), () => null);
}

// const brands = JSON.parse(fs.readFileSync('./brands.json', 'utf8'))
// modelsPerBrand(brands)
