import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const commands = [
    {
        name: 'isthisvalid',
        description: 'Krijg een willekeurig YES of NO antwoord.',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('🔄 Bezig met registreren van commands...');  // Debugregel
        await rest.put(
            Routes.applicationCommands(process.env.BOT_ID),
            { body: commands }
        );
        console.log('✅ Commands succesvol geregistreerd!');  // Debugregel
    } catch (error) {
        console.error('❌ Fout bij registreren:', error);  // Debugregel
    }
})();
