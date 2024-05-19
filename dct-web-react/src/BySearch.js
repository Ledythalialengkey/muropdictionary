// import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "react-bootstrap";


const BySearch = ({data,fetchData,handleEditVisibility}) =>{
  const dirPath = '"http://localhost:3001/api/Contents/audio/"'
  
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/contents/delete/${id}`)
      .then(response => {
          fetchData();
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  };

    return(
        <>  
            {data && data.map((item,index)=>(
                    <tr key={index}>
                        <td className='align-middle'>{index+1}</td>
                        <td className='align-middle'>{item.contentFrom}</td>
                        <td className='align-middle'>{item.contentTo}</td>
                        <td className='align-middle'>
                            <audio controls>
                                {item.contentAudio &&  <source src={dirPath.slice(1, -1) +item.contentAudio.slice(1, -1)} type="audio/mpeg" />
                            }                            
                            </audio>
                        </td>
                        <td className='align-middle'>{item.contentDesc}</td>
                        <td className='align-middle'>
                            {/* id : {item.id   }  */}
                            <Button className="btn-sm mx-2" onClick={() => handleEditVisibility(item.id)} >Edit</Button>
                            <Button className="btn-sm btn-danger" onClick={() => handleDelete(item.id)}>delete</Button>
                        </td>
                    </tr>                     
            ))} 
        </>
    )
}

export default BySearch;