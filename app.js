document.getElementById("search-box")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        searchSong();
    }
});
const searchSong = async() => {
    const searchText = document.getElementById("search-box").value;
    const url = `https://api.lyrics.ovh/suggest/:${searchText}`
    fetch(url)
        .then(response => response.json())
        .then(data => displaySongs(data.data))
        .catch(error=>displayError('sorry! something went wrong'))
    // const res=await fetch(url);
    // const data=await res.json();
    // displaySongs(data.data);
}
function displaySongs(songs) {
    const songList = document.getElementById("song-list");
    songList.innerHTML=''
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'class="single-result row align-items-center my-3 p-3"'
        // console.log(songs);

        songDiv.innerHTML = `
        <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls>
        <source src="${song.preview}" type="audio/mpeg">
        </audio>
       
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button onclick=" getLyrics('${song.artist.name}','${song.title}') " class="btn btn-success">Get Lyrics</button>
    </div>
        `
        songList.appendChild(songDiv);
    });
}
const getLyrics=async(artist,title)=>{
    const url =`https://api.lyrics.ovh/v1/:${artist}/:${title}`
    // fetch(url)
    // .then(response=>response.json())
    // .then(data=>displayLyrics(data.lyrics))

    try{
        const response=await fetch(url);
        const data=await response.json();
        displayLyrics(data.lyrics);
    }
    catch(error){
        displayError('sorry! can not getting the lyrics')
    }
    
}
const displayLyrics=(lyrics)=>{
    const songLyrics=document.getElementById("songLyrics");
    songLyrics.innerText=lyrics;
}
const displayError=error=>{
    const error1=document.getElementById('error-id');
    error1.innerText=error;
}