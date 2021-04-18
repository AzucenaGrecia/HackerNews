const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://testguy:Google2349@cluster0.vk6rw.mongodb.net/ReignProyect?retryWrites=true&w=majority";
const client = new MongoClient(url, { useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
