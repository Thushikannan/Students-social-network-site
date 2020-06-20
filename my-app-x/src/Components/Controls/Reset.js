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
export default class Reset extends React.Component {
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
         RESET
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
            GOOGLE MAP LOCATOR
            <Map/>
           </Container>
          </Col>

         
          <Col xs="12" sm="4"> 

               <Container className="visionBox">
               <img src={img} alt="img" className="slider_image" />
              </Container>

              <Container className="NoticBox">
               NOTICE BOARD
              </Container>

          </Col>
          </Row>
      </div>
    );
  }
}