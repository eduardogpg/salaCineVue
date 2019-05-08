<template lang="html">

  <div class="container">

    <div class="screen">
      <p class="font-weight-bold" style="font-size: 18px;">Secreen</p>
    </div>

    <div class="seats">

      <div class="row justify-content-md-center">

        <div class="col seat disponible"
          v-for="seat in seats"
          @click="checkSeat">
          <strong> {{ seat.id }}</strong>
        </div>

      </div>
    </div>

  </div>

  </template>
<script>
import firebase from 'firebase';

const path = 'sala'
const pathId = '1'

export default {

  created(){
    // this.updateSeats()

    firebase.database().ref(path).child(pathId).on('value',
          snapshot => this.loadSeats(snapshot.val()) );
  },

  data() {
    return {
      seats: [ ],
    }
  },

  methods: {

    loadSeats: function(seats){
      this.seats = seats
    },

    checkSeat: function(event){
      let seatId = event.target.id;
      console.log(seatId)
    },

    updateSeats : function(){
      firebase.database().ref(path).child(pathId).set(this.seats,
        function(error){
          if (error)
            console.error("No es posible completar la transacción")
          else
            console.log("Transacción ejecutada exitosamente")
      });
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
    cursor: pointer;
    color: white;
    margin: 3px;
  }

  .seats{
    margin-top: 40px;
  }

  .disponible {
    background-color: #2B6282;
  }

  .ocupado {
    background-color: #772852;
  }



</style>
