import React, { useState, useEffect } from "react";

const genusImages = {
    Abronia: "/plantImgs/abronia.jpg",
    Acer: "/plantImgs/acer.jpg",
    Quercus: "/plantImgs/quercus.jpg",
    Salix: "/plantImgs/salix.jpg",
    Liriodendron: "/plantImgs/liriodendron.jpg",
    Carya: "/plantImgs/testi.jpg",
    Pinus: "/plantImgs/testi.jpg",
    Betula: "/plantImgs/testi.jpg",
    Tilia: "/plantImgs/testi.jpg",
    Ulmus: "/plantImgs/testi.jpg",
    "Acer saccharum": "/plantImgs/testi.jpg",
    Platanus: "/plantImgs/testi.jpg",
    Juniperus: "/plantImgs/testi.jpg",
    Liquidambar: "/plantImgs/testi.jpg",
    Fraxinus: "/plantImgs/testi.jpg",
    Fagus: "/plantImgs/testi.jpg",
    Syringa: "/plantImgs/testi.jpg",
    Rudbeckia: "/plantImgs/testi.jpg",
    Asclepias: "/plantImgs/asclepias.jpg",
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
    "Echinacea purpurea": "/plantImgs/testi.jpg",
    Conoclinium: "/plantImgs/testi.jpg",
    "Agastache foeniculum": "/plantImgs/testi.jpg",
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
    "Salvia nemorosa": "/plantImgs/testi.jpg",
    "Thymus vulgaris": "/plantImgs/testi.jpg",
};

export default function UMSLPlantRecommender() {
    const [allPlants, setAllPlants] = useState([]);
    const [selectedSustainability, setSelectedSustainability] = useState([]);
    const [selectedUseCase, setSelectedUseCase] = useState("");
    const [mode, setMode] = useState("sustainability");
    const [recommendations, setRecommendations] = useState([]);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        fetch("/categorized_plants.json")
            .then((res) => res.json())
            .then(setAllPlants)
            .catch(() => setRecommendations([{ common_name: "⚠️ Error loading plant data." }]));
    }, []);

    const recommendPlants = () => {
        const scored = allPlants.map((plant) => {
            let score = 0;
            const tags = plant.tags || {};

            if (
                selectedSustainability.length &&
                selectedSustainability.every((tag) => tags.sustainability?.includes(tag))
            )
                score += selectedSustainability.length;

            if (selectedUseCase && tags.use_cases?.includes(selectedUseCase)) score++;

            return { plant, score };
        });

        const filtered = scored.filter((p) => p.score > 0).sort((a, b) => b.score - a.score);
        setRecommendations(showAll ? filtered : filtered.slice(0, 15));
    };

    const showPlantDetails = (plant) => {
        setSelectedPlant(plant);
    };

    return (
        <div className="p-4 max-w-4xl mx-auto font-sans">
            <div className="bg-yellow-400 text-center p-4 rounded-xl shadow-md border-l-8 border-r-8 border-green-600 text-gray-800 text-2xl font-bold">
                🌿 Missouri Native Plant Recommender
                <div className="mt-4 space-x-2">
                    <button onClick={() => setMode("sustainability")} className="bg-green-600 text-white px-3 py-1 rounded">🌱 By Sustainability</button>
                    <button onClick={() => setMode("space")} className="bg-green-600 text-white px-3 py-1 rounded">🌧️ By Native Space</button>
                </div>
            </div>

            {mode === "sustainability" && (
                <div className="mt-4">
                    <label className="block font-bold">Select Plants based on Sustainability Goals:</label>
                    <select
                        multiple
                        size="6"
                        value={selectedSustainability}
                        onChange={(e) =>
                            setSelectedSustainability(Array.from(e.target.selectedOptions, (o) => o.value))
                        }
                        className="w-full p-2 mt-1 border border-gray-300 rounded"
                    >
                        <option value="pollinator">Pollinator</option>
                        <option value="carbon_capture">Carbon Capture</option>
                        <option value="water_capture">Water Capture</option>
                        <option value="erosion_control">Erosion Control</option>
                        <option value="groundcover">Groundcover</option>
                        <option value="deer_resistant">Deer Resistant</option>
                    </select>
                </div>
            )}

            {mode === "space" && (
                <div className="mt-4">
                    <label className="block font-bold">Native Plant Spaces:</label>
                    <select
                        value={selectedUseCase}
                        onChange={(e) => setSelectedUseCase(e.target.value)}
                        className="w-full p-2 mt-1 border border-gray-300 rounded"
                    >
                        <option value="">--</option>
                        <option value="rain_garden">Rain Garden</option>
                        <option value="raised_bed">Raised Bed</option>
                        <option value="rainscape">Rainscape</option>
                        <option value="hydroponic">Hydroponic</option>
                        <option value="woodland_shade">Woodland Shade Garden</option>
                        <option value="prairie_patch">Prairie Patch</option>
                        <option value="pollinator_strip">Pollinator Strip</option>
                    </select>
                </div>
            )}

            <button onClick={recommendPlants} className="mt-4 px-4 py-2 bg-yellow-400 rounded shadow">🌻 Show Recommended Plants</button>

            {selectedPlant && (
                <div className="mt-6 p-4 border border-yellow-400 bg-white rounded shadow">
                    <h3 className="text-xl font-bold">{selectedPlant.common_name}</h3>
                    <h4 className="text-md italic">{selectedPlant.genus}</h4>
                    <div className="mt-2">
                        <img
                            className="rounded border-t-4 border-r-4 border-green-600"
                            src={genusImages[selectedPlant.genus] || "/plantImgs/default-genus.jpg"}
                            alt={`Image of ${selectedPlant.common_name}`}
                        />
                    </div>
                    <div className="mt-2">
                        <strong>Scientific Name:</strong> {selectedPlant.scientific_name}<br />
                        <strong>Sustainability Tags:</strong> {selectedPlant.tags?.sustainability?.join(", ") || "None"}<br />
                        <strong>Use Case Tags:</strong> {selectedPlant.tags?.use_cases?.join(", ") || "None"}<br />
                        <strong>Overall Sustainability Score (Zone 7a):</strong> {selectedPlant.score?.join(", ") || "None"}
                    </div>
                </div>
            )}

            <div className="mt-6">
                <h3 className="text-xl font-bold">🌾 Recommendations</h3>
                <ul className="list-disc pl-5">
                    {recommendations.length === 0 ? (
                        <li>No matching plants found. Try adjusting your selections.</li>
                    ) : (
                        recommendations.map(({ plant }, index) => (
                            <li
                                key={index}
                                className="cursor-pointer mb-2 hover:text-green-600"
                                onClick={() => showPlantDetails(plant)}
                            >
                                <strong>{plant.common_name}</strong><br />
                                <em>{plant.scientific_name}</em>
                            </li>
                        ))
                    )}
                </ul>

                {!showAll && recommendations.length >= 15 && (
                    <button onClick={() => setShowAll(true)} className="mt-4 px-3 py-1 bg-green-600 text-white rounded">
                        Show more plants
                    </button>
                )}
            </div>
        </div>
    );
}
