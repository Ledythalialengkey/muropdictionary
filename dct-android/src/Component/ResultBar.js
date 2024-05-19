import * as React from 'react';
import { useState,useRef,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form  from 'react-bootstrap/Form';
import Row  from 'react-bootstrap/Row';
import DropDowndct from './DropDowndct';

export default function ResultBar(props) {
  const dirPath = '"http://localhost:3001/api/Contents/audio/"'
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElement = useRef(null)
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(()=>{    
    if(isPlaying){
      console.log('is play')
      audioElement.current.play();
    }
    else{
      console.log('is pause')
      audioElement.current.pause();
    }
  },[isPlaying])

  const [result, setResult] = useState({
    contentFrom: "",
    contentTo: "",
    contentAudio: "",
  });
  const src = !result.contentAudio !=null ? '' : dirPath.slice(1, -1) +result.contentAudio.slice(1, -1)

  return (
    <Row className='mt-4 ps-4'>
        <Row>
            <div  className='mb-2' style={{paddingLeft:'0'}}>
              {props.from} 
              <Button className='btn-sm ms-2 btn-light ' style={{backgroundColor:'#fff', marginLeft:'0 !important',marginBottom:'0 !important'}}>
                <i class="bi bi-volume-down-fill"></i>
              </Button>              
            </div>            
            
            <DropDowndct setResult={setResult}/>
            
        </Row>
        
        <Row className='mt-3'>
            <div  className='mb-2' style={{paddingLeft:'0'}}>
              {props.to} 

              <audio  id="audioElement" ref={audioElement}
                      autoPlay={false}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      >
                    {result.contentAudio  &&  <source src={src} type="audio/mpeg" />}                            
              </audio>

              <Button onClick={togglePlay} className='btn-sm ms-2 btn-light ' style={{backgroundColor:'#fff', marginLeft:'0 !important',marginBottom:'0 !important'}}>
                <i class="bi bi-volume-down-fill"></i>
              </Button>              
            </div>            
            <Form.Control type='text' style={{height:'50px'}} value={result.contentTo}  />            
        </Row>        

        
    </Row>
  );
}