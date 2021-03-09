import Knex from "knex";
import { ParameterizedContext } from "koa";
import { Logger } from "winston";
import { JWTUser } from "../services/jwt.service";

export interface RequestState {
    connection: Knex,
    logger: Logger,
    user?: JWTUser
}

export type RequestContext = ParameterizedContext<RequestState>