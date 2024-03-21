/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const Guitar = ({guitar, addToCart}) => {

    const {id, name, image, price, description} = guitar


  return (
    <>
      <div className="col-md-6 col-lg-4 my-4 row align-items-center">
        <div className="col-4">
          <img
            className="img-fluid"
            src={`img/${image}.jpg`}
            alt="imagen guitarra"
          />
        </div>
        <div className="col-8">
          <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
          <p>{description}</p>
          <p className="fw-black text-primary fs-3">${price}</p>
          <button 
            onClick={() => addToCart(guitar)}
            type="button" 
            className="btn btn-dark w-100">
            Agregar al Carrito
          </button>
        </div>
      </div>
    </>
  );
};

export default Guitar;

// Cuando hay argumentos en una funcion como la de handleClick, se debe colocar un callback para que espere a que ocurra el evento. De otra manera se llama la funcion de inmediato

// onClick={() => setCart(prevCart => [...prevCart, guitar])}
// Para agregar elementos al carrito y que no convierta el arreglo en un objeto y tambien para que no sobreescriba los valores previos

// En el callback de setCart esta el state de cart