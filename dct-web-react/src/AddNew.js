import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';



const AddNew = ({ addNewVisibility }) => {

    const [postData, setPostData] = useState({
        contentFrom: '',
        contentTo: '',
        contentDesc: '',
        contentAudio: '',
    });
    const [error, setError] = useState(null)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData(prevState => ({
          ...prevState,
          [name]: value
        }));
    };  
    const handleSubmit = async (e) => {
        e.preventDefault();        
        try{
            await axios.post('http://localhost:3001/api/contents', postData)            
        }
        catch(error){
            setError(error)
        }
        finally{
        } 
        addNewVisibility();
    };


    // file upload
    const [fileUpload, setFileUpload] = useState(null)

    const handleFile = (event) => {
        const selectedFile = event.target.files[0];
        setFileUpload(selectedFile);        
    }
    const saveFile = useCallback(async () => {
        const formData = new FormData();
        formData.append('file', fileUpload);

        try {
            const response = await axios.post('http://localhost:3001/api/Contents/Upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const newFileName = JSON.stringify(response.data)
            
            setPostData(prevState => ({
                ...prevState,
                contentAudio: newFileName
            }))

        } 
        catch (error) {
            console.error('Error uploading file:', error);
        }
    },[fileUpload])


    useEffect(()=>{
        saveFile()
    },[fileUpload,saveFile])

    // file name


    return(
        <>
            <h4>Tambah Data</h4>
            <Form onSubmit={handleSubmit}>
            <Table bordered className='mt-2'>
                <tbody>
                    <tr className='h-25'>
                        <td><Form.Control name='contentFrom' type='text' placeholder='indonesia' value={postData.contentFrom !== null ? postData.contentFrom : '' } onChange={handleChange} required/></td>
                        <td><Form.Control name='contentTo' type='text' placeholder='gorap'  value={postData.contentTo !== null ? postData.contentTo : ''}  onChange={handleChange} required/></td>
                        <td style={{width:'20%'}}>
                            <Form.Control type='hidden' name='contentAudio' value = {postData.contentAudio !==null ? postData.contentAudio : ''} onChange={handleChange}/>
                            <Form.Control type='file' onChange={handleFile}/>
                        </td>
                        <td><Form.Control name='contentDesc' type='text' placeholder='deskripsi'  value={postData.contentDesc !==null ? postData.contentDesc : ''} onChange={handleChange}/></td>
                    </tr>
                </tbody>
                <Button type="submit" className='btn-primary mt-2'>Submit</Button>
            </Table>
            </Form>
            

            <pre>
                {
                    error
                }
            </pre>
            
        </>
    );
}

export default AddNew;