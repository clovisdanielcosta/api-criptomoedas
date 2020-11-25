// API Key
var apiKey = {
    key: '78aa6893-dd2e-47b7-8831-d6d7b0b106b1'
}

var fiat = "BRL";

// Method GET Fetch Request
fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=' + 
    apiKey.key + `&convert=${fiat}`)
    .then((response) => {
        if (!response.ok) throw new Error ('Erro ao executar a requisição, status ' + response.status);
        return response.json();
    })
    .then((api) => {
        console.log(api);    
        var texto = "";
        
        // GET coins and symbols
        for (let i = 0; i < 50; i++){
        var name = "";
        var nameResponse =  api.data[i].name.split(" ");
        if (api.data[i].symbol === "DOT") {
            name = "polkadot-new";
        } else if (nameResponse.length > 1) {
            name = (nameResponse[0] + "-" + nameResponse[1]).toLocaleString().toLowerCase();
        } else {    
            name = nameResponse[0].toLocaleString().toLowerCase();    
        }
        var symbol = api.data[i].symbol.toLocaleString().toLowerCase();   
        var ranking = parseFloat(api.data[i].cmc_rank);
        var price = parseFloat(api.data[i].quote[`${fiat}`].price).toLocaleString('de-DE', { maximumFractionDigits: 3 });    
        var percChange24H = parseFloat(api.data[i].quote[`${fiat}`].percent_change_24h).toLocaleString('de-DE', { maximumFractionDigits: 2 });
        var volume24H = parseFloat(api.data[i].quote[`${fiat}`].volume_24h).toLocaleString('de-DE', { maximumFractionDigits: 2 });
        var percentColor = "green"; 
        if(parseFloat(percChange24H) < 0) percentColor = "red";
        //Show API information
            texto = texto + `
            
            <div class="all-crypto">
                <img src="https://cryptologos.cc/logos/${name}-${symbol}-logo.png?v=007" alt="logo da moeda">
                <div class="assets">
                    <div class="coin-symbol">(${symbol.toUpperCase()})</div>
                    <div class="coin-name">${api.data[i].name}</div>
                    <div class="coin-rank">${ranking}</div>
                    <div class="coin-price">${price}</div>
                    <div class="coin-volume">${volume24H}</div>
                    <div class="coin-percent" style="color:${percentColor}">${percChange24H}</div>
                </div>
            </div>
            
            `;
            
            document.getElementById("coins").innerHTML = texto;
        }    
    })
    .catch((error) => {
        console.error(error.message);
    });