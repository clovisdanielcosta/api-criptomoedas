// API Key
var apiKey = {
    key: '78aa6893-dd2e-47b7-8831-d6d7b0b106b1'
}

var fiat = 'USD';
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
        // GET 10 coins and symbols
        for (let i = 0; i < 10; i++){
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
        var price = parseFloat(api.data[i].quote[`${fiat}`].price).toLocaleString('de-DE', { maximumFractionDigits: 2 });    

        //Show API information
            texto = texto + `
            
            <div class="all-crypto">
                <img src="https://cryptologos.cc/logos/${name}-${symbol}-logo.png?v=007" class="align-self-center mr-3" alt="coin" width="30" height="30">
                <div class="assets">
                <h5 class="name">${api.data[i].name}</h5>
                <p class="symbol">${api.data[i].symbol}</p>
                <p class="price">${price}</p>
                </div>
            </div>
            
            `;
            
            document.getElementById("coins").innerHTML = texto;
        }    
    })
    .catch((error) => {
        console.error(error.message);
    });