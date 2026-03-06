import { NextResponse } from "next/server"

let loveCount = 0

export async function POST() {
  loveCount++
  
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  
  if (!botToken || !chatId) {
    return NextResponse.json({ success: false, error: "Telegram not configured" }, { status: 500 })
  }
  
  try {
    const message = `💕 Кнопка "Отправить любовь" нажата!\n\nВсего нажатий: ${loveCount}`
    
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML"
      })
    })
    
    return NextResponse.json({ success: true, count: loveCount })
  } catch {
    return NextResponse.json({ success: false, error: "Failed to send" }, { status: 500 })
  }
}
