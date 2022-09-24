
import './App.css';
import Header from './components/header/Header';
import Main from './components/body/Main';
import * as React from 'react';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import AddCaracter_main from './components/Add_character/AddCharacter_main';

// export const ThemeContext = React.createContext<Theme>({darkTheme:true});
//  const ThemeContext = myTheme.Provider;


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="add" element={<AddCaracter_main />} />
        </Route>
      </Routes>
    </BrowserRouter>


  );
}

export default App;
