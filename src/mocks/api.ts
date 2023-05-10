import { setupWorker, rest } from "msw"
import { services, bundles, contractPeriod } from "~/dataset.json"

export const handlers = [
  rest.get("/api/services", (_req, res, ctx) => {
    return res(ctx.delay(250), ctx.status(200), ctx.json(services))
  }),
  rest.get("/api/bundles", (_req, res, ctx) => {
    return res(ctx.delay(250), ctx.status(200), ctx.json(bundles))
  }),
  rest.get("/api/contract-period", (_req, res, ctx) => {
    return res(ctx.delay(250), ctx.status(200), ctx.json(contractPeriod))
  }),
]

const worker = setupWorker(...handlers)

export default worker
