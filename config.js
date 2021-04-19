var BOT_TOKEN = "BOT_TOKEN" // Wajib
var webhook_url = "URL_HASIL_DEPLOY" // Wajib
var admin_bot = 0 // Wajib
const tg = new telegram.daftar(BOT_TOKEN)
var info_bot = tg.getMe()

if(!BOT_TOKEN||!webhook_url||admin_bot == 0){
	throw "Ada variable wajib yang belom lengkap nih hmmm"
}

/*
Fungsi setwebhook
Note : Jalankan 1 kali ya bund
*/
function setwebhook(){
	try{
var result = tg.setWebhook(webhook_url)
Logger.log(result)
   }catch(e){
	console.log(e.message)
  }
}

/*
Fungsi doPost gak usah dijalankan :v
*/
function doPost(e) {
  var update = tg.doPost(e);
  if(update){
  prosesFeedback(update)
  }
}