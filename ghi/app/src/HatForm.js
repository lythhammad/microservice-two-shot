import React from 'react';
import loadData from "./index"

class HatForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            fabric: '',
            styleName: '',
            color: '',
            pictureUrl: '',
            locations: []
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleFabricChange = this.handleFabricChange.bind(this);
        this.handleStyleNameChange = this.handleStyleNameChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.style_name = data.styleName;
        data.picture_url = data.pictureUrl;
        delete data.styleName;
        delete data.pictureUrl;
        delete data.locations;
        console.log(data);

        const hatUrl = 'http://localhost:8090/api/hats/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        };
        const response = await fetch(hatUrl, fetchConfig);
        if (response.ok) {
            const newHat = await response.json();
            console.log(newHat);
            const cleared = {
            name: '',
            fabric: '',
            styleName: '',
            color: '',
            pictureUrl: '',
            location: '',
            };
            this.setState(cleared);
            loadData()
        }
        }
    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value})
    }
    handleFabricChange(event) {
        const value = event.target.value;
        this.setState({fabric: value})
    }
    handleStyleNameChange(event) {
        const value = event.target.value;
        this.setState({styleName: value})
    }
    handleColorChange(event) {
        const value = event.target.value;
        this.setState({color: value})
    }
    handlePictureUrlChange(event) {
        const value = event.target.value;
        this.setState({pictureUrl: value})
    }
    handleLocationChange(event) {
        const value = event.target.value;
        this.setState({location: value})
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/locations/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({locations: data.locations})
            }
        }

    render() {
        return (

        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a new hat</h1>
                <form onSubmit={this.handleSubmit} id="create-hat-form">
                <div className="form-floating mb-3">
                    <input onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="id" className="form-control" value={this.state.name}/>
                    <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input onChange={this.handleFabricChange} placeholder="fabric" required type="text" name="fabric" id="fabric" className="form-control" value={this.state.fabric}/>
                    <label htmlFor="fabric">Fabric</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input onChange={this.handleStyleNameChange} placeholder="style_name" required type="text" name="style_name" id="style_name" className="form-control" value={this.state.styleName}/>
                    <label htmlFor="style_name">Style Name</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input onChange={this.handleColorChange} placeholder="color" required type="text" name="color" id="color" className="form-control" value={this.state.color}/>
                    <label htmlFor="color">Color</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input onChange={this.handlePictureUrlChange} placeholder="picture_url" required type="url" name="picture_url" id="picture_url" className="form-control" value={this.state.pictureUrl}/>
                    <label htmlFor="picture_url">Picture</label>
                    </div>
                    <div className="mb-3">
                    <select onChange={this.handleLocationChange} required id="location" name= "location" className="form-select" value={this.state.location}>
                    <option value="">Choose a location</option>
                    {this.state.locations.map(location => {
                        return (
                        <option key={location.id} value={location.closet_name}>
                            {location.closet_name}
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

        );
    }
}

export default HatForm
