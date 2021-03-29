import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { userContext } from '../../App';
import './AddEvents.css';

const AddEvents = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const [success, setSuccess] = useState(false);
  const [imageURL, setIMageURL] = useState(null);


  const onSubmit = data => {
    const eventData = {
      name: data.name,
      imageURL: imageURL,
      user: loggedInUser
    };
    const url = `https://peaceful-atoll-11025.herokuapp.com/addEvent`;
    
    fetch(url, {
      method: 'POST', 
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(eventData)
    })
    .then(res => res.json())
    .then(data => {
      if(data){
        setSuccess(true);
      }
    })
  };

  const handleImageUpload = event => {
    console.log(event.target.files[0])
    const imageData = new FormData();
    imageData.set('key', '20ee534ec022d950affa1ad4da921bd9');
    imageData.append('image', event.target.files[0]);
    
    axios.post('https://api.imgbb.com/1/upload', 
    imageData)
    .then(function (response) {
      setIMageURL(response.data.data.display_url);
      // console.log(99, response)
    })
    .catch(function (error) {
      console.log(error);
    });

  }
  return (
    <div className="container row">
        <div className="col-md-2"></div> 
        <div className="col-md-8">
                <h1 className="text-center">Add your awesome Event here</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="myForm">
              
                <input name="name" className="form-control" defaultValue="New exciting Event" ref={register} />
                <br/>
                <input name="exampleRequired" className="form-control" type="file" onChange={handleImageUpload} />
                <br/>
                <input type="submit" className="form-control" />
                {
                  success && <p style={{textAlign:'center', color:'green', marginTop:'3px'}}>Upload Successfully</p>
                }
              </form>
          </div> 
        <div className="col-md-2"></div>
        
    </div>
  );
};

export default AddEvents;