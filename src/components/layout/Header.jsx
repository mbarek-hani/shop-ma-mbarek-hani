import logo from "@/assets/logo.png";

function Header() {
    return (
        <header>
            <img src={logo} alt="shop.ma logo" width={100} />
            <nav>
                <a href="#">Acceuil</a>
                <a href="#">Produits</a>
                <a href="#">Panier</a>
                <a href="#">Contact</a>
            </nav>
        </header>
    )
}

export default Header;