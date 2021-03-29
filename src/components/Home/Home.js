import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';
import Event from '../Event/Event';


const Home = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // fetch('https://peaceful-atoll-11025.herokuapp.com/events?email='+loggedInUser.email)
        fetch('https://peaceful-atoll-11025.herokuapp.com/events')
        .then(res => res.json())
        .then(data => setEvents(data))
    }, [])

    return (
        <div className="row mt-5 container"  style={{margin:'auto'}}>
            {
                events.map(event =><Event event={event}></Event>)
            }
        </div>
    );
};

export default Home;