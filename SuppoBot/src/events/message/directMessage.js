const BaseEvent = require('../../utils/structures/BaseEvent');
const Discord = require('discord.js');
const DESTINATION = '810538195435520020';
const red = '#ff0000';
const green = '#00ff00';
const ACCEPT = '810610869397356624';
const REJECT = '❎';

const openedTickets = new Map();

module.exports = class DirectMessageEvent extends BaseEvent {
    constructor() {
        super('directMessage');
    }

    async run(client, message) {
        console.log('Inside DM Event');
        if (!openedTickets.has(message.author.id)) {
            message.reply(
                new Discord.MessageEmbed()
                    .setColor(green)
                    .setTitle('We have received your message.')
                    .setDescription('Please kindly wait while one of our support team gets back to your message.')
            )
            openedTickets.set(message.author.id, message.guild);
            const channel = client.channels.cache.get(DESTINATION);
            if(channel) {
                const embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('New Modmail Message')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setDescription(message.content);
                    const msg = await channel.send(embed);
                    await msg.react(ACCEPT);
                    await msg.react(REJECT);

                    try {
                        const reactionFilter = (reaction, user) => [ACCEPT, REJECT].includes(reaction.emoji.id) && !user.bot;
                        const reactions = await msg.awaitReactions(reactionFilter, { max: 1, time: 10000, errors: ['time'] });
                        const choice = reactions.get(ACCEPT) || reactions.get(REJECT);
                        if (choice.emoji.id == ACCEPT) {

                        } else if (choice.emoji.id === REJECT){
                            message.author.send('Your messages was rejected. You may try again later.');
                            setTimeout(() => {
                                openedTickets.delete(message.author.id);
                            }, 10000);
                        }
                    } catch (err) {
                        console.log(err);
                        message.author.send('No one was able to accept your query. Please try again.');
                        openedTickets.delete(message.author.id);
                    }
            } else {
                message.channel.send('Something went wrong. Please reach out to the staff directly.');
                openedTickets.delete(message.author.id);
            }
        }
    }
}