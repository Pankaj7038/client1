import React from 'react'
import axios from 'axios'
import url from './url'
//import products from './products'
import Header from './Header'


let cart = []
export default class login extends React.Component {
    constructor() {
        super()
        this.state = {
            products: [],
            status: "",
            login: false,
            my_user:''
        }
    }
    componentDidMount() {
        axios.get(url + "/profetch").then((posRes) => {
            console.log(posRes.data)
            console.log('Current user:- ', this.state.user)
            this.setState({
                status: 'Loading'
            })
            this.setState({
                products: posRes.data,
                status: ''
            })
        }, (errRes) => {
            console.log(errRes)
        })
        this.fetchCart()
    }    
    render() {        
        return (
            <div className='container-fluid' hidden={false}>
                <div hidden={this.state.login}>
                    <form onSubmit={this.login} className='btn btn-outline-dark text-white w-50'>
                        <div className='form-group my-2 btn btn-outline-info p-3 w-75'>
                            <label className='float-left'>Username</label>
                            <input type='text' placeholder='Enter User name' className='form-control' name='username'></input>
                        </div>
                        <div className='form-group my-2 btn btn-outline-info p-3 w-75'>
                            <label className='float-left'>Password</label>
                            <input type='password' placeholder='Enter Password' className='form-control' name='upwd'></input>
                        </div>
                        <div className='form-group my-2 w-25 mx-auto' align='center'>
                            <input type='submit' className='btn btn-outline-success' value='Login'></input>
                        </div>
                    </form>
                </div>
                <div hidden={!this.state.login}>
                    <button onClick={this.logout} className='btn btn-outline-danger float-right'>Logout</button>
                   <Header/>
                    <div className='h4 text-info mb-2' align="right">
                        Total amount:- {this.calculateTotal()}
                        <button onClick={() => { this.buyNow() }} className='btn btn-outline-success mx-5'>Buy Now</button>
                    </div>
                    <div className='row'>
                        <div className='col-10'>
                            <div className='row row-cols-3 my-3'>
                                {this.state.products.map((e, i) => (
                                    
                                    <div className='col my-3'>
                                       
                                        <div className='card'>
                                            <div className='card-header'>
                                                <img src={e.img} className='card-img-top'></img>
                                            </div>
                                            <div className='card-body'>
                                                
                                                <div className='h2 card-title' >{e.p_name}</div>
                                                <div className='h2 card-title'>{e.p_model}</div>
                                                <div className='h4 card-subtitle text-muted'>{e.p_cost}</div>
                                            </div>
                                            
                                            <div className='card-footer'>
                                                <button onClick={() => { alert(e.p_desc) }}
                                                    className="btn btn-outline-info btn-block btn-sm"
                                                    data-toggle="tooltip"
                                                    data-placement="bottom"
                                                    title={e.p_desc}>Learn More</button>
                                                <button onClick={() => { this.addToCart(e) }} class="btn btn-outline-success btn-block btn-sm">Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='col'>
                            <div className='row my-3'>
                                {cart.map((e, i) => (
                                    <div className='my-3'>
                                        <div className=' card'>
                                            <div className='card-header'>
                                                <img src={e.img} className='card-img-top'></img>
                                            </div>
                                            <div className='card-body'>
                                                <div className='h2 card-title'>{e.p_name}</div>
                                                <div className='h2 card-title'>{e.p_model}</div>
                                                <div className='h4 card-subtitle text-muted'>{e.qty}</div>
                                            </div>
                                            <div className='card-footer'>
                                                <button onClick={() => { this.reduce(e) }} class="btn btn-outline-success btn-block btn-sm">Reduce</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    addToCart = (item) => {
        let present = false
        let i
        for (i = 0; i < cart.length; i++) {
            if (item.p_id == cart[i].p_id) {
                present = true
                break
            }
        }
        if (present == true) {
            let myObj = cart[i]
            let id = myObj.id
            let obj = {
                "p_name": this.state.user,
                "p_id": myObj.p_id,
                "qty": parseInt(myObj.qty) + 1,
            }
            axios.post(url + "/cartupdate", obj)
                .then((posRes) => {
                    cart.forEach((e, i) => {
                        if (e.p_id == obj.p_id)
                            e.qty = obj.qty
                    })
                    console.log(posRes.statusText)
                    this.setState({
                        status: 'Update ' + posRes.statusText
                    })
                }, (errRes) => {
                    console.log(errRes)
                    this.setState({
                        status: errRes.message
                    })
                })
        }
        else {
            let obj = {
                "p_name": this.state.user,
                "p_name": item.p_name,
                "Categoty":item.Categoty,
                "p_desc":item.p_desc,
                "p_model":item.p_model,
                "p_id": item.p_id,
                "qty": 1,
                "p_cost": item.p_cost,
                "img": item.img
            }
            axios.post(url + "/cartinsert", obj)
                .then((posRes) => {
                    this.setState({
                        status: 'Record' + posRes.statusText
                    })
                    cart.push(obj)
                }, (errRes) => {
                    console.log(errRes)
                })
        }
        this.setState({
            total: this.calculateTotal()
        })
    }
    buyNow = () => {
        alert('Thank u for business with us Total amount :- ' + this.calculateTotal())
        for (let i = 0; i < cart.length; i++) {
            axios.delete("`http://localhost:5001/cartfetch`" + cart[i].id)
                .then((posRes) => {
                    console.log(posRes)
                    let indx = cart.findIndex((e, i) => {
                        return e.id === cart[i].id
                    })
                    cart.splice(indx, 1)
                    this.setState({
                        status: 'Delete ' + posRes.statusText
                    })
                }, (errRes) => {
                    console.log(errRes)
                    this.setState({
                        status: errRes.message
                    })
                })
        }
    }
    reduce = (item) => {
        console.log('Item id:- ', item.id)
        if (item.qty == 1) {
            let obj = {
                "p_name": this.state.user,
                "p_id": item.p_id
            }
            axios.post(url + "/cartdelete", obj)
                .then((posRes) => {
                    console.log(posRes)
                    let indx = cart.findIndex((e, i) => {
                        return e.p_id === item.p_id
                    })
                    cart.splice(indx, 1)
                    this.setState({
                        status: 'Delete ' + posRes.statusText
                    })
                }, (errRes) => {
                    console.log(errRes)
                    this.setState({
                        status: errRes.message
                    })
                })
        }
        else {
            let obj = {
                "p_name": this.state.user,
                "p_id": item.p_id,
                "qty": parseInt(item.qty) - 1,
            }
            axios.post(url + "/cartupdate", obj)
                .then((posRes) => {
                    cart.forEach((e, i) => {
                        if (e.p_id == obj.p_id)
                            e.qty = obj.qty
                    })
                    console.log(posRes.statusText)
                    this.setState({
                        status: 'Update ' + posRes.statusText
                    })
                }, (errRes) => {
                    console.log(errRes)
                    this.setState({
                        status: errRes.message
                    })
                })
        }
        this.setState({
            total: this.calculateTotal()
        })
    }
    fetchCart = () => {
        axios.post(url + "cartfetch", { "p_name": window.sessionStorage.getItem('user') }).then((posRes) => {
            this.setState({
                status: 'Loading'
            })
            cart = posRes.data
            console.log('Cart data:- ', cart)
            this.setState({
                status: '',
            })
        }, (errRes) => {
            console.log(errRes)
        })
        let total = 0
        for (let i = 0; i < cart.length; i++) {
            debugger
            total += cart[i].p_cost * cart[i].qty
        }
        this.setState({
            total: total
        })
    }
    calculateTotal = () => {
        let total = 0
        cart.forEach((e, i) => {
            total += e.qty * e.p_cost
        })
        return total
    }
    login = (e) => {
        e.preventDefault()
        let obj = {
            username: e.target.username.value,
            upwd: e.target.upwd.value
        }
        axios.post(url + "/ufetch", obj)
            .then((posRes) => {
                console.log(posRes.data)
                if (posRes.data.auth == 'success') {
                    console.log('Object in auth :- ',obj)
                    this.setState({
                        ...this.state,
                        login: true                        
                    })                    
                    console.log('State after login:- ', this.state)
                    window.sessionStorage.setItem('user', obj.username)
                }
            }, (errRes) => {
                console.log(errRes)
            })
    }
    logout = () => {
        this.setState({
            login: false,
            user: ''
        })
        window.sessionStorage.removeItem('user')
    }
}