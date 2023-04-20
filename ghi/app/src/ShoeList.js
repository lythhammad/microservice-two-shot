import { redirect } from 'react-router-dom'
import {useState, useEffect} from 'react';

function ShoeList(props) {
  console.log(props)
  const [shoes, setShoes] = useState([])

  const getData = async () => {
    const resp = await fetch('http://localhost:8080/api/shoes/')
    const data = await resp.json()
    setShoes(data)
  }

  const handleDelete = async (id) => {
    const resp = await fetch(`http://localhost:8080/api/shoes/${id}`, { method:"DELETE"})
    const data = await resp.json()
    getData()
    window.location = "/shoes"
  }

  useEffect(()=> {
    getData();
  }, [])


  return (
        <table className="table table-hover table-striped">
          <thead className= "text-center">
            <tr>
              <th>Shoe Name</th>
              <th>Pic</th>
              <th>Bin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className= "text-center">
          {props.shoes?.map(shoe => {
          return (
            <tr className = "align-middle" key={shoe.id}>
              <td>{ shoe.name }</td>
              <td>{ shoe.bin }</td>
              <td>
                <div>
                  <img src={shoe.picture_url} className="rounded mx-auto d-block text-center" alt="Shoe_url" style={{ width: 200, height: 200 }} />
                </div>
              </td>
              <td>
              <button className="btn btn-primary m-2" onClick={()=> {handleDelete(shoe.id)}}>Delete</button>
              </td>
            </tr>
          );
        })}
          </tbody>
        </table>
      )
}

export default ShoeList;
