const express = require('express');
const cors = require('cors');
const axios = require('axios').default;
const { pickDate, generateBtc, generateBrita } = require('./util');

const app = express();
app.use(cors());

const bcUrl = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)';
const btcUrl = 'https://www.mercadobitcoin.net/api/BTC/ticker/';

function getBcDollar(date) {
  const today = pickDate();
  return axios.get(bcUrl, {
    params: {
      '@dataCotacao': `'${today}'`,
      $top: 100,
      $format: 'json'
    }
  });
}

function getBtc() {
  return axios.get(btcUrl);
}

app.get('/coins', (req, res) => {
  axios
    .all([getBtc(), getBcDollar()])
    .then(
      axios.spread((btcResp, dollarResp) => {
        const response = {
          bitcoin: generateBtc(btcResp.data.ticker && btcResp.data.ticker),
          brita: generateBrita(dollarResp.data.value[0])
        };
        console.log('response: ', response);
        res.status(200).send(response);
      })
    )
    .catch(err => res.status(404));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server runing on port: ', PORT);
});
