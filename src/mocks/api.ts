import { setupWorker, rest } from "msw";
import { services, packages } from "../../dataset.json";

const handlers = [
  rest.get("/api/services", (_req, res, ctx) => {
    return res(ctx.delay(1500), ctx.status(200), ctx.json(services));
  }),
  rest.get("/api/packages", (_req, res, ctx) => {
    return res(ctx.delay(1500), ctx.status(200), ctx.json(packages));
  }),
];

const worker = setupWorker(...handlers);

export default worker;
