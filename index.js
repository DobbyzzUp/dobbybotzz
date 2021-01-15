const {
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   GroupSettingChange,
   waChatKey,
   mentionedJid,
   processTime,
} = require("@adiwajshing/baileys")
const qrcode = require("qrcode-terminal") 
const moment = require("moment-timezone") 
const fs = require("fs") 
const { color, bgcolor } = require('./lib/color')
const { help } = require('./lib/help')
const { donasi } = require('./lib/donasi')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const { exec } = require("child_process")
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' 
            + 'FN:Affis Admin\n' 
            + 'ORG: Pengembang XBot;\n' 
            + 'TEL;type=CELL;type=VOICE;waid=6282334297175:+62 823-3429-7175\n' 
            + 'END:VCARD' 
prefix = '/'
blocked = []          

/*********** LOAD FILE ***********/
const _leveling = JSON.parse(fs.readFileSync('./database/group/leveling.json'))
const _level = JSON.parse(fs.readFileSync('./database/user/level.json'))
const welkom = JSON.parse(fs.readFileSync('./database/bot/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./database/bot/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./database/bot/simi.json'))
/*********** END LOAD ***********/

/********** FUNCTION ***************/
const getLevelingXp = (userId) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].xp
            }
        }

        const getLevelingLevel = (userId) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].level
            }
        }

        const getLevelingId = (userId) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].jid
            }
        }

        const addLevelingXp = (userId, amount) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                _level[position].xp += amount
                fs.writeFileSync('./database/user/level.json', JSON.stringify(_level))
            }
        }

        const addLevelingLevel = (userId, amount) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                _level[position].level += amount
                fs.writeFileSync('./database/user/level.json', JSON.stringify(_level))
            }
        }

        const addLevelingId = (userId) => {
            const obj = {jid: userId, xp: 1, level: 1}
            _level.push(obj)
            fs.writeFileSync('./database/user/level.json', JSON.stringify(_level))
        }
        
       

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}
/********** FUNCTION ***************/

const client = new WAConnection()
   client.on('qr', qr => {
   qrcode.generate(qr, { small: true })
   console.log(color('[','white'),color('∆','red'),color(']','white'),color('qr already scan.subscribe','white'),color('YOU','red'),color('TUBE','white'),color('ampibi gaming','yellow'))
})

client.on('credentials-updated', () => {
	const authInfo = client.base64EncodedAuthInfo()
   console.log(`credentials updated!`)
   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t'))
})
fs.existsSync('./session.json') && client.loadAuthInfo('./session.json')
client.connect();


