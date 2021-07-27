import React, { useState } from "react";
import Swal from "sweetalert2";

const informacion = [
  {
    clave: "preliminares",
    nombre: "suministro y colocacion de letrero",
    unidad: "pza",
    precio: 3500,
  },
  {
    clave: "preliminares",
    nombre: "trazo y nivelacion de terreno en estructuras",
    unidad: "m2",
    precio: 9,
  },
  {
    clave: "otro",
    nombre: "popo de perro",
    unidad: "m2",
    precio: 0,
  },
  {
    clave: "azotea",
    nombre: "excavacion a cielo abierto",
    unidad: "m3",
    precio: 212,
  },
  {
    clave: "azotea",
    nombre: "retiro de material de excavacion",
    unidad: "m3",
    precio: 296,
  },
  {
    clave: "azotea",
    nombre: "plantilla de concreto hecho en obra",
    unidad: "m2",
    precio: 165,
  },
  {
    clave: "azotea",
    nombre: "zapata corrida de concreto",
    unidad: "m2",
    precio: 854,
  },
  {
    clave: "azotea",
    nombre: "zapata aislada de concreto",
    unidad: "pza",
    precio: 1460,
  },
  {
    clave: "otro",
    nombre: "guirri mau mau",
    unidad: "pza",
    precio: 1460,
  },
  {
    clave: "otro",
    nombre: "pocket pocket",
    unidad: "pza",
    precio: 1460,
  },
];

export const ClavesConcepto = () => {
  const [arrayClaves, setArrayClaves] = useState([]);
  const [arrayProductos, setArrayProductos] = useState([]);

  let initialState = {
    clave: "",
    producto: "",
    descripcion: "",
    unidad: "",
    cantidad: "",
    total: "",
  };

  const [data, setData] = useState(initialState);
  let { clave, producto, descripcion, unidad, cantidad, total } = data;

  const handleCargarProductos = (e) => {
    const opcion = e.target.value;

    setData({
      ...data,
      producto: "",
      cantidad: "",
      total: "",
      descripcion: "",
      unidad: "",
    });

    const names = informacion.map((item) => item.clave);
    console.log(names);
    let myArray = [...new Set(names)];
    setArrayClaves(myArray);
    console.log(myArray);

    const resultado = informacion.filter((item) => item.clave === opcion);
    if (resultado !== undefined) {
      //   const resultadoFinal = resultado.productos;
      console.log(resultado);
      setArrayProductos(resultado);
    }
  };

  // metodo que espera el cambio del SELECT de los productos
  const handleVerificarProducto = (e) => {
    setData({
      ...data,
      cantidad: "",
      total: "",
      descripcion: "",
      unidad: "",
    });
  };

  const handleCargarTotal = (e) => {
    let cantidad = e.target.value;
    let productoFinal = producto;

    const resultado = arrayProductos.find(
      (item) => item.nombre === productoFinal || item.nombre === "otro"
    );
    let res = resultado.precio * cantidad;
    let unidadFinal = resultado.unidad;
    console.log(unidadFinal);
    setData({
      ...data,
      cantidad: cantidad,
      total: res,
      unidad: unidadFinal,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (clave === "" || clave === "-1" || clave === -1) {
      return Swal.fire("Error", "Selecciona una clave y producto", "error");
    }

    if (producto === "") {
      return Swal.fire("Error", "Selecciona una clave y producto", "error");
    }

    console.log(data);
  };

  // return ********************************
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmitForm}>
                <h3> Categoria</h3>
                <div className="form-floating mb-2">
                  <select
                    className="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    name="clave"
                    value={clave}
                    onChange={handleInputChange}
                    onClick={handleCargarProductos}
                  >
                    <option value={-1}> Selecciona tu clave </option>
                    {arrayClaves.map((item, i) => (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="floatingSelect"> Categorias </label>
                </div>

                <h3>Productos</h3>
                <div className="form-floating mb-2">
                  <select
                    className="form-select"
                    id="floatingSelect2"
                    aria-label="Floating label select example"
                    name="producto"
                    value={producto}
                    onChange={handleInputChange}
                    onClick={handleVerificarProducto}
                  >
                    <option value=""> Selecciona tu producto </option>
                    {arrayProductos.map((item, i) => (
                      <option key={i} value={item.nombre}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="floatingSelect2"> Articulos </label>
                </div>

                <h3> Descripción </h3>
                <div className="form-floating mb-2">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput3"
                    placeholder="a"
                    name="descripcion"
                    value={descripcion}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="floatingInput3"> Descripción </label>
                </div>

                <h3> Cantidad </h3>
                <div className="form-floating mb-2">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingInput9"
                    placeholder="a"
                    name="cantidad"
                    value={cantidad}
                    onChange={(e) => {
                      handleInputChange(e);
                      handleCargarTotal(e);
                    }}
                  />
                  <label htmlFor="floatingInput9"> Cantidad </label>
                </div>

                <h3> total </h3>
                <div className="form-floating mb-2">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingInput1"
                    placeholder="a"
                    name="total"
                    value={total}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="floatingInput1"> Total </label>
                </div>

                <h3> Unidad </h3>
                <div className="form-floating mb-2">
                  <input
                    disabled={true}
                    type="text"
                    className="form-control"
                    id="floatingInput3"
                    placeholder="a"
                    name="unidad"
                    value={unidad}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="floatingInput3"> Unidad </label>
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    <i className="far fa-save me-2"></i>
                    <span> Agregar </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* col-md-6 */}
        <div className="col-md-6">
          <h3> hola menu </h3>
        </div>
      </div>
    </>
  );
};
