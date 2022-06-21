import React, { useEffect, useState } from 'react';
import './css/Login.css';
import './css/Cart.css';
import OrderItem from './OrderItem';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function Cart() {

  const [foodItem, setFoodItem] = useState([]);
  const [orderItem, setOrderItem] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState();

  useEffect(() => {
    const cartdocRef = doc(db, "orders", localStorage.getItem("uid"));
    const getCartArr = async () => {
      const docSnap = await getDoc(cartdocRef);
      setOrderItem(docSnap.data().foodID)
      setQuantity(docSnap.data().quantity)
    }

    function makeFoodArray() {


      orderItem?.map((item) => {
        const docRef = doc(db, "foods", item);
        const getFood = async () => {
          const docSnap = await getDoc(docRef);
          setFoodItem(docSnap.data());
        }
        getFood();
      })
    }

    getCartArr().then(() => {
      console.log("orderitem is " + orderItem)
      makeFoodArray();
    })
  }, [])

  console.log(quantity)

  return (
    <div>
      {orderItem?.map((element, i) => (
        <>
          <OrderItem
            key={element}
            id={element}
            quantity={quantity[i]}
          />
        </>
      ))}

      <hr></hr>
      <div className="cart_total">
        <h3>Your order is being prepared</h3>
      </div>
    </div>
  )
}