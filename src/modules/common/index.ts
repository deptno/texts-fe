import {Observable} from 'rxjs/Observable';
import {API_URL} from '../../constants';
import {ActionsObservable} from 'redux-observable';
import {Action} from 'redux';

const PREFIX = {PENDING: 'PENDING', OK: 'OK', ERR: 'ERR'};

export const pendingOkErr = actionName => ([
    [PREFIX.PENDING, actionName].join('_'),
    [PREFIX.OK, actionName].join('_'),
    [PREFIX.ERR, actionName].join('_')
]);
interface CreateIdMethodActionEpic$Args {
    method: 'get'|'post'|'put'|'delete',
    pending: string,
    ok: string,
    err: string,
    nextAction?: Action
}
export const convertModel = model => item => new model(item);
export const convertViaResponse = converter => payload$ => {
    payload$.response.items = payload$.response.items.map(converter);
    return payload$;
};

export const createIdMethodActionEpic$ = ({method, pending, ok, err, nextAction}: CreateIdMethodActionEpic$Args) =>
    (action$: ActionsObservable<any>, store): Observable<any> =>
        action$
            .ofType(pending)
            .flatMap(({payload: {id, ...rest}}) =>
                Observable.ajax({
                    method,
                    url : [API_URL, id].join('/'),
                    body: JSON.stringify(rest)
                }))
            .mergeMap(payload => nextAction
                ? [{type: ok, payload: payload.response}, nextAction]
                : [{type: ok, payload: payload.response}])
            .catch(_ => err);
