// Example Moderation System Implementation
// This is a basic example of how you could implement moderation commands
// Copy this to your utils folder and modify as needed

const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

class ModerationSystem {
  constructor() {
    this.warnings = new Map(); // In production, use a database
  }

  // Check if user has moderation permissions
  hasModPermission(member) {
    return member.permissions.has(PermissionFlagsBits.ModerateMembers) ||
           member.permissions.has(PermissionFlagsBits.KickMembers) ||
           member.permissions.has(PermissionFlagsBits.BanMembers);
  }

  // Check if bot has required permissions
  hasBotPermission(guild, permission) {
    const botMember = guild.members.me;
    return botMember.permissions.has(permission);
  }

  // Warn a user
  async warnUser(interaction, targetUser, reason = 'No reason provided') {
    const { guild, user: moderator } = interaction;
    
    // Check permissions
    if (!this.hasModPermission(interaction.member)) {
      return { success: false, error: 'You don\'t have permission to warn users.' };
    }

    if (!this.hasBotPermission(guild, PermissionFlagsBits.ModerateMembers)) {
      return { success: false, error: 'I don\'t have permission to warn users.' };
    }

    // Add warning to storage
    const warningId = Date.now().toString();
    const warning = {
      id: warningId,
      userId: targetUser.id,
      guildId: guild.id,
      moderatorId: moderator.id,
      reason,
      timestamp: Date.now()
    };

    if (!this.warnings.has(guild.id)) {
      this.warnings.set(guild.id, new Map());
    }
    if (!this.warnings.get(guild.id).has(targetUser.id)) {
      this.warnings.get(guild.id).set(targetUser.id, []);
    }
    this.warnings.get(guild.id).get(targetUser.id).push(warning);

    // Create embed
    const embed = new EmbedBuilder()
      .setColor(0xffa500)
      .setTitle('⚠️ User Warned')
      .setDescription(`${targetUser} has been warned.`)
      .addFields(
        { name: 'User', value: `${targetUser.tag} (${targetUser.id})`, inline: true },
        { name: 'Moderator', value: `${moderator.tag}`, inline: true },
        { name: 'Reason', value: reason, inline: false },
        { name: 'Warning ID', value: warningId, inline: true }
      )
      .setTimestamp();

    return { success: true, embed, warning };
  }

  // Timeout a user
  async timeoutUser(interaction, targetUser, duration, reason = 'No reason provided') {
    const { guild, user: moderator } = interaction;
    
    // Check permissions
    if (!this.hasModPermission(interaction.member)) {
      return { success: false, error: 'You don\'t have permission to timeout users.' };
    }

    if (!this.hasBotPermission(guild, PermissionFlagsBits.ModerateMembers)) {
      return { success: false, error: 'I don\'t have permission to timeout users.' };
    }

    try {
      const member = await guild.members.fetch(targetUser.id);
      await member.timeout(duration, reason);

      const embed = new EmbedBuilder()
        .setColor(0xff6b35)
        .setTitle('🔇 User Timed Out')
        .setDescription(`${targetUser} has been timed out.`)
        .addFields(
          { name: 'User', value: `${targetUser.tag} (${targetUser.id})`, inline: true },
          { name: 'Moderator', value: `${moderator.tag}`, inline: true },
          { name: 'Duration', value: this.formatDuration(duration), inline: true },
          { name: 'Reason', value: reason, inline: false }
        )
        .setTimestamp();

      return { success: true, embed };
    } catch (error) {
      return { success: false, error: `Failed to timeout user: ${error.message}` };
    }
  }

  // Kick a user
  async kickUser(interaction, targetUser, reason = 'No reason provided') {
    const { guild, user: moderator } = interaction;
    
    // Check permissions
    if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
      return { success: false, error: 'You don\'t have permission to kick users.' };
    }

    if (!this.hasBotPermission(guild, PermissionFlagsBits.KickMembers)) {
      return { success: false, error: 'I don\'t have permission to kick users.' };
    }

    try {
      const member = await guild.members.fetch(targetUser.id);
      await member.kick(reason);

      const embed = new EmbedBuilder()
        .setColor(0xff6b35)
        .setTitle('👢 User Kicked')
        .setDescription(`${targetUser} has been kicked from the server.`)
        .addFields(
          { name: 'User', value: `${targetUser.tag} (${targetUser.id})`, inline: true },
          { name: 'Moderator', value: `${moderator.tag}`, inline: true },
          { name: 'Reason', value: reason, inline: false }
        )
        .setTimestamp();

      return { success: true, embed };
    } catch (error) {
      return { success: false, error: `Failed to kick user: ${error.message}` };
    }
  }

  // Ban a user
  async banUser(interaction, targetUser, reason = 'No reason provided', deleteMessageDays = 0) {
    const { guild, user: moderator } = interaction;
    
    // Check permissions
    if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
      return { success: false, error: 'You don\'t have permission to ban users.' };
    }

    if (!this.hasBotPermission(guild, PermissionFlagsBits.BanMembers)) {
      return { success: false, error: 'I don\'t have permission to ban users.' };
    }

    try {
      await guild.members.ban(targetUser, { 
        reason,
        deleteMessageDays 
      });

      const embed = new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle('🔨 User Banned')
        .setDescription(`${targetUser} has been banned from the server.`)
        .addFields(
          { name: 'User', value: `${targetUser.tag} (${targetUser.id})`, inline: true },
          { name: 'Moderator', value: `${moderator.tag}`, inline: true },
          { name: 'Reason', value: reason, inline: false }
        )
        .setTimestamp();

      return { success: true, embed };
    } catch (error) {
      return { success: false, error: `Failed to ban user: ${error.message}` };
    }
  }

  // Get user warnings
  getUserWarnings(guildId, userId) {
    if (!this.warnings.has(guildId) || !this.warnings.get(guildId).has(userId)) {
      return [];
    }
    return this.warnings.get(guildId).get(userId);
  }

  // Clear user warnings
  clearUserWarnings(guildId, userId) {
    if (this.warnings.has(guildId) && this.warnings.get(guildId).has(userId)) {
      this.warnings.get(guildId).delete(userId);
      return true;
    }
    return false;
  }

  // Format duration for display
  formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day(s)`;
    if (hours > 0) return `${hours} hour(s)`;
    if (minutes > 0) return `${minutes} minute(s)`;
    return `${seconds} second(s)`;
  }

  // Parse duration string (e.g., "1h", "30m", "2d")
  parseDuration(durationStr) {
    const match = durationStr.match(/^(\d+)([smhd])$/);
    if (!match) return null;

    const value = parseInt(match[1]);
    const unit = match[2];

    switch (unit) {
      case 's': return value * 1000;
      case 'm': return value * 60 * 1000;
      case 'h': return value * 60 * 60 * 1000;
      case 'd': return value * 24 * 60 * 60 * 1000;
      default: return null;
    }
  }
}

module.exports = ModerationSystem;

// Example usage in a command:
/*
const ModerationSystem = require('../utils/moderation-system');
const moderation = new ModerationSystem();

// In your warn command:
const result = await moderation.warnUser(interaction, targetUser, reason);
if (result.success) {
  await interaction.reply({ embeds: [result.embed] });
} else {
  await interaction.reply({ content: result.error, ephemeral: true });
}
*/ 