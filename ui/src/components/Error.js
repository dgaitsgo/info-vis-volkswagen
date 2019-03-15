import React from 'react'
import Redirect from 'react-router-dom/Redirect'

const Error = () => {
	return <Redirect to={'/server-error'}/>
}

export default Error
