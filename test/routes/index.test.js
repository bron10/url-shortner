'use strict'

const { test } = require('tap')
const { build } = require('../helper')
const {serviceURL} = require('config')
test('TC:1 Sanity check for /:token', async (t) => {
  const app = build(t)

  const res = await app.inject({
    url: '/375WdKA'
  })
  t.same(JSON.parse(res.statusCode), 302)
})


test('TC:2 Sanity check for /anonymous/create', async (t) => {
  const app = build(t)
  const res = await app.inject({
    method: 'POST',
    body : {
      url : 'https://www.buzzfeed.com/ryanschocket2/people-are-sharing-the-unwritten-rules-of-life-and-i-never?utm_source=pocket-newtab-intl-en'
    },
    url: '/anonymous/create'
  })
  t.match(JSON.parse(res.payload), { shortUrl: serviceURL})
})

test('TC:3 Sanity check for /anonymous/create should not create duplicate entry for same url', async (t) => {
  const app = build(t)
  const response1 = await app.inject({
    method: 'POST',
    body : {
      url : 'https://getpocket.com/explore/item/i-found-bigfoot-maybe?utm_source=pocket-newtab-intl-en'
    },
    url: '/anonymous/create'
  })
  const response2 = await app.inject({
    method: 'POST',
    body : {
      url : 'https://getpocket.com/explore/item/i-found-bigfoot-maybe?utm_source=pocket-newtab-intl-en'
    },
    url: '/anonymous/create'
  })
  t.equal(JSON.parse(response1.payload).shortUrl, JSON.parse(response2.payload).shortUrl)
})

test('TC:4 failure check for /:token', async (t) => {
  const app = build(t)

  const res = await app.inject({
    url: '/375WdK'
  })
  t.same(JSON.parse(res.statusCode), 404)
})


test('TC:5 long url tests', async (t) => {
  const app = build(t)

  const response = await app.inject({
    method: 'POST',
    body : {
      url : 'https://www.google.com/search?q=news+of+the+week&ei=P3cCYaOnIsXgrQHKjqewDA&oq=news+of+the+week&gs_lcp=Cgdnd3Mtd2l6EAMyCAguEIAEEJMCMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQguEIAEMgUIABCABDIFCC4QgAQyBQgAEIAEOgcIABBHELADOggIABCABBCwAzoKCC4QsAMQyAMQQzoQCC4QxwEQ0QMQsAMQyAMQQzoICAAQgAQQyQM6BQgAEJIDOgsIABCABBCxAxCDAToICAAQsQMQgwE6CAgAEIAEELEDSgUIPBIBMUoECEEYAFCZeli4gwFg6YUBaAFwAngBgAHxAogBhgySAQcwLjkuMC4xmAEAoAEByAENwAEB&sclient=gws-wiz&ved=0ahUKEwjjwtaA_ofyAhVFcCsKHUrHCcYQ4dUDCA8&uact=5'
    },
    url: '/anonymous/create'
  })
  t.equal(JSON.parse(response.statusCode), 200)
})