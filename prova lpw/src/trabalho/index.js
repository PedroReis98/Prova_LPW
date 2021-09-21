import React, { useState, useEffect} from "react";

import "./styles.css";

function Home() {

  const [CodIBGE, setCodIbge ] = useState('')
  const [municipio, setMunicipio ] = useState('')
  const [estado, setEstado ] = useState('')
  const[ guarda, setGuarda] = useState(()=>{
      const storagedGuarda =  localStorage.getItem('cadguarda:guarda')
      if(storagedGuarda){
        return  JSON.parse(storagedGuarda)
      } else {
        return []
      }
    }
  )

  function handleAddCadastro  (event) {
    
    event.preventDefault();

    const data = {
      id: new Date().getTime(),  
      CodIBGE,
      municipio,
      estado
    }
    if(CodIBGE === '' || estado === '' || municipio === '')
    {
    alert("Prencha o campo vazio !")
    return;
    }
    console.log(data)

    setGuarda ([...guarda, data])
    setCodIbge('')
    setMunicipio('')
    setEstado('')
   
  
  }

  function handleDelete (id) {

    setGuarda(guarda.filter(guarda => guarda.id !== id ))
  }

  useEffect(() =>{
    function saveDate() {
        localStorage.setItem('cadguarda:guarda', JSON.stringify(guarda))
  }
  saveDate()
}, [guarda])

/*useEffect(()=>{
  async function loadData(){
    const storagedGuarda = await localStorage.getItem('cadguarda:guarda')
    if(storagedGuarda){
      setGuarda(JSON.parse(storagedGuarda))
    }
  }
  loadData()
},[])*/

  return (
    <div className="page">
      <form className="cadastro" onSubmit={handleAddCadastro}>
      <input
          name="CodIBGE"
          type="text"
          placeholder="Digite o Código IBGE"
          value= {CodIBGE}
          onChange= {(event) => setCodIbge(event.target.value)}
        />

        <input
          name="Municipio"
          type="text"
          placeholder="Digite seu Municipio"
          value={municipio}
          onChange= {(event) => setMunicipio(event.target.value) }
        />
          <input
          name="Estado"
          type="text"
          placeholder="Digite seu estado"
          value={estado}
          onChange= {(event) => setEstado(event.target.value) }
        />
        <button type="submit">Enviar</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>CodIBGE</th>
            <th>Municipio</th>
            <th>Estado</th>
            <th colSpan={1}>Ações</th>
          </tr>
        </thead>
        <tbody>

          {guarda.map(dados =>(

            <tr key ={dados.id}>
              <td>{dados.CodIBGE}</td>
              <td>{dados.municipio}</td>
              <td>{dados.estado}</td>
            
              <button className= "Excluir"
                      onClick ={()=> handleDelete(dados.id)}
              >

                Exclui

              </button>
            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Home };
