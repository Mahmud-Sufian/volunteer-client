import React, { useEffect, useState } from 'react';

const Event = (props) => {
    const {imageURL, _id, name} = props.event; 


    const deleteEvent = id => { 
        fetch(`https://peaceful-atoll-11025.herokuapp.com/delete/${id}`, {
            method : 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                // document.getElementById('remove').style.display = 'none'
            }
        })
        
    }
    return ( 
            <div className="col-md-2  mt-3">
                <div id="remove" class="card text-center" style={{width: '10rem', height:'350px'}}>
                <img src={imageURL} class="card-img-top" alt="..." />
                <div class="card-body">
                <h5 class="card-title">{name}</h5> 
                <button className="btn btn-primary"  onClick={() => deleteEvent(_id)}>Delete</button>
            </div>
            </div> 
            </div>
        
    );
};

export default Event;