# Datatable Generator LWC

## Overview
The `datatableGenerator` Lightning Web Component (LWC) is designed to dynamically generate a datatable based on a SOQL query input by the user. It supports inline editing and exporting the data to a CSV file.

## Files
- **datatableGenerator.js-meta.xml**: Metadata configuration for the LWC.
- **datatableGenerator.js**: JavaScript controller for the LWC.
- **datatableGenerator.html**: HTML template for the LWC.
- **datatableGeneratorController.cls**: Apex controller for handling SOQL queries and record updates.

## Usage

### datatableGenerator.js-meta.xml
This file defines the metadata for the `datatableGenerator` component, including the API version and the targets where the component can be used.

### datatableGenerator.js
This file contains the JavaScript logic for the `datatableGenerator` component. Key functionalities include:
- Handling input changes and form submission.
- Sending SOQL queries to the Apex controller.
- Generating and exporting CSV content.
- Handling inline edits and saving updated records.

### datatableGenerator.html
This file contains the HTML template for the `datatableGenerator` component. It includes:
- An input field for entering the SOQL query.
- Buttons for submitting the query and exporting data.
- A `lightning-datatable` for displaying and editing the query results.

### datatableGeneratorController.cls
This Apex controller provides two main methods:
- `getData`: Executes a given SOQL query and returns the results.
- `updateRecords`: Updates a list of sObjects in the database.

## Example
To use the `datatableGenerator` component, add it to a Lightning App Page, Record Page, Home Page, Flow Screen, Utility Bar, or Tab.

```html
<c-datatable-generator></c-datatable-generator>
```

## License
This project is licensed under the MIT License.
