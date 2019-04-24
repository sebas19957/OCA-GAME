<template lang="html">
    
    <div class="contenedor">
        <v-btn class="btnDevolder animated bounceInDown delay-1s" fab small color="red" to="/">
            <v-icon>arrow_back</v-icon>
        </v-btn>

        <h1 class="animated bounceInDown delay-1s">Agregar Contenido</h1>
    
    <div class="cabeceras">
                
            </div>
            <div>
                <img class="animated bounceInDown" src="@/static/images/oca.png">
            </div>

            <div style="">
                <v-btn round class="animated bounceInDown delay-1s btns" to="crearClasificacion">
                    <v-icon left>create</v-icon>
                       Crear clasificación
                </v-btn>
            </div>
                
            <div>
                <v-btn round class="animated bounceInDown delay-1s btns" to="crearPregunta">
                    <v-icon left>question_answer</v-icon>
                    Crear pregunta
                </v-btn>
    </div>
        
    </div>
</template>

<script>



export default {

}
</script>

<style>

</style>
