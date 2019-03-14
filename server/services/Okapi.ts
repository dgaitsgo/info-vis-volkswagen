const axios = require('axios')
const apiURL = require('../constants/apiURL')

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
                headers: this.defaultHeaders(token),
                data : { model_id : modelId }
            })
        )
    }
    

    static addOption(configId, optionId, token) {
        return (
            axios ({
                method : 'post',
                url : `${apiURL}/configurations/${configId}/options`,
                headers : this.defaultHeaders(token),
                data : { id : optionId.id }
            })
        )
    }
    
    static removeOption(configId, optionId, token) {
        return (
            axios ({
                method : 'delete',
                url : `${apiURL}/configurations/${configId}/options`,
                headers : this.defaultHeaders(token),
                data : { id : optionId }
            })
        )
    }
    
    static replaceOptions(configId, optionIds, token) {
        return (
            axios ({
                method : 'put',
                url : `${apiURL}/configurations/${configId}/options`,
                headers : this.defaultHeaders(token),
                data : optionIds
            })
        )
    }

    static checkBuild(configId, token) {
        return (
            axios({
                method : 'get',
                url : `${apiURL}/configurations/${configId}/check`,
                headers : this.defaultHeaders(token)
            })
        )
    }
    
    static configChoices(configId, token) {
        return (
            axios ({
                method: 'get',
                url : `${apiURL}/configurations/${configId}/choices`,
                headers: this.defaultHeaders(token)
            })
        )
    }
    
    static resolveOptions(configId, token) {
        return (
            axios ({
                method : 'get',
                url : `${apiURL}/configurations/${configId}/options?resolve=true`,
                headers : this.defaultHeaders(token)
            })
        )
    }

    static getWLTP(configId, token) {
        return (
            axios ({
                method : 'get',
                url : `${apiURL}/configurations/${configId}/wltp`,
                headers : this.defaultHeaders(token)
            })
        )
    }
    
    static getImages(configId, token) {
        return (
            axios ({
                method : 'get',
                url : `${apiURL}/configurations/${configId}/images`,
                headers : this.defaultHeaders(token)
            })
        )
    }
}

module.exports = Okapi
