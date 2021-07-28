'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('TC:1 Sanity check for /:token', async (t) => {
  const app = build(t)

  const res = await app.inject({
    url: '/375WdKA'
  })
  t.same(JSON.parse(res.payload), { get: true })
})


test('TC:2 Sanity check for /anonymous/create', async (t) => {
  const app = build(t)

  const res = await app.inject({
    method: 'POST',
    url: '/anonymous/create'
  })
  t.same(JSON.parse(res.payload), { create: true })
})