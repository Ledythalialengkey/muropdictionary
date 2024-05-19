import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState,useEffect,useCallback } from 'react';



function EditData({ handleEditVisibility, itemId }){
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/api/Contents/${itemId}`);
            const responseData = response.data
            console.log(responseData.contentFrom)
            setPutData({
                Id:itemId,
                contentFrom: responseData.contentFrom,
                contentTo: responseData.contentTo,
                contentDesc: responseData.contentDesc,
                contentAudio: responseData.contentAudio
            });

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
    fetchData(); 
    }, [itemId]);
    
    // handle change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPutData(prevState => ({
          ...prevState,
          [name]: value
        }));
    };  

    // set put data
    const [putData, setPutData] = useState({
        Id :'',
        contentFrom: '',
        contentTo: '',
        contentDesc: '',
        contentAudio: '',
    });


    // handle file
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
            setPutData(prevState => ({
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


    const handleSubmit = async (e) => {
        e.preventDefault();        
        try{
            await axios.put('http://localhost:3001/api/contents/'+itemId, putData)       
        }
        catch(error){
        }
        finally{
        } 
        handleEditVisibility();
    };

    return(
        <>

            <h4>Edit Data</h4>
            <Form onSubmit={handleSubmit}>
            <Table bordered  responsive className='mt-2'>                
                    <tbody>
                        <tr>
                        <td><Form.Control type='text' value={putData.contentFrom } onChange={handleChange} name='contentFrom'/></td>
                        <td><Form.Control type='text' value={putData.contentTo} onChange={handleChange} name='contentTo'/></td>
                        <td style={{width:'20%'}}>
                            <Form.Control type='file' onChange={handleFile}/>
                            <Form.Control type='hidden' name='contentAudio' value = {putData.contentAudio !==null ? putData.contentAudio : ''} onChange={handleChange}/>
                        </td>
                        <td><Form.Control type='text' name='contentDesc' placeholder='deskripsi'value={putData.contentDesc} onChange={handleChange}/></td>
                        </tr>
                    </tbody>
                    <Button type='submit' className='btn-primary border mt-2'>Update</Button>
            </Table>            
            </Form>
        </>
    );
}

export default EditData;