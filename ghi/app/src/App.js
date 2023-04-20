import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatList from './HatList';
import HatForm from './HatForm';
import ShoeForm from './ShoeForm';
import ShoeList from './ShoeList';



function App(props) {
  console.log(props)
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="shoes" element={<ShoeList shoes={props.shoes}/>}/>
          <Route path="hats" element={<HatList hats={props.hats}/>}/>
          <Route path="hats/new" element={<HatForm hats={props.hats}/>}/>
          <Route path="shoes/new" element={<ShoeForm shoes={props.shoes}/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
