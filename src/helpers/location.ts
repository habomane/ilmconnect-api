import geoip from 'geoip-lite';
import moment from 'moment-timezone';
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE, HttpException } from '../error-handling';

export const getDateGMT = (date: Date, ipAddress: string): string => {
    const geo = geoip.lookup(ipAddress);
    if(!geo) { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
    
    const timezone = moment.tz(geo.ll, geo.timezone).format('z');
    return timezone;
}