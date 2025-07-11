// Archivo de configuración de ejemplo
// Copia este archivo a config.js y personalízalo para tu bot

module.exports = {
  // Configuración del bot
  bot: {
    name: 'Tu Nombre del Bot',
    version: '1.0.0',
    prefix: '!', // Para comandos con prefijo (si los agregas)
    defaultColor: 0x0099ff,
    footerText: 'Tu Footer del Bot'
  },

  // Categorías de comandos
  categories: {
    utility: {
      name: '🛠️ Utilidad',
      description: 'Comandos de utilidad e información'
    },
    fun: {
      name: '🎮 Diversión',
      description: 'Comandos divertidos y de entretenimiento'
    },
    moderation: {
      name: '🛡️ Moderación',
      description: 'Comandos de moderación (requiere permisos)'
    }
  },

  // Cooldowns (en milisegundos)
  cooldowns: {
    default: 3000, // 3 segundos
    fun: 5000,     // 5 segundos
    utility: 1000  // 1 segundo
  },

  // Respuestas personalizadas
  responses: {
    welcome: '¡Bienvenido al servidor!',
    goodbye: '¡Gracias por estar aquí!',
    error: '¡Algo salió mal!',
    noPermission: 'No tienes permisos para usar este comando.'
  },

  // Ejemplo de configuración del sistema de niveles
  levels: {
    enabled: false, // Cambia a true si implementas un sistema de niveles
    xpPerMessage: 15,
    cooldown: 60000, // 1 minuto
    levelRoles: {
      5: 'id_del_rol_aqui',
      10: 'id_del_rol_aqui',
      25: 'id_del_rol_aqui'
    }
  },

  // Ejemplo de sistema de bienvenida
  welcome: {
    enabled: false, // Cambia a true si implementas un sistema de bienvenida
    channelId: 'id_del_canal_aqui',
    message: '¡Bienvenido <@USER> al servidor!'
  },

  // Ejemplo de logging
  logging: {
    enabled: false, // Cambia a true si implementas logging
    channelId: 'id_del_canal_aqui',
    events: ['messageDelete', 'memberJoin', 'memberLeave']
  }
}; 