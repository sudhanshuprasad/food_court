import React, { useState } from "react";
import PropTypes from 'prop-types'
import "./css/Card.css";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAdditionalUserInfo } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { actionCreaters } from "../state/index";
import { async } from "@firebase/util";

export default function Card(props) {

  const [cartItem, setCartItem] = useState([])
  const [quantity, setQuantity] = useState([])

  const cartCollectionRef = collection(db, "carts");
  
  
  // to get the food item's id and quantity
  const cartdocRef = doc(db, "carts", localStorage.getItem("uid"));
  const getCartArr = async () => {
    const docSnap = await getDoc(cartdocRef);
    setCartItem(docSnap.data().foodID);
    setQuantity(docSnap.data().quantity);
  }

  getCartArr().then(async () => {
    
  })
  
  async function updateCart(foodId) {
    
    let newQuantityArray=[];
    quantity?.map((element)=>{
      newQuantityArray.push(element)
    })
    //if item already in cart add one otherwize array.push(1)
    if(cartItem.indexOf(foodId)!==-1){
      // let index=newQuantityArray.length()
      newQuantityArray[cartItem.indexOf(foodId)]+=1;
      console.log(++newQuantityArray[cartItem.indexOf(foodId)]);
      console.log("foodfound")
    }else{
      newQuantityArray.push(1);
      console.log(newQuantityArray)
    }

    const getFood = async () => {


      const getCart = async () => {
        // const cartdocRef = doc(db, "carts", localStorage.getItem("uid"));
        const docSnap = await getDoc(cartdocRef);
        return docSnap;
      }
      return getCart();

    }

    if ((await getFood()).exists === undefined) {
      console.log("inside setdoc")
      await setDoc(doc(db, "carts", localStorage.getItem("uid")), {
        foodID: arrayUnion(foodId),
        quantity: arrayUnion(1)
      });
    } else {
      console.log("inside updatedoc")
      await updateDoc(doc(db, "carts", localStorage.getItem("uid")), {
        foodID: arrayUnion(foodId),
        quantity: newQuantityArray
      });
    }

    // console.log("fhfhfh");
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