const { PermissionOverwrites } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class TicketCommand extends BaseCommand {
  constructor() {
    super('ticket', 'Tickets', []);
  }

  async run(client, message, args) {
    
  }
}