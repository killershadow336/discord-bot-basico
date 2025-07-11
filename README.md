# 🤖 Template de Bot de Discord

Un template básico y funcional para crear bots de Discord, construido con Discord.js v14. Este es mi primer template público, creado para ayudar a otros que quieren empezar sin comenzar desde cero.

## 👨‍💻 **Sobre el Desarrollador**

¡Hola! Soy **ohiostate**, y estoy empezando en el mundo del desarrollo de bots de Discord.

- 🎯 **Mi Experiencia**: Este es mi primer bot público (tengo uno privado funcionando)
- 🏠 **Proyecto Personal**: Bot privado para la comunidad de **SrDeku** (streamer)
- 🛠️ **Disponibilidad**: Puedo ayudar con proyectos básicos y medianos
- 📧 **Contacto**: Disponible para consultas y proyectos

### 🎮 **Mi Bot Privado**
Tengo un bot privado funcionando para la comunidad de **SrDeku** con funcionalidades como:
- Sistema de niveles y XP
- Algunos juegos básicos
- Comandos de moderación
- Y otras cositas que he ido aprendiendo...

### 🤖 **Nota Sobre el Desarrollo**
Para ser completamente transparente: algunas partes de este código fueron desarrolladas con ayuda de IA. Como desarrollador principiante con tiempo limitado, he usado herramientas de IA para:
- Estructurar mejor el código
- Resolver algunos errores complejos
- Optimizar ciertas funcionalidades
- Aprender mejores prácticas

Esto me ha permitido crear algo funcional sin tener que dedicar todo mi tiempo libre al desarrollo. Creo que es importante ser honesto sobre esto xd

---

## ✨ Características del Template

- **🔄 Carga Recursiva de Comandos**: Carga automáticamente comandos desde subdirectorios
- **📡 Comandos Básicos**: Ping, Help y algunos comandos divertidos
- **🛡️ Manejo de Errores**: Manejo básico de errores
- **⚙️ Configuración Simple**: Variables de entorno para configurar
- **🎯 Comandos Slash**: Implementación de comandos slash de Discord
- **📦 Código Organizado**: Estructura clara y fácil de entender

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18.0.0 o superior
- Un token de bot de Discord
- Conocimientos básicos de JavaScript

### Instalación

1. **Clona o descarga este repositorio**
   ```bash
   git clone <tu-url-del-repo>
   cd discord-bot-template
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   ```bash
   cp env.example .env
   ```
   
   Edita `.env` y agrega tus credenciales del bot:
   ```env
   BOT_TOKEN=tu_token_del_bot_aqui
   CLIENT_ID=tu_client_id_aqui
   GUILD_IDS=guild_id_1,guild_id_2
   OWNER_ID=tu_user_id_aqui
   ```

4. **Registra los comandos slash**
   ```bash
   npm run deploy
   ```

5. **Inicia el bot**
   ```bash
   npm start
   ```

## 📋 Comandos Disponibles

### Comandos de Utilidad
- `/ping` - Muestra la latencia y información del sistema del bot
- `/help` - Muestra todos los comandos disponibles

### Comandos Divertidos
- `/coinflip` - Lanza una moneda (cara o cruz)
- `/dice` - Lanza dados con lados personalizables

## 🏗️ Estructura del Proyecto

```
discord-bot-template/
├── commands/           # Archivos de comandos organizados por categoría
│   ├── fun/           # Comandos divertidos y de entretenimiento
│   └── utility/       # Comandos de utilidad e información
├── examples/          # Ejemplos de implementación (para aprender)
├── index.js           # Archivo principal del bot
├── deploy-commands.js # Script de registro de comandos
├── package.json       # Dependencias y scripts
├── env.example        # Plantilla de variables de entorno
└── README.md          # Este archivo
```

## 🔧 Configuración

### Variables de Entorno

| Variable | Descripción | Requerido |
|----------|-------------|-----------|
| `BOT_TOKEN` | Tu token del bot de Discord | ✅ |
| `CLIENT_ID` | El client ID de tu bot | ✅ |
| `GUILD_IDS` | IDs de servidores separados por comas para pruebas | ❌ |
| `OWNER_ID` | Tu ID de usuario de Discord para funciones de admin | ❌ |

### Permisos del Bot

Tu bot necesita los siguientes permisos:
- Enviar Mensajes
- Usar Comandos Slash
- Incrustar Enlaces
- Leer Historial de Mensajes

## 🛠️ Agregando Nuevos Comandos

1. Crea un nuevo archivo en la carpeta de categoría apropiada (ej: `commands/fun/`)
2. Usa esta plantilla:

```javascript
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nombrecomando')
    .setDescription('Descripción de tu comando'),
    
  async execute(interaction) {
    // Tu lógica del comando aquí
    await interaction.reply('¡Hola Mundo!');
  }
};
```

3. Reinicia el bot o vuelve a desplegar los comandos

## 🎨 Personalización

### Cambiando la Presencia del Bot
Edita la presencia en `index.js`:
```javascript
client.user.setPresence({
  activities: [{ name: 'tu estado personalizado', type: 0 }],
  status: 'online'
});
```

### Agregando Nuevas Categorías
1. Crea una nueva carpeta en `commands/`
2. Agrega tus archivos de comandos
3. Actualiza el comando help para incluir la nueva categoría

## 📚 Dependencias

- **discord.js** - Wrapper de la API de Discord
- **@discordjs/rest** - Cliente REST API
- **discord-api-types** - Definiciones de TypeScript
- **dotenv** - Gestión de variables de entorno

## 🤝 Contribuciones

1. Haz fork del repositorio
2. Crea una rama de características
3. Haz tus cambios
4. Prueba que funcione
5. Envía un pull request

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 💼 **¿Necesitas Ayuda?**

Si necesitas algo más complejo o personalizado, puedo ayudarte:

### 🎯 **Lo que puedo hacer:**
- Bots básicos y medianos
- Sistemas de niveles simples
- Comandos de moderación básicos
- Juegos interactivos
- Y otras funcionalidades que vaya aprendiendo...

### 📞 **Contacto**
- **Discord**: Envía una solicitud de amistad para consultas
- **Disponibilidad**: Puedo ayudar con proyectos básicos
- **Experiencia**: Estoy aprendiendo, pero puedo ayudar con lo que sé

---

## 🆘 Soporte

Si encuentras algún problema o tienes preguntas:

1. Revisa la [Guía de Discord.js](https://discordjs.guide/)
2. Consulta el [Portal de Desarrolladores de Discord](https://discord.com/developers/docs)
3. Abre un issue en este repositorio
4. **¡O contáctame por Discord si necesitas ayuda!**

---

**¡Espero que este template te ayude a empezar! 🎉**

*Mi primer template público - desarrollado por ohiostate* 