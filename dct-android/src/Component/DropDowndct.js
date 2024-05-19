import React from "react";
import { useState, useEffect } from "react";
import Form  from "react-bootstrap/Form";
import Dropdown  from "react-bootstrap/Dropdown";
import axios from "axios";

export default function DropDowndct( prop ) {

  const [inputText, setInputText] = useState('');
  const [content, setContent] = useState(null);
  const [idContent, setIdcontent] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false)


  // On input handle
  const onInputHandle = (event) => {
    setInputText(event.target.value)
    setShowDropdown(true)
  }

  // On select dropdown
  const onSelectDrop = (event,item, id) => {
    setInputText(item)    
    setShowDropdown(false)
    setIdcontent(id)
  }

  useEffect(() => {
    const url = 'http://localhost:3001/api/Contents/'+idContent;
    
    
    idContent !=null && axios.get(url)
      .then(response => {                  
        const data = response.data
        prop.setResult(prevResponse => ({
          ...prevResponse,
          contentFrom: data.contentFrom,
          contentTo: data.contentTo,
          contentAudio : data.contentAudio 
        }))
        
      })
      .catch(error => {
        alert(error)
      });    
  },[idContent])

  // Fetch data from search item
  useEffect(() => {
    // Define the URL with parameters
    const url = 'http://localhost:3001/api/Contents/content/'+inputText;

    // Fetch data when the component mounts
    inputText.length > 0 && axios.get(url)
      .then(response => {
        setContent(response.data);
      })
      .catch(error => {
      });
    }, [inputText]); 



  return (
    <>
    
        {/* Input Form */}
        <Form.Control type="text" onChange={onInputHandle} value={inputText}/>

        {/* Drop down result*/}
        <br/>
        {inputText.length > 0 &&
          <Dropdown.Menu show={showDropdown} style={{maxWidth:'240px', marginTop:'80px'}}>
            {
              content!=null && content.map(item => (
                <Dropdown.Item href="#/action-1" onClick={(e) => onSelectDrop(e, item.contentFrom,item.id)} key={item.id}>{item.contentFrom}</Dropdown.Item>            
              ))
            }

          </Dropdown.Menu>
        } 

        
    </>
  );
}


/*

Needs component :
  - Input text
  - Drop down
Needs variable :
  - useState : inputText 
  - useState : setParameters
Needs handles :
  - Handle when input : onInputHandle -> setInputText -> callApi
  - Handle  when select the dropdown : onSelectDrop
Use Case :
  - Click the input text
  - Call onInputHandle 
        -> inputText > 0 -> Display Dropdown
        -> inputText < 0 -> Display nothing
  - Click dropdown suggestion     
        -> Display the result    


*/