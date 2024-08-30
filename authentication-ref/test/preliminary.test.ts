describe('preliminary test suite', () => {
    test('expect the node environment to be test', () => {
        expect(process.env.NODE_ENV).toBe("test");
    });

    test('expect the database url to point to the test database', () => {
        expect(process.env.DATABASE_URL).toBe('postgresql://bsaranga:complexnumbers@localhost:5432/appdb_test?schema=public')
    })
});