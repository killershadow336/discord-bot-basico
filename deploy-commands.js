require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');
const path = require('node:path');

// Función para cargar comandos recursivamente desde subdirectorios
function loadCommandsRecursively(dir) {
  const commands = [];
  const commandNames = new Set();
  const commandsPath = path.join(__dirname, dir);
  
  // Verificar si el directorio existe
  if (!fs.existsSync(commandsPath)) {
    console.log(`⚠️ Directorio no encontrado: ${dir}`);
    return commands;
  }

  const items = fs.readdirSync(commandsPath);
  
  for (const item of items) {
    const itemPath = path.join(commandsPath, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      // Si es una carpeta, cargar comandos recursivamente
      console.log(`📁 Cargando comandos desde: ${dir}/${item}/`);
      const subCommands = loadCommandsRecursively(`${dir}/${item}`);
      commands.push(...subCommands);
    } else if (item.endsWith('.js')) {
      // Si es un archivo .js, cargar el comando
      try {
        const command = require(`./${dir}/${item}`);
        
        if (!command.data || !command.data.name) {
          console.warn(`⚠️ Archivo ignorado (sin data o name): ${dir}/${item}`);
          continue;
        }

        if (commandNames.has(command.data.name)) {
          console.warn(`⚠️ Comando duplicado ignorado: ${command.data.name} (${dir}/${item})`);
          continue;
        }

        commands.push(command.data.toJSON());
        commandNames.add(command.data.name);
        console.log(`✅ Comando registrado: ${command.data.name} (${dir}/${item})`);
      } catch (error) {
        console.error(`❌ Error cargando comando ${dir}/${item}:`, error.message);
      }
    }
  }
  
  return commands;
}

// Cargar todos los comandos desde la carpeta commands y sus subdirectorios
console.log('🚀 Iniciando carga de comandos para registro...');
const commands = loadCommandsRecursively('commands');
console.log(`✅ Total de comandos a registrar: ${commands.length}`);

// Inicializar REST y registrar
const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log('🔄 Actualizando comandos de aplicación...');
    
    if (process.env.GUILD_IDS) {
      // Registrar comandos para servidores específicos (actualizaciones más rápidas)
      const guildIds = process.env.GUILD_IDS.split(',');
      for (const guildId of guildIds) {
        await rest.put(
          Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId.trim()),
          { body: commands }
        );
        console.log(`✅ Comandos registrados para servidor: ${guildId.trim()}`);
      }
    } else {
      // Registrar comandos globalmente (puede tomar hasta 1 hora en actualizarse)
      await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commands }
      );
      console.log('✅ Comandos registrados globalmente (puede tomar hasta 1 hora en actualizarse)');
    }
    
    console.log('✅ Todos los comandos registrados exitosamente.');
  } catch (error) {
    console.error('❌ Error registrando comandos:', error);
  }
})(); 