import React, { useState, useEffect } from "react";
import PlanetCard from "./PlanetCard";
import axios from "axios";
function App() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await axios.get('https://swapi.dev/api/planets/');
        setPlanets(response.data.results);
      } catch (error) {
        console.error('Error while fetching planets:', error);
      }
    };

    fetchPlanets();
  }, []);

  return (
    <div className="app">
      <h1>Planets Directory</h1>
      {planets.map(planet => (
        <PlanetCard key={planet.url} planet={planet} />
      ))}
    </div>
  );
}
export default App;