
<template lang="html">
    
  <div class="contenedor">
    <v-layout  d-block>
        <div class="cabeceras">
            <v-btn class="btnDevolder animated bounceInLeft" fab small color="red" to="agregarContenido">
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <h1 class= "animated bounceInDown">Crear Pregunta</h1>
        </div>
  
      <v-card class="form2 animated bounceInLeft" color="cyan">

        <h2>Dilegenciar campos</h2>

        <v-textarea
          class="textarea_pregunta "
          outline
          maxlength="200"
          :counter="200"
          v-model="agregarPregunta.pregunta"
          label="Formula tu pregunta"
          required
        ></v-textarea>
            

        <v-text-field
          class="opciones"
          :counter="80"
          maxlength="80"
          v-model="agregarPregunta.opcionRespuesta"
          label="Respuesta"
          outline
          required
        ></v-text-field>

        <v-text-field
          class="opciones"
          :counter="80"
          maxlength="80"
          v-model="agregarPregunta.opcionA"
          label="Opcion A"
          outline
          required
        ></v-text-field>

        <v-text-field
          class="opciones"
          :counter="80"
          maxlength="80"
          v-model="agregarPregunta.opcionB"
          label="Opcion B"
          outline
          required
        ></v-text-field>

        <v-text-field
          class="opciones"
          :counter="80"
          maxlength="80"
          v-model="agregarPregunta.opcionC"
          label="Opcion C"
          outline
          required
        ></v-text-field>

        <v-btn class="btns" round @click="addPreguntas">
          <v-icon left>save</v-icon>
          Guardar
        </v-btn>
        <v-btn class="btns" round v-on:click="clear">
          <v-icon left>clear</v-icon>
          Limpiar
        </v-btn>
      </v-card>

      <v-card class="form3 animated bounceInLeft" id="clas" color="cyan" style="overflow:scroll; overflow-x:hidden;">

        <h2>Clasificaciones</h2>

        <div v-if=" sel.length < 1">
            <label>NO hay clasificaciones creadas</label>
        </div>

        <div v-for="clasi in sel" >
          <v-checkbox v-model="selected" :label="`${clasi}`" :value="clasi"></v-checkbox>
        </div> 
       
      </v-card> 

    </v-layout>
  </div>
    
</template>

<script>
import Firebase from 'firebase';
import Toastr from 'toastr';


let config = {
   apiKey: "AIzaSyB8-Gut27wxsuGdg1e7DyavWFgF60gnm8A",
    authDomain: "ocagame-bd.firebaseapp.com",
    databaseURL: "https://ocagame-bd.firebaseio.com",
    projectId: "ocagame-bd",
    storageBucket: "ocagame-bd.appspot.com",
    messagingSenderId: "131259496872"
}

if (!Firebase.apps.length) {
    Firebase.initializeApp(config);
  } 

let db = Firebase.database();
let agregarPreguntas = db.ref('clasificaciones');

var bandera = 1;
let vClasificaciones = []; 

agregarPreguntas.orderByValue().on('value', function(snapshot){

    if(bandera == 1){
      bandera++;
    }else{
      vClasificaciones = []; 
    }
    
    let jsonA = snapshot.val();
    for (let index in jsonA){
      vClasificaciones.push(index)
    }
})


export default {
  
  firebase: {
    clasificaciones: agregarPreguntas
  },

  data() {
    return {
      agregarPregunta: {
        pregunta: '',
        opcionRespuesta: '',
        opcionA: '',
        opcionB: '',
        opcionC: ''
      },
      sel : vClasificaciones,
      selected: []
    }
    
  },

  methods: {
    clear() {
      this.agregarPregunta.pregunta = ''
      this.agregarPregunta.opcionRespuesta = ''
      this.agregarPregunta.opcionA = ''
      this.agregarPregunta.opcionB = ''
      this.agregarPregunta.opcionC = ''
      Toastr.success('Limpiado')
    },
    addPreguntas() { 
       if (this.agregarPregunta.pregunta == '' || this.agregarPregunta.opcionRespuesta == '' || this.agregarPregunta.opcionA == '' || 
       this.agregarPregunta.opcionB == '' || this.agregarPregunta.opcionC == '' ){
          Toastr.error('Hay algun campo vacio')
        } else if (this.agregarPregunta.opcionRespuesta == this.agregarPregunta.opcionA || 
        this.agregarPregunta.opcionRespuesta == this.agregarPregunta.opcionB || this.agregarPregunta.opcionRespuesta == this.agregarPregunta.opcionC ||
        this.agregarPregunta.opcionA == this.agregarPregunta.opcionB ||  this.agregarPregunta.opcionA == this.agregarPregunta.opcionC || 
        this.agregarPregunta.opcionB == this.agregarPregunta.opcionC ) {
          Toastr.error('Tiene opciones de respuestas repetidas')
        } else if(this.selected.length == 0){
          Toastr.error('No ha seleccionado ninguna clasificación')
        }else if(this.selected.length > 1){
          Toastr.error('Solo se puede seleccionar una clasificación')
        }else {
          
          let agregarPreguntas = db.ref('clasificaciones/'+ this.selected);

          // agregarPreguntas.set({
          //     pregunta :this.agregarPregunta
          //   });
          agregarPreguntas.push(this.agregarPregunta); 
          this.agregarPregunta.pregunta = ''
          this.agregarPregunta.opcionRespuesta = ''
          this.agregarPregunta.opcionA = ''
          this.agregarPregunta.opcionB = ''
          this.agregarPregunta.opcionC = ''
          Toastr.success('Pregunta creada exitosamente')
        }
    }
  }
}
</script>

<style>

.form2 {
  width: 40%;
  border-radius: 5px; 
  /* margin-left: 20em;
  margin-top: -1em; */
  display: inline-block;
  padding: 2em;
  vertical-align: middle;
  margin: auto;
}

.form3{
  width: 30%;
  height: 500px;
  border-radius: 5px; 
  padding: 1em;
  margin-left: 10em;
  display: inline-block;
  vertical-align: middle;
}

.textarea_pregunta {
   width: 100%;
   display: inline-block;
}

.opciones {
  height: 90px;
  width: 100%;
  display: inline-block;
}

/* Scroll Personalizado */

.form3::-webkit-scrollbar {
	width: 11px;
}

.form3::-webkit-scrollbar-thumb {
	background: rgb(73, 73, 73);
	border-radius: 5px;
}

</style>