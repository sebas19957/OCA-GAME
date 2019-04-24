<template lang="en">
  <div class="contenedor">

    <div class="cabeceras">
      <v-btn class="btnDevolder animated bounceInLeft delay-1s" fab small color="red" to="configJugar">
              <v-icon>arrow_back</v-icon>
            </v-btn>
        <h1 class="animated bounceInDown">OCA GAME</h1> 
    </div>
      
    <div style="position: relative">
      <div class="animated bounceInLeft delay-1s" style="vertical-align: middle; float: left; display: inline-block; width: 16em; margin: 1em">
        <div style="display: table-cell; margin-bottom: 3em">
          <h2 style="display: table-row">Información</h2>
          

          <div style="display: table-row">
            <div class="bloque">Jug.</div>
            <div class="bloque">Color/Posición</div>
          </div>
          
          
          <div style="display: table-row" v-for="i in nroJugadores" :key="i">
            <div class="bloque">Jugador {{i}}</div>
              <div v-if="colores[i] == 'Verde'" style="background-color: green; color: black" class="bloque">{{posiciones[i-1]}}</div>
              <div v-else-if="colores[i] == 'Rojo'" style="background-color: red; color: black" class="bloque">{{posiciones[i-1]}}</div>
              <div v-else-if="colores[i] == 'Azúl'" style="background-color: blue; color: black" class="bloque">{{posiciones[i-1]}}</div>
              <div v-else style="background-color: yellow; color: black" class="bloque">{{posiciones[i-1]}}</div>
            </div>
        </div>

        <div style="background-color: cyan; margin-top: 3em; color: black">
          <h3>Turno</h3>
          <div class="bloque">Jugador</div>
          <div class="bloque">{{turno}}</div>
        </div>
         
      </div>

      <div class="animated bounceInUp delay-2s" style="vertical-align: middle; display: inline-block" id="tabla" >
        <div v-for="f in filas" :key="f" >
          <div v-for="c in columnas" :key="getNumero(f,c)" class="tablero">
            
            <div v-if="getNumero(f,c) == (filas * columnas)" class="llegada" :id="'celda'+getNumero(f,c)">{{getNumero(f,c)}}<br>Meta</div>
            <div v-else-if="getNumero(f,c) == 1" class="salida" :id="'celda'+getNumero(f,c)">{{getNumero(f,c)}}<br>Inicio</div>
            <div v-else class="celdas" :id="'celda'+getNumero(f,c)">{{getNumero(f,c)}}</div>
          </div>
        </div>
      </div>

      <div class="animated bounceInRight delay-1s" style="vertical-align: middle; display: inline-block; width: 16em; margin-right: 3em; float: right">
          <img :class="{'heartBeat animated': animated}" class="dado" src="@/static/images/dado_6.png" id="imagenDado" >
          <v-btn round class="btns" v-on:click="tirar() + animate()" id="tirar">
            <v-icon left>loop</v-icon>
            TIRAR
            </v-btn>
      </div>
    </div>
      
  </div>



</template>

<script>

import Toastr from 'toastr';


