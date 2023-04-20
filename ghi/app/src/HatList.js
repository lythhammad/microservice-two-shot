import { redirect } from 'react-router-dom'
import {useState, useEffect} from 'react';

function HatsList(props) {
    console.log(props)
    const [hats, setHats] = useState([])


    const getData = async () => {
        const resp = await fetch('http://localhost:8090/api/hats/')
        const data = await resp.json()
        setHats(data)
    }

    const handleDelete = async (id) => {
        const resp = await fetch(`http://localhost:8090/api/hats/${id}`, { method:"DELETE"})
        const data = await resp.json()
        getData()
        window.location = "/hats"
    }

    useEffect(()=> {
        getData();
    }, [])

    return(
        <table className="table table-hover table-striped">
            <thead className='text-center'>
            <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Pic</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody className='text-center'>
            {props.hats?.map(hat => {
                return (
                <tr className='align-middle' key={hat.id}>
                    <td>{ hat.name }</td>
                    <td>{ hat.location }</td>
                    <td>
                    <div>
                        <img src={hat.picture_url} alt="picture_url" style={{ width: 200, height: 200 }} />
                    </div>
                    </td>
                    <td>
                    <button className="btn btn-primary m-2" onClick={()=> {handleDelete(hat.id)}}>Delete</button>
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>
    );
}

export default HatList;
