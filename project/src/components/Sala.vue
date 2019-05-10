<template lang="html">

  <div class="container">

    <div class="screen">
      <p class="font-weight-bold" style="font-size: 18px;">Pantalla</p>
    </div>

    <div class="seats">
      <div class="row justify-content-md-center">
        <div class="col seat"
          v-for="seat in seats"
          @click="selectElement"
          v-bind:id="seat.id"
          v-text="seat.id"
          v-bind:class="{ available: seat.available, 'unavailable': !seat.available, 'selected': availableToSelection(seat) }">
          >
          <!-- v-bind:class="[(seat.available) ? 'available' : 'unavailable', 'selected': availableToSelection(seat)]" -->
        </div>
      </div>
    </div>

    <div class="buttons">
      <b-button :disabled="!anyElementSelected" variant="success" style="margin-right:10px;" @click="purchase">Adquir</b-button>
      <b-button :disabled="!anyElementSelected" variant="danger" style="margin-right:10px;" @click="cancel"> Cancelar</b-button>
      <b-button @click="cleanData">Limpiar</b-button>
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
    //this.updateElements()

    this.id = firebase.database().ref('/users').push().key

    firebase.database().ref(path).child(pathId).on('value',
          snapshot => this.loadData(snapshot.val())
    );
  },

  methods: {

    loadData: function(data){
      this.seats = data
    },

    selectElement: function(event){
      let seat = this.seats.find(s => s.id == event.target.id)

      if(seat.purchased || !this.availableToSelection(seat)){
        this.$notify(
          { group: 'foo', type:'error', title: 'Error', text: 'No es posible seleccionar el asiento'}
        )
        return
      }

      seat.available = !seat.available
      seat.user_id = this.id

      this.updateElements()
      this.count = this.selectedElements().length
    },

    cancel: function(){
      this.selectedElements().forEach(function(seat){
        seat.available = true
        seat.user_id = null
      })

      this.updateElements()
      this.count = this.selectedElements().length
    },

    purchase: function(){
      // this.selectedElements().forEach(function(seat){
      //   seat.purchased = true
      // })
      firebase.database()
      .ref(path)
      .child(pathId)
      .transaction(dataDB => this.validatePurchase(dataDB),
                  (error, committed, snapshot) => this.validateTransaction(error, committed, snapshot));
    },

    validateTransaction: function(error, committed, snapshot){
      if(committed){
        this.$notify(
          { group: 'foo', type:'success', title: 'Exito', text: 'Entradas adquiridas'}
        )
      }
    },

    validatePurchase: function(dataDB){
      this.selectedElements().forEach(function(seat){
        if(dataDB.find(s => s.id == seat.id).purchased)
          return

        seat.purchased = true
      })

      return this.seats
    },

    updateElements: function(){
      firebase.database().ref(path).child(pathId).set(this.seats, function(error){
        if(error)
            console.error("No es posible completar la transacción")
      });
    },

    cleanData: function(){
      this.seats.forEach(function(seat){
        seat.purchased = false
        seat.available = true
        seat.user_id = null
      })

      this.updateElements()
      this.count = this.selectedElements().length
    },

    availableToSelection: function(seat){
      return (seat.user_id == null || seat.user_id == this.id) && !seat.purchased
    },

    selectedElements: function() {
      return this.seats.filter(a => !a.available && !a.purchased && a.user_id == this.id)
    },

  },

  computed: {
    anyElementSelected: function() { return this.count > 0 },
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
