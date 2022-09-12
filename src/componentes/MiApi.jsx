import { useState, useEffect } from "react";
import React from "react";


function MiApi() {



const [listaFarmacias, setlistaFarmacias] = useState([]);
const [search, setSearch] = useState ("")


useEffect(() => {
consultarInformacion();
}, []);

	const consultarInformacion = async () => {
		const url = 'http://farmanet.minsal.cl/index.php/ws/getLocalesTurnos';
		const response = await fetch(url);
		const data = await response.json();
		setlistaFarmacias([...listaFarmacias,...data]);

	}
	

	const searcher = (e) => {
	setSearch(e.target.value)
	
}
let results = []
if(!search){
	results = listaFarmacias
}
else{
	results = listaFarmacias.filter( (dato) =>
	dato.local_nombre.toLowerCase().includes(search.toLocaleLowerCase())
)

}
return (
	
	<div className="tabla">
		 <input value={search} onChange={searcher} type="text" placeholder='Bucador' className='form-control'/>
        <table >
            <thead>
                <tr >
                    <th>FARMACIAS</th>
                    <th>COMUNAS</th>
                </tr>
            </thead>
            <tbody >
                { results.map( (f) => (
                    <tr key={f.id}>
                        <td>{f.local_nombre}</td>
                        <td>{f.comuna_nombre}</td>
                    </tr>                    
                ))}
            </tbody>
        </table>
	
	</div>
	);
}


export default MiApi;