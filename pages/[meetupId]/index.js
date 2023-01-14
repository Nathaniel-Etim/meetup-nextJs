import MeetupDetail from "../../components/meetups/MeetupDetails";

import { MongoClient, ObjectId } from "mongodb";

function MeetupDetiles(props) {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      address={props.meetupData.address}
      title={props.meetupData.title}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://Nathjoeetim:T3eJMssZEmea1gyk@cluster0.mgfyjzu.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupCollection = db.collection("meetups");
  const meetup = await meetupCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: true,
    paths: meetup.map((meetup) => {
      return {
        params: {
          meetupId: meetup._id.toString(),
        },
      };
    }),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://Nathjoeetim:T3eJMssZEmea1gyk@cluster0.mgfyjzu.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const selectedMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
      },
    },
  };
}

export default MeetupDetiles;
