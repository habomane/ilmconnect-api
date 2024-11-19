"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
// getDateGMT
test('216.58.217.206 is in Los Angelos, CA, USA, GMT-8', () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, helpers_1.getTimezoneFromIP)('216.58.217.206');
    expect(result).toBe(-8);
}));
test('8.8.8.8 is in Ashburn, VA, GMT-5', () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, helpers_1.getTimezoneFromIP)('8.8.8.8');
    expect(result).toBe(-5);
}));
test('123.45.67.89 is in Seoul, South Korea, GMT+9', () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, helpers_1.getTimezoneFromIP)('123.45.67.89');
    expect(result).toBe(9);
}));
// convertDateToGMT
test('Converts 11/12/2023 at 5 PM to 11/12/2023 at 9PM for GMT-4', () => {
    const date = new Date('2023-11-12T17:00:00');
    (0, helpers_1.convertDateToGMT)(date, -4);
    expect(date.toISOString()).toBe(new Date('2023-11-12T21:00:00').toISOString());
});
test('Converts 01/09/2023 at 5 PM to 01/09/2023 at 9AM for GMT+8', () => {
    const date = new Date('2023-01-09T17:00:00');
    (0, helpers_1.convertDateToGMT)(date, 8);
    expect(date.toISOString()).toBe(new Date('2023-01-09T09:00:00').toISOString());
});
test('Converts 06/26/2000 at 11 PM to 06/27/2000 at 9AM for GMT-6', () => {
    const date = new Date('2000-06-26T23:00:00');
    (0, helpers_1.convertDateToGMT)(date, -6);
    expect(date.toISOString()).toBe(new Date('2000-06-27T05:00:00').toISOString());
});
// validateSessionNotExpired
test('Validate that date 5 days from now is not expired', () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    expect((0, helpers_1.validateSessionNotExpired)(date)).toBe(true);
});
test('Validate that date 5 day before is expired', () => {
    const date = new Date();
    date.setDate(date.getDate() - 5);
    expect((0, helpers_1.validateSessionNotExpired)(date)).toBe(false);
});
test('Validate that date same as today is not expired', () => {
    const date = new Date();
    date.setDate(date.getDate() - 5);
    expect((0, helpers_1.validateSessionNotExpired)(date)).toBe(false);
});
