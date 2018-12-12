import React from 'react'
import StarRatingComponent from 'react-star-rating-component';

const ListOrdenes = ({ ordenes, openModalCalificacion, puntuarProducto, puntuarEmpresa }) =>
  (
    <div>
      <table className="tableOrders">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Rut</th>
            <th>Moneda</th>
            <th>Monto</th>
            <th>Estado</th>
          </tr>
        </thead>
        {ordenes != [] &&
          <tbody>
            {ordenes.map((orden) => (
              <tr key={orden.Guid}>
                <td>{orden.FechaString}</td>
                <td>{orden.Rut}</td>
                <td>{orden.TipoMoneda}</td>
                <td>{orden.Precio}</td>
                <td>
                  {orden.NombreEstado != "NULL" && orden.NombreEstado}<span>{(orden.NombreEstado == "Resuelto" && orden.Puntuada != "true") &&
                    <button 
                      className="button-normal-small"
                      onClick={() => openModalCalificacion(orden.Rut, orden.Guid, orden.Productos, orden.EmailCliente)}
                    >
                      Calificar
                    </button>
                  }</span>
                </td>
              </tr>
            ))}
          </tbody>
        }
      </table>
    </div>
  )

export default ListOrdenes