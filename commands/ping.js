const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('핑')
		.setDescription('봇의 응답 속도를 확인할 수 있습니다.'),
	async execute(interaction,message,) {
		const sent = await interaction.reply({ content: '속도 확인 중...', fetchReply: true });
		interaction.editReply(`음... 응답 속도는 ${(sent.createdTimestamp - interaction.createdTimestamp) / 1000}초네요!`);
	}
};