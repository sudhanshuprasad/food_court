import React, { useEffect, useState } from 'react'
import { collection, getDocs} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Card from './Card'
import "./css/Grid.css";

export default function Grid() {
  
  //get food items
  const [foodItem, setFoodItem]=useState([]);
  const foodCollectionRef = collection(db, "foods")

  
  useEffect(() => {
    const getFood = async () => {
      const data = await getDocs(foodCollectionRef);
      setFoodItem(data.docs.map((doc)=>({...doc.data(), id: doc.id})));
    }
    getFood();
    
  },[])
  
  // console.log(foodItem)
  
  return (
    <div className='grid-container'>
      {
        foodItem.map((element) => (
          <Card
            key={element.id}
            num={element.id}
            imgurl="https://picsum.photos/60"
            foodName={element.name}
            price={element.price}
            dsc={element.dsc}
          />
        ))
      }
    </div>
  )
}
