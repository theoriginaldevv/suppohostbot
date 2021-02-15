const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'Moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply(
      new Discord.MessageEmbed()
        .setColor(red)
        .setDescription('You do not have permission to execute this command.')
        .setFooter('Kick_Members, Administrator')
    )
    if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply(
      new Discord.MesssageEmbed()
        .setColor(red)
        .setDescription('I do not have permissions to kick this user.')
        .setFooter('Kick_Members, Administrator')
    )
    const mentionedMember = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given"
    const red = '#ff0000';
    const green = '#00ff00';
    const kickEmbed = new Discord.MessageEmbed()
      .setColor(green)
      .setTitle(`You were kicked from ${message.guild.name}`)
      .setDescription('You were kicked.')
      .addFields(
        { name: 'Server name', value: `${message.guild.name}`, inline: true },
        { name: 'Reason', value: `${reason}`, inline: true },
        { name: 'Moderator', value: `<@${message.author.id}>`, inline: true }
      )
      .setTimestamp()

    // suppo!kick @User Reason
    if (!args[0]) return message.reply(
      new Discord.MessageEmbed()
        .setColor(red)
        .setDescription('You need to mention at least a user. \`suppo!kick @User Reason\`')
    )
    if (!mentionedMember) return message.reply(
      new Discord.MessageEmbed()
        .setColor(red)
        .setDescription('The mentioned member is not in this server or is not a valid member.')
    )
    try {
      await mentionedMember.send(kickEmbed);
    } catch {
      console.log('I was unable to message the member.');
      message.channel.send('The mentioned user has their DMs turned off which means they can\'t get a notification in DM after you kicked. (They were still kicked)');
    }

    try {
     await mentionedMember.kick(reason);
    } catch {
      console.log(err);
      message.channel.send('I was unable to kick the member.')
    }
  }
}