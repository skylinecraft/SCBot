const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban a user from the server.')
        .addUserOption(option => option.setName('target').setDescription('The user to unban').setRequired(true)),
    async execute(interaction) {
        const sender = interaction.member
        if (sender.roles.cache.some(role => role.name === "STAFF")) {
            const target = interaction.options.getUser('target')
            const guild = interaction.guild
            await guild.members.unban(target)
            const channel = interaction.client.channels.cache.get('1123704039318753370')
            await channel.send(`${sender} unbanned ${target}`)
            return interaction.reply({ content: 'Unban successful', ephemeral: true })
        } else {
            return interaction.reply({ content: 'You need to be a Mod or above to run this command!', ephemeral: true })
        }
    }
}