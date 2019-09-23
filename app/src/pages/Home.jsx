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
        // Retrieve List of Recently updated files
        axios.get(' https://www.googleapis.com/drive/v3/files', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => {
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

    // Function called after the upload button is selected
    handleUploadClick() {
        let fileUploadElem = document.getElementById('fileUpload')
        console.log(fileUploadElem.nodeValue)
        fileUploadElem.click()
    }

    // Function called after the download button is clicked
    handleDownloadClick(id) {
        axios.get(`https://www.googleapis.com/drive/v3/files/${id}?alt=media`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            }
        }).then(response => {
            // console.log('File Get:', response.data.substring(0, 20))
            // console.log('File Get:', response)
            // Decode
            this.download(response.data, 'qwe', response.headers['content-type'])
        }).catch(error => {
            console.log('Error', error)
        })
    }

    // Parsing the raw data to create the file and then download it
    download(data, filename, type) {
        var file = new Blob([data], { type: type });
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }

    // Function which is called after a file has been selected
    handleFileSelected(e) {
        console.log('File Selected', e.target)
        let fileUploadElem = document.getElementById('fileUpload')
        let filePath = fileUploadElem.value
        console.log(fileUploadElem.files)

        let reader = new FileReader()
        // Defining Actions to be taken after the file has been read
        reader.onload = () => {
            let fileData = reader.result.toString()

            console.log('Selected File Data:', fileData)

            axios.post('https://www.googleapis.com/upload/drive/v3/files',
                fileData
                , {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'text/plain'
                    },
                    params: {
                        uploadType: 'media',
                        // name: e.target.value.split('\\')[e.target.value.split('\\').length - 1]
                    },
                }).then(response => {
                    console.log('File Upload Response Body: ', response.data)
                    console.log('Successfully uploaded the file')

                    /**
                     * File is already uploaded
                     * The PATCH request below updates the metadata of the file
                     */
                    axios.patch('https://www.googleapis.com/drive/v3/files/' + response.data.id, { name: 'WARFRRAME' }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    }).then(response_2 => {
                        console.log('Response_2: ', response_2)
                    }).catch(error_2 => {
                        console.error('Error_2: ', error_2)
                    })

                }).catch(error => {
                    console.error(error)
                })

        }
        // Read the file
        reader.readAsText(e.target.files.item(0))
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
                            <div style={{ display: 'none' }}>
                                <input type="file" id="fileUpload" onChange={e => { this.handleFileSelected(e) }} />
                            </div>
                        </span>
                        <Typography variant="h6" className="col-sm-10">
                            Your Google Drive Files, Account Name: {JSON.parse(localStorage.getItem('successResponse')).profileObj.name}
                        </Typography>
                        <Button variant="contained" color="secondary" style={{ right: '5px' }} onClick={this.logout} className="col-sm-1">
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
                <div className="col-sm-12 row" style={{ backgroundColor: '#BCCCCE' }}>
                    {this.state.files.map((file, index) => {
                        // return <p>qwe</p>

                        let coreElem = (
                            <Card className="col-sm-2" key={index} style={{ margin: '1.6%' }}>
                                <CardHeader title={file.name.substring(0, 15) + (file.name.length > 15 ? '...' : '')} />
                                {/* <CardContent>
                                    File Type: ''
                                </CardContent> */}
                                <CardActions>
                                    <Button size="small" onClick={e => this.handleDownloadClick(file.id)}>Download</Button>
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
