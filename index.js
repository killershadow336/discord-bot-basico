require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ] 
});

client.commands = new Collection();

// Función para cargar comandos recursivamente desde subdirectorios
function loadCommands(dir) {
  const commandsPath = path.join(__dirname, dir);
  
  // Verificar si el directorio existe
  if (!fs.existsSync(commandsPath)) {
    console.log(`⚠️ Directorio no encontrado: ${dir}`);
    return;
  }

  const items = fs.readdirSync(commandsPath);
  
  for (const item of items) {
    const itemPath = path.join(commandsPath, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      // Si es una carpeta, cargar comandos recursivamente
      console.log(`📁 Cargando comandos desde: ${dir}/${item}/`);
      loadCommands(`${dir}/${item}`);
    } else if (item.endsWith('.js')) {
      // Si es un archivo .js, cargar el comando
      try {
        const command = require(`./${dir}/${item}`);
        if (command.data && command.data.name) {
          client.commands.set(command.data.name, command);
          console.log(`✅ Comando cargado: ${command.data.name} (${dir}/${item})`);
        } else {
          console.log(`⚠️ Comando sin data válida: ${dir}/${item}`);
        }
      } catch (error) {
        console.error(`❌ Error cargando comando ${dir}/${item}:`, error.message);
      }
    }
  }
}

// Cargar todos los comandos desde la carpeta commands y sus subdirectorios
console.log('🚀 Iniciando carga de comandos...');
loadCommands('commands');
console.log(`✅ Total de comandos cargados: ${client.commands.size}`);

client.once('ready', async () => {
  console.log(`✅ Bot listo como ${client.user.tag}`);

  // Configurar presencia personalizada
  client.user.setPresence({
    activities: [
      {
        name: 'tus comandos!',
        type: 0 // 0: Jugando, 1: Transmitiendo, 2: Escuchando, 3: Viendo, 5: Compitiendo
      }
    ],
    status: 'online' // 'online', 'idle', 'dnd', 'invisible'
  });

  // Opcional: Enviar mensaje de inicio al propietario
  if (process.env.OWNER_ID) {
    try {
      const owner = await client.users.fetch(process.env.OWNER_ID);
      const embed = new EmbedBuilder()
        .setColor(0x00ff99)
        .setTitle('✅ Bot Iniciado Correctamente')
        .setDescription('👋 ¡Hola! Tu bot ha sido iniciado exitosamente y ya está en línea.')
        .addFields(
          { name: '📛 Nombre del Bot', value: client.user.tag, inline: true },
          { name: '🆔 ID del Bot', value: client.user.id, inline: true },
          { name: '🌍 Servidores', value: `${client.guilds.cache.size}`, inline: true },
          { name: '🕒 Hora Local', value: new Date().toLocaleString(), inline: true },
          { name: '📦 Node.js', value: process.version, inline: true },
          { name: '🏠 Carpeta Actual', value: process.cwd(), inline: false }
        )
        .setFooter({ text: 'Desarrollado por ohiostate' })
        .setTimestamp();

      await owner.send({ embeds: [embed] });
    } catch (err) {
      console.error('❌ No se pudo enviar mensaje privado al propietario:', err);
    }
  }
});

// Manejar interacciones de comandos slash
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No se encontró comando que coincida con ${interaction.commandName}.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    const errorMessage = { 
      content: '¡Hubo un error al ejecutar este comando!', 
      ephemeral: true 
    };
    
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorMessage);
    } else {
      await interaction.reply(errorMessage);
    }
  }
});

// Manejo de errores
client.on('error', error => {
  console.error('Error del bot:', error);
});

process.on('unhandledRejection', error => {
  console.error('Promesa rechazada no manejada:', error);
});

// Iniciar sesión en Discord
client.login(process.env.BOT_TOKEN); 