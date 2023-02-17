
//variables para la fecha
const $numero = document.querySelector("#numero");
const $mes = document.querySelector("#mes");
const $anio = document.querySelector("#anio");
const $dia = document.querySelector("#dia");


//variables para agregar tareas
const $agregarTarea = document.querySelector("#agregarTarea");
const $nuevaTarea = document.querySelector("#nuevaTarea");
const $ordenarTareas = document.querySelector("#ordenarTareas");
const $tablaDeTareas = document.querySelector("#newTagBoard");
let numeroDeTareas = 0;


const obtenerFecha = () => {
    const fecha = new Date();
    $numero.textContent = fecha.toLocaleString("es",{day:"numeric"});
    $mes.textContent = fecha.toLocaleString("es",{month: "short"});
    $anio.textContent = fecha.toLocaleString("es",{year:"numeric"});
    $dia.textContent = fecha.toLocaleString("es",{weekday:"long"});
    console.log(fecha);
};

obtenerFecha();

$agregarTarea.addEventListener("click",nuevaTarea);
$ordenarTareas.addEventListener("click",ordenarTareasTerminadas);


function nuevaTarea(){
    if(!$nuevaTarea.value){
        console.log("No hay tareas");
        return 
    }

    const tarea = document.createElement("div");
    tarea.classList = `tarea elemento${numeroDeTareas}`;

    const borrar = document.createElement("button");
    borrar.textContent = "X";
    borrar.classList = `botonBorrar elemento${numeroDeTareas}`;

    tarea.textContent = $nuevaTarea.value;
    localStorage.setItem($nuevaTarea.value,"tarea");

    tarea.addEventListener("click",tareaHecha);
    borrar.addEventListener("click",eliminarTarea);
    $tablaDeTareas.prepend(borrar);
    $tablaDeTareas.prepend(tarea);
    

    $nuevaTarea.value = ""
    numeroDeTareas++;
}

function tareaHecha(){
    const tareaHecha = this.textContent;
    console.log(tareaHecha);
   if(this.classList.contains("tarea")){
        this.classList.replace("tarea","hecha");
        localStorage.setItem(tareaHecha,"hecha");

    }else {
        this.classList.replace("hecha","tarea");
        this.classList.add("tarea");
        localStorage.setItem(tareaHecha,"tarea");
    };

};


function eliminarTarea(){
    const clase = "." + this.classList[1];
    const textoABorrar = document.querySelector("div"+clase);
    console.log(textoABorrar.textContent);
    localStorage.removeItem(textoABorrar.textContent);

    const elementos =  document.querySelectorAll(clase);

    elementos.forEach((e)=>{
        e.remove();
    });
};


function ordenarTareasTerminadas(){
    const tareasHechas = document.querySelectorAll(".hecha");

    if(tareasHechas.length === 0){
        console.log("No hay tareas para ordenar");
        return
    }

    tareasHechas.forEach((e)=>{
        const clase = "." + (e.classList[1])
        const botonBorrar = document.querySelector(".botonBorrar"+clase)
        
        $tablaDeTareas.append(e);
        $tablaDeTareas.append(botonBorrar);

    })
};


function cargarLocalStorage(){
    const elementos = Object.keys(localStorage);
    console.log(elementos);

    elementos.forEach((elemento)=>{

        const tarea = document.createElement("div");
        tarea.classList = `${localStorage.getItem(elemento)} elemento${numeroDeTareas}`;
    
        const borrar = document.createElement("button");
        borrar.textContent = "X";
        borrar.classList = `botonBorrar elemento${numeroDeTareas}`;
    
        tarea.textContent = elemento;
    
        tarea.addEventListener("click",tareaHecha);
        borrar.addEventListener("click",eliminarTarea);
        $tablaDeTareas.prepend(borrar);
        $tablaDeTareas.prepend(tarea);
        
        numeroDeTareas++;

    });
    ordenarTareasTerminadas()
}
cargarLocalStorage();

