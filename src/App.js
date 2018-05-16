import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Editable from 'react-x-editable';


class App extends Component {


  constructor(props){
    super(props);
    this.state = {
      users: [],
      user: {
        firstname:'firstnamefromstate',
        lastname:'lastnamefromstate',
        email:'user@email.com',
        id:0
      },
      title: 'APIGarage Test',
    }
  }


  componentDidMount(){
    this.getUsers();
  }

  getUsers = _ => {
    fetch('http://localhost:4000/apidemo')
      .then(response => response.json())
      .then(response => this.setState({ users: response.data }))
      .then(({ data }) => {
        console.log(data)
      })
      .catch(err => console.error(err))
  }
  
  addUsers = (event)=> {
    event.preventDefault();
    const { user } = this.state;
    fetch(`http://localhost:4000/apidemo/add?firstname=${user.firstname}&lastname=${user.lastname}&email=${user.email}`)
      .then(this.getUsers)
      .catch(err => console.error(err))
  }

  removeUsers = (id) =>{
    console.log(id);
    fetch(`http://localhost:4000/apidemo/remove?id=${id}`)
      .then(this.getUsers)
      .catch(err => console.error(err))
  }

  renderUsers = ({ id, firstname,lastname,email}) => 


  <div key={id}>

    <ul class="collection">
      <li class="collection-item avatar">
        <img src="images/contacts.png" alt="" class="circle" />
        <span class="title">{firstname}   {lastname}</span>
        <p>{email}</p>
        <a href="#!" class="secondary-content"><i class="material-icons" onClick={this.removeUsers.bind(this, id)}>delete_forever</i></a>
      </li>
    </ul>
    
  </div>

  render() {
    const { users, user } = this.state;
    let title = this.state.title;
    return (

      
      <div className="App">

        <div className="MainContainer">
          <h1>{title}</h1>
          <div class="row">
            <form class="col s12">

              <div class="row">
                <div class="input-field col s6">
                  <input id="first_name" type="text" class="validate" 
                    onChange={e => this.setState({ user: { ...user, firstname: e.target.value }})}/>
                  <label for="first_name">First Name</label>
                </div>
                <div class="input-field col s6">
                  <input id="last_name" type="text" class="validate"
                    onChange={e => this.setState({ user: { ...user, lastname: e.target.value}})} />
                  <label for="last_name">Last Name</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input id="email" type="email" class="validate"
                    onChange={e => this.setState({ user: { ...user, email: e.target.value}})} />
                  <label for="email">Email</label>
                </div>
              </div>
              <div class="row">
                <button class="btn waves-effect waves-light" type="submit" name="action" onClick={this.addUsers}>Submit
                  <i class="material-icons right">send</i>
                </button>
              </div>            
            </form>
          </div>
        </div>

        <div className="Card">
          {users.map(this.renderUsers)}
        </div>

      </div>
    )
  }
}

export default App;
