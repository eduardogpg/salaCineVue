<template lang="html">

  <div class="container">

    <div class="screen">
      <p class="font-weight-bold" style="font-size: 18px;">Pantalla</p>
    </div>

    <div class="seats">
      <div class="row justify-content-md-center">
        <div class="col seat"
          v-for="seat in seats"
          @click="selectSeat"
          v-bind:id="seat.id"
          v-text="seat.id"
          v-bind:class="{ available: seat.available, 'unavailable': !seat.available, 'selected': availableSelect(seat) }">
          >
          <!-- v-bind:class="[(seat.available) ? 'available' : 'unavailable', 'selected': availableSelect(seat)]" -->
        </div>
      </div>
    </div>

    <div class="buttons">
      <b-button variant="success" style="margin-right:10px;">Adquir</b-button>
      <b-button variant="danger" style="margin-right:10px;" @click="cancel"> Cancelar</b-button>
      <b-button @click="cleanSeats">Limpiar</b-button>
    </div>

    <div style="margin-top:20px">
      <strong >Asientos seleccionados {{ count }}</strong>
    </div>

  </div>

  </template>
<script>
import firebase from 'firebase';
import Vue from 'vue'

const path = 'salas'
const pathId = '1'

export default {

  data() {
    return {
      seats: [],
      id: '',
      count: 0
    }
  },

  created(){
    //this.updateSeats()

    this.id = firebase.database().ref('/users').push().key

    firebase.database().ref(path).child(pathId).on('value',
          snapshot => this.loadSeats(snapshot.val())
    );
  },

  methods: {

    loadSeats: function(seats){
      this.seats = seats
    },

    selectSeat: function(event){
      let seat = this.seats.find(s => s.id == event.target.id)

      if(seat.purchased || !this.availableSelect(seat)){
        this.$notify(
          { group: 'foo', type:'error', title: 'Error', text: 'No es posible seleccionar el asiento'}
        )
        return
      }

      seat.available = !seat.available
      seat.user_id = this.id

      this.updateSeats()

      this.count = this.selectedSeats().length
    },

    cancel: function(){
      let selectedSeats = this.selectedSeats()

      for(let pos in selectedSeats)
        selectedSeats.find(s => s.id == selectedSeats[pos].id).available = true
      
      this.updateSeats()
    },

    updateSeats: function(){
      return firebase.database().ref(path).child(pathId).set(this.seats, function(error){} );
    },

    cleanSeats: function(){
      this.seats.forEach(function(element){
        element.purchased = false
        element.available = true
        element.user_id = null
      })

      this.updateSeats()
    },

    availableSelect: function(seat){
      return (seat.user_id == null || seat.user_id == this.id)
    },

    selectedSeats: function() {
      return this.seats.filter(a => !a.available && !a.purchased && a.user_id == this.id)
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
