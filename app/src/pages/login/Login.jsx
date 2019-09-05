import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default class Login extends Component {
    render() {
        return (
            <div>
                <TextField></TextField>
                <TextField></TextField>
                <Button variant="contained" color="primary">
                    Primary
                </Button>
                <Button variant="contained" color="secondary">
                    Secondary
                </Button>
            </div>
        )
    }
}
