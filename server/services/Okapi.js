const axios = require('axios')

class Okapi {

    static defaultHeaders(token) { 
        return ({
            'Authorization' : 'bearer ' + token.access_token,
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        })
    }

    static newConfiguration(modelId, token) {
        return (
            axios ({
                method: 'post',
                url : `${apiURL}/configurations`,
                headers: defaultHeaders(token),
                data : { model_id : modelId }
            })
        )
    }
    

    static addOption(configId, optionId, token) {
        return (
            axios ({
                method : 'post',
                url : `${apiURL}/configurations/${configId}/options`,
                headers : defaultHeaders(token),
                data : { id : optionId }
            })
        )
    }
    
    static removeOption(configId, optionId, token) {
        return (
            axios ({
                method : 'delete',
                url : `${apiURL}/configurations/${configId}/options`,
                headers : defaultHeaders(token),
                data : { id : optionId }
            })
        )
    }
    
    static replaceOptions(configId, optionIds, token) {
        return (
            axios ({
                method : 'put',
                url : `${apiURL}/configurations/${configId}/options`,
                headers : defaultHeaders(token),
                data : optionIds
            })
        )
    }

    static checkBuild(configId, token) {
        return (
            axios({
                method : 'get',
                url : `${apiURL}/configurations/${configId}/check`,
                headers : defaultHeaders(token)
            })
        )
    }
    
    static configChoices(configId, token) {
        return (
            axios ({
                method: 'get',
                url : `${apiURL}/configurations/${configId}/choices`,
                headers: defaultHeaders(token)
            })
        )
    }
    
    static resolveOptions(configId, token) {
        return (
            axios ({
                method : 'get',
                url : `${apiURL}/configurations/${configId}/options?resolvetrue`,
                headers : defaultHeaders(token)
            })
        )
    }

    static getWLTP(configId, token) {
        return (
            axios ({
                method : 'get',
                url : `${apiURL}/configurations/${configId}/wltp`,
                headers : defaultHeaders(token)
            })
        )
    }
    
    static getImages(configId, token) {
        return (
            axios ({
                method : 'get',
                url : `${apiURL}/configurations/${configId}/images`,
                headers : defaultHeaders(token)
            })
        )
    }
}