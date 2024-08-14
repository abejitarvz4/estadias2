import './navbar.css'

export const Navbar=()=>{
    return (
        <nav class="Navbar">
            <div class="navbar-links">
                <a class="iniciobtn" href="/">Inicio</a>
                <a class="graficasbtn"href="/graficas">Graficas</a>
                <a class="productosbtn"href="productos">Productos</a>
                <a class="loginbtn"href="login">Iniciar Sesion</a>
            </div>
        </nav>
    );
}


export default Navbar;