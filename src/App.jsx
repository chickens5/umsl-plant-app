import React, { useState, useEffect, useRef } from "react"; // add useRef
import './styles/global.css';


const genusImages = {
    Abronia: "/plantImgs/abronia.jpg",
    Acer: "/plantImgs/acer.jpg",
    Quercus: "/plantImgs/quercus.jpg",
    Salix: "/plantImgs/salix.jpg",
    Liriodendron: "/plantImgs/liriodendron.jpg",
    Asclepias: "/plantImgs/asclepias.jpg",
    Carya: "/plantImgs/carya.jpg",
    Pinus: "/plantImgs/pinus.jpg",
    Betula: "/plantImgs/betula.jpg",
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

const genusDetails = {

    Abronia: "t ",
    Acer: "t ",
    Quercus: "t ",
    Salix: "t ",
    Liriodendron: " t",
    Asclepias: "Asclepias is a genus of herbaceous, perennial, flowering plants known as milkweeds, named for their latex, a milky substance containing cardiac glycosides termed cardenolides, exuded where cells are damaged.[4][5][6] Most species are toxic to humans and many other species, primarily due to the presence of cardenolides. However, as with many such plants, some species feed upon milkweed leaves or the nectar from their flowers. A noteworthy feeder on milkweeds is the monarch butterfly, which uses and requires certain milkweeds as host plants for its larvae.",
    Carya: "Hickory is a common name for trees composing the genus Carya, which includes 19 species accepted by Plants of the World Online.[3] The name \"hickory\" derives from a Native American word in an Algonquian language (perhaps Powhatan). It is a shortening of pockerchicory, pocohicora, or a similar word, which may be the name for the hickory tree's nut, or may be a milky drink made from such nuts.[4] The genus name Carya is Ancient Greek: κάρυον, káryon, meaning \"nut\".",
    Pinus: "Pine Family is everywhere.",
    Betula: "A birch is a thin-leaved deciduous hardwood tree of the genus Betula (/ˈbɛtjʊlə/),[2] in the family Betulaceae, which also includes alders, hazels, and hornbeams. It is closely related to the beech-oak family Fagaceae. The genus Betula contains 30 to 60 known taxa of which 11 are on the IUCN 2011 Red List of Threatened Species. They are typically short-lived pioneer species and are widespread in the Northern Hemisphere, particularly in northern areas of temperate climates and in boreal climates.[3] Birch wood is used for a wide range of purpose",
    Tilia: "t ",
};
    /*Ulmus: "/ "/testi.jpg",
    Platanus: "/ "/testi.jpg",
    Juniperus: "/ "/testi.jpg",
    Liquidambar: "/ "/testi.jpg",
    Fraxinus: "/ "/testi.jpg",
    Fagus: "/ "/testi.jpg",
    Syringa: "/ "/testi.jpg",
    Rudbeckia: "/ "/testi.jpg",
    Echinacea: "/ "/testi.jpg",
    Hibiscus: "/ "/testi.jpg",
    Verbena: "/ "/testi.jpg",
    Helianthus: "/ "/testi.jpg",
    Iris: "/ "/testi.jpg",
    Coreopsis: "/ "/testi.jpg",
    Agastache: "/ "/testi.jpg",
    Monarda: "/ "/testi.jpg",
    Liatris: "/ "/testi.jpg",
    Cichorium: "/ "/testi.jpg",
    Anemone: "/ "/testi.jpg",
    Penstemon: "/ "/testi.jpg",
    Astilbe: "/ "/testi.jpg",
    Conoclinium: "/ "/testi.jpg",
    Gaillardia: "/ "/testi.jpg",
    Salvia: "/ "/testi.jpg",
    Lobelia: "/ "/testi.jpg",
    Achillea: "/ "/testi.jpg",
    Digitalis: ",
    Helenium: "",
    Aster: "",
    Chrysanthemum: "",
    Caltha: ",
    Sedum: ",
    Gaura: "",
    Trifolium: "",
    Clematis: "",
    Thymus: "",
    Lavandula: "",*/

export default function UMSLPlantRecommender() {
    const [allPlants, setAllPlants] = useState([]);
    const [selectedSustainability, setSelectedSustainability] = useState([]);
    const [selectedUseCase, setSelectedUseCase] = useState("");
    const [mode, setMode] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const plantsPerPage = 10;
    const plantDetailRef = useRef(null);

    useEffect(() => {
        fetch("/categorized_plants.json")
            .then((res) => res.json())
            .then((data) => setAllPlants(data))
            .catch(() => setRecommendations([{ common_name: "⚠️ Error loading plant data." }]));
    }, []);

    useEffect(() => {
        setRecommendations([]);
        setSelectedPlant(null);
        setCurrentPage(1);
    }, [selectedSustainability, selectedUseCase, mode]);

    const getSustainabilityScore = (plant) => {
        const tags = plant.tags || {};
        const sustainabilityTags = tags.sustainability || [];
        const matchCount = selectedSustainability.filter(tag => sustainabilityTags.includes(tag)).length;
        return Math.round(matchCount * 5);
    };

    const recommendPlants = () => {
        const scored = allPlants.map(plant => {
            const score = getSustainabilityScore(plant);
            return { plant, score };
        });

        const filtered = scored.filter(p => p.score > 0).sort((a, b) => b.score - a.score);
        setRecommendations(filtered);
        setCurrentPage(1);
    };

    const showPlantDetails = (plant, score) => {
        setSelectedPlant({ ...plant, score });
        setTimeout(() => plantDetailRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    };

    const indexOfLastPlant = currentPage * plantsPerPage;
    const indexOfFirstPlant = indexOfLastPlant - plantsPerPage;
    const currentPlants = recommendations.slice(indexOfFirstPlant, indexOfLastPlant);
    const totalPages = Math.ceil(recommendations.length / plantsPerPage);



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
                <div className="results-list">
                    <div className="plant-details">
                    <div className="header-container">
                        <strong>Scientific Name</strong><br />
                        <h4>{selectedPlant.scientific_name}</h4>
                        <h2>Common Name:</h2>
                        <strong>{selectedPlant.common_name}</strong>
                    </div>
                        <section className={'mini-container'}>
                            <strong>Sustainability Tags:</strong> {selectedPlant.tags?.sustainability?.join(", ") || "None"}<br />
                            <strong>Use Case Tags:</strong> {selectedPlant.tags?.use_cases?.join(", ") || "None"}<br />
                            <strong>Sus Score: {
                                "★".repeat(selectedPlant.score || 0) +
                                "☆".repeat(5 - (selectedPlant.score || 0))
                            }</strong><br />
                        </section>
                        <div className ="plant-image-container">
                            <strong>Family</strong>
                            <h4>{selectedPlant.genus}</h4>
                        <img
                            className="plant-image"
                            src={
                                genusImages[selectedPlant.genus] ||
                                "/plantImgs/default-genus.jpg"
                            }
                            alt={`Image of ${selectedPlant.common_name}`}
                        />
                        <h6>{genusDetails[selectedPlant.genus] || selectedPlant.genus}</h6>
                        </div>
                </div>
                </div>
            )}

            {recommendations.length > 0 && (
                <div className="page-container">
                    <div className="header-container">
                        <h3>🌾 Recommendations</h3>
                    </div>
                    <ul className='results-list'>
                        {currentPlants.map(({ plant, score }, index) => (
                            <li className="plant-list" key={index} onClick={() => showPlantDetails(plant, score)}>
                                <strong>{plant.common_name.toUpperCase()}</strong><br />
                                <em>{plant.scientific_name}</em>
                            </li>
                        ))}
                    </ul>
                    <div className="pagination-buttons">
                        <button className="btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                            ← Prev
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button className="btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                            Next →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
