import linebot from 'linebot'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
})


bot.on('message', async event => {
  const response = await axios.get('https://gis.taiwan.net.tw/XMLReleaseALL_public/restaurant_C_f.json')
  try {
    const text = event.message.text
    let msg = []
    let reply = []

    for (const data of response.data.XML_Head.Infos.Info) {

      const flex = {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": "http://linecorp.com/"
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": []
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [],
          "flex": 0
        }
      }

      // if (data.Name + '/介紹' === text) {
      //   // reply.push({ type: 'text', text: data.Description })
      //   reply = data.Description
      // } else if (data.Name + '/位址' === text) {
      //   reply = data.Add
      // } else if (data.Name + '/照片' === text) {
      //   reply = data.Picture1
      // } else if (data.Name + '/詳細' === text) {
      //   flex.body.contents.push(
      //     {
      //       "type": "text",
      //       "text": data.Name,
      //       "weight": "bold",
      //       "size": "xl"
      //     },
      //     {
      //       "type": "box",
      //       "layout": "vertical",
      //       "margin": "lg",
      //       "spacing": "sm",
      //       "contents": [
      //         {
      //           "type": "box",
      //           "layout": "baseline",
      //           "spacing": "sm",
      //           "contents": [

      //             {
      //               "type": "text",
      //               "text": data.Add,
      //               "wrap": true,
      //               "color": "#666666",
      //               "size": "sm",
      //               "flex": 5
      //             }
      //           ]
      //         }
      //       ]
      //     },
      //     {
      //       "type": "box",
      //       "layout": "baseline",
      //       "spacing": "sm",
      //       "contents": [
      //         {
      //           "type": "text",
      //           "text": data.Opentime,
      //           "wrap": true,
      //           "color": "#666666",
      //           "size": "sm",
      //           "flex": 5
      //         }
      //       ]
      //     })
      //   flex.hero = {
      //     "type": "image",
      //     "url": data.Picture1,
      //     "size": "full",
      //     "aspectRatio": "20:13",
      //     "aspectMode": "cover",
      //     "action": {
      //       "type": "uri",
      //       "uri": "http://linecorp.com/"
      //     }
      //   }

      //   reply.push({
      //     type: 'flex',
      //     altText: `查詢的結果`,
      //     contents: {
      //       type: 'carousel',
      //       contents: [flex]
      //     }
      //   })
      // }
      let array = []
      array = text.split('$')
      if (array.length == 1) {
        if (data.Add.includes(array[0])) {

          if (data.Picture1 === '') {
            data.Picture1 = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png'
          }

          flex.body.contents.push(
            {
              "type": "text",
              "text": data.Name,
              "weight": "bold",
              "size": "xl"
            },
            {
              "type": "box",
              "layout": "vertical",
              "margin": "lg",
              "spacing": "sm",
              "contents": [
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [

                    {
                      "type": "text",
                      "text": data.Add,
                      "wrap": true,
                      "color": "#666666",
                      "size": "sm",
                      "flex": 5
                    }
                  ]
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": data.Opentime,
                  "wrap": true,
                  "color": "#666666",
                  "size": "sm",
                  "flex": 5
                }
              ]
            })
          flex.hero = {
            "type": "image",
            "url": data.Picture1,
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "action": {
              "type": "uri",
              "uri": "http://linecorp.com/"
            }
          }


          msg.push({
            type: 'flex',
            altText: `查詢的結果`,
            contents: {
              type: 'carousel',
              contents: [flex]
            }
          })
          event.reply(msg)
          if (reply.length >= 3) {
            break
          }

        }
      }
      if (array.length == 2) {
        if (data.Add.includes(array[0]) && data.Add.includes(array[1])) {

          if (data.Picture1 === '') {
            data.Picture1 = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png'
          }

          flex.body.contents.push(
            {
              "type": "text",
              "text": data.Name,
              "weight": "bold",
              "size": "xl"
            },
            {
              "type": "box",
              "layout": "vertical",
              "margin": "lg",
              "spacing": "sm",
              "contents": [
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [

                    {
                      "type": "text",
                      "text": data.Add,
                      "wrap": true,
                      "color": "#666666",
                      "size": "sm",
                      "flex": 5
                    }
                  ]
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": data.Opentime,
                  "wrap": true,
                  "color": "#666666",
                  "size": "sm",
                  "flex": 5
                }
              ]
            })
          flex.hero = {
            "type": "image",
            "url": data.Picture1,
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "action": {
              "type": "uri",
              "uri": "http://linecorp.com/"
            }
          }


          msg.push({
            type: 'flex',
            altText: `查詢的結果`,
            contents: {
              type: 'carousel',
              contents: [flex]
            }
          })
          event.reply(msg)
          if (reply.length >= 3) {
            break
          }

        }
      }
      if (array.length == 3) {
        if (data.Add.includes(array[0]) && data.Add.includes(array[1]) && data.Add.includes(array[2])) {

          if (data.Picture1 === '') {
            data.Picture1 = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png'
          }

          flex.body.contents.push(
            {
              "type": "text",
              "text": data.Name,
              "weight": "bold",
              "size": "xl"
            },
            {
              "type": "box",
              "layout": "vertical",
              "margin": "lg",
              "spacing": "sm",
              "contents": [
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [

                    {
                      "type": "text",
                      "text": data.Add,
                      "wrap": true,
                      "color": "#666666",
                      "size": "sm",
                      "flex": 5
                    }
                  ]
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": data.Opentime,
                  "wrap": true,
                  "color": "#666666",
                  "size": "sm",
                  "flex": 5
                }
              ]
            })
          flex.hero = {
            "type": "image",
            "url": data.Picture1,
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "action": {
              "type": "uri",
              "uri": "http://linecorp.com/"
            }
          }


          msg.push({
            type: 'flex',
            altText: `查詢的結果`,
            contents: {
              type: 'carousel',
              contents: [flex]
            }
          })
          event.reply(msg)
          if (reply.length >= 3) {
            break
          }

        }
      }
      if (array.length == 4) {
        if (data.Add.includes(array[0]) && data.Add.includes(array[1]) && data.Add.includes(array[2]) && data.Add.includes(array[3])) {

          if (data.Picture1 === '') {
            data.Picture1 = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png'
          }

          flex.body.contents.push(
            {
              "type": "text",
              "text": data.Name,
              "weight": "bold",
              "size": "xl"
            },
            {
              "type": "box",
              "layout": "vertical",
              "margin": "lg",
              "spacing": "sm",
              "contents": [
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [

                    {
                      "type": "text",
                      "text": data.Add,
                      "wrap": true,
                      "color": "#666666",
                      "size": "sm",
                      "flex": 5
                    }
                  ]
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": data.Opentime,
                  "wrap": true,
                  "color": "#666666",
                  "size": "sm",
                  "flex": 5
                }
              ]
            })
          flex.hero = {
            "type": "image",
            "url": data.Picture1,
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "action": {
              "type": "uri",
              "uri": "http://linecorp.com/"
            }
          }


          msg.push({
            type: 'flex',
            altText: `查詢的結果`,
            contents: {
              type: 'carousel',
              contents: [flex]
            }
          })
          event.reply(msg)
          if (reply.length >= 3) {
            break
          }

        }
      }
    }




    if (reply.length === 0) {
      reply = '沒有店家喔！要不要試著擴大範圍找找看呢?'
    }
    event.reply(msg)
  } catch (error) {
    reply.push({ type: 'text', text: '程式錯誤' })
  }

})



bot.listen('/', process.env.PORT, () => {
  console.log('linebot is now available')
})