import React from 'react';
//import { IoIosEye,IoIosPersonAdd } from "react-icons/io";
import { Container, Row, Col} from 'reactstrap';
import '../../index.css';
import img from "../Immage/slid.gif";
import 'react-table/react-table.css';
import axios from 'axios'
import Navi from './Navigation';
import Map from './Maps';
import Clock from 'react-live-clock';
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateTime from './DateTime';
import{Redirect} from 'react-router-dom';
const jwt = require("jsonwebtoken");
export default class About extends React.Component {
    componentWillMount(){
     axios.get('http://localhost:3001/employee')
     .then((result)=>{
         this.setState({employee:result.data});
         console.log(result.data);
     })
     .catch(err=>{
         console.log("faild");
     })
    }



    render() {
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
            <Container className="contanierSlid" fluid>
            The world is a book and those who do not travel read only one page.
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
            <Container className="contanierMap" fluid> 
            ABOUT US
            <Map/>
           </Container>
          </Col>

         
          <Col xs="12" sm="4"> 

               <Container className="visionBox">
               <img src={img} alt="img" className="slider_image" />
              </Container>

              <Container className="NoticBox">
              Live as if you were to die tomorrow. Learn as if you were to live forever.
              </Container>

              <Container className="NoticBox">
              You educate a man; you educate a man. You educate a woman; you educate a generation.
              </Container>


          </Col>
          </Row>
      </div>
    );
  }
}