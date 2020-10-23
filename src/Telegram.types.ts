export type TelegramConf = {
  rootUrl: string,
  token:   string,
  chatId:  string
}

export type ApiResponse = {
  data: {
    ok:           boolean,
    result?:      any
    description?: string
  }
}