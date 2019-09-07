import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

export default class Login extends Component {

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
                            <Button variant="contained" color="primary" style={{ margin: '5px' }}>
                                Login
                            </Button><br />
                            <Button variant="contained" color="secondary">
                                Login using Google Account
                            </Button>
                        </div>
                    </CardActions>
                </Card>
            </div>
        )
    }
}
