import React, { useState, useEffect, useRef } from "react"; // add useRef
import './styles/global.css';


const genusImages = {
    Abronia: "/plantImgs/abronia.jpg",
    Acer: "/plantImgs/acer.jpg",
    Quercus: "/plantImgs/quercus.jpg",
    Salix: "/plantImgs/salix.jpg",
    Liriodendron: "/plantImgs/liriodendron.jpg",
    Asclepias: "/plantImgs/asclepias.jpg",
    Carya: "/plantImgs/testi.jpg",
    Pinus: "/plantImgs/testi.jpg",
    Betula: "/plantImgs/testi.jpg",
    Tilia: "/plantImgs/testi.jpg",
    Ulmus: "/plantImgs/testi.jpg",
    Platanus: "/plantImgs/testi.jpg",
    Juniperus: "/plantImgs/testi.jpg",
    Liquidambar: "/plantImgs/testi.jpg",
    Fraxinus: "/plantImgs/testi.jpg",
    Fagus: "/plantImgs/testi.jpg",
    Syringa: "/plantImgs/testi.jpg",
    Rudbeckia: "/plantImgs/testi.jpg",
    Echinacea: "/plantImgs/testi.jpg",
    Hibiscus: "/plantImgs/testi.jpg",
    Verbena: "/plantImgs/testi.jpg",
    Helianthus: "/plantImgs/testi.jpg",
    Iris: "/plantImgs/testi.jpg",
    Coreopsis: "/plantImgs/testi.jpg",
    Agastache: "/plantImgs/testi.jpg",
    Monarda: "/plantImgs/testi.jpg",
    Liatris: "/plantImgs/testi.jpg",
    Cichorium: "/plantImgs/testi.jpg",
    Anemone: "/plantImgs/testi.jpg",
    Penstemon: "/plantImgs/testi.jpg",
    Astilbe: "/plantImgs/testi.jpg",
    Conoclinium: "/plantImgs/testi.jpg",
    Gaillardia: "/plantImgs/testi.jpg",
    Salvia: "/plantImgs/testi.jpg",
    Lobelia: "/plantImgs/testi.jpg",
    Achillea: "/plantImgs/testi.jpg",
    Digitalis: "/plantImgs/testi.jpg",
    Helenium: "/plantImgs/testi.jpg",
    Aster: "/plantImgs/testi.jpg",
    Chrysanthemum: "/plantImgs/testi.jpg",
    Caltha: "/plantImgs/testi.jpg",
    Sedum: "/plantImgs/testi.jpg",
    Gaura: "/plantImgs/testi.jpg",
    Trifolium: "/plantImgs/testi.jpg",
    Clematis: "/plantImgs/testi.jpg",
    Thymus: "/plantImgs/testi.jpg",
    Lavandula: "/plantImgs/testi.jpg",
};

