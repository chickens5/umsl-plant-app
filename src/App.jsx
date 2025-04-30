import React, { useState, useEffect, useRef } from "react";
import './styles/global.css';
import './styles/components.css';

export default function NativePlantRecommender() {
    const [allPlants, setAllPlants] = useState([]);
    const [genusImages, setGenusImages] = useState({});
    const [showAll, setShowAll] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({
        soilType: [],
        sunlight: [],
        habitat: []
    });
    const [recommendations, setRecommendations] = useState([]);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const plantsPerPage = 10;
    const plantDetailRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
    const pageContainerRef = useRef(null);

    // Filter options based on your plant data structure
    const filterOptions = {
        soilType: ['moist', 'dry'],
        sunlight: ['full_sun', 'part_shade', 'full_shade'],
        habitat: [
            'rain_garden_wet',
            'rain_garden_dry',
            'bioswale',
            'wildlife_keystone',
            'ground_cover'
        ]
    };

    // Map habitat keys to display names
    const habitatDisplayNames = {
        'rain_garden_wet': 'Rain Garden (Wet soil)',
        'rain_garden_dry': 'Rain Garden (Dry soil)',
        'bioswale': 'Bioswale',
        'wildlife_keystone': 'Wildlife/Pollinator Friendly',
        'ground_cover': 'Ground Cover'
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
        if (Object.values(genusImages).length) {
            Object.values(genusImages).forEach((val) => {
                const img = new Image();
                img.src = `${process.env.PUBLIC_URL}/plantImgs/${val.filename}`;
            });
        }
    }, [genusImages]);


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
            // Soil type filter
            if (selectedFilters.soilType.length > 0 && !selectedFilters.soilType.includes(plant.soil_type)) {
                return false;
            }

            // Sunlight filter
            if (selectedFilters.sunlight.length > 0) {
                const hasSunlight = selectedFilters.sunlight.some(light => plant[light]);
                if (!hasSunlight) return false;
            }

            // Habitat filter
            if (selectedFilters.habitat.length > 0) {
                const hasHabitat = selectedFilters.habitat.some(habitat => plant[habitat]);
                if (!hasHabitat) return false;
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

    const handleViewAll = () => {
        setShowAll(true);
        setCurrentPage(1);
    };

    const handlePaginatedView = () => {
        setShowAll(false);
        setCurrentPage(1);
    };

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
        return botanicalName?.split(" ")[0].toLowerCase();
    }

