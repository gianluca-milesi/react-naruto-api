import style from "./Card.module.css"

function Card({ item = {} }) {

    const { images, name } = item

    return (
        <div className={style.card}>
            <img src={images ? images[0] : null} className={style.image} />
            <h3>{name}</h3>
        </div>
    )
}

export default Card