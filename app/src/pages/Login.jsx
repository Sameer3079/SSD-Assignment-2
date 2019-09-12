import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { GoogleLogin } from 'react-google-login'

import history from '../history'

export default class Login extends Component {

    onSuccess = response => {
        console.log('Success, Response:', response)
        localStorage.setItem('successResponse', JSON.stringify(response))
        localStorage.setItem('accessToken', response.accessToken)
        history.push('/home', '/home')
    }

    onFailure = response => {
        console.log('Error, Response=', response)
        alert('An Error Occurred')
    }

    componentDidMount() {
        let successResponse = localStorage.getItem('successResponse')
        if (successResponse) {
            let obj = JSON.parse(successResponse)
            let currentTime = Date.now()
            console.log('Current Time:', currentTime)
            console.log('Token Expiration Time:', obj.tokenObj.expires_at)
            if (currentTime < obj.tokenObj.expires_at) {
                history.push('/home')
            }
        }
        ReactDOM.render(
            <GoogleLogin
                clientId="344394648938-tru8bg9jvo0ang8lu70gov71dplrcvus.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.onSuccess}
                onFailure={this.onFailure}
                cookiePolicy={'single_host_origin'}
                scope="https://www.googleapis.com/auth/drive"
            />,
            document.getElementById('googleButton')
        )
    }


    render() {

        let margin = '5px'

        return (

            <div className="col-sm-12" style={{ marginTop: '50px' }}>
                <Card className="offset-sm-4 col-sm-4">
                    <CardContent>
                        <div className="col-sm-12" style={{ margin: margin }}>
                            <TextField label="Username" className="col-sm-5"></TextField>
                        </div>
                        <div className="col-sm-12" style={{ margin: margin }}>
                            <TextField label="Password" className="col-sm-5" type="password"></TextField>
                        </div>
                    </CardContent>
                    <CardActions>
                        <div className="offset-sm-1 col-sm-10">
                            <Button variant="contained" color="primary" style={{ margin: margin }}>
                                Login
                            </Button><br />
                            <Button variant="contained" color="secondary" style={{ margin: margin }}>
                                Login using Google Account
                            </Button>
                            <div className="col-sm-12" id="googleButton"></div>
                        </div><br />
                    </CardActions>
                </Card>
            </div>
        )
    }
}
