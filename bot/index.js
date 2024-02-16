// ====================================
// CODIGO VIEJO
// ====================================
// const {
//   REST,
//   Routes,
//   Client,
//   Partials,
//   ActivityType,
//   GatewayIntentBits,
// } = require("discord.js");
// const { Configuration, OpenAIApi } = require("openai");
// const schedule = require("node-schedule");
// const axios = require("axios");
// const env = require("dotenv");

// env.config();

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_KEY,
// });

// // Configurar Discord
// const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_KEY);
// const client = new Client({
//   intents: [
//     131071,
//     GatewayIntentBits.DirectMessages,
//     GatewayIntentBits.MessageContent,
//   ],
//   partials: [Partials.Channel, Partials.Message],
// });

// const commands = [
//   {
//     name: "documentacion",
//     description: "Obtener el link de las documentaciones!",
//   },
//   {
//     name: "notion",
//     description: "Obtener el link del notion de AIT",
//   },
//   {
//     name: "boxer",
//     description: "Obtener el link del repositorio de Boxer",
//   },
//   {
//     name: "duck",
//     description: "Obtener el link del repositorio de Duck",
//   },
//   {
//     name: "mision",
//     description: "Obtener nuestra mision",
//   },
//   {
//     name: "vision",
//     description: "Obtener nuestra vision",
//   },
//   {
//     name: "meet",
//     description: "Crear una nueva meet",
//   },
//   {
//     name: "check",
//     description: "Obtener el check list de actualización",
//   },
//   {
//     name: "info",
//     description: "Información de todos los comandos",
//   },
//   {
//     name: "rt",
//     description:
//       "Lista de puntos a tener en cuenta para el refinamiento técnico",
//   },
//   {
//     name: "cierre",
//     description:
//       "Lista de puntos a tener en cuenta para el cierre de una funcionalidad",
//   },
//   {
//     name: "proceso",
//     description: "Todo el proceso de actualizacion",
//   },
//   {
//     name: "actualizacion",
//     description: "Mensaje de actualizacion",
//   },
// ];

// const calcularMes = (mes) => {
//   switch (mes.toLowerCase()) {
//     case "enero":
//       return 0;
//     case "febrero":
//       return 1;
//     case "marzo":
//       return 2;
//     case "abril":
//       return 3;
//     case "mayo":
//       return 4;
//     case "junio":
//       return 5;
//     case "julio":
//       return 6;
//     case "agosto":
//       return 7;
//     case "septiembre":
//       return 8;
//     case "octubre":
//       return 9;
//     case "noviembre":
//       return 10;
//     case "diciembre":
//       return 1;
//     default:
//       return null;
//   }
// };

// client.on("messageCreate", async (message) => {
//   let prefix = "!";

//   if (!message.content.startsWith(prefix) || message.author.bot) return;

//   const args = message.content.slice(prefix.length).trim().split(/ +/);
//   const command = args.shift().toLowerCase();

//   if (command === "gpt") {
//     try {
//       const openai = new OpenAIApi(configuration);

//       const response = await openai.createChatCompletion({
//         model: "gpt-4",
//         messages: [
//           {
//             role: "system",
//             content:
//               "Sos un asistente virtual que responde de todo, especialmente preguntas de codigo.",
//           },
//           {
//             role: "user",
//             content: args.join(" "),
//           },
//         ],
//       });

//       message.reply(response.data.choices[0].message.content);
//     } catch (error) {
//       console.log(error);
//       message.reply("ocurrio un error, intente mas tarde");
//     }
//   } else if (command === "feriados") {
//     try {
//       const response = await axios
//         .get("http://nolaborables.com.ar/api/v2/feriados/2023?formato=mensual")
//         .then((response) => {
//           const meses = response.data;
//           const mesElegido = calcularMes(args.toString());
//           const feriados = meses[mesElegido];
//           let feriadosStr = `Feriados en ${args}: `;

//           for (const feriado in feriados) {
//             if (feriados.hasOwnProperty(feriado)) {
//               feriadosStr += `${feriado} ${feriados[feriado].motivo}, `;
//             }
//           }

//           feriadosStr = feriadosStr.slice(0, -2);
//           message.reply(feriadosStr);
//         });
//     } catch (error) {}
//   } else if (command === "ruleta") {
//     function chooseRandomObject(arr) {
//       const randomIndex = Math.floor(Math.random() * arr.length);
//       return arr[randomIndex];
//     }
//     message.reply(`El ganador de la ruleta es: ${chooseRandomObject(args)}`);
//   } else if (command === "mensaje") {
//     const user = message.mentions.users.first();
//     args.shift();

