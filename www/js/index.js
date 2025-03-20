document.addEventListener('deviceready', function() {
  alert("🔵 Dispositivo listo");
  console.log("🔵 Dispositivo listo");

  try {
      var db = window.sqlitePlugin.openDatabase({ 
          name: 'mydb.db', 
          location: '2' 
      }, function(db) {
          alert("🟢 Base de datos abierta correctamente");
          console.log("🟢 Base de datos abierta correctamente");

          db.transaction(function(tx) {
              alert("🟡 Intentando crear la tabla...");
              console.log("🟡 Intentando crear la tabla...");

              tx.executeSql(
                  'CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, nombre TEXT)',
                  [],
                  function(tx, res) {
                      alert("✅ Tabla creada correctamente");
                      console.log("✅ Tabla creada correctamente");
                  },
                  function(tx, error) {
                      alert("❌ Error al crear la tabla: " + JSON.stringify(error));
                      console.error("❌ Error al crear la tabla: ", JSON.stringify(error));
                  }
              );
          });

      }, function(error) {
          alert("❌ Error al abrir la base de datos: " + JSON.stringify(error));
          console.error("❌ Error al abrir la base de datos: ", JSON.stringify(error));
      });

  } catch (e) {
      alert("❌ Error inesperado en el código: " + e.message);
      console.error("❌ Error inesperado en el código: ", e);
  }
});

// Agregamos una prueba de `setTimeout` para ver si algo se ejecuta después de 3 segundos
setTimeout(function() {
  alert("🔴 Si ves esto, al menos el script está corriendo.");
  console.log("🔴 Si ves esto, al menos el script está corriendo.");
}, 3000);
   

// Secciones:
const objModal = document.getElementById("miModal"); // Ventana emergente
const sec = document.getElementById("seccion"); // Sección de tareas
const contenedor = document.getElementById("contenedor");

// Inputs:
const objTituloTarea = document.getElementById("tituloTarea"); // Título de la tarea
const objContenidoTarea = document.getElementById("contenidoTarea"); // Contenido de la tarea

// Botones:
const btnClose = document.getElementById("cerrarModal"); // Cerrar modal
const addTarea = document.getElementById("agregarTarea"); // Agregar tarea
const btnTarea = document.getElementById("iconoTarea"); // Abrir formulario

// Eventos para abrir y cerrar modal
btnTarea.addEventListener("click", function () {
  objModal.style.display = "block";
});

btnClose.addEventListener("click", function () {
  objModal.style.display = "none";
});

window.addEventListener("click", ({ target }) => {
  if (target === objModal) objModal.style.display = "none";
});

indice = 0;

// Agregar tarea
addTarea.addEventListener("click", function () {
  indice++;
  console.log(indice);

  const titulo = objTituloTarea.value.trim();
  const contenido = objContenidoTarea.value.trim();
  const objTareas = document.getElementById("seccion");

  if (!titulo || !contenido) {
    alert("Por favor, completa ambos campos antes de agregar la tarea.");
    return;
  }

  let tarea = document.createElement("div");
  tarea.classList.add("contenedor_principal");
  tarea.innerHTML = `
    <div class="contenedor" id="${indice}">
      <div class="seleccion">
        <button class="btnCalificar">
          <svg clasa="imgCalificar" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed">
            <path d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/>
          </svg>
        </button>
      </div>
      <div class="tarea">
        <p class="texto">${titulo}</p>
      </div>
    </div>
  `;

  // Agregar evento al nuevo botón
  let btnCalificar = tarea.querySelector(".btnCalificar");
  btnCalificar.addEventListener("click", function () {
    const editor = document.getElementById("modalEdit");
    editor.style.display = "flex";
  });

  objTareas.appendChild(tarea);
  objModal.style.display = "none";
  limpiarCamposEntrada();
});

// Limpiar campos de entrada
function limpiarCamposEntrada() {
  objTituloTarea.value = "";
  objContenidoTarea.value = "";
}

// Cerrar editor de tareas
const closedEditor = document.getElementById("cerrarEdit");
closedEditor.addEventListener("click", function () {
  const editor = document.getElementById("modalEdit");
  editor.style.display = "none";
});