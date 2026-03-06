import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  
  if (!botToken || !chatId) {
    return NextResponse.json({ success: false, error: "Telegram not configured" }, { status: 500 })
  }
  
  try {
    const formData = await request.formData()
    const photo = formData.get("photo") as File | null
    
    if (!photo) {
      return NextResponse.json({ success: false, error: "No photo provided" }, { status: 400 })
    }
    
    const telegramFormData = new FormData()
    telegramFormData.append("chat_id", chatId)
    telegramFormData.append("photo", photo)
    telegramFormData.append("caption", "💐 Получено фото с цветами!")
    
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
      method: "POST",
      body: telegramFormData
    })
    
    if (!response.ok) {
      throw new Error("Telegram API error")
    }
    
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, error: "Failed to send photo" }, { status: 500 })
  }
}
