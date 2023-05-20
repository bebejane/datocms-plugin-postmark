type Message = {
  MessageID: string
  MessageStream: string
  To: {
    Email: string
    Name: string
  }[]
  Cc: string[]
  Bcc: string[]
  Recipients: string[]
  ReceivedAt: date
  From: string
  Subject: string
  Attachments: string[]
  Status: string
  TrackOpens: boolean
  TrackLinks: string
  Metadata: any
  Sandboxed: boolean
}