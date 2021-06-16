const { getProduct } = require('../services/BaseService');
it('should be able to get result from FWD', async () => {
  const result = await getProduct({
    name: 'TEST',
    genderCd: 'FEMALE',
    dob: '1982-02-21',
    planCode: 'T11AM1',
    premiumPerYear: 300000,
    paymentFrequency: 'YEARLY',
    saPerYear: 500000,
  });
  // Assertion
  expect(result.flag).toEqual(true);
});
