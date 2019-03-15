import React from 'react'

// routing
import Location from 'react-app-location'
import { Route, Switch } from 'react-router-dom'

// validation 
import * as Yup from 'yup'
import isUUID from 'is-uuid'

// components
import NotFound from '../components/NotFound'
import GraphContainer from '../containers/GraphContainer'
import LandingContainer from '../containers/LandingContainer'
import BrandsContainer from '../containers/BrandsContainer'
import ModelsContainer from '../containers/ModelsContainer'
import CompareContainer from '../containers/CompareContainer'

const InstanceOfValidateError = val => (val && val.name && val.name === 'ValidationError')

const charactersLong = n =>
	 Yup.string().test('len', `String must be ${n} chars long.`, val => val.length === n)

const matchExactString = str =>
	Yup.string().test('exact', `String must equal ${str}.`, val => val === val)

const _isUUID = () =>
	Yup.string().test('is uuid', `String must be a uuid`, val => isUUID.v5(val))

const isArrayOf = (arr, fn) =>
	arr instanceof Array && 
		arr.map(item => fn(item))
		   .filter(InstanceOfValidateError)
		   .length === 0

const TypeSchema = () =>
	Yup.object().shape({
		id : _isUUID(),
		name : Yup.string()
	})

const SelectedModelSchema = () =>
	Yup.object().shape({
		modelName : Yup.string(),
		type : TypeSchema()
	})

const testModelArray = () =>
	
	Yup.string().test('is array', `Value must be of instance String`, val => {

		const decodedURI = decodeURIComponent(val)
		
		try {
			
			const obj = JSON.parse(decodedURI)
			const objKeys = Object.keys(obj)
			const noInvalidTypes = objKeys.map(key => SelectedModelSchema().isValidSync(obj[key])).filter(InstanceOfValidateError).length === 0

			return (noInvalidTypes)

		} catch (e) {
			return (false)
		}
	})

/* Location */
const CountryLocation = new Location('/explore/:countryCode', { countryCode : charactersLong(2) })
const ModelsLocation = new Location('/explore/:countryCode/:brand_id', { countryCode : charactersLong(2), brand_id : _isUUID() })
const CompareLocation = new Location('/explore/:countryCode/:brand_id/:model_array', { countryCode : charactersLong(2), brand_id : _isUUID(), model_array : testModelArray() })

const Routes = () =>
    <Switch>
        <Route exact path='/' component={ GraphContainer } />
        <Route exact path='/explore' component= { LandingContainer } />
        { CountryLocation.toRoute({ component : BrandsContainer, invalid : NotFound }, true )} }
        { ModelsLocation.toRoute({ component : ModelsContainer, invalid : NotFound }, true )}
        { CompareLocation.toRoute({ component : CompareContainer, invalid : NotFound }, true ) }
        {/* <Route exact path={`/explore/:countryCode/:brand_id/:model_array`} component= { CompareContainer } /> */}
        <Route component={ NotFound }/>
    </Switch>

export default Routes