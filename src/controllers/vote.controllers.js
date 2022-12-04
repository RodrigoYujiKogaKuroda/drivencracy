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

    const vote = res.locals.vote;
    const pollId = req.params.id;

    const choice = await choiceCollection.findOne({ _id: new ObjectId(vote.choiceId) });

    const question = await pollCollection.findOne({ _id: new ObjectId(pollId) });
    if (!question) {
        res.sendStatus(404);
        return;
    }

    const answers = await choiceCollection.find({ pollId: pollId }).toArray();

    let modeMap = {};
    let maxEl = answers[0].choiceId;
    let maxTitle = answers[0].title;
    let maxCount = 1;
    for(let i = 0; i < answers.length; i++)
    {
        let el = answers[i].choiceId;
        if(modeMap[el] === null) {
            modeMap[el] = 1;
        } else {
            modeMap[el]++;
        }
        if(modeMap[el] > maxCount) {
            maxEl = el;
            maxTitle = answers[i].title;
            maxCount = modeMap[el];
        }
    }

    try {
        const result = {
            _id: pollId,
            title: question.title,
            expireAt: question.expireAt,
            result : {
                title: maxTitle,
                votes: maxCount
	        }
        }
        res.send(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}