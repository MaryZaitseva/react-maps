import React from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import DG from '2gis-maps'

class Map extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			addedMarkers: [],
			map: {}
		}
		this.handleSave = this.handleSave.bind(this);
		this.handleShow = this.handleShow.bind(this);
	}

	componentDidMount(){
		let map = DG.map(ReactDOM.findDOMNode(this.refs.map), {
			'center': [46.47, 30.72],
			'zoomControl': false,
			'zoom': 12
		});
		this.setState({map: map})
		map.on('click', (e) => {
           let marker = DG.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
           this.setState({addedMarkers: this.state.addedMarkers.concat([marker])})
        });
        DG.control.zoom().addTo(map).setPosition("bottomright");
        
	}

	handleSave(e){
		e.preventDefault();
		let addedMarkers = this.state.addedMarkers.map(item => {
			return [item._latlng.lat, item._latlng.lng]
		});
		this.state.addedMarkers.forEach((item) =>{
					item.remove()
				})
		this.setState({addedMarkers: []})
		axios
			.post('/api/locations', {
				id: this.props.user._id,
				locationsArray: addedMarkers
			})
			.then(response => {
				console.log(response);
			})		
	}

	handleShow(e){
		e.preventDefault();
		axios.get('/api/locations').then(response => {
			console.log(response.data)
			if (response.data) {
				let savedLocations = response.data.savedLocations;
				savedLocations.forEach(item => {
					let marker = DG.marker([item[0], item[1]]).addTo(this.state.map)
					this.setState({addedMarkers: this.state.addedMarkers.concat([marker])})
				}
					
					)
			} else {
				console.log("No markers")
			}
		})
	}
		
	
	render(){
		return (
			<div>
			<div className="map" ref="map"></div>
			{this.props.user ? <div><button onClick={this.handleSave}>Save all markers</button><br/>
	    	<button onClick={this.handleShow}>Show all markers</button></div> : <p>Log in to save your markers</p>}
			
	    	</div>
    	)	
	}
}

export default Map
