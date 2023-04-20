import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatList from './HatList';
import NewHat from './NewHat';
import NewShoe from './NewShoe';
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
          <Route path="hats/new" element={<NewHat hats={props.hats}/>}/>
          <Route path="shoes/new" element={<NewShoe shoes={props.shoes}/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
