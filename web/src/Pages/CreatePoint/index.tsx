import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import { LeafletMouseEvent } from 'leaflet';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

interface Item {
    id: number,
    name: string,
    image_url: string
}

interface CountriesResponse {
    name: string
}

const CreatePoint = () => {

    const [items, setItems] = useState<Item[]>([]);
    const [countries, setCountry] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        city: '',
        country: '',
        latitude: '',
        longitude: '',
        sharedby: 'usertest'
    });
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

    const history = useHistory();

    useEffect(() => {
        api.get('items').then(res => {
            setItems(res.data);
        });


    }, []);

    useEffect(() => {
        axios.get<CountriesResponse[]>('https://restcountries.eu/rest/v2/all').then(response => {
            const countries = response.data.map(x => x.name);
            setCountry(countries);
        });
    }, []);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);
        })
    }, []);

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([event.latlng.lat, event.latlng.lng]);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value })
    }

    function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value })
    }

    function handleCountryChange(event: ChangeEvent<HTMLSelectElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value })
    }

    function handleSelectedItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
        } else {

            setSelectedItems([...selectedItems, id]);
        }
    }

   async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { name, description, city, country, sharedby } = formData;
        const [latitude, longitude] = selectedPosition;
        const items = selectedPosition;

        const data = {
            name, 
            description, 
            city, 
            country, 
            sharedby,
            latitude,
            longitude,
            items
        };

        await api.post('points', data);

        history.push('/');
        
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="LogoApp" />

                <Link to="/"><FiArrowLeft />Back to init</Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Adding a new spot</h1>
                <fieldset>
                    <legend>
                        <h2>How do you describe this spot?</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Local name:</label>
                        <input type="text" name="name" id="name" onChange={handleInputChange} />
                    </div>

                    <div className="field">
                        <label htmlFor="description">Description:</label>
                        <textarea name="description" id="description" onChange={handleTextAreaChange} />
                    </div>

                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Where is it located?</h2>
                        <span>Use the map to select the spot</span>
                    </legend>

                    <Map center={initialPosition} zoom={15} onClick={handleMapClick} >
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={selectedPosition}></Marker>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="country">Country:</label>
                            <select name="country" id="country" onChange={handleCountryChange}>
                                <option value="0"></option>
                                {countries.map(x => (
                                    <option key={x} value={x}>{x}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">City:</label>
                            <input type="text" name="city" id="city" onChange={handleInputChange} />

                        </div>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="latitude">Latitude:</label>
                            <input type="text" value={selectedPosition[0]} readOnly name="latitude" id="latitude" onChange={handleInputChange}></input>

                        </div>
                        <div className="field">
                            <label htmlFor="longitude">Longitude:</label>
                            <input type="text" value={selectedPosition[1]} readOnly name="longitude" id="longitude" onChange={handleInputChange}></input>

                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>This spot is good to:</h2>
                        <span>Use the map to select the spot</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item => (
                            <li
                                key={item.id}
                                onClick={() => handleSelectedItem(item.id)}
                                className={selectedItems.includes(item.id) ? 'selected' : ''}
                            >
                                <img src={item.image_url} alt={item.name} />
                                <span>{item.name}</span>
                            </li>
                        ))}


                    </ul>
                </fieldset>

                <div className="field-group">
                    <div className="field">
                        <button>Cancel</button>
                    </div>
                    <div className="field">
                        <button type="submit">Save</button>
                    </div>
                </div>

            </form>


        </div>
    )
};

export default CreatePoint;