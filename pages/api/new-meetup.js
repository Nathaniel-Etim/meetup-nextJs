import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === `POST`) {
    try {
      // the req contain data about the incoming requets
      //  the response will be neede for sending back the response

      const data = req.body;
      // the body contain the data for the incoming request

      const client = await MongoClient.connect(
        "mongodb+srv://Nathjoeetim:T3eJMssZEmea1gyk@cluster0.mgfyjzu.mongodb.net/meetups?retryWrites=true&w=majority"
      );
      const db = client.db();

      const meetupsCollection = db.collection("meetups");

      const result = await meetupsCollection.insertOne(data);

      client.close();

      res.status(201).json({ message: "meetup inserted" });
    } catch (error) {
      console.log(error);
    }
  }
}

export default handler;
