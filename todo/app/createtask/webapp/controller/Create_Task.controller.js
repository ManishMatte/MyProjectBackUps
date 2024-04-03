sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageBox) {
        "use strict";

        return Controller.extend("createtask.controller.Create_Task", {

            onInit: function () {

               const gModel =  new sap.ui.model.json.JSONModel(
                {
                    oPayload:{
                    "name" : "",
                    "description" : "",
                    "duedate" : "",
                    "assignee" : []
                },  
                assigneeId:[]
                }
               );
               this.getView().setModel(gModel,"gModel");
                           
            },
            clearModel: function(){
                var gModel = this.getView().getModel("gModel");
                gModel.setProperty("/oPayload",
                {
                    "name" : "",
                    "description" : "",
                    "duedate" : "",
                    "assignee" : []
                });
                gModel.setProperty("/assigneeId",[]);
            }
            ,
            onSubmit: function(){
                var that=this;
                var gModel = this.getView().getModel("gModel");
                var oPayload = gModel.getProperty("/oPayload");
                var assigneeId = gModel.getProperty("/assigneeId");
                for(var i = 0; i < assigneeId.length; i++){
                    var record = {
                        "empid" : assigneeId[i],
                        "isdel" : false
                    }
                    oPayload.assignee.push(record);
                }

                $.ajax({
                    type: "POST",
                    url: "/browse/Tasks",
                    data: JSON.stringify(oPayload),
                    success: function(response,statusText,xhrToken){

                        MessageBox.success(" Task Id with UUID "+ response.ID +"  was Created.");
                        that.clearModel();

                    },
                    contentType : "application/json"
                  });

            }
        });
    });
