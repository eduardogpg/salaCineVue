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
          v-bind:class="{ available: seat.available, 'unavailable': !seat.available, 'selected': canSelected(seat) }">
          >
          <!-- v-bind:class="[(seat.available) ? 'available' : 'unavailable', 'selected': canSelected(seat)]" -->
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

const path = 'salas'
const pathId = '1'

export default {

  created(){
    //this.updateSeats()

    this.id = firebase.database().ref('/users').push().key

    firebase.database().ref(path).child(pathId).on('value',
          snapshot => this.loadSeats(snapshot.val())
    );
  },

  data() {
    return {
      seats: [],
      id: ''
    }
  },

  methods: {

    loadSeats: function(seats){
      this.seats = seats
    },

    checkSeat: function(event){
      let seat = this.seats.find(s => s.id == event.target.id)

      if(seat.purchased || !this.canSelected(seat)){
        this.$notify(
          { group: 'foo', type:'error', title: 'Error', text: 'No es posible seleccionar el asiento'}
        )
        return
      }

      seat.available = !seat.available
      seat.user_id = this.id

      this.updateSeats()

    },

    updateSeats: function(){
      return firebase.database().ref(path).child(pathId).set(this.seats, function(error){} );
    },

    getSeats: function(){
      firebase.database().ref(path).child(pathId).transaction(
        seatsDB => this.buyTickets(seatsDB),
        (error, commited, snapshot) => this.validateResponse(error, commited, snapshot)
      )
    },

    validateResponse: function(error, commited, snapshot){
      if(error){
        this.$notify(
          { group: 'foo', type:'error', title: 'Error', text: 'No es posible adquirir las entradas'}
        )
      }

      if(commited){
        this.$notify(
            { group: 'foo', type:'success', title: 'Exito', text: 'Entradas aquiridas exitosamente'}
        )
      }
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
        element.user_id = null
      })

      this.updateSeats()
    },

    canSelected: function(seat){
      return (seat.user_id == null || seat.user_id == this.id)
    }
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
    color: white;
    margin: 3px;
    font-weight: bold;
  }

  .selected{
    cursor: pointer;
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
