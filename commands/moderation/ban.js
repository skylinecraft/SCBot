const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Permanently ban a user from the server.')
        .addUserOption(option => option.setName('target').setDescription('The user to ban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason the user is banned').setRequired(true)),
    async execute(interaction) {
        const sender = interaction.member
        if (sender.roles.cache.some(role => role.name === "STAFF")) {
            const target = interaction.options.getUser('target')
            const reason = interaction.options.getString('reason')
            const guild = interaction.guild
            await guild.members.ban(target, { reason: reason })
            const channel = interaction.client.channels.cache.get('1123704039318753370')
            await channel.send(`${sender} permanently banned ${target} for ${reason}`)
            return interaction.reply({ content: 'Ban successful', ephemeral: true })
        } else {
            return interaction.reply({ content: 'You need to be a Mod or above to run this command!', ephemeral: true })
        }
    }
}