import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Card2 from './Card2'
import { redirect } from 'react-router-dom';

const ViewAll = (props) => {
  let navigateTo = useNavigate();
  let [array,setArray] = useState([]);
  let xyz = async() => {
    props.loading(true);
    let response = await fetch("https://scholarlybackend.adaptable.app/scholarhips/getAll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    let data = await response.json();
    console.log(data)
    setArray(data);
    props.loading(false);
  }
  useEffect(() => {
    xyz();
  },[])
  return (
    <div className='bg-gray-900 h-[102.3vh] w-[109.6vw] -mt-12'>
    <div className='mt-[8.6vh] bg-gray-900 px-10 py-20 flex gap-5 flex-wrap items-center justify-around'>
      {props.username.length === 0 && navigateTo('/login')}
      {array.map(Card2)}
    </div>
    </div>
  )
}

export default ViewAll
