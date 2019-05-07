<template lang="html">
  <div class="">
    <h3>Salas de cine</h3>
    <b-list-group>
      <b-list-group-item
        v-for="item in salas">
          <router-link :to="{ name: 'sala', params: { sId: item.id }}"
            v-bind:class="{ 'disabled' : !salaDisponible(item)}"
          >
            Sala Número: {{ item.id }} - Asientos disponibles: {{ item.disponibilidad }} - <strong> {{ item.tipo }}</strong>
          </router-link>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  // https://firebase.google.com/docs/database/web/read-and-write?authuser=0

  created: function(){
    //this.crearSalas()
    firebase.database().ref('/salas/').on('value',
              snapshot => this.obtenerSalas(snapshot.val())
           );
  },

  data() {
    return {
      salas: [],
      salasRespaldo : [
        { id: 'Sala1', tipo: 'Normal', disponibilidad: 100 },
        { id: 'Sala2', tipo: 'Normal', disponibilidad: 100 },
        { id: 'Sala3', tipo: 'Premium', disponibilidad: 100 },
      ]
    }
  },

  methods: {
    salaDisponible: function(sala){
      return sala.disponibilidad > 0
    },

    obtenerSalas: function(salas) {
      this.salas = salas
    },

    crearSalas: function(){
      firebase.database().ref("/salas/").set(this.salasRespaldo).then(response => {
         console.log('Salas creadas exitosamente!')
      })
    },
  }
}
</script>

<style lang="css" scoped>
  a.disabled {
    pointer-events: none;
    cursor: default;
    color: gray;
  }
</style>
