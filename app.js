const searchSong = () => {
    const searchText = document.getElementById("search-box").value;
    const url = `https://api.lyrics.ovh/suggest/:${searchText}`
    fetch(url)
        .then(response => response.json())
        .then(data => displaySongs(data.data))
}
function displaySongs(songs) {
    const songList = document.getElementById("song-list");
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'class="single-result row align-items-center my-3 p-3"'
        console.log(songs);

        songDiv.innerHTML = `
        <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
       
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button class="btn btn-success">Get Lyrics</button>
    </div>
        `
        songList.appendChild(songDiv);
    });
}