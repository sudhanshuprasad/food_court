import './App.css';
import Grid from './components/Grid';
import Cart from './components/Cart';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Orders from './components/Order';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/home" element={<Grid />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/order" element={<Orders />}/>
        </Routes>
        {/* <Grid /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
