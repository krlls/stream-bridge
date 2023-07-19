import Router from 'koa-router'

import { controllerContainer } from '../inversify.config'
import { Api } from '../types/TApi'
import { TYPES } from '../types/const'
import { importValidators } from '../controllers/import'
import { ImportController } from '../controllers/import'

const router = new Router()

const importController = controllerContainer.get<ImportController>(TYPES.ImportController)

router.post(Api.Import.Playlists.URL, importValidators.importPlaylists, (ctx) =>
  importController.importPlaylists(ctx, ctx.request.body),
)
router.post(Api.Import.Tracks.URL, importValidators.importTracksByPlaylist, (ctx) =>
  importController.importTracksByPlaylist(ctx, ctx.request.body),
)

export const importRouter = router
