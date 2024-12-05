import style from "./Main.module.css"
import Card from "../../components/Card/Card.jsx"
import axios from "axios"
import { useState, useEffect } from "react"
import { use } from "react"

const API_BASE_URI = "https://dattebayo-api.onrender.com"

function Main() {

    const [collections, setCollections] = useState([])
    const [selectedCollection, setSelectedCollection] = useState("characters")
    const [search, setSearch] = useState("")
    const [filteredCollection, setFilteredCollection] = useState([])

    //FETCH
    function fetchCollections() {
        axios.get(`${API_BASE_URI}/${selectedCollection}`)
            .then((res) => {
                setCollections(res.data[selectedCollection])
            })
            .catch((err) => {
                console.error(err)
            })
    }
    useEffect(() => {
        fetchCollections()
    }, [selectedCollection])

    //HANDLER
    function handleSelect(event) {
        const value = event.target.value
        setSelectedCollection(value)
        console.log(value)
    }
    function handleSearch(event) {
        const value = event.target.value
        setSearch(value)
        console.log(value)
    }

    //FILTER
    useEffect(() => {
        setFilteredCollection(collections.filter((collection) => {
            return collection.name.toLowerCase().includes(search.toLowerCase())
        }))
    }, [collections, search])


    return (
        <main>
            <section className={style.form_section}>
                <div className="container">
                    <form className="form">
                        <input type="text" placeholder="Cerca" className={style.searchbar} value={search} onChange={handleSearch} />
                        <select name="" id="" className={style.select} value={selectedCollection} onChange={handleSelect}>
                            <option value="">- Seleziona -</option>
                            <option value="characters">Personaggi</option>
                            <option value="clans">Clan</option>
                        </select>
                    </form>
                </div>
            </section>

            <section className="cards">
                <div className="container">
                    <div className="row">
                        {filteredCollection.map((collection) => (
                            <div className="col-3" key={collection.id}>
                                <Card item={collection} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Main