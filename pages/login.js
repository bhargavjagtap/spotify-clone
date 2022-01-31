import React from 'react';
import {getProviders, signIn} from "next-auth/react";

const login = ({providers}) => {
  return (
    //justify-center vetical axis of flex items-center horizontal axis
  <div className='flex flex-col items-center justify-center w-full min-h-screen p-10 bg-black'>
      <img className="mb-5 w-52" src="https://links.papareact.com/9xl" alt="" />

      {Object.values(providers).map((provider) => (
          <div key={provider.name} className=''>
            <button className='bg-[#18D860] text-white p-5 rounded-full' onClick={()=>{signIn(provider.id, {callbackUrl: "/"})}}>Login with {provider.name}</button>
          </div>
      ))}
  </div>    
  );
};

export default login;

//whenever using ServerSideProps, u need to get providers from the props above
export async function getServerSideProps(){
    const providers = await getProviders();
    return {
        props:{
            providers
        }
    }
}