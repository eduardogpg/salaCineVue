<template lang="html">

  <div class="container">

    <div class="screen">
      <p class="font-weight-bold" style="font-size: 18px;">Pantalla</p>
    </div>

    <div class="seats">
      <div class="row justify-content-md-center">
        <div class="col seat"
          v-for="seat in seats"
          @click="checkSeat"
          v-bind:id="seat.id"
          v-text="seat.id"
          v-bind:class="[(seat.available) ? 'available' : 'unavailable']"
          >
        </div>
      </div>
    </div>

    <div class="buttons">
      <b-button variant="success" style="margin-right:10px;" @click="getSeats">Adquir</b-button>
      <b-button variant="danger" style="margin-right:10px;"> Cancelar</b-button>
      <b-button @click="cleanSeats">Limpiar</b-button>
    </div>

  </div>

  </template>
<script>
import firebase from 'firebase';
import Vue from 'vue'

const path = 'sala'
const pathId = '1'

export default {

  created(){
    // this.updateSeats()
    firebase.database().ref(path).child(pathId).on('value',
          snapshot => this.loadSeats(snapshot.val())
        );
  },

  data() {
    return {
      seats: [],
    }
  },

  methods: {

    loadSeats: function(seats){
      this.seats = seats
    },

    checkSeat: function(event){
      let seat = this.seats.find(s => s.id == event.target.id)

      if(seat.purchased){
        console.error("No es posible seleccionar el asiento " + seat.id)
        return
      }

      seat.available = !seat.available

      this.updateSeats()
    },

    updateSeats: function(){
      return firebase.database().ref(path).child(pathId).set(this.seats, function(error){} );
    },

    getSeats: function(){
      firebase.database().ref(path).child(pathId).transaction(
        seatsDB => this.buyTickets(seatsDB),
        function(error, commited, snapshot){

          if(error)
            console.error(error)

          if (commited)
            console.log("Datos persistidos!")

        })
    },

    buyTickets: function(seatsDB){

      this.seats.forEach(function(seat){
        if(!seat.available && !seat.purchased){

          if (seatsDB.find(a => a.id == seat.id).purchased)
            return

          seat.purchased = true
        }
      })

      return this.seats
    },

    cleanSeats: function(){
      this.seats.forEach(function(element){
        element.purchased = false
        element.available = true
      })

      this.updateSeats()
    },

  },

  computed: {

  },

}
</script>

<style lang="css" scoped>
  .screen {
    background-color: #2B6282;
    color: white;
  }

  .seat {
    cursor: pointer;
    color: white;
    margin: 3px;
    font-weight: bold;

  }

  .seats{
    margin-top: 40px;
  }

  .available {
    background-color: #2B6282;
  }

  .unavailable {
    background-color: #772852;
  }

  .buttons{
    margin-top:20px;
  }

</style>