export default {
  beforeMount() {
    this.cargar()
  },
  data() {
    return {
      filas: 4,
      columnas: 4,
      nroJugadores: 2,
      turno: 1,
      colores: [],
      celdas: [],
      posiciones: [],
      animated: false
    }
  },
  methods: {
    cargar() {
      this.filas = this.$store.getters.getNroFilas
      this.columnas = this.$store.getters.getNroColumnas
      this.nroJugadores = this.$store.getters.getNroJugadores
      this.colores[1] = this.$store.getters.getColorJugador1
      this.colores[2] = this.$store.getters.getColorJugador2
      this.colores[3] = this.$store.getters.getColorJugador3
      this.colores[4] = this.$store.getters.getColorJugador4

      for (let i = 0; i < this.filas * this.columnas; i++) {
        this.celdas[i] = "celda"+(i+1);
      }

      for (let i = 0; i < this.nroJugadores; i++) {
        this.posiciones[i] = 1
      }
    },
    getNumero(f, c) {
      if (f % 2 == 0) {
        return (
          this.filas * this.columnas +
          1 -
          (this.columnas * (f - 1) + (this.columnas - c + 1))
        )
      } else {
        if (f > 1) {
          return this.filas * this.columnas + 1 - (this.columnas * (f - 1) + c)
        } else {
          return this.filas * this.columnas + 1 - c
        }
      }
    },
    tirar() {
      let aleatorio = Math.floor(Math.random() * 6 + 1)
      this.cambiarDado(aleatorio);

      if(this.posiciones[this.turno - 1] + aleatorio < (this.filas * this.columnas)){
        if(this.posiciones[this.turno - 1] > 1){
          document.getElementById(this.celdas[this.posiciones[this.turno - 1] - 1]).style.backgroundColor = "white";
        }

        this.posiciones[this.turno - 1] += aleatorio;
        var posicion = this.posiciones[this.turno - 1];

        var celda = document.getElementById(this.celdas[posicion -1]);
        var color = window.getComputedStyle(celda).backgroundColor;

        if(this.getColor(color) == "white"){
          document.getElementById(this.celdas[posicion - 1]).style.backgroundColor = this.getColor(this.colores[this.turno]);
        }else{
          document.getElementById(this.celdas[posicion - 1]).style.backgroundColor = "cyan";
        }
      }else if(this.posiciones[this.turno - 1] + aleatorio == (this.filas * this.columnas)){
        // Aquí el toast de ganador
        // console.log("Triunfo para el Jugador: "+ this.turno);
        Toastr.success("Triunfo para el Jugador: "+ this.turno);
        document.getElementById("tirar").disabled = true;
        document.getElementById("celda"+(this.filas * this.columnas)).innerText = "Gana jug " + this.turno;
      }else{
        // Aquí un toast de que sobrepasó el límite y que intente de nuevo en el próximo turno
        // console.log("El resultado de tu lanzamiento sobrepasa la meta. Intenta de nuevo en tu siguiente turno");
        Toastr.info('Jugador ' + this.turno + ": El resultado de tu lanzamiento sobrepasa la meta. Intenta de nuevo en tu siguiente turno");
      }

      
      if(this.turno < this.nroJugadores){
        this.turno++;
      }else{
        this.turno = 1;
      }

    },
    cambiarDado(aleatorio){
      switch (aleatorio) {
        case 1:
          document.getElementById('imagenDado').src = '../../images/dado_1.png'
          break
        case 2:
          document.getElementById('imagenDado').src = '../../images/dado_2.png'
          break
        case 3:
          document.getElementById('imagenDado').src = '../../images/dado_3.png'
          break
        case 4:
          document.getElementById('imagenDado').src = '../../images/dado_4.png'
          break
        case 5:
          document.getElementById('imagenDado').src = '../../images/dado_5.png'
          break
        case 6:
          document.getElementById('imagenDado').src = '../../images/dado_6.png'
          break
        default:
          break
      }    
    },
    getColor(colorEspañol){
      if(colorEspañol =="Verde" || colorEspañol == "rgb(0, 128, 0)"){
        return "green";
      }else if (colorEspañol =="Rojo" || colorEspañol == "rgb(255, 0, 0)"){
        return "red";
      }else if (colorEspañol =="Azúl" || colorEspañol == "rgb(0, 0, 255)"){
        return "blue";
      }else if(colorEspañol == "rgb(255, 255, 255)"){
        return "white";
      }else{
        return "yellow";
      }
    },
    animate: function() {
      var self = this;
      self.animated = true;
      setTimeout(function(){ self.animated = false; }, 1000);
    }
  }
}
</script>
    
<style>

.dado{
  width: 80%;
}
</style>
