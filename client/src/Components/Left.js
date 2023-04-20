import { useEffect, useState, useContext, useReducer } from 'react'
import '../CSS/Left.css'
import axios from 'axios';
import moment from 'moment';
import { LoadingBox } from './LoadingBox';
import {baseUrl} from '../Lib';



const reducer = (state, action) => {

    switch(action.type) {

        case 'FETCH_REQUEST':
            return {...state, loading: true};
        
        case 'FETCH_SUCCESS':
            return {...state, userData : action.payload, loading: false};

        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};


            
        case 'FETCH_IMAGE_REQUEST':
            return {...state, loading: true};
            
        case 'FETCH_IMAGE_SUCCESS':
            return {...state, userImage : action.payload, loading: false};
    
        case 'FETCH_IMAGE_FAIL':
            return {...state, loading: false, error: action.payload};


        
        default:
            return state;
    }
};


export const Left = ({user}) => {

    const [{loading, userData, userImage, error}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
        userData: 
        {
            Date: "9-Jan-23",
            Gender: "Female",
            ID: "EVT0042",
            Location: "Bangalore",
            Name: "Female20",
            Time: "8:51:41",
            id: "0lSd7MHSSSwZMaJIbQMT"
        },
        userImage: 'https://firebasestorage.googleapis.com/v0/b/clone-a5fb2.appspot.com/o/UserImages%2FFemale20.jpg?alt=media&token=67e6616c-1c50-4dca-9757-b429da2273bb'
    });


 

    const fetchUserImage = async (id) => {

        dispatch({type: 'FETCH_IMAGE_REQUEST'});

        try {
    
            const {data} = await axios.get(
                `${baseUrl}/api/users/img/${id}`
            )

            dispatch({type: 'FETCH_IMAGE_SUCCESS', payload: data.imageUrl});

        
        }

        catch(err) {

            dispatch({type: 'FETCH_IMAGE_FAIL', payload: err.message});

            console.log(err);
        }

    }


    useEffect(() => {

        const fetchUser = async () => {

            dispatch({type: 'FETCH_REQUEST'});

            try {
    
                const {data} = await axios.get(
                    `${baseUrl}/api/users/${user}`
                )
    
                dispatch({type: 'FETCH_SUCCESS', payload: data});

        
                fetchUserImage(data.Name);
    
    
            }
    
            catch(err) {

                dispatch({type: 'FETCH_FAIL', payload: err.message});

                console.log(err);
            }
    
        }

        fetchUser();

    }, [user]);

    


    return(
     
        <div className="left">

            <div className='leftText'>

                <h3>{userData.ID}</h3>
                <h3>Person detected</h3>

                <p>
                    <span className='span'>Name</span> 
                    <span>: {userData.Name}</span>
                </p>

                <p>
                    <span className='span'>Location</span>
                    <span>: {userData.Location}</span>
                </p>

                <p>
                    <span className='span'>Date</span>
                    <span>: {moment(userData.Date).format('DD-MMM-YY')}</span>
                </p>

                <p>
                    <span className='span'>Time</span>
                    <span>: {userData.Time}</span>
                </p>

                <br/>

                <p>Description:</p>
                <div className='para'>
                    <p>{userData.Name} detected at</p>
                    <p>{userData.Location} on</p>
                    <p>{moment(userData.Date).format('Do MMMM, YYYY')}</p>
                </div>
                

            </div>
    


            <div className='leftImage'>
                <h3>{userData.Gender}</h3>

                {
                loading ? (
                    <LoadingBox/>
                ) : 

                (
                <img src={userImage}/>
                )
                }
            </div>

        </div>
        
    )
}