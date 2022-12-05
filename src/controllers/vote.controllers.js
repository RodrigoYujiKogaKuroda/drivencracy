import { ObjectId } from "mongodb";
import { choiceCollection, pollCollection, voteCollection } from "../database/db.js";

export async function postVote (req, res) {

    const vote = res.locals.vote;

    try {
        await voteCollection.insertOne(vote);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

}

export async function getVotes (req, res) {

    const pollId = req.params.id;

    const question = await pollCollection.findOne({ _id: new ObjectId(pollId) });
    if (!question) {
        res.sendStatus(404);
        return;
    }    
    const answers = await choiceCollection.find({ pollId: pollId }).toArray();
    const votes = await voteCollection.find().toArray();

    try {
        let count = 0
        let countArray = [];
        let biggestNumberIndex = 0;
        for (let i = 0; i < answers.length; i++) {
            let answerId = ObjectId(answers[i]._id).toString();
            count = votes.reduce((acc, cur) => cur.choiceId === answerId ? ++acc : acc, 0);
            countArray.push(count);
            if (count > countArray[biggestNumberIndex]) {
                biggestNumberIndex = i;
            }
            count = 0;
        }

        const result = {
            _id: pollId,
            title: question.title,
            expireAt: question.expireAt,
            result : {
                title: answers[biggestNumberIndex].title,
                votes: countArray[biggestNumberIndex]
	        }
        }
        res.send(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

}