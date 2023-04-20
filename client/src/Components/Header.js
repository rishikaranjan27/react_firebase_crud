import { useEffect, useState } from 'react';
import '../CSS/Header.css'
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios"
import {baseUrl} from '../Lib';


export const Header = () => {


    const [count, setCount] = useState([]);


    useEffect(() => {

        const fetchData = async () => {

            try {

                const {data} = await axios.get(
                    `${baseUrl}/api/count`
                )

                setCount(data);

                console.log("countdata", data);

            }

            catch(err) {
                console.log(err);
            }
        }

        fetchData();


    }, []);




    return(
        <div className="header">

            <div className='logo'>SECQUR<span>AI</span>SE</div>

            <div className='search'><SearchIcon className='search-icon'/></div>

            <div className='green-btn'>{count.totalMaleCount}</div>
            <div className='red-btn'>{count.totalFemaleCount}</div>

        </div>
    )
}