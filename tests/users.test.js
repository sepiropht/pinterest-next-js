const axios = require("axios");
const server = require("../server");

let serverTest;
beforeAll(async () => serverTest = await server());

afterAll(done => serverTest.close(done));

test("can get images", async () => {
  const res = await axios.get("http://localhost:3000/images");
  console.log(res.data);
});
