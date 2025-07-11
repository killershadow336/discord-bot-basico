# 🎨 Personalizando tu Bot de Discord

Esta guía te ayudará a personalizar tu template de bot de Discord para que se adapte a tus necesidades y estilo.

## 🎯 Personalización Básica

### Nombre y Avatar del Bot
1. Ve al [Portal de Desarrolladores de Discord](https://discord.com/developers/applications)
2. Selecciona tu aplicación
3. Ve a la pestaña "Información General"
4. Cambia el nombre y descripción del bot
5. Sube un avatar personalizado

### Estado y Actividad del Bot
Edita la presencia en `index.js`:

```javascript
client.user.setPresence({
  activities: [
    {
      name: 'tu estado personalizado aquí',
      type: 0 // 0: Jugando, 1: Transmitiendo, 2: Escuchando, 3: Viendo, 5: Compitiendo
    }
  ],
  status: 'online' // 'online', 'idle', 'dnd', 'invisible'
});
```

### Colores de Embeds
Cambia los colores por defecto en tus comandos:

```javascript
const embed = new EmbedBuilder()
  .setColor(0xTU_COLOR_AQUI) // Reemplaza con tu color preferido
  .setTitle('Tu Título')
  .setDescription('Tu descripción');
```

Esquemas de colores populares:
- Azul: `0x0099ff`
- Verde: `0x00ff00`
- Rojo: `0xff0000`
- Púrpura: `0x9b59b6`
- Naranja: `0xff6b35`
- Dorado: `0xf1c40f`

## 🎨 Personalización Avanzada

### Estilos de Embeds Personalizados
Crea una función de utilidad para embeds consistentes:

```javascript
// utils/embedBuilder.js
const { EmbedBuilder } = require('discord.js');

class CustomEmbedBuilder {
  static success(title, description) {
    return new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle(`✅ ${title}`)
      .setDescription(description)
      .setTimestamp();
  }

  static error(title, description) {
    return new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle(`❌ ${title}`)
      .setDescription(description)
      .setTimestamp();
  }

  static info(title, description) {
    return new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`ℹ️ ${title}`)
      .setDescription(description)
      .setTimestamp();
  }

  static warning(title, description) {
    return new EmbedBuilder()
      .setColor(0xffa500)
      .setTitle(`⚠️ ${title}`)
      .setDescription(description)
      .setTimestamp();
  }
}

module.exports = CustomEmbedBuilder;
```

### Footer Personalizado
Agrega un footer consistente a todos los embeds:

```javascript
const embed = new EmbedBuilder()
  .setColor(0x0099ff)
  .setTitle('Tu Título')
  .setDescription('Tu descripción')
  .setFooter({ 
    text: 'Tu Nombre del Bot • Hecho con ❤️',
    iconURL: client.user.displayAvatarURL()
  })
  .setTimestamp();
```

### Miniaturas Personalizadas
Agrega el avatar de tu bot o imágenes personalizadas:

```javascript
const embed = new EmbedBuilder()
  .setColor(0x0099ff)
  .setTitle('Tu Título')
  .setDescription('Tu descripción')
  .setThumbnail(client.user.displayAvatarURL())
  .setTimestamp();
```

## 🎮 Personalización de Comandos

### Respuestas de Comandos Personalizadas
Crea respuestas personalizadas para tus comandos:

```javascript
// config/responses.js
module.exports = {
  greetings: [
    '¡Hola! 👋',
    '¡Hey! ¿Cómo estás? 😊',
    '¡Saludos, viajero! 🌟',
    '¡Bienvenido a la fiesta! 🎉'
  ],
  
  farewells: [
    '¡Nos vemos! 👋',
    '¡Cuídate! 😊',
    '¡Hasta la próxima! 🌟',
    '¡Adiós, amigo! 👋'
  ],
  
  errors: [
    '¡Ups! Algo salió mal 😅',
    '¡Oh no! Ocurrió un error 😰',
    '¡Algo se rompió! Déjame arreglarlo 🔧',
    '¡Error detectado! Inténtalo de nuevo ⚠️'
  ]
};
```

### Selección Aleatoria de Respuestas
```javascript
const responses = require('../config/responses');

function getRandomResponse(category) {
  const responseArray = responses[category];
  return responseArray[Math.floor(Math.random() * responseArray.length)];
}

// Uso en comando
await interaction.reply(getRandomResponse('greetings'));
```

## 🎨 Temas de Personalización

### Temas Estacionales
Crea diferentes temas para diferentes estaciones:

```javascript
// config/themes.js
module.exports = {
  default: {
    primaryColor: 0x0099ff,
    secondaryColor: 0x00ff00,
    accentColor: 0xffa500,
    emoji: '🤖'
  },
  
  halloween: {
    primaryColor: 0xff6b35,
    secondaryColor: 0x9b59b6,
    accentColor: 0xffa500,
    emoji: '🎃'
  },
  
  christmas: {
    primaryColor: 0xff0000,
    secondaryColor: 0x00ff00,
    accentColor: 0xffa500,
    emoji: '🎄'
  },
  
  summer: {
    primaryColor: 0x00ffff,
    secondaryColor: 0xffff00,
    accentColor: 0xff6b35,
    emoji: '☀️'
  }
};
```

### Aplicación Dinámica de Temas
```javascript
const themes = require('../config/themes');

function getCurrentTheme() {
  const month = new Date().getMonth();
  
  if (month === 9) return themes.halloween; // Octubre
  if (month === 11) return themes.christmas; // Diciembre
  if (month >= 5 && month <= 8) return themes.summer; // Junio-Septiembre
  
  return themes.default;
}

// Uso
const theme = getCurrentTheme();
const embed = new EmbedBuilder()
  .setColor(theme.primaryColor)
  .setTitle(`${theme.emoji} Tu Título`)
  .setDescription('Tu descripción');
```

## 🎵 Personalización de Sonido y Audio

### Efectos de Sonido Personalizados
Si agregas funciones de voz, personaliza el audio:

```javascript
// config/audio.js
module.exports = {
  joinSound: 'ruta/a/join.mp3',
  leaveSound: 'ruta/a/leave.mp3',
  levelUpSound: 'ruta/a/levelup.mp3',
  errorSound: 'ruta/a/error.mp3'
};
```

## 🎨 Personalización Visual

### Iconos e Imágenes Personalizados
Crea una identidad visual consistente:

```javascript
// config/assets.js
module.exports = {
  icons: {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
    loading: '⏳',
    check: '✔️',
    cross: '❌'
  },
  
  images: {
    logo: 'https://tu-dominio.com/logo.png',
    banner: 'https://tu-dominio.com/banner.png',
    avatar: 'https://tu-dominio.com/avatar.png'
  }
};
```

### Mensajes de Carga Personalizados
```javascript
const loadingMessages = [
  'Cargando... ⏳',
  'Procesando tu solicitud... 🔄',
  'Trabajando en ello... ⚙️',
  'Casi listo... 🚀',
  'Solo un momento... ⏱️'
];

function getLoadingMessage() {
  return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
}
```

## 🎨 Integración de Marca

### Colores de Marca Personalizados
Usa los colores de tu marca consistentemente:

```javascript
// config/branding.js
module.exports = {
  colors: {
    primary: 0xTU_COLOR_PRIMARIO,
    secondary: 0xTU_COLOR_SECUNDARIO,
    accent: 0xTU_COLOR_ACENTO,
    success: 0x00ff00,
    error: 0xff0000,
    warning: 0xffa500,
    info: 0x0099ff
  },
  
  branding: {
    name: 'Tu Nombre del Bot',
    tagline: 'Tu tagline del bot',
    website: 'https://tu-sitio-web.com',
    support: 'https://tu-soporte.com'
  }
};
```

### Embeds con Marca
```javascript
const branding = require('../config/branding');

function createBrandedEmbed(title, description, type = 'info') {
  return new EmbedBuilder()
    .setColor(branding.colors[type])
    .setTitle(`${branding.branding.name} - ${title}`)
    .setDescription(description)
    .setFooter({ 
      text: `${branding.branding.tagline} • ${branding.branding.website}`,
      iconURL: client.user.displayAvatarURL()
    })
    .setTimestamp();
}
```

## 🎨 Personalización de Accesibilidad

### Modo Alto Contraste
```javascript
// config/accessibility.js
module.exports = {
  highContrast: {
    primary: 0xffffff,
    secondary: 0x000000,
    accent: 0xffff00,
    success: 0x00ff00,
    error: 0xff0000
  },
  
  largeText: {
    fontSize: 'large',
    spacing: 'increased'
  }
};
```

## 🎨 Soporte de Localización

### Soporte Multi-idioma
```javascript
// config/languages.js
module.exports = {
  en: {
    welcome: 'Welcome!',
    goodbye: 'Goodbye!',
    error: 'An error occurred!'
  },
  
  es: {
    welcome: '¡Bienvenido!',
    goodbye: '¡Adiós!',
    error: '¡Ocurrió un error!'
  },
  
  fr: {
    welcome: 'Bienvenue!',
    goodbye: 'Au revoir!',
    error: 'Une erreur s\'est produite!'
  }
};
```

## 🎨 Consejos para una Gran Personalización

1. **Consistencia**: Usa los mismos colores, fuentes y estilos en todo
2. **Legibilidad**: Asegúrate de que el texto sea fácil de leer con buen contraste
3. **Marca**: Incorpora elementos de tu marca naturalmente
4. **Experiencia de Usuario**: Haz las interacciones suaves e intuitivas
5. **Accesibilidad**: Considera usuarios con diferentes necesidades
6. **Rendimiento**: Mantén las personalizaciones ligeras
7. **Mantenimiento**: Haz las personalizaciones fáciles de actualizar

## 🎨 Probando tus Personalizaciones

1. **Pruebas Visuales**: Verifica cómo se ven los embeds en diferentes temas de Discord
2. **Pruebas de Funcionalidad**: Asegúrate de que las personalizaciones no rompan la funcionalidad
3. **Feedback de Usuarios**: Obtén feedback de tu comunidad
4. **Pruebas de Rendimiento**: Monitorea el rendimiento del bot con las personalizaciones

---

**¡Recuerda: La mejor personalización es una que mejora la experiencia del usuario mientras mantiene la funcionalidad! 🎨✨** 