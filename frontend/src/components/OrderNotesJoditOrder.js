import React, { useEffect } from 'react'

 const OrderNotesJoditOrder = ({ order }) => {
   useEffect(() => {
     const ordernotes = document.querySelector('.orderNotes')
     if (ordernotes) {
        ordernotes.innerHTML = order.ordernotes
       let images = document.querySelectorAll('.orderNotes img')
       if (images) {
         images.forEach((item) => {
           item.style.width = '100%'
         })
       }
     }
   }, [order])

   return <p className='orderNotes'></p>
 }

 export default OrderNotesJoditOrder