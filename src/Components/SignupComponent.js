
import axios from "axios";
import React from "react";
import url from "./url"
export default class Signup extends React.Component {
    constructor() {
        super()
        this.state = {
            status: ''
        }
    }
    render() {
        return (
            <div className="container mt-2">
                <h3 className="text-primary">Add New User </h3>
                <form onSubmit={this.uinsert} className="w-50 mx-auto">
                    <input type="number" placeholder="Enter id" name='uname_id' className="form-control my-2"></input>
                    <input type="text" placeholder="Enter name" name='username' className="form-control my-2"></input>
                    <input type="password" placeholder="Enter password" name='upwd' className="form-control my-2"></input>
                    <input type="submit" value='SignUp' className="btn btn-outline-success"></input>
                </form>
                <h1 className="text-info">{this.state.status} </h1>
            </div>
        )
    }
    uinsert = (e) => {
        e.preventDefault()        
        this.setState({
            status: 'Loading'
        })
        let obj = {
            uname_id: parseInt(e.target.uname_id.value),
            username: e.target.username.value,
            upwd: e.target.upwd.value,
        }
        axios.post(`${url}/uinsert`, obj)
            .then((posRes) => {
                alert('You are successfully registered')
                console.log(posRes)
                this.setState({
                    status: posRes.data.insert
                })
            }, (errRes) => {
                console.log(errRes)
            })
    }
}