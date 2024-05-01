const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
	.setName('메시지')
	.setDescription('특정 멤버에게 메시지를 보냅니다.')
    .addStringOption(option =>
        option
            .setName('메시지')
            .setDescription('보낼 메시지')
            .setRequired(true))
	.addUserOption(option =>
		option
			.setName('대상')
			.setDescription('보낼 대상')
			.setRequired(true))
	.setDMPermission(false),

    async execute(interaction){
        const sendUser = interaction.options.getUser('대상');
        const sendMessage = interaction.options.getString('메시지');
        const secretSendEmbed = new EmbedBuilder()
			.setColor(0x0000FF)
			.setTitle(`${sendUser.username}에게 보냄`)
			.setAuthor({name: `전달 성공`})
			.setDescription(`${sendMessage}`)
			.setThumbnail(`${sendUser.displayAvatarURL()}`)
            .setFooter({ text: `[ ! ] 상대방의 DM이 닫혀 있을 경우 메시지가 전달되지 않았을 수 있습니다.`})
			interaction.reply({ embeds: [secretSendEmbed], ephemeral: true });
        await sendUser.send(`${sendMessage}`);
        
    },
};

