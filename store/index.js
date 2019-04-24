import vuex from 'vuex'
const store =() => {
    return  new vuex.Store({
        state:{
            nroFilas:4,
            nroColumnas:4,
            nroJugadores:2,
            colorJugador1:"", 
            colorJugador2:"",
            colorJugador3:"", 
            colorJugador4:"",
        },
        mutations:{
            setNroFilas(state,fila){
                 state.nroFilas=fila
            },setNroColumnas(state,columna){
                state.nroColumnas=columna
            },setNroJugadores(state,jugador){
                state.nroJugadores=jugador
            },setColorJugador1(state,jugador){
                state.colorJugador1=jugador
            },setColorJugador2(state,jugador){
                state.colorJugador2=jugador
            },setColorJugador3(state,jugador){
                state.colorJugador3=jugador
            },setColorJugador4(state,jugador){
                state.colorJugador4=jugador
            }
        },
        getters:{
            getNroFilas(state){
                return state.nroFilas
           },getNroColumnas(state){
               return state.nroColumnas
           },getNroJugadores(state){
               return state.nroJugadores
           },getColorJugador1(state){
               return state.colorJugador1
           },getColorJugador2(state){
               return state.colorJugador2
           },getColorJugador3(state){
               return state.colorJugador3
           },getColorJugador4(state){
               return state.colorJugador4
           }
        }

    })
}
export default store