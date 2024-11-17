import React from 'react';
import { BrowserRouter, Navigate, Routes, Route} from 'react-router-dom'
import Savi from './screens/maths/savi';

function App() {
  return (
    <div className="app" style={{
          width: '100%',
          height: '100%'
    }}>
      <BrowserRouter>
          <Routes>

            <Route path='/' element={<Savi/>} />

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
