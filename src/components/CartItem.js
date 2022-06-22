import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// import { actionCreaters } from "../state/index";
import "./css/CartItem.css";
import { db } from "../firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { actionCreaters } from "../state";

export default function CartItem(props) {

    const [item, setItem] = useState();

    // const dispatch=useDispatch()
    // dispatch(actionCreaters.inctotal(10))

    const docRef = doc(db, "foods", props.id);
    const getFood = async () => {
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data())
        setItem(docSnap.data());
    }

    useEffect(()=>{
        getFood();
    },[])
    
    console.log(props.id);

    function decqnt() {
        console.log("decqnt")
    }

    function incqnt() {
        console.log("incqnt")
    }

    return (
        item ?
            <div className="cartitem" id={"item" + item.id}>
                <div className="cartItem_image">
                    <img src="https://picsum.photos/30" alt="food" />
                </div>
                <div className="cartitem_content">
                    <div className="cartitem_name">
                        <h3>{item.name}</h3>
                        <h3>&#8377;{item.price}</h3>
                    </div>
                    <div className="quantity">
                        <button onClick={decqnt}>-</button>
                        <h2>Quantity: {props.quantity} {/* quantity */}</h2>
                        <button onClick={incqnt}>+</button>
                        {/* <button onClick={()=>{dispatch(actionCreaters.decqt(1, props.id))}}>-</button>
                    <h2>Quantity: {props.quantity} and {quantity}</h2>
                    <button onClick={()=>{dispatch(actionCreaters.incqt(1))}}>+</button> */}
                    </div>
                </div>
            </div>
            : <></>
    );
}

CartItem.propTypes = {
    quantity: PropTypes.number.isRequired,
}
CartItem.defaultProps = {
    quantity: 0
}