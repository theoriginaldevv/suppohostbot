const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const red = '#ff0000';
const green = '#00ff00';

module.exports = class ServerinfoCommand extends BaseCommand {
  constructor() {
    super('serverinfo', 'General', []);
  }

  run(client, message, args) {
    const guild = message.guild;
    const serverInfoEmbed = new Discord.MessageEmbed()
      .setColor('#b26bdb')
      .setTitle('Server Statistics')
      .setDescription(`Server statistics for **${guild.name}**`)
      .addFields(
        { name: 'Guild Creation Date', value: guild.createdAt, inline: true },
        { name: 'Guild Owner', value: `<@${guild.ownerID}>`, inline: true },
        { name: 'Member Count', value: guild.memberCount, inline: true },
        { name: 'Server region', value: guild.region, inline: true },
        { name: 'Rules channel', value: `<#${guild.rulesChannelID}>`, inline: true }
      )
      .setFooter(`${guild.name} - Active Server Statistics`)
      .setTimestamp()
      .setThumbnail(guild.iconURL())
    message.channel.send(serverInfoEmbed);
    if (!guild.rulesChannelID) return message.channel.send('You have no rules channel on this server.');
  }
}