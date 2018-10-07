import Container from '../Container';
import NotFoundException from '../Exceptions/NotFoundException';
import ContainerException from '../Exceptions/ContainerException';

describe('Container', () => {
    class A {}

    class B {}

    class C {
        constructor(a, b) {
            if (!(a instanceof A) || !(b instanceof B)) {
                throw new Error();
            }
        }
    }

    class ThrowableClass {
        constructor() {
            throw new Error('Sample Error');
        }
    }

    class ThrowableClassWithoutMessage {
        constructor() {
            throw new Error();
        }
    }

    describe('#bind(id, creator)', () => {
        test('should create binding', () => {
            const container = new Container();

            container.bind('A', () => new A());

            expect(container.has('A')).toBe(true);
        });
    });

    describe('#singleton(id, creator)', () => {
        test('should create singleton', () => {
            const container = new Container();

            container.singleton('A', () => new A());

            expect(container.has('A')).toBe(true);
        });
    });

    describe('#factory(id, creator)', () => {
        test('should create factory', () => {
            const container = new Container();

            container.factory('A', () => () => new A());

            expect(container.has('A')).toBe(true);
        });
    });

    describe('#constant(id, creator)', () => {
        test('should create constant', () => {
            const container = new Container();

            container.constant('A', () => 'A_CONSTANT');

            expect(container.has('A')).toBe(true);
        });
    });

    describe('#has(id)', () => {
        test('should return correct values', () => {
            const container = new Container();

            container.bind('A', () => new A());

            expect(container.has('A')).toBe(true);
            expect(container.has('B')).toBe(false);
        });
    });

    describe('#alias(id)', () => {
        test('should create alias', () => {
            const container = new Container();

            container.bind('A', () => new A());
            container.alias('A', 'A_alias');

            expect(container.has('A_alias')).toBe(true);
        });
    });

    describe('#get(id)', () => {
        test('should resolve binding', () => {
            const container = new Container();

            container.bind('A', () => new A());

            expect(container.get('A')).toBeInstanceOf(A);
        });

        test('should resolve binding with dependencies', () => {
            const container = new Container();

            container.bind('A', () => new A());
            container.bind('B', () => new B());
            container.bind('C', (containerInstance) => Reflect.construct(C, [containerInstance.get('A'), containerInstance.get('B')]));
        });

        test('should resolve singleton', () => {
            const container = new Container();

            container.singleton('A', () => new A());

            const AInstance = container.get('A');

            expect(AInstance).toBeInstanceOf(A);
            expect(container.get('A')).toBe(AInstance);
        });

        test('should resolve factory', () => {
            const container = new Container();
            const aFactory = () => new A();

            container.factory('A', () => aFactory);

            expect(container.get('A')).toBe(aFactory);
        });

        test('should resolve constant', () => {
            const container = new Container();
            const value = 'CONSTANT_VALUE';

            container.constant('CONST', value);

            expect(container.get('CONST')).toBe(value);
        });

        test('should throw NotFoundException', () => {
            const container = new Container();

            expect(() => {
                container.get('A');
            }).toThrow(NotFoundException);
        });

        test('should throw ContainerException', () => {
            const container = new Container();

            container.bind('ThrowableClass', () => new ThrowableClass());

            expect(() => {
                container.get('ThrowableClass');
            }).toThrow(ContainerException);
        });

        test('should throw ContainerException without message', () => {
            const container = new Container();

            container.bind('ThrowableClassWithoutMessage', () => new ThrowableClassWithoutMessage());

            expect(() => {
                container.get('ThrowableClassWithoutMessage');
            }).toThrow(ContainerException);
        });
    });
});
