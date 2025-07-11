const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dice')
    .setDescription('🎲 Lanza un dado (1-6)')
    .addIntegerOption(option =>
      option.setName('lados')
        .setDescription('Número de lados del dado (por defecto: 6)')
        .setRequired(false)
        .setMinValue(2)
        .setMaxValue(100)),
    
  async execute(interaction) {
    const sides = interaction.options.getInteger('lados') || 6;
    const result = Math.floor(Math.random() * sides) + 1;

    const embed = new EmbedBuilder()
      .setColor(0xe74c3c)
      .setTitle('🎲 Lanzamiento de Dado')
      .setDescription(`¡Sacaste un **${result}** en un dado de ${sides} lados!`)
      .setFooter({ text: 'Desarrollado por ohiostate' });

    await interaction.reply({ embeds: [embed] });
  }
}; 