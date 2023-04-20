import { Header } from "../Components/Header"
import { Left } from "../Components/Left"
import { Right } from "../Components/Right"
import { Sidebar } from "../Components/Sidebar"
import '../CSS/HomeScreen.css'

import { useEffect, useState } from 'react';





export const HomeScreen = () => {

    const [user, setUser] = useState('EIAMTOjIOzPPbwe4dYLJ');
    
    return(
        <div className="homeScreen">

            <Header/>

            <div className='flex'>

                <div className='home-sidebar'><Sidebar/></div>
                <div className='home-left'><Left user = {user}/></div>
                <div className='home-right'><Right setUser = {setUser}/></div>
                
            </div>

        </div>
    )
}