//     if (!user) {
//       message.reply(
//         "Por favor, menciona a un usuario al que quieras enviar un mensaje privado."
//       );
//       return;
//     }
//     try {
//       await user.send(args.join(" "));
//     } catch (error) {
//       console.error("Error al enviar el mensaje privado:", error);
//       message.reply("No se pudo enviar el mensaje privado.");
//     }
//   } else if (command === "resumen") {
//     const messages = await message.channel.messages.fetch({ limit: 15 });
//     const messagesFormatted = messages.map(
//       (msg) => `Mensaje de ${msg.author.username}: Contenido:${msg.content}`
//     );

//     const systemMessage = {
//       role: "system",
//       content: `Toma el rol de una app que ayuda a trabajadores a resumir lo que se ha hablando últimamente en el chat de su trabajo, genera resúmenes cortos y eficaces, dando la máxima cantidad de detalles posibles. No es necesario que expliques cada mensaje, sino que des un vistazo general con puntos clave sobre lo que se estuvo hablando`,
//     };

//     const promptMessage = {
//       role: "user",
//       content: `Realizá un resumen breve pero eficaz de todos los siguientes mensajes: ${messagesFormatted}`,
//     };

//     const response = await openai.createChatCompletion({
//       model: "gpt-4",
//       messages: [systemMessage, promptMessage],
//       max_tokens: 1700,
//       temperature: 0.6,
//       frequency_penalty: 0.2,
//     });

//     if (response.statusCode === 400) {
//       message.reply(
//         "La API de OpenAi no soporta demasiados mensajes, contáctense con el administrador."
//       );
//     }

//     message.reply(response.data.choices[0].message.content);
//   }
// });

