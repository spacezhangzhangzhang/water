import React from 'react'
import { Link } from 'react-router-dom'


const SearchBar = () => {
    return (
        <form>
            <div className='form-row align-items-center'>
                <div class="col-auto">
                    <input type='text' className="form-control d-inline" placeholder='search friends by name'></input>
                </div>
                <Link to='/friendPage'>
                    <div class="col-auto">
                        <button className='btn btn-light'>go</button>
                    </div>
                </Link>
                <Link to='/personalPage'>
                    <div class="col-auto">
                        <button className='btn btn-light'>me</button>
                    </div>
                </Link>
            </div>
        </form>
    );
}

export default SearchBar