const axios = require("axios");

module.exports = async function list() {
    const res = await axios.get("/api/queues");
    console.log(res.data.map(queue => queue.name));
};
