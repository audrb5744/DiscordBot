const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('유저')
		.setDescription('유저 데이터 확인')
		.addUserOption(option => option.setName('대상').setDescription('정보 확인을 원하는 유저를 지정 할 수 있습니다.')),
	async execute(interaction) {
		const user = interaction.options.getUser('대상');
		if (user != null) {
		const userEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle(`유저 ID`)
			.setAuthor({ name: `${user.username}의 프로필`})
			.setDescription(`${user.id}`)
			.setThumbnail(`${user.displayAvatarURL()}`)
			.setFooter({ text: `${interaction.user.username}이 실행함`})
			interaction.reply({ embeds: [userEmbed] });
		} else {
		const userEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle(`유저 ID`)
			.setAuthor({ name: '내 프로필'})
			.setDescription(`${interaction.user.id}`)
			.setThumbnail(`${interaction.user.displayAvatarURL()}`)
			.setFooter({ text: `${interaction.user.username}이 실행함`})
			interaction.reply({ embeds: [userEmbed] });
		}
		

	},
};