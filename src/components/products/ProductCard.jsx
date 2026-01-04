function ProductCard({name, price, image, inStock, badge = null}) {
    return (
        <div>
            <h4>{name} {badge && <span>{badge}</span>}</h4>
            <img src={image} width={200}/>
            {inStock ? (
                <p>Disponible avec {price}DH</p>
            ): (
                <p>Indisponible</p>
            )}
        </div>
    );
}

export default ProductCard;