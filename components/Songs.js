import React from 'react';
import {useRecoilValue} from 'recoil';
import {playlistState} from '../atoms/playlistAtom';
import Song from "./Song";

function Songs() {
  const playlists = useRecoilValue(playlistState);

  return (
  <div className="text-white">
    {playlists?.tracks.items.map((track, i) => (
      <Song key={track.track.id} track={track} order={i} />
      // <div className='flex'><img className='w-10 h-10 ' src={track.track.album.images[0].url} alt="" />{track.track.name}</div>
    ))}
  </div>
  );
}

export default Songs;
