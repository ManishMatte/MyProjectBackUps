sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
    'sap/ui/export/library',
    'sap/ui/export/Spreadsheet',
    'sap/ui/core/UIComponent'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Filter,FilterOperator,exportLibrary,Spreadsheet,UIComponent) {
        "use strict";

        var EdmType = exportLibrary.EdmType;

        return Controller.extend("worklist.controller.worklist", {
            onInit: function () {

              

            },
            onFilterChange: function () {
			this._updateLabelsAndTable();
		},
            onSearch: function () {
                var gModel = this.getOwnerComponent().getModel('gModel');
                var filtername = gModel.getProperty('/filter');
                var final = [],aTableFilters=[];
                for (var i =0 ;i<filtername.length;i++){
                    if (filtername[i] !== ''){
                        // final.push(filtername[i]);

                        aTableFilters.push(new sap.ui.model.Filter({
                            path: "name",
                            operator: FilterOperator.Contains,
                            value1: filtername[i]
                    }));
                    
                    };
                };
                
                var combo = gModel.getProperty('/combo');

                if(combo !== undefined && combo !== null && combo !== ''){

                aTableFilters.push(new sap.ui.model.Filter({
                    path: "name",
                    operator: FilterOperator.Contains,
                    value1: combo
                }));
            }

                this.oTable = this.getView().byId("table");
                this.oTable.getBinding("rows").filter(aTableFilters);
            },
            handleChange: function(oEvent) {
                var gModel = this.getOwnerComponent().getModel('gModel');
                var filter = gModel.getProperty('/combo');
                var value = this.getView().byId("suggestionsComboBox").mProperties.value;
                gModel.setProperty('/combo',value)
            },
            onClear: function(){
                var gModel = this.getOwnerComponent().getModel('gModel');
                gModel.setProperty('/combo',"");
                gModel.setProperty('/filter',[]);
                this.oTable = this.getView().byId("table");
                this.oTable.getBinding("rows").filter([]);

            },
            // handleInput: function(oEvent) {
            //     var demoToast = this.getView().byId("demoToast");
            //     demoToast.setText("Event input fired.");
            //     demoToast.show();
            // },
            // handleSelectionChange: function(oEvent) {
            //     var demoToast = this.getView().byId("demoToast");
            //     demoToast.setText("Event selectionChange fired.");
            //     demoToast.show();
            // },
            formatAvailableToObjectState: function(price) {
                return price < 20 ? "Success" : "Error";
            },
            formatDate: function(date){
                return new Date(date).toISOString().split('T')[0];
            },
            createColumnConfig: function() {
                var aCols = [];
    
                // aCols.push({
                //     label: 'Full name',
                //     property: ['Lastname', 'Firstname'],
                //     type: EdmType.String,
                //     template: '{0}, {1}'
                // });
    
                aCols.push({
                    label: 'Product Name',
                    type: EdmType.String,
                    property: 'name',
                    scale: 0
                });
    
                aCols.push({
                    property: 'ID',
                    type: EdmType.Number
                });
    
                aCols.push({
                    property: 'quantity',
                    type: EdmType.Number
                });
    
                aCols.push({
                    property: 'price',
                    type: EdmType.Number
                });

                aCols.push({
                    property: 'date',
                    type: EdmType.Date
                });
    
                return aCols;
            },
            getRouter: function(){
                return UIComponent.getRouterFor(this);
            },
            onPressLink: function(){

                this.getRouter().navTo("object",{
                    object:"nav"
                });
            },
            onExport: function() {
                var aCols, oRowBinding, oSettings, oSheet, oTable;
    
                if (!this._oTable) {
                    this._oTable = this.byId('table');
                }
    
                oTable = this._oTable;
                oRowBinding = oTable.getBinding('rows');
                aCols = this.createColumnConfig();
    
                oSettings = {
                    workbook: {
                        columns: aCols,
                        hierarchyLevel: 'Level'
                    },
                    dataSource: oRowBinding,
                    fileName: 'Table export sample.xlsx',
                    worker: false // We need to disable worker because we are using a MockServer as OData Service
                };
    
                oSheet = new Spreadsheet(oSettings);
                oSheet.build().finally(function() {
                    oSheet.destroy();
                });
            },
        });
        
    });
