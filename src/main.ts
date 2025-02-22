import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app.js';
import { LoggerService } from './logger/logger.service.js';
import { UserController } from './users/users.controller.js';
import { ILogger } from './logger/logger.interface.js';
import { TYPES } from './types.js';
import { IExceptionFilter } from './errors/exception.filter.interface.js';
import { ExceptionFilter } from './errors/exception.filter.js';

export interface IBootstrapReturn {
	app: App;
	appContainer: Container;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<UserController>(TYPES.UserController).to(UserController);
	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
