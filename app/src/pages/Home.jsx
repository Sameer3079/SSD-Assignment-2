import React, { Component } from 'react'
import axios from 'axios'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import history from '../history'

export default class Home extends Component {

    state = {
        files: []
    }

    componentDidMount() {
        axios.get(' https://www.googleapis.com/drive/v3/files', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => {
            console.log(response)
            this.setState({ files: response.data.files })
        }).catch(error => {
            console.error(error)
            history.push('/')
            alert('Your session has expired')
        })
    }

    logout() {
        console.log('logging out')
        localStorage.clear()
        history.push('/')
    }

    handleUploadClick() {
        // TODO: Upload a File After Selecting it
        alert('TODO: Implement Uploading File')
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar className="col-sm-12 row">
                        <span className="col-sm-1">
                            <Button variant="contained" color="secondary" onClick={this.handleUploadClick}>
                                Upload
                            </Button>
                        </span>
                        <Typography variant="h6" className="col-sm-10">
                            Your Files
                        </Typography>
                        <Button variant="contained" color="secondary" style={{ right: '5px' }} onClick={this.logout} className="col-sm-1">Logout</Button>
                    </Toolbar>
                </AppBar>
                <div className="col-sm-12 row" style={{ backgroundColor: '#BCCCCE' }}>
                    {this.state.files.map((file, index) => {
                        // return <p>qwe</p>

                        let coreElem = (
                            <Card className="col-sm-2" key={index} style={{ margin: '1.6%' }}>
                                <CardHeader title={file.name} />
                                {/* <CardContent>
                                    File Type: ''
                                </CardContent> */}
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        )
                        return coreElem
                    })}
                </div>
            </div>
        )
    }
}
