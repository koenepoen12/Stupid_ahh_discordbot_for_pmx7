import express from 'express';
import { InteractionType, InteractionResponseType } from 'discord.js';
import dotenv from 'dotenv';
import { getRandomYesNo } from './utils/utils.js';

dotenv.config();

const app = express();

app.use(express.json());

app.post('/interactions', (req, res) => {
    const { type, data } = req.body;

    console.log('Received Interaction:', req.body);  // Debugregel: Log inkomende interactie

    // Behandel de interacties (slash commands)
    if (type === InteractionType.APPLICATION_COMMAND) {
        const { name, user } = data;

        console.log(`Command ontvangen: ${name} van gebruiker: ${user.username}`); // Debugregel

        // Als het command 'isthisvalid' is
        if (name === 'isthisvalid') {
            const response = getRandomYesNo(user.id);

            console.log(`Antwoord voor ${user.username}: ${response}`);  // Debugregel

            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: response,
                },
            });
        }

        console.error(`Onbekend command: ${name}`);  // Debugregel
        return res.status(400).json({ error: 'Onbekend command' });
    }

    console.error('Geen geldige interactie ontvangen');  // Debugregel
    return res.status(400).json({ error: 'Geen geldige interactie ontvangen' });
});

app.listen(process.env.PORT, () => {
    console.log(`Bot luistert op poort ${process.env.PORT}`);  // Debugregel
});
