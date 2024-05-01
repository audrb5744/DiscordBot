const { SlashCommandBuilder, EmbedBuilder, Client, GatewayIntentBits} = require('discord.js'); 
const { quizList } = require('../quizs.json');
const client = require("../index.js");
let quizing = false;
let nowQuiz = Math.floor(Math.random() * quizList.length);
let waiting = false;
client.on("messageCreate", (message) => {
	if(message.author.bot) return;
	if(message.channelId !== "1098098452128333936") return;
	if(waiting == true) return;
	if(quizing == true){
		if (message.content == quizList[nowQuiz].answer) {
			waiting = true;
			const userEmbed = new EmbedBuilder()
			.setColor(0x00FF00)
			.setAuthor({ name: `정답자`})
			.setDescription(`${message.author}`)
			message.channel.send({ embeds: [userEmbed] })
			.then((msg)=> {
				setTimeout(function(){
					nowQuiz = Math.floor(Math.random() * quizList.length);
					msg.delete()
					const userEmbed2 = new EmbedBuilder()
					.setColor(0x0000FF)
					.setTitle(`다음 설명으로 옳은 것은?`)
					.setDescription(`${quizList[nowQuiz].quiz}`)
					message.channel.send({ embeds: [userEmbed2] });
					waiting = false;
				}, 3000)
			}); 	
		} else {
			const userEmbed = new EmbedBuilder()
			.setColor(0xFF0000)
			.setAuthor({ name: `오답`})
			.setDescription(`"${message.content}"는 정답이 아닙니다.`)
			message.reply({ embeds: [userEmbed] })
			.then((msg)=> {
				setTimeout(function(){
					msg.delete();
				}, 3000)
			});
		}
	} else {
		const userEmbed = new EmbedBuilder()
			.setColor(0xFF0000)
			.setAuthor({ name: `진행중이 아님`})
			.setDescription(`/퀴즈 명령어를 사용하여 시작해보세요`)
			message.reply({ embeds: [userEmbed], ephemeral: true })
			.then((msg)=> {
				setTimeout(function(){
					msg.delete();
				}, 3000)
			});
	}
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('퀴즈')
		.setDescription('랜덤 문제가 제시됩니다.')
		.addStringOption(option => option.setName('주제').setDescription('주제를 선택할 수 있습니다.')
		.setAutocomplete(true)),
	async execute(interaction) {
		function makeQuiz () {
			nowQuiz = Math.floor(Math.random() * quizList.length);
			const userEmbed = new EmbedBuilder()
			.setColor(0x0000FF)
			.setTitle(`다음 설명으로 옳은 것은?`)
			.setDescription(`${quizList[nowQuiz].quiz}`)
			interaction.reply({ embeds: [userEmbed] });
			quizing = true;
		}
		if(quizing != true){
			const subject = interaction.options.getString('주제');
			msg.delete();
			if(subject != null){
				nowQuiz = Math.floor(Math.random() * quizList.length);
				if(subject == 'test') {
					makeQuiz();
				} else {
					const userEmbed = new EmbedBuilder()
					.setColor(0xFF0000)
					.setAuthor({ name: `주제 선택 오류`})
					.setDescription(`올바른 값을 입력해주세요.`)
					interaction.reply({ embeds: [userEmbed], ephemeral: true });
				}
			} else {
				const userEmbed = new EmbedBuilder()
				.setColor(0xFFFFFF)
				.setTitle(`no vlaue`)
				.setDescription(`des`)
				interaction.reply({ embeds: [userEmbed] });
			}
		} else {
			const userEmbed = new EmbedBuilder()
			.setColor(0xFF0000)
			.setTitle(`현재 문제를 맞춰주세요`)
			.setDescription(`${quizList[nowQuiz].quiz}`)
			interaction.reply({ embeds: [userEmbed], ephemeral:true });
		}
	},
	
	
		
};




