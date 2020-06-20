import React from 'react';
import axios from 'axios';
import{Redirect} from 'react-router-dom';
import { TabContent, TabPane ,Nav, NavItem, NavLink, Row, Col,Container ,Button, Form, FormGroup, Label,Input } from 'reactstrap';
import classnames from 'classnames';
import '../../index.css'
export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '2',
             newLoginData:{
               email:'',
        password:'',
             },
 message:'',
 redirect:false,
 newSignupData:{
     name:'',
      tp:'',
     email:'',
     password:'',
 },
 signupMessage:'',
 signupName:'',
 signupTp:'',
 signupMail:'',
 signupPass:''
    };
    this.login=this.login.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentWillMount(){
    localStorage.clear();
}

login(){  
    let {newLoginData}=this.state;
    axios.post('http://localhost:3001/User/Login',newLoginData)
    .then((result)=>{
        this.setState({message:result.data.message});
        if(result.data.token!=null){
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('loginId', result.data.id);
            localStorage.setItem('name', result.data.name);
           this.setState({  redirect:true}); 
        }
    })
 }

signup(){
    let {newSignupData}=this.state;
    axios.post('http://localhost:3001/User/Signup',newSignupData)
    .then((result)=>{
        this.setState({ signupMessage:result.data.message});
    });
}


  render() {
    
    if(this.state.redirect){
        return(<Redirect to={"/Home"}/>)
    }
    return (
      <div>
          <br></br>
          <br></br>
          
 <Row>
 <Col xs="12" sm="3"></Col>
<Col xs="12" sm="6" >
<Container className="NoticBox">
          <h2 align="center"> <b>STUDENTS SOCIAL MEDIA</b></h2>
           <Nav tabs >
          <NavItem >
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Sign up
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Login
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Forgot
            </NavLink>
          </NavItem>

        </Nav>

        <TabContent activeTab={this.state.activeTab} >
          <TabPane tabId="1" >
            <Row>
              <Col sm="12" >
           
                           <h2>New User</h2>
                           <Form>
                               
                              <FormGroup>
                                   <Label for="exampleText">Name {this.state.signupName}</Label>
                                  <Input type="text" name="name" id="exampleText"    placeholder="Full name"
                                       vlaue={this.state.newSignupData.name}
                                       onChange={(e)=>{
                                           if(e.target.value===''){
                                            this.setState({ signupName:" * Required!"});
                                           }else{
                                            this.setState({ signupName:""});
                                            let {newSignupData}=this.state;
                                            newSignupData.name=e.target.value;
                                            this.setState({ newSignupData});
                                           }
                                        }}   
                                  required />
                                </FormGroup>


                                <FormGroup>
                                   <Label for="exampleContact">Contact {this.state.signupTp}</Label>
                                  <Input type="text" name="tp" id="exampleContact" placeholder="Contact No"
                                   vlaue={this.state.newSignupData.tp}
                                   onChange={(e)=>{
                                    if(e.target.value===''){
                                        this.setState({ signupTp:" * Required!"});
                                       }else{
                                        this.setState({ signupTp:""});
                                      let {newSignupData}=this.state;
                                      newSignupData.tp=e.target.value;
                                      this.setState({ newSignupData});
                                    }} }  
                                    required  />
                                </FormGroup>

                                 <FormGroup>
                                   <Label for="exampleEmail">Email  {this.state.signupMail}</Label>
                                  <Input type="email" name="email" id="exampleEmail" placeholder="Email"
                                   vlaue={this.state.newSignupData.email}
                                   onChange={(e)=>{
                                    if(e.target.value===''){
                                        this.setState({ signupMail:" * Required!"});
                                       }else{
                                        this.setState({ signupMail:""});
                                      let {newSignupData}=this.state;
                                      newSignupData.email=e.target.value;
                                      this.setState({ newSignupData});
                                    }}   }
                                    required  />
                                </FormGroup>


                               <FormGroup>
                               <Label for="examplePassword">Password {this.state.signupPass}</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="password "
                                 vlaue={this.state.newSignupData.password}
                                 onChange={(e)=>{
                                    if(e.target.value===''){
                                        this.setState({ signupPass:" * Required!"});
                                       }else{
                                        this.setState({ signupPass:""});
                                    let {newSignupData}=this.state;
                                    newSignupData.password=e.target.value;
                                    this.setState({ newSignupData});
                                  }}   }
                                  required   />
                                </FormGroup>
                              
                                <Label for="exampleMessage"><b>{this.state.signupMessage}</b></Label>
                                <br></br>
                                <Button onClick={this.signup.bind(this)}>Submit</Button>
                           </Form>
                      
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="2">
            <Row>
              <Col sm="12">
           
                       <h2>Login</h2>
                       <Form>
                       <FormGroup>
                                   <Label for="exampleEmail">Email</Label>
                                  <Input type="email" name="email" id="exampleEmail" placeholder="Email" 
                                  vlaue={this.state.newLoginData.email}
                                     onChange={(e)=>{
                                        let {newLoginData}=this.state;
                                        newLoginData.email=e.target.value;
                                        this.setState({newLoginData});
                                      }}   
                                      />
                                </FormGroup>

                                <FormGroup>
                               <Label for="examplePassword">Password</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="password "
                                    vlaue={this.state.newLoginData.password}
                                    onChange={(e)=>{
                                       let {newLoginData}=this.state;
                                       newLoginData.password=e.target.value;
                                       this.setState({newLoginData});
                                     }}    />
                                </FormGroup>
                                <Label for="exampleMessage">{this.state.message}</Label>
                                <br/>
                                <Button onClick={this.login.bind(this)}>Submit</Button>
                              </Form>
              </Col>
            </Row>
          </TabPane>


          <TabPane tabId="3">
            <Row>
              <Col sm="12">
           
                       <h2>Forgot Password</h2>
                       <Form>
                       <FormGroup>
                                   <Label for="exampleEmail">* Your Email</Label>
                                  <Input type="email" name="email" id="exampleEmail" placeholder="Email"    />
                                </FormGroup>
                                <Button>Send Mail</Button>
                       </Form>
              </Col>
            </Row>
          </TabPane>

        </TabContent>
         </Container>
  </Col>
  <Col xs="12" sm="3"></Col>
</Row>

      
      </div>
    );
  }
}