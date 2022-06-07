const express = require('express');
const app = express();
const port = 3000;
const { participantsList } = require('./data.json');
const nodemailer = require('nodemailer');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let eligibleParticipantsList = [];


async function checkParticipants(participantsList) {
  participantsList.forEach(participant => {
    if (
      (!participant?.isScientist &&
        !participant?.isProf &&
        !participant?.isStudent) ||
      participant?.coAuthNr > 2
    ) {
      return;
    }

    eligibleParticipantsList.push(participant);
  });
}

async function sendInvitations(participants) {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    },
  });
  await Promise.all(participants.map(async (participant) => {
    await sendInvitation(transporter, participant);
  }));
}

async function sendInvitation(transporter, participant) {
  await transporter.sendMail({
    from: 'gigel_Frana@gmail.com',
    to: participant.email,
    subject: "Invitation",
    text: "You have been invited to participate to this event",
  });
}

app.get('/', async (req, res) => {
  console.log(participantsList)
  await res.send('Hello World!');
});

app.get('/participants', async (req, res) => {
  if (participantsList.length === 0) res.send('NO PARTICIPANT FOUND!');
  else {
    await checkParticipants(participantsList);
    res.send(eligibleParticipantsList);
  }
});

app.post('/participants/invite', async (req,res) => {
  if(eligibleParticipantsList.length === 0) {
    res.send('NO ELIGIBLE PARTICIPANTS TO SEND INVITATIONS!');
  }
  await sendInvitations(eligibleParticipantsList);
  res.send('Invitations sent');
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
