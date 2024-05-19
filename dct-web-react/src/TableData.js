import React, { useState,useEffect,useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import AddNew from './AddNew';
import BySearch from './BySearch';
import EditData from './EditData'




function TableData() {
    // edit visibility
    const [itemId, setItemId] = useState(null)
    const [isEdit, setIsEdit] = useState(false);
    const handleEditVisibility = (id) => {
        setItemId(id)
        setIsEdit(!isEdit)
        fetchData()
    }
  
    // add new visibility
    const [isAddNew, setAddNew] = useState(false);
    const addNewVisibility = () => {        
        setAddNew(!isAddNew);       
        fetchData()
    };

    // search 
    const [searchValue, setSearchValue] = useState(null);
    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };

    const [data, setData] = useState('');
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        if (!searchValue) {
            try {
                const response = await axios.get('http://localhost:3001/api/contents/');
                setData(response.data);
            } catch (error) {
                setError(error);
            }
        } else {
            try {
                const response = await axios.get('http://localhost:3001/api/contents/content/' + searchValue);
                setData(response.data);
            } catch (error) {
                setError(error);
            }
        }
    }, [searchValue]);

    useEffect(() => {
        fetchData();
    }, [searchValue,fetchData]);
  

      
    if(error){
        return(
            <>
                error
            </>
        )
    }
    
    return (        
        <Container className='mt-5'>
            
            <Button onClick={addNewVisibility} className={!isAddNew ? 'btn-primary' : 'btn-danger'} disabled={isEdit ? true:false}>
                {isAddNew ? 'Batal' : 'Tambah data'}
            </Button> <hr/>
           
           
            {isEdit && <EditData handleEditVisibility={handleEditVisibility} itemId={itemId} />}
            {isAddNew && <AddNew addNewVisibility={addNewVisibility}/>}
           
            <Row className='d-flex mb-2'>
                <Col sm ={8} ></Col>
                <Col sm ={4} className='d-flex'>                    
                        <Form.Control type='text' className='' placeholder='cari kata' onChange={handleChange} value={searchValue} />
                </Col>                
            </Row>
            
           
           

            <Table className='table' bordered hover >
                <thead className='thead-dark'>
                    <tr>
                        <th style={{ width: '5%' }}>#</th>
                        <th style={{ width: '20%' }}>Indonesia</th>
                        <th style={{ width: '20%' }}>Gorap</th>
                        <th style={{ width: '10%' }}>Audio</th>
                        <th style={{ width: '15%' }}>Deskripsi</th>
                        <th style={{ width: '15%' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <BySearch data={data} fetchData={fetchData} handleEditVisibility={handleEditVisibility}/>
                </tbody>
            </Table>
        </Container>
    );
}

export default TableData;
