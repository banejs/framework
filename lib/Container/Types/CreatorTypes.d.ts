import ContainerInterface from '../ContainerInterface';
export declare type DefaultCreatorType = (context: ContainerInterface) => any;
export declare type FactoryCreatorType = (context: ContainerInterface) => (...args: Array<any>) => any;
export declare type ConstantCreatorType = any;
export declare type CreatorType = DefaultCreatorType | FactoryCreatorType | ConstantCreatorType;
