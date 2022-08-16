import React, { useEffect } from 'react'

 const OrderNotesJodit = ({ cart }) => {
   useEffect(() => {
     const ordernotes = document.querySelector('.orderNotes')
     if (ordernotes) {
        ordernotes.innerHTML = cart.ordernotes
       let images = document.querySelectorAll('.orderNotes img')
       if (images) {
         images.forEach((item) => {
           item.style.width = '100%'
         })
       }
     }
   }, [cart])

   return <p className='orderNotes'></p>
 }

 export default OrderNotesJodit