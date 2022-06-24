import React, { useEffect, useState } from 'react';
import './css/Login.css';
import './css/Cart.css';
import CartItem from './CartItem';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useSelector } from 'react-redux';

export default function Cart() {

    const total=useSelector(state=>state.amount)

    //get food items in the cart

    // const [foodItem, setFoodItem] = useState([]);
    const [cartItem, setCartItem] = useState([]);
    // const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState([]);

    const orderNow = async () => {
        setCartItem([]);
        setQuantity([]);
        await setDoc(doc(db, "orders", localStorage.getItem("uid")), {
            foodID : cartItem,
            quantity : quantity
          });
        await setDoc(doc(db, "carts", localStorage.getItem("uid")), {
            foodID : [],
            quantity : []
          });
    }

    useEffect(() => {

        // to get the food item's id and quantity
        const cartdocRef = doc(db, "carts", localStorage.getItem("uid"));
        const getCartArr = async () => {
            const docSnap = await getDoc(cartdocRef);
            setCartItem(docSnap.data().foodID);
            setQuantity(docSnap.data().quantity);
        }

        getCartArr().then(() => {
            // console.log("cartitem is " + cartItem)
            // makeFoodArray()
        })
    }, [])

    console.log(quantity)

    return (
        <div>
            {cartItem?.map((element, i) => (
                <>
                    <CartItem
                        key={element}
                        id={element}
                        quantity={quantity[i]}
                    />
                </>
            ))}

            <hr></hr>
            <div className="cart_total">
                <h3>Total: &#8377;{total}</h3>
            </div>
            <div className='order_now'>
                <button onClick={orderNow} className="cart_button">Order Now</button>
            </div>
        </div>
    )
}