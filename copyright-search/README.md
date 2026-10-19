# US Book Copyright Search

Checks a book against US copyright renewals (1950–1991) and book registrations (1931–1963) and gives a public-domain verdict.

Everything runs in the browser. The `data/` folder holds one plain-text file per year; the page downloads only the years a search needs.

## Data sources
- Renewals: NYPL CCE renewals dataset — https://github.com/NYPL/cce-renewals
- Registrations: NYPL Catalog of Copyright Entries project — https://github.com/NYPL/catalog_of_copyright_entries_project

Registration numbers were standardized (spaces, hyphens and periods removed) so renewals and registrations match. No other changes were made to the records.

This is research help, not legal advice.
