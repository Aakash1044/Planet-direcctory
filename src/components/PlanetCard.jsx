import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlanetCard = ({ planet }) => {
  const [residents, setResidents] = useState([]);
  const [films, setfilms] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      const residentfetches = planet.residents.map(url => axios.get(url));
      try {
        const responses = await Promise.all(residentfetches);
        const residentsData = responses.map(response => response.data);
        setResidents(residentsData);
      } catch (error) {
        console.error('Error fetching residents:', error);
      }
    };

    fetchResidents();
  }, [planet.residents]);
  useEffect(() => {
    const fetchfilms = async () => {
      const filmsfetch = planet.films.map(url => axios.get(url));
      try {
        const response = await Promise.all(filmsfetch);
        const filmsdata = response.map(response => response.data);
        setfilms(filmsdata);
      } catch (error) {
        console.error('Error fetching films:', error);
      }
    };
    fetchfilms();
  }, [planet.films]);

  return (

    <div className="planet-card">
      <div className='board'>
        <h2 className='down'>{planet.name}</h2>
        <p>Climate: {planet.climate}</p>
        <p>Population: {planet.population}</p>
        <p>Terrain: {planet.terrain}</p>
        <p>Surface Water:{planet.surface_water}</p>
      </div>
      <h3 className='down'>  Residents</h3>
      <ul className='center board1'>
        {residents.map(resident => (
          <div>
            <li key={resident.url} className='row'>
              <p className='col'>Name: {resident.name}</p>
              <p className='col'>Height: {resident.height}</p>
              <p className='col'>Mass: {resident.mass}</p>
              <p className='col'>Gender: {resident.gender}</p>
            </li>
          </div>
        ))}
      </ul>
      <h3 className='down'>Films</h3>

      <ul className='center board2'>
        {films.map(film => (
          <div >
            <li key={film.url} className='row'>
              <p className='col'>Title: {film.title}</p>
              <p className='col'>Director: {film.director}</p>
              <p className='col'>Release Date: {film.release_date}</p>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default PlanetCard;
