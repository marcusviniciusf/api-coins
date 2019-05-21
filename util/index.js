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

module.exports = {
  pickDate
};
