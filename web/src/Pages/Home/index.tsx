import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/logo.svg';

const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="MyPoints" />
                </header>
                <main>
                    <h1>Map hot points to Surf, Bodyboard, SUP and Kite.</h1>
                    <p>Search and share with your friends the best points ever.</p>
                    <Link to="/create-point">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Create a new point</strong>
                    </Link>
                </main>
            </div>
        </div>
    )
};

export default Home;