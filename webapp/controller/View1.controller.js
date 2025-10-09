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

             var oModel1 = new JSONModel({});
            this.getView().setModel(oModel1, "DeptModel");

            // Model for Login Data
            var oLoginModel = new JSONModel({});
            this.getView().setModel(oLoginModel, "LoginModel");
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

onFetchLogin: function () {
    const oLoginModel = this.getView().getModel("LoginModel");
    debugger
    // Get the application's base URL and append the path
    const sAppRoot = sap.ui.require.toUrl(this.getOwnerComponent().getManifestObject().getComponentName());
    const sUrl = sAppRoot + "/services/userapi/currentUser";
    debugger

    $.ajax({
        url: sUrl,
        method: "GET",
        success: function (oData) {
            if (oData && oData.email) {
                debugger
                oLoginModel.setData({ UserID: oData.email });
                MessageToast.show("Logged-in user ID fetched: " + oData.email);
            } else {
                MessageToast.show("Could not retrieve user ID.");
            }
        },
        error: function (oXHR, sTextStatus, sErrorThrown) {
            // Log more detailed error information
            console.error("Error fetching user data:", {
                status: oXHR.status,
                statusText: sTextStatus,
                responseText: oXHR.responseText
            });
            MessageToast.show(`Failed to fetch user data. Status: ${oXHR.status}`);
        }
    });
},

    

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
    var url = `odata/v4/employee-service/Employee?$filter=PSnumber eq '${sPsNumber}'`;
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

onFetchDeptData: function () {
    var sDeptNumber = this.getView().byId("psInput1").getValue(); // Renamed for clarity
    var oView = this.getView();
debugger
    if (!sDeptNumber) {
        MessageToast.show("Please enter a department number");
        return;
    }

    var url = `odata/v4/department-service/Department?$filter=DepartmentID eq '${sDeptNumber}'`;
    var sUrl = this._getExternalServiceRuntimeBaseURL() + url;
debugger
    $.ajax({
        url: sUrl,
        method: "GET",
        success: function (oData1) {
            if (oData1 && oData1.value && oData1.value.length > 0) {
                var fullDeptRecord = oData1.value[0];

                // Create a new JSON model
                var oModel1 = new sap.ui.model.json.JSONModel();

                // Set data into the model
                oModel1.setData({
                    DepartmentName: fullDeptRecord.DepartmentName,
                });

                // Attach the correct model ('oModel') to the view
                oView.setModel(oModel1, "DeptModel");

                console.log("Fetched Department Record:", fullDeptRecord);
                console.log("New model was set on the view:", oView.getModel("DeptModel").getData());

                MessageToast.show("Department data fetched and model set successfully.");
            } else {
                MessageToast.show("No department found for ID: " + sDeptNumber);
            }
        },
        error: function (oError) {
            console.error("Error fetching department data:", oError);
            MessageToast.show("Failed to fetch department data.");
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

