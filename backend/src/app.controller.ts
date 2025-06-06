import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
	@Get()
	getRoot(): string {
		return 'Kupipodariday backend is alive';
	}

	@Get('ping')
	ping(): string {
		return 'pong';
	}
}
