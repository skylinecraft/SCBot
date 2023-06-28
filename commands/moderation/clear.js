const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear from 1 to 99 messages in the channel run in.')
        .addIntegerOption(option => option.setName('amount').setDescription('Number of messages to clear').setRequired(true)),
    async execute(interaction) {
        const sender = interaction.member
        if (sender.roles.cache.some(role => role.name === "STAFF")) {
            const amount = interaction.options.getInteger('amount')
            if (amount < 1 || amount > 99) {
                return interaction.reply({ content: 'You need to input a number between 1 and 99.', ephemeral: true })
            }
            await interaction.channel.bulkDelete(amount, true)
            return interaction.reply({ content: `Clear successful`, ephemeral: true })
        } else {
            return interaction.reply({ content: 'You need to be a Mod or above to run this command!', ephemeral: true })
        }
    }
}