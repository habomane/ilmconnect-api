import { convertDateToGMT, getTimezoneFromIP, validateSessionNotExpired } from "../../helpers";

// getDateGMT
test('216.58.217.206 is in Los Angelos, CA, USA, GMT-8', async () => {
    const result = await getTimezoneFromIP('216.58.217.206');
    expect(result).toBe(-8);
  });

  test('8.8.8.8 is in Ashburn, VA, GMT-5', async () => {
    const result = await getTimezoneFromIP('8.8.8.8')
    expect(result).toBe(-5);
});


test('123.45.67.89 is in Seoul, South Korea, GMT+9', async () => {
    const result = await getTimezoneFromIP('123.45.67.89')
    expect(result).toBe(9);
});

// convertDateToGMT
test('Converts 11/12/2023 at 5 PM to 11/12/2023 at 9PM for GMT-4', () => {
    expect(convertDateToGMT(new Date('2023-11-12T17:00:00'), -4).toISOString()).toBe(new Date('2023-11-12T21:00:00').toISOString());
});

test('Converts 01/09/2023 at 5 PM to 01/09/2023 at 9AM for GMT+8', () => {
    expect(convertDateToGMT(new Date('2023-01-09T17:00:00'), 8).toISOString()).toBe(new Date('2023-01-09T09:00:00').toISOString());
});

test('Converts 06/26/2000 at 11 PM to 06/27/2000 at 9AM for GMT-6', () => {
    expect(convertDateToGMT(new Date('2000-06-26T23:00:00'), -6).toISOString()).toBe(new Date('2000-06-27T05:00:00').toISOString());
});

// validateSessionNotExpired

test('Validate that date 5 days from now is not expired', () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    expect(validateSessionNotExpired(date)).toBe(true);
})

test('Validate that date 5 day before is expired', () => {
    const date = new Date();
    date.setDate(date.getDate() - 5);
    expect(validateSessionNotExpired(date)).toBe(false);
})

test('Validate that date same as today is not expired', () => {
    const date = new Date();
    date.setDate(date.getDate() - 5);
    expect(validateSessionNotExpired(date)).toBe(false);
})