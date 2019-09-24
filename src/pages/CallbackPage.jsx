import React, { Component } from 'react'
import history from '../history'

export default class CallbackPage extends Component {

    componentDidMount() {
        let currentUrl = window.location.href
        console.log('Current URL:', currentUrl)

        // Getting Query Parameters
        let queryString = window.location.search
        console.log('Query String:', queryString)

        let fragment = window.location.hash
        if (fragment) {
            console.log('Fragment:', fragment)

            // Replaced the # with a ? so that the string is a valid query string
            let searchParamsString = fragment.replace('#', '?')
            let parameters = new URLSearchParams(searchParamsString)

            let receivedState = parameters.get('state')
            let localState = sessionStorage.getItem('state')

            // Verifying State
            if (localState !== receivedState) {
                alert('An error occured, states do not match')
                history.push('/')
            }

            // Saving Access Token in Local Storage
            let accessToken = parameters.get('access_token')
            sessionStorage.setItem('accessToken', accessToken)

            history.push('/home')



        } else {
            // No fragment present
            alert('Forbidden Path')
            history.push('/')
        }
    }

    render() {
        return (
            <div>
                <h4>Loading</h4>
            </div>
        )
    }
}
