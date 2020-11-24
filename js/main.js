// API Key
var apiKey = {
    key = '78aa6893-dd2e-47b7-8831-d6d7b0b106b1'
}

// Method GET Fetch Request
fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=' + 
        apiKey.key)
        .then((response)=> {
            if (response.ok) throw new Error ('Erro ao executar a requisição, status ' + response.status);
            return response.json();
        })
        .then((api) => {
            
            var texto = "";

            //GET 10 coins and symbols
            for (i = 0; i < 10; i++){

                console.log(api);

            //Show API information
                texto = texto + `
                <div class="media">
                    <img src="./img/coin.jpg" class="align-self-center mr-1" alt="coin" width="100" height="60">
                    <div class="media-body">
                        <h5 class="mt-2">${api.data[i].name}</h5>
                        <p>${api.data[i].symbol}</p>
                    </div>
                </div>
                
                `;
                
                document.getElementById("coins").innerHTML = texto;
            }    
        })
        .catch((error)=> {
            console.error(error.message);
        });

