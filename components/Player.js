import React, {useState, useEffect, useCallback} from 'react';
import {useRecoilState} from "recoil";
import { useSession } from 'next-auth/react';
import useSpotify from '../hooks/useSpotify';
import {currentTrackIdState, isPlayingState} from '../atoms/songAtom';
import useSongInfo from '../hooks/useSongInfo';
import {SwitchHorizontalIcon, RewindIcon, FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon, VolumeUpIcon} from "@heroicons/react/solid";
import {VolumeUpIcon as VolumeDownIcon, HeartIcon} from "@heroicons/react/outline";
import {debounce} from "lodash"


const Player = () => {
    const spotifyApi = useSpotify();
    const { data:session, status } = useSession();
    const [currentTrackId, setCurrentTrackId] = 
        useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] =
        useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50)
    const [like, setLike] = useState(false)
    
    const songInfo = useSongInfo();
    
    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then(data => {
                console.log("Current song playing",data.body?.item.id);
                setCurrentTrackId(data.body?.item.id);
               
                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing);
                })
            }); 
        }
    }

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            }else{
                spotifyApi.play();
                setIsPlaying(true);
            }
        })
    }
        
    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            // fetch my id
            fetchCurrentSong();
            setVolume(50);
        }
    }, [currentTrackIdState, spotifyApi, session]);

    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debounceAdjustVolume(volume);
        }
    }, [volume])
    
    const debounceAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((err) => {});
        }),500,[])

    return (
    <div className="grid h-24 grid-cols-3 px-2 text-xs text-white md:text-base md:px-8 bg-gradient-to-b from-black to-gray-900">
        {/* Left */}
        <div className="flex items-center space-x-4">
            <img className="hidden w-10 h-10 md:inline" src={songInfo?.album.images?.[0].url} alt="" />
            <HeartIcon className="button"/>
        <div>
            <h3>{songInfo?.name}</h3>
            <p>{songInfo?.artists?.[0]?.name}</p>
        </div>  
        </div>
        {/* center */}
        <div className="flex items-center justify-evenly">
            <SwitchHorizontalIcon className="button"/>
            <RewindIcon className="button"/>
            {isPlaying ? (<PauseIcon onClick={handlePlayPause} className='w-10 h-10'/> ):( <PlayIcon onClick={handlePlayPause} className='w-10 h-10'/>) }
            <FastForwardIcon className="button"/>
            <ReplyIcon className="button"/>
        </div>
        {/* Right */}
        <div className="flex items-center justify-end pr-5 space-x-3 md:space-x-4">
            <VolumeDownIcon onClick={()=> volume > 0 && setVolume(volume - 10)} className="button"/>
            <input className="w-14 md:w-28" onChange={(e)=>setVolume(Number(e.target.value))} type="range" value={volume} min={0} max={100} />
            <VolumeUpIcon onClick={()=> volume < 100 && setVolume(volume + 10)} className="button"/>
        </div>
    </div>
  );
};

export default Player;
