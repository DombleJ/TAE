const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let eligibleParticipantsList = [];
const participantsList = [
  {
    fullname: 'Mihai Bogdan',
    email: 'mihaibogdan@gmail.com',
    isScientist: false,
    isStudent: false,
    isProf: true,
    coAuthNr: 2,
  },
  {
    fullname: 'Andrei Firicel',
    email: 'andreifiricel@gmail.com',
    isScientist: true,
    isStudent: false,
    isProf: false,
    coAuthNr: 5,
  },
  {
    fullname: 'Sebastian Andi',
    email: 'sebyandie@gmail.com',
    isScientist: false,
    isStudent: false,
    isProf: false,
    coAuthNr: 1,
  },
  {
    fullname: 'Gabriel Tonita',
    email: 'gabrieltonita@gmail.com',
    isScientist: false,
    isStudent: false,
    isProf: false,
    coAuthNr: 1,
  },
  {
    fullname: 'Dragos Tutu',
    email: 'dragostutu@gmail.com',
    isScientist: false,
    isStudent: true,
    isProf: false,
    coAuthNr: 1,
  },
];

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

app.get('/', async (req, res) => {
  await res.send('Hello World!');
});

app.get('/participants', async (req, res) => {
  if (participantsList.length === 0) res.send('NO PARTICIPANT FOUND!');
  else {
    await checkParticipants(participantsList);
    res.send(eligibleParticipantsList);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
