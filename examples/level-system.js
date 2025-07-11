// Example Level System Implementation
// This is a basic example of how you could implement a level system
// Copy this to your utils folder and modify as needed

const fs = require('fs');
const path = require('path');

class LevelSystem {
  constructor() {
    this.dataPath = path.join(__dirname, '../data/levels.json');
    this.levels = this.loadLevels();
  }

  // Load levels data from file
  loadLevels() {
    try {
      if (fs.existsSync(this.dataPath)) {
        const data = fs.readFileSync(this.dataPath, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading levels:', error);
    }
    return {};
  }

  // Save levels data to file
  saveLevels() {
    try {
      const dir = path.dirname(this.dataPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.dataPath, JSON.stringify(this.levels, null, 2));
    } catch (error) {
      console.error('Error saving levels:', error);
    }
  }

  // Add XP to a user
  addXP(userId, guildId, xp) {
    const key = `${guildId}-${userId}`;
    
    if (!this.levels[key]) {
      this.levels[key] = {
        userId,
        guildId,
        xp: 0,
        level: 0,
        lastMessage: 0
      };
    }

    this.levels[key].xp += xp;
    this.levels[key].lastMessage = Date.now();

    // Check for level up
    const newLevel = this.calculateLevel(this.levels[key].xp);
    const leveledUp = newLevel > this.levels[key].level;
    
    if (leveledUp) {
      this.levels[key].level = newLevel;
    }

    this.saveLevels();
    return { leveledUp, newLevel, currentXP: this.levels[key].xp };
  }

  // Calculate level from XP
  calculateLevel(xp) {
    return Math.floor(0.1 * Math.sqrt(xp));
  }

  // Calculate XP needed for next level
  calculateXPForLevel(level) {
    return Math.pow(level / 0.1, 2);
  }

  // Get user level info
  getUserLevel(userId, guildId) {
    const key = `${guildId}-${userId}`;
    const userData = this.levels[key];
    
    if (!userData) {
      return {
        level: 0,
        xp: 0,
        xpForNext: 100
      };
    }

    const nextLevelXP = this.calculateXPForLevel(userData.level + 1);
    const currentLevelXP = this.calculateXPForLevel(userData.level);
    const progress = userData.xp - currentLevelXP;
    const needed = nextLevelXP - currentLevelXP;

    return {
      level: userData.level,
      xp: userData.xp,
      xpForNext: nextLevelXP,
      progress,
      needed
    };
  }

  // Get leaderboard for a guild
  getLeaderboard(guildId, limit = 10) {
    const guildUsers = Object.values(this.levels)
      .filter(user => user.guildId === guildId)
      .sort((a, b) => b.xp - a.xp)
      .slice(0, limit);

    return guildUsers;
  }

  // Check if user can gain XP (cooldown)
  canGainXP(userId, guildId, cooldown = 60000) {
    const key = `${guildId}-${userId}`;
    const userData = this.levels[key];
    
    if (!userData) return true;
    
    return Date.now() - userData.lastMessage >= cooldown;
  }
}

module.exports = LevelSystem;

// Example usage in a command:
/*
const LevelSystem = require('../utils/level-system');
const levelSystem = new LevelSystem();

// In your message event or command:
if (levelSystem.canGainXP(user.id, guild.id)) {
  const result = levelSystem.addXP(user.id, guild.id, 15);
  
  if (result.leveledUp) {
    // Send level up message
    channel.send(`🎉 Congratulations ${user}! You reached level ${result.newLevel}!`);
  }
}
*/ 