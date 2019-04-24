<template lang="html">
    
    <div class="contenedor">
      <v-layout  d-block >
        <div class="cabeceras">

          <v-btn class="btnDevolder animated bounceInLeft" fab small color="red"to="agregarContenido">
            <v-icon>arrow_back</v-icon>
          </v-btn>
 
            <h1 class="animated bounceInDown">Crear clasificacion</h1>
            
        </div>

        <v-flex xs12 sm8 md6>

            <v-card class="form animated bounceInLeft" color="cyan" >
                <v-card-title class="headline"></v-card-title>

                  <v-text-field
                  class="clasificacion"
                  :counter="80"
                  maxlength="80"
                  v-model="clasificacion"
                  label="Nombre de la clasificación"
                  outline
                  required
                  ></v-text-field>
                  <br>
                  <br>

                  <v-textarea
                  class="textarea_descripcion"
                  outline
                  maxlength="200"
                  :counter="200"
                  v-model="descripcion"
                  label="Descripcción"
                  required>
                  </v-textarea>

                  <v-btn round class="btns" @click="addClasificacion" v-bind:disabled="clasificacion === ''">
                    <v-icon left>save</v-icon>
                    Guardar
                    </v-btn>
                  <v-btn round class="btns" v-on:click="clear">
                    <v-icon left>clear</v-icon>
                    Limpiar
                  </v-btn>

                  <v-dialog v-model="dialog" persistent max-width="550px" >
                    <template v-slot:activator="{ on }">
                      <v-btn color="primary" v-on="on">Open Dialog</v-btn>
                    </template>
                    <v-card  v-for="clasi in vPregunta" style="background-color: lightblue; color:black; margin: auto; padding: 1em;">
                      <span class="headline">{{clasi}}</span>
                    </v-card>

                    <v-card >
                      <v-flex xs12 style="background-color: lightblue; margin-left: 1em; padding: 1em; margin: auto;">
                        <div v-for="clasi in vRespuesta" >
                          <v-checkbox light :label="`${clasi}`" :value="clasi"></v-checkbox>
                        </div> 

                         <div v-for="clasi in vOpcionA" >
                          <v-checkbox light :label="`${clasi}`" :value="clasi"></v-checkbox>
                        </div>

                         <div v-for="clasi in vOpcionB" >
                          <v-checkbox light :label="`${clasi}`" :value="clasi"></v-checkbox>
                        </div>

                         <div v-for="clasi in vOpcionC" >
                          <v-checkbox light :label="`${clasi}`" :value="clasi"></v-checkbox>
                        </div>
                      </v-flex>
                    </v-card>


                    <v-card-actions style="background-color: lightblue;">
                      <v-spacer></v-spacer>
                      <v-btn round @click="dialog = false">
                        <v-icon left>check_circle_outline</v-icon>
                        Responder
                      </v-btn>
                    </v-card-actions>
                  </v-dialog>

              </v-card>
              
            </v-flex>
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

  // esto es para saber si existe una clasificación
  let agregarClas = db.ref('clasificaciones');

  let vClas = []; 

  agregarClas.orderByValue().on('value', function(snapshot){
      let jsonA = snapshot.val();
      for (let index in jsonA){
        vClas.push(index)
      }
  })

  // Esto es para mostrar las preguntas

let buscarPreguntas = db.ref('clasificaciones').child('Diego');

var bandera = 1;

let vPregunta = []; 
let vRespuesta = []; 
let vOpcionA = []; 
let vOpcionB = []; 
let vOpcionC = []; 

buscarPreguntas.orderByValue().on("child_added", function(snapshot, prevChildKey){

    if(bandera == 1){
      bandera++;
    }else{
      let vPregunta = []; 
      let vRespuesta = []; 
      let vOpcionA = []; 
      let vOpcionB = []; 
      let vOpcionC = []; 
    }
    
    let jsonA = snapshot.val();
    
      vPregunta.push(jsonA.pregunta)
      vRespuesta.push(jsonA.opcionRespuesta)
      vOpcionA.push(jsonA.opcionA)
      vOpcionB.push(jsonA.opcionB)
      vOpcionC.push(jsonA.opcionC)
    
})

export default {
  
  firebase: {
    clasificaciones: agregarClas
  },

  data() {
    return {
      descripcion: '',
      clasificacion : '',
      dialog: false,
      vPregunta,
      vRespuesta,
      vOpcionA,
      vOpcionB,
      vOpcionC

    }
  },

  methods: {
    clear() {
      this.clasificacion = ''
      this.descripcion = ''
      Toastr.success('Limpiado')
    },
    addClasificacion() { 

      if(vClas.includes(this.clasificacion.toLowerCase())){
          Toastr.error('Ya existe una clasificación con el nombre ingresado');
      }else if ( this.descripcion == ''){
          Toastr.error('Hay algun campo vacio');
      } else{
        let agregarClas = db.ref('clasificaciones/'+this.clasificacion);
        agregarClas.set({
            descripcion: this.descripcion
          });
        this.clasificacion = ''
        this.descripcion = ''
        Toastr.success('Clasificación creada exitosamente');
      }
    }
    
  }
}
</script>

<style>
    .form {
    width: 530px;
    height: 370px;
    border-radius: 5px; 
    margin-left: 20em;
    margin-top: 4em;
    }

    .clasificacion {
    width: 485px;
    display: inline-block;
    }

    .textarea_descripcion{
    width: 485px;
    height: 165px;
    display: inline-block;

    }

</style>