// 🟡 Update this to your GitHub raw file base path:
    const GITHUB_IMAGE_BASE = "https://github.com/chickens5/umsl-plant-app/tree/main/public/plantImgs";

    function getImageFromJson(plant, genusImages) {
        // Prefer full image path from plant_data
        if (plant?.image) return `${GITHUB_IMAGE_BASE}${plant.image}`;

        const genus = getGenusFromName(plant.botanical_name);
        const genusImage = genusImages[genus]?.image;

        return genusImage
            ? `${GITHUB_IMAGE_BASE}${genusImage}`
            : `${GITHUB_IMAGE_BASE}/plantImgs/default.jpg`;
    }

    function getSourceUrl(plant, genusImages) {
        if (plant?.url) return plant.url;

        const genus = getGenusFromName(plant.botanical_name);
        return genusImages[genus]?.url || "#";
    }

    function getDescription(plant, genusImages) {
        if (plant?.description) return plant.description;

        const genus = getGenusFromName(plant.botanical_name);
        return genusImages[genus]?.description || "No description available.";
    }


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

                {/* Filter Section */}
                <div className="filter-section">
                    <h4 className = 'header-container'>Filter Plants:</h4>

                    <div className="filter-group">
                        <h5 className ='mini-container'>Soil Type:</h5>
                        {filterOptions.soilType.map(type => (
                            <label key={type}>
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.soilType.includes(type)}
                                    onChange={() => handleFilterChange('soilType', type)}
                                />
                                {type === 'moist' ? 'Moist Areas' : 'Dry Areas'}
                            </label>
                        ))}
                    </div>

                    <div className="filter-group">
                        <h5>Sunlight:</h5>
                        {filterOptions.sunlight.map(light => (
                            <label key={light}>
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.sunlight.includes(light)}
                                    onChange={() => handleFilterChange('sunlight', light)}
                                />
                                {light === 'full_sun' ? 'Full Sun' :
                                    light === 'part_shade' ? 'Part Shade' : 'Full Shade'}
                            </label>
                        ))}
                    </div>

                    <div className="filter-group">
                        <h5 className ='mini-container'>Habitat/Use:</h5>
                        {filterOptions.habitat.map(habitat => (
                            <label key={habitat}>
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.habitat.includes(habitat)}
                                    onChange={() => handleFilterChange('habitat', habitat)}
                                />
                                {habitatDisplayNames[habitat]}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {selectedPlant && (
                <div className="results-list">
                    <div className="plant-details">
                        <div className="header-container">
                            <strong ref={plantDetailRef}>Scientific Name</strong><br />
                            <h4>{selectedPlant.botanical_name}</h4>
                            <h2>Common Name:</h2>
                            <strong>{selectedPlant.common_name.toUpperCase()}</strong>
                        </div>
                        <section className={'plant-tag-container'}>
                            <h4 className ='mini-container'>Plant Characteristics:</h4>
                            <p>Soil: {selectedPlant.soil_type === 'moist' ? 'Moist areas' : 'Dry areas'}</p>
                            <p>Sun: {selectedPlant.full_sun ? 'Full sun' : ''}
                                {selectedPlant.part_shade ? ' Part shade' : ''}
                                {selectedPlant.full_shade ? ' Full shade' : ''}</p>
                            <p>Height: {selectedPlant.height}</p>
                            <p>Bloom Time: {selectedPlant.bloom_time}</p>
                            <h4 className ='mini-container'>Recommended Uses:</h4>
                            <p>{getPlantHabitats(selectedPlant).join(', ') || 'None specified'}</p>
                        </section>
                        <div>
                            <h3>Genus:</h3>
                            <h4>{(selectedPlant.botanical_name)}</h4>
                            <div className="plant-image-container">
                                <img
                                    className="plant-image"
                                    src={getImageFromJson(selectedPlant.botanical_name, genusImages)}
                                    alt={selectedPlant.botanical_name}
                                />




                            </div>
                            <button className='pagination-button'>
                                <a
                                    href={getSourceUrl(selectedPlant.botanical_name, genusImages, selectedPlant)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Source
                                </a>

                            </button>

                            <section className="plant-details">
                                <p>
                                    {getDescription(selectedPlant.botanical_name, genusImages, selectedPlant)}
                                </p>

                            </section>

                            <section className="plant-details">
                                <p>{genusImages[getGenusFromName(selectedPlant.botanical_name)]?.description || selectedPlant.description ||
                                            selectedPlant.description || "No description available."}</p>
                                <div className="plant-traits">
                                    <h4>Sustainability Traits:</h4>
                                    {selectedPlant.rain_garden_wet && <span className="trait-badge wet">Loves Water</span>}
                                    {selectedPlant.rain_garden_dry && <span className="trait-badge dry">Drought Tolerant</span>}
                                    {selectedPlant.bioswale && <span className="trait-badge bioswale">Flooding Control/Bioswale</span>}
                                    {selectedPlant.wildlife_keystone && <span className="trait-badge wildlife">Wildlife/Pollinator</span>}
                                    {selectedPlant.ground_cover && <span className="trait-badge groundcover">Ground Cover</span>}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            )}

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
                                <em>{plant.botanical_name}</em>
                                <div className="plant-traits">
                                    {plant.rain_garden_wet && <span className="trait-badge wet">Loves Water</span>}
                                    {plant.rain_garden_dry && <span className="trait-badge dry">Drought Tolerant</span>}
                                    {plant.bioswale && <span className="trait-badge bioswale">Flooding Control/Bioswale</span>}
                                    {plant.wildlife_keystone && <span className="trait-badge wildlife">Wildlife/Pollinator</span>}
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