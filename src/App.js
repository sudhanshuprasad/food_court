import './App.css';
import Grid from './components/Grid';
import Cart from './components/Cart';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Orders from './components/Order';
import { Provider } from 'react-redux';
import {store} from './state/store.js'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Grid />}/>
          <Route path="/home" element={<Grid />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/order" element={<Orders />}/>
        </Routes>
        {/* <Grid /> */}
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