// client.on("interactionCreate", async (interaction) => {
//   if (!interaction.isChatInputCommand()) {
//   } else if (interaction.commandName === "documentacion") {
//     await interaction.reply(
//       "https://drive.google.com/drive/folders/1wpnnND7oKrOUV3ruYo_Inh86QmqCfslK?hl=es"
//     );
//   } else if (interaction.commandName === "notion") {
//     await interaction.reply(
//       "https://ait-solutions.notion.site/NOVEDADES-AIT-e3214e2c0e2241fa93c480d8f7b49318"
//     );
//   } else if (interaction.commandName === "boxer") {
//     await interaction.reply("https://gitlab.com/aitsolutions18/boxer");
//   } else if (interaction.commandName === "duck") {
//     await interaction.reply("https://gitlab.com/mickaelacrespo/duck");
//   } else if (interaction.commandName === "mision") {
//     await interaction.reply(
//       "Generar evolucion en nuestros clientes mediante tecnologias utiles y accesibles que impulsen el crecimiento de sus negocios."
//     );
//   } else if (interaction.commandName === "vision") {
//     await interaction.reply(
//       "Queremos ser una empresa generadora de softwares que potencien con tecnologia e innovacion los procesos de diversos rubros en el mundo."
//     );
//   } else if (interaction.commandName === "meet") {
//     await interaction.reply(
//       "Su periodo de prueba en Walter White Bot ha caducado, por favor introduzca una opcion de pago."
//     );
//     // await interaction.reply(
//     //   `Nueva meet: https://meet.google.com/xyv-hqbw-rzn?authuser=0`
//     // );
//   } else if (interaction.commandName === "check") {
//     await interaction.reply(
//       `**CHECK LIST**\n:white_small_square: Merge realizado.\n:white_small_square: Revisar las migraciones en las bases de datos.\n:white_small_square: Revisar los comandos a ejecutar.\n:white_small_square: Revisar el JSON con los datos nuevos.\n:white_small_square: Realizar el testing de las funcionalidades críticas como ventas y facturación.\n:white_small_square: Borrar todas las ramas relacionado a lo mergeado.\n⚠ **Recordar actualizar la rama de trabajo un día después de la actualización** ⚠`
//     );
//   } else if (interaction.commandName === "info") {
//     await interaction.reply(
//       `/meet (genera una meet)\n/mision (muestra la misión de la empresa)\n/vision (muestra la visión de la empresa)\n/notion (muestra el link del notion de ait)\n/documentacion (muestra el link de la documentacion)\n/boxer (muestra el link del repositorio de boxer)\n/duck (muestra el link del repositorio de duck)\n/proceso (muestra el proceso de actualización)\n/actualizacion (muestra el mensaje de actualización)\n!resumen (genera un resúmen de los últimos mensajes del canal)\n!gpt **texto a enviar** (muestra la respuesta generada por chatgpt)\n!ruleta **opciones de la ruleta separadas por espacio** (muestra un ganador de la ruleta)\n!feriados **mes** (muestra todos los feriados del mes seleccionado)\n!mensaje **@NombrePersona** **Mensaje** (envía un mensaje privado a la persona)`
//     );
//   } else if (interaction.commandName === "rt") {
//     await interaction.reply(
//       `**¡Comencemos con el Refinamiento técnico!** 💪\n1. ¿Tenés dudas a nivel negocio que debamos consultar con el área comercial? 👨‍💻\n2. Desglose de tareas 🚀\n     a. ¿Puedes realizarlo solo o necesitas reunirnos?\n     b. ¿En qué parte del sistema impacta la funcionalidad?\n3. ¿Crees que es necesario dividir la funcionalidad en etapas? (Si es una funcionalidad chiquita, di no!)\n4. Estimaciones 🕰️\n     a. ¿Cuándo vas a comenzar a desarrollar la funcionalidad?\n     b. ¿Cuándo estimas que se finaliza esto? Tené en cuenta la documentación para esta fecha\n5. Búsqueda de tester🧪\n     a. ¿Crees que alguien en particular puede realizar el testing de esto? ¿O hacemos ruleta?\n6. No te olvides de usar el timesheet para el conteo de tus horas. ✅`
//     );
//   } else if (interaction.commandName === "cierre") {
//     await interaction.reply(
//       `**¡Le demos un buen cierre a la funcionalidad!**  🎊\n1. ¿Estás de acuerdo con el tamaño de la card?  🧩\n2. Fecha de ingreso al tablero (PM responde) 🧑‍🔧\n3. ¿Cuál fue la fecha de cierre que estimamos y cuál la real? 🗓️\n4. ¿Del 1 al 5 qué manejo tuviste en relación al tablero de Jira? ¿Pudiste cargar todas tus horas?\n5. ¿Del 1 al 5 qué dificultad tuvo la funcionalidad en tus tareas?\n6. ¿Quién dio soporte en esta funcionalidad?  🤝\n7. ¿Algún feedback que quieras dar? ¿Un aprendizaje? ¿Una oportunidad de mejora?`
//     );
//   } else if (interaction.commandName === "proceso") {
//     await interaction.reply(
//       `**¡Proceso de Actualización!**  \n Usamos este excel de soporte\nhttps://docs.google.com/spreadsheets/d/1SlUSqpqlCcxUEjZYjgUC2XcoBGdDb8HUO8l2KELW2x4/edit#gid=234903137\n1- Rama Staging\n* Fecha y hora límite de merge a staging:\n* Fecha hora de inicio de testing de staging:\n* Fecha hora de fin de testing de staging:\n* Encargado/s de testing:\n2- Documento de actualización:\n* Fecha hora inicio del Documento de actualización:\n* Fecha hora fin del Documento de actualización:\n* Responsables:\n3- Rama Master\n* Fecha y hora inicio de merge a master:\n* Responsable:\n`
//     );
//   } else if (interaction.commandName === "actualizacion") {
//     await interaction.reply(
//       `**Tenemos una nueva actualización!**  \n- ¿Cuando se va actualizar?:\n- ¿Cuando van a ver los cambios los clientes?:\n- Comandos que tenemos que tener en cuenta:\n- Tamaño de la actualización es: **CHIQUITO/MEDIANA/GRANDOTA**\n- Deben actualizar back y front: **BACK Y/O FRONT.**\n- Tiene migraciones: **SI / NO**\n- ¿Se actualizó el json? **SI / NO**\n- Las funcionalidades que ingresaran son:\n    Indicar ID de card y descripción **BG-XXX: DESCRIPCIÓN**\n- Las funcionalidades que es probable que ingresen:\n    Indicar ID de card y descripción **BG-XXX: DESCRIPCIÓN**\n`
//     );
//   }
// });

// // Login Discord
// client
//   .login(process.env.DISCORD_BOT_KEY)
//   .then(async () => {
//     await rest.put(Routes.applicationCommands("1077997844981633144"), {
//       body: commands,
//     });
//     client.user.setPresence({
//       activities: [{ name: `/info`, type: ActivityType.Listening }],
//     });
//     console.log("Bot conectado");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// module.exports = { client };
// ====================================
// CODIGO VIEJO
// ====================================

const {
  REST,
  Client,
  Routes,
  ActivityType,
  IntentsBitField,
} = require("discord.js");
require("dotenv").config();
const { botCommands } = require("./utils");

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
