module.exports.config = {
  name: 'help',
  version: '2',
  role: 0,
  hasPrefix: true,
  aliases: ['info'],
  description: "Beginner's guide",
  usage: "Help [page] or [command]",
  credits: 'aesther',
};

module.exports.run = async function({
  api,
  event,
  enableCommands,
  args,
  Utils,
  prefix
}) {
  const input = args.join(' ').trim();
  const pages = 50;
  const commands = enableCommands[0].commands;
  const eventCommands = enableCommands[1].handleEvent;

  try {
    if (!input) {
      let page = 1;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `[🔵ᗩƐᔕƬHƐᖇ-ᗷOƬ🔵]\n  ˚₊‧꒰ა /ᐠ - ˕ -マ໒꒱ ‧₊˚ \n━━━━━━━━━━━\n`;

      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `✪ \t${i + 1}▪﹝${prefix}${commands[i]}﹞\n`;
      }

      helpMessage += '━ 𝗘𝗩𝗘𝗡𝗧.𝗟𝗜𝗦𝗧- ˕ -ྀマ[🏷️]\n━━━━━━━━━━━\n';
      eventCommands.forEach((eventCommand, index) => {
        helpMessage += `✦ \t${index + 1}▪﹝${prefix}${eventCommand}﹞\n`;
      });

      api.sendMessage(helpMessage, event.threadID, event.messageID);

    } else if (!isNaN(input)) {
      const page = parseInt(input);
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `▪〉𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝘀 - 𝗟𝗜𝗦𝗧(－－〆)[🔖]\n━━━━━━━━━━━\n`;

      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `✪ \t${i + 1}▪﹝${prefix}${commands[i]}﹞\n`;
      }

      helpMessage += '━ 𝗘𝗩𝗘𝗡𝗧.𝗟𝗜𝗦𝗧- ˕ -ྀマ[🏷️]\n━━━━━━━━━━━\n';
      eventCommands.forEach((eventCommand, index) => {
        helpMessage += `✦ \t${index + 1}▪﹝${prefix}${eventCommand}﹞\n`;
      });

      api.sendMessage(helpMessage, event.threadID, event.messageID);

    } else {
      const command = [...Utils.handleEvent, ...Utils.commands].find(([key]) => key.toLowerCase() === input.toLowerCase())?.[1];
      if (command) {
        const {
          name,
          version,
          role,
          aliases = [],
          description,
          usage,
          credits,
          cooldown,
        } = command;
        const roleMessage = role !== undefined ? `➛ Permission: ${['user', 'admin', 'thread Admin', 'super Admin'][role]}` : '';
        const aliasesMessage = aliases.length ? `➛ Aliases: ${aliases.join(', ')}\n` : '';
        const descriptionMessage = description ? `➛ Description: ${description}\n` : '';
        const usageMessage = usage ? `➛ Usage: ${usage}\n` : '';
        const creditsMessage = credits ? `➛ Credits: ${credits}\n` : '';
        const versionMessage = version ? `➛ Version: ${version}\n` : '';
        const cooldownMessage = cooldown ? `➛ Cooldown: ${cooldown} second(s)\n` : '';
        const message = `「 Command 」\n\n➛ Name: ${name}\n${versionMessage}${roleMessage}\n${aliasesMessage}${descriptionMessage}${usageMessage}${creditsMessage}${cooldownMessage}`;
        api.sendMessage(message, event.threadID, event.messageID);
      } else {
        api.sendMessage('Command not found.', event.threadID, event.messageID);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports.handleEvent = async function({
  api,
  event,
  prefix
}) {
  const {
    threadID,
    messageID,
    body
  } = event;

  const message = prefix
    ? `✎𝙰𝙴𝚂𝚃𝙷𝙴𝚁©/𝙋𝙍𝙀𝙁𝙄𝙓✎:\n┏━━━•━━━•━━━┓\n  🌐--(　・ω・)⊃--[${prefix}]\n┗━━━•━━━•━━━┛\n[🆔]𝙇𝙄𝙉𝙆 𝘼𝘿𝙈𝙄𝙉:\nhttps://www.facebook.com/profile.php?id=61555882584314`
    : "𝙎𝙊𝙍𝙍𝙔........(ᵕ—ᴗ—) ♡\n━━━━━━━━━━━\nI don't have a 𝗽𝗿𝗲𝗳𝗶𝘅";

  if (body?.toLowerCase().startsWith('prefix')) {
    api.sendMessage(message, threadID, messageID);
  }
};
