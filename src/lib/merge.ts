export default function merge<T, U>(dest: T, src: U): void {
    Object.getOwnPropertyNames(src).forEach((name: string): void => {
        const descriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(src, name);

        if (descriptor) {
            Object.defineProperty(dest, name, descriptor);
        }
    });
}
