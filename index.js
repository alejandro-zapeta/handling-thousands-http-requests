const axios = require('axios');
const howManyChunks = 30;// Play around with this value, depends on your server/cpu/etc
const createList = (n) => [...new Array(n)].map((item, i) => i + 1);
const splitToChunks = (items, chunkSize) => {
  const result = [];
  for (let i = 0; i < items.length; i+= chunkSize) {
    result.push(items.slice(i, i + chunkSize));
  }
  return result;
};

async function processRequests() {
  const theList = createList(1000); // fake list
  const chunksToProcess = splitToChunks(theList, howManyChunks);// just a loop to split into arrays
  const dateStart = Date.now();
  await chunks(chunksToProcess, doTheFetch);
  console.log(`Finished... Fetch time: ${Date.now() - dateStart} ms`);
}
function chunks(chunksList, doTheFetch) {
  return new Promise((resolve, reject)=> {
    let result = [];
    // The reduce function plus the 2 lines with the 'does the magic', do the trick.
    chunksList.reduce(async (previousPromise, theChunk) => {
      await previousPromise; // This one does the magic...
      const promises = theChunk.map((item) => doTheFetch(item, {}));
      const myResult = await Promise.all(promises); // parallel fashion
      result = result.concat(myResult); // Recommended
      return Promise.resolve; // This one does the magic...
    }, Promise.resolve()).then(()=> resolve(result)).catch((ertt)=> reject(ertt));
  });
}
// Receive an id, and params if it's necessary.
const doTheFetch = (id, objParams = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `https://jsonplaceholder.typicode.com/photos/${id}`;
      const response = await axios.get(url);
      resolve({success: true, data: response.data});
    } catch (ext) {
      // Be aware here, at first rejection, the Promise.all will stop immediatly, you could do somethink like resolve({success:false});
      reject(ext);
    }
  });
};

processRequests();
