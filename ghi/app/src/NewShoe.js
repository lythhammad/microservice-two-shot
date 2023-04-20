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

        componentDidMount();{
            const url = 'http://localhost:8100/api/bins';
            const response = await fetch(url);
            if (response.ok) {
              const data = await response.json();
              this.setState({bins:data.bins});
              console.log(data);
            }
          }
