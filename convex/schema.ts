import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

// NOTE: Convex schema:
// schema is the top-level definition of database, wheras tables are entities within that schema
// - single source of truth
// - validate data writes at runtime
// - provides better typescript tooling
// - it helps define indexes/search/vector consistently with tables

// PERF: align with zod valdator at client-side
// centralize shared constraits in constants to reduce copy-paste drift
// for example:
// `export const IMPORT_STATUSES = ["importing", "completed", "failed"] as const`
export default defineSchema({
  projects: defineTable({
    name: v.string(),
    ownerId: v.string(),
    importStatus: v.optional(
      v.union(
        v.literal('importing'),
        v.literal('completed'),
        v.literal('failed'),
      ),
    ),
  }).index('by_owner', ['ownerId']),
  // NOTE: Index in convex:
  // index defintions are explicit and tied to how queries are written
  // so query intent is clear in code
  // and you should add index base on real query patterns
  // PERF: rule of thumb:
  // - small data/ one-off admin query: no index can be fine
  // - user-facing list/ pagination/ multi-tenant filtering: define and use index
})
