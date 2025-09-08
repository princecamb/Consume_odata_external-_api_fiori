sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], (Controller, JSONModel, MessageToast) => {
    "use strict";

    return Controller.extend("vat.controller.View1", {

        onInit() {
            // Empty JSON model for binding employee data
            var oModel = new JSONModel({});
            this.getView().setModel(oModel, "EmployeeModel");
        },

// onFetchEmployeeData: function () {
//     var sPsNumber = this.getView().byId("psInput").getValue();
//     // In this pattern, we create a new model instance inside the success handler,
//     // so we don't need to get the existing model here.
//     // var oEmployeeModel = this.getView().getModel("EmployeeModel"); 
    
//     var oView = this.getView();

//     if (!sPsNumber) {
//         MessageToast.show("Please enter a PS number");
//         return;
//     }

//     var sUrl = `/odata/v4/my/Employee?$filter=PSnumber eq '${sPsNumber}'`;

//     // This AJAX call follows the exact structure you provided.
//     $.ajax({
//         url: sUrl,
//         method: "GET",
//         success: function (oData) {
            
//             if (oData && oData.value && oData.value.length > 0) {
//                 var fullEmployeeRecord = oData.value[0];
// debugger
//                 // 1. Create a brand new JSONModel instance.
//                 var oModel = new JSONModel();
//                 debugger
//                 // 2. Update the new model with the retrieved employee description.
//                 oModel.setData({
//                     EmployeeName: fullEmployeeRecord.EmployeeName,
//                     EmpDesignation: fullEmployeeRecord.EmpDesignation,
//                     EmpPerformance: fullEmployeeRecord.EmpPerformance
//                 });
// debugger
//                 // 3. Set this new model on the view with the name "EmployeeModel".
//                 oView.setModel(oModel, "EmployeeModel");
        
//                 // Debugging/logging
//                 console.log("Fetched Employee Record:", fullEmployeeRecord);
//                 console.log("New model was set on the view:", oView.getModel("EmployeeModel").getData());
                
//                 MessageToast.show("Data fetched and model set successfully.");

//             } else {
//                 MessageToast.show("No employee found for PS number: " + sPsNumber);
//             }
//         },
//         error: function (jqXHR, textStatus, errorThrown) {
//             console.error("Error fetching data: " + textStatus + " " + errorThrown);
//             MessageToast.show("Error fetching data. Check console for details.");
//         }
//     });
// }
    

onFetchEmployeeData: function () {
    debugger;
    var sPsNumber = this.getView().byId("psInput").getValue();
    var oView = this.getView();

    if (!sPsNumber) {
        MessageToast.show("Please enter a PS number");
        return;
    }

    debugger;
    // Corrected template literal for URL
    var url = `odata/v4/my/Employee?$filter=PSnumber eq '${sPsNumber}'`;
    var sUrl = this._getExternalServiceRuntimeBaseURL() + url;

    debugger;
    $.ajax({
        url: sUrl,
        method: "GET",
        success: function (oData) {
            debugger;
            if (oData && oData.value && oData.value.length > 0) {
                var fullEmployeeRecord = oData.value[0];
                debugger;

                // Create a new JSON model
                var oModel = new sap.ui.model.json.JSONModel();
                debugger;

                // Set data into the model
                oModel.setData({
                    EmployeeName: fullEmployeeRecord.EmployeeName,
                    EmpDesignation: fullEmployeeRecord.EmpDesignation,
                    EmpPerformance: fullEmployeeRecord.EmpPerformance
                });

                debugger;
                // Attach model to the view
                oView.setModel(oModel, "EmployeeModel");

                console.log("Fetched Employee Record:", fullEmployeeRecord);
                console.log("New model was set on the view:", oView.getModel("EmployeeModel").getData());

                MessageToast.show("Data fetched and model set successfully.");
            } else {
                debugger;
                MessageToast.show("No employee found for PS number: " + sPsNumber);
            }
        },
        error: function (oError) {
            debugger;
            console.error("Error fetching employee data:", oError);
            MessageToast.show("Failed to fetch employee data.");
        }
    });
},

_getExternalServiceRuntimeBaseURL: function () {
    debugger;
    var oComponent = sap.ui.core.Component.getOwnerComponentFor(this.getView());
    if (oComponent) {
        var sAppId = oComponent.getManifestEntry("/sap.app/id");
        var sAppPath = sAppId.replaceAll(".", "/");
        debugger;
        var sAppModulePath = this.getOwnerComponent().getManifestObject()._oBaseUri._string;
        return sAppModulePath;
    } else {
        console.error("Component could not be found.");
        return "";
    }
}


    });
});