export default function UMSLPlantRecommender() {
    const [allPlants, setAllPlants] = useState([]);
    const [selectedSustainability, setSelectedSustainability] = useState([]);
    const [selectedUseCase, setSelectedUseCase] = useState("");
    const [mode, setMode] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const plantDetailRef = useRef(null); // add this in your component function


    useEffect(() => {
        fetch("/categorized_plants.json")
            .then((res) => res.json())
            .then(setAllPlants)
            .catch(() =>
                setRecommendations([{ common_name: "⚠️ Error loading plant data." }])
            );
    }, []);

    useEffect(() => {
        setRecommendations([]);
        setSelectedPlant(null);
        setShowAll(false);
    }, [selectedSustainability, selectedUseCase, mode]);

    const recommendPlants = () => {
        const scored = allPlants.map((plant) => {
            let sus_case_score = 0;
            let use_case_score = 0;
            let score = 0;
            const tags = plant.tags || {};

            if (
                selectedSustainability.length || selectedUseCase.length &&
                selectedSustainability.every((tag) || selectedUseCase.every((tag) =>
                    tags.sustainability?.includes(tag)
                )
            ) ){sus_case_score += selectedSustainability.length;}
            {use_case_score += selectedUseCase.length;}
            {score = use_case_score+sus_case_score;}

            return { plant, score };
        });

        const filtered = scored
            .filter((p) => p.score > 0)
            .sort((a, b) => b.score - a.score);
        setRecommendations(showAll ? filtered : filtered.slice(0, 15));
    };


    const showPlantDetails = (plant) => {
        setSelectedPlant(plant);
        setTimeout(() => {
            plantDetailRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50); // slight delay ensures render happens first
    };



    return (
        <div className="page-container">
            <div className="header-container">
                <h2>Missouri Native Plant Recommender</h2>
            </div>

            <div className="content-container">
                <h4 className="mini-container">
                    Welcome to UMSL Sustainability's Native Plant Recommender! Pick out
                    native plants by Sustainability category or Space.
                </h4>
                <section className="nav-links">
                    <button onClick={() => setMode("sustainability")} className="btn">
                        🌱 By Sustainability
                    </button>
                    <button onClick={() => setMode("space")} className="btn">
                        🌧️ By Native Space
                    </button>
                </section>
            </div>

            {mode === "sustainability" && (
                <div className="header-container">
                    <h4>Select Plants based on Sustainability Goals:</h4>
                    <select
                        className="content-container"
                        multiple
                        size="6"
                        value={selectedSustainability}
                        onChange={(e) =>
                            setSelectedSustainability(
                                Array.from(e.target.selectedOptions, (o) => o.value)
                            )
                        }
                    >
                        <option value="Pollinator">Pollinator</option>
                        <option value="Carbon Capture">Carbon Capture</option>
                        <option value="Water Capture">Water Capture</option>
                        <option value="Erosion Control">Erosion Control</option>
                        <option value="Groundcover">Groundcover</option>
                        <option value="Deer Resistant">Deer Resistant</option>
                    </select>
                </div>
            )}

            {mode === "space" && (
                <div className="header-container">
                    <h4>Select Native Plants based on Space Type:</h4>
                    <select
                        value={selectedUseCase}
                        onChange={(e) => setSelectedUseCase(e.target.value)}
                        size="6"
                        className="content-container"
                    >
                        <option value="">--</option>
                        <option value="Rain Garden">Rain Garden</option>
                        <option value="Raised Bed">Raised Bed</option>
                        <option value="Rainscape">Rainscape</option>
                        <option value="Woodland Shade">Woodland Shade Garden</option>
                        <option value="Prairie Patch">Prairie Patch</option>
                        <option value="Pollinator Strip">Pollinator Strip</option>
                    </select>
                </div>
            )}

            {(mode === "sustainability" && selectedSustainability.length) ||
            (mode === "space" && selectedUseCase) ? (
                <button onClick={recommendPlants} ref={plantDetailRef} className="btn">
                    🌻 Show Recommended Plants
                </button>
            ) : null}

            {selectedPlant && (
                <div className="content-container">
                    <div className="header-container">
                        <h2>Common Name:</h2>
                        <h4>{selectedPlant.common_name.toUpperCase()}</h4>
                        <img
                            className="plant-image-container"
                            src={
                                genusImages[selectedPlant.genus] ||
                                "/plantImgs/default-genus.jpg"
                            }
                            alt={`Image of ${selectedPlant.common_name}`}
                        />
                        <h4>Family: {selectedPlant.genus}</h4>
                    </div>
                    <section className={'mini-container'}>
                    <strong>Scientific Name:</strong> {selectedPlant.scientific_name}<br />
                    <strong>Sustainability Tags:</strong> {selectedPlant.tags?.sustainability?.join(", ") || "None"}<br />
                    <strong>Use Case Tags:</strong> {selectedPlant.tags?.use_cases?.join(", ") || "None"}<br />
                    <strong>Overall Sustainability Score (Zone 7a):</strong> {selectedPlant.getUse?.join(", ") || "None"}
                    </section>
                </div>
            )}

            {recommendations.length > 0 && (
                <div className="page-container">
                    <div className="header-container">
                        <h3>🌾 Recommendations</h3>
                    </div>
                    <ul className ='results-list'>
                        {recommendations.map(({ plant }, index) => (
                            <li className ="plant-details"
                                key={index}

                                onClick={() => showPlantDetails(plant)}
                            >
                                <strong>{plant.common_name.toUpperCase()}</strong><br />
                                <em>{plant.scientific_name}</em>
                            </li>
                        ))}
                    </ul>
                    {!showAll && recommendations.length >= 15 && (
                        <button
                            onClick={() => setShowAll(true)}
                            className="btn"
                        >
                            Show more plants
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
