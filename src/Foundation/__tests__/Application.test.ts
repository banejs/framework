import Container from '@banejs/container/Container';
import ContainerInterface from '@banejs/container/types/ContainerInterface';

import IApplication from '../IApplication';

import Application from '../Application';

describe('Application', () => {
    describe('#handle(callback)', () => {
        test('should call callback with container instance', () => {
            const callback: jest.Mock = jest.fn();
            const container: ContainerInterface = new Container();
            const application: IApplication = new Application(container);

            application.handle(callback);

            expect(callback).toBeCalledWith(container);
        });
    });
});
