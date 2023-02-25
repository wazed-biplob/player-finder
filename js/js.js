

const loadPlayerData = (id) => {
    const playerName = document.getElementById('player-name').value;


    const searchName = id || playerName;
    const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchName}`;
    
    document.getElementById('spinner').classList.remove('d-none');

    fetch(url)
    .then(res => res.json())
    .then(data => {
      
        displayPlayerData(data);
        document.getElementById('spinner').classList.add('d-none');
    })
}


const card = document.getElementById('player-container');


const displayPlayerData = (data) => {
    data = data.player;
    card.innerHTML = '';
    data.forEach(player => {
    console.log(player);
    const {strThumb, strPlayer, strNationality, idPlayer} = player;
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card">
    <img src="${strThumb ? strThumb : "https://picsum.photos/200/300"}" class="card-img-top" alt="player picture">
    <div class="card-body">
        <h5 class="card-title">${strPlayer}</h5>
        <p class="card-text">Nationality : ${strNationality}</p>
        <btn onclick="singlePlayer('${idPlayer}')" class='btn btn-primary'>Details</btn>
        <btn onclick="removePlayer();" class='btn btn-danger'>Remove</btn>
    </div>
    </div>
    `
    card.appendChild(div);

    })  
 
}

const singlePlayer = (idPlayer) => {
    const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${idPlayer}`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data.players[0]);
        displayPlayerFullData(data.players[0]);
         })
}

const displayPlayerFullData = (data) => {
    const container = document.getElementById('player-full-info');
    container.innerHTML = '';
    const div = document.createElement('div');

    const {strThumb, strPlayer, strDescriptionEN, strGender} = data;
    console.log(strGender);
    if (strGender == 'Male') { 
        document.getElementById('male').classList.remove('d-none');
        document.getElementById('male').classList.add('d-none', true);

    } else if (strGender == 'Female') {      
          document.getElementById('female').classList.remove('d-none');
          document.getElementById('male').classList.add('d-none', true);
    

    }

    div.innerHTML = `
    <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src='${strThumb}' class="img-fluid rounded-start" alt="player picture">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${strPlayer}</h5>
          <p class="card-text">${strDescriptionEN.slice(0, 100)}...</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>
    `
    container.appendChild(div);
}


loadPlayerData('messi');