const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user from the server.')
        .addUserOption(option => option.setName('target').setDescription('The user to kick').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason the user is kicked').setRequired(true)),
    async execute(interaction) {
        const sender = interaction.member
        if (sender.roles.cache.some(role => role.name === "STAFF")) {
            const target = interaction.options.getMember('target')
            const reason = interaction.options.getString('reason')
            await target.kick(reason)
            const channel = interaction.client.channels.cache.get('1113316615862366259')
            await channel.send(`${sender} kicked ${target} for ${reason}`)
            return interaction.reply({ content: 'Kick successful', ephemeral: true })
        } else {
            return interaction.reply({ content: 'You need to be a Mod or above to run this command!', ephemeral: true })
        }
    }
}