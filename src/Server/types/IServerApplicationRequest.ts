import Application from 'koa';

import IURLQuery from '@banejs/url/types/IURLQuery';

export default interface IServerApplicationRequest extends Omit<Application.BaseRequest, 'query'> {
    query: IURLQuery;
}
