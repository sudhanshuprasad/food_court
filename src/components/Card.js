import React from "react";
import PropTypes from 'prop-types'
import "./css/Card.css";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAdditionalUserInfo } from "firebase/auth";
import {useDispatch} from 'react-redux'
import { actionCreaters } from "../state/index";

export default function Card(props) {

  let quantity=1;

  const dispatch=useDispatch();

  const cartCollectionRef = collection(db, "carts");
  async function updateCart(foodId){

    const getFood = async () => {
      
      const getCartArr = async () => {
        const cartdocRef = doc(db, "carts", localStorage.getItem("uid"));
        const docSnap = await getDoc(cartdocRef);
        return docSnap.exists;
      }
      return getCartArr();
      
      // const data = await getDocs(cartCollectionRef);
      // console.log(data.docs.map((document)=>({...document.data(), id: document.id}))[0]);
      // return(data.docs.map((document)=>({...document.data(), id: document.id}))[0]);
    }

    if(await getFood()===undefined){
      await setDoc(doc(db, "carts", localStorage.getItem("uid")), {
        foodID : arrayUnion(foodId),
        quantity: quantity+1
      });
    }else{
      await updateDoc(doc(db, "carts", localStorage.getItem("uid")), {
        foodID : arrayUnion(foodId),
        quantity: quantity+1
      });
    }
    
    // dispatch(actionCreaters.inctotal(10));

    console.log("update cart with "+foodId);
  }

  return (
    <div className="item" id={"item" + props.num}>
      <img src={props.imgurl} alt="food" />
      <div className="content">
        <div className="item_name">
          <h3>{props.foodName}</h3>
          <h3>&#8377;{props.price}</h3>
        </div>
        <h5>{props.shop}</h5>
        <br />
        <h6>{props.dsc}</h6>
        <button className="order-btn" onClick={() => updateCart(props.num)} id={"order" + props.num}>Add to cart </button>
      </div>
    </div>
  );
}

Card.propTypes = {
  // num:PropTypes.number.isRequired,
  foodName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  dsc: PropTypes.string,
  shop: PropTypes.string.isRequired
}
Card.defaultProps = {
  foodName: "Unnamed Food",
  price: 0,
  dsc: "No discription is available for this food item",
  shop: "Shop unknown"
}