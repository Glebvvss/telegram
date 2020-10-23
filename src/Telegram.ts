import axios from 'axios'
import { TelegramConf, ApiResponse } from './Telegram.types'

const baseUrl = (config: TelegramConf): string => `${config.rootUrl}/bot${config.token}`

const apiRequest = (url: string): Promise<ApiResponse> =>
  axios.get(url)
       .catch(data => { throw new Error(`${data.response.status} ${data.response.statusText}`) })

const contentFrom = (response: ApiResponse): any => {
  if (response.data.ok) return response.data.result
  else throw new Error(response.data.description)
}

export default class Telegram {
  private baseUrl: string
  private chatId:  string

  constructor(config: TelegramConf) {
    this.baseUrl = baseUrl(config)
    this.chatId  = config.chatId
  }

  async getMe(): Promise<any> {
    return contentFrom(await apiRequest(`${this.baseUrl}/getMe`))
  }

  async getUpdates(): Promise<any> {
    return contentFrom(await apiRequest(`${this.baseUrl}/getUpdates`))
  }

  async sendMessage(text: string): Promise<any> {
    return contentFrom(await apiRequest(`${this.baseUrl}/sendMessage?chat_id=${this.chatId}&text=${text}`))
  }

  async deleteMessage(messageId: number): Promise<any> {
    return contentFrom(await apiRequest(`${this.baseUrl}/deleteMessage?chat_id=${this.chatId}&message_id=${messageId}`))
  }
}