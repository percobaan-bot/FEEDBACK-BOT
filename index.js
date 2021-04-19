/*

Warning!!! Script bot ini tidak untuk dijual belikan.....
Lib yang perlu diinstall di script ini cuman 1, lib telegram bot banghasan.
Id Lib : 11LhYmqUg8UVtqMg3rPaau5uHwCMtsE_0RwUQim4ZY-OCfDe_YyIYKPSP.

Silakan diedit bebas hehe....

Copyright @OhYoonHee_Bot
Btw maaf kalo berantakan... males bikin rapi..
Menemukan error?
1. Cek variable variable wajib di config.js
2. Jika sudah melakukan hal yang ada di no 1 tapi masih error... hubungi saya di @GASTestingGroup (Telegram)

Penerapan sudah bisa dirasakan di bot @NgeTest_FeedbackBot

Fiturnya seperti livegram....
kekurangan :
- Belum support sticker
- Belum support balas pesan sambil reply
- Masih beta :)

Konstribusi dipersilakan ^_^

Note : Hanya berfungsi di Google App Script
*/

function kirim_jawaban(msg, u_id, m_id, jawaban){
let pesan = jawaban
var file_id = msg
if(msg.photo){
file_id = msg.photo[msg.photo.length - 1].file_id
var data = {
    chat_id : u_id, 
    photo : file_id, 
    caption : pesan, 
    parse_mode : "HTML",
    reply_to_message_id : m_id
    }
tg.request('sendPhoto', data)
}
if(msg.video){
  file_id = msg.video.file_id
  var data = {
    chat_id : u_id, 
    video : file_id, 
    caption : pesan, 
    parse_mode : "HTML",
    reply_to_message_id : m_id
    }
tg.request('sendVideo', data)
}
if(msg.audio){
   file_id = msg.audio.file_id
   var data = {
    chat_id : u_id, 
    audio : file_id, 
    caption : pesan, 
    parse_mode : "HTML",
    reply_to_message_id : m_id
    }
tg.request('sendAudio', data)
}
if(msg.voice){
  file_id = msg.voice.file_id
  var data = {
    chat_id : u_id, 
    voice : file_id, 
    caption : pesan, 
    parse_mode : "HTML",
    reply_to_message_id : m_id
    }
tg.request('sendVoice', data)
}
if(msg.text){
  var data = {
    chat_id : u_id, 
    text : pesan, 
    parse_mode : "HTML",
    reply_to_message_id : m_id
    }
tg.request('sendMessage', data)
}
if(msg.sticker){
  file_id = msg.sticker.file_id
  var data = {
    chat_id : u_id, 
    sticker : file_id, 
    reply_to_message_id : m_id
    }
    tg.request('sendSticker', data)
}

}

function kirim_keadmin(msg, caption){
  var pesans = ""
  if(caption){
  pesans = tg.util.clearHTML(caption)
  }
  var jenis = msg.text ? "Teks" : "Media"
  var dari = msg.from
  var nama = dari.first_name
  if(dari.last_name) nama += " "+dari.last_name
  var pesan =`<a href="tg://user?id=${msg.from.id}">${nama}</a> mengirim ${jenis}`
  if(caption){
  pesan += `\n\n"${pesans}"`
  }
var file_id = msg
if(msg.photo){
  
file_id = msg.photo[msg.photo.length - 1].file_id
tg.sendPhoto(admin_bot, file_id, pesan, "HTML")
}
if(msg.video){
  file_id = msg.video.file_id
  tg.sendVideo(admin_bot, file_id, pesan, "HTML")
}
if(msg.audio){
   file_id = msg.audio.file_id
   tg.sendAudio(admin_bot, file_id, pesan, "HTML")
}
if(msg.voice){
  file_id = msg.voice.file_id
  tg.sendVideo(admin_bot, file_id, pesan, "HTML")
}
if(msg.text){
  tg.sendMessage(admin_bot, pesan, "HTML")
}

}

function prosesFeedback(update){
  
  if(update.message){
  var msg = update.message 
  var type = msg.text||msg.caption
  var utput = msg.text||msg.caption||false
  var _type = msg.photo||msg.video||msg.audio||msg.voice||msg.video_note||msg.animation
  
  if(msg.from.id != admin_bot){
    if(_type&&!type||/^\/start/i.exec(type)){
      var pesan = `Halo saya adalah bot...
`
return tg.sendMsg(msg, pesan)
    }
    if(type&&!msg.sticker){
      try{
    kirim_keadmin(msg, utput)
    return tg.sendMsg(msg, "Feedback terkirim!!!")
      }catch(e){
        return tg.sendMsg(msg, "Feedback gagal terkirim!!")
        }
  }
  
}

if(msg.from.id = admin_bot){
  try{
  if(msg.reply_to_message){
var pesan = msg.reply_to_message.text||msg.reply_to_message.caption
var user = ""
if(pesan){
  var gila = msg.reply_to_message.entities||msg.reply_to_message.caption_entities
gila.forEach((e)=>{
  var ty = e.type
  var aw = e.offset
  var ak = Number(e.length)+Number(aw)
  if(ty == "text_mention") user = e.user.id
})
return kirim_jawaban(msg, user,false, type)
}


}
  }catch(e){
    tg.sendMsg(admin_bot, String(e))
  }
}


  }

}