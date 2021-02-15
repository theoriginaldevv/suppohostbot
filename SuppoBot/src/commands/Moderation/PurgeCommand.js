const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const red = '#ff0000';
const green = '#00FF00';

module.exports = class PurgeCommand extends BaseCommand {
  constructor() {
    super('purge', 'Moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(
      new Discord.MessageEmbed()
        .setColor(`${red}`)
        .setDescription('You do not have permission to execute this command.')
        .setFooter('Manage_Messages, Administrator')
    )
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply(
      new Discord.MessageEmbed()
        .setColor(`${red}`)
        .setDescription('I do not have permission to execute this command.')
        .setFooter('Manage_Messages, Administrator')
    )
    if (!args[0]) return message.reply(
      new Discord.MessageEmbed()
        .setColor(`${red}`)
        .setDescription('Missing required parameters. \`suppo!purge 4\`')
    )
    const amountToDelete = Number(args[0], 10);

    if (isNaN(amountToDelete)) return message.reply(
      new Discord.MessageEmbed()
        .setColor(`${red}`)
        .setDescription('This is not a valid number.')
    )
    if (!Number.isInteger(amountToDelete)) return message.reply(
      new Discord.MessageEmbed()
        .setColor(`${red}`)
        .setDescription('Number must be a whole number.')
    )
    if (!amountToDelete || amountToDelete < 2 || amountToDelete > 100) return message.reply(
      new Discord.MessageEmbed()  
        .setColor(`${red}`)
        .setDescription('Number must be between **2 and 100**')
    )
    const fetched = await message.channel.messages.fetch({
      limit: amountToDelete
    });

    try {
      await message.channel.bulkDelete(fetched)
        .then(messages => message.channel.send(`Successfully deleted **${messages.size}** messages.`));
    } catch (err) {
      console.log(err);
      message.channel.send(`I was unable to delete the amount stated. Please make sure the messages are within 14 days old.`);
    }
  }
}