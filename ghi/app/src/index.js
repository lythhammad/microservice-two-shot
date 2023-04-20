import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function loadData() {
  const hatsResponse = await fetch('http://localhost:8090/api/hats/');
  console.log(hatsResponse)
  const shoeResponse = await fetch('http://localhost:8080/api/shoes/');
  console.log(shoeResponse)

  if (hatsResponse.ok && shoeResponse.ok) {
    const hatsData = await hatsResponse.json();
    console.log(hatsData)
    const shoeData = await shoeResponse.json();
    console.log(shoeData)

    root.render(
      <React.StrictMode>
        <App
          hats={hatsData.hats}
          shoes={shoeData.shoes}
        />
      </React.StrictMode>
    )} else {
    console.error(hatsResponse);
    console.error(shoeResponse)
  }
}

loadData()

export default loadData
