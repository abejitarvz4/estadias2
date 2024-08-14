import './App.css';
import React, { useState, useEffect } from "react";
import { db, crearProducto, obtenerProductos, actualizarProducto, eliminarProducto } from "./firebase/firebase";

function App() {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [productos, setProductos] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const productosArray = await obtenerProductos(db);
    setProductos(productosArray);
  };

  const handleSubmit = async () => {
    try {
      if (editingProductId) {
        await actualizarProducto(db, editingProductId, nombre, cantidad, precio);
        setEditingProductId(null);
      } else {
        await crearProducto(db, nombre, cantidad, precio);
      }
      setNombre("");
      setCantidad("");
      setPrecio("");
      fetchProductos();
      alert("Producto guardado exitosamente");
    } catch (error) {
      console.error("Error al guardar el producto: ", error);
      alert("Hubo un error al guardar el producto");
    }
  };

  const handleEdit = (product) => {
    setNombre(product.nombre);
    setCantidad(product.cantidad);
    setPrecio(product.precio);
    setEditingProductId(product.id);
  };

  const handleDelete = async (id) => {
    try {
      await eliminarProducto(db, id);
      fetchProductos();
      alert("Producto eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar el producto: ", error);
      alert("Hubo un error al eliminar el producto");
    }
  };

  return (
    <>
      <div className="navbar">
        <a href="/" className="active">Inicio</a>
        <a href="../graficas.jsx">Gráficas</a>
        <a href="../productos.jsx">Productos</a>
      </div>
      <div className="container">
        <div className='agregarProducto'>
          <h3>{editingProductId ? "Editar Producto" : "Agregar Producto"}</h3>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          /> <br />
          <input
            type="number"
            placeholder="Cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          /> <br />
          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          /> <br />
          <button onClick={handleSubmit}>{editingProductId ? "Actualizar" : "Agregar"}</button>
        </div>
        <div className='listaProductos'>
          <h3>Lista de Productos</h3>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(product => (
                <tr key={product.id}>
                  <td className='nombre'>{product.nombre}</td>
                  <td className="cantidad">{product.cantidad}</td> {/* Aplica la clase cantidad */}
                  <td>${product.precio}</td>
                  <td className='botones'>
                    <button onClick={() => handleEdit(product)}>Editar</button>
                    <button onClick={() => handleDelete(product.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
