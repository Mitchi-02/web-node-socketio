import { NextFunction, Response, Request } from 'express'
import {
  countConversationsByUser,
  paginateConversationsByUser,
  paginateConversationByIdAndUser,
  countConversationsByCustomer,
  paginateConversationsByCustomer,
} from '@/repositories/ConversationRepository'
import GlobalError from '@/utils/GlobalError'
import { Pagination } from '@/utils/schemas'
import { ConversationResource, ConversationResourceCollection } from '@/utils/resources'

export async function index(
  req: Request<
    Record<string, string>,
    Record<string, string>,
    Record<string, string>,
    Pagination
  >,
  res: Response
) {
  const conversations = ConversationResourceCollection(
    await paginateConversationsByCustomer(req.user.customerId, req.query)
  )
  res.status(200).json({
    page: req.query.page || 1,
    page_size: req.query.page || 10,
    count: await countConversationsByCustomer(req.user.customerId),
    conversations,
  })
}

export async function indexUser(
  req: Request<
    Record<string, string>,
    Record<string, string>,
    Record<string, string>,
    Pagination
  >,
  res: Response
) {
  const conversations = ConversationResourceCollection(
    await paginateConversationsByUser(req.user.userId, req.query)
  )
  res.status(200).json({
    count: await countConversationsByUser(req.user.userId),
    conversations
  })
}

export async function show(
  req: Request<
    { id: string },
    Record<string, string>,
    Record<string, string>,
    Pagination
  >,
  res: Response,
  next: NextFunction
) {
  const conv = await paginateConversationByIdAndUser(
    req.params.id,
    req.user.userId,
    req.query
  )
  if (!conv) {
    return next(new GlobalError('Conversation not found', 404))
  }
  res.status(200).json({
    conversation: ConversationResource(conv),
  })
}
