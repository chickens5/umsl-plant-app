import React, { useState, useEffect, useRef } from "react"; // add useRef
import './styles/global.css';
import './styles/components.css'


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
    Tilia: "/plantImgs/tilia.jpg",
    Ulmus: "/plantImgs/ulmus.jpg",
    Platanus: "/plantImgs/platanus.jpg",
    Juniperus: "/plantImgs/juniperus.jpg",
    Liquidambar: "/plantImgs/liquidambar.jpg",
    Fraxinus: "/plantImgs/fraxinus.jpg",
    Fagus: "/plantImgs/fagus.jpg",
    Syringa: "/plantImgs/syringa.jpg",
    Rudbeckia: "/plantImgs/rudbeckia.jpg",
    Echinacea: "/plantImgs/echinacea.jpg",
    Hibiscus: "/plantImgs/hibiscus.jpg",
    Verbena: "/plantImgs/verbena.jpg",
    Helianthus: "/plantImgs/helianthus.jpg",
    Iris: "/plantImgs/iris.jpg",
    Coreopsis: "/plantImgs/coreopsis.jpg",
    Agastache: "/plantImgs/agastache.jpg",
    Monarda: "/plantImgs/monarda.jpg",
    Liatris: "/plantImgs/liatris.jpg",
    Cichorium: "/plantImgs/cichorium.jpg",
    Anemone: "/plantImgs/anemone.jpg",
    Penstemon: "/plantImgs/penstemon.jpg",
    Astilbe: "/plantImgs/astilbe.jpg",
    Conoclinium: "/plantImgs/conoclinium.jpg",
    Gaillardia: "/plantImgs/gaillardia.jpg",
    Salvia: "/plantImgs/salvia.jpg",
    Lobelia: "/plantImgs/lobelia.jpg",
    Achillea: "/plantImgs/achillea.jpg",
    Digitalis: "/plantImgs/digitalis.jpg",
    Helenium: "/plantImgs/helenium.jpg",
    Aster: "/plantImgs/aster.jpg",
    Chrysanthemum: "/plantImgs/chrysanthemum.jpg",
    Caltha: "/plantImgs/caltha.jpg",
    Sedum: "/plantImgs/sedum.jpg",
    Gaura: "/plantImgs/gaura.jpg",
    Trifolium: "/plantImgs/trifolium.jpg",
    Clematis: "/plantImgs/clematis.jpg",
    Thymus: "/plantImgs/thymus.jpg",
    Lavandula: "/plantImgs/lavandula.jpg",
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
    Betula: "Betula, or 'Birch', is a thin-leaved deciduous hardwood tree of the genus Betula (/ˈbɛtjʊlə/),[2] in the family Betulaceae, which also includes alders, hazels, and hornbeams. It is closely related to the beech-oak family Fagaceae. The genus Betula contains 30 to 60 known taxa of which 11 are on the IUCN 2011 Red List of Threatened Species. They are typically short-lived pioneer species and are widespread in the Northern Hemisphere, particularly in northern areas of temperate climates and in boreal climates.[3] Birch wood is used for a wide range of purpose",
    Tilia: "'Tilia' is a genus of about 30 species of trees or bushes, native throughout most of the temperate Northern Hemisphere. The tree is known as linden for the European species, and basswood for North American species.[1][2] In Great Britain and Ireland they are commonly called lime trees, although they are not related to the citrus lime. The genus occurs in Europe and eastern North America, but the greatest species diversity is found in Asia. Under the Cronquist classification system, this genus was placed in the family Tiliaceae, but genetic research summarised by the Angiosperm Phylogeny Group has resulted in the incorporation of this genus, and of most of the previous family, into the Malvaceae.",
    Ulmus: "'Elms' are deciduous and semi-deciduous trees comprising the genus Ulmus in the family Ulmaceae. They are distributed over most of the Northern Hemisphere, inhabiting the temperate and tropical-montane regions of North America and Eurasia, presently ranging southward in the Middle East to Lebanon and Israel,[1] and across the Equator in the Far East into Indonesia.[2]",
    Platanus: "'Platanus', is a genus consisting of a small number of tree species native to the Northern Hemisphere. They are the sole living members of the family Platanaceae. They are often known in English as planes or plane trees. A formerly used name that is now rare is plantain tree (not to be confused with other, unrelated, species with the name).[2] Some North American species are called sycamores (especially Platanus occidentalis),[3] although the term is also used for several unrelated species of trees. The genus name Platanus comes from Ancient Greek πλάτανος, which referred to Platanus orientalis.[4]",
    Juniperus: "'Junipers', contain coniferous trees and shrubs in the genus Juniperus (/dʒuːˈnɪpərəs/ joo-NIP-ər-əs)[1] of the cypress family Cupressaceae. Depending on the taxonomy, between 50 and 67 species of junipers are widely distributed throughout the Northern Hemisphere as far south as tropical Africa, including the Arctic, parts of Asia, and Central America.[not in body] The highest-known juniper forest occurs at an altitude of 4,900 metres (16,100 ft) in southeastern Tibet and the northern Himalayas, creating one of the highest tree lines on earth.[2",
    Liquidambar: "Liquidambar, commonly called sweetgum (star gum in the UK), gum, redgum, satin-walnut, styrax or American storax; is the only genus in the flowering plant family Altingiaceae and has 15 species. They were formerly often treated as a part of the Hamamelidaceae. They are native to southeast and east Asia, the eastern Mediterranean and North America. They are decorative deciduous trees that are used in the wood industry and for ornamental purposes.",
    Fraxinus: "Fraxinus, commonly called Ash, is a genus of plants in the olive and lilac family, Oleaceae, and comprises 45–65 species of usually medium-to-large trees, most of which are deciduous trees, although some subtropical species are evergreen trees. The genus is widespread throughout much of Europe, Asia, and North America. North American native ash tree species are a critical food source for North American frogs, as their fallen leaves are particularly suitable for tadpoles to feed upon in ponds (both temporary and permanent), large puddles, and other water bodies.[15] Lack of tannins in the American ash makes their leaves a good food source for the frogs, but also reduces its resistance to the ash borer. Species with higher leaf tannin levels (including maples and non-native ash species) are taking the place of native ash, thanks to their greater resistance to the ash borer. They produce much less suitable food for the tadpoles, resulting in poor survival rates and small frog sizes.[15]\n" +
        "\n" +
        "Ash species native to North America also provide important habitat and food for various other creatures native to North America. This includes the larvae of multiple long-horn beetles, as well as other insects including those in the genus Tropidosteptes, lace bugs, aphids, larvae of gall flies, and caterpillars. Birds are also interested in black, green, and white ash trees. The black ash alone supports wood ducks, wild turkey, cardinals, pine grosbeaks, cedar waxwings, and yellow-bellied sapsuckers, with habitat and food (such as the sap being of interest to the sapsucker) among others. Many mammalian species from meadow voles eating the seeds to white-tailed deer eating the foliage to silver-haired bats nesting will also make use of ash trees.",
    Fagus: "",
    Syringa: "",
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
    const [recommendations, setRecommendations] = useState([]);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const plantsPerPage = 10;
    const plantDetailRef = useRef(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/categorized_plants.json")
            .then((res) => res.json())
            .then((data) => setAllPlants(data))
            .catch(() => setRecommendations([{ common_name: "⚠️ Error loading plant data." }]));
    }, []);

    useEffect(() => {
        setLoading(true);
        const scored = allPlants.map(plant => {
            const score = getSustainabilityScore(plant);
            return { plant, score };
        });

        const filtered = scored.filter(p => p.score > 0).sort((a, b) => b.score - a.score);
        setTimeout(() => setLoading(false), 800); //brief delay for smoothness
        setRecommendations(filtered);
        setSelectedPlant(null);
        setCurrentPage(1);
    }, [selectedSustainability]);

    const getSustainabilityScore = (plant) => {
        const tags = plant.tags || {};
        const sustainabilityTags = tags.sustainability || [];
        const matchCount = selectedSustainability.filter(tag => sustainabilityTags.includes(tag)).length;
        return Math.round(matchCount * 5);
    };

    const showPlantDetails = (plant, score) => {
        setLoading(true);
        setSelectedPlant({ ...plant, score });
        setTimeout(() => {
            plantDetailRef.current?.scrollIntoView({ behavior: "smooth" });
            setLoading(false);
        }, 200);
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
                    native plants by Sustainability category.
                </h4>
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
            </div>

            {selectedPlant && (
                <div className="results-list">
                    <div className="plant-details">
                        <div className="header-container">
                            <strong ref={plantDetailRef}>Scientific Name</strong><br />
                            <h4>{selectedPlant.scientific_name}</h4>
                            <h2>Common Name:</h2>
                            <strong>{selectedPlant.common_name}</strong>
                        </div>
                        <div className="plant-image-container">
                            <img
                                className="plant-image"
                                src={`${process.env.PUBLIC_URL}/plantImgs/${selectedPlant.genus}.jpg` || selectedPlant.genus}/>
                        </div>
                        <section className={'plant-tag-container'}>
                            <h4>Sustainability Tags:</h4>
                            <p>{selectedPlant.tags?.sustainability?.join(", ") || "None"}</p>
                            <h4>Use Case Tags:</h4>
                            <p> {selectedPlant.tags?.use_cases?.join(", ") || "None"}</p>
                            <h4>Sus Score: {
                                "★".repeat(selectedPlant.score || 0) +
                                "☆".repeat(5 - (selectedPlant.score || 0))
                            }</h4>
                        </section>
                    <div>
                            <h3>Family</h3>
                            <h4>{selectedPlant.genus}</h4>
                            <p>{genusDetails[selectedPlant.genus] || selectedPlant.genus}</p>
                    </div>
                    </div>
                </div>
            )}


            {loading && (
                <div className="loading-message">
                    <h4>🌱 Loading, please wait...</h4>
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
