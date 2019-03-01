import React from 'react'
import Redirect from 'react-router-dom/Redirect'
import { Redirect } from 

const Error = (err) => {

	const to = {
		pathname : '/server-error',
		query : {
			err
		}
	}

	return (<Redirect to={to}/>)
}

export default Error
