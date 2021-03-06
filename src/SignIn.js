import React, { PureComponent } from 'react';
import {Link} from 'react-router-dom'
import {Form,Button,InputGroup} from 'react-bootstrap'

export default class SignIn extends React.PureComponent {
  state={
    username: "",
    password:""
  }

  handleChange=(e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit=(e)=>{
    e.preventDefault()
    this.props.onLogIn(this.state.username, this.state.password)
  }
   render() {
     return(
       <div id="sign-up">
       <center><h3>Sign In</h3></center>
       <Form onSubmit={this.handleSubmit}>
         <Form.Group controlId="formBasicUsername">
         <Form.Label>Username</Form.Label>
         <InputGroup>
           <InputGroup.Prepend>
             <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
           </InputGroup.Prepend>
           <Form.Control
             type="text"
             placeholder="Username"
             aria-describedby="inputGroupPrepend"
             required
             onChange={this.handleChange}
             name="username"
           />
           <Form.Control.Feedback type="invalid">
             Please choose a username.
           </Form.Control.Feedback>
         </InputGroup>
         </Form.Group>

         <Form.Group controlId="formBasicPassword">
           <Form.Label>Password</Form.Label>
           <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange} />
         </Form.Group>
         <Button variant="primary" type="submit">
           Sign In
         </Button>
      </Form>
       </div>
     )
   }
}
