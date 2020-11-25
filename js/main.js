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

        // Injecting DIO e Bitcoin
        var textDio = "";
        textDio = textDio + `
            
        <div class="all-crypto">
            <img src="./img/dio-logo.png" alt="logo da moeda">
            <div class="assets">
                <div class="coin-symbol">(DIO)</div>
                <div class="coin-name">Digital Innovation.One</div>
                <div class="coin-rank">1</div>
                <div class="coin-price">${parseFloat(api.data[0].quote[`${fiat}`].price + 1150).toLocaleString('de-DE', { maximumFractionDigits: 2 })}</div>
                <div class="coin-volume">${parseFloat(api.data[0].quote[`${fiat}`].volume_24h + 1112500000).toLocaleString('de-DE', { maximumFractionDigits: 2 })}</div>
                <div class="coin-percent" style="color:green">${parseFloat(api.data[0].quote[`${fiat}`].percent_change_24h+12.85).toLocaleString('de-DE', { maximumFractionDigits: 2 })}</div>
            </div>
        </div>
        
        `;
        
        document.getElementById("coins-dio").innerHTML = textDio;



        var text = "";
        
        // GET coins and symbols
        for (let i = 0; i < 49; i++){

            var symbol = api.data[i].symbol.toLocaleString().toLowerCase();   
            var ranking = parseFloat(api.data[i].cmc_rank+1);
            var price = parseFloat(api.data[i].quote[`${fiat}`].price).toLocaleString('de-DE', { maximumFractionDigits: 2 });    
            var volume24H = parseFloat(api.data[i].quote[`${fiat}`].volume_24h).toLocaleString('de-DE', { maximumFractionDigits: 2 });
            var percChange24H = parseFloat(api.data[i].quote[`${fiat}`].percent_change_24h).toLocaleString('de-DE', { maximumFractionDigits: 2 });
            var percentColor = "green"; 
            
            if(parseFloat(percChange24H) < 0) percentColor = "red";
            
            var name = "";
            var nameResponse = api.data[i].name.split(" ");
            
            if (api.data[i].symbol === "DOT"){logoUrl = "https://cryptologos.cc/logos/polkadot-new-dot-logo.png?v=007";}
            else if (api.data[i].symbol === "LEO") {name = "https://cryptologos.cc/logos/unus-sed-leo-leo-logo.png?v=007";}                
            else if (api.data[i].symbol === "YFI") {name = "https://cryptologos.cc/logos/yearn-finance-yfi-logo.png?v=007";}                
            else if (api.data[i].symbol === "SNX") {name = "https://cryptologos.cc/logos/synthetix-network-token-snx-logo.png?v=007";}                
            else if (api.data[i].symbol === "CRO") {logoUrl = "https://cryptologos.cc/logos/crypto-com-mco-logo.png?v=007";}
            else if (api.data[i].symbol === "AAVE") {logoUrl = "https://cryptologos.cc/logos/aave-lend-logo.png?v=007";}                
            else if (api.data[i].symbol === "OMG") {logoUrl = "https://s2.coinmarketcap.com/static/img/coins/64x64/1808.png";}                
            else if (api.data[i].symbol === "REV") {logoUrl = "https://s2.coinmarketcap.com/static/img/coins/64x64/2135.png";}                
            else if (api.data[i].symbol === "BAT") {logoUrl = "https://cryptologos.cc/logos/basic-attention-token-bat-logo.png?v=007";}                
            else if (nameResponse.length > 1) {
                name = (nameResponse[0] + "-" + nameResponse[1]).toLocaleString().toLowerCase();
                var logoUrl =`https://cryptologos.cc/logos/${name}-${symbol}-logo.png?v=007`    
            } else {
                name = nameResponse[0].toLocaleString().toLowerCase();    
                var logoUrl =`https://cryptologos.cc/logos/${name}-${symbol}-logo.png?v=007`    
            }


        //Show API information
            text = text + `
            
            <div class="all-crypto">
                <img src="${logoUrl}" alt="logo da moeda">
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
            
            document.getElementById("coins").innerHTML = text;
        }    
    })
    .catch((error) => {
        console.error(error.message);
    });