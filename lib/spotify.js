import SpotifyWebApi from "spotify-web-api-node"

const scopes = [
    "user-read-email",
    "user-read-private",
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-modify-playback-state",
    "streaming",
    "user-library-read",
    "playlist-read-collaborative",
    "playlist-read-private",
].join(',');

const params = {
    scope: scopes,
}

const queryParamString = new URLSearchParams(params);toString();    

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;
// "https://accounts.spotify.com/authorize?" + queryParamString.toString();

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi;  

export { LOGIN_URL };