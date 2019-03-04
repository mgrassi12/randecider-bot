import express from 'express';
import { log, randomlySelectAnOption } from './utils';

const router = new express.Router();

router.post('/slack/command/randy', async (req, res) => {
  try {
    const slackReqObj = req.body;
    const response = {
      response_type: 'in_channel',
      channel: slackReqObj.channel_id,
      text: 'Hello! My name is Randecider, but you can call me Randy! :slightly_smiling_face: If you would like me to make a decision for you, type "/decide <option1>; <option2>; <option3>..."',
    };
    return res.json(response);
  } catch (err) {
    log.error(err);
    return res.status(500).send('Uh oh, something went wrong. (500 /randy)');
  }
});

router.post('/slack/command/decide', async (req, res) => {
  try {
    const slackReqObj = req.body;
    const options = slackReqObj.text.split(';');
    const selectedOption = randomlySelectAnOption(options);
    const response = {
      response_type: 'in_channel',
      channel: slackReqObj.channel_id,
      attachments: [{
        text: selectedOption,
        fallback: 'I did not understand that.',
        color: '#2c963f',
        attachment_type: 'default',
        callback_id: 'randy_decision',
      }],
    };
    return res.json(response);
  } catch (err) {
    log.error(err);
    return res.status(500).send('Uh oh, something went wrong. (500 /decide)');
  }
});

//TODO: add ability to weight options differently

export default router;
