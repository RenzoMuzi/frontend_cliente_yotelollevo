import React from 'react'

const LoginNormal = () =>
    (
        <form>
            <label>Email de Usuario</label>
            <br></br>
            <input 
                placeholder="email" 
                type="email"
            />
            <br></br>
            <label>Clave de Usuario</label>
            <br></br>
            <input 
                placeholder="clave"
                type="password"
            />
            <br></br>
            <button type="submit">Ingresar</button>
        </form>
    )

export default LoginNormal