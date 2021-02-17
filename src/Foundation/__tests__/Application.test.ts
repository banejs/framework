import Container from '@banejs/container/Container';
import IContainer from '@banejs/container/types/IContainer';

import IApplication from '../types/IApplication';

import Application from '../Application';

describe('Application', (): void => {
    describe('#handle(callback)', (): void => {
        test('should call callback with container instance', (): void => {
            const callback: jest.Mock = jest.fn();
            const container: IContainer = new Container();
            const application: IApplication = new Application(container);

            application.handle(callback);

            expect(callback).toBeCalledWith(container);
        });
    });
});
