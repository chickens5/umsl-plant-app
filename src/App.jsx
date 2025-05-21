/* Food Systems – Regenerative agriculture, foraging, food forests.
 Water Systems – Harvesting, filtration, greywater, purification.

Power & Energy – Solar, human-powered, biogas, passive design.

Shelter & Construction – Cob, earthbags, timber, local materials.

Clothing & Fibers – Growing, weaving, repurposing, zero-waste apparel.

♻Waste & Sanitation – Compost toilets, recycling, greywater systems.

Community & Governance – Decision-making, sharing, education.

Culture, Knowledge & Health – Herbalism, teaching, art, spiritual values. */


import React, { useState, useEffect, useRef } from "react";
import './styles/global.css';
import './styles/components.css';

export default function NativePlantRecommender() {
    const [allPlants, setAllPlants] = useState([]);
    const [genusImages, setGenusImages] = useState({});
    const [showAll, setShowAll] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({
        soilType: [],
        useCase: [].
        sunlight: [],
        habitat: [],
        plantType: [],
        plantStatus: []
    });
    const [recommendations, setRecommendations] = useState([]);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const plantsPerPage = 10;
    const plantDetailRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
    const pageContainerRef = useRef(null);

    const filterOptions = {
        plantStatus: ['S1', 'S2', 'S3', 'S4', 'S5'],
        soilType: ['moist', 'dry'],
        sunlight: ['full_sun', 'part_shade', 'full_shade'],
        plantType: ['Tree','Shrub','Forb','Fern', 'Grass'],
        habitat: [
            'rain_garden_wet',
            'rain_garden_dry',
            'bioswale',
            'wildlife_keystone',
            'ground_cover'
        ],
     useCase: [
      'tornado_resistant'
     ]
    };

    const habitatDisplayNames = {
        'rain_garden_wet': 'Rain Garden (Wet soil)',
        'rain_garden_dry': 'Rain Garden (Dry soil)',
        'bioswale': 'Bioswale',
        'wildlife_keystone': 'Wildlife Keystone',
        'ground_cover': 'Ground Cover'
    };

    const useCaseDisplayNames = {
       'tornado_resistant': "Tornado Resistant"
    };

    const handleScroll = () => {
        if (pageContainerRef.current) {
            const { scrollHeight, scrollTop, clientHeight } = pageContainerRef.current;
            setIsScrolledToBottom(scrollHeight - scrollTop === clientHeight);
        }
    };

    const scrollToBottom = () => {
        if (pageContainerRef.current) {
            pageContainerRef.current.scrollTo({ top: pageContainerRef.current.scrollHeight, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/plant_data.json")
            .then((res) => res.json())
            .then((data) => setAllPlants(data))
            .catch(() => setRecommendations([{ common_name: "⚠️ Error loading plant data." }]));
    }, []);

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/genusImages.json`)
            .then((res) => res.json())
            .then((data) => setGenusImages(data))
            .catch(() => console.error("⚠️ Error loading genus images data."));
    }, []);

    useEffect(() => {
        setLoading(true);
        const filteredPlants = filterPlants(allPlants);
        setTimeout(() => setLoading(false), 800);
        setRecommendations(filteredPlants);
        setSelectedPlant(null);
        setCurrentPage(1);
    }, [selectedFilters, allPlants]);

    const filterPlants = (plants) => {
        return plants.filter(plant => {

            if (selectedFilters.plantType.length > 0 && !selectedFilters.plantType.includes(plant.plant_type)) {
               return false;
            }
            if (selectedFilters.soilType.length > 0 && !selectedFilters.soilType.includes(plant.soil_type)) {
                return false;
            }
            if (selectedFilters.sunlight.length > 0) {
                const hasSunlight = selectedFilters.sunlight.some(light => plant[light]);
                if (!hasSunlight) return false;
            }
            if (selectedFilters.habitat.length > 0) {
                const hasHabitat = selectedFilters.habitat.some(habitat => plant[habitat]);
                if (!hasHabitat) return false;
            }
           if (selectedFilters.useCase.length > 0) {
                const hasUseCase = selectedFilters.useCase.some(useCase => plant[use_case]);
                if (!hasUseCase) return false;
            }
            return true;
        });
    };

    const showPlantDetails = (plant) => {
        setLoading(true);
        setSelectedPlant(plant);
        setTimeout(() => {
            plantDetailRef.current?.scrollIntoView({ behavior: "smooth" });
            setLoading(false);
        }, 200);
    };

    const handleViewAll = () => setShowAll(true);
    const handlePaginatedView = () => setShowAll(false);

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterType]: prev[filterType].includes(value)
                ? prev[filterType].filter(item => item !== value)
                : [...prev[filterType], value]
        }));
    };

    const indexOfLastPlant = currentPage * plantsPerPage;
    const indexOfFirstPlant = indexOfLastPlant - plantsPerPage;
    const currentPlants = showAll ? recommendations : recommendations.slice(indexOfFirstPlant, indexOfLastPlant);
    const totalPages = Math.ceil(recommendations.length / plantsPerPage);

    function getGenusFromName(botanicalName) {
        return botanicalName?.split(" ")[0];
    }

    const GITHUB_JSON_BASE = "https://chickens5.github.io/umsl-plant-app";

    function getGenusKey(genus, genusImages) {
        if (!genus || !genusImages || typeof genusImages !== 'object') return null;

        // Convert to lowercase for comparison, then return the actual matching key
        const match = Object.keys(genusImages).find(
            key => key.toLowerCase() === genus.toLowerCase()
        );

        return match || null;
    }



    function getImageFromJson(plant, genusImages) {
        if (plant?.image) return `${GITHUB_JSON_BASE}${plant.image}`;
        const genus = getGenusFromName(plant.botanical_name);
        const genusKey = getGenusKey(genus, genusImages);
        const genusImage = genusImages[genusKey]?.image;
        return genusImage ? `${GITHUB_JSON_BASE}${genusImage}` : `${GITHUB_JSON_BASE}/plantImgs/default.jpg`;
    }

    function getSourceUrl(plant, genusImages) {
        if (plant?.url) return plant.url;
        const genus = getGenusFromName(plant.botanical_name);
        const genusKey = getGenusKey(genus, genusImages);
        return genusImages[genusKey]?.url || "#";
    }

    function getDescription(plant, genusImages) {
        if (plant?.description && plant.description.length > 10) return plant.description;
        const genus = getGenusFromName(plant.botanical_name);
        const genusKey = getGenusKey(genus, genusImages);
        return genusImages[genusKey]?.description || "No description available.";
    }


   const getPlantUseCase = (plant) => {
        return Object.entries(plant)
            .filter(([key, value]) => filterOptions.useCase.includes(key) && value)
            .map(([key]) => useCaseDisplayNames[key]);
    };

    const getPlantHabitats = (plant) => {
        return Object.entries(plant)
            .filter(([key, value]) => filterOptions.habitat.includes(key) && value)
            .map(([key]) => habitatDisplayNames[key]);
    };

    return (
        <div className="page-container" ref={pageContainerRef} onScroll={handleScroll}>
            <div className="app-container">
                <div className="header-container">
                    <h2>Native Plant Recommender</h2>
                </div>
                <h4 className="mini-container">
                    Welcome to our Native Plant Recommender! Find plants perfect for rain gardens,
                    bioswales, and sustainable landscaping.
                </h4>

                <div className="filter-section">
                    <h4 className = 'header-container'>Filter Plants:</h4>
                    <div className="filter-group">
                        <h5 className ='mini-container'>Plant Type:</h5>
                        {filterOptions.plantType.map(plant_type => (
                            <label key={plant_type}>
                               {plant_type === 'Tree' ? 'Tree' : ''}
                                {plant_type === 'Forb' ? 'Forb' : ''}
                                {plant_type === 'Shrub' ? 'Shrub' : ''}
                                {plant_type === 'Grass' ? 'Grass' : ''}
                                {plant_type === 'Fern' ? 'Fern' : ''}
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.plantType.includes(plant_type)}
                                    onChange={() => handleFilterChange('plantType', plant_type)}
                                />
                            </label>
                        ))}
                        <h5 className ='mini-container'>Sunlight:</h5>
                        {filterOptions.sunlight.map(light => (
                            <label key={light}>
                                {light === 'full_sun' ? 'Full Sun' : light === 'part_shade' ? 'Part Shade' : 'Full Shade'}
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.sunlight.includes(light)}
                                    onChange={() => handleFilterChange('sunlight', light)}
                                />
                            </label>
                        ))}
                        <h5 className ='mini-container'>Habitat:</h5>
                        {filterOptions.habitat.map(habitat => (
                            <label key={habitat}>
                                {habitatDisplayNames[habitat]}
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.habitat.includes(habitat)}
                                    onChange={() => handleFilterChange('habitat', habitat)}
                                />
                            </label>
                        ))}

                       <h5 className ='mini-container'>Use Case:</h5>
                        {filterOptions.habitat.map(habitat => (
                            <label key={useCase}>
                                {useCaseDisplayNames[useCase]}
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.useCase.includes(useCase)}
                                    onChange={() => handleFilterChange('useCase', useCase)}
                                />
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {loading && (
                <div className="loading-message">
                    <h4>Loading, please wait :)</h4>
                </div>
            )}

            {recommendations.length > 0 && (
                <div className="content-container">
                    <div className="header-container">
                        <h3>🌾 Recommendations ({recommendations.length})</h3>
                    </div>
                    <ul className='results-list'>
                        {currentPlants.map((plant, index) => (
                            <li className="plant-list" key={index} onClick={() => showPlantDetails(plant)}>
                                <strong>{plant.common_name.toUpperCase()}</strong><br />
                                <strong>{plant.plantType}</strong><br />
                                <em>{plant.botanical_name}</em>
                                <div className="plant-traits">
                                    {plant.rain_garden_wet && <span className="trait-badge wet">Loves Water (Rain garden)</span>}
                                    {plant.bloom_time && <span className="trait-badge pollinator">Pollinator</span>}
                                    {plant.rain_garden_dry && <span className="trait-badge dry">Drought Tolerant (Rain garden slopes)</span>}
                                    {plant.bioswale && <span className="trait-badge bioswale">Flooding Control/Bioswale</span>}
                                    {plant.wildlife_keystone && <span className="trait-badge wildlife">Wildlife Keystone</span>}
                                    {plant.ground_cover && <span className="trait-badge groundcover">Ground Cover</span>}
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="pagbuttons-container">
                        <button onClick={handleViewAll} className="pagination-button">
                            View All Plants
                        </button>
                        {showAll && (
                            <button onClick={handlePaginatedView} className="pagination-button">
                                Show Paginated
                            </button>
                        )}
                        {!showAll && (
                            <>
                                <button className="pagination-button" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                                    ← Prev
                                </button>
                                <p className='pageNum-button'>Page {currentPage} of {totalPages}</p>
                                <button className="pagination-button" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                                    Next →
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}



            {selectedPlant && (
                <div className="results-list">
                    <div className="plant-details">
                        <div className="header-container">
                            <strong ref={plantDetailRef}>Scientific Name</strong><br />
                            <h4>{selectedPlant.botanical_name}</h4>
                            <h2>Common Name:</h2>
                            <strong>{selectedPlant.common_name.toUpperCase()}</strong>
                            <h3>Genus:</h3>
                            <h4>{(selectedPlant.botanical_name.split(' ')[0])}</h4>
                            <strong>Type: {selectedPlant.plant_type || 'Plant'}</strong>
                            </div>
                        <div className="plant-image-container">
                            <img
                                className="plant-image"
                                src={getImageFromJson(selectedPlant, genusImages)}
                                alt={selectedPlant.botanical_name}
                            />
                        </div>
                        <h6>All Pictures and Descriptions are sourced from The MOBOT or MDC.</h6>
                        <div>
                            <button className='pagination-button'>
                                <a href={getSourceUrl(selectedPlant, genusImages)}>Source</a>
                            </button>
                        </div>
                        <div className="plant-traits">
                            <h4 className ='mini-container'>Sustainability Traits:</h4>
                            {selectedPlant.rain_garden_wet && <span className="trait-badge wet">Loves Water</span>}
                            {selectedPlant.bloom_time && <span className="trait-badge pollinator">Pollinator</span>}
                            {selectedPlant.rain_garden_dry && <span className="trait-badge dry">Drought Tolerant</span>}
                            {selectedPlant.bioswale && <span className="trait-badge bioswale">Flooding Control/Bioswale</span>}
                            {selectedPlant.wildlife_keystone && <span className="trait-badge wildlife">Wildlife Keystone</span>}
                            {selectedPlant.ground_cover && <span className="trait-badge groundcover">Ground Cover</span>}
                        </div>
                        <div className={'plant-tag-container'}>
                            <h4 className ='mini-container'>Plant Characteristics:</h4>
                            <p>Soil: {selectedPlant.soil_type === 'moist' ? 'Moist areas' : 'Dry areas'}</p>
                            <p>Sun: {selectedPlant.full_sun ? 'Full sun' : ''}
                                {selectedPlant.part_shade ? ' Part shade' : ''}
                                {selectedPlant.full_shade ? ' Full shade' : ''}</p>
                            <p>Height: {selectedPlant.height}</p>
                            <p>Bloom Time: {selectedPlant.bloom_time}</p>
                            <h4 className ='mini-container'>Recommended Uses:</h4>
                            <p>{getPlantHabitats(selectedPlant).join(', ') || 'None specified'}</p>
                            <section className="plant-details">
                                <h4>Description: </h4>
                                <p>{getDescription(selectedPlant, genusImages) || 'No Description Found'}</p>
                            </section>
                        </div>
                    </div>
                </div>
            )}

            {!isScrolledToBottom && (
                <button
                    className="scroll-to-bottom-button"
                    onClick={scrollToBottom}
                    aria-label="Scroll to bottom"
                >
                    ⬇️ Scroll to Bottom
                </button>
            )}
        </div>
    );
}
