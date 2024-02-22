const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
app.use(express.json());

const {
  REST,
  Client,
  Routes,
  ActivityType,
  IntentsBitField,
  ApplicationCommandOptionType,
} = require("discord.js");

require("dotenv").config();

const botCommands = [
  {
    name: "carita",
    description: "Agrega una carita al final del mensaje",
    options: [
      {
        name: "message",
        description: "Mensaje",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "face",
        description: "Cara a elegir",
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: "( ͡☉ ͜ʖ ͡☉)",
            value: "( ͡☉ ͜ʖ ͡☉)",
          },
          {
            name: "(•◡•) /",
            value: "(•◡•) /",
          },
          {
            name: "(っ＾▿＾)۶👋",
            value: "(っ＾▿＾)۶👋",
          },
        ],
        required: true,
      },
    ],
  },
  {
    name: "info",
    description: "Ver todos los comandos disponibles",
  },
  {
    name: "testing",
    description: "Plantilla para solicitar el testing de funcinoalidades",
    options: [
      {
        name: "encargado",
        description: "Encargado del testing",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "prioridad",
        description: "Prioridad de la card a testear",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "fecha",
        description: "Dia y hora para comenzar el testing",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "testing",
        description: "Sistema de testing a donde se va a testear",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          {
            name: "Testing 1",
            value: "Testing 1",
          },
          {
            name: "Testing 2",
            value: "Testing 2",
          },
          {
            name: "Testing 3",
            value: "Testing 3",
          },
          {
            name: "Testing 4",
            value: "Testing 4",
          },
          {
            name: "A definir",
            value: "A definir",
          },
        ],
      },
      {
        name: "seccion",
        description: "Front, Back o ambos?",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          {
            name: "Frontend",
            value: "Frontend",
          },
          {
            name: "Backend",
            value: "Backend",
          },
          {
            name: "Frontend y Backend",
            value: "Frontend y Backend",
          },
        ],
      },
      {
        name: "modulos",
        description: "Modulos donde impacta la funcionalidad",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "hilo",
        description: "Hilo de la card a testear",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "card",
        description: "Link de la card a testear",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "limpiar_rama",
    description: "Devuelve un comando para traer una rama en especifico limpia",
    options: [
      {
        name: "rama",
        description: "Nombre de la rama a traer limpia",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.login(process.env.BOT_TOKEN);

client.on("ready", (c) => {
  console.log(`✅ ${c.user.username} is online`);

  client.application.commands.set([]);
  client.user.setPresence({
    activities: [{ name: `/info`, type: ActivityType.Listening }],
  });
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  switch (interaction.commandName) {
    case "carita":
      const face = interaction.options.get("face").value;
      const message = interaction.options.get("message").value;

      return interaction.reply(`${message} ${face}`);
    case "testing":
      const hilo = interaction.options.get("hilo").value;
      const card = interaction.options.get("card").value;
      const fecha = interaction.options.get("fecha").value;
      const testing = interaction.options.get("testing").value;
      const modulos = interaction.options.get("modulos").value;
      const seccion = interaction.options.get("seccion").value;
      const encargado = interaction.options.get("encargado").value;
      const prioridad = interaction.options.get("prioridad").value;

      return interaction.reply(
        `🧑🏻‍🏭  Encargado: ${encargado}\n⚠️ Prioridad: ${prioridad}\n📅  Fecha: ${fecha}\n🧪  Testing: ${testing}\n💻  Seccion: ${seccion}\n⚙️  Modulos: ${modulos}\n🧵  Hilo: ${hilo}\n✉️  Card: ${card}`
      );
    case "info":
      return interaction.reply(
        `**Comandos disponibles:**\n\n**/carita (mensaje) (carita):**\nDevuelve un mensaje con una carita\n\n**/testing (hilo) (card) (fecha) (testing) (modulos) (seccion) (encargado) (prioridad):**\nDevuelve un mensaje con la información para realizar el testing\n\n**/limpiar_rama (rama):**\nDevuelve el comando para limpiar una rama de git*`
      );
    case "limpiar_rama":
      const rama = interaction.options.get("rama").value;

      return interaction.reply(
        `git branch -d ${rama} || true && git fetch && git checkout ${rama} && git pull`
      );
  }
});

(async () => {
  try {
    const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: botCommands }
    );
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();

app.listen(process.env.PORT, () => console.log("✅ Server is online"));
