import React from 'react'

const ListEmpresas = ({empresas, irEmpresa, verMasEmpresas}) => 
(
  <div>
    {(empresas != []) && 
     <ul className="wrapper-list-empresas">
     {empresas.map((empresa) => (
       <li 
         className="list-empresas"
         id={empresa.Rut} 
         key={empresa.Rut}
         onClick={() => irEmpresa(empresa.Rut)}
       >
         {empresa.Nombre}
       </li>
     ))} 
   </ul>
    } 
   
    <button className="button-normal" onClick={() => verMasEmpresas()}>Ver mas empresas</button>
  </div> 
)

export default ListEmpresas