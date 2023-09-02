import Router from 'koa-router'
import { Api } from 'api-types'

import { appContainer, authChecker } from '../inversify.config'
import { TYPES } from '../types/const'
import { ExportController } from '../controllers/export'
import { exportValidators } from '../controllers/export/exportValidators'

const router = new Router()
const controller = () => appContainer.get<ExportController>(TYPES.ExportController)

router.post(Api.Export.Tracks.URL, ...authChecker.createMiddleware(), exportValidators.exportTracks, (ctx) =>
  controller().exportTracks(ctx, ctx.request.body),
)

export const exportRouter = router
