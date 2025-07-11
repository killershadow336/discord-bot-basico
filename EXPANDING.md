# 🚀 Expandiendo tu Bot de Discord

Esta guía te ayudará a agregar más funcionalidades a tu template de bot de Discord.

## 📁 Agregando Nuevas Categorías de Comandos

1. **Crea una nueva carpeta de categoría** en el directorio `commands/`:
   ```bash
   mkdir commands/moderation
   mkdir commands/economy
   mkdir commands/music
   ```

2. **Agrega comandos a la nueva categoría** siguiendo la misma estructura que los comandos existentes.

3. **Actualiza el comando help** para incluir la nueva categoría.

## 🎮 Creando Nuevos Comandos

### Plantilla Básica de Comando
```javascript
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nombrecomando')
    .setDescription('Descripción de tu comando')
    .addStringOption(option =>
      option.setName('parametro')
        .setDescription('Descripción del parámetro')
        .setRequired(true)),
    
  async execute(interaction) {
    const parametro = interaction.options.getString('parametro');
    
    // Tu lógica del comando aquí
    
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle('Título del Comando')
      .setDescription('Resultado del comando')
      .setTimestamp();
    
    await interaction.reply({ embeds: [embed] });
  }
};
```

### Opciones de Comandos
- **String**: `addStringOption()`
- **Integer**: `addIntegerOption()`
- **Boolean**: `addBooleanOption()`
- **User**: `addUserOption()`
- **Channel**: `addChannelOption()`
- **Role**: `addRoleOption()`
- **Attachment**: `addAttachmentOption()`

## 🗄️ Agregando Soporte de Base de Datos

### Ejemplo SQLite
```bash
npm install sqlite3
```

```javascript
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/bot.db');

// Crear tablas
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 0
  )`);
});
```

### Ejemplo MongoDB
```bash
npm install mongoose
```

```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bot');

const UserSchema = new mongoose.Schema({
  userId: String,
  guildId: String,
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 0 }
});

const User = mongoose.model('User', UserSchema);
```

## 🎵 Agregando Funciones de Música

### Configuración Básica de Bot de Música
```bash
npm install @discordjs/voice ytdl-core play-dl
```

```javascript
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const play = require('play-dl');

// Unirse al canal de voz
const connection = joinVoiceChannel({
  channelId: channel.id,
  guildId: channel.guild.id,
  adapterCreator: channel.guild.voiceAdapterCreator,
});

// Reproducir música
const stream = await play.stream(url);
const resource = createAudioResource(stream.stream, { inputType: stream.type });
const player = createAudioPlayer();
player.play(resource);
connection.subscribe(player);
```

## 🎯 Agregando Manejadores de Eventos

Crea un nuevo archivo en el directorio `events/`:

```javascript
// events/messageCreate.js
module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (message.author.bot) return;
    
    // Tu lógica del evento aquí
    console.log(`${message.author.tag} dijo: ${message.content}`);
  },
};
```

Actualiza `index.js` para cargar eventos:

```javascript
// Cargar eventos
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}
```

## 🔧 Agregando Gestión de Configuración

Crea un sistema de configuración:

```javascript
// config/config.js
module.exports = {
  bot: {
    token: process.env.BOT_TOKEN,
    clientId: process.env.CLIENT_ID,
    ownerId: process.env.OWNER_ID
  },
  
  features: {
    levels: {
      enabled: true,
      xpPerMessage: 15,
      cooldown: 60000
    },
    
    welcome: {
      enabled: true,
      channelId: process.env.WELCOME_CHANNEL_ID
    }
  }
};
```

## 🛡️ Agregando Sistemas de Permisos

```javascript
// utils/permissions.js
const { PermissionFlagsBits } = require('discord.js');

function checkPermission(member, permission) {
  return member.permissions.has(permission);
}

function isAdmin(member) {
  return member.permissions.has(PermissionFlagsBits.Administrator);
}

function isModerator(member) {
  return member.permissions.has(PermissionFlagsBits.ModerateMembers);
}

module.exports = { checkPermission, isAdmin, isModerator };
```

## 📊 Agregando Analíticas

```javascript
// utils/analytics.js
class Analytics {
  constructor() {
    this.commandUsage = new Map();
    this.serverStats = new Map();
  }
  
  logCommand(commandName, userId, guildId) {
    if (!this.commandUsage.has(commandName)) {
      this.commandUsage.set(commandName, 0);
    }
    this.commandUsage.set(commandName, this.commandUsage.get(commandName) + 1);
  }
  
  getStats() {
    return {
      totalCommands: Array.from(this.commandUsage.values()).reduce((a, b) => a + b, 0),
      commandUsage: Object.fromEntries(this.commandUsage)
    };
  }
}

module.exports = Analytics;
```

## 🔄 Agregando Tareas Programadas

```bash
npm install node-cron
```

```javascript
const cron = require('node-cron');

// Ejecutar todos los días a medianoche
cron.schedule('0 0 * * *', () => {
  console.log('Ejecutando mantenimiento diario...');
  // Tus tareas de mantenimiento aquí
});

// Ejecutar cada hora
cron.schedule('0 * * * *', () => {
  console.log('Ejecutando tareas horarias...');
  // Tus tareas horarias aquí
});
```

## 🌐 Agregando Dashboard Web

```bash
npm install express ejs
```

```javascript
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('dashboard', {
    bot: client.user,
    servers: client.guilds.cache.size,
    users: client.users.cache.size
  });
});

app.listen(3000, () => {
  console.log('Dashboard ejecutándose en puerto 3000');
});
```

## 📝 Mejores Prácticas

1. **Manejo de Errores**: Siempre envuelve tu código en bloques try-catch
2. **Limitación de Tasa**: Implementa cooldowns para comandos
3. **Logging**: Usa logging apropiado para debugging
4. **Seguridad**: Nunca expongas información sensible
5. **Documentación**: Comenta tu código y mantén documentación
6. **Testing**: Prueba tus comandos antes de desplegarlos
7. **Backup**: Haz backup regularmente de tus datos
8. **Actualizaciones**: Mantén las dependencias actualizadas

## 🚀 Opciones de Despliegue

### Desarrollo Local
```bash
npm start
```

### Usando PM2 (Producción)
```bash
npm install -g pm2
pm2 start index.js --name "discord-bot"
pm2 startup
pm2 save
```

### Usando Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
```

## 📚 Recursos Adicionales

- [Guía de Discord.js](https://discordjs.guide/)
- [Portal de Desarrolladores de Discord](https://discord.com/developers/docs)
- [Documentación de Discord.js](https://discord.js.org/#/docs/main/stable)
- [Documentación de Node.js](https://nodejs.org/docs/)

---

**¡Feliz programación! 🎉** 