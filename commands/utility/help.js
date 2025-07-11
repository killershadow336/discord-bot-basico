const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('📚 Muestra todos los comandos disponibles'),

  async execute(interaction) {
    const commands = interaction.client.commands;
    
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle('🤖 Comandos del Bot')
      .setDescription('Aquí tienes todos los comandos disponibles:')
      .addFields(
        {
          name: '🛠️ Comandos de Utilidad',
          value: commands
            .filter(cmd => cmd.data.description.includes('📡') || cmd.data.description.includes('📚'))
            .map(cmd => `\`/${cmd.data.name}\` - ${cmd.data.description}`)
            .join('\n') || 'No hay comandos de utilidad disponibles',
          inline: false
        },
        {
          name: '🎮 Comandos Divertidos',
          value: commands
            .filter(cmd => cmd.data.description.includes('🎲') || cmd.data.description.includes('🪙'))
            .map(cmd => `\`/${cmd.data.name}\` - ${cmd.data.description}`)
            .join('\n') || 'No hay comandos divertidos disponibles',
          inline: false
        }
      )
      .setFooter({ text: 'Desarrollado por ohiostate' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
}; 