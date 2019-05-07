<template lang="html">

  <div class="container">
    <div class="pantalla" align="center">
      <p>Pantalla</p>
    </div>

    <!-- Asientos -->
    <div>
      <div v-if="asientosZonaA" class="row">
        <div class="col"></div>
        <div class="col-6">
          <div class="row justify-content-md-center">
            <div v-for="asiento in asientosZonaA"
                  class="col col-sm-2 asiento"
                  v-bind:id="asiento.id" v-text="asiento.id"
                  @click="seleccionarAsiento"
                  v-bind:class="[(asiento.disponible) ? 'disponible' : 'ocupado']"
            >
            </div>
          </div>
        </div>
        <div class="col"></div>
      </div>
      <div class="row segundo">
        <div v-if="asientosZonaB" class="col-3">
          <div class="row justify-content-md-center">
            <div v-for="asiento in asientosZonaB"
                class="col col-sm-4 asiento"
                v-bind:id="asiento.id" v-text="asiento.id"
                @click="seleccionarAsiento"
                v-bind:class="[(asiento.disponible) ? 'disponible' : 'ocupado']">
            </div>
          </div>
        </div>
        <div class="col">
          <div class="row justify-content-md-center">
            <div v-for="asiento in asientosZonaC"
              class="col col-sm-2 asiento"
              v-bind:id="asiento.id" v-text="asiento.id"
              @click="seleccionarAsiento"
              v-bind:class="[(asiento.disponible) ? 'disponible' : 'ocupado']"
              >
            </div>
          </div>
        </div>
        <div v-if="asientosZonaD" class="col-3">
          <div class="row justify-content-md-center">
            <div
              v-for="asiento in asientosZonaD"
              class="col col-sm-4 asiento"
              v-bind:id="asiento.id" v-text="asiento.id"
              @click="seleccionarAsiento"
              v-bind:class="[(asiento.disponible) ? 'disponible' : 'ocupado']"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <b-button variant="succes" @click="adquirirEntradas">Comprar</b-button>
    <b-button variant="danger" @click="liberarEntradas">Liberar</b-button>
    <hr>
      <div class="d-block">
        <strong class="d-inline">Disponible</strong>
        <div class="disponible preview"></div>
      </div>

      <div class="d-inline">
        <strong class="d-inline">Ocupado</strong>
        <div class="ocupado preview"></div>
      </div>
    </div>
  </template>
<script>
import firebase from 'firebase';

