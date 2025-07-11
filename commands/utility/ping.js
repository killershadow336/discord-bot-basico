const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const os = require('os');
const { version: djsVersion } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('📡 Muestra información de latencia y estado del bot'),

  async execute(interaction) {
    await interaction.reply({ content: '📡 Calculando ping...' });
    const sent = await interaction.fetchReply();

    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    const apiPing = interaction.client.ws.ping;
    const uptime = formatUptime(interaction.client.uptime);
    const memory = process.memoryUsage().heapUsed / 1024 / 1024;
    const nodeVersion = process.version;
    const cpu = os.cpus()[0].model;
    const platform = os.platform();
    const servers = interaction.client.guilds.cache.size;
    const users = interaction.users.cache.size;

    const embed = new EmbedBuilder()
      .setColor(0x1abc9c)
      .setTitle('🏓 Estado del Bot')
      .addFields(
        { name: '📶 Latencia del Mensaje', value: `\`${latency}ms\``, inline: true },
        { name: '💻 Ping API Discord', value: `\`${apiPing}ms\``, inline: true },
        { name: '🧠 Memoria Usada', value: `\`${memory.toFixed(2)} MB\``, inline: true },
        { name: '⏱️ Tiempo Activo', value: `\`${uptime}\``, inline: true },
        { name: '🌐 Node.js', value: `\`${nodeVersion}\``, inline: true },
        { name: '📦 discord.js', value: `\`${djsVersion}\``, inline: true },
        { name: '🖥️ CPU', value: `\`${cpu}\``, inline: false },
        { name: '🗂️ Sistema Operativo', value: `\`${platform}\``, inline: true },
        { name: '🏠 Servidores', value: `\`${servers}\``, inline: true },
        { name: '👥 Usuarios', value: `\`${users}\``, inline: true }
      )
      .setFooter({ text: 'Desarrollado por ohiostate' })
      .setTimestamp();

    await interaction.editReply({ content: null, embeds: [embed] });
  },
};

// Función auxiliar para formatear tiempo activo en d h m s
function formatUptime(ms) {
  const sec = Math.floor(ms / 1000) % 60;
  const min = Math.floor(ms / (1000 * 60)) % 60;
  const hr = Math.floor(ms / (1000 * 60 * 60)) % 24;
  const day = Math.floor(ms / (1000 * 60 * 60 * 24));
  return `${day}d ${hr}h ${min}m ${sec}s`;
} 