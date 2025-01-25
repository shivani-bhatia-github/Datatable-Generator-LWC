import { LightningElement } from 'lwc';
import { api, track } from 'lwc';
import getQueryResults from '@salesforce/apex/DatatableGeneratorController.getData';
import updateRecords from '@salesforce/apex/DatatableGeneratorController.updateRecords';

export default class DatatableGenerator extends LightningElement {
    @track data;
    @track columns;
    @track inputValue = '';

    connectedCallback() {
        console.log('DatatableGenerator component initialized');
    }

    handleInputChange(event) {
        this.inputValue = event.target.value;
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('Button clicked');
        this.sendQuery(this.inputValue);
    }

    handleExport() {
        console.log('Export button clicked');
        if (!this.data || this.data.length === 0) {
            console.warn('No data to export');
            return;
        }

        const csvContent = this.generateCSVContent(this.data);
        console.log('CSV content generated:', csvContent);
        try {
            // Encode CSV content as Base64
            const base64Content = btoa(csvContent);
            const dataUri = `data:text/csv;base64,${base64Content}`;
            // Create a temporary anchor element for download
            const link = document.createElement('a');
            link.href = dataUri;
            link.setAttribute('download', 'export.csv'); // Set the file name
            document.body.appendChild(link);
            // Trigger the download and clean up
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error creating object URL:', error);
        }
    }

    generateCSVContent(data) {
        const columnDelimiter = ',';
        const lineDelimiter = '\n';
        const keys = Object.keys(data[0]);

        let result = keys.join(columnDelimiter) + lineDelimiter;

        data.forEach(item => {
            let ctr = 0;
            keys.forEach(key => {
                if (ctr > 0) result += columnDelimiter;
                const value = item[key] !== undefined && item[key] !== null ? item[key] : ''; // Handle empty values
                result += `"${value.toString().replace(/"/g, '""')}"`; // Escape double quotes within values
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

    sendQuery(queryString) {
        const timestamp = new Date().getTime();
        getQueryResults({ queryString: queryString, timestamp: timestamp })
            .then(result => {
                this.data = result;
                this.columns = Object.keys(result[0]).map(key => ({
                    label: key,
                    fieldName: key,
                    editable: true // Enable inline editing for all columns
                }));
                console.log('Query results:', this.data);
            })
            .catch(error => {
                console.error('Error fetching query results:', error);
            });
    }

    handleSave(event) {
        const updatedFields = event.detail.draftValues;
        console.log('Save event triggered');
        console.log('Updated fields:', updatedFields);

        // Merge updated fields with original data
        const updatedRecords = this.data.map(item => {
            const draft = updatedFields.find(draftItem => draftItem.Id === item.Id);
            return draft ? { ...item, ...draft } : item;
        });

        console.log('Updated records to be sent:', updatedRecords);

        updateRecords({ records: updatedRecords })
            .then(() => {
                console.log('Records updated successfully');
                // Clear draft values after save
                this.template.querySelector('lightning-datatable').draftValues = [];
                // Refresh data
                this.sendQuery(this.inputValue);
            })
            .catch(error => {
                console.error('Error updating records:', error);
            });
    }
}

