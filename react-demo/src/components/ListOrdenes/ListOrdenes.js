import React from 'react'
import StarRatingComponent from 'react-star-rating-component';

const ListOrdenes = ({ ordenes, puntuarProducto, puntuarEmpresa }) =>
  (
    <div>
      <table className="addressrelatedwrapper">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Rut Empresa</th>
            <th>Productos</th>
            <th>Estado</th>
            <th>Moneda</th>
            <th>Monto</th>
          </tr>
        </thead>
        {ordenes != [] &&
          <tbody>
            {ordenes.map((orden) => (
              <tr key={orden.Guid}>
                <td>{orden.FechaString}</td>
                <td>{orden.Rut}</td>
                <td>
                  <ul>
                    {orden.Productos.map((producto) => (
                      <li key={producto.ObjectId}>
                        <span>{producto.NombreProducto}</span>-
                      <span>{producto.Cantidad}</span>
                        <span>{!producto.Puntuada &&
                          <StarRatingComponent
                            name={`${orden.Guid}${producto.ObjectId}`}
                            starCount={5}
                            onStarClick={(nextValue) => puntuarProducto(nextValue, orden.Rut, orden.EmailCliente, producto.ObjectId, orden.Guid)}
                          />}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  {orden.NombreEstado}<span>{(orden.NombreEstado == "Resuelto" && orden.Puntuada != true) &&
                    <StarRatingComponent
                      name={`${orden.Guid}${orden.Rut}`}
                      starCount={5}
                      onStarClick={(nextValue) => puntuarEmpresa(nextValue, orden.Rut, orden.Guid)}
                    />
                  }</span>
                </td>
                <td>{orden.TipoMoneda}</td>
                <td>{orden.Precio}</td>
              </tr>
            ))}
          </tbody>
        }
      </table>
    </div>
  )

export default ListOrdenes