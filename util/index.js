const transformToNumber = n => parseFloat(n).toFixed(2);

const pickDate = () => {
  const date = new Date();
  const d = date.getDate() - 1;
  const m = date.getMonth() + 1;
  const year = date.getFullYear();
  function fixUnder10(n) {
    return n < 10 ? `0${n}` : String(n);
  }
  const dd = fixUnder10(d) || '';
  const mm = fixUnder10(m) || '';
  return `${mm}-${dd}-${year}`;
};

const generateBtc = req => {
  return {
    compra: transformToNumber(req.buy) || 0,
    venda: transformToNumber(req.sell) || 0
  };
};

const generateBrita = req => {
  return {
    compra: transformToNumber(req.cotacaoCompra) || 0,
    venda: transformToNumber(req.cotacaoVenda) || 0
  };
};

module.exports = {
  pickDate,
  generateBtc,
  generateBrita
};
