import React from 'react'
import ReactDOM from 'react-dom'
import L from 'leaflet'

class Map extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			addedMarkers: []
		}
	}

	componentDidMount(){
		let map = L.map(ReactDOM.findDOMNode(this.refs.map)).setView([46.47, 30.72], 12)

		map.on('click', e => {
			this.setState({addedMarkers: this.state.addedMarkers.concat(e.latlng)})
			console.log(this.state.addedMarkers)
		})

	}




			/*, {
			'center': [46.47, 30.72],
			'zoomControl': false,
			'zoom': 12
		});
		this.setState({map: map})
		map.on('click', (e) => {
			let marker = [e.latlng.lat, e.latlng.lng]
            DG.marker(marker).addTo(map);
           this.setState({addedMarkers: this.state.addedMarkers.concat([marker])})
        });
        DG.control.zoom().addTo(map).setPosition("bottomright");*/
        
/*	}

	deleteMarkers(){
		let markers = this.state.addedMarkers;
		console.log(this.state.map)
		for(let i=0, len=markers.length; i<len; i++){
			console.log(DG.marker([markers[i][0], markers[i][1]]))
			DG.marker([markers[i][0], markers[i][1]]).remove()
		}
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
				console.log(response);
			})		
	}

	handleShow(e){
		e.preventDefault();
		axios.get('/api/locations').then(response => {
			
		})
	}
		*/
	
	render(){
		return (
			<div className="map" ref="map"></div>	  
    	)
	}
}

export default Map