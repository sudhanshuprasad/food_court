import React, { useEffect, useState } from 'react';
import './css/Login.css';
import './css/Cart.css';
import CartItem from './CartItem';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function Cart() {

    //get food items in the cart

    const [foodItem, setFoodItem] = useState([]);
    const [cartItem, setCartItem] = useState([]);
    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState();

    useEffect(() => {
        const cartdocRef = doc(db, "carts", localStorage.getItem("uid"));
        const getCartArr = async () => {
            const docSnap = await getDoc(cartdocRef);
            setCartItem(docSnap.data().foodID)
            setQuantity(docSnap.data().quantity)
        }

        // function makeFoodArray() {


        //     cartItem?.map((item) => {
        //         const docRef = doc(db, "foods", item);
        //         const getFood = async () => {
        //             const docSnap = await getDoc(docRef);
        //             setFoodItem(docSnap.data());
        //         }
        //         getFood();
        //     })
        // }

        getCartArr().then(() => {
            console.log("cartitem is " + cartItem)
            // makeFoodArray();
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
            <div>
                <button className="cart_button">Checkout</button>
            </div>
        </div>
    )
}