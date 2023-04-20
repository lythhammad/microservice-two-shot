import React, { Component } from "react";

class NewShoe extends React.Component {
    state = {
        manufacturer: '',
        modelName: '',
        shoeURL: '',
        color: '',
        bin: '',
        bins:[]
        }

    }

    handleManufacturerChange = (event)=>{
        const value = event.target.value
        this.setState({manufacturer:value})}

    handleModelNameChange = (event)=>{
        const value = event.target.value
        this.setState({modelName:value})}

    handleShoeURLChange = (event)=>{
        const value = event.target.value
        this.setState({shoeURL:value})}

    handleColorChange = (event)=>{
        const value = event.target.value
        this.setState({color:value})}

    handleBinChange = (event)=>{
        const value = event.target.value
        this.setState({bin:value})}

    handleSubmit = async (event) => {
        event.preventDefault();
        const data = {... this.state};
        data.model_name = data.modelName
        delete data.shoeURL
        delete data.modelName
        delete data.bins

        const shoeURL = 'http://localhost:8080/api/shoes/';
        const fetchConfig = {
            method:'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'

            }

        }
    }
        const response = await fech(shoeURL, fetchConfig);

        if (response.ok){
            const newShoe = await response.JSON();
            console.log(newShoe)

            const cleared = {
                manufacturer: '',
                modelName: '',
                shoeURL: '',
                color: '',
                bin: '',
            }
            this.setState(cleared)

    }
        else{
            console.log("An Error Occurred")
        }

        componentDidMount = async () =>{
            const url = 'http://localhost:8100/api/bins';
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                this.setState({bins:data.bins});
                console.log(data);
            }
            }

    render();{
        return (
        <div className='row'>
                <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Add new shoe</h1>
                <form onSubmit={this.handleSubmit} id="shoe-form">
                <div className="form-floating mb-3">
                    <input onChange={this.handleModelNameChange} value={this.state.modelName} placeholder="Name" required type="text" name="model_name" id="model_name" className="form-control"/>
                    <label html For="model_name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handleColorChange} value={this.state.color} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                    <label html For="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handleManufacturerChange} value={this.state.manufacturer} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control"/>
                    <label html For="manufacturer">Manufacturer</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handleShoeURLChange} value={this.state.shoeURL} placeholder="Upload a picture" required type="url" name="Shoe_url" id="Shoe_url" className="form-control"/>
                    <label html For="Shoe_url">Shoe Picture Url</label>
                </div>
                <div className="mb-3">
                    <select value={this.state.bin} onChange={this.handleBinChange} required id="bin" name="bin" className="form-select">
                    <option value="" disabled>Choose a bin</option>
                    {this.state.bins.map(bin=>{
                        return(
                                <option key={bin.id} value={bin.href}>
                                {bin.bin_number}
                            </option>
                        );
                    })}
                    </select>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
            </div>
        )
    }

export default ShoeForm;
