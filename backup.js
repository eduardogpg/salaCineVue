seats: [
  {id: 'A1', available: true, purchased: false}, {id: 'A2', available: true, purchased: false}, {id: 'A3', available: true, purchased: false}, {id: 'A4', available: true, purchased: false}, {id: 'A5', available: true, purchased: false},
  {id: 'A6', available: true, purchased: false}, {id: 'A7', available: true, purchased: false}, {id: 'A8', available: true, purchased: false}, {id: 'A9', available: true, purchased: false}, {id: 'A10', available: true, purchased: false},
  {id: 'A11', available: true, purchased: false}, {id: 'A12', available: true, purchased: false},
],


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

      if(seatsDB.find(a => a.id == seat.id))
        return
      else{
        seat.purchased = true
      }
    }
  })

  return this.seats
},
