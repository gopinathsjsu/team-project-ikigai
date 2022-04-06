import { Button } from '@material-ui/core';
import React, {useState} from 'react';
import './Banner.css';
import Search from "./Search";
import {useHistory} from "react-router-dom";

function Banner() {
  const history = useHistory();
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className='banner'>
        <div className='banner__search'>
            {showSearch && <Search/>}

            <Button 
            onClick= {() => setShowSearch(!showSearch)}
            variant="outlined" 
            className="banner__searchButton">
                {showSearch ? "Hide" : "Search Dates"}
            </Button>
        </div>
        <div className='banner__info'>
            <h1>Let your curiosity do the booking</h1>
            <h5>Plan your vocation from here!</h5>
            <Button variant='outlined' 
            onClick={() => 
               history.push('./search')
            }>
                 Explore Nearby

            </Button>
        </div>
    </div>
  )
}

export default Banner