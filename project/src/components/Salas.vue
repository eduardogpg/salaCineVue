<template lang="html">
  <div class="">
    <h3>Salas de cine</h3>
    <b-list-group>
      <b-list-group-item
        v-for="item in salas">
          <router-link :to="{ name: 'sala', params: { sId: item.id }}"
            v-bind:class="{ 'disabled' : !salaDisponible(item)}"
          >
            {{ item.id }} - Asientos disponibles: {{ item.disponibilidad }} - <strong> {{ item.tipo }}</strong>
          </router-link>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {

  created: function(){

  },

  data() {
    return {
      salas: [
        { id: 1, name: 'Sala1', disponibilidad: 10, tipo: 'Normal' },
        { id: 2, name: 'Sala2', disponibilidad: 0, tipo: 'Normal' },
        { id: 3, name: 'Sala3', disponibilidad: 40, tipo: 'Premium' },
      ],
    }
  },

  methods: {
    salaDisponible: function(sala){
      return sala.disponibilidad > 0
    }
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
