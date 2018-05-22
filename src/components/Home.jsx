import React from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import DG from '2gis-maps'
// TODO - add proptypes

class Home extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			addedMarkers: [],
			isAuthenticated: false
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
		map.on('click', (e) => {
			let marker = [e.latlng.lat, e.latlng.lng]
            DG.marker(marker)
            .addTo(map);
           this.setState({addedMarkers: this.state.addedMarkers.concat([marker])})
        });
        DG.control.zoom().addTo(map).setPosition("bottomright");
        
	}

	getAddedMarkers(){
		console.log(this.state.addedMarkers);
		return this.state.addedMarkers;
	}

	handleSave(e){
		e.preventDefault();
		let addedMarkers = this.getAddedMarkers();

		axios
			.post('/api/locations', {
				id: this.props.user._id,
   				locationsArray: addedMarkers
			})
			.then(response => {
				console.log(response)
			})		
	}

	handleShow(e){
		e.preventDefault();
		/*axios.get('/api/locations').then(response => {
			console.log(response.data)
			if (response.data) {
				console.log('THERE IS A USER')
				this.setState({
					addedMarkers: this.state.addedMarkers.concat([response.data.savedLocations])
				})
			} else {
				console.log("No markers")
			}
		})*/
	}
		
	
	render(){
		return (
			<div>
			<div className="map" ref="map"></div>
			<button onClick={this.handleSave}>Save all markers</button><br/>
	    	<button onClick={this.handleShow}>Show all markers</button>
	    	</div>
    	)	
	}
}

export default Home
