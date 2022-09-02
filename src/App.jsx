import React from "react";
import shortid from "shortid";

function App() {

  const [tarea, setTarea] = React.useState("")//Sera string porque lo vincularemos con el input del form quer ecibira tarea
  const [tareas, setTareas] = React.useState([])
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState("")
  const [error, setError] = React.useState(null) //nos servira para evaluar los errores 

 const agregarTarea = e => {
  e.preventDefault()
  if(!tarea.trim()){
    console.log('Campo vacio')
    setError("Campo vacio, escriba algo por favor")
    return
  }
  setTareas([
    ...tareas,
    {id: shortid.generate(), nombreTarea: tarea}
  ])
  setTarea("")
  setError(null)

}

const eliminarTarea = id => {//hay que recorrer el array
  const arrayFiltrado = tareas.filter(item => item.id !== id )//filtramos las tareas que no compartan id
  setTareas(arrayFiltrado) //no hace falta poner corchetes ya que arrayFiltrado ya es un array.
}

const editarFormulario = item => {
  setModoEdicion(true)
  setTarea(item.nombreTarea) //Hara que cuando apretemos editar, se pasara el texto al input de editarTarea
  setId(item.id)
}

const editarTarea = e => {
  e.preventDefault()
  if(!tarea.trim()){
    console.log('Campo vacio')
    setError("Campo vacio, escriba algo por favor")
    return
  }
  const arrayEditado = tareas.map(item => item.id === id ? {id, nombreTarea: tarea} : item)
  setTareas(arrayEditado)
  setModoEdicion(false)
  setTarea("") 
  setId("")
  setError(null)
}

  return (
    <div className="container mt-5">
  <h1 className="text-center">CRUD APP</h1>
  <hr />
  <div className="row">
    <div className="col-8">
      <h4 className="text-center">
      Lista de Tareas
      </h4>
      <ul className="list-group">
        {
          //Agregamos validaciones para cuando no hayan tareas
          tareas.length === 0 ? (
            <li className="list-group-item">No hay tareas</li>
          ) : (
              tareas.map(item => (
              <li className="list-group-item" key={item.id}>
              <span className="lead">{item.nombreTarea}</span>
              <button 
              className="btn btn-danger btn-sm float-end mx-2"
              onClick={()=> eliminarTarea(item.id)}>
                Eliminar
                </button>
              <button 
              className="btn btn-warning btn-sm float-end"
              onClick={()=> editarFormulario(item)}>
                Editar
                </button>
            </li>
            ))
          )           
        }
      </ul>
    </div>
    <div className="col-4">
      <h4 className="text-center">
        {
          modoEdicion ? 'Editar tarea' : 'Agregar tarea' //cuando es true, editamos tarea, cuando estemos en falso, estamos en agregar tarea, para eso usamos los setMod!! 
        }
      </h4>
      <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
        {
          error ? 
          <span className="text-danger">{error}</span> 
          :
          null
        }
        <input 
        type="text" 
        className="form-control mb-2" 
        onChange={e => setTarea(e.target.value)} 
        placeholder="Ingrese tarea"
        value={tarea}/>
        {
          modoEdicion ? (
          <button className="btn btn-warning btn-block col-12" type="submit">Editar</button>
          ) //verdadero modoEdicion
          :
          (<button className="btn btn-dark btn-block col-12" type="submit">Agregar</button>) //falso modoEdicion
        } 
        
      </form>
    </div>
  </div>
 
</div>
  );
}

export default App;
