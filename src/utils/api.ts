const endpoint = 'https://api.postmarkapp.com'

const request = async (path: string, token: string, params: any = {}) => {

  const qs = Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
  const url = `${endpoint}/${path}?${qs}`
  console.log(url, token)

  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      //'Content-Type': 'application/json',
      'X-Postmark-Server-Token': token
    }
  })

  return await response.json()

}

export const postmark = {
  messages: (token: string, count: number = 100, page: number = 1) => request('messages/outbound', token, { count, offset: (page - 1) * count })
}

