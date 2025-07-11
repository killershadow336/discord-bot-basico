const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('🪙 Lanza una moneda (cara o cruz aleatorio)'),
    
  async execute(interaction) {
    const result = Math.random() < 0.5 ? '🪙 Cara' : '🪙 Cruz';

    const embed = new EmbedBuilder()
      .setColor(0xf1c40f)
      .setTitle('¡Lanzamiento de Moneda!')
      .setDescription(`El resultado es: **${result}**`)
      .setFooter({ text: 'Desarrollado por ohiostate' });

    await interaction.reply({ embeds: [embed] });
  }
}; 