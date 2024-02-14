const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  botCommands: [
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
      description:
        "Devuelve un comando para traer una rama en especifico limpia",
      options: [
        {
          name: "rama",
          description: "Nombre de la rama a traer limpia",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
  ],
};
