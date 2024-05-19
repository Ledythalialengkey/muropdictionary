import * as React from 'react';
import Col from 'react-bootstrap/Col';
import Row  from 'react-bootstrap/Row';
import './OptionBar.css'

export default function OptionsBar(props) {
  

  return (
    <Row className="pt-5" >                   
        <Col className='text-center  w-100'>
          <div className='p-1 box-rounded'>{props.from}</div>
        </Col>
        <Col xs={2} className='text-center'>
            <div onClick={props.switchValues} className='p-1 box-center '><i class="bi bi-arrow-left-right"/></div>
        </Col>
        <Col className=''>
          <div className='text-center p-1 box-rounded'>{props.to}</div>
        </Col>
      </Row>    
  );
}