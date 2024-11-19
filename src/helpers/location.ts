import moment from 'moment-timezone';
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE, HttpException } from '../error-handling';

export const getTimezoneFromIP = async (ipAddress: string): Promise<number> => {
    if(ipAddress === '::1' || ipAddress === '' || ipAddress === null) { return -5; }
    const response = await fetch(`http://ip-api.com/json/${ipAddress}`);
    const geo = await response.json();
  
    if (geo.status !== 'success') {
        throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError);
    }
    const utcOffset = moment.tz(geo.timezone).utcOffset() / 60;
    return utcOffset;
}

export const convertDateToGMT = (date: Date, timeDifference: number) => {
    
    const diff = date.getHours() + ( -1 * timeDifference);
    date.setHours(diff);
}


export const convertDateToUserTimezoneFromIP = async (date: Date, ipAddress: string) => {
    const timezoneOffset = await getTimezoneFromIP(ipAddress);
    return convertDateToGMT(date, timezoneOffset * -1);
}

export const convertDateToGMTTimezoneFromIP = async (date: Date, ipAddress: string) => {
    const timezoneOffset = await getTimezoneFromIP(ipAddress);
    return convertDateToGMT(date, timezoneOffset);
}

export const validateSessionNotExpired = (date: Date): boolean => {
    return date > new Date();
}