client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `𝐎𝐥𝐚́ @${num.split('@')[0]} ♥️\n𝐁𝐞𝐦 𝐯𝐢𝐧𝐝𝐨 𝐚𝐨 𝐠𝐫𝐮𝐩𝐨:\n${mdata.subject}\n𝐔𝐬𝐞 𝐚 𝐭𝐚𝐠 𝐞 𝐥𝐞𝐢𝐚 𝐚𝐬 𝐫𝐞𝐠𝐫𝐚𝐬 𝐩𝐚𝐫𝐚 𝐞𝐯𝐢𝐭𝐚𝐫 𝐬𝐞𝐫 𝐛𝐚𝐧𝐢𝐝𝐨(𝐚) ✅\n(𝐂𝐚𝐬𝐨 𝐧𝐚𝐨 𝐜𝐨𝐧𝐬𝐢𝐠𝐚 𝐥𝐞𝐫 𝐚 𝐝𝐞𝐬𝐜𝐫𝐢𝐜̧𝐚̃𝐨 𝐝𝐞 𝐠𝐫𝐮𝐩𝐨, 𝐝𝐢𝐠𝐢𝐭𝐞 /𝐫𝐞𝐠𝐫𝐚𝐬)`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `𝐎 @${num.split('@')[0]} 𝐧𝐨𝐬 𝐝𝐞𝐢𝐱𝐨𝐮 🥺 𝐩𝐫𝐞𝐬𝐬 𝐅 💔`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
	client.on('CB:Blocklist', json => {
		if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('message-new', async (mek) => {
		try {
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)

			mess = {
				wait: '❬❗❭ 𝗪𝗔𝗜𝗧, 𝗹𝗮𝗴𝗶 𝗽𝗿𝗼𝘀𝗲𝘀',
				success: '️❬ ✔ ❭ 𝘀𝘂𝗰𝗰𝗲𝘀𝘀 🖤',
				levelon: '❬ ✔ ❭ *enable leveling*',
				leveloff: ' ❬ X ❭  *disable leveling*',
				levelnoton: '❬ X ❭ *leveling not aktif*',
				levelnol: '*LEVEL KAKAK MASIH* 0 °-°',
				error: {
					stick: '*Yah gagal, coba ulangi ^_^*',
					Iv: '𝗠𝗮𝗮𝗳 𝗹𝗶𝗻𝗸 𝘁𝗶𝗱𝗮𝗸 𝘃𝗮𝗹𝗶𝗱☹️'
				},
				only: {
					group: '❗𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐝𝐢𝐬𝐩𝐨𝐧𝐢𝐯𝐞𝐥 𝐚𝐩𝐞𝐧𝐚𝐬 𝐞𝐦 𝐠𝐫𝐮𝐩𝐨𝐬❗',
					ownerG: '❗𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐞𝐱𝐜𝐥𝐮𝐬𝐢𝐯𝐨 𝐝𝐨 𝐚𝐝𝐦 𝐷𝑂𝐵𝐵𝑌♱᭄ ❗',
					ownerB: '❗𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐞𝐱𝐜𝐥𝐮𝐬𝐢𝐯𝐨 𝐝𝐨 𝐚𝐝𝐦 𝐷𝑂𝐵𝐵𝑌♱᭄ ❗',
					admin: '❗𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐞𝐱𝐜𝐥𝐮𝐬𝐢𝐯𝐨 𝐩𝐚𝐫𝐚 𝐚𝐝𝐦𝐢𝐧𝐬, 𝐬𝐞𝐮 𝐦𝐞𝐦𝐛𝐫𝐨 𝐜𝐨𝐦𝐮𝐦 🤬❗',
					Badmin: '❗𝐄 𝐧𝐞𝐜𝐞𝐬𝐬𝐚́𝐫𝐢𝐨 𝐨 𝐛𝐨𝐭 𝐬𝐞𝐫 𝐮𝐦 𝐚𝐝𝐦!❗'
				}
			}

			const botNumber = client.user.jid
			const ownerNumber = ["5511942115778@s.whatsapp.net"] 
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
            const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
            const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
            const isLevelingOn = isGroup ? _leveling.includes(groupId) : false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : true
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
			
	        //function leveling
            if (isGroup && isLevelingOn) {
            const currentLevel = getLevelingLevel(sender)
            const checkId = getLevelingId(sender)
            try {
                if (currentLevel === undefined && checkId === undefined) addLevelingId(sender)
                const amountXp = Math.floor(Math.random() * 10) + 500
                const requiredXp = 5000 * (Math.pow(2, currentLevel) - 1)
                const getLevel = getLevelingLevel(sender)
                addLevelingXp(sender, amountXp)
                if (requiredXp <= getLevelingXp(sender)) {
                    addLevelingLevel(sender, 1)
                    await reply(`*「 LEVEL UP 」*\n\n➸ *Name*: ${sender}\n➸ *XP*: ${getLevelingXp(sender)}\n➸ *Level*: ${getLevel} -> ${getLevelingLevel(sender)}\n\nCongrats!! 🎉🎉`)
                }
            } catch (err) {
                console.error(err)
            }
        }

			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			
			switch(command) {
				case 'bisakah':
					bisakah = body.slice(1)
					const bisa =['Bisa','Tidak Bisa','Coba Ulangi']
					const keh = bisa[Math.floor(Math.random() * bisa.length)]
					client.sendMessage(from, 'Pertanyaan : *'+bisakah+'*\n\nJawaban : '+ keh, text, { quoted: mek })
					break
				case 'imunes':
					reply('🌹𝐌𝐞𝐥𝐡𝐨𝐫𝐞𝐬 𝐢𝐦𝐮𝐧𝐞𝐬 𝐝𝐚 𝐚𝐭𝐮𝐚𝐥𝐢𝐝𝐚𝐝𝐞🌹\n⚡𝐓𝐢𝐬𝐮𝐕1:\n🌹https://youtu.be/XTFiom_tBaU\n\n⚡𝐓𝐢𝐬𝐮𝐕2:\nhttps://youtu.be/wx568PBGh2w\n\n🌹𝐂𝐨𝐦𝐨 𝐩𝐚𝐬𝐬𝐚𝐫 𝐩𝐞𝐥𝐨 𝐞𝐧𝐜𝐮𝐫𝐭𝐚𝐝𝐨𝐫🌹:\nhttps://youtu.be/QH7FMSnIWK0\n\n🌹𝐂𝐨𝐦𝐨 𝐢𝐧𝐬𝐭𝐚𝐥𝐚𝐫 𝐰𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐢𝐦𝐮𝐧𝐞 𝐬𝐞𝐦 𝐞𝐫𝐫𝐨𝐬✅\nhttps://youtu.be/ooR9k1DxOtI')
		 		break
				case 'tisu':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/hmjQDL3.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '⚡𝐓𝐢𝐬𝐮 𝐝𝐞𝐥 𝐙𝐚𝐩 ϟ\n🌹𝐃𝐨𝐧𝐨 𝐝𝐚 𝐅𝐂𝐂 ᬊ͜͡𝑹𝑨ϟ𝑶⚡\n🌹𝐀𝐝𝐦 𝐒𝐮𝐩𝐫𝐞𝐦𝐨 𝐝𝐚 ᬊ͜͡𝑹𝑨ϟ𝑶℘⚡\n🌹𝐂𝐚𝐧𝐚𝐥:\nhttps://youtube.com/channel/UC7JdGFqRraNbKLCv5UTWtVA\n🌹𝐈𝐧𝐬𝐭𝐚:\nhttps://instagram.com/tisuzz?igshid=175cmdn23fk6c'})
					break
				case 'kirito':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://imgur.com/VuICDTD.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '🌹𝑲𝑰𝑹𝑰𝑻𝑶ッ\n🌹𝐀𝐝𝐦 𝐒𝐮𝐩𝐫𝐞𝐦𝐨 𝐝𝐚 ᬊ͜͡𝑹𝑨ϟ𝑶℘⚡\n🌹𝐂𝐚𝐧𝐚𝐥:\nhttps://youtube.com/c/lele007%E3%83%83\n🌹𝐈𝐧𝐬𝐭𝐚:off'})
					break
				case 'salada':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/aFJDAN3.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '╠═══〘𝐒4𝐋𝐀𝐃𝐀〙\n║\n║➣𝐀𝐃𝐌 𝐒𝐔𝐏𝐑𝐄𝐌𝐎 𝐃𝐎 𝐓𝐈𝐒𝐔 : 𝐒4𝐋𝐀𝐃𝐀   \n║\n║➣𝐂𝐀𝐍𝐀𝐋:https://www.youtube.com/channel/UCm3nyU3EHF1PNMCN3XCjTTw\n║\n║\n║➣𝐈𝐍𝐒𝐓𝐀:https://www.instagram.com/saladax.ff/\n║\n╠═══════════'})
					break
				case 'dono':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/PO5PYYI.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '🌹𝐃𝐨𝐧𝐨 𝐝𝐨 𝐛𝐨𝐭: 𝐷𝑂𝐵𝐵𝑌♱᭄\n🌹𝐈𝐧𝐬𝐭𝐚:off\n🌹𝐂𝐨𝐧𝐭𝐚𝐭𝐨:wa.me/5511942115778\n\n\nDìgite /bot para ver comandos basicos para criar um bot'})
					break
				case 'tag':
					reply('ᬊ͜͡𝑹𝑨ϟ𝑶℘seu nome⚡')
		 		break
				case 'bot':
			     	memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/dPUVFF6.png`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '🔗𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐛𝐚𝐬𝐢𝐜𝐨𝐬 𝐩𝐚𝐫𝐚 𝐛𝐨𝐭 𝐧𝐨 𝐓𝐞𝐫𝐦𝐮𝐱🔗:\n\n🔗$termux-setup-storage\n🔗$pkg upgrade && pkg update\n🔗$pkg install git\n🔗$pkg install wget\n🔗$pkg install libwebp\n🔗$pkg install ffmpeg\n🔗$pkg install nodejs\n🔗$git clone (git que deseja clonar)\n🔗$cd (nome do repositório)\n🔗$bash install.sh\n🔗$(npm start) ou (node index.js) 𝐩𝐚𝐫𝐚 𝐠𝐞𝐫𝐚𝐫 𝐬𝐞𝐮 𝐪𝐫 𝐜𝐨𝐝𝐞 𝐞 𝐢𝐧𝐢𝐜𝐢𝐚𝐫 𝐬𝐞𝐮 𝐛𝐨𝐭\n\n\n➣By 𝐷𝑂𝐵𝐵𝑌♱᭄ hehe 👻'})
					break
				case 'grupos':
					reply('⚡𝐆𝐫𝐮𝐩𝐨𝐬 𝐝𝐞 𝐑𝐞𝐜𝐫𝐮𝐭𝐚𝐦𝐞𝐧𝐭𝐨 𝐝𝐚 𝐅𝐂𝐂 𝐑𝐚𝐢𝐨⚡\n\nᬊ͜͡𝑹𝑨ϟ𝑶℘𝙍𝘾𝙏 𝟏📴⚡\nhttps://chat.whatsapp.com/DLQIGjbVIWSBrMCo5mO3f8\n\nᬊ͜͡𝑹𝑨ϟ𝑶℘𝙍𝘾𝙏 𝟐📴⚡\nhttps://chat.whatsapp.com/FFzcWBC71JN2etrY5bDzbd\n\nᬊ͜͡𝑹𝑨ϟ𝑶℘𝙍𝘾𝙏 𝟑📴⚡\nhttps://chat.whatsapp.com/DLQIGjbVIWSBrMCo5mO3f8\n\n⚡𝐆𝐫𝐮𝐩𝐨𝐬 𝐝𝐨 𝐓𝐢𝐬𝐮⚡\n𝐃𝐞𝐧𝐮́𝐧𝐜𝐢𝐚𝐬 𝐠𝐞𝐫𝐚𝐢𝐬 🆘:\nhttps://chat.whatsapp.com/EDq2ekTWnbi5I1CqPiYiLp\n\n𝐃𝐢𝐯𝐮𝐥𝐠𝐚𝐜̧𝐚̃𝐨 𝐠𝐞𝐫𝐚𝐥✅\nhttps://chat.whatsapp.com/FEJ68aMBB2QLjsKwnj7w5Y\n\n𝐁𝐚𝐭𝐞-𝐏𝐚𝐩𝐨🔊:\nhttps://chat.whatsapp.com/KfsvBzPeAn16MM9s5uiAnW\n\n🦄𝐌𝐞𝐦𝐞𝐬 𝐞 𝐟𝐢𝐠𝐮𝐫𝐢𝐧𝐡𝐚𝐬⚡:\nhttps://chat.whatsapp.com/C9q9q99SxrcCfq6Q6qPDEd\n\n🦄𝐌𝐞𝐦𝐞𝐬 𝐞 𝐟𝐢𝐠𝐮𝐫𝐢𝐧𝐡𝐚𝐬 2⚡:\nhttps://chat.whatsapp.com/J7x8NF5lL6t8fNOuxPJKOq\n\n🧪𝐋𝐚𝐛𝐨𝐫𝐚𝐭𝐨́𝐫𝐢𝐨 1⚡:\nhttps://chat.whatsapp.com/BwsobuaYuTU2031uQQ0HOp\n\n🧪𝐋𝐚𝐛𝐨𝐫𝐚𝐭𝐨́𝐫𝐢𝐨 2⚡:\nhttps://chat.whatsapp.com/DYnO1NequRS6sdTl6UzJMs\n\n🧪𝐋𝐚𝐛𝐨𝐫𝐚𝐭𝐨́𝐫𝐢𝐨 3⚡:\nhttps://chat.whatsapp.com/HOkhvaI8qZoLAmEne9GdNF\n\n🧪𝐋𝐚𝐛𝐨𝐫𝐚𝐭𝐨́𝐫𝐢𝐨 4⚡:\nhttps://chat.whatsapp.com/ED5xjahgiBOLF6yjTJVhDi\n\n🧪𝐋𝐚𝐛𝐨𝐫𝐚𝐭𝐨́𝐫𝐢𝐨 5⚡:\nhttps://chat.whatsapp.com/J9ciz7gyKUtGcB9n5y82Oi')
		 		break
				case 'kapankah':
					kapankah = body.slice(1)
					const kapan =['Besok','Lusa','Tadi','4 Hari Lagi','5 Hari Lagi','6 Hari Lagi','1 Minggu Lagi','2 Minggu Lagi','3 Minggu Lagi','1 Bulan Lagi','2 Bulan Lagi','3 Bulan Lagi','4 Bulan Lagi','5 Bulan Lagi','6 Bulan Lagi','1 Tahun Lagi','2 Tahun Lagi','3 Tahun Lagi','4 Tahun Lagi','5 Tahun Lagi','6 Tahun Lagi','1 Abad lagi','3 Hari Lagi']
					const koh = kapan[Math.floor(Math.random() * kapan.length)]
					client.sendMessage(from, 'Pertanyaan : *'+kapankah+'*\n\nJawaban : '+ koh, text, { quoted: mek })
					break
           case 'apakah':
					apakah = body.slice(1)
					const apa =['Iya','Tidak','Bisa Jadi','Coba Ulangi']
					const kah = apa[Math.floor(Math.random() * apa.length)]
					client.sendMessage(from, 'Pertanyaan : *'+apakah+'*\n\nJawaban : '+ kah, text, { quoted: mek })
					break
				case 'rate':
					rate = body.slice(1)
					const ra =['4','9','17','28','34','48','59','62','74','83','97','100','29','94','75','82','41','39']
					const te = ra[Math.floor(Math.random() * ra.length)]
					client.sendMessage(from, 'Pertanyaan : *'+rate+'*\n\nJawaban : '+ te+'%', text, { quoted: mek })
					break
          case 'speed':
          case 'ping':
            await client.sendMessage(from, `Pong!!!!\nSpeed: ${processTime(time, moment())} _Second_`)
            break
               case 'help': 
				case 'menu':
					client.sendMessage(from, help(prefix), text)
					break
				case 'donasi':
				case 'donate':
					client.sendMessage(from, donasi(), text)
				break
                case 'level':
                if (!isLevelingOn) return reply(mess.levelnoton)
                if (!isGroup) return reply(mess.only.group)
                const userLevel = getLevelingLevel(sender)
                const userXp = getLevelingXp(sender)
                if (userLevel === undefined && userXp === undefined) return reply(mess.levelnol)
                sem = sender.replace('@s.whatsapp.net','')
                resul = `┏━━❉ *LEVEL* ❉━━\n┣⊱ Name : ${sem}\n┣⊱ User XP :  ${userXp}\n┣⊱ User Level : ${userLevel}\n┗━━━━━━━━━━━━`
               client.sendMessage(from, resul, text, { quoted: mek})
                .catch(async (err) => {
                        console.error(err)
                        await reply(`Error!\n${err}`)
                    })
            break
				case 'info':
					me = client.user
					uptime = process.uptime()
					teks = `*Nama bot* : ${me.name}\n*OWNER* : *AMPIBI*\n*AUTHOR* : AMPIBI\n*Nomor Bot* : @${me.jid.split('@')[0]}\n*Prefix* : ${prefix}\n*Total Block Contact* : ${blocked.length}\n*The bot is active on* : ${kyun(uptime)}`
					buffer = await getBuffer(me.imgUrl)
					client.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
				case 'listakamikaze': 
					teks = '🌹𝐍𝐮𝐦𝐞𝐫𝐨𝐬 𝐛𝐥𝐨𝐪𝐮𝐞𝐚𝐝𝐨𝐬 𝐝𝐚 𝐍𝐄𝐙𝐙𝐔𝐊𝐎-𝐂𝐇𝐀𝐍⁖ฺ۟̇࣪·֗٬̤⃟🌸 :\n'
					for (let block of blocked) {
						teks += `┣➢ @${block.split('@')[0]}\n`
					}
					teks += `𝐓𝐨𝐭𝐚𝐥 : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break
                case 'chamadatxt':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					var value = body.slice(9)
					var group = await client.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: mek
					}
					client.sendMessage(from, options, text)
					break
                case 'quotemaker':
					var gh = body.slice(12)
					var quote = gh.split("|")[0];
					var wm = gh.split("|")[1];
					var bg = gh.split("|")[2];
					const pref = `Usage: \n${prefix}quotemaker teks|watermark|theme\n\nEx :\n${prefix}quotemaker ini contoh|bicit|random`
					if (args.length < 1) return reply(pref)
					reply(mess.wait)
					anu = await fetchJson(`https://terhambar.com/aw/qts/?kata=${quote}&author=${wm}&tipe=${bg}`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {caption: 'Nih anjim', quoted: mek})
					break
                 case 'phlogo':
					var gh = body.slice(9)
					var gbl1 = gh.split("|")[0];
					var gbl2 = gh.split("|")[1];
					if (args.length < 1) return reply('Teksnya mana um')
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/textpro?theme=pornhub&text1=${gbl1}&text2=${gbl2}`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
                case 'truth':
					const trut =['Pernah suka sama siapa aja? berapa lama?','Kalau boleh atau kalau mau, di gc/luar gc siapa yang akan kamu jadikan sahabat?(boleh beda/sma jenis)','apa ketakutan terbesar kamu?','pernah suka sama orang dan merasa orang itu suka sama kamu juga?','Siapa nama mantan pacar teman mu yang pernah kamu sukai diam diam?','pernah gak nyuri uang nyokap atau bokap? Alesanya?','hal yang bikin seneng pas lu lagi sedih apa','pernah cinta bertepuk sebelah tangan? kalo pernah sama siapa? rasanya gimana brou?','pernah jadi selingkuhan orang?','hal yang paling ditakutin','siapa orang yang paling berpengaruh kepada kehidupanmu','hal membanggakan apa yang kamu dapatkan di tahun ini','siapa orang yang bisa membuatmu sange','siapa orang yang pernah buatmu sange','(bgi yg muslim) pernah ga solat seharian?','Siapa yang paling mendekati tipe pasangan idealmu di sini','suka mabar(main bareng)sama siapa?','pernah nolak orang? alasannya kenapa?','Sebutkan kejadian yang bikin kamu sakit hati yang masih di inget','pencapaian yang udah didapet apa aja ditahun ini?','kebiasaan terburuk lo pas di sekolah apa?']
					const ttrth = trut[Math.floor(Math.random() * trut.length)]
					truteh = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
					client.sendMessage(from, truteh, image, { caption: '*Truth*\n\n'+ ttrth, quoted: mek })
					break
				case 'dare':
					const dare =['Kirim pesan ke mantan kamu dan bilang "aku masih suka sama kamu','telfon crush/pacar sekarang dan ss ke pemain','pap ke salah satu anggota grup','Bilang "KAMU CANTIK BANGET NGGAK BOHONG" ke cowo','ss recent call whatsapp','drop emot "🦄💨" setiap ngetik di gc/pc selama 1 hari','kirim voice note bilang can i call u baby?','drop kutipan lagu/quote, terus tag member yang cocok buat kutipan itu','pake foto sule sampe 3 hari','ketik pake bahasa daerah 24 jam','ganti nama menjadi "gue anak lucinta luna" selama 5 jam','chat ke kontak wa urutan sesuai %batre kamu, terus bilang ke dia "i lucky to hv you','prank chat mantan dan bilang " i love u, pgn balikan','record voice baca surah al-kautsar','bilang "i hv crush on you, mau jadi pacarku gak?" ke lawan jenis yang terakhir bgt kamu chat (serah di wa/tele), tunggu dia bales, kalo udah ss drop ke sini','sebutkan tipe pacar mu!','snap/post foto pacar/crush','teriak gajelas lalu kirim pake vn kesini','pap mukamu lalu kirim ke salah satu temanmu','kirim fotomu dengan caption, aku anak pungut','teriak pake kata kasar sambil vn trus kirim kesini','teriak " anjimm gabutt anjimmm " di depan rumah mu','ganti nama jadi " BOWO " selama 24 jam','Pura pura kerasukan, contoh : kerasukan maung, kerasukan belalang, kerasukan kulkas, dll']
					const der = dare[Math.floor(Math.random() * dare.length)]
					tod = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
					client.sendMessage(from, tod, image, { quoted: mek, caption: '*Dare*\n\n'+ der })
					break				
				case 'waifu':
				   if (!isGroup) return reply(mess.only.group)
                   if (!isNsfw) return reply('nsfw gak aktif')
				   anu = await fetchJson(`https://arugaz.herokuapp.com/api/waifu`)
				   buf = await getBuffer(anu.image)
				   texs = ` *anime name* : ${anu.name} \n*deskripsi* : ${anu.desc} \n*source* : ${anu.source}`
				   client.sendMessage(from, buf, image, { quoted: mek, caption: `${texs}` })
				break
                case 'imoji':
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/emoji2png?emoji=`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
				break
				case 'anime':
				   if (!isGroup) return reply(mess.only.group)
                   if (!isNsfw) return reply('nsfw gak aktif')
					teks = body.slice(7)
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/anime?query=${teks}`, {method: 'get'})
					reply('anime nya ni '+teks+' adalah :\n\n'+anu.title)
					break
                case 'loli':
                   if (!isGroup) return reply(mess.only.group)
                   if (!isNsfw) return reply('nsfw gak aktif')
                    anu = await fetchJson(`https://arugaz.herokuapp.com/api/nekonime` , {method: 'get'})
                    buf = await getBuffer(anu.result)
                    client.sendMessage(from, buf, image, { quoted: mek, caption: '𝐄𝐧𝐭𝐚̃𝐨 𝐯𝐨𝐜𝐞̂ 𝐠𝐨𝐬𝐭𝐚 𝐝𝐞 𝐥𝐨𝐥𝐢𝐬? 🤨'})
                break
                case 'dewabatch':
                   if (!isGroup) return reply(mess.only.group)
                   if (!isNsfw) return reply('nsfw gak aktif')
                    teks = body.slice(11)
                    anu = await fetchJson(`https://arugaz.herokuapp.com/api/dewabatch?q=${teks}` , {method: 'get'})
                    thum = await getBuffer(anu.thumb)
                    client.sendMessage(from, thum, image, {quoted: mek, caption: `${anu.result}`})
                 break
                case 'bug':
                     const pesan = body.slice(5)
                      if (pesan.length > 300) return client.sendMessage(from, 'Maaf Teks Terlalu Panjang, Maksimal 300 Teks', msgType.text, {quoted: mek})
                        var nomor = mek.participant
                       const teks1 = `*[REPORT]*\nNomor : @${nomor.split("@s.whatsapp.net")[0]}\nPesan : ${pesan}`
                      var options = {
                         text: teks1,
                         contextInfo: {mentionedJid: [nomor]},
                     }
                    client.sendMessage('6282334297175@s.whatsapp.net', options, text, {quoted: mek})
                    reply('Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi.')
                    break
                case 'printweb':
					if (args.length < 1) return reply('𝐂𝐚𝐝𝐞̂ 𝐨 𝐥𝐢𝐧𝐤?')
					teks = body.slice(7)
					reply(mess.wait)
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/screenshotweb?url=${teks}`)
					buff = await getBuffer(anu.gambar)
					client.sendMessage(from, buff, image, {quoted: mek})
					break
                case 'bucin':
					gatauda = body.slice(7)
					anu = await fetchJson(`https://arugaz.herokuapp.com/api/howbucins`, {method: 'get'})
					reply(anu.desc)
					break
		        case 'persengay':
					gatauda = body.slice(11)
					anu = await fetchJson(`https://arugaz.herokuapp.com/api/howbucins`, {method: 'get'})
					reply(anu.desc+anu.persen)
					break	
				case 'quotes':
					gatauda = body.slice(8)
					anu = await fetchJson(`https://arugaz.herokuapp.com/api/randomquotes`, {method: 'get'})
					reply(anu.quotes)
					break		
				case 'cerpen':
					gatauda = body.slice(8)
					anu = await fetchJson(`https://arugaz.herokuapp.com/api/cerpen`, {method: 'get'})
					reply(anu.result.result)
					break
				case 'chord':
					if (args.length < 1) return reply('teks nya mana om')
					tels = body.slice(7)
					anu = await fetchJson(`https://arugaz.herokuapp.com/api/chord?q=${tels}`, {method: 'get'})
					reply(anu.result)
					break
                case 'lirik':
                    if (args.length < 1) return reply('judul lagu nya mana om')
                    teha = body.slice(7)
                    anu = await fetchJson(`https://arugaz.herokuapp.com/api/lirik?judul=${teha}` , {method: 'get'})
                    reply(anu.result)
                break
                case 'pokemon':
                   if (!isGroup) return reply(mess.only.group)
                   if (!isNsfw) return reply('nsfw gak aktif')
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=pokemon`, {method: 'get'})
					reply(mess.wait)
					var n = JSON.parse(JSON.stringify(anu));
					var nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek })
					break
                case 'doguinho':
                   if (!isGroup) return reply(mess.only.group)
                   if (!isNsfw) return reply('nsfw gak aktif')
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anjing`, {method: 'get'})
					reply(mess.wait)
					var n = JSON.parse(JSON.stringify(anu));
					var nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek })
					break
                case 'spamcall':
                   if (args.length < 1) return ('masukan nomer tujuan bambang')
                   weha = body.slice(10)
                   anu = await fetchJson(`https://arugaz.herokuapp.com/api/spamcall?no=${weha}` , {method: 'get'})
                   client.sendMessage(from, anu.logs, text, {quoted: mek})
                 break
                case 'indohot':
                   if (!isGroup) return reply(mess.only.group)
                   if (!isNsfw) return reply('nsfw gak aktif')
                   anu = await fetchJson(`https://arugaz.herokuapp.com/api/indohot`, {method: 'get'})
                   if (anu.error) return reply(anu.error)
                   hasil = `*judul* ${anu.result.judul} \n*genre* ${anu.result.genre} \n*durasi* ${anu.result.durasi} \n*url* ${anu.result.url}`
                   client.sendMessage(from, hasil, text, {quoted: mek})
                   break
				case 'baixarvideo':
					if (args.length < 1) return reply('Urlnya mana um?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://st4rz.herokuapp.com/api/ytv2?url=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `🌹𝐓𝐈𝐓𝐔𝐋𝐎 : ${anu.title}❗𝐀𝐠𝐮𝐚𝐫𝐝𝐞, 𝐩𝐨𝐝𝐞 𝐝𝐞𝐦𝐨𝐫𝐚𝐫 𝐮𝐦 𝐩𝐨𝐮𝐜𝐨❗`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek})
					break
                case 'texto3d':
              	    if (args.length < 1) return reply('teksnya mana kak?')
                    teks = `${body.slice(8)}`
                    if (teks.length > 10) return client.sendMessage(from, 'Teksnya kepanjangan, Maksimal 10 kalimat', text, {quoted: mek})
                    buff = await getBuffer(`https://docs-jojo.herokuapp.com/api/text3d?text=${teks}`, {method: 'get'})
                    client.sendMessage(from, buff, image, {quoted: mek, caption: `${teks}`})
			     	break
			    case 'fototiktok':
                    gatauda = body.slice(12)
                    anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/tiktokpp?user=${gatauda}`)
			        buff = await getBuffer(anu.result)
                    reply(anu.result)
			        break
			    case 'map':
                anu = await fetchJson(`https://mnazria.herokuapp.com/api/maps?search=${body.slice(5)}`, {method: 'get'})
                buffer = await getBuffer(anu.gambar)
                client.sendMessage(from, buffer, image, {quoted: mek, caption: `${body.slice(5)}`})
				break
                case 'kbbi':
					if (args.length < 1) return reply('Apa yang mau dicari um?')
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/kbbi?search=${body.slice(6)}`, {method: 'get'})
					reply('Menurut Kbbi:\n\n'+anu.result)
					break
                case 'artinama':
					if (args.length < 1) return reply('Apa yang mau dicari um?')
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/arti?nama=${body.slice(10)}`, {method: 'get'})
					reply('Menurut nama:\n\n'+anu.result)
					break
				case 'ocr': 
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						reply(mess.wait)
						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync(media)
							})
					} else {
						reply('𝗸𝗶𝗿𝗶𝗺 𝗳𝗼𝘁𝗼 𝗱𝗲𝗻𝗴𝗮𝗻 𝗰𝗲𝗽𝘁𝗶𝗼𝗻 ${prefix}𝗼𝗰𝗿')
					}
					break
				case 'stiker': 
				case 'sticker':
				case 's':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`❗𝐅𝐚𝐥𝐡𝐚 𝐚𝐨 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐞𝐫 𝐩𝐚𝐫𝐚 𝐟𝐢𝐠𝐮𝐫𝐢𝐧𝐡𝐚❗`)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
							} else {
						reply(`❗𝐔𝐬𝐞 ${prefix}sticker 𝐬𝐭𝐢𝐜𝐤𝐞𝐫 𝐞𝐦 𝐟𝐨𝐭𝐨𝐬 𝐨𝐮 𝐯𝐢𝐝𝐞𝐨𝐬 𝐧𝐨 𝐦𝐚𝐱𝐢𝐦𝐨 10𝐬❗`)
					}
					break
				case 'getses':
            	if (!isOwner) return reply(mess.only.ownerB)
            const sesPic = await client.getSnapshot()
            client.sendFile(from, sesPic, 'session.png', '^_^...', id)
            break	
				case 'gtts':	
				case 'tts':
					if (args.length < 1) return client.sendMessage(from, 'Diperlukan kode bahasa!!', text, {quoted: mek})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return client.sendMessage(from, 'Mana teks yang ma di jadiin suara? suara saya kah:v?', text, {quoted: mek})
					dtt = body.slice(9)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 300
					? reply('lah teks nya kepanjangan bambang😤')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buff = fs.readFileSync(rano)
							if (err) return reply('Yah gagal, coba ulangi ^_^')
							client.sendMessage(from, buff, audio, {quoted: mek, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					break
				case 'prefixo':
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					reply(`🌹𝐷𝑂𝐵𝐵𝑌♱᭄ 𝐨 𝐩𝐫𝐞𝐟𝐢𝐱𝐨 𝐦𝐮𝐝𝐨𝐮 𝐩𝐚𝐫𝐚: ${prefix}`)
					break 
				case 'hilih': 
					if (args.length < 1) return reply('kasih teks lah^_^!!!')
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/hilih?teks=${body.slice(7)}`, {method: 'get'})
					reply(anu.result)
					break
				case 'tiktokstalk':
					try {
						if (args.length < 1) return client.sendMessage(from, '𝘂𝘀𝗲𝗿𝗻𝗮𝗺𝗲 𝗺𝗮𝗻𝗮 ?', text, {quoted: mek})
						let { user, stats } = await tiktod.getUserProfileInfo(args[0])
						reply(mess.wait)
						teks = `*ID* : ${user.id}\n*Username* : ${user.uniqueId}\n*Nickname* : ${user.nickname}\n*Followers* : ${stats.followerCount}\n*Followings* : ${stats.followingCount}\n*Posts* : ${stats.videoCount}\n*Luv* : ${stats.heart}\n`
						buffer = await getBuffer(user.avatarLarger)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: teks})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('[𝗘𝗥𝗥𝗢𝗥] 𝗸𝗲𝗺𝘂𝗻𝗴𝗸𝗶𝗻𝗮𝗻 𝘂𝘀𝗲𝗿𝗻𝗮𝗺𝗲 𝘁𝗶𝗱𝗮𝗸 𝘃𝗮𝗹𝗶𝗱')
					}
					break
				case 'fitnah':	
				case 'fake':          
               if (!isGroup) return reply(mess.only.group)
                arg = body.substring(body.indexOf(' ') + 1)
				isi = arg.split(' |')[0] 
				pesan = arg.split('|')[1] 
				pesan2 = arg.split('|')[2] 
                reply(pesan, isi, pesan2)
                break
                 case 'linkgrupo':
				    if (!isGroup) return reply(mess.only.group)
				    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
				    linkgc = await client.groupInviteCode (from)
				    yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink Group *${groupName}*`
				    client.sendMessage(from, yeh, text, {quoted: mek})
			        break
				case 'chamada':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `┣➥ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					break
				case 'limparchat':
					if (!isOwner) return reply(mess.only.ownerB)
					anu = await client.chats.all()
					client.setMaxListeners(25)
					for (let _ of anu) {
						client.deleteChat(_.jid)
					}
					reply('🌹𝐷𝑂𝐵𝐵𝑌♱᭄ 𝐨𝐬 𝐜𝐡𝐚𝐭𝐬 𝐝𝐨 𝐬𝐞𝐮 𝐛𝐨𝐭 𝐟𝐨𝐫𝐚𝐦 𝐥𝐢𝐦𝐩𝐨𝐬 𝐜𝐨𝐦 𝐬𝐞𝐜𝐞𝐬𝐬𝐨✅')
					break
			       case 'bloquear':
				 client.updatePresence(from, Presence.composing) 
				 client.chatRead (from)
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
					client.blockUser (`${body.slice(7)}@c.us`, "add")
					client.sendMessage(from, `🌹𝐎 ${body.slice(7)}@c.us 𝐅𝐨𝐢 𝐛𝐥𝐨𝐪𝐮𝐚𝐝𝐨 𝐜𝐨𝐦 𝐬𝐮𝐜𝐞𝐬𝐬𝐨✅`, text)
					break
                    case 'desbloquear':
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
				    client.blockUser (`${body.slice(9)}@c.us`, "remove")
					client.sendMessage(from, `🌹𝐎 ${body.slice(9)}@c.us 𝐅𝐨𝐢 𝐝𝐞𝐬𝐛𝐥𝐨𝐪𝐮𝐚𝐝𝐨 𝐜𝐨𝐦 𝐬𝐮𝐜𝐞𝐬𝐬𝐨✅`, text)
				break
				case 'autoban': 
				if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
				await client.leaveGroup(from, '𝐀𝐝𝐞𝐮𝐬 🥺', groupId)
                    break
				case 'bc': 
					if (!isOwner) return reply(mess.only.ownerB) 
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `❮ 𝙋𝙀𝙎𝘼𝙉 𝘽𝙍𝙊𝘼𝘿𝘾𝘼𝙎𝙏 ❯\n\n${body.slice(4)}`})
						}
						reply('𝙨𝙪𝙘𝙘𝙚𝙨𝙨 𝙗𝙧𝙤𝙖𝙙𝙘𝙖𝙨𝙩 ')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `❮ 𝙋𝙀𝙎??𝙉 𝘽𝙍𝙊𝘼𝘿𝘾𝘼𝙎𝙏 ❯\n\n${body.slice(4)}`)
						}
						reply('𝙨𝙪𝙘𝙘𝙚𝙨𝙨 𝙗𝙧𝙤𝙖𝙙𝙘𝙖𝙨𝙩 ')
					}
					break
			   	case 'mudarfoto': 
                        if (!isGroup) return reply(mess.only.group)
                       if (!isGroupAdmins) return reply(mess.only.admin)
                        if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                       media = await client.downloadAndSaveMediaMessage(mek)
                         await client.updateProfilePicture (from, media)
                        reply('𝐄𝐬𝐬𝐚 𝐞́ 𝐚 𝐧𝐨𝐯𝐚 𝐟𝐨𝐭𝐨 𝐝𝐨 𝐠𝐫𝐮𝐩𝐨 ✅')
                break						
				case 'add':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('Yang mau di add jin ya?')
					if (args[0].startsWith('08')) return reply('Gunakan kode negara mas')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('𝐍𝐚𝐨 𝐟𝐨𝐢 𝐩𝐨𝐬𝐬𝐢𝐯𝐞𝐥 𝐚𝐝𝐢𝐜𝐢𝐨𝐧𝐚𝐫, 𝐭𝐚𝐥𝐯𝐞𝐳 𝐬𝐞𝐣𝐚 𝐩𝐫𝐢𝐯𝐚𝐝𝐨 😢')
					}
					break
					case 'grup':
					case 'group':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args[0] === 'buka') {
					    reply(`𝗕𝗲𝗿𝗵𝗮𝘀𝗶?? 𝗠𝗲𝗺𝗯𝘂𝗸𝗮 𝗚𝗿𝗼𝘂𝗽 𝗧𝗼𝗱`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'tutup') {
						reply(`𝗕𝗲𝗿𝗵𝗮𝘀𝗶𝗹 𝗠𝗲𝗻𝘂𝘁𝘂𝗽 𝗚𝗿𝗼𝘂𝗽 𝗧𝗼𝗱`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
					break      
            case 'dobbyzzup':
            case 'owner':
            case 'creator':
                  client.sendMessage(from, {displayname: "Jeff", vcard: vcard}, MessageType.contact, { quoted: mek})
       client.sendMessage(from, 'Tuh nomer owner ku >_<, jangan spam atau ku block kamu',MessageType.text, { quoted: mek} )
           break    
           case 'mudarnome':
                if (!isGroup) return reply(mess.only.group)
			    if (!isGroupAdmins) return reply(mess.only.admin)
				if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                client.groupUpdateSubject(from, `${body.slice(9)}`)
                client.sendMessage(from, '𝐍𝐨𝐦𝐞 𝐝𝐨 𝐠𝐫𝐮𝐩𝐨 𝐚𝐥𝐭𝐞𝐫𝐚𝐝𝐨 𝐜𝐨𝐦 𝐬𝐮𝐜𝐞𝐬𝐬𝐨 ✅', text, {quoted: mek})
                break
                case 'mudardesc':
                if (!isGroup) return reply(mess.only.group)
			    if (!isGroupAdmins) return reply(mess.only.admin)
				if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                client.groupUpdateDescription(from, `${body.slice(9)}`)
                client.sendMessage(from, '𝐃𝐞𝐬𝐜𝐫𝐢𝐜̧𝐚̃𝐨 𝐝𝐨 𝐠𝐫𝐮𝐩𝐨 𝐚𝐥𝐭𝐞𝐫𝐚𝐝𝐚 𝐜𝐨𝐦 𝐬𝐮𝐜𝐞𝐬𝐬𝐨 ✅', text, {quoted: mek})
                break
           case 'rebaixar':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('𝐐𝐮𝐞𝐦 𝐯𝐨𝐜𝐞̂ 𝐝𝐞𝐬𝐞𝐣𝐚 𝐫𝐞𝐛𝐚𝐢𝐱𝐚𝐫?')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `𝘆𝗮𝗵𝗵 𝗷𝗮??𝗮𝘁𝗮𝗻 𝗮𝗱𝗺𝗶𝗻 𝗸𝗮𝗺𝘂 𝘀𝘂𝗱𝗮𝗵 𝗱𝗶 𝗰𝗼𝗽𝗼𝘁🏃 :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`𝐎 @${mentioned[0].split('@')[0]} 𝐟𝐨𝐢 𝐫𝐞𝐛𝐚𝐢𝐱𝐚𝐝𝐨 𝐚 𝐦𝐞𝐦𝐛𝐫𝐨 𝐜𝐨𝐦𝐮𝐦 ✅`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break
				case 'promover':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('𝐐𝐮𝐞𝐦 𝐯𝐨𝐜𝐞̂ 𝐝𝐞𝐬𝐞𝐣𝐚 𝐩𝐫𝐨𝐦𝐨𝐯𝐞𝐫 𝐚 𝐚𝐝𝐦?')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `𝗦𝗲𝗹𝗮𝗺𝗮𝘁🥳 𝗮𝗻𝗱𝗮 𝗻𝗮𝗶𝗸 𝗺𝗲𝗻𝗷𝗮𝗱𝗶 𝗮𝗱𝗺𝗶𝗻 𝗴𝗿𝗼𝘂𝗽 (+_+) :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`𝐎 @${mentioned[0].split('@')[0]} 𝐟𝐨𝐢 𝐩𝐫𝐨𝐦𝐨𝐯𝐢𝐝𝐨 𝐚 𝐚𝐝𝐦 𝐝𝐨 𝐠𝐫𝐮𝐩𝐨✅`, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
					break	
			     	case 'banir':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('𝐐𝐮𝐞𝐦 𝐯𝐨𝐜𝐞̂ 𝐝𝐞𝐬𝐞𝐣𝐚 𝐛𝐚𝐧𝐢𝐫?')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `𝗔𝘀𝗲𝗸 𝗱𝗮𝗽𝗮𝘁 𝗺𝗮𝗸𝗮𝗻𝗮𝗻,𝗼𝘁𝘄 𝗸𝗶𝗰𝗸 🏃 :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`𝐄𝐬𝐬𝐞 𝐜𝐚𝐫𝐢𝐧𝐡𝐚 𝐚𝐪𝐮𝐢 👉 @${mentioned[0].split('@')[0]} 𝐟𝐨𝐢 𝐛𝐚𝐧𝐢𝐝𝐨 𝐜𝐨𝐦 𝐬𝐮𝐜𝐞𝐬𝐬𝐨 ✅`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
					break
				case 'marcaradmin':
					if (!isGroup) return reply(mess.only.group)
					teks = `😵𝐀𝐂𝐎𝐑𝐃𝐀 𝐀𝐃𝐌𝐒 𝐓𝐀𝐎 𝐓𝐑𝐀𝐕𝐀𝐍𝐃𝐎 𝐎 𝐆𝐑𝐔𝐏𝐎😵 *${groupMetadata.subject}*\n𝗧𝗼𝘁𝗮𝗹 : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
				case 'imagem':
					if (!isQuotedSticker) return reply('𝐌𝐚𝐫𝐪𝐮𝐞 𝐚𝐥𝐠𝐮𝐦𝐚 𝐟𝐢𝐠𝐮𝐫𝐢𝐧𝐡𝐚 𝐜𝐨𝐦 𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨❗')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Yah gagal, coba ulangi ^_^')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: '🦄'})
						fs.unlinkSync(ran)
					})
					break
                 case 'simi':
					if (args.length < 1) return reply('Textnya mana um?')
					teks = body.slice(5)
					anu = await simih(teks) //fetchJson(`https://mhankbarbars.herokuapp.com/api/samisami?text=${teks}`, {method: 'get'})
					//if (anu.error) return reply('Simi ga tau kak')
					reply(anu)
					break
				case 'simih':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Boo :𝘃')
					if (Number(args[0]) === 1) {
						if (isSimi) return reply('𝘀𝘂𝗱𝗮𝗵 𝗮𝗸𝘁𝗶𝗳 !!!')
						samih.push(from)
						fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
						reply('❬ 𝗦𝗨𝗞𝗦𝗘𝗦 ❭ 𝗠𝗲𝗻𝗴𝗮𝗸𝘁𝗶𝗳𝗸𝗮𝗻 𝗳𝗶𝘁𝘂𝗿 𝘀𝗶𝗺𝗶 𝗱𝗶 𝗴𝗿𝗼𝘂𝗽 𝗶𝗻𝗶️')
					} else if (Number(args[0]) === 0) {
						samih.splice(from, 1)
						fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
						reply('❬ 𝗦𝗨𝗞𝗦𝗘𝗦 ❭ 𝗠𝗲𝗻𝗼𝗻𝗮𝗸𝘁𝗶𝗳𝗸𝗮𝗻 𝗳𝗶𝘁𝘂𝗿 𝘀𝗶𝗺𝗶 𝗱𝗶 𝗴𝗿𝗼𝘂𝗽 𝗶𝗻𝗶️️')
					} else {
						reply(' *Ketik perintah 1 untuk mengaktifkan, 0 untuk menonaktifkan* \n𝗰𝗼𝗻𝘁𝗼𝗵: 𝘀𝗶𝗺𝗶𝗵 𝟭')
					}
					break
				case 'comandosweb':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Boo :𝘃')
					if (Number(args[0]) === 1) {
						if (isNsfw) return reply(' *sudah aktif*  !!')
						nsfw.push(from)
						fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
						reply('𝐀𝐝𝐦 𝐥𝐢𝐛𝐞𝐫𝐨𝐮 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐰𝐞𝐛 𝐧𝐨 𝐠𝐩 😳')
					} else if (Number(args[0]) === 0) {
						nsfw.splice(from, 1)
						fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
						reply('𝐀𝐝𝐦 𝐛𝐥𝐨𝐪𝐮𝐞𝐨𝐮 𝐨𝐬 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐰𝐞𝐛 𝐧𝐨 𝐠𝐩 😳')
					} else {
						reply(' *Ketik perintah 1 untuk mengaktifkan, 0 untuk menonaktifkan* \n𝗰𝗼𝗻𝘁𝗼𝗵: 𝗻𝘀𝗳𝘄 𝟭')
					}
					break
                case 'leveling':
                if (!isGroup) return reply(mess.only.group)
                if (!isGroupAdmins) return reply(mess.only.admin)
                if (args.length < 1) return reply('Boo :𝘃')
                if (args[0] === 'enable') {
                    if (isLevelingOn) return reply('*fitur level sudah aktif sebelum nya*')
                    _leveling.push(groupId)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                     reply(mess.levelon)
                } else if (args[0] === 'disable') {
                    _leveling.splice(groupId, 1)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                     reply(mess.leveloff)
                } else {
                    reply(' *Ketik perintah 1 untuk mengaktifkan, 0 untuk menonaktifkan* \n *Contoh: ${prefix}leveling 1*')
                }
            break
				case 'bemvindo':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Boo :𝘃')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('❗𝐉𝐚́ 𝐞𝐬𝐭𝐚 𝐚𝐭𝐢𝐯𝐨❗')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('❬ 𝐌𝐞𝐧𝐬𝐚𝐠𝐞𝐧𝐬 𝐝𝐞 𝐛𝐨𝐚𝐬 𝐯𝐢𝐧𝐝𝐚𝐬 𝐚𝐭𝐢𝐯𝐚𝐝𝐚𝐬 𝐧𝐨 𝐠𝐫𝐮𝐩𝐨 ✅')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('❬ 𝐌𝐞𝐧𝐬𝐚𝐠𝐞𝐧𝐬 𝐝𝐞 𝐛𝐨𝐚𝐬 𝐯𝐢𝐧𝐝𝐚𝐬 𝐝𝐞𝐬𝐚𝐭𝐢𝐯𝐚𝐝𝐚𝐬 𝐧𝐨 𝐠𝐫𝐮𝐩𝐨 ✅')
					} else {
						reply('𝐃𝐢𝐠𝐢𝐭𝐞 1 𝐩𝐚𝐫𝐚 𝐚𝐭𝐢𝐯𝐚𝐫 𝐞 0 𝐩𝐚𝐫𝐚 𝐝𝐞𝐬𝐚𝐭𝐢𝐯𝐚𝐫 ❗')
					}
					break
				case 'clone':
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB) 
					if (args.length < 1) return reply(' *TAG YANG MAU DI CLONE!!!* ')
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag cvk')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await client.getProfilePicture(id)
						buffer = await getBuffer(pp)
						client.updateProfilePicture(botNumber, buffer)
						mentions(`Foto profile Berhasil di perbarui menggunakan foto profile @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						reply(' *Yah gagal, coba ulangi ^_^* ')
					}
					break
				case 'wait':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await client.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							client.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply(' *KIRIM FOTO DENGAN CAPTIO OCR* ')
					}
					break
				default:
			if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						console.log(color('[ERROR]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
					}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
