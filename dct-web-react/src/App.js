import React from 'react';
import Navtop from './Navtop';
import TableData from './TableData';

function App(){
  return(
    // <Router>
    //   <Container className='mt-3 p-3'>
    //       <Navtop/>
    //         <Routes>
    //           <Route exact path="/dashboard" element={<TableData/>} />
    //         </Routes>            
    //   </Container>
    // </Router>    
    <>
      <Navtop/>
      <TableData/>
    </>    
  );
}



export default App;
