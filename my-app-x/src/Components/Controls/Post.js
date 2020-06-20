import React from 'react';
//import { IoIosEye,IoIosPersonAdd } from "react-icons/io";
import { Container, Row, Col,Card, CardBody, CardTitle, CardText, CardImg,Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import '../../index.css';
//mport img from "../Controls/home.gif";
import 'react-table/react-table.css';
import axios from 'axios'
import Navi from './Navigation';
import Clock from 'react-live-clock';
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateTime from './DateTime';
import{Redirect} from 'react-router-dom';
const jwt = require("jsonwebtoken");

export default class Post extends React.Component {
    constructor(){
        super();
       this.state={
            posts:[],
            newPostData:{
              title:'',
              content:'',
              postImage:'',
              date:'',
              postBy:''
            }
        }
        this.addNewPost=this.addNewPost.bind(this);
    }



    fileSelectedHandler=event=>{
    let {newPostData}=this.state;
    newPostData.postImage=event.target.files[0];
    this.setState({newPostData});
   // console.log(newPostData);
  }

    componentWillMount(){
      let {newPostData}=this.state;
      const token=localStorage.getItem('token');
      const rs=jwt.decode(token);
      let idx=rs.userId;
      var date =new Date();
      var now=date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear();
      newPostData.postBy=idx;
      newPostData.date =now;
      this.setState({newPostData});
     
        axios.get('http://localhost:3001/postt').then((response)=>{
        this.setState({
            posts:response.data
        })
        });
      
    }

    addNewPost(){
      let {newPostData}=this.state;
      let file=newPostData.postImage;
      let formdata=new FormData();
      formdata.append('postImage',file)
      formdata.append('title',newPostData.title)
      formdata.append('content',newPostData.content)
      formdata.append('date',newPostData.date)
      formdata.append('postBy',newPostData.postBy)
      axios.post('http://localhost:3001/postt',formdata)
      .then((responce)=>{
        console.log(responce);
        let {posts}=this.state;
        posts.push(responce.data);
        this.setState({posts});
      })
    }

    render() {
        let posts=this.state.posts.map((post)=>{
      
            return(
                <Card key={post._id}>
                <CardImg top className="postimmg" src={'http://localhost:3001/'+post.postImage} alt="Card image cap" />
                <CardBody className="cardbody">
                  <CardTitle>{post.title}</CardTitle>
                  <CardText>{post.content}</CardText>
                  <CardText>
                      
                    <small className="text-muted">{post.date}  </small>
                  </CardText>
                </CardBody>
              </Card>
            )
      });


      const token=localStorage.getItem('token');
      const rs=jwt.decode(token);
      if(token==null){
       return(<Redirect to={"/"}/>)  
      }
      else{
       if(Date.now() / 1000 > rs.exp){
         return(<Redirect to={"/"}/>)  
       }
     }  
    return (
        <div>
        <Navi/>
        <Row>
           <Col xs="12" sm="8"> 
           <Container className="contanierSearchBox" fluid>
           <br></br>
           <Form>
           <Row>
           <Col xs="12" sm="8"> 
         
           <FormGroup className="searchbox">
           
          <Input type="text" id="title"   vlaue={this.state.newPostData.title}  placeholder="Search here" 
          onChange={(e)=>{
            let {newPostData}=this.state;
            newPostData.title=e.target.value;
            this.setState({newPostData});
          }}   
          />
        </FormGroup>
           </Col>  
           <Col xs="12" sm="4"> 
           <Button onClick={this.addNewPost.bind(this)}>Search</Button></Col>  
           </Row>     
        </Form>
           </Container>
          </Col>
          
           <Col xs="12" sm="4"> 
           <Row>
           <Col xs="12" sm="6">
           <Container className="contanierSlid" fluid>
         <h4 className="clock_date">  <DateTime /></h4> 
           </Container>
              </Col>
           <Col xs="12" sm="6"> 
            <Container className="contanierSlid" fluid>             
           <h1 className="clock">  <Clock format={'HH:mm:ss'} ticking={true} timezone={'Sri Jayawardenepura Kotte'} /></h1>
           </Container>
           </Col>
           </Row>
          </Col>
          </Row>


        <Row>
           <Col xs="12" sm="8"> 
            <Container className="contanierPost" fluid> 
                            {posts} 
           </Container>
          </Col>

         
          <Col xs="12" sm="4"> 
              <Container className="PostBox">
              <Form>
        <FormGroup>
          <Label for="titlet">Title</Label>
          <Input type="text"  id="title"  vlaue={this.state.newPostData.title}  placeholder="Title here" 
          onChange={(e)=>{
            let {newPostData}=this.state;
            newPostData.title=e.target.value;
            this.setState({newPostData});
          }}   
          
          />
        </FormGroup>

       
        <FormGroup>
          <Label for="exampleText">Text Area</Label>
          <Input type="textarea" id="exampleText"   vlaue={this.state.newPostData.content}  
           onChange={(e)=>{
            let {newPostData}=this.state;
            newPostData.content=e.target.value;
            this.setState({newPostData});
          }}   
           />
        </FormGroup>

        <FormGroup>
          <Label for="exampleFile">File</Label>
          <Input type="file"  onChange={this.fileSelectedHandler}
          />
          <FormText color="muted">
           Upload your image here.
          </FormText>
        </FormGroup>

        <Button onClick={this.addNewPost.bind(this)}>Submit</Button>
      </Form>
                
              </Container>

          </Col>
          </Row>
      </div>
    );
  }
}