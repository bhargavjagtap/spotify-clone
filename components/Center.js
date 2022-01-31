import React,{useEffect, useState} from 'react';
import { signOut, useSession } from 'next-auth/react';
import {ChevronDownIcon} from "@heroicons/react/outline"
import {shuffle} from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from '../components/Songs';

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
]

const Center = () => {
    const {data:session} = useSession();
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(null)
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState)
    
    // console.log("user image",session?.user?.image?.url);
  
    //whenever component/page loads we use useEffect to load the data
    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [playlistId])
    
    useEffect(() => {
        spotifyApi
            .getPlaylist(playlistId)
            .then((data) => { 
                setPlaylist(data.body);
        })
        .catch((err) => console.log("Something went wrong",err));
    }, [spotifyApi, playlistId]);

    console.log(playlist);
    return (
      //flex-grow so that it can expand to fill the space
  <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className='absolute right-8 top-5'>
          <div className='flex items-center p-1 pr-2 space-x-3 text-white bg-black rounded-full cursor-pointer opacity-90 hover:opacity-80' onClick={() => signOut()}>
              <img className="w-10 h-10 rounded-full" src="https://media.istockphoto.com/photos/young-handsome-african-man-wearing-headphones-listening-to-music-and-picture-id1320722438?b=1&k=20&m=1320722438&s=170667a&w=0&h=7bJUiK2c6k3GaWIeUOjaJw0B090nxqlGYU_vhK300WY=" alt="userimage" />
              <h2>{session?.user?.name}</h2>
              <ChevronDownIcon className="w-5 h-5"/>
          </div>
      </header>

      <section className={`flex items-end p-8 text-white space-x-7 bg-gradient-to-b to-black ${color} h-80`}>
          <img className="shadow-2xl h-44 w-44" src={playlist?.images?.[0].url} alt="" />
          <div>
              <p>PLAYLIST</p>
              <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">{playlist?.name}</h1>
          </div>
      </section>
      <div>
          <Songs />
      </div>
  </div>
  );
};

export default Center;
