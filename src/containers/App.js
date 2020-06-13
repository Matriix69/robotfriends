import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry'

class App extends Component {
	constructor(){
		super()
		this.state = {
			Robots : [],
			searchfield: ''
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response=> {
			return response.json();
		})
		.then(users => {
			this.setState({Robots : users})
		})
		
	}
	onsearchchange = (event) => {
		this.setState({searchfield: event.target.value})
		

	}
	render(){
		const {Robots, searchfield} = this.state;
		const filterRobot = Robots.filter(robots =>{
			return robots.name.toLowerCase().includes(searchfield.toLowerCase())
		})
	return( !Robots.length ?
		<h1>Loading</h1>
		:
		<div className = 'tc'>
			<h1 className = 'f2'> RobotFriends </h1>
			<SearchBox searchChange={this.onsearchchange}/>
			<Scroll>
				<ErrorBoundry>
				<CardList Robots={filterRobot}/>
				</ErrorBoundry>
			</Scroll>
		</div>
		)
	}
	
}

export default App;