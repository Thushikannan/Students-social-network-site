import React from 'react';
//import { IoIosEye,IoIosPersonAdd } from "react-icons/io";
import { Container, Row, Col,Card, CardBody, CardTitle, CardText, CardImg,Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import '../../index.css';
//mport img from "../Controls/home.gif";
import 'react-table/react-table.css';
import axios from 'axios'
import Navi from './Navigation';
import Clock from 'react-live-clock';
import YouTube from 'react-youtube';
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
            },
            videoPlay:''
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
     
        axios.get('http://localhost:3001/Video').then((response)=>{
        this.setState({
            posts:response.data
        })
        });
      
    }

    _onReady(event) {
      // access to player in all event handlers via event.target
      event.target.pauseVideo();
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
      axios.post('http://localhost:3001/Video',formdata)
      .then((responce)=>{
        console.log(responce);
        let {posts}=this.state;
        posts.push(responce.data);
        this.setState({posts});
      })
    }

    render() {

      const opts = {
        height: '400',
        width: "100%",
        playerVars: {
          autoplay: 1,
        },
      };

      const opts2 = {
        height:'100',
        width: "100",
        playerVars: {
          autoplay: 1,
        },
      };

        let posts=this.state.posts.map((post)=>{
      
            return(
                <Card key={post._id} value={post.content}  onClick={() => this.setState({ videoPlay:post.content})}>
                <CardBody className="cardbody">
                <CardText>
                <YouTube videoId={post.content} opts={opts2} onReady={this._onReady} />
                <small className="text-muted">{post.date}  </small>
                  {post.title+"  "}
                  <Button size="sm" value={post.content}  onClick={() => this.setState({ videoPlay:post.content})}>  PLAY</Button>
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
            <YouTube videoId={this.state.videoPlay} opts={opts} onReady={this._onReady} />
                            
           </Container>
         
          </Col>

         
          <Col xs="12" sm="4"> 
              <Container className="PostBox">
              <Form>
        <FormGroup>
          <Label for="titlet">Title</Label>
          <Input type="text"  id="title"  vlaue={this.state.newPostData.title}  placeholder="TITLE" 
          onChange={(e)=>{
            let {newPostData}=this.state;
            newPostData.title=e.target.value;
            this.setState({newPostData});
          }}   
          
          />
        </FormGroup>

       
        <FormGroup>
          <Label for="Video ID">Title</Label>
          <Input type="text"  id="content"  vlaue={this.state.newPostData.content}  placeholder="VIDEO ID" 
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
      {posts}   


              </Container>

          </Col>
          </Row>
      </div>
    );
  }
}