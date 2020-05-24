import express, { Request, Response, NextFunction } from 'express';
export const app = express();

app.use(express.json());

import cors from 'cors';
app.use(cors({ origin: true }));

import { createStripeCheckoutSession } from './checkout';

app.post(
	'/checkouts/',
	runAsync(async ({ body }: Request, res: Response) => {
		res.send(await createStripeCheckoutSession(body.line_items));
	}),
);

function runAsync(callback: Function) {
	return (req: Request, res: Response, next: NextFunction) => {
		callback(req, res, next).catch(next);
	};
}
