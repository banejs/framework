import Container from '@banejs/container/Container';

import Application from '../Application';

describe('Application', () => {
    describe('#handle(callback)', () => {
        test('should call callback with container instance', () => {
            const callback = jest.fn();
            const container = new Container();
            const application = new Application(container);

            application.handle(callback);

            expect(callback).toBeCalledWith(container);
        });
    });
});
