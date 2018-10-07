import Application from '../Application';
import Container from '../../Container/Container';

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
