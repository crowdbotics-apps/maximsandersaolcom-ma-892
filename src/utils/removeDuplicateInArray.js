
const uniq = (a, param) => a.filter((item, pos, array) => array.map(mapItem => mapItem[param]).indexOf(item[param]) === pos);

export default uniq;
