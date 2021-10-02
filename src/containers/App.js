import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../ErrorBoundary';
import './App.css';

const App = () => {
    const [ robots, setRobots ] = useState([]);
    const [ searchField, setSearchField ] = useState('');
    const [ count, setCount ] = useState(0);

    useEffect(() => {
        fetch('https://jsonplaceholder.cypress.io/users')
        .then(response => response.json())
        .then(robots => {
            setRobots(robots);
        })  
        console.log(count);
    }, [count]);

    const onSearchChange = (event) => {
        setSearchField(event.target.value);
    }
    console.log(searchField, robots);
    const filteredRobots = robots.filter(robot => robot.name.toLowerCase().includes(searchField.toLowerCase()));
    return !robots.length ? 
        (
            <div className='tc'> 
                <h1>Loading</h1>
            </div>
        )
        :
        (    
            <div className='tc'>
                <h1>RoboFriends</h1>
                <button onClick={() => setCount(count + 1)}>Click Me!</button>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div> 
        )
}

export default App;