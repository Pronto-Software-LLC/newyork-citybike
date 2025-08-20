import { Kysely } from 'kysely'
import { XataDialect } from '@xata.io/kysely'
import type { Model } from '@xata.io/kysely'
import type { DatabaseSchema } from '@/lib/xata'
import { getXataClient } from '@/lib/xata'

export const xata = getXataClient()

export const db = new Kysely<Model<DatabaseSchema>>({
  dialect: new XataDialect({ xata }),
})
