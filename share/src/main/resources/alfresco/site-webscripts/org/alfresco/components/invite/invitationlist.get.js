function main()
{
   var siteId, theUrl, json, data;

   siteId = page.url.templateArgs.site;

   // get the roles available for the given site
   theUrl = "/api/sites/" + siteId + "/roles";
   json = remote.call(theUrl);
   data = JSON.parse(json);

   // add all roles except "None"
   model.siteRoles = [];
   var rolesTooltipData = [];
   for (var i = 0, j = data.siteRoles.length; i < j; i++)
   {
      if (data.siteRoles[i] != "None")
      {
         model.siteRoles.push(data.siteRoles[i]);
         rolesTooltipData.push({
            roleName: msg.get("role." + data.siteRoles[i]),
            roleDescription: msg.get("role." + data.siteRoles[i] + ".description")
         });
      }
   }
   model.rolesTooltipData = rolesTooltipData;

   // Widget instantiation metadata...
   var invitationList = {
      id : "InvitationList", 
      name : "Alfresco.InvitationList",
      options : {
         siteId : (page.url.templateArgs.site != null) ? page.url.templateArgs.site : "",
         roles : model.siteRoles
      }
   };
   model.widgets = [invitationList];
}

main();

