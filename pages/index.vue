<template lang="html">
    
    <div class="contenedor">
        
        <v-layout  d-block>
            <div class="cabeceras">
                <h4 class="animated bounceInDown delay-1s h1_index">OCA GAME</h4>
            </div>
            <div>
                <img class="animated bounceInDown" src="@/static/images/oca.png">
            </div>

            <div style="">
                <v-btn round class="animated bounceInDown delay-1s btns" to="configJugar">
                    <v-icon left>videogame_asset</v-icon>
                    Jugar
                </v-btn>
            </div>
                
            <div>
                <v-btn round class="animated bounceInDown delay-1s btns" to="agregarContenido">
                    <v-icon left>note_add</v-icon>
                    Agregar contenido
                </v-btn>
            </div>

        </v-layout>
    </div>
    
</template>

<script>
export default {}
</script>

<style lang="css">

h4{
    color: yellowgreen;
    font-size: 50px;
    font-style: italic;
    font-family: cursive;
    font-weight: bold;
    display: inline-block;
    
}

</style>
