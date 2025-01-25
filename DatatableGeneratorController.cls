public with sharing class DatatableGeneratorController{
    /**
     * @description This method executes a given SOQL query and returns the result as a list of sObjects.
     *              It is designed to be used in Lightning Web Components (LWC) for populating data tables.
     * @param {String} query - The SOQL query to be executed.
     * @param {Long} timestamp - A unique timestamp to ensure each request is unique.
     * @return {List<sObject>} - A list of sObjects resulting from the executed query.
     * @throws {AuraHandledException} - Throws an exception if there is an error executing the query.
     * @example
     * // Example usage in LWC JavaScript controller:
     * import getData from '@salesforce/apex/datatableGeneratorController.getData';
     * 
     * getData({ query: 'SELECT Id, Name FROM Account', timestamp: Date.now() })
     *     .then(result => {
     *         // Handle the result
     *     })
     *     .catch(error => {
     *         // Handle the error
     *     });
     */
    @AuraEnabled
    public static List<sObject> getData(String queryString, Long timestamp) {
        try {
            // The timestamp parameter is not used in the query, but it ensures the method is called with a unique signature
            return Database.query(queryString);
        } catch (Exception e) {
            throw new AuraHandledException('Error executing query: ' + e.getMessage());
        }
    }

    /**
     * @description This method updates a list of sObjects in the database.
     * @param {List<sObject>} records - The list of sObjects to be updated.
     * @throws {AuraHandledException} - Throws an exception if there is an error updating the records.
     */
    @AuraEnabled
    public static void updateRecords(List<sObject> records) {
        try {
            update records;
        } catch (Exception e) {
            throw new AuraHandledException('Error updating records: ' + e.getMessage());
        }
    }
}