import React,{useState, useEffect} from 'react';
import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    HeartIcon,
    RssIcon,
    LogoutIcon
} from "@heroicons/react/outline"
import { signOut, useSession } from 'next-auth/react';
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';

const Sidebar = () => {
    const spotifyApi = useSpotify();
    const { data:session } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setplaylistId] = useRecoilState
    (playlistIdState);
            
    console.log("Session ==> ",session);
    console.log("You picked playlist ==>",playlistId);
    
    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists().then((data) => {
            setPlaylists(data.body.items);
            });
        }
    }, [session, spotifyApi])

    return (
    <div className='pb-36 h-screen p-5 overflow-y-scroll text-xs text-gray-500 border-r border-gray-900 scrollbar-hide lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex'>
        <div className='space-y-4'>    
            {/* <button className='flex items-center space-x-2 hover:text-white' onClick={() => signOut()}>
                <LogoutIcon className="w-5 h-5" />
                <p className='ml-1'>Logout</p>
            </button> */}
            <button className='flex items-center space-x-2 hover:text-white'>
                <HomeIcon className="w-5 h-5" />
                <p className='ml-1'>Home</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>            
                <SearchIcon className="w-5 h-5" />
                <p className='ml-1'>Search</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <LibraryIcon className="w-5 h-5" />
                <p className='ml-1'>Your Library</p>
            </button>
            <hr className='border-t-[0.1px] border-gray-900' />
            <button className='flex items-center space-x-2 hover:text-white'>
                <PlusCircleIcon className="w-5 h-5" />
                <p className='ml-1'>Create Playlist</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <HeartIcon className="w-5 h-5" />
                <p className='ml-1'>Liked Songs</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <RssIcon className="w-5 h-5" />
                <p className='ml-1'>Your Episodes</p>
            </button>
            <hr className='border-t-[0.1px] border-gray-900' />
            {/* Playlists */}
            {playlists.map((playlist) => (
                <p key={playlist.id} onClick={()=>setplaylistId(playlist.id)} className='cursor-pointer hover:text-white'>{playlist.name}</p>
            ))}
        </div>
    </div>
  );
};

export default Sidebar;