export default {

  created(){
    firebase.database().ref("/sala").on('value', snapshot => this.cargarAsientos(snapshot.val()))
    const key = firebase.database().ref("/salas2").push().key

    console.log(key)
    //  .ref('/sala').child(id)
    // https://firebase.google.com/docs/database/web/read-and-write?authuser=0#save_data_as_transactions
  },

  data() {
    return {
      asientosRespaldo: {
        zonaA: [
          {id: 'A1', disponible: true, purchased: false}, {id: 'A2', disponible: true, purchased: false}, {id: 'A3', disponible: true, purchased: false}, {id: 'A4', disponible: true, purchased: false}, {id: 'A5', disponible: true, purchased: false},
          {id: 'A6', disponible: true, purchased: false}, {id: 'A7', disponible: true, purchased: false}, {id: 'A8', disponible: true, purchased: false}, {id: 'A9', disponible: true, purchased: false}, {id: 'A10', disponible: true, purchased: false},
        ],

        zonaB: [
          {id: 'B1', disponible: true, purchased: false}, {id: 'B2', disponible: true, purchased: false}, {id: 'B3', disponible: true, purchased: false}, {id: 'B4', disponible: true, purchased: false}, {id: 'B5', disponible: true, purchased: false},
          {id: 'B6', disponible: true, purchased: false}, {id: 'B7', disponible: true, purchased: false}, {id: 'B8', disponible: true, purchased: false}, {id: 'B9', disponible: true, purchased: false}, {id: 'B10', disponible: true, purchased: false},
        ],

        zonaC: [
          {id: 'C1', disponible: true, purchased: false}, {id: 'C2', disponible: true, purchased: false}, {id: 'C3', disponible: true, purchased: false}, {id: 'C4', disponible: true, purchased: false}, {id: 'C5', disponible: true, purchased: false},
          {id: 'C6', disponible: true, purchased: false}, {id: 'C7', disponible: true, purchased: false}, {id: 'C8', disponible: true, purchased: false}, {id: 'C9', disponible: true, purchased: false}, {id: 'C10', disponible: true, purchased: false},
          {id: 'C11', disponible: true, purchased: false}, {id: 'C12', disponible: true, purchased: false}, {id: 'C13', disponible: true, purchased: false}, {id: 'C14', disponible: true, purchased: false}, {id: 'C15', disponible: true, purchased: false},
          {id: 'C16', disponible: true, purchased: false}, {id: 'C17', disponible: true, purchased: false}, {id: 'C18', disponible: true, purchased: false}, {id: 'C19', disponible: true, purchased: false}, {id: 'C20', disponible: true, purchased: false},
          {id: 'C21', disponible: true, purchased: false}, {id: 'C22', disponible: true, purchased: false}, {id: 'C23', disponible: true, purchased: false}, {id: 'C24', disponible: true, purchased: false}, {id: 'C25', disponible: true, purchased: false},
        ],

        zonaD: [
          {id: 'D1', disponible: true, purchased: false}, {id: 'D2', disponible: true, purchased: false}, {id: 'D3', disponible: true, purchased: false}, {id: 'D4', disponible: true, purchased: false}, {id: 'D5', disponible: true, purchased: false},
          {id: 'D6', disponible: true, purchased: false}, {id: 'D7', disponible: true, purchased: false}, {id: 'D8', disponible: true, purchased: false}, {id: 'D9', disponible: true, purchased: false}, {id: 'D10', disponible: true, purchased: false},
        ]
      },
      asientos : []
    }
  },

  methods: {

    adquirirEntradasTransaccion: function(asientosDB){
      for(let zona in this.asientos){

        let seleccionados = this.asientos[zona].filter(a => !a.disponible && !a.purchased)

        for(let asiento in seleccionados){
          if(asientosDB[zona][asiento].purchased){
            return
          }else{
            asientosDB[zona][asiento].purchased = true
          }
        }

      }

      return this.asientos
    },

    adquirirEntradas: function(){
      //this.pagarEntradas()
      /*
      firebase.database().ref("/sala").set(this.asientos).then(response => {
         alert("Entradas adquiridas!")
      })
      */
      firebase.database().ref("/sala").transaction(
          salasDB => this.adquirirEntradasTransaccion(salasDB)
        ,
        function(error, commited, snapshot){
          if(error){
            console.error(error)
          }else if (commited){
            console.log("Datos persistidos!")
          }

        }).then(response => console.log("Transacción ejecutada!"))
    },

    seleccionarAsiento: function(event){
      for(let zona in this.asientos){
        let asiento = this.asientos[zona].find(a => a.id === event.target.id)

        if(asiento){
          if(asiento.purchased) alert("El asiento " + asiento.id + " no esta disponible")
          else asiento.disponible = !asiento.disponible
          break;
        }
      }
    },

    pagarEntradas: function() {
      for(let zona in this.asientos){

        let seleccionados = this.asientos[zona].filter(a => !a.disponible && !a.purchased)

        for(let asiento in seleccionados)
          this.asientos[zona].find(a => a.id === seleccionados[asiento].id).purchased = true
      }
    },

    cargarAsientos: function(asientos){
      if (asientos === null) return
      this.asientos = asientos
    },

    liberarEntradas: function(){

      for(let zona in this.asientos){

        for(let nAsiento in this.asientos[zona]){
          let asiento = this.asientos[zona][nAsiento]

          asiento.purchased = false
          asiento.disponible = true
        }
      }

      firebase.database().ref("/sala/").set(this.asientos).then(response => {
         alert("Entradas liberadas!")
      })
    },

    createAsientos: function(){
      firebase.database().ref("/sala/1").set(this.asientosRespaldo).then(response => {
         console.log('Salas creadas exitosamente!')
      })
    }
  },

  computed: {
    asientosZonaA: function() { return this.asientos.zonaA },
    asientosZonaB: function() { return this.asientos.zonaB },
    asientosZonaC: function() { return this.asientos.zonaC },
    asientosZonaD: function() { return this.asientos.zonaD },
  },

}
</script>

<style lang="css" scoped>
  .pantalla {
    background-color: #253A6F;
    height: 30px;
    margin-bottom: 30px;
  }

  .asiento{
    margin: 3px;
    cursor: pointer;

    font-size: 13px;
    font-weight: bold;
    color: white;
    text-align: center;
  }
  .preview{
    height: 20px;
    width: 20px;
  }
  .ocupado {
    background-color: #215263;
  }

  .disponible {
    background-color: #3E7728;
  }
  .segundo{
    margin-top: 40px;
  }
  p {
    font-size: 18px;
    color: white;
    font-family: 'Lato', sans-serif;
  }

  button {
    margin-top: 20px;
  }
</style>
