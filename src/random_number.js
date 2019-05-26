const https = require("https");
const ethers = require("ethers");
const fs = require("fs");

const root = "/iexec_out";
const determinismFilePath = `${root}/determinism.iexec`;
const callbackFilePath = `${root}/callback.iexec`;
const errorFilePath = `${root}/error.iexec`;

const query = {
  method: "GET",
  port: 443,
  host: `https://www.random.org`,
  path: `/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new`
};

new Promise((resolve, reject) => {
  const request = https.request(query, response =>
    response.on("data", resolve)
  );
  request.on("error", reject);
  request.end();
})
  .then(data => {
    console.log("Data ", data);
    const iexecEncode = ethers.utils.defaultAbiCoder.encode(
      ["string"],
      [data.toString()]
    );
    const iexecHash = ethers.utils.keccak256(iexecEncode);
    fs.writeFile(callbackFilePath, iexecEncode, err => {});
    fs.writeFile(determinismFilePath, iexecHash, err => {});
  })

  .catch(error => {
    fs.writeFile(errorFilePath, error.toString(), err => {});
    fs.writeFile(
      determinismFilePath,
      ethers.utils.solidityKeccak256(["string"], [error.toString()]),
      err => {}
    );
  